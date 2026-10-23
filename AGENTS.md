# AGENTS.md - Islam Raad Portfolio

## Project
Personal portfolio for Islam Raad (AI Engineering student, University of Mosul).
Static site: Next.js (App Router, `output: 'export'`) + React + TypeScript + Tailwind CSS v4 + `motion`.
Bilingual (English + Arabic RTL), dark/light theme, hosted on Netlify.
No backend, no admin panel, no database. The only network call is the Formspree contact POST.

## Read first (in this order)
1. docs/PRD.md  2. docs/DESIGN.md  3. docs/ARCHITECTURE.md  4. docs/CONTENT.md  5. docs/TASKS.md

If the docs conflict with this file, this file wins. If information is missing, ask the owner. Never invent facts about the owner.

## How to work
- Work ONE phase at a time from docs/TASKS.md.
- Before each phase: write a short plan and wait for approval.
- After each phase: run the checks below, summarize what changed, tick the boxes in docs/TASKS.md, then STOP and wait. Never start the next phase on your own.
- Keep changes scoped to the current phase. Do not refactor unrelated files.
- Verify in the browser at widths 375px and 1280px, in both themes, in both languages (EN and AR/RTL).

## Commands
- `npm run dev`, `npm run build`, `npm run lint`
- A phase is done only when build and lint pass with no errors introduced by you.

## Hard rules
1. All visible text lives in `src/content/`. No hardcoded visible text in components.
2. Every visible string has both `en` and `ar` (type `L`).
3. One section = one folder in `src/components/sections/<name>/`. Sections never import each other. Shared UI goes in `src/components/ui/`.
4. Colors, radii, blur and durations come from CSS variables / `@theme` in `src/app/globals.css`. No raw hex values in components.
5. RTL-safe: use logical utilities (`ms-`, `me-`, `ps-`, `pe-`, `start-`, `end-`, `text-start`). Flip directional icons with `rtl:rotate-180`.
6. Static export only: no API routes, no server actions, no middleware, no image optimizer (plain `<img>` or `unoptimized`), no runtime fetch except Formspree.
7. Never invent facts, numbers, testimonials, links or screenshots. Missing data means the element is hidden (optional fields).
8. No secrets in code. The Formspree id comes from `NEXT_PUBLIC_FORMSPREE_ID` (`.env.local`, gitignored; also set in Netlify).
9. Accessibility: landmarks, visible focus ring, aria-labels on icon-only buttons, modal focus trap + Esc + focus return, AA contrast, honor `prefers-reduced-motion`.
10. Animation: `motion/react` only. Do not add anime.js, GSAP or other animation libraries.
11. Dependencies: only those listed in docs/ARCHITECTURE.md. Ask before adding anything else.
12. Owner preference: no explanatory code comments. Use clear names instead. A comment is allowed only for a non-obvious workaround.
13. Check current Next.js, Tailwind v4 and `motion` docs before writing config or API syntax. Do not rely on memory.
14. Scaffolding: if the Next.js scaffolder would overwrite `AGENTS.md`, `docs/` or `.agents/`, scaffold in a temporary folder and merge. Never overwrite these files.

## Folder map
```
AGENTS.md
.agents/workflows/add-project.md
docs/            PRD, DESIGN, ARCHITECTURE, CONTENT, TASKS, PROMPTS
public/          images/ (photo), projects/<id>/ (screenshots), cv optional
src/app/         layout.tsx, page.tsx, globals.css
src/content/     site.ts, profile.ts, projects.ts, skills.ts, achievements.ts, ui.ts
src/components/  sections/<name>/, ui/, layout/ (Navbar, Toggles, SectionSwitcher)
src/lib/         i18n, theme, motion variants, media queries
src/types/       index.ts
```
Full detail is in docs/ARCHITECTURE.md.

## Definition of done (every phase)
- build and lint pass
- no console errors or hydration warnings in the browser
- EN and AR both render correctly (RTL layout mirrors, no overflow)
- dark and light both look right (accent text meets contrast, see DESIGN.md)
- no horizontal scroll at 375px or 1280px
- docs/TASKS.md updated

## Editing later (owner workflow)
- Add a project: `src/content/projects.ts` plus images in `public/projects/<id>/`. Use the `/add-project` workflow.
- Add a skill: `src/content/skills.ts`.
- Hide or reorder sections: `src/content/site.ts`.
- Change colors or fonts: `src/app/globals.css` only.
None of these may require touching component files.
