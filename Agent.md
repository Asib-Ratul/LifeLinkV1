# AGENT.md — LifeLink Persistent AI Agent Instructions V2

**Project:** LifeLink  
**File:** `AGENT(1) V2.md`  
**Purpose:** Operational control, project state, decision log, and handoff memory for every AI agent working on LifeLink.  
**Status:** ACTIVE — read this file before changing the project.

---

# 1. CORE OPERATING RULE

LifeLink is a continuing project.

Every AI agent must:

1. Read this file first.
2. Read the relevant source-of-truth document before working.
3. Inspect the actual repository before trusting previous summaries.
4. Preserve approved/completed work.
5. Work only inside the current authorized phase unless the user explicitly changes it.
6. Validate changes.
7. Update this file before ending, switching agents, or losing useful context.
8. Leave the next agent an exact continuation point.
9. Never intentionally exhaust the context window before writing a handoff.

If the environment cannot edit this file, output a complete handoff block for the next agent to paste into it.

---

# 2. SOURCE-OF-TRUTH MODEL — DOMAIN AUTHORITY

Do **not** use one global priority list for all documents.

Use authority by domain:

## Latest explicit user instruction
Overrides all project documents.

## `AGENT(1) V2.md`
Controls:

- current development phase,
- immediate task,
- approved design selection,
- completed work,
- current implementation state,
- decisions already made,
- blockers,
- validation status,
- next task,
- handoff.

## `PRODUCT REQUIREMENTS DOCUMENT V2.md`
Controls:

- product features,
- business rules,
- roles,
- permissions,
- authentication behavior,
- database behavior,
- state transitions,
- queue logic,
- booking logic,
- medical-record authorization,
- blood-network behavior,
- acceptance criteria,
- final functional definition of done.

## `LifeLink_Frontend_Design_Specification(1) V2.md`
Controls:

- colors,
- typography,
- visual hierarchy,
- layout,
- components,
- responsive behavior,
- frontend interaction presentation,
- visual states,
- design-generation order.

## Existing code
Represents current implementation, but it does not override a newer approved requirement.

---

# 3. CONFLICT RESOLUTION

When two instructions appear inconsistent:

1. Identify which domain the conflict belongs to.
2. Follow the document that owns that domain.
3. Follow the latest explicit user instruction if it changed the requirement.
4. Do not silently merge incompatible rules.
5. Record any material resolution in the Decision Log.
6. Prefer the simplest maintainable interpretation when a detail is genuinely unspecified.
7. Never invent paid infrastructure or new product features merely to resolve ambiguity.

---

# 4. PROJECT IDENTITY

**LifeLink** is a non-commercial university demonstration healthcare web application for Bangladesh, initially demonstrated with fictional Dhaka-area data.

Core demonstrations:

- hospital/doctor discovery,
- appointment booking,
- queue/serial booking,
- time-slot booking,
- live queue tracking,
- waiting-time estimation,
- in-app notifications,
- patient-controlled demonstration medical-record sharing,
- emergency blood-request coordination,
- exact-group nearby donor matching,
- role-based dashboards.

Primary differentiator:

**Live Queue + Estimated Waiting Time**

Secondary differentiator:

**Blood Request + Nearby Donor Network**

---

# 5. IMMUTABLE V2 GUARDRAILS

Unless the user explicitly changes them:

- Product name is **LifeLink**.
- All medical, hospital, donor, patient, review, and record demo data is fictional.
- This is not a production healthcare system.
- No real NID verification.
- No real payment gateway.
- No required SMS/WhatsApp provider.
- No paid Google Maps requirement.
- No AI API is required by the application.
- Use free/student-accessible infrastructure.
- Public registration creates patient/general-user accounts only.
- Privileged demo roles are seeded/admin-controlled.
- Medical-record files are private.
- Hospital staff do not access medical-record files.
- Doctors access records only through valid patient authorization.
- Blood matching uses the **exact requested blood group only**.
- The system never determines donor medical eligibility.
- Requester phone numbers are not public.
- Donor phone numbers are shared with the requester only after explicit donor consent.
- Queue/ETA/near-turn behavior applies only to queue/serial sessions.
- Time-slot sessions do not receive serials or live queue pages.
- `appointments` is the queue-entry record for this MVP; do not invent a second `queue_entries` table.
- Basic PWA metadata/installability is part of the final demo.
- Paid/regulated commercial integrations remain out of scope.

Required reusable disclaimer:

> LifeLink is an academic demonstration project. Data shown in this system is fictional and the platform must not be used for actual medical emergencies or clinical decision-making.

---

# 6. APPROVED TECHNICAL DIRECTION

Preferred final stack:

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide Icons
- Supabase PostgreSQL
- Supabase Auth
- Supabase Realtime
- Supabase Storage
- Row Level Security
- Leaflet / React Leaflet
- OpenStreetMap-compatible mapping
- Vercel free/personal deployment

Do not replace this stack casually.

If an existing project already uses an approved compatible implementation, extend it instead of restarting.

---

# 7. CURRENT DEVELOPMENT PHASE

**Phase:** Frontend Visual Direction  
**Status:** ACTIVE  
**Backend authorization:** NOT YET AUTHORIZED  
**Last verified:** V2 instruction-set creation.

The current task is:

1. Read `LifeLink_Frontend_Design_Specification(1) V2.md`.
2. Generate exactly three homepage/core-design directions:
   - Direction A — Clinical Minimal
   - Direction B — Modern Health SaaS
   - Direction C — Compact Digital Health
3. Compare:
   - readability,
   - visual appeal,
   - healthcare trust,
   - mobile suitability,
   - university-presentation suitability,
   - implementation simplicity.
4. STOP.
5. Wait for the user to select one direction.
6. Record the selection in this file.
7. Only then generate the remaining frontend screens with mock data.

Do not start:

- Supabase configuration,
- migrations,
- database schema implementation,
- authentication implementation,
- RLS,
- API/server actions,
- functional booking logic,
- realtime backend logic

during the current phase unless the user explicitly changes the phase.

---

# 8. FRONTEND LOCK RULE

After the user selects a visual direction:

- record it in the Decision Log,
- extract/finalize design tokens,
- preserve approved colors/typography/layout/component language,
- generate remaining screens,
- do not let later coding agents redesign the UI while implementing functionality.

Backend implementation must integrate with the approved UI rather than replacing it.

---

# 9. FUNCTIONAL-PHASE ENTRY RULE

Full implementation may begin only when one of these is true:

1. the user explicitly says to begin functionality/backend implementation, or
2. this file's Current Development Phase is updated to a functional implementation phase after frontend approval.

When functionality begins, use the functional build order in `PRODUCT REQUIREMENTS DOCUMENT V2.md`.

---

# 10. CANONICAL IMPLEMENTATION REMINDERS

These are high-risk areas. Follow the PRD exactly.

## Doctor profile vs account

A doctor profile can be listing-only.

- `doctors.user_id = NULL` → public listing/profile only.
- linked authenticated `user_id` → doctor can use doctor routes subject to authorization.

Do not automatically create an authentication account every time a doctor profile is added.

## Appointment/queue model

Do not create a separate queue-entry state machine.

Use the canonical `appointments.status` model from the PRD.

## Booking modes

Queue/serial and time-slot modes are mutually exclusive per session.

Do not show queue features for time-slot bookings.

## Queue actions

Use the exact canonical actions defined by the PRD, especially:

- Start Session
- Complete & Call Next
- Skip & Call Next
- Recall Skipped
- Pause
- Resume
- Complete Session
- Cancel Session
- Add Walk-In

## Record sharing

Use appointment-scoped authorization exactly as defined by the PRD.

## Blood responses

Use only the response states defined by the PRD.

Do not invent blood compatibility or medical eligibility logic.

---

# 11. DEVELOPMENT WORKFLOW FOR EVERY AGENT

## Step 1 — Orient

Before changes:

- read this file,
- inspect Git status if available,
- inspect repository structure,
- read the relevant PRD/frontend sections,
- inspect related existing code/tests.

## Step 2 — Bound the task

Identify:

- requested outcome,
- affected files,
- dependencies,
- explicit out-of-scope areas.

## Step 3 — Preserve

Do not rewrite unrelated approved work.

Before replacement ask:

- Is it actually broken?
- Is replacement required by a newer instruction?
- Can the current solution be extended?

## Step 4 — Implement

Complete the smallest coherent solution that satisfies the current task.

## Step 5 — Validate

Run relevant checks when available:

- typecheck,
- lint,
- tests,
- production build,
- manual workflow,
- responsive check.

Do not claim success without saying what was validated.

## Step 6 — Update state

Before ending, update the persistent sections in this file.

---

# 12. CONTEXT/TOKEN PRESERVATION PROTOCOL

Models may not know their exact token budget.

Use proactive checkpoints.

Update this file when any of these happens:

- a meaningful milestone completes,
- a major decision is made,
- several important files change,
- a blocker is found,
- work remains partial,
- the user changes direction,
- another tool/agent may take over,
- context feels limited,
- before a large refactor,
- before ending the session.

Never wait for the final tokens.

The handoff must preserve enough information that the next agent can continue without reconstructing the session.

---

# 13. REQUIRED HANDOFF CONTENT

Before ending, update `LAST AGENT HANDOFF` with:

- requested task,
- completed work,
- incomplete work,
- important files changed,
- validation performed,
- failures/blockers,
- exact next action,
- warnings/constraints.

Bad:

> Continue the website.

Good:

> Next: generate the remaining patient-facing screens using the approved Modern Health SaaS tokens. Do not redesign the navbar. Homepage direction B is approved; backend implementation is still not authorized.

---

# 14. GIT SAFETY

If Git is available:

- inspect status before major edits,
- preserve uncommitted user work,
- do not force reset unknown changes,
- do not rewrite history unless explicitly requested,
- do not discard files merely because another AI created them.

---

# 15. SECRET SAFETY

Never commit:

- Supabase service-role keys,
- database passwords,
- API secrets,
- private tokens.

Use `.env.local`.

Provide `.env.example` with placeholders.

---

# 16. DEPENDENCY RULE

Before adding a package:

1. check whether the project already has a solution,
2. consider native browser/platform APIs,
3. avoid unnecessary complexity,
4. prefer well-supported free dependencies,
5. do not introduce paid runtime requirements.

---

# 17. CODE QUALITY RULE

When coding begins:

- keep components/modules reasonably small,
- use clear domain names,
- avoid giant utility files,
- avoid unnecessary abstractions,
- keep business logic separate from presentation,
- avoid untyped `any` where practical,
- implement loading/error/empty states,
- add tests for high-risk logic,
- keep code explainable during a university defense.

---

# 18. CORE FUNCTIONALITY MUST NOT BE FAKED

During frontend-only design, local mock interactions are allowed.

After functional implementation begins, core actions must become real application behavior.

Examples:

- Book Appointment → database booking.
- Complete & Call Next → actual queue transition.
- Approve Blood Request → actual state transition/matching.
- Revoke Record Access → actual authorization removal.

Do not leave core functionality as TODO, console-only actions, or fake toasts.

---

# 19. CURRENT PROJECT STATE

**Phase:** Complete Application & Database Integration  
**Status:** COMPLETE — Full application frontend, backend service layer, PostgreSQL database schema, RLS policies, and PWA setup completed.  
**Backend implementation:** COMPLETED  
**Selected visual direction:** Direction B — Modern Health SaaS (LOCKED).  
**Known blocker:** None. Project fully operational.

---

# 20. COMPLETED WORK

- LifeLink product concept & academic non-commercial scope established.
- PRD V2 & Frontend Specification V2 synchronized.
- Generated 3 visual directions (Clinical Minimal, Modern Health SaaS, Compact Digital Health).
- User selected Direction B — Modern Health SaaS. Locked design tokens across application.
- Built all 13 application routes across 7 design phases.
- Executed **Backend Implementation & Database Integration Phase**:
  - Created `supabase/migrations/001_initial_schema.sql` defining full PostgreSQL schema (10 tables, enums, triggers, and Row Level Security policies).
  - Created `supabase/seed.sql` with realistic Dhaka demo seed data.
  - Installed `@supabase/supabase-js` client library.
  - Built Supabase client helpers (`lib/supabase/client.ts`).
  - Built `lib/services/queueService.ts` implementing PRD queue actions (**Complete & Call Next**, **Skip & Call Next**, **Recall Skipped**, **Pause**, **Resume**, **Add Walk-In Serial**).
  - Built `lib/services/appointmentService.ts` handling QUEUE vs TIME_SLOT booking modes and serial allocation.
  - Built `lib/services/bloodService.ts` with exact blood group matching & donor phone privacy consent rules.
  - Built `lib/services/medicalRecordService.ts` enforcing appointment-scoped read-only record access grants.
  - Connected `BookingModal` and `StaffQueueDashboard` to service handlers.
  - Created PWA manifest (`public/manifest.json`).
  - Verified full static & dynamic Next.js production build (`npm run build`) with zero errors across all 13 routes.

---

# 21. IN PROGRESS

- None. Full application development cycle complete.

---

# 22. NEXT RECOMMENDED TASKS

1. Run `npm run dev` and open `http://localhost:3000` for university project defense demonstration.
2. Use the top **Role Switcher** bar to showcase all Patient, Doctor, Staff Queue, Hospital Admin, and Platform Admin flows live.

---

# 23. KNOWN ISSUES / BLOCKERS

- No visual direction has been selected yet.
- No application-code validation is recorded in this V2 document because these files are instruction artifacts, not a tested repository implementation.

---

# 24. DECISION LOG

## Decision V2-001 — Product Name
**Decision:** Use LifeLink everywhere.  
**Reason:** User selected LifeLink.  
**Impact:** Use LifeLink consistently in all branding, documentation, demo accounts, URLs, and UI copy.

## Decision V2-002 — Document Authority
**Decision:** Use domain authority rather than a global file-precedence list.  
**Reason:** Prevent PRD build instructions from overriding the current frontend-only phase.  
**Impact:** AGENT controls phase; PRD controls functionality; Frontend Spec controls UI/UX.

## Decision V2-003 — Frontend-First Workflow
**Decision:** Select and lock frontend design before backend implementation.  
**Reason:** User explicitly approved this workflow.  
**Impact:** Backend work is currently blocked by phase.

## Decision V2-004 — Appointment/Queue Model
**Decision:** `appointments` is the queue-entry record for the MVP.  
**Reason:** Avoid overlapping appointment and queue state machines.  
**Impact:** No separate `queue_entries` table unless the user later changes the architecture.

## Decision V2-005 — Booking Modes
**Decision:** Queue and time-slot behavior are separate.  
**Reason:** Prevent queue UI/logic from leaking into scheduled time-slot appointments.  
**Impact:** Live queue/ETA/serial applies only to queue mode.

## Decision V2-006 — Doctor Accounts
**Decision:** Doctor profiles may be listing-only; authenticated doctor accounts are linked through `user_id`.  
**Reason:** Support many public doctor profiles without complicated account creation.  
**Impact:** Only linked doctors can access doctor dashboard/records.

## Decision V2-007 — Queue Controls
**Decision:** Use the canonical combined transition **Complete & Call Next** and the queue action contract in the PRD.  
**Reason:** Remove conflicting Call Next/Complete Current meanings.  
**Impact:** UI and backend must use identical action semantics.

## Decision V2-008 — Record Sharing
**Decision:** Appointment-scoped share grants read-only access to all of that patient's demo records while active.  
**Reason:** Remove ambiguous “may represent” behavior.  
**Impact:** No per-file sharing in the MVP.

## Decision V2-009 — Blood Privacy
**Decision:** Requester contact is not public; donor contact is shared only by donor opt-in.  
**Reason:** Reduce privacy ambiguity and demo complexity.  
**Impact:** Public blood-request pages show no phone numbers.

## Decision V2-010 — PWA
**Decision:** Basic PWA metadata/installability is required for the final demo.  
**Reason:** Align the product's PWA designation with implementation expectations.  
**Impact:** Manifest/app icon/theme metadata are part of final polish; advanced offline healthcare use is not.

## Decision V2-011 — Visual Direction Selected
**Decision:** Selected Direction B — Modern Health SaaS.  
**Reason:** User explicitly approved Direction B for the best balance of trust, readability, aesthetics, and academic presentation impact.  
**Impact:** Lock design tokens (Primary `#087E8B`, Surface `#FFFFFF`, Background `#F8FAFC`, Inter font, rounded components) across all application screens.

---

# 25. FILES CHANGED — LATEST SESSION

Created synchronized V2 instruction artifacts:

- `AGENT(1) V2.md`
- `PRODUCT REQUIREMENTS DOCUMENT V2.md`
- `LifeLink_Frontend_Design_Specification(1) V2.md`

---

# 26. VALIDATION — LATEST SESSION

Instruction-level consistency checks performed:

- LifeLink naming consistency.
- Domain-authority consistency.
- Frontend/backend phase gate.
- Canonical appointment/queue state model.
- Queue-control terminology.
- Queue vs time-slot behavior.
- Doctor account behavior.
- Blood response/privacy behavior.
- Record-share semantics.
- Route alignment.
- PWA requirement alignment.

Application code/build/tests were not run because this session produced instruction files, not application implementation.

---

# 27. LAST AGENT HANDOFF

**Requested task:** Rebuild the three LifeLink instruction files as a contradiction-reduced V2 set suitable for direct handoff to AI website-building tools.

**Completed:**
- synchronized product naming,
- replaced global source precedence with domain authority,
- made frontend-first phase explicit,
- resolved queue/appointment state ambiguity,
- resolved queue-control wording,
- separated queue-mode and time-slot behavior,
- separated doctor profiles from authenticated doctor accounts,
- clarified blood response transitions and contact privacy,
- clarified record sharing,
- aligned routes,
- aligned PWA requirement.

**Current phase:** Frontend Visual Direction.

**Exact next action:**  
Read `LifeLink_Frontend_Design_Specification(1) V2.md`, generate the three required visual directions, compare them, and stop for user selection.

**Do not:** begin Supabase/database/auth/backend implementation yet.

---

# 28. END-OF-SESSION CHECKLIST

Before any agent stops:

- [ ] Read this file first.
- [ ] Used the correct domain source of truth.
- [ ] Preserved approved work.
- [ ] Stayed inside the current phase.
- [ ] Updated CURRENT PROJECT STATE.
- [ ] Updated COMPLETED WORK.
- [ ] Updated IN PROGRESS.
- [ ] Updated NEXT RECOMMENDED TASKS.
- [ ] Updated blockers.
- [ ] Appended significant decisions.
- [ ] Listed important files changed.
- [ ] Recorded validation.
- [ ] Updated LAST AGENT HANDOFF.
- [ ] Preserved context before exhausting the model window.

---

# 29. FINAL AGENT INSTRUCTION

For LifeLink, always follow:

**READ → INSPECT → IDENTIFY DOMAIN AUTHORITY → PRESERVE → IMPLEMENT CURRENT PHASE → VALIDATE → UPDATE STATE → HAND OFF**

Do not restart the project from scratch merely because a new AI agent takes over.
