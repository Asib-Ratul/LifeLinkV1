import http from 'node:http';
import { DatabaseSync } from 'node:sqlite';
import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { mkdirSync, readFileSync, existsSync } from 'node:fs';
import { dirname, resolve, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dbPath = process.env.DATABASE_PATH || resolve(root, 'data/chamber.sqlite');
mkdirSync(dirname(resolve(dbPath)), { recursive: true });
const db = new DatabaseSync(dbPath);
db.exec(`
PRAGMA journal_mode=WAL;
PRAGMA foreign_keys=ON;
PRAGMA busy_timeout=5000;
CREATE TABLE IF NOT EXISTS clinics (
 id TEXT PRIMARY KEY, name TEXT NOT NULL, slug TEXT NOT NULL UNIQUE, doctor TEXT NOT NULL,
 timezone TEXT NOT NULL DEFAULT 'Asia/Dhaka', state TEXT NOT NULL DEFAULT 'closed',
 minutes INTEGER NOT NULL DEFAULT 10, capacity INTEGER NOT NULL DEFAULT 60, notice TEXT NOT NULL DEFAULT ''
);
CREATE TABLE IF NOT EXISTS users (
 id TEXT PRIMARY KEY, clinic_id TEXT NOT NULL REFERENCES clinics(id),
 name TEXT NOT NULL, email TEXT NOT NULL UNIQUE, password TEXT NOT NULL,
 role TEXT NOT NULL CHECK(role IN ('owner','reception','doctor'))
);
CREATE TABLE IF NOT EXISTS sessions (
 token TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id), expires INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS visits (
 id TEXT PRIMARY KEY, clinic_id TEXT NOT NULL REFERENCES clinics(id), day TEXT NOT NULL,
 serial INTEGER NOT NULL, name TEXT NOT NULL, token TEXT NOT NULL UNIQUE,
 status TEXT NOT NULL DEFAULT 'waiting' CHECK(status IN ('waiting','serving','done','skipped','cancelled')),
 arrived INTEGER NOT NULL DEFAULT 0, created INTEGER NOT NULL, started INTEGER, finished INTEGER,
 UNIQUE(clinic_id, day, serial)
);
CREATE UNIQUE INDEX IF NOT EXISTS one_serving_per_clinic ON visits(clinic_id) WHERE status='serving';
CREATE INDEX IF NOT EXISTS visits_day ON visits(clinic_id,day,serial);
`);
const id = () => randomBytes(24).toString('hex');
const now = () => Date.now();
function day(c) { return new Intl.DateTimeFormat('en-CA', { timeZone: c.timezone, year:'numeric', month:'2-digit', day:'2-digit' }).format(new Date()); }
function hash(password) { const salt=id(); return salt+':'+scryptSync(password,salt,64).toString('hex'); }
function verify(password, stored) { const [salt,key]=stored.split(':'); return timingSafeEqual(scryptSync(password,salt,64),Buffer.from(key,'hex')); }
function fail(status,message) { const e=new Error(message); e.status=status; throw e; }
function str(value,label,max=100) { if(typeof value!=='string'||!value.trim()||value.trim().length>max) fail(400,label+' is required (up to '+max+' characters).'); return value.trim(); }
function password(value) { if(typeof value!=='string'||value.length<12||value.length>128) fail(400,'Use a password with 12 to 128 characters.'); return value; }
function email(value) { const v=str(value,'Email',254).toLowerCase(); if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) fail(400,'Enter a valid email address.'); return v; }
function transaction(fn) { db.exec('BEGIN IMMEDIATE'); try { const r=fn(); db.exec('COMMIT'); return r; } catch(e) { db.exec('ROLLBACK'); throw e; } }
const limits=new Map();
function limit(req, scope, max, window=900000) {
 const key=scope+':'+req.socket.remoteAddress, t=now(), old=limits.get(key);
 const entry=old&&old.until>t?old:{count:0,until:t+window};
 if(++entry.count>max) fail(429,'Too many attempts. Please try again later.');
 limits.set(key,entry);
}
setInterval(()=>{ const t=now(); for(const [k,v] of limits) if(v.until<t) limits.delete(k); db.prepare('DELETE FROM sessions WHERE expires < ?').run(t); },60000).unref();
async function body(req) {
 if(!String(req.headers['content-type']||'').startsWith('application/json')) fail(415,'Send JSON data.');
 let data=''; for await(const chunk of req){data+=chunk; if(data.length>16000) fail(413,'Request is too large.');}
 try{return JSON.parse(data||'{}');}catch{fail(400,'Invalid request data.');}
}
function user(req) {
 const cookie=(req.headers.cookie||'').split(';').map(s=>s.trim()).find(s=>s.startsWith('chamber_session='));
 const token=cookie?.slice(16);
 const u=token&&db.prepare('SELECT u.* FROM users u JOIN sessions s ON s.user_id=u.id WHERE s.token=? AND s.expires>?').get(token,now());
 if(!u) fail(401,'Please sign in to continue.');
 return u;
}
function clinic(u) { return db.prepare('SELECT * FROM clinics WHERE id=?').get(u.clinic_id); }
function publicClinic(c) { return {name:c.name,slug:c.slug,doctor:c.doctor,state:c.state,notice:c.notice,timezone:c.timezone}; }
function visits(c) {return db.prepare('SELECT * FROM visits WHERE clinic_id=? AND (day=? OR status=\'serving\') ORDER BY day,serial').all(c.id,day(c));}
function estimate(c, rows, v) {
 const completed=rows.filter(x=>x.status==='done'&&x.started&&x.finished).slice(-10).map(x=>(x.finished-x.started)/60000).sort((a,b)=>a-b);
 const average=completed.length>=3?Math.max(2,Math.min(60,completed[Math.floor(completed.length/2)])):c.minutes;
 const ahead=rows.filter(x=>(x.status==='waiting'&&x.serial<v.serial)||x.status==='serving').length;
 const active=rows.find(x=>x.status==='serving');
 const elapsed=active?.started?(now()-active.started)/60000:0;
 const minutes=Math.max(0,Math.round(ahead*average-Math.min(elapsed,average)));
 return {ahead,low:Math.max(0,Math.round(minutes*.75)),high:Math.ceil(minutes*1.25),available:c.state==='open'&&v.status==='waiting'};
}
function session(res,u) {
 const token=id(); db.prepare('INSERT INTO sessions VALUES (?,?,?)').run(token,u.id,now()+12*3600000);
 res.setHeader('Set-Cookie','chamber_session='+token+'; HttpOnly; SameSite=Lax; Path=/; Max-Age=43200'+(process.env.NODE_ENV==='production'?'; Secure':''));
}
function safeUser(u){return {name:u.name,email:u.email,role:u.role};}
function addVisit(c,name,arrived) {
 if(c.state!=='open') fail(409,'The queue is not accepting patients right now.');
 const rows=visits(c);
 if(rows.filter(v=>v.status!=='cancelled').length>=c.capacity) fail(409,'Today’s queue is full. Please contact the clinic.');
 const v={id:id(),clinic_id:c.id,day:day(c),serial:Math.max(0,...rows.map(v=>v.serial))+1,name,token:id(),arrived:arrived?1:0,created:now()};
 db.prepare('INSERT INTO visits (id,clinic_id,day,serial,name,token,arrived,created) VALUES (?,?,?,?,?,?,?,?)').run(v.id,c.id,v.day,v.serial,v.name,v.token,v.arrived,v.created);
 return {serial:v.serial,token:v.token};
}
async function api(req,res,path) {
 const method=req.method;
 if(method!=='GET') {
  const origin=req.headers.origin;
  const expected=process.env.APP_ORIGIN||'http://'+req.headers.host;
  if(origin&&origin!==expected) fail(403,'This request came from a different website.');
  if(req.headers['sec-fetch-site']==='cross-site') fail(403,'Cross-site requests are not allowed.');
 }
 if(path==='/api/register'&&method==='POST') {
  limit(req,'register',5);
  const b=await body(req), n=str(b.name,'Your name'), cn=str(b.clinic,'Clinic name'), dn=str(b.doctor,'Doctor name'), em=email(b.email), pw=password(b.password);
  const c=transaction(()=>{
   if(db.prepare('SELECT id FROM users WHERE email=?').get(em)) fail(409,'An account with this email already exists.');
   const cid=id(),uid=id(),slug=cn.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,45)+'-'+randomBytes(3).toString('hex');
   db.prepare('INSERT INTO clinics (id,name,slug,doctor) VALUES (?,?,?,?)').run(cid,cn,slug,dn);
   db.prepare('INSERT INTO users VALUES (?,?,?,?,?,?)').run(uid,cid,n,em,hash(pw),'owner');
   return {id:uid};
  }); session(res,c); return {ok:true};
 }
 if(path==='/api/login'&&method==='POST') {
  limit(req,'login',15); const b=await body(req),em=email(b.email);
  if(typeof b.password!=='string'||b.password.length>128) fail(401,'Email or password is incorrect.');
  const u=db.prepare('SELECT * FROM users WHERE email=?').get(em);
  // Equal-cost password derivation for unknown accounts.
  const valid=u?verify(b.password,u.password):(scryptSync(b.password,'unknown-account',64),false);
  if(!valid) fail(401,'Email or password is incorrect.');
  session(res,u); return {ok:true};
 }
 if(path==='/api/logout'&&method==='POST') {
  const u=user(req), token=(req.headers.cookie||'').split(';').map(x=>x.trim()).find(x=>x.startsWith('chamber_session='))?.slice(16);
  db.prepare('DELETE FROM sessions WHERE token=? AND user_id=?').run(token,u.id);
  res.setHeader('Set-Cookie','chamber_session=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0'); return {ok:true};
 }
 if(path.startsWith('/api/clinics/')) {
  const slug=path.split('/')[3],c=db.prepare('SELECT * FROM clinics WHERE slug=?').get(slug);
  if(!c) fail(404,'Clinic not found.');
  if(method==='GET') return {clinic:publicClinic(c),waiting:visits(c).filter(v=>v.status==='waiting').length};
  if(method==='POST') {limit(req,'join',20,3600000); const b=await body(req); return transaction(()=>addVisit(c,str(b.name,'Patient name',80),false));}
 }
 if(path.startsWith('/api/track/')) {
  const token=path.split('/')[3],v=db.prepare('SELECT * FROM visits WHERE token=?').get(token);
  if(!v) fail(404,'This tracking link was not found.');
  const c=db.prepare('SELECT * FROM clinics WHERE id=?').get(v.clinic_id),rows=visits(c),expired=v.day!==day(c)&&v.status!=='serving';
  if(method==='GET') return {clinic:publicClinic(c),serial:v.serial,status:v.status,arrived:!!v.arrived,expired,estimate:expired?null:estimate(c,rows,v),serving:rows.find(x=>x.status==='serving')?.serial||null};
  if(method==='POST') {
   const b=await body(req);
   if(expired||v.status!=='waiting') fail(409,'This place in the queue can no longer be changed.');
   if(b.action==='arrive') db.prepare('UPDATE visits SET arrived=1 WHERE id=?').run(v.id);
   else if(b.action==='cancel') db.prepare("UPDATE visits SET status='cancelled' WHERE id=?").run(v.id);
   else fail(400,'Unknown action.');
   return {ok:true};
  }
 }
 const u=user(req),c=clinic(u);
 if(path==='/api/workspace'&&method==='GET') return {user:safeUser(u),clinic:c,day:day(c),visits:visits(c).map(({clinic_id,...v})=>v),team:u.role==='owner'?db.prepare('SELECT id,name,email,role FROM users WHERE clinic_id=?').all(c.id):[]};
 if(path==='/api/visits'&&method==='POST') {
  if(u.role==='doctor') fail(403,'Only reception and clinic owners can register patients.');
  const b=await body(req); return transaction(()=>addVisit(c,str(b.name,'Patient name',80),true));
 }
 if(path==='/api/settings'&&method==='POST') {
  if(u.role!=='owner') fail(403,'Only the clinic owner can change these settings.');
  const b=await body(req),name=str(b.name,'Clinic name'),doctor=str(b.doctor,'Doctor name'),zone=str(b.timezone,'Timezone');
  try{new Intl.DateTimeFormat('en',{timeZone:zone}).format();}catch{fail(400,'Choose a valid timezone.');}
  if(!Number.isInteger(b.minutes)||b.minutes<2||b.minutes>60||!Number.isInteger(b.capacity)||b.capacity<1||b.capacity>500) fail(400,'Use 2–60 minutes and 1–500 patients.');
  if(zone!==c.timezone&&visits(c).some(v=>['waiting','serving'].includes(v.status))) fail(409,'Finish the active queue before changing timezone.');
  db.prepare('UPDATE clinics SET name=?,doctor=?,timezone=?,minutes=?,capacity=? WHERE id=?').run(name,doctor,zone,b.minutes,b.capacity,c.id); return {ok:true};
 }
 if(path==='/api/password'&&method==='POST') {
  limit(req,'password',10);
  const b=await body(req),pw=password(b.password);
  if(typeof b.current!=='string'||b.current.length>128||!verify(b.current,u.password)) fail(400,'Current password is incorrect.');
  transaction(()=>{db.prepare('UPDATE users SET password=? WHERE id=?').run(hash(pw),u.id);db.prepare('DELETE FROM sessions WHERE user_id=?').run(u.id);});
  session(res,u);return {ok:true};
 }
 if(path==='/api/team/remove'&&method==='POST') {
  if(u.role!=='owner') fail(403,'Only the clinic owner can remove staff.');
  const b=await body(req),member=db.prepare("SELECT * FROM users WHERE id=? AND clinic_id=? AND role!='owner'").get(b.id,c.id);
  if(!member) fail(404,'Staff account not found.');
  transaction(()=>{db.prepare('DELETE FROM sessions WHERE user_id=?').run(member.id);db.prepare('DELETE FROM users WHERE id=?').run(member.id);});return {ok:true};
 }
 if(path==='/api/team'&&method==='POST') {
  if(u.role!=='owner') fail(403,'Only the clinic owner can add staff.');
  const b=await body(req),em=email(b.email),pw=password(b.password),name=str(b.name,'Staff name');
  if(!['doctor','reception'].includes(b.role)) fail(400,'Choose a staff role.');
  if(db.prepare('SELECT id FROM users WHERE email=?').get(em)) fail(409,'This email is already registered.');
  db.prepare('INSERT INTO users VALUES (?,?,?,?,?,?)').run(id(),c.id,name,em,hash(pw),b.role); return {ok:true};
 }
 if(path==='/api/queue'&&method==='POST') {
  const b=await body(req);
  return transaction(()=>{
   const current=db.prepare("SELECT * FROM visits WHERE clinic_id=? AND status='serving'").get(c.id);
   if(b.action==='state') {
    if(!['open','paused','closed'].includes(b.state)) fail(400,'Unknown queue state.');
    const notice=typeof b.notice==='string'?b.notice.trim().slice(0,180):'';
    db.prepare('UPDATE clinics SET state=?,notice=? WHERE id=?').run(b.state,notice,c.id); return {ok:true};
   }
   if(b.action==='next') {
    if(c.state!=='open') fail(409,'Open the queue before calling the next patient.');
    if(current) fail(409,'Finish the current consultation first.');
    const next=db.prepare("SELECT * FROM visits WHERE clinic_id=? AND day=? AND status='waiting' AND arrived=1 ORDER BY serial LIMIT 1").get(c.id,day(c));
    if(!next) fail(409,'No checked-in patients are waiting.');
    db.prepare("UPDATE visits SET status='serving',started=? WHERE id=?").run(now(),next.id); return {ok:true};
   }
   if(b.action==='finish') {
    if(!current) fail(409,'There is no active consultation.');
    db.prepare("UPDATE visits SET status='done',finished=? WHERE id=?").run(now(),current.id); return {ok:true};
   }
   const v=db.prepare('SELECT * FROM visits WHERE id=? AND clinic_id=? AND day=?').get(b.id,c.id,day(c));
   if(!v) fail(404,'Patient not found in today’s queue.');
   if(b.action==='arrive'&&v.status==='waiting') db.prepare('UPDATE visits SET arrived=1 WHERE id=?').run(v.id);
   else if(b.action==='skip'&&v.status==='waiting') db.prepare("UPDATE visits SET status='skipped' WHERE id=?").run(v.id);
   else if(b.action==='restore'&&v.status==='skipped') db.prepare("UPDATE visits SET status='waiting',arrived=1 WHERE id=?").run(v.id);
   else fail(409,'This action is no longer available. Refresh the queue.');
   return {ok:true};
  });
 }
 fail(404,'Page not found.');
}
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml'};
const server=http.createServer(async(req,res)=>{
 res.setHeader('X-Content-Type-Options','nosniff');
 res.setHeader('Referrer-Policy','no-referrer');
 res.setHeader('X-Frame-Options','DENY');
 res.setHeader('Content-Security-Policy',"default-src 'self'; style-src 'self'; script-src 'self'; img-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'");
 try {
  const path=new URL(req.url,'http://localhost').pathname;
  if(path.startsWith('/api/')) {
   res.setHeader('Cache-Control','no-store');
   const result=await api(req,res,path);
   res.writeHead(200,{'Content-Type':'application/json'});res.end(JSON.stringify(result));return;
  }
  if(req.method!=='GET'&&req.method!=='HEAD') fail(405,'Method not allowed.');
  const assets={'/app.js':'app.js','/style.css':'style.css','/favicon.svg':'favicon.svg'};
  const file=resolve(root,'public',assets[path]||'index.html');
  res.setHeader('Content-Type',mime[extname(file)]);
  res.setHeader('Cache-Control','no-cache');
  res.end(req.method==='HEAD'?'':readFileSync(file));
 } catch(e) {res.writeHead(e.status||500,{'Content-Type':'application/json'}); res.end(JSON.stringify({error:e.status?e.message:'Something went wrong. Please try again.'})); if(!e.status)console.error(e.message);}
});
const port=Number(process.env.PORT)||3100;
if(process.env.NODE_ENV==='production'&&!process.env.APP_ORIGIN) throw new Error('APP_ORIGIN is required in production.');
server.listen(port,process.env.HOST||'127.0.0.1',()=>console.log('Chamber is ready at http://localhost:'+port));
process.on('SIGTERM',()=>server.close(()=>{db.close();process.exit(0);}));