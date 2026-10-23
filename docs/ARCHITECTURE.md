# ARCHITECTURE - Islam Raad Portfolio

Goal: modular and data-driven, so content changes never touch components and sections never affect each other.

## 1. Stack
| Concern | Choice |
|---|---|
| Framework | Next.js (latest stable, App Router) with `output: 'export'` |
| UI | React (version that ships with that Next.js), TypeScript strict |
| Styling | Tailwind CSS v4 (`@tailwindcss/postcss`) + CSS variables |
| Animation | `motion` (import from `motion/react`) |
| Icons | `lucide-react` (UI icons), `simple-icons` (tech logos), inline SVG for GitHub / LinkedIn / WhatsApp |
| Fonts | `next/font/google`: Inter, Archivo Black, Permanent Marker, Cairo |
| Forms | Formspree (client-side POST) |
| Hosting | Netlify (free), GitHub repo as source |
| Lint | ESLint (Next.js config) |

Allowed dependencies: `next react react-dom tailwindcss @tailwindcss/postcss postcss motion lucide-react simple-icons` plus dev: `typescript @types/react @types/react-dom @types/node eslint eslint-config-next`. Anything else needs the owner's approval.

Always scaffold with the current official `create-next-app` options (TypeScript, ESLint, Tailwind, App Router, `src/` directory) and check current docs for Next.js and Tailwind v4 syntax.

## 2. Next.js config
- `output: 'export'`, `images: { unoptimized: true }`, `trailingSlash: true` is optional.
- No API routes, no server actions, no middleware, no `headers()`/`redirects()` in `next.config` (ignored by static export).
- One route: `/` (all sections live on the home page). A static `404` page is generated automatically.

## 3. Folder structure
```
.
├── AGENTS.md
├── .agents/workflows/add-project.md
├── docs/                         PRD, DESIGN, ARCHITECTURE, CONTENT, TASKS, PROMPTS
├── netlify.toml
├── .env.example                  NEXT_PUBLIC_FORMSPREE_ID=
├── .env.local                    (gitignored)
├── public/
│   ├── images/islam.webp
│   ├── icon.svg
│   └── projects/<id>/1.webp
└── src/
    ├── app/
    │   ├── layout.tsx            fonts, metadata, init script, providers
    │   ├── page.tsx              renders <App />
    │   └── globals.css           tokens, @theme, base styles
    ├── content/                  ALL text and data
    │   ├── site.ts               sections order/enabled, links, flags
    │   ├── profile.ts            name, role, tagline, bios, education, activities
    │   ├── projects.ts
    │   ├── skills.ts
    │   ├── achievements.ts
    │   └── ui.ts                 UI strings (buttons, labels, nav, form messages)
    ├── components/
    │   ├── App.tsx               chooses layout mode, renders sections
    │   ├── layout/
    │   │   ├── Navbar.tsx
    │   │   ├── Toggles.tsx       language + theme
    │   │   ├── SectionSwitcher.tsx   desktop one-at-a-time view
    │   │   └── ScrollLayout.tsx      single scrolling page
    │   ├── sections/
    │   │   ├── hero/
    │   │   ├── about/
    │   │   ├── projects/         ProjectsSection, ProjectCard, ProjectModal, ProjectCover
    │   │   ├── skills/
    │   │   ├── achievements/
    │   │   └── contact/
    │   └── ui/                   SectionHeader, Button, Reveal, Chip, TechLogo, SocialIcons
    ├── lib/
    │   ├── i18n.tsx              LangProvider, useLang, t()
    │   ├── theme.tsx             ThemeProvider, useTheme
    │   ├── motion.ts             shared variants (blurFade, reveal, sectionSlide)
    │   ├── media.ts              PHONE_QUERY, TOUCH_QUERY, useMediaQuery, useReducedMotion helper
    │   └── scripts.ts            INIT_SCRIPT string
    └── types/index.ts
```
Rules: sections import only from `ui/`, `lib/`, `content/` and `types/`. `layout/` imports sections only through the registry in `App.tsx`. Nothing imports upward.

## 4. Types (`src/types/index.ts`)
```ts
export type Lang = 'en' | 'ar'
export type L = { en: string; ar: string }

export type SectionId = 'home' | 'about' | 'projects' | 'skills' | 'achievements' | 'contact'

export type SkillCategory = 'language' | 'framework' | 'ai' | 'database' | 'tool'
export type Skill = {
  id: string
  name: string
  icon?: string            // simple-icons slug; omitted means monogram badge
  category: SkillCategory
  featured?: boolean       // shown first and larger in the Skills section
  show?: boolean           // default true; false = only used for project stacks
}

export type Project = {
  id: string               // slug, also the image folder name
  title: L
  summary: L
  description?: L
  stack: string[]          // skill ids
  repo?: string
  live?: string
  download?: string
  images?: string[]        // /projects/<id>/1.webp
  featured?: boolean
  badge?: L
}

export type Achievement = {
  id: string
  kind: 'award' | 'program' | 'certificate'
  title: L
  issuer?: L
  status?: L
  note?: L
}

export type TimelineItem = { id: string; role: L; org: L; period: L }
export type Education = { school: L; faculty: L; program: L; stage: L; note?: L }
```
Optional fields that are absent never render (no empty boxes, no dead buttons).

## 5. Site config (`src/content/site.ts`)
```ts
export const site = {
  sections: [
    { id: 'home', enabled: true },
    { id: 'about', enabled: true },
    { id: 'projects', enabled: true },
    { id: 'skills', enabled: true },
    { id: 'achievements', enabled: true },
    { id: 'contact', enabled: true },
  ],
  showComingSoon: false,
  email, phoneDisplay, whatsappUrl, github, linkedin, cvUrl
}
```
Navbar, layouts and switcher are generated from `site.sections`. Disabling a section removes it everywhere with no other change.

## 6. i18n
- `L` objects in content files; `t(l)` returns `l[lang]`.
- `LangProvider` holds `lang`, sets `document.documentElement.lang` and `dir`, writes `localStorage.lang`.
- Initial language is resolved by the inline init script before first paint (stored value, else browser language starting with `ar` gives `ar`, else `en`). The provider reads the already-set `html[lang]` on mount, so there is no flash and no hydration mismatch.
- No i18n library.

## 7. Theme and init script
`INIT_SCRIPT` is injected in `<head>` (via `next/script` with `beforeInteractive`, or an inline `<script>`; follow current Next.js docs) and does, before paint:
```js
(function(){try{var d=document.documentElement;var t=localStorage.getItem('theme');var dark=t?t==='dark':matchMedia('(prefers-color-scheme: dark)').matches;d.classList.toggle('dark',dark);var l=localStorage.getItem('lang');if(l!=='ar'&&l!=='en'){l=(navigator.language||'en').toLowerCase().indexOf('ar')===0?'ar':'en'}d.lang=l;d.dir=l==='ar'?'rtl':'ltr';if(matchMedia('(max-width: 767px)').matches)d.setAttribute('data-lite','')}catch(e){}})();
```
`<html suppressHydrationWarning>`. `useTheme` toggles the `dark` class and `localStorage.theme`. CSS reads `html[data-lite]` to drop heavy effects before React loads.

## 8. Layout modes
`media.ts`:
```ts
export const PHONE_QUERY = '(max-width: 767px)'
export const TOUCH_QUERY = '(max-width: 767px), (any-pointer: coarse)'
```
`App.tsx` renders after mount (a light intro/skeleton until then) and picks:
- **scroll** mode (touch devices): `ScrollLayout` stacks all enabled sections; `Navbar` uses IntersectionObserver scroll-spy; nav click calls `scrollIntoView` (instant when reduced motion).
- **switcher** mode (fine-pointer desktop): `SectionSwitcher` shows one section at a time with `AnimatePresence mode="wait"` and direction-aware slide (direction is reversed in RTL). Each panel scrolls internally if taller than the viewport, with bottom padding for the nav. ArrowLeft/ArrowRight move between sections (reversed in RTL). The active section is mirrored in `location.hash` (`#projects`); on load the hash selects the section; `hashchange` / back button work.

If the switcher cannot be finished in time, ship scroll mode everywhere (see TASKS.md cut line). Both modes use the same section components and the same `Navbar`.

## 9. Projects
- `projects.ts` exports an array; featured first, then array order.
- `ProjectCover`: shows `images[0]` if present; otherwise a generated cover (gradient, monogram, stack logos). No broken images ever: an `onError` fallback switches to the generated cover.
- `ProjectModal`: native `<dialog>` with `showModal()` or an accessible custom dialog; focus trap, Esc, backdrop click, focus return, body scroll lock. Content as in DESIGN.md 5.7.

## 10. Skills and logos
- `skills.ts` is the registry (see CONTENT.md for the initial list). Project stacks reference ids from it.
- `TechLogo` imports the icon by slug from `simple-icons`. If the slug does not exist in the installed version, render the monogram badge instead (never crash the build). Verify each slug at implementation time.
- Icons render with `fill="currentColor"`; brand colour (`hex` from the package) applies on hover/focus.
- Import icons by name (tree-shakable), not the whole package.

## 11. Contact form
- Endpoint: `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`.
- `fetch` POST with `FormData` and `Accept: application/json`. Hidden honeypot field `_gotcha` must be empty.
- Client validation (required fields, email format) with localized messages from `ui.ts`.
- States: idle, sending, success, error. If the env var is missing, render the form disabled with a message that points to the direct email.
- Nothing else is stored or tracked.

## 12. Performance rules
- Fonts via `next/font` with `display: 'swap'`, only needed subsets (`latin`, `arabic`) and weights.
- Plain `<img>` with `width`/`height`, `loading="lazy"` below the fold, `decoding="async"`.
- Keep the first bundle small: lazy-load `ProjectModal` and `SectionSwitcher` with `dynamic` / `lazy`.
- Lite mode (`html[data-lite]`) per DESIGN.md.

## 13. Deployment (Netlify)
`netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "out"

[build.environment]
  NODE_VERSION = "22"
```
Steps: push to GitHub, "Import from Git" in Netlify, build command `npm run build`, publish directory `out`, add env var `NEXT_PUBLIC_FORMSPREE_ID`. Pick an available `*.netlify.app` site name. If Netlify's automatic Next.js detection interferes with the static export, check the current Netlify docs for static exports before changing anything.

## 14. Quality gate
`npm run lint` and `npm run build` pass. Manual matrix: {375px, 1280px} x {dark, light} x {EN, AR}. Keyboard-only pass over nav, toggles, cards, modal and form. Reduced-motion check.
