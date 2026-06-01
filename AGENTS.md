# Agent Instructions for Utly

Context and conventions for AI agents working in this repository.

## Architecture & Tech Stack

- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript.
- **Styling:** Tailwind CSS v4. **Do not look for or create `tailwind.config.js`.** All config is handled via `@import "tailwindcss"` in `app/globals.css`.
- **Database:** Prisma ORM with Neon Serverless Postgres (`@prisma/adapter-neon`, `@neondatabase/serverless`).
- **State/Mutations:** Server Actions are used for backend mutations (e.g., `app/actions.ts`).
- **Testing:** Vitest + jsdom + `@testing-library/react`. Config: `vitest.config.ts` and `vitest.setup.ts` (root). Tests live in `__tests__/` mirroring the `components/` or `app/` tree (e.g. `__tests__/seo/`).

## Core Conventions

- **Privacy & Client-Side Processing:** A core feature of Utly is privacy. Whenever possible, process data entirely in the browser.
  - Examples: Magic Eraser uses WASM directly in the browser. The Randomizer (Sorteador) reads TXT/CSV files via `FileReader` on the client. Do NOT send user files or data to the backend unless absolutely necessary.
- **Spec-Driven Development (SDD):** Technical specifications are maintained in `docs/specs/`. Before implementing a new feature or making significant modifications, read and update the corresponding `SPEC.md` to maintain a single source of truth.
- **Implementation plans:** Living plans for active initiatives live in `docs/plans/`. They reference the matching `docs/specs/<name>/SPEC.md`.
- **No User Auth / Paywalls:** The MVP specifically avoids mandatory login or paywalls. Do not add authentication gates or premium accounts to core tools unless explicitly requested.
- **SEO layer:** Every tool page must ship a `SoftwareApplicationSchema` (from `components/seo/`) declaring `price: "0"` in BRL, plus a `HowToGuide` and a `FAQStructured`. Copy should lean on the client-side / privacy differentiator. See `docs/specs/spec-seo/SPEC.md`.

## Developer Workflow

- **Standard Commands:**
  - `npm run dev` — start the local server.
  - `npm run lint` — run ESLint.
  - `npm test` — run the Vitest suite once. `npm run test:watch` for watch mode.
  - `npm run build` — production build.
  - `npm install` automatically triggers `prisma generate` via `postinstall`.
- **Database sync:** Use `npx prisma db push` rather than `migrate dev` to apply schema changes (per current MVP guidelines).
- **Prisma Client:** The client is initialized in `lib/prisma.ts` using the Neon serverless WebSocket adapter (`ws`). Always import `prisma` from `@/lib/prisma` rather than instantiating it yourself.
- **TDD for new features:** When building new components/utilities, write Vitest specs in `__tests__/` first, run them to confirm they fail, then implement. Do not modify existing tests to make them pass.

## Known Quirks & Project Constraints

- **Link Shortener Middleware (`proxy.ts`):** The link redirection logic resides in `proxy.ts` at the root, which acts as the Next.js middleware. **Important:** If you add a new tool or route (e.g., `/sorteador`), you MUST add its path to the regex matcher exclusion list at the bottom of `proxy.ts`, otherwise the middleware will intercept it as a short link and return a redirect. The current exclusion list covers: `api`, `_next/*`, `favicon.ico`, `sitemap.xml`, `robots.txt`, `shortener`, `remove-bg`, `qrcode`, `sorteador`, and common image extensions.
- **Tool Integration:** When adding a new tool, remember to update:
  - `components/layout/AppShell.tsx` (Sidebar Navigation)
  - `components/ui/InternalPromo.tsx` (Sidebar Ad slot)
  - `components/ui/SeeAlso.tsx` (Footer cross-linking)
  - `app/page.tsx` (Home page cards)
  - `proxy.ts` (matcher exclusion list, see above)
- **Line endings:** Some tracked files use CRLF. When editing with tools that re-save, normalize to the file's existing EOL to avoid spurious diffs.
- **Pre-existing lint errors:** Several files (`app/sorteador/page.tsx`, `app/shortener/page.tsx`, `components/ui/InternalPromo.tsx`, `app/actions.ts`) have unresolved lint errors (`no-explicit-any`, `prefer-const`, `set-state-in-effect`). These are technical debt; do not block new work on them, and do not introduce *new* ones.
- **Environment Constraints:** Requires `DATABASE_URL` configured in a `.env` file for local development.
- **Release flow:** `.github/workflows/release.yml` runs on `main` and uses `semantic-release`. Conventional commit messages are required.
