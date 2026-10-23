# CONTENT - Islam Raad Portfolio

Single source of truth for every word and link on the site. The agent turns this into `src/content/*.ts`. English text is the owner's wording (capitalization and punctuation tidied only). Arabic text is a **draft translation for the owner to review** before launch.

Never add facts that are not in this file. Anything marked OPEN is not final.

## 1. Identity
| Field | English | Arabic |
|---|---|---|
| Full name | Islam Raad | إسلام رعد |
| Short name | Islam | إسلام |
| Hero name lines | ISLAM / RAAD | إسلام / رعد |
| Role | AI Engineering Student | طالب هندسة الذكاء الاصطناعي |
| Tagline | AI Engineering student at the University of Mosul. | طالب هندسة ذكاء اصطناعي في جامعة الموصل. |
| Location | Mosul, Iraq | الموصل، العراق |
| Hero greeting | Hello, I'm | أهلاً، أنا |

Note: the Arabic name is written with a hamza (إسلام). The owner can change it to اسلام in `profile.ts`.

## 2. Bios
**Short bio (Hero)**
- EN: I build AI-powered applications and backend systems, and I'm deepening my machine learning skills.
- AR: أبني تطبيقات مدعومة بالذكاء الاصطناعي وأنظمة خلفية (Backend)، وأعمّق مهاراتي في تعلّم الآلة.

**Long bio (About)**
- EN: Second-year AI Engineering student at the University of Mosul. I build AI-powered applications and backend systems, and I'm deepening my machine learning skills through Samsung Innovation Campus and GCI World. I'm seeking opportunities to learn and contribute to real-world AI and software projects.
- AR: طالب في المرحلة الثانية بهندسة الذكاء الاصطناعي في جامعة الموصل. أبني تطبيقات مدعومة بالذكاء الاصطناعي وأنظمة خلفية، وأعمّق مهاراتي في تعلّم الآلة من خلال Samsung Innovation Campus وGCI World. أبحث عن فرص للتعلّم والمساهمة في مشاريع حقيقية في الذكاء الاصطناعي وهندسة البرمجيات.

## 3. Contact and links
| Item | Value |
|---|---|
| Email | islamraad.dev@gmail.com |
| Phone / WhatsApp (shown on site) | +964 777 938 9549 (display, always `dir="ltr"`) |
| WhatsApp link | https://wa.me/9647779389549 |
| GitHub | https://github.com/Islam-Raad-dev |
| LinkedIn | https://www.linkedin.com/in/islam-raad/ |
| CV (Google Drive) | https://drive.google.com/file/d/1w0npwNUG9-88IZCcxWLuoOWYqjwyGfSC/view?usp=sharing |
| Other links | none for now (Kaggle, blog etc. may come later) |

OPEN: the CV link was copied from a document where it was split across two lines; the owner must confirm it opens in a private window ("Anyone with the link").
The `+964` number format drops Iraq's leading 0 (0777... becomes +964 777...). Owner to confirm.

## 4. Education (About)
| Field | English | Arabic |
|---|---|---|
| School | University of Mosul | جامعة الموصل |
| Faculty | College of Computer Science and Mathematics | كلية علوم الحاسوب والرياضيات |
| Program | AI Engineering | هندسة الذكاء الاصطناعي |
| Stage | Second year | المرحلة الثانية |
| Note | Ranked first in my class in the first year | الأول على دفعتي في السنة الأولى |

## 5. Activities (About timeline)
| Role | Organization | Period |
|---|---|---|
| EN: Media Team Member / AR: عضو الفريق الإعلامي | EN: Department of Artificial Intelligence, University of Mosul / AR: قسم الذكاء الاصطناعي، جامعة الموصل | EN: Nov 2025 - Present / AR: تشرين الثاني 2025 - حتى الآن |
| EN: Library Coordinator and Management Assistant / AR: منسّق مكتبة ومساعد إداري | EN: School Library, Mosul, Iraq / AR: مكتبة المدرسة، الموصل، العراق | EN: Oct 2023 - Jun 2025 / AR: تشرين الأول 2023 - حزيران 2025 |

No internship or paid work experience yet: do not add that section.

## 6. Projects
Order: Napta (featured) then Social Media App. Projects 3 to 5 are not shown (owner is still working on them).

### 6.1 AI Napta
| Field | Value |
|---|---|
| id | `napta` |
| title | EN: AI Napta / AR: نبتة (AI Napta) |
| summary EN | A web app that diagnoses agricultural plant diseases from images uploaded by the user, using AI. |
| summary AR | تطبيق ويب يشخّص أمراض النباتات الزراعية من صور يرفعها المستخدم باستخدام الذكاء الاصطناعي. |
| description EN | A web app that diagnoses agricultural plant diseases from images uploaded by the user, using AI. It solves one problem: identifying a plant disease from a photo. |
| description AR | تطبيق ويب يشخّص أمراض النباتات الزراعية من صور يرفعها المستخدم باستخدام الذكاء الاصطناعي. يحل مشكلة تشخيص أمراض النباتات الزراعية من الصورة. |
| stack | react, vite, gemini, openrouter, netlify |
| repo | https://github.com/Islam-Raad-dev/Napta |
| live | https://napta-ai.netlify.app/ |
| badge EN | 3rd place at the University of Mosul level, in the university competition |
| badge AR | المركز الثالث على مستوى جامعة الموصل في مسابقة الجامعة |
| featured | true |
| images | none yet (generated cover used) |

### 6.2 Social Media App
| Field | Value |
|---|---|
| id | `social-media-app` |
| title | EN: Social Media App / AR: تطبيق سوشيال ميديا |
| summary EN | A social media app built with FastAPI, with users, posts, comments and likes, plus authentication and permissions. |
| summary AR | تطبيق سوشيال ميديا مبني بـ FastAPI يضم مستخدمين ومنشورات وتعليقات وإعجابات، مع تسجيل دخول وصلاحيات. |
| description | same as summary (owner gave no longer text) |
| stack | fastapi, docker, githubactions |
| repo | https://github.com/Islam-Raad-dev/Python_API_Development |
| live | none (button hidden) |
| badge | none |
| featured | false |
| images | none yet (generated cover used) |

OPEN: the repo URL was copied from a line-wrapped document; confirm it opens.

## 7. Skills (registry)
Display: logos only, no levels. Featured six (shown first, larger): **python, pytorch, scikitlearn, fastapi, react, docker**.
These were chosen for AI internship and backend/AI engineering roles. The owner can change `featured` flags freely.

| id | Name | simple-icons slug (verify) | category | featured |
|---|---|---|---|---|
| python | Python | python | language | yes |
| cpp | C++ | cplusplus | language | |
| javascript | JavaScript | javascript | language | |
| html | HTML | html5 | language | |
| css | CSS | css (older versions: css3) | language | |
| fastapi | FastAPI | fastapi | framework | yes |
| react | React | react | framework | yes |
| vite | Vite | vite | framework | |
| pytorch | PyTorch | pytorch | ai | yes |
| scikitlearn | scikit-learn | scikitlearn | ai | yes |
| numpy | NumPy | numpy | ai | |
| pandas | Pandas | pandas | ai | |
| matplotlib | Matplotlib | matplotlib | ai | |
| gemini | Gemini API | googlegemini | ai | |
| openrouter | OpenRouter | openrouter (may not exist: monogram fallback) | ai | |
| postgresql | PostgreSQL | postgresql | database | |
| mongodb | MongoDB | mongodb | database | |
| github | GitHub | github | tool | |
| githubactions | GitHub Actions | githubactions | tool | |
| docker | Docker | docker | tool | yes |
| netlify | Netlify | netlify | tool | |
| pytest | pytest | pytest | tool | |
| rest | REST API | none (use a lucide icon or monogram) | tool | |
| graphql | GraphQL | graphql | tool | |

## 8. Achievements
**Awards and programs**
| id | kind | Title | Issuer | Status |
|---|---|---|---|---|
| napta-award | award | EN: 3rd place, University of Mosul competition (AI Napta) / AR: المركز الثالث في مسابقة جامعة الموصل (نبتة) | EN: University of Mosul / AR: جامعة الموصل | EN: 3rd place / AR: المركز الثالث |
| sic | program | EN: Samsung Innovation Campus - AI Course 2026 / AR: Samsung Innovation Campus - كورس الذكاء الاصطناعي 2026 | Samsung Innovation Campus | EN: Accepted, started 11 Oct 2026 / AR: مقبول، بدأ في 11 تشرين الأول 2026 |
| gci | program | GCI World 2026 - September | EN: Matsuo-Iwasawa Lab, University of Tokyo / AR: Matsuo-Iwasawa Lab، جامعة طوكيو | EN: Accepted / AR: مقبول |
| huawei | program | EN: Huawei ICT Competition 2026-2027 - Cloud and AI track / AR: Huawei ICT Competition 2026-2027 - مسار Cloud & AI | Huawei | EN: Registered / AR: مسجّل |

**Certificates**
| id | kind | Title | Issuer | Note |
|---|---|---|---|---|
| ml-spec | certificate | Machine Learning Specialization | DeepLearning.AI | |
| fastapi-cert | certificate | Creating APIs with Python (FastAPI) | freeCodeCamp | EN: 19 hours / AR: 19 ساعة |

No years or "completed" labels are shown for certificates because none were provided.

## 9. UI strings
| Key | English | Arabic |
|---|---|---|
| nav.home | Home | الرئيسية |
| nav.about | About | نبذة |
| nav.projects | Projects | المشاريع |
| nav.skills | Skills | المهارات |
| nav.achievements | Achievements | الإنجازات |
| nav.contact | Contact | تواصل |
| cta.viewProjects | View projects | استعرض المشاريع |
| cta.downloadCv | Download CV | تحميل السيرة الذاتية |
| cta.contact | Contact me | راسلني |
| project.live | Live demo | التجربة الحية |
| project.code | Source code | الكود المصدري |
| project.featured | Featured | مميز |
| project.close | Close | إغلاق |
| project.stack | Tech stack | التقنيات المستخدمة |
| about.eyebrow | About | نبذة عني |
| about.title | A bit about me | قليل عني |
| about.education | Education | التعليم |
| about.activities | Activities | النشاطات |
| projects.eyebrow | Projects | المشاريع |
| projects.title | Things I've built | ما قمت ببنائه |
| skills.eyebrow | Skills | المهارات |
| skills.title | Tools I work with | الأدوات التي أعمل بها |
| achievements.eyebrow | Achievements | الإنجازات |
| achievements.title | Awards, programs and certificates | الجوائز والبرامج والشهادات |
| achievements.awards | Awards and programs | الجوائز والبرامج |
| achievements.certs | Certificates | الشهادات |
| contact.eyebrow | Contact | تواصل |
| contact.title | Let's talk | لنتحدث |
| contact.name | Name | الاسم |
| contact.email | Email | البريد الإلكتروني |
| contact.message | Message | الرسالة |
| contact.send | Send message | إرسال الرسالة |
| contact.sending | Sending... | جارٍ الإرسال... |
| contact.success | Thanks! Your message was sent. | شكراً! تم إرسال رسالتك. |
| contact.error | Something went wrong. Please email me directly. | حدث خطأ. يرجى مراسلتي مباشرة عبر البريد الإلكتروني. |
| contact.invalidEmail | Please enter a valid email. | يرجى إدخال بريد إلكتروني صحيح. |
| contact.required | This field is required. | هذا الحقل مطلوب. |
| contact.disabled | The form isn't available right now. Please email me directly. | النموذج غير متاح حالياً. يرجى مراسلتي مباشرة عبر البريد الإلكتروني. |
| toggle.lang | Switch language | تغيير اللغة |
| toggle.langLabel | عربي (shown when current language is EN) / EN (shown when AR) | |
| toggle.theme | Switch theme | تغيير المظهر |
| a11y.skip | Skip to content | تخطَّ إلى المحتوى |
| comingSoon | More projects coming soon | المزيد من المشاريع قريباً |
| footer | Islam Raad (year) | إسلام رعد (year) |

## 10. Metadata (basic only)
- Title EN: Islam Raad - AI Engineering Student
- Description EN: Portfolio of Islam Raad, an AI Engineering student at the University of Mosul who builds AI-powered applications and backend systems.
- Language: set from the toggle; default per browser language.
- Favicon: `public/icon.svg` monogram "IR".
