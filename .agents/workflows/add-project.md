---
description: Add a new project card to the portfolio without touching components
---

# Add a project

Ask the owner for anything not already provided. Never invent details.

Required: project name, one-line summary (English and Arabic), stack, at least one link (GitHub or live demo).
Optional: longer description (EN/AR), achievement badge (EN/AR), screenshots, featured flag.

1. Read `src/content/projects.ts` and `src/content/skills.ts`.
2. Every technology in the stack must already exist in `skills.ts`. If one is missing, add it there first (set `show: false` if it should not appear in the Skills section).
3. Append one object to the `projects` array in `src/content/projects.ts`. Fields not provided are omitted, not left as empty strings.
4. If screenshots were provided, save them as `public/projects/<id>/1.webp`, `2.webp`, ... (max 1600px wide, under 250 KB each) and list the paths in `images`.
5. Do not edit any file in `src/components/` or `src/app/`.
6. Run `npm run lint` and `npm run build`. Fix only errors caused by this change.
7. Open the Projects section in the browser in EN and AR, check the card and its modal, and report what was added.
