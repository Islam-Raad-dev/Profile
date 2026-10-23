# PROMPTS - how to drive Antigravity

## طريقة الاستخدام (بالعربي)
1. سوّي مجلد جديد فاضي وفك الحزمة بيه (يطلع `AGENTS.md` و`docs/` و`.agents/`).
2. افتح المجلد بـ Antigravity (Open Folder).
3. الصق **البرومت الرئيسي** (القسم 1) بالمحادثة. هذا يخلي الـ agent يقرأ كل الملفات ويطلعلك ملخص ومشاكل محتملة بدون ما يكتب كود.
4. إذا الملخص صحيح، قله: `Approved. Start Phase 0.` أو الصق برومت المرحلة (القسم 2).
5. بعد كل مرحلة يوقف ويستنى. راجع الموقع بالمتصفح، وإذا تمام الصق برومت المرحلة التالية. إذا كو مشكلة استخدم برومت التصحيح (القسم 3).
6. لا تخلي الـ agent يسوي أكثر من مرحلة بنفس الجلسة.
7. للتعديل مستقبلاً (إضافة مشروع) استخدم القسم 4.

---

## 1. Master prompt (paste first, once)
```
You are building my personal portfolio website. Before writing any code:

1. Read AGENTS.md, then docs/PRD.md, docs/DESIGN.md, docs/ARCHITECTURE.md, docs/CONTENT.md and docs/TASKS.md in that order.
2. Reply with: (a) a summary of what you will build in at most 10 lines, (b) any contradictions, missing information, risky assumptions or outdated syntax you noticed in the docs (do not guess: list them), (c) a short plan for Phase 0 only.
3. Then STOP and wait for my approval.

Working rules for the whole project:
- Follow AGENTS.md strictly. Work one phase at a time from docs/TASKS.md. Never start the next phase without my explicit go-ahead.
- Plan before building. After each phase: run `npm run lint` and `npm run build`, check the result in the browser at 375px and 1280px, in dark and light, in English and Arabic (RTL), then summarize what changed, tick the boxes in docs/TASKS.md and stop.
- Do not invent any facts, links, numbers or screenshots. If something is missing, ask me.
- Check the current official docs for Next.js, Tailwind CSS v4 and motion before writing configuration or API code.
- Do not add dependencies beyond docs/ARCHITECTURE.md without asking.
- Do not overwrite AGENTS.md, docs/ or .agents/ when scaffolding.
- Do not add explanatory code comments.
- Keep every change small and scoped to the current phase.
```

## 2. Phase prompts (paste one at a time)

### Phase 0
```
Approved. Start Phase 0 (Foundation) exactly as written in docs/TASKS.md. Show me a short plan first, then build. When done, verify the theme toggle, the language toggle (RTL flips, no flash on refresh), lint and build, then summarize and stop.
```

### Phase 1
```
Phase 0 is approved. Start Phase 1 (Content layer, Hero, About) from docs/TASKS.md. Fill src/content/*.ts strictly from docs/CONTENT.md (English and Arabic). Build the Hero and About sections following docs/DESIGN.md sections 5.3, 5.4, 5.9. If public/images/islam.webp is missing, use the monogram fallback and tell me. Verify the matrix (375/1280, dark/light, EN/AR), then summarize and stop.
```

### Phase 2
```
Phase 1 is approved. Start Phase 2 (Projects) from docs/TASKS.md following docs/DESIGN.md 5.5 to 5.7 and docs/ARCHITECTURE.md sections 9 and 10. Verify each simple-icons slug exists in the installed version and list any that fall back to the monogram. Test the grid with temporary duplicate data, then revert it. Verify the modal's keyboard behavior (Esc, focus trap, focus return). Summarize and stop.
```

### Phase 3
```
Phase 2 is approved. Start Phase 3 (Skills, Achievements, Contact) from docs/TASKS.md following docs/DESIGN.md 5.8, 5.10, 5.11, 5.12 and docs/ARCHITECTURE.md section 11. My Formspree id is in .env.local as NEXT_PUBLIC_FORMSPREE_ID. Test a real submission and test the disabled state with the variable removed (then restore it). Summarize and stop.
```

### Phase 4A
```
Phase 3 is approved. Start Phase 4A (Navigation and scroll layout) from docs/TASKS.md following docs/DESIGN.md 5.1 and 5.2. Everything must be generated from src/content/site.ts: prove it by temporarily disabling one section, then restore it. Summarize and stop.
```

### Phase 4B (optional, desktop only)
```
Phase 4A is approved. Start Phase 4B (Desktop section switcher) from docs/TASKS.md following docs/ARCHITECTURE.md section 8 and docs/DESIGN.md section 6. Touch devices must keep the scroll layout. Check RTL direction, hash sync, back button, keyboard arrows, resizing across 768px, and reduced motion. If you cannot make it stable, tell me and keep the scroll layout for all devices. Summarize and stop.
```

### Phase 5
```
Start Phase 5 (Polish and QA) from docs/TASKS.md. Run the full matrix {375px, 1280px} x {dark, light} x {EN, AR} in the built-in browser, take screenshots, fix what you find, do the keyboard, contrast and reduced-motion passes, remove unused code and dependencies, and make sure lint and build are clean. Report the matrix results and any known issues. Stop after the report.
```

### Phase 6
```
Start Phase 6 (Deploy) from docs/TASKS.md. I have created an empty GitHub repo at <PASTE REPO URL>. Prepare the repo and push, then give me the exact Netlify steps (build command, publish directory, environment variable). Check the current Netlify docs for static exports before advising. After I deploy, help me verify the live site. Do not change application code unless something is broken.
```

## 3. Fix prompt template
```
Bug in the current phase. Do not change anything outside this issue.
Where: <section / page / width / theme / language>
What I see: <describe, attach screenshot>
What I expected: <describe>
Steps: <1, 2, 3>
Find the root cause first, explain it in two lines, then fix it with the smallest change. Re-run lint and build and re-check the same view in both languages and both themes.
```

## 4. Edit-later prompts
**Add a project**
```
/add-project
Name: <...>
Summary EN: <...>
Summary AR: <...>
Stack: <technologies>
GitHub: <url or none>
Live demo: <url or none>
Badge (optional): <EN / AR>
Screenshots: <attached or none>
Featured: <yes/no>
```

**Add a skill**
```
Add a skill to src/content/skills.ts: <name>, category <language|framework|ai|database|tool>, featured <yes/no>. Check that the simple-icons slug exists; if not, use the monogram fallback. Touch no other files.
```

**Change the accent color or fonts**
```
Change <accent color / font> in src/app/globals.css only. Keep light-mode text contrast at AA (adjust --accent-text if needed). Do not touch components.
```
