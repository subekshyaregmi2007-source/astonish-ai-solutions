# AI-Solutions

A full-stack website for AI-Solutions — a fictitious AI startup based in Sunderland, UK that delivers AI-powered virtual assistants and digital employee experience software to global industries.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm --filter @workspace/ai-solutions run dev` — run the frontend (port 21069)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string (auto-provisioned)
- Optional env: `ADMIN_PASSWORD` — admin dashboard password (defaults to `admin123`)

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, Tailwind CSS, Framer Motion, shadcn/ui, wouter, TanStack Query
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (zod/v4), drizzle-zod
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `lib/api-spec/openapi.yaml` — source of truth for all API contracts
- `lib/db/src/schema/` — Drizzle DB schema (solutions, industries, testimonials, articles, events, inquiries)
- `artifacts/api-server/src/routes/` — Express route handlers
- `artifacts/ai-solutions/src/` — React frontend (pages, components, hooks)

## Architecture decisions

- Contract-first API: OpenAPI spec gates codegen which gates the frontend — all types flow from `openapi.yaml`
- Admin auth uses a simple static token (x-admin-token header) stored in localStorage — no user accounts needed
- Admin password defaults to `admin123`, configurable via `ADMIN_PASSWORD` env var
- All data is seeded via SQL — solutions, industries, testimonials, articles, events, and sample inquiries

## Product

- **Home** (`/`) — Animated hero, stats, solutions preview, testimonials, events, articles
- **Solutions** (`/solutions`) — 6 AI software solutions with feature lists
- **Industries** (`/industries`) — 5 industry transformation case studies
- **Testimonials** (`/testimonials`) — Client testimonials with star ratings
- **Articles** (`/articles`, `/articles/:id`) — Company news and thought leadership
- **Events** (`/events`) — Past and upcoming events with photo galleries
- **Contact** (`/contact`) — Contact Us form (name, email, phone, company, country, job title, job details)
- **Admin** (`/admin`) — Password login → dashboard with inquiry analytics

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- After any OpenAPI spec change, always run `pnpm --filter @workspace/api-spec run codegen` before touching routes or frontend
- Admin token is a static string (`ai-solutions-admin-secret-token-2024`) — for production, replace with JWT
- Body schema components must use entity-shaped names (not operation-shaped like `CreateNoteBody`) to avoid TS2308 Orval collisions

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
