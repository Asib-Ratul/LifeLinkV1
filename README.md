# LifeLink

LifeLink is a university healthcare access prototype for Bangladesh. It demonstrates fictional doctor and hospital discovery, appointment booking, queue controls, blood request responses, and medical record preferences.

> **Demo only:** All people and operational data are fictional. Interactive state is stored in the current browser. There is no sign-in, backend booking, live queue, donor alert, document upload, payment, or connection to a hospital or clinician. Do not enter real personal or health information. Do not use for emergencies or clinical decisions.

## Run locally

Requirements: Node.js 20 or newer and npm.

```powershell
npm ci
npm run dev
```

Open <http://localhost:3000>. No environment variables are needed for the browser-local demo. Use **Reset demo data** in the top bar to clear locally saved demo interactions.

## Project layout

```text
src/
  app/           Next.js App Router routes and global styles
  components/    Shared UI, layout, modal, and homepage directions
  data/          Fictional display fixtures
  lib/
    demo/        Browser-local demo persistence
    services/    Demo booking, blood, and queue behavior
    supabase/    Optional client factory; not connected to current UI flows
  types/         Shared domain types
docs/            Product requirements, design specification, project status
public/          PWA manifest and icons
supabase/
  migrations/    Database schema and RLS policies
  seed.sql       Fictional SQL seed data
```

## Commands

```powershell
npm run dev       # local development
npm run typecheck # TypeScript check
npm run build     # production build
npm run start     # serve a production build
```

## Supabase status

Supabase is not currently wired to the UI. The SQL files are a backend foundation, not evidence of a deployed or operational backend. If the project is extended, apply migrations in order (`001_initial_schema.sql`, then `002_security_hardening.sql`), configure authentication and private Storage policies, implement trusted server-side state transitions, and only then connect UI flows. Never put a service-role key in a `NEXT_PUBLIC_` variable.

## Project references

- [Product requirements](docs/PRODUCT_REQUIREMENTS.md)
- [Frontend design specification](docs/FRONTEND_DESIGN.md)
- [Current development status](docs/DEVELOPMENT.md)
