# Agent Instructions for Utly

This file provides context and conventions for AI agents working in this repository.

## Architecture & Tech Stack

- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript.
- **Database:** Prisma ORM with Neon Serverless Postgres (`@prisma/adapter-neon`, `@neondatabase/serverless`).
- **Styling:** Tailwind CSS v4.
- **Client-Side AI:** The Magic Eraser tool uses `@imgly/background-removal` (WASM + ONNX) directly in the browser. Do not move this processing to the server; privacy (client-side only processing) is a core feature.
- **State/Mutations:** Server Actions are used for backend mutations (e.g., `app/actions.ts`).

## Developer Workflow

- **Database sync:** Use `npx prisma db push` rather than `migrate dev` to apply schema changes (per current MVP guidelines).
- **Prisma Client:** The client is initialized in `lib/prisma.ts` using the Neon serverless WebSocket adapter (`ws`). Always import `prisma` from `@/lib/prisma` rather than instantiating it yourself.
- **Standard Commands:** 
  - `npm run dev` to start the local server.
  - `npm run lint` to lint the application.
  - `npm install` automatically triggers `prisma generate` via `postinstall`.

## Known Quirks & Project Constraints

- **Link Shortener Middleware:** The link redirection logic currently resides in `proxy.ts` at the root. Next.js natively expects this file to be named `middleware.ts` to execute as middleware. If debugging routing or redirect issues, be aware of this potentially non-standard setup.
- **No User Auth / Paywalls:** The MVP specifically avoids mandatory login or paywalls. Do not add authentication gates or premium accounts to core tools unless explicitly requested.
- **Environment Constraints:** Requires `DATABASE_URL` configured in a `.env` file for local development.