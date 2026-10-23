# PRD - Islam Raad Personal Portfolio

Version 1.0 | Owner: Islam Raad 

## 1. Overview
A fast, clean, bilingual (English / Arabic) personal website that lets a visitor understand who Islam is within one minute, and read the full details if they want to. It is inspired by the interaction style of an open-source reference portfolio (section navigation, light motion, glass accents) but is a new, much simpler build with its own code, content and identity.

## 2. Goals
1. Present Islam professionally to recruiters, internship teams and university/program committees (jobs, training, study abroad).
2. Show projects, skills, achievements and education clearly.
3. Make contacting him one click away (email, WhatsApp, form, LinkedIn, GitHub, CV).
4. Be easy to maintain: update content later without touching component code.

## 3. Non-goals (v1)
- No admin dashboard, login, database or backend.
- No blog, testimonials, booking page, or per-project pages.
- No SEO extras (Open Graph image, sitemap, JSON-LD). Only a basic title, description and favicon.
- No visitor-tracking code. Analytics, if used, come from the hosting platform.
- No internship / work experience section yet (none to show).

## 4. Audience
- Recruiters and hiring managers (AI / software internships and jobs).
- University and program committees (study abroad, programs).
- Peers and collaborators.

Typical visit: a quick scan (about 1 minute). Some visitors will explore everything.

## 5. Primary user journeys
| Visitor wants to | Path |
|---|---|
| Know who Islam is, fast | Hero (name, role, tagline, short bio, photo) |
| Judge his work | Projects cards, then project modal (links) |
| Check technical fit | Skills logos |
| Verify credibility | Achievements (awards, programs, certificates) and About (education) |
| Get in touch | Contact (email, WhatsApp, form, social links) or CV download |

## 6. Functional requirements
**FR-1 Languages.** English and Arabic with a toggle. Arabic uses full RTL layout. The choice persists. First visit: Arabic browser language gives Arabic, otherwise English.
**FR-2 Theme.** Dark and light with a toggle. Persists. First visit follows the OS; no flash on load.
**FR-3 Sections** (order is configurable): Home (Hero), About, Projects, Skills, Achievements, Contact.
**FR-4 Navigation.** A floating bottom navigation bar with one item per section. Desktop: one section visible at a time with animated transitions (arrow keys also work). Phones and touch devices: a single scrolling page with the same nav acting as scroll-spy. See ARCHITECTURE.md.
**FR-5 Hero.** Name, role, tagline, short bio, profile photo (formal), buttons: View projects, Download CV, Contact. Social icons: GitHub, LinkedIn, WhatsApp, Email.
**FR-6 About.** Long bio, education card, activities timeline.
**FR-7 Projects.** Responsive card grid. A card shows cover (screenshot or generated fallback), title, summary, stack logos, optional achievement badge, optional "Featured" mark. Featured projects appear first. Clicking a card opens a modal with the full description, stack, screenshots (if any) and links (Live demo, Source code) - only links that exist.
**FR-8 Skills.** Logo grid only (no percentages or levels). Six featured skills are shown first and larger. Every logo has an accessible name and a hover label.
**FR-9 Achievements.** Awards and programs, and certificates, as clean cards with status labels.
**FR-10 Contact.** Email, WhatsApp number (shown), LinkedIn, GitHub, CV download, and a contact form (name, email, message) sent through Formspree with validation, spam honeypot, success and error states.
**FR-11 Content in one place.** All text and data come from `src/content/`. Adding a project or skill must need no component edits.
**FR-12 Deployment.** Static export deployed on Netlify (free `*.netlify.app` domain) from a GitHub repository.

## 7. Non-functional requirements
- **Performance:** first load feels instant on a phone; no layout shift from fonts; phones run a "lite" mode (fewer heavy effects).
- **Responsive:** 320px to 4K. Works well on mobile first.
- **Accessibility:** keyboard navigable, visible focus, AA contrast, reduced-motion respected, modal accessible.
- **Quality gate:** `npm run build` and `npm run lint` pass; no console errors.
- **Security/privacy:** no secrets in the repo. Phone number is public by owner's choice.

## 8. Content rules
- Only real, verifiable information. No invented metrics, logos, testimonials or screenshots.
- Projects 3 to 5 do not exist yet: they are not shown. No placeholder cards unless `showComingSoon` is enabled in `site.ts` (default off).
- Wording of English text is the owner's; Arabic text is a draft for the owner to review (see CONTENT.md).

## 9. Success criteria
- A first-time visitor can say who Islam is, what he builds and how to contact him after one screen.
- Site is live on a Netlify URL with working contact form, working CV link and working GitHub / live-demo links.
- Language switch, theme switch and navigation work on phone and desktop without errors.
- Owner can add a project by editing one file.

## 10. Constraints and known limits
- Time: about 4 working hours in total. TASKS.md defines a cut line.
- Formspree free plan: 50 submissions per month (verified Oct 2026). Over the limit, messages are held and not emailed until the plan is upgraded or the month resets; the site also shows the direct email and WhatsApp so nobody is blocked.
- Netlify analytics on the free plan keep only 1 day of history (per Netlify's plan comparison, Oct 2026). Longer history needs a paid plan or another tool. This is outside v1.
- The two existing projects have no screenshots yet; generated cover fallbacks are used until the owner adds images.

## 11. Open items for the owner
1. Profile photo file (formal, portrait 4:5).
2. Create a Formspree form and provide its id.
3. Confirm the CV link opens publicly (Google Drive "anyone with the link").
4. Review the Arabic text in CONTENT.md.
5. Optional: one screenshot per project.

## 12. Later (v2 ideas, not in scope)
Extra projects (3 to 5), work experience once available, Open Graph preview image and sitemap, blog, more certificates.
