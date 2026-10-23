# DESIGN - Islam Raad Portfolio

Style in one line: **clean and minimal layout, light "glass" accents only on the nav and cards, one blue accent, light but distinctive motion.**
Inspiration: the palette, fonts, section navigation and motion feel of the reference portfolio. Do not copy its code, images or text.

## 1. Principles
1. Clarity first: one idea per screen, generous space, strong hierarchy.
2. Personality through motion and type, not decoration.
3. Same quality in English and Arabic (true RTL, not a mirrored afterthought).
4. Light on phones: heavy effects step down automatically.
5. Never show what does not exist (no empty placeholders, no fake numbers).

## 2. Design tokens
Define as CSS variables in `src/app/globals.css` and map to Tailwind v4 via `@theme`. Dark mode is class-based (`html.dark`); declare `@custom-variant dark (&:where(.dark, .dark *));`.

| Token | Dark | Light |
|---|---|---|
| `--bg` | `#0a0a0a` | `#f5f5f5` |
| `--surface` | `rgba(255,255,255,0.04)` | `rgba(0,0,0,0.03)` |
| `--card-bg` | `rgba(20,20,20,0.60)` | `rgba(255,255,255,0.70)` |
| `--border` | `rgba(255,255,255,0.08)` | `rgba(0,0,0,0.08)` |
| `--text` | `#f2f2f2` | `#111111` |
| `--text-muted` | `#9a9a9a` | `#5b5b5b` |
| `--accent` (fills, borders, glow) | `#3395ff` | `#3395ff` |
| `--accent-text` (text/links on bg) | `#3395ff` | `#0a64cc` |
| `--accent-2` | `#6366f1` | `#6366f1` |
| `--accent-soft` | `rgba(51,149,255,0.12)` | `rgba(51,149,255,0.12)` |
| `--gradient` | `linear-gradient(135deg, var(--accent), var(--accent-2))` | same |
| `--shadow-card` | `0 4px 20px rgba(0,0,0,0.30)` | `0 4px 20px rgba(0,0,0,0.08)` |

Contrast note: `#3395ff` on `#f5f5f5` is about 2.8:1, which fails AA for text. In light mode every accent-coloured text or link uses `--accent-text` (`#0a64cc`, about 5:1). The brighter `--accent` is for fills, borders, glows and large display text only.

Radii: `--radius-sm 10px`, `--radius-md 14px`, `--radius-lg 18px`, `--radius-xl 28px` (panels, modal), pill `9999px`.
Blur: `--blur 24px` (nav and cards only).
Durations: `--dur-fast 0.2s`, `--dur-base 0.42s`, `--dur-exit 0.26s`. Easing: `cubic-bezier(0.22, 1, 0.36, 1)`.
Spacing: 4px base scale. Section padding: `clamp(1.25rem, 4vw, 3rem)` horizontal; max content width 1120px.
Bottom clearance for the nav: 96px on phones, 112px on desktop (add as padding to scrolling content).

## 3. Typography
Load with `next/font` (self-hosted at build). Expose as CSS variables.

| Role | Latin | Arabic |
|---|---|---|
| Body | Inter 400/500/600 | Cairo 400/500/600 |
| Display (name, big headings) | Archivo Black, uppercase | Cairo 800/900 |
| Handwriting accent (one small greeting) | Permanent Marker | Cairo 700 in accent color |

- `html[lang="ar"]` switches `--font-body` and `--font-display` to Cairo. Do not apply uppercase or letter-spacing to Arabic text.
- Scale (fluid): hero name `clamp(3rem, 11vw, 8rem)`, H2 `clamp(1.75rem, 4vw, 2.75rem)`, H3 1.25rem, body 1rem / 1.7, small 0.875rem.
- Line length in paragraphs: max 65ch.

## 4. Layout and responsiveness
- Breakpoint: `md = 768px` (same as navbar threshold). Below it: phone/lite mode.
- Touch devices (width < 768px or coarse pointer) always use the single-scroll layout. Fine-pointer desktops use the section switcher. See ARCHITECTURE.md.
- Grids: Projects 1 column (phone), 2 columns (md and up). Skills grid auto-fills 72px tiles (96px for featured). Achievements 1 column phone, 2 columns md.
- No horizontal scroll at any width from 320px.

## 5. Components

### 5.1 Bottom navigation (signature element)
- Fixed, centered, `bottom: 20px` (phone) / `28px` (desktop), glass pill: `--card-bg`, 1px `--border`, `backdrop-filter: blur(var(--blur))`, `--shadow-card`, radius pill.
- Six items (icon + label): Home, About, Projects, Skills, Achievements, Contact. Icons (lucide): `House`, `User`, `FolderKanban`, `Wrench`, `Award`, `Mail`.
- Phone: icons only, label shown for the active item. Desktop: icon + label for all.
- Active indicator: a pill behind the active item (`layoutId`, spring `damping 28, stiffness 380`), background `--accent-soft`, border `rgba(51,149,255,0.25)`, text `--accent-text`.
- Touch targets at least 44x44px. Focus ring: 2px `--accent` offset 2px.

### 5.2 Toggles
Top corner (`end` side), fixed, small glass pill with two icon buttons: language (`EN` / `عربي` text button) and theme (`Sun` / `Moon`). Keyboard accessible, with aria-labels in the current language.

### 5.3 Hero
- Two-column on desktop (text first, photo second; mirrored in RTL), stacked on phone (photo first, smaller).
- Handwriting greeting above the name ("Hello, I'm"), name on two lines (ISLAM / RAAD) in display font, role line, tagline, short bio, three buttons (primary gradient "View projects", secondary glass "Download CV", ghost "Contact"), social icon row.
- Photo: 4:5 portrait, radius `--radius-xl`, 1px border, soft accent glow behind (blurred gradient blob). Fallback when the image is missing: monogram "IR" tile.
- Intro animation once per load: greeting fades in, name lines rise with blur-out stagger, rest follows. Under 1.2s total.

### 5.4 Section header
Small uppercase eyebrow (accent-text), H2, optional one-line muted description. Same pattern in every section.

### 5.5 Cards (projects, achievements, education)
`--card-bg`, 1px `--border`, `--radius-lg`, padding 20-24px. Hover (fine pointer only): translateY(-4px), border color toward `--accent`, shadow grows, 0.2s. Phone/lite: no backdrop blur on cards (solid-ish background).

### 5.6 Project card
Cover 16:10 (screenshot, or generated fallback: gradient + large first-letter monogram + stack logos). Title (H3), 2-line summary (clamped), stack logo chips (max 5 then "+n"), optional badge (accent-soft pill with `Trophy` icon), "Featured" star mark. Whole card is a button (opens modal).

### 5.7 Project modal
Centered panel, max width 720px, radius `--radius-xl`, backdrop dim + blur. Open/close with the blur-fade motion (section 6). Content: cover or gallery (horizontal scroll-snap if several images), title, badge, description, stack list with logos and names, buttons for Live demo and Source code (only if present). Close button (top `end`), Esc closes, backdrop click closes, focus trap, focus returns to the card. Body scroll locked while open.

### 5.8 Skills grid
Logos only. Tiles with radius `--radius-md`, glass-light background. Icons render in `currentColor` (so dark brand logos stay visible in dark mode) and switch to the brand colour on hover. Name appears as a tooltip on hover/focus and is always in `aria-label`. Featured six are larger and come first: Python, PyTorch, scikit-learn, FastAPI, React, Docker. Scroll-in: staggered spring reveal (40ms stagger). Hover: lift 4px, accent glow.

### 5.9 Timeline (activities)
Vertical line with dots on the `start` side; each item: role, organization, date range (muted). Dot uses `--accent`.

### 5.10 Achievements
Two groups: "Awards and programs" and "Certificates". Card: icon (`Trophy`, `GraduationCap`, `BadgeCheck`), title, issuer, status pill (e.g. Accepted / Registered / Placed 3rd). Status pill colours use accent-soft only (no red/green semantics).

### 5.11 Contact
Two columns on desktop: left contact methods (email, WhatsApp with number, LinkedIn, GitHub, CV download) as large link rows with icons; right the form (name, email, message, send button). Inputs: radius `--radius-md`, 1px border, focus ring accent. States: idle, sending (spinner, button disabled), success (inline confirmation), error (inline message pointing to direct email). Form disabled gracefully if the Formspree id is missing.

### 5.12 Footer
One quiet line: name and year. No extra links.

## 6. Motion
Library: `motion/react` only.

| Use | Spec |
|---|---|
| Reveal on enter | opacity 0 to 1, y 16 to 0, blur 8px to 0, 0.5s, stagger 0.06s; once |
| Section switch (desktop) | `AnimatePresence mode="wait"`; enter from the `end` side (x 40px) with opacity and blur 8px; exit to the `start` side; 0.3s `[0.4, 0, 0.2, 1]`. Direction flips in RTL |
| Modal | blur-fade: initial `{opacity 0, filter blur(14px)}`, animate `{opacity 1, blur 0, then filter none}`, exit 0.26s, duration 0.42s ease `[0.22, 1, 0.36, 1]`. Drop the filter after landing so inner glass can blur |
| Nav pill | spring, `layoutId`, damping 28, stiffness 380 |
| Hover | 0.2s, transform and border only |
| Reduced motion | no transforms or blur; opacity crossfade 0.15s only |
| Lite (phone) | durations x0.7, no backdrop blur on cards, no blur filter animations, no stagger above 6 items |

Animate only `transform`, `opacity` and (briefly) `filter`. Never animate layout properties.

## 7. RTL rules
- `<html dir="rtl" lang="ar">` set before first paint.
- Logical utilities everywhere. Icons that point (arrows, chevrons) flip via `rtl:rotate-180`. Icons that do not point (user, mail) never flip.
- Timeline, nav order, hero columns, form layout all mirror automatically.
- Numbers and Latin names (Python, FastAPI) stay LTR inside Arabic text; use `unicode-bidi: isolate` on tech names and phone number (`dir="ltr"` on the phone).

## 8. Accessibility
Landmarks (`header`, `nav`, `main`, `section[aria-labelledby]`, `footer`), skip link, one H1 (the name), logical heading order, focus-visible ring, AA contrast, aria-labels on all icon-only controls, `aria-current` on the active nav item, `role="dialog" aria-modal="true"` with labelled title on the modal, `lang` attribute updates on switch, live region for form status.

## 9. Assets
- Photo: `public/images/islam.webp`, 1200x1500, under 200 KB (owner provides).
- Favicon: simple "IR" monogram SVG in `public/icon.svg` (generated by the agent, accent gradient on dark).
- Project screenshots (optional): `public/projects/<id>/1.webp`, max 1600px wide, under 250 KB.
- Logos: from the `simple-icons` package where available; otherwise a neutral monogram badge. Social brand icons (GitHub, LinkedIn, WhatsApp) are small inline SVG components, because some icon packages dropped or deprecated brand marks.

## 10. Do not
- No stock imagery, emojis as icons, gradients on body text, or heavy parallax.
- No more than one handwriting accent on the page.
- No hex values inside components.
