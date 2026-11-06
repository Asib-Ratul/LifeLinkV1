# Development status and handoff

## Current state

LifeLink is a frontend academic prototype using fictional Dhaka-area demo data. The selected visual direction is **Direction B — Modern Health SaaS**.

Interactive booking, queue, donor-response, and record-preference behavior is simulated in the browser and stored in `localStorage` under the `lifelink-demo:` prefix. The app has no authentication, live backend connection, hospital integration, donor notifications, payment processing, file upload, or clinical workflow. The role switcher is for preview only and is not access control.

The Supabase migration files are an un-deployed backend foundation. They must not be described as an operational backend. `002_security_hardening.sql` removes permissive policies from the first migration. It still needs to be reviewed and applied in a controlled Supabase project before any data is connected.

## Product guardrails

- All people, hospitals, appointments, blood requests, records, and metrics shown in the app are demo data.
- Do not enter real personal or health information.
- Never use the app for actual emergencies or clinical decisions.
- Keep service-role secrets server-side. Never expose them in `NEXT_PUBLIC_` variables.
- Do not add real payment, NID, SMS, or donor contact exchange without explicit product and security review.
- Exact blood-group matching does not establish donor eligibility.
- Queue and time-slot booking are distinct: only queue bookings have serials or queue estimates.

## Project structure

- `src/app`: Next.js routes and global stylesheet.
- `src/components`: Shared presentation components and the three homepage directions.
- `src/data`: Fictional fixtures.
- `src/lib/demo`: Browser-only demo persistence helpers.
- `src/lib/services`: Local simulation behavior; not API clients.
- `src/lib/supabase`: Optional client factory, currently unused by app flows.
- `src/types`: Shared TypeScript domain types.
- `docs`: Product and design source documents plus this handoff.
- `supabase`: SQL migrations and fictional seed content.
- `public`: PWA manifest and icon assets.

## Next work

1. If backend functionality is authorized, design authentication and role assignment first; the current role switcher cannot be reused as authorization.
2. Apply the migrations to a disposable Supabase project and verify RLS as anon, patient, doctor, staff, hospital admin, and platform admin.
3. Implement trusted server-side RPCs for booking and queue state transitions, with atomic serial allocation.
4. Configure private Supabase Storage and authorization before handling any record files.
5. Add real-time notifications only after user identity, consent, and row-level access are enforced.
6. Connect pages to server actions/API routes and remove local demo persistence only when each workflow is complete.

## Validation

Use `npm run typecheck` and `npm run build` for application checks. SQL authorization changes require database-level policy tests before deployment.
