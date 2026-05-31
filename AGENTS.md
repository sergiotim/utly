# Agent Instructions for Utly

This file provides context and conventions for AI agents working in this repository.

## Architecture & Tech Stack

- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript.
- **Styling:** Tailwind CSS v4. **Do not look for or create `tailwind.config.js`.** All config is handled via `@import "tailwindcss"` in `app/globals.css`.
- **Database:** Prisma ORM with Neon Serverless Postgres (`@prisma/adapter-neon`, `@neondatabase/serverless`).
- **State/Mutations:** Server Actions are used for backend mutations (e.g., `app/actions.ts`).

## Core Conventions

- **Privacy & Client-Side Processing:** A core feature of Utly is privacy. Whenever possible, process data entirely in the browser.
  - Examples: Magic Eraser uses WASM directly in the browser. The Randomizer (Sorteador) reads TXT/CSV files via `FileReader` on the client. Do NOT send user files or data to the backend unless absolutely necessary.
- **Spec-Driven Development (SDD):** Technical specifications are maintained in `docs/specs/`. Before implementing a new feature or making significant modifications, read and update the corresponding `SPEC.md` to maintain a single source of truth.
- **No User Auth / Paywalls:** The MVP specifically avoids mandatory login or paywalls. Do not add authentication gates or premium accounts to core tools unless explicitly requested.

## Developer Workflow

- **Database sync:** Use `npx prisma db push` rather than `migrate dev` to apply schema changes (per current MVP guidelines).
- **Prisma Client:** The client is initialized in `lib/prisma.ts` using the Neon serverless WebSocket adapter (`ws`). Always import `prisma` from `@/lib/prisma` rather than instantiating it yourself.
- **Standard Commands:** 
  - `npm run dev` to start the local server.
  - `npm run lint` to lint the application.
  - `npm install` automatically triggers `prisma generate` via `postinstall`.

## Known Quirks & Project Constraints

- **Link Shortener Middleware (`proxy.ts`):** The link redirection logic resides in `proxy.ts` at the root, which acts as the Next.js middleware. **Important:** If you add a new tool or route (e.g., `/sorteador`), you MUST add its path to the regex matcher exclusion list at the bottom of `proxy.ts`, otherwise the middleware will intercept it as a short link and return a 404/redirect.
- **Tool Integration:** When adding a new tool, remember to update:
  - `components/layout/AppShell.tsx` (Sidebar Navigation)
  - `components/ui/InternalPromo.tsx` (Sidebar Ad slot)
  - `components/ui/SeeAlso.tsx` (Footer cross-linking)
  - `app/page.tsx` (Home page cards)
- **Environment Constraints:** Requires `DATABASE_URL` configured in a `.env` file for local development.