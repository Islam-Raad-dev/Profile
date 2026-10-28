# TASKS - Islam Raad Portfolio

Rules: one phase at a time. Plan first, wait for approval, build, verify, tick boxes, stop. Owner time budget: about 2 hours per day for 2 days (about 230 minutes of work in total).

Schedule
- **Day 1 (about 2h):** Phase 0, 1, 2, start of 3
- **Day 2 (about 2h):** finish 3, Phase 4, 5, 6

**Cut line (if time runs short):** ship a working scroll-layout site everywhere (skip the desktop section switcher in Phase 4B). Phases 0 to 3, 4A, 5 and 6 are the must-haves.

## Owner to-do (not for the agent)
- [x] Put the formal photo at `public/images/islam.webp` (1200x1500, under 200 KB). Before Phase 1 ends if possible.
- [x] Create a Formspree form and copy its id into `.env.local` as `NEXT_PUBLIC_FORMSPREE_ID` (before Phase 3).
- [x] Open the CV link in a private window and confirm it works; same for the two GitHub links.
- [ ] Review the Arabic text in `docs/CONTENT.md`.
- [ ] Create an empty GitHub repo for the portfolio (before Phase 6).
- [ ] Optional: one screenshot per project to `public/projects/<id>/1.webp`.

---

## Phase 0 - Foundation (about 20 min)
- [x] Scaffold Next.js (TypeScript, ESLint, Tailwind v4, App Router, `src/`) without overwriting `AGENTS.md`, `docs/`, `.agents/`
- [x] `next.config`: static export, unoptimized images
- [x] `globals.css`: all tokens from DESIGN.md (dark + light), `@theme`, class-based dark variant, `html[data-lite]` rules, reduced-motion base
- [x] Fonts via `next/font` (Inter, Archivo Black, Permanent Marker, Cairo) exposed as CSS variables; Arabic switches fonts
- [x] `INIT_SCRIPT` (theme, lang, dir, lite) injected before paint
- [x] `LangProvider`, `ThemeProvider`, `useMediaQuery`, shared motion variants
- [x] `types/index.ts`, empty typed content files, `.env.example`, `.gitignore` covers `.env.local`
- [x] `netlify.toml`, `public/icon.svg` ("IR" monogram)
- [x] `git init` and first commit

**Acceptance:** `npm run dev` shows a page with a working theme toggle and language toggle (RTL flips), no flash on refresh, build and lint pass.

## Phase 1 - Content layer, Hero, About (about 40 min)
- [x] Fill `src/content/*.ts` from CONTENT.md (all sections' data, UI strings, EN + AR)
- [x] `ui/` primitives: `SectionHeader`, `Button`, `Reveal`, `Chip`, `SocialIcons` (inline SVG GitHub/LinkedIn/WhatsApp + lucide Mail)
- [x] Hero section per DESIGN.md 5.3 (greeting, two-line name, role, tagline, short bio, 3 buttons, socials, photo with monogram fallback, intro animation)
- [x] About section: long bio, education card, activities timeline

**Acceptance:** Hero and About look right in EN and AR, dark and light, at 375px and 1280px. Buttons link correctly (CV opens, Contact target exists as an anchor placeholder). No hardcoded text in components.

## Phase 2 - Projects (about 40 min)
- [x] `TechLogo` with `simple-icons` slug lookup and monogram fallback (verify each slug; report any missing)
- [x] `ProjectCover` (screenshot or generated fallback, `onError` fallback)
- [x] `ProjectCard`, grid, featured-first ordering, badge, stack chips (max 5 then +n)
- [x] `ProjectModal` (lazy loaded): accessible dialog, blur-fade motion, links only when present, gallery when several images
- [x] `showComingSoon` flag support (default off)

**Acceptance:** two cards render (Napta first). Modal opens/closes by click, Esc and backdrop; focus returns to the card; Social Media App modal has no Live demo button; layout holds with 1, 2 or 6 projects (test by temporarily duplicating data, then revert).

## Phase 3 - Skills, Achievements, Contact (about 50 min)
- [x] Skills grid: featured six first and larger, rest after, hover label, brand colour on hover, staggered reveal
- [x] Achievements: two groups, cards with icon + status pill
- [x] Contact: link rows (email, WhatsApp with number shown LTR, LinkedIn, GitHub, CV) and the Formspree form with validation, honeypot, 4 states, disabled fallback if env missing
- [x] Footer line

**Acceptance:** form posts successfully to Formspree from the browser (test with a real submission) and shows localized success; with the env var removed it shows the disabled message instead of crashing. All logos render or fall back cleanly.

## Phase 4A - Navigation and scroll layout (about 25 min)
- [x] `Navbar` per DESIGN.md 5.1 generated from `site.sections` (active pill with `layoutId`, `aria-current`)
- [x] `Toggles` pill (language + theme) in the top corner
- [x] `ScrollLayout` with all sections, IntersectionObserver scroll-spy, smooth scroll (instant under reduced motion), bottom padding for the nav
- [x] Skip link

**Acceptance:** whole site works as one scrolling page on every device; the nav highlights the right section while scrolling; disabling a section in `site.ts` removes it from page and nav with no other edits.

## Phase 4B - Desktop section switcher (about 20 min) - skippable (cut line)
- [x] `SectionSwitcher`: one section at a time, `AnimatePresence mode="wait"`, direction-aware slide that mirrors in RTL
- [x] Hash sync (`#projects`), back/forward, ArrowLeft/ArrowRight (reversed in RTL)
- [x] Internal scroll for tall panels, nav clearance
- [x] `App.tsx` picks switcher on fine-pointer desktop and scroll layout on touch (after mount, no hydration warning)

**Acceptance:** desktop transitions are smooth, no layout jump, hash and back button work, resizing across 768px or switching to touch does not break state, reduced motion falls back to crossfade.

## Phase 5 - Polish and QA (about 30 min)
- [x] Lite mode verified on phone width (no backdrop blur on cards, lighter animation)
- [x] Full matrix: {375px, 1280px} x {dark, light} x {EN, AR}; fix overflow, clipped text, wrong icon directions
- [x] Keyboard-only pass (nav, toggles, cards, modal, form); focus ring visible everywhere
- [x] Contrast pass (light-mode accent text uses `--accent-text`)
- [x] Reduced-motion pass
- [x] Remove unused files/dependencies; `npm run lint` and `npm run build` clean; no console errors or hydration warnings
- [x] Review bundle: lazy chunks for modal/switcher confirmed

**Acceptance:** agent reports the QA matrix result with screenshots from the built-in browser, and a short list of known issues if any.

## Phase 6 - Deploy (about 20 min)
- [ ] Push to the GitHub repo (owner creates it)
- [ ] Netlify: import repo, build `npm run build`, publish `out`, env var `NEXT_PUBLIC_FORMSPREE_ID`
- [ ] Choose an available `*.netlify.app` name
- [ ] Verify live: both languages, both themes, form submission, CV link, GitHub and live-demo links, refresh on `#projects`
- [ ] Optional: enable Netlify's built-in analytics (free plan keeps 1 day of history)

**Acceptance:** public URL works on a real phone and a desktop; the form email arrives; nothing 404s.

---

## Enhancements (owner requests after Phase 5)
- [x] Digital CV ("Fast Report") modal with deep links to Projects/Achievements cards
- [x] Hero "Soft Elastic Neural Grid" canvas background (replaces the static SVG grid; static under reduced motion)

---

## After launch (owner, no agent needed beyond `/add-project`)
- [ ] Add projects 3 to 5 when ready
- [ ] Add screenshots for Napta and Social Media App
- [ ] Add work/internship experience when it exists
- [ ] Consider an Open Graph preview image so links look good on LinkedIn/WhatsApp (not in v1)
