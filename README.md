<div align="center">

#  Islam Raad — Personal Portfolio
### Ultra-Fast, Bilingual (EN/AR), Data-Driven Developer Portfolio & Showcase

[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3-blue?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Motion](https://img.shields.io/badge/Motion-14.6-FF4154?style=for-the-badge&logo=framer&logoColor=white)](https://motion.dev/)
[![Netlify](https://img.shields.io/badge/Deploy-Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://www.netlify.com/)
[![Bilingual](https://img.shields.io/badge/Language-EN%20%7C%20AR%20(RTL)-orange?style=for-the-badge)](#-bilingual--true-rtl)

<p align="center">
  <a href="#-overview">Overview</a> •
  <a href="#-key-features">Key Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-architecture--structure">Architecture</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-content-management">Content Management</a> •
  <a href="#-connect--author">Author</a>
</p>

---

</div>

## 📌 Overview

This repository houses the personal portfolio of **Islam Raad**, an AI Engineering student at the **University of Mosul** (ranked 1st in his class). 

Engineered with modern frontend standards, this portfolio delivers an ultra-fast, static-first experience with zero server overhead. It features **native bilingual support (English and Arabic RTL)**, **system-aware dark/light theme switching with zero flash**, and an **adaptive multi-mode layout** that seamlessly switches between a desktop interactive section switcher and a mobile-friendly smooth scroll view.

---

## Key Features

### Bilingual & True RTL First-Class Support
- **Seamless EN ⇄ AR Toggling:** Zero-layout shift instant switching.
- **True RTL Architecture:** Uses CSS logical properties (`ms-`, `pe-`, `start-`, `end-`) and directional flips (`rtl:rotate-180`) to provide an authentic Arabic typography and reading flow.
- **Dynamic Font Switching:** Pairs **Inter**, **Archivo Black**, and **Permanent Marker** for English with the elegant **Cairo** typeface for Arabic.
- **Zero Hydration Flicker:** Language and direction (`dir="rtl"`) are resolved prior to paint via an inline initialization script.

### Zero-Flicker Theme Engine
- Instant dark and light theme detection based on system preferences (`prefers-color-scheme`) or explicit user preference (`localStorage`).
- Class-based theme management using Tailwind CSS v4 CSS variables (`@theme`).
- Custom performance-oriented `html[data-lite]` attributes for mobile devices to drop heavy backdrop blurs and optimize GPU performance.

### Adaptive Multi-Mode Layout Engine
- **Desktop (Fine-Pointer):** Card-based **Interactive Section Switcher** powered by `motion/react`. Sections animate with directional slide transitions (RTL-aware) and sync directly with URL hashes (`#projects`, `#about`), with full keyboard navigation support (`ArrowLeft` / `ArrowRight`).
- **Mobile & Touch:** Automatically adapts to a single-page **Smooth Scroll Layout** featuring an `IntersectionObserver` scroll-spy navigation pill.
- **No Hydration Inconsistencies:** Media queries dynamically mount the appropriate layout post-hydration.

### 100% Data-Driven Architecture
- **Strict Separation of Concerns:** Content is decoupled from presentation. All text, projects, skills, education, and UI strings reside in strongly-typed files inside `src/content/`.
- **Zero Hardcoded Text:** Adding a new project or updating skills never requires touching React components.

### Serverless Contact System
- Direct integration with Formspree for static-site form submissions.
- Built-in honeypot spam protection, client-side email validation, localized success/error states, and direct fallbacks (Email, WhatsApp, LinkedIn, GitHub).

### Accessibility & Performance by Design
- Fully accessible modal dialogs with focus trapping, `Esc` key dismissals, backdrop handling, and focus returns.
- Full compliance with `prefers-reduced-motion` for motion-sensitive visitors.
- Validated contrast ratios meeting WCAG AA standards in both light and dark palettes.

---

## Tech Stack

| Category | Technology | Description |
|---|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) | Configured with `output: 'export'` for 100% static generation |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | Strict mode, fully typed schemas and content |
| **UI Library** | [React 19](https://react.dev/) | Latest React features and optimal rendering |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) + PostCSS | Modern CSS theme variables, zero raw hex values in components |
| **Motion** | [Motion](https://motion.dev/) (`motion/react`) | Fluid layout animations, transitions, and staggered reveals |
| **Icons** | [Lucide React](https://lucide.dev/) + [Simple Icons](https://simpleicons.org/) | Tree-shaken UI icons and brand logos with SVG fallbacks |
| **Typography** | `next/font/google` | Inter, Cairo, Archivo Black, and Permanent Marker |
| **Hosting** | [Netlify](https://www.netlify.com/) | Automated static deployment and CDN caching |

---

## Architecture & Structure

```text
islam-raad-portfolio/
├── .agents/workflows/       # Agentic automation workflows (e.g., add-project)
├── docs/                    # Single source of truth specifications
│   ├── PRD.md               # Product Requirements Document
│   ├── DESIGN.md            # Visual design tokens, typography, and motions
│   ├── ARCHITECTURE.md      # Technical blueprint and structural guidelines
│   ├── CONTENT.md           # Master bilingual copy & profile data
│   └── TASKS.md             # Development roadmap and QA checks
├── public/                  # Static assets (images, project media, icons)
│   ├── images/              # Profile portraits
│   └── projects/<id>/       # Project screenshots and assets
├── src/
│   ├── app/
│   │   ├── globals.css      # Design tokens, @theme, CSS variables
│   │   ├── layout.tsx       # Root layout, fonts injection, providers
│   │   └── page.tsx         # Root entry point
│   ├── components/
│   │   ├── layout/          # Navbar, SectionSwitcher, ScrollLayout, Toggles
│   │   ├── sections/        # Modular sections (Hero, About, Projects, Skills, Achievements, Contact)
│   │   └── ui/              # Reusable primitives (Button, SectionHeader, Reveal, TechLogo, etc.)
│   ├── content/             # 100% of visible content and configurations
│   │   ├── site.ts          # Site settings, links, section visibility
│   │   ├── profile.ts       # Identity, bios, education, timeline
│   │   ├── projects.ts      # Projects catalog and metadata
│   │   ├── skills.ts        # Technical skills registry
│   │   ├── achievements.ts  # Awards, programs, certificates
│   │   └── ui.ts            # Localized UI strings (EN & AR)
│   ├── lib/                 # i18n, Theme, Motion variants, Media query helpers
│   └── types/               # Core TypeScript definitions and types
├── netlify.toml             # Netlify deployment configurations
└── next.config.ts           # Next.js static export settings
```

---

## Content Management

The portfolio is designed so you never need to edit React components to update your information.

### Adding a New Project
1. Open `src/content/projects.ts`.
2. Add a new object following the `Project` schema:
   ```ts
   {
     id: 'my-project',
     title: { en: 'Project Title', ar: 'عنوان المشروع' },
     summary: { en: 'Short summary...', ar: 'ملخص قصير...' },
     stack: ['python', 'pytorch', 'fastapi'],
     repo: 'https://github.com/...',
     live: 'https://...',
     featured: true,
   }
   ```
3. Place screenshots under `public/projects/my-project/1.webp` (optional; falls back to an algorithmic monogram cover if omitted).
4. Run `npm run build` to verify.

### Updating Skills
Add or modify entries in `src/content/skills.ts`. Specify the category and `simple-icons` slug to automatically render the brand SVG logo.

### Managing Section Order & Visibility
Toggle or reorder sections directly in `src/content/site.ts`:
```ts
export const site: SiteConfig = {
  sections: [
    { id: 'home', enabled: true },
    { id: 'about', enabled: true },
    { id: 'skills', enabled: true },
    { id: 'projects', enabled: true },
    { id: 'achievements', enabled: true },
    { id: 'contact', enabled: true },
  ],
  // ...
};
```

---

## Author & Connect

**Islam Raad (إسلام رعد)**  
*AI Engineering Student • University of Mosul*

- **GitHub:** [@Islam-Raad-dev](https://github.com/Islam-Raad-dev)
- **LinkedIn:** [islam-raad](https://www.linkedin.com/in/islam-raad/)
- **Email:** [islamraad.dev@gmail.com](mailto:islamraad.dev@gmail.com)
- **WhatsApp:** [+964 777 938 9549](https://wa.me/9647779389549)
- **Curriculum Vitae:** [View CV](https://drive.google.com/file/d/1w0npwNUG9-88IZCcxWLuoOWYqjwyGfSC/view?usp=sharing)

---