# Chamber

A minimal clinic queue application built from scratch. Patients join from a clinic link, follow their place privately, and check in when they arrive. Reception and the doctor share one live queue.

## Run locally

Requires Node.js 24 or newer. There are no third-party runtime packages.

```powershell
cd C:\AI-Projects\Chamber
npm start
```

Open http://localhost:3100. Choose **Set up your clinic**, create an owner account, and open the queue. Share the clinic booking link, or add a patient at reception. Patients must check in before the doctor calls them.

- Reception: /desk
- Doctor: /consultation
- Clinic details and staff accounts: /settings (owner only)
- Public booking: /c/<clinic-slug>
- Private patient tracking: /t/<random-token>

No seeded accounts or preset passwords. Staff accounts are created by the owner; share credentials privately.

## Implemented

- Clinic registration, password hashing with scrypt, expiring HttpOnly sessions and sign-out.
- Clinic-isolated records and role checks on the server.
- Daily queues using the clinic timezone (Asia/Dhaka by default).
- Public booking, walk-ins, check-in, call next, finish, mark absent, restore, cancel.
- Queue opening, pauses with a patient notice, closing, daily capacity.
- Private unguessable tracking links without patient names or other patients' details.
- Waiting ranges based on recent completed consultations, with a configured initial estimate.
- Database persistence in SQLite, transactions, a single active consultation constraint.
- Polling updates every five seconds, responsive layouts, keyboard focus and labelled forms.
- Owner-managed clinic settings and separate accounts for reception and doctors.
- Request limits, input validation, same-origin write protection and security headers.

## Project structure

```text
Chamber/
  public/          browser interface, styles, icon
  src/server.js    HTTP server, authentication, queue rules, SQLite schema
  tests/           integration tests against a temporary database
  docs/            product scope and deployment guide
  data/            local database (generated; excluded from Git)
  Dockerfile
  package.json
```

## Checks

```powershell
npm run check
npm test
```

The tests exercise authentication, queue transitions, capacity, clinic isolation, staff permissions, public privacy, and cross-origin rejection using a temporary database.

## Deployment

This application needs a persistent Node server and disk. It is **not a Vercel serverless application**. See [deployment instructions](docs/DEPLOYMENT.md) for the container and environment configuration.

The first release supports **one doctor / one queue per clinic**. It has real database-backed accounts and queue operations, but is an early-access application, not a complete commercial release. SMS/WhatsApp delivery, billing, email verification, password recovery, audit logging and multi-doctor scheduling are not implemented. Patient screens explicitly say that automatic alerts are not sent.

See [product scope](docs/PRODUCT.md) for release requirements and workflow decisions.

Account controls include password changes (which revoke other sessions) and owner removal of staff access. The browser preview may contain a fictional clinic created during verification. Create your own clinic at /register.
