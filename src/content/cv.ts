import type { DigitalCvData } from '@/types';

export const digitalCv: DigitalCvData = {
  title: { en: 'Islam Raad', ar: 'إسلام رعد' },
  role: {
    en: 'AI Engineering Student & Developer',
    ar: 'طالب هندسة الذكاء الاصطناعي ومطور',
  },
  location: { en: 'Mosul, Iraq', ar: 'الموصل، العراق' },
  email: 'islamraad.dev@gmail.com',
  phone: '+964 777 938 9549',
  overview: {
    en: 'Second-year AI Engineering student at the University of Mosul. I build AI-powered applications and backend systems, and am deepening my machine learning skills through Samsung Innovation Campus and GCI World. Seeking opportunities to learn and contribute to real-world AI and software projects.',
    ar: 'طالب في المرحلة الثانية بهندسة الذكاء الاصطناعي في جامعة الموصل. أبني تطبيقات وأنظمة خلفية مدعومة بالذكاء الاصطناعي، وأعمل على تعميق مهاراتي في تعلّم الآلة عبر برنامج Samsung Innovation Campus وبرنامج GCI World. أبحث عن فرص للتعلّم والمساهمة في مشاريع برمجية وذكاء اصطناعي واقعية.',
  },
  stack: [
    'Python',
    'FastAPI',
    'React',
    'PostgreSQL',
    'Docker',
    'TensorFlow',
    'scikit-learn',
    'C++',
    'NumPy',
    'Pandas',
    'Matplotlib',
    'Vite',
    'GitHub Actions',
    'Gemini API',
    'OpenRouter',
    'AWS',
  ],
  impact: [
    {
      en: 'Ranked 1st in the Department of AI in First Year.',
      ar: 'المركز الأول على قسم هندسة الذكاء الاصطناعي في السنة الأولى.',
    },
    {
      en: '3rd Place, University of Mosul Competition (AI Napta).',
      ar: 'المركز الثالث في مسابقة جامعة الموصل (نبتة AI Napta).',
    },
    {
      en: 'Selected for Samsung Innovation Campus AI Course (SIC Levant).',
      ar: 'مقبول في كورس الذكاء الاصطناعي من Samsung Innovation Campus.',
    },
    {
      en: 'Accepted into Univ. of Tokyo GCI World Data Science Program.',
      ar: 'مقبول في برنامج GCI World لعلوم البيانات من جامعة طوكيو.',
    },
    {
      en: 'McKinsey Forward Program Graduate with Digital Badge.',
      ar: 'خريج برنامج McKinsey Forward وحاصل على الشارة الرقمية.',
    },
  ],
  projects: [
    {
      id: 'napta',
      title: { en: 'AI NAPTA', ar: 'نبتة (AI NAPTA)' },
      subtitle: {
        en: 'Agricultural plant disease diagnosis with Gemini & OpenRouter APIs',
        ar: 'تشخيص أمراض النباتات الزراعية بالذكاء الاصطناعي وصور النباتات',
      },
      badge: { en: '3rd Place Award', ar: 'المركز الثالث' },
      targetSection: 'projects',
      targetElementId: 'project-napta',
      externalUrl: 'https://napta-ai.netlify.app/',
    },
    {
      id: 'social-platform',
      title: { en: 'SOCIAL MEDIA PLATFORM', ar: 'منصة تواصل اجتماعي (REST API)' },
      subtitle: {
        en: 'FastAPI backend with PostgreSQL, JWT, Alembic, Docker & CI/CD',
        ar: 'خلفية متكاملة بـ FastAPI وPostgreSQL وJWT وDocker وCI/CD',
      },
      targetSection: 'projects',
      targetElementId: 'project-social-media-app',
      externalUrl: 'https://github.com/Islam-Raad-dev/Python_API_Development',
    },
  ],
  academic: [
    {
      id: 'univ-mosul',
      title: {
        en: 'B.Sc. in Artificial Intelligence',
        ar: 'بكالوريوس هندسة الذكاء الاصطناعي',
      },
      subtitle: {
        en: 'University of Mosul • Ranked 1st in AI Department (1st Year)',
        ar: 'جامعة الموصل • الأول على قسم هندسة الذكاء الاصطناعي في السنة الأولى',
      },
      period: { en: '2025 - Present', ar: '2025 - حتى الآن' },
      badge: { en: 'Rank 1', ar: 'الأول على القسم' },
    },
  ],
  programs: [
    {
      id: 'sic',
      title: {
        en: 'Samsung Innovation Campus — AI Course (SIC Levant)',
        ar: 'Samsung Innovation Campus — كورس الذكاء الاصطناعي 2026',
      },
      subtitle: {
        en: '10-week intensive ML, DL, NLP & LLMs fine-tuning; AI Capstone',
        ar: 'برنامج مكثف لـ 10 أسابيع في ML وDL وNLP وتدريب النماذج ومشروع Capstone',
      },
      period: { en: 'Oct 2026 - Present', ar: 'تشرين الأول 2026 - حتى الآن' },
      badge: { en: 'Accepted', ar: 'مقبول' },
      targetSection: 'achievements',
      targetElementId: 'achievement-sic',
    },
    {
      id: 'gci',
      title: {
        en: 'GCI World Program — Matsuo-Iwasawa Lab',
        ar: 'برنامج GCI World — مختبر ماتسوو-إيواساوا، جامعة طوكيو',
      },
      subtitle: {
        en: 'University of Tokyo 3-month Data Science & ML program with competition',
        ar: 'برنامج مكثف لـ 3 أشهر في علوم البيانات وتعلم الآلة من جامعة طوكيو',
      },
      period: { en: 'Sep 2026 - Present', ar: 'أيلول 2026 - حتى الآن' },
      badge: { en: 'Accepted', ar: 'مقبول' },
      targetSection: 'achievements',
      targetElementId: 'achievement-gci',
    },
    {
      id: 'mckinsey',
      title: {
        en: 'McKinsey Forward Program',
        ar: 'برنامج McKinsey Forward',
      },
      subtitle: {
        en: 'McKinsey & Company • Problem-solving, AI literacy, leadership & digital badge',
        ar: 'ماكنزي آند كومباني • حل المشكلات، محو الأمية بالذكاء الاصطناعي والقيادة',
      },
      period: { en: 'Sep 2025 - Dec 2025', ar: 'أيلول 2025 - كانون الأول 2025' },
      badge: { en: 'Completed', ar: 'مكتمل' },
    },
    {
      id: 'huawei',
      title: {
        en: 'Huawei ICT Competition 2026-2027',
        ar: 'مسابقة هواوي لتكنولوجيا المعلومات والاتصالات 2026-2027',
      },
      subtitle: {
        en: 'Cloud and AI Track',
        ar: 'مسار الحوسبة السحابية والذكاء الاصطناعي (Cloud & AI Track)',
      },
      period: { en: '2026 - 2027', ar: '2026 - 2027' },
      badge: { en: 'Registered', ar: 'مسجّل' },
      targetSection: 'achievements',
      targetElementId: 'achievement-huawei',
    },
  ],
  certificates: [
    {
      id: 'ml-spec',
      title: {
        en: 'Machine Learning Specialization',
        ar: 'تخصص تعلّم الآلة (Machine Learning Specialization)',
      },
      subtitle: {
        en: 'DeepLearning.AI & Stanford Online • Supervised & Unsupervised Learning, Neural Networks',
        ar: 'DeepLearning.AI وجامعة ستانفورد أونلاين • شبكات عصبية وتعلّم آلي وتطبيقات Python',
      },
      period: { en: 'Aug 2026', ar: 'آب 2026' },
      targetSection: 'achievements',
      targetElementId: 'achievement-ml-spec',
    },
    {
      id: 'fastapi-cert',
      title: {
        en: 'Creating APIs with Python (FastAPI)',
        ar: 'بناء واجهات API احترافية بـ Python وFastAPI',
      },
      subtitle: {
        en: 'freeCodeCamp • 19-hour production FastAPI backend with PostgreSQL, Docker & CI/CD',
        ar: 'freeCodeCamp • 19 ساعة لبناء أنظمة Backend بـ PostgreSQL وDocker وCI/CD',
      },
      period: { en: 'Jul 2026', ar: 'تموز 2026' },
      targetSection: 'achievements',
      targetElementId: 'achievement-fastapi-cert',
    },
    {
      id: 'aws-scholarship',
      title: {
        en: 'AWS AI & ML Scholarship',
        ar: 'منحة AWS للذكاء الاصطناعي وتعلّم الآلة',
      },
      subtitle: {
        en: 'Amazon Web Services • Generative AI, LLMs, and ethical AI frameworks with AWS labs',
        ar: 'Amazon Web Services • الذكاء الاصطناعي التوليدي، نماذج اللغة وتطبيقات AWS السحابية',
      },
      period: { en: 'Jun 2026', ar: 'حزيران 2026' },
    },
  ],
  languages: {
    en: 'ENGLISH (PROFICIENT) • ARABIC (NATIVE)',
    ar: 'العربية (اللغة الأم) • الإنجليزية (إتقان)',
  },
  engineeredWith: {
    en: 'ENGINEERED WITH PRECISION USING NEXT.JS & MOTION',
    ar: 'طُوِّر بدقة واحترافية باستخدام NEXT.JS و MOTION',
  },
};
