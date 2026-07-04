# Yalla Viral

AI-powered business growth agency website — a dark-themed landing page and dashboard with a gold/amber aesthetic.

## Stack

- **Framework:** React 18 + Vite 5
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`)
- **UI Components:** shadcn/ui (New York style) on Radix UI
- **Animation:** Framer Motion + Lenis smooth scroll
- **Routing:** wouter
- **Data:** TanStack Query v5, React Hook Form + Zod
- **AI Voice:** `@vapi-ai/web` (Vapi AI call integration)

## Running the project

```bash
pnpm install       # install dependencies
pnpm run dev       # start dev server (port driven by PORT env var)
```

The dev workflow is `pnpm --filter @workspace/yalla-viral run dev`.
The artifact service sets `PORT=23010`; the Vite config reads that automatically.

## Design references

- `DESIGN.md` — branding, color system (HSL tokens), typography, animation principles
- `COLOR-TOKENS.md` — full token reference
- `src/index.css` — Tailwind imports and semantic HSL token definitions

## User preferences

<!-- Add user preferences here as you learn them -->
