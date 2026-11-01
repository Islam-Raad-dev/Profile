import type { Achievement } from '@/types';

export const achievements: Achievement[] = [
  {
    id: 'rawafid-first',
    category: 'achievement',
    kind: 'award',
    title: {
      en: 'Nationwide 1st Place Winner ("Iqra Litartaqi")',
      ar: 'المركز الأول على مستوى العراق في مسابقة "اقرأ لترتقِ"',
    },
    issuer: {
      en: 'Rawafid Youth Center, Baghdad',
      ar: 'مركز روافد الشبابي، بغداد',
    },
    period: {
      start: { en: 'Feb 2023', ar: 'شباط 2023' },
      end: { en: 'Mar 2023', ar: 'آذار 2023' },
    },
    badge: {
      en: '1st Place Nationwide',
      ar: 'المركز الأول على مستوى العراق',
    },
    status: {
      en: '1st place',
      ar: 'المركز الأول',
    },
    rating: 5,
    overview: {
      en: 'Competed in "Iqra Litartaqi", a nationwide reading competition organized by Rawafid Youth Center, evaluated on comprehensive knowledge of volunteer literature, achieving 1st place across Iraq.',
      ar: 'المشاركة في مسابقة «اقرأ لترتقِ» الوطنية للقراءة المنظمة من مركز روافد الشبابي في بغداد حول أدبيات العمل التطوعي، ونيل المركز الأول على مستوى العراق.',
    },
    learnings: [
      {
        en: 'Structured volunteer methodologies and sustainable community impact frameworks',
        ar: 'منهجيات العمل التطوعي المنظم وأطر صناعة الأثر المجتمعي المستدام',
      },
      {
        en: 'Critical and analytical evaluation of socio-cultural publications',
        ar: 'القراءة التحليلية والنقدية للأدبيات الاجتماعية والثقافية',
      },
      {
        en: 'Articulate public presentation and argumentative debate',
        ar: 'الإلقاء التعبيري والمناقشة المنطقية أمام لجان التحكيم',
      },
    ],
    credentialHash: 'IR-RAWAFID-2023-IQRA',
  },
  {
    id: 'napta-award',
    category: 'achievement',
    kind: 'award',
    title: {
      en: '3rd Place, University of Mosul Competition (AI Napta)',
      ar: 'المركز الثالث في مسابقة جامعة الموصل (نبتة AI Napta)',
    },
    issuer: {
      en: 'University of Mosul',
      ar: 'جامعة الموصل',
    },
    period: {
      start: { en: 'Apr 2026', ar: 'نيسان 2026' },
      end: { en: 'May 2026', ar: 'أيار 2026' },
    },
    badge: {
      en: '3rd Place Award',
      ar: 'جائزة المركز الثالث',
    },
    status: {
      en: '3rd place',
      ar: 'المركز الثالث',
    },
    rating: 5,
    overview: {
      en: 'Developed and pitched Napta AI in a competitive university-wide contest, winning 3rd place across all university faculties for innovation in automated agricultural diagnosis.',
      ar: 'تطوير وتقديم مشروع نبتة (AI Napta) في مسابقة علمية تنافسية على مستوى كليات جامعة الموصل، ونيل المركز الثالث لتميز الابتكار في التشخيص الزراعي الذكي.',
    },
    learnings: [
      {
        en: 'Computer vision diagnostics for real-time plant disease detection',
        ar: 'تقنيات الرؤية الحاسوبية للتشخيص اللحظي لأمراض المحاصيل الزراعية',
      },
      {
        en: 'Gemini and OpenRouter multimodal API orchestrations in production',
        ar: 'دمج وتنسيق واجهات النماذج متعددة الوسائط من Gemini وOpenRouter',
      },
      {
        en: 'Technical product presentation and live competitive pitching',
        ar: 'تقديم العروض التقنية التنافسية والدفاع العلمي عن معمارية النظام',
      },
    ],
    projects: [
      {
        name: {
          en: 'AI Napta — Agricultural Diagnosis Web App',
          ar: 'نبتة (AI Napta) — تطبيق ويب للتشخيص الزراعي',
        },
        description: {
          en: 'Plant disease diagnosis from leaf photos using multimodal generative models.',
          ar: 'تشخيص فوري لأمراض النباتات من صور الأوراق باستخدام الذكاء الاصطناعي.',
        },
        portfolioProjectId: 'napta',
        repoUrl: 'https://github.com/Islam-Raad-dev/Napta',
        liveUrl: 'https://napta-ai.netlify.app/',
      },
    ],
    repoUrl: 'https://github.com/Islam-Raad-dev/Napta',
    synergyStack: ['react', 'vite', 'gemini', 'openrouter', 'netlify'],
    credentialHash: 'IR-MOSUL-2026-NAPTA-03',
  },
  {
    id: 'academic-first-rank',
    category: 'achievement',
    kind: 'honor',
    title: {
      en: '1st Rank in AI Engineering Department (1st Year)',
      ar: 'الترتيب الأول على قسم هندسة الذكاء الاصطناعي (المرحلة الأولى)',
    },
    issuer: {
      en: 'College of Computer Science, University of Mosul',
      ar: 'جامعة الموصل، قسم هندسة الذكاء الاصطناعي',
    },
    period: {
      start: { en: 'Oct 2025', ar: 'تشرين الأول 2025' },
      end: { en: 'Jun 2026', ar: 'حزيران 2026' },
    },
    badge: {
      en: 'Rank 1 / Highest GPA',
      ar: 'المرتبة الأولى / أعلى معدل',
    },
    status: {
      en: 'Rank 1',
      ar: 'الأول على القسم',
    },
    rating: 5,
    overview: {
      en: 'Attained the top academic rank among all students in the Department of Artificial Intelligence in the first academic year with distinction.',
      ar: 'نيل المرتبة الأولى في التحصيل الأكاديمي بين كافة طلبة قسم هندسة الذكاء الاصطناعي في السنة الدراسية الأولى بامتياز.',
    },
    learnings: [
      {
        en: 'Discrete mathematics, linear algebra and advanced calculus foundations',
        ar: 'الرياضيات المتقطعة، الجبر الخطي، وأسس التفاضل والتكامل المتقدم للهندسة',
      },
      {
        en: 'Fundamental digital logic, algorithmic problem solving and low-level concepts',
        ar: 'المنطق الرقمي، التفكير الخوارزمي لحل المسائل، والمفاهيم البرمجية التأسيسية',
      },
      {
        en: 'Rigorous academic discipline, analytical research and technical commitment',
        ar: 'الانضباط الأكاديمي العالي، البحث العلمي المنهجي، والالتزام المعرفي',
      },
    ],
    synergyStack: ['cpp', 'python'],
    credentialHash: 'IR-UOM-2026-AI-RANK1',
  },
  {
    id: 'sic',
    category: 'program_cert',
    kind: 'program',
    title: {
      en: 'Samsung Innovation Campus — AI Course (SIC Levant)',
      ar: 'كورس الذكاء الاصطناعي من سامسونج (SIC Levant)',
    },
    issuer: {
      en: 'Samsung Electronics',
      ar: 'سامسونج للإلكترونيات',
    },
    period: {
      start: { en: 'Oct 2026', ar: 'تشرين الأول 2026' },
      end: { en: 'Present', ar: 'حتى الآن' },
      isOngoing: true,
    },
    badge: {
      en: 'Selected & Active',
      ar: 'مقبول وقيد التدريب',
    },
    status: {
      en: 'Accepted, started 11 Oct 2026',
      ar: 'مقبول، بدأ في 11 تشرين الأول 2026',
    },
    rating: 5,
    overview: {
      en: '10-week intensive specialized curriculum in machine learning, deep learning, NLP, and LLM fine-tuning, culminating in a collaborative team AI Capstone project.',
      ar: 'منهاج تخصصي مكثف لمدة 10 أسابيع في تعلم الآلة والتعلم العميق ومعالجة اللغات الطبيعية وضبط نماذج LLM، يختتم بمشروع تخرج جماعي متكامل.',
    },
    learnings: [
      {
        en: 'Machine learning foundations and statistical learning theory',
        ar: 'أسس تعلم الآلة الإحصائي والخوارزميات الكلاسيكية',
      },
      {
        en: 'Deep learning architectures (CNNs, RNNs, and Transformers)',
        ar: 'بنى التعلم العميق المتقدمة (شبكات CNNs وTransformers)',
      },
      {
        en: 'Natural language processing (NLP) and LLM instruction fine-tuning',
        ar: 'معالجة اللغات الطبيعية وضبط النماذج اللغوية الكبيرة (LLMs)',
      },
      {
        en: 'Production AI Capstone development and collaborative engineering',
        ar: 'تطوير مشروع تخرج ذكاء اصطناعي جماعي موجه للإنتاج',
      },
    ],
    courseUrl: 'https://www.samsung.com/levant/sustainability/corporate-citizenship/samsung-innovation-campus/',
    hasCertificate: true,
    synergyStack: ['tensorflow', 'python', 'scikitlearn', 'gemini'],
    credentialHash: 'IR-SAMSUNG-2026-SIC-AI',
  },
  {
    id: 'gci',
    category: 'program_cert',
    kind: 'program',
    title: {
      en: 'GCI World Data Science Program 2026',
      ar: 'برنامج GCI World لعلوم البيانات 2026',
    },
    issuer: {
      en: 'Matsuo-Iwasawa Lab, University of Tokyo',
      ar: 'مختبر ماتسوو-إيواساوا، جامعة طوكيو',
    },
    period: {
      start: { en: 'Sep 2026', ar: 'أيلول 2026' },
      end: { en: 'Present', ar: 'حتى الآن' },
      isOngoing: true,
    },
    badge: {
      en: 'Global AI Cohort',
      ar: 'برنامج عالمي لعلوم البيانات',
    },
    status: {
      en: 'Accepted',
      ar: 'مقبول',
    },
    rating: 5,
    overview: {
      en: '3-month rigorous data science and competitive machine learning program by the University of Tokyo’s premier AI lab, culminating in a final ML competition project.',
      ar: 'برنامج مكثف لمدة 3 أشهر في علوم البيانات وتعلم الآلة التنافسي من مختبر الذكاء الاصطناعي الرائد بجامعة طوكيو، ينتهي بمشروع منافسة نهائي.',
    },
    learnings: [
      {
        en: 'High-performance data manipulation and analysis using NumPy and Pandas',
        ar: 'التعامل الاحترافي مع المصفوفات ومعالجة البيانات الضخمة بـ NumPy وPandas',
      },
      {
        en: 'Exploratory Data Analysis (EDA) and robust feature engineering techniques',
        ar: 'التحليل الاستكشافي للبيانات (EDA) وهندسة الميزات الرياضية والإحصائية',
      },
      {
        en: 'Competitive machine learning modeling and validation workflows',
        ar: 'بناء واختبار نماذج تعلم الآلة التنافسية وفق معايير مسابقات البيانات العالمية',
      },
    ],
    courseUrl: 'https://weblab.t.u-tokyo.ac.jp/en/gci-world/',
    hasCertificate: true,
    synergyStack: ['python', 'numpy', 'pandas', 'scikitlearn', 'matplotlib'],
    credentialHash: 'IR-TOKYO-2026-GCI-DATA',
  },
  {
    id: 'mckinsey-forward',
    category: 'program_cert',
    kind: 'program',
    title: {
      en: 'McKinsey Forward Program',
      ar: 'برنامج McKinsey Forward للقيادة',
    },
    issuer: {
      en: 'McKinsey & Company',
      ar: 'ماكنزي آند كومباني',
    },
    period: {
      start: { en: 'Sep 2025', ar: 'أيلول 2025' },
      end: { en: 'Dec 2025', ar: 'كانون الأول 2025' },
    },
    badge: {
      en: 'Digital Badge Earned',
      ar: 'الشارة الرقمية المعتمدة',
    },
    status: {
      en: 'Completed with Badge',
      ar: 'مكتمل مع الشارة',
    },
    rating: 5,
    overview: {
      en: '10-week selective program covering structured problem-solving, data-driven synthesis, professional business communication, and AI literacy in workplace environments.',
      ar: 'برنامج انتقائي لمدة 10 أسابيع يركز على حل المشكلات المعقدة والتفكير المنطقي، والتواصل المؤسسي الفعال، ومحو الأمية بالذكاء الاصطناعي في بيئات العمل.',
    },
    learnings: [
      {
        en: 'Structured problem solving with hypothesis trees and MECE frameworks',
        ar: 'حل المشكلات الاستراتيجية باستخدام أشجار الفرضيات وأطر العمل المنطقية',
      },
      {
        en: 'Practical AI literacy, prompt engineering and technology translation',
        ar: 'محو الأمية بالذكاء الاصطناعي التوليدي وتطبيقاته العملية في بيئة العمل',
      },
      {
        en: 'Executive storytelling, agile collaboration and adaptive leadership',
        ar: 'التواصل القيادي المقنع، والعمل التعاوني الرشيق، والمرونة الذهنية',
      },
    ],
    certificateUrl: 'https://www.credly.com/',
    hasCertificate: true,
    synergyStack: ['python'],
    credentialHash: 'IR-MCKINSEY-2025-FWD',
  },
  {
    id: 'huawei',
    category: 'program_cert',
    kind: 'program',
    title: {
      en: 'Huawei ICT Competition 2026-2027 (Cloud & AI Track)',
      ar: 'مسابقة هواوي لتكنولوجيا المعلومات والاتصالات (مسار Cloud & AI)',
    },
    issuer: {
      en: 'Huawei',
      ar: 'شركة هواوي',
    },
    period: {
      start: { en: 'Oct 2026', ar: 'تشرين الأول 2026' },
      end: { en: '2027', ar: '2027' },
      isOngoing: true,
    },
    badge: {
      en: 'Registered Track',
      ar: 'مسجّل في المسار',
    },
    status: {
      en: 'Registered',
      ar: 'مسجّل',
    },
    rating: 5,
    overview: {
      en: 'International competition assessing cloud computing architecture, distributed enterprise services, model serving pipelines, and cloud-native AI systems.',
      ar: 'مسابقة دولية تقيس الكفاءة في معمارية الحوسبة السحابية وخدمات المؤسسات الموزعة وخطوط نشر نماذج الذكاء الاصطناعي السحابية.',
    },
    learnings: [
      {
        en: 'Cloud computing infrastructure, virtualization and distributed systems',
        ar: 'البنية التحتية للحوسبة السحابية والأنظمة الافتراضية والموزعة',
      },
      {
        en: 'Huawei Cloud AI ModelArts and scalable model serving pipelines',
        ar: 'خدمات منصة Huawei Cloud ModelArts لنشر نماذج الذكاء الاصطناعي',
      },
      {
        en: 'Enterprise cloud networking and security governance protocols',
        ar: 'بروتوكولات أمن الشبكات السحابية المؤسسية وحماية البيانات',
      },
    ],
    synergyStack: ['python', 'docker'],
    credentialHash: 'IR-HUAWEI-2026-CLOUD-AI',
  },
  {
    id: 'ml-spec',
    category: 'program_cert',
    kind: 'certificate',
    title: {
      en: 'Machine Learning Specialization',
      ar: 'تخصص تعلّم الآلة (Machine Learning Specialization)',
    },
    issuer: {
      en: 'DeepLearning.AI & Stanford Online',
      ar: 'DeepLearning.AI وجامعة ستانفورد أونلاين',
    },
    period: {
      start: { en: 'May 2026', ar: 'أيار 2026' },
      end: { en: 'Aug 2026', ar: 'آب 2026' },
    },
    badge: {
      en: 'Stanford & DeepLearning.AI Certificate',
      ar: 'شهادة معتمدة من ستانفورد',
    },
    rating: 5,
    overview: {
      en: 'Mastered supervised and unsupervised machine learning, neural networks, decision trees, anomaly detection, and recommender systems with Python, NumPy, scikit-learn, and TensorFlow.',
      ar: 'دراسة وتطبيق خوارزميات تعلم الآلة الموجه وغير الموجه، والشبكات العصبية، وأشجار القرار، وأنظمة التوصية وكشف الشذوذ باستخدام Python وNumPy وscikit-learn وTensorFlow.',
    },
    learnings: [
      {
        en: 'Supervised Learning: Linear & Logistic Regression, Gradient Descent, Decision Trees',
        ar: 'التعلم الخاضع للإشراف: الانحدار الخطي واللوجستي، وخوارزمية Gradient Descent، وأشجار القرار',
      },
      {
        en: 'Neural Networks & Deep Learning: Multi-layer Perceptrons, Regularization, Optimization',
        ar: 'الشبكات العصبية والتعلم العميق: المعمارية المتعددة الطبقات، تقنيات التحسين وتقليل الإفراط',
      },
      {
        en: 'Unsupervised Learning: K-means clustering, PCA, and Collaborative Filtering Recommenders',
        ar: 'التعلم غير الموجه: التجميع العنقودي K-means، تقليل الأبعاد PCA، وأنظمة التوصية الذكية',
      },
    ],
    courseUrl: 'https://www.coursera.org/specializations/machine-learning-introduction',
    certificateUrl: 'https://www.coursera.org/',
    hasCertificate: true,
    synergyStack: ['python', 'tensorflow', 'scikitlearn', 'numpy'],
    credentialHash: 'IR-STANFORD-2026-ML-SPEC',
  },
  {
    id: 'fastapi-cert',
    category: 'program_cert',
    kind: 'certificate',
    title: {
      en: 'Creating APIs with Python (FastAPI)',
      ar: 'بناء واجهات برمجية متقدمة بـ Python وFastAPI',
    },
    issuer: {
      en: 'freeCodeCamp',
      ar: 'منصة freeCodeCamp',
    },
    period: {
      start: { en: 'Jun 2026', ar: 'حزيران 2026' },
      end: { en: 'Jul 2026', ar: 'تموز 2026' },
    },
    badge: {
      en: '19 Hours Production Curriculum',
      ar: '19 ساعة تدريبية تطبيقية',
    },
    note: {
      en: '19 hours',
      ar: '19 ساعة',
    },
    rating: 5,
    overview: {
      en: 'Comprehensive 19-hour hands-on curriculum building production-grade FastAPI REST backends with PostgreSQL, SQLAlchemy ORM, Alembic migrations, JWT authentication, Pytest, Docker, and CI/CD pipelines.',
      ar: 'دورة تطبيقية مكثفة لـ 19 ساعة لبناء خلفيات برمجية قوية بـ FastAPI وPostgreSQL وSQLAlchemy وAlembic، مع توثيق JWT واختبارات Pytest وتغليف Docker وخطوط CI/CD.',
    },
    learnings: [
      {
        en: 'Asynchronous REST APIs with FastAPI, Pydantic data schemas and validation',
        ar: 'بناء واجهات REST غير متزامنة بـ FastAPI مع التحقق الصارم من المخططات بـ Pydantic',
      },
      {
        en: 'PostgreSQL relational database design, SQLAlchemy ORM, and automated Alembic schema migrations',
        ar: 'تصميم قواعد بيانات PostgreSQL وربطها عبر SQLAlchemy ORM مع إدارة الهجرات بـ Alembic',
      },
      {
        en: 'Stateless authentication via JWT tokens, bcrypt password hashing, and endpoint security',
        ar: 'تأمين الأنظمة وتوثيق المستخدمين عبر رموز JWT وتشفير كلمات المرور بـ bcrypt',
      },
      {
        en: 'Comprehensive automated test suites with Pytest, Docker containerization, and GitHub Actions CI/CD',
        ar: 'كتابة اختبارات آلية بـ Pytest، وبناء حاويات Docker وأتمتة النشر عبر GitHub Actions',
      },
    ],
    projects: [
      {
        name: {
          en: 'Social Media Platform — REST API Backend',
          ar: 'منصة تواصل اجتماعي — واجهة REST API',
        },
        description: {
          en: 'Production-ready backend with users, posts, comments, votes, JWT auth, Dockerized with automated CI/CD pipeline.',
          ar: 'خلفية متكاملة بـ FastAPI تضم المنشورات والتفاعلات ونظام صلاحيات متقدم ومغلفة بحاويات Docker مع CI/CD.',
        },
        portfolioProjectId: 'social-media-app',
        repoUrl: 'https://github.com/Islam-Raad-dev/Python_API_Development',
      },
    ],
    courseUrl: 'https://www.freecodecamp.org/news/fastapi-quickstart/',
    repoUrl: 'https://github.com/Islam-Raad-dev/Python_API_Development',
    synergyStack: ['fastapi', 'postgresql', 'docker', 'pytest', 'githubactions'],
    credentialHash: 'IR-FCC-2026-FASTAPI-19H',
  },
  {
    id: 'aws-scholarship',
    category: 'program_cert',
    kind: 'certificate',
    title: {
      en: 'AWS AI & ML Scholarship',
      ar: 'منحة AWS للذكاء الاصطناعي وتعلّم الآلة',
    },
    issuer: {
      en: 'Amazon Web Services (AWS)',
      ar: 'أمازون ويب سيرفيسز (AWS)',
    },
    period: {
      start: { en: 'May 2026', ar: 'أيار 2026' },
      end: { en: 'Jun 2026', ar: 'حزيران 2026' },
    },
    badge: {
      en: 'AWS Global Scholarship',
      ar: 'منحة AWS العالمية',
    },
    rating: 5,
    overview: {
      en: 'Selective scholarship program focusing on Generative AI, Large Language Models (LLMs), machine learning fundamentals, and ethical AI frameworks with hands-on labs on AWS cloud infrastructure.',
      ar: 'منحة دراسية انتقائية تركز على الذكاء الاصطناعي التوليدي، ونماذج اللغة الكبيرة (LLMs)، وأسس تعلم الآلة، وأطر الذكاء الاصطناعي الأخلاقي مع مختبرات عملية على سحابة AWS.',
    },
    learnings: [
      {
        en: 'Generative AI fundamentals, foundation models, and prompt engineering paradigms',
        ar: 'أساسيات الذكاء الاصطناعي التوليدي والنماذج التأسيسية وأساليب هندسة التلقين',
      },
      {
        en: 'Responsible AI ethics, bias mitigation and safety verification frameworks',
        ar: 'أخلاقيات الذكاء الاصطناعي المسؤول والحد من الانحياز وأطر التحقق والأمان',
      },
      {
        en: 'Hands-on training labs leveraging AWS cloud machine learning services',
        ar: 'مختبرات تدريبية تطبيقية باستخدام خدمات الذكاء الاصطناعي على سحابة AWS',
      },
    ],
    courseUrl: 'https://aws.amazon.com/machine-learning/scholarship/',
    certificateUrl: 'https://aws.amazon.com/',
    hasCertificate: true,
    synergyStack: ['python', 'docker'],
    credentialHash: 'IR-AWS-2026-AI-ML-SCHOLAR',
  },
  {
    id: 'programming-advices',
    category: 'program_cert',
    kind: 'course',
    title: {
      en: 'Software Engineering & Computer Science Roadmap (14 Courses)',
      ar: 'مسار علوم الحاسوب وهندسة البرمجيات الشامل (14 كورساً)',
    },
    issuer: {
      en: 'Programming Advices',
      ar: 'أكاديمية Programming Advices',
    },
    period: {
      start: { en: 'Nov 1, 2025', ar: '1 تشرين الثاني 2025' },
      end: { en: 'Jul 1, 2026', ar: '1 تموز 2026' },
    },
    badge: {
      en: '14-Course Comprehensive Track',
      ar: 'مسار متكامل من 14 كورساً معتمداً',
    },
    rating: 5,
    overview: {
      en: 'A comprehensive, rigorous computer science roadmap consisting of 14 sequentially structured courses covering algorithmic problem-solving levels 1 to 5, modern C++, deep object-oriented programming (OOP), custom data structures, and relational database systems with SQL.',
      ar: 'مسار أكاديمي تأسيسي متين يتألف من 14 كورساً متدرجاً في علوم الحاسوب؛ يغطي حل المشكلات والخوارزميات من المستوى 1 إلى 5، لغة C++، البرمجة كائنية التوجه (OOP) وتطبيقاتها، هياكل البيانات المتقدمة، وقواعد البيانات العلائقية SQL.',
    },
    learnings: [
      {
        en: 'Advanced Algorithmic Thinking & Complex Problem Solving (Levels 1 to 5)',
        ar: 'التفكير الخوارزمي المتقدم وحل المشكلات البرمجية المعقدة (المستويات 1-5)',
      },
      {
        en: 'Deep C++ Systems Programming, Pointers, and Direct Memory Management',
        ar: 'البرمجة العميقة بلغة C++، والمؤشرات (Pointers) وإدارة الذاكرة المباشرة',
      },
      {
        en: 'Object-Oriented Programming (OOP) Architecture, Design Patterns, and Real-world Applications',
        ar: 'معمارية البرمجة كائنية التوجه (OOP كما يجب أن تكون) والتطبيق العملي الموسع',
      },
      {
        en: 'Custom Data Structures Implementation (Linked Lists, Stacks, Queues, Trees)',
        ar: 'بناء وتطبيق هياكل البيانات (Data Structures) برمجياً من الصفر',
      },
      {
        en: 'Relational Database Design, Normalization, and Complex SQL Query Engineering',
        ar: 'تصميم قواعد البيانات العلائقية، وتطبيع الجداول، وهندسة استعلامات SQL المتقدمة',
      },
    ],
    projects: [
      {
        name: {
          en: 'C++ CLI Banking Management System',
          ar: 'نظام إدارة البنوك الكونسول بلغة C++ (CLI Banking System)',
        },
        description: {
          en: 'Built on a 3-tier OOP architecture with 20 UI screens, serialized flat-file database, bitwise role permissions, transaction engine, and currency exchange.',
          ar: 'مبني بمعمارية 3-tier OOP مع 25 شاشة كونسول، قاعدة بيانات ملفات مخصصة، صلاحيات Bitwise، ومحرك معاملات مالية وتحويل عملات.',
        },
        repoUrl: 'https://github.com/Islam-Raad-dev/OOP_In_CPP/tree/main/Part%202%20(%20Applications%20)/3%20-%20Bank%20System%20Project',
      },
    ],
    courseUrl: 'https://programmingadvices.com/l/products?sortKey=recommended&sortDirection=asc&page=1',
    repoUrl: 'https://github.com/Islam-Raad-dev',
    subCourses: [
      { en: '1. Programming Foundations level 1', ar: '1. أسس البرمجة - المستوى الأول (Programming Foundations 1)' },
      { en: '2. Programming Foundations level 2', ar: '2. أسس البرمجة - المستوى الثاني (Programming Foundations 2)' },
      { en: '3. Programming C++ level 1', ar: '3. البرمجة بلغة C++ - المستوى الأول (C++ Level 1)' },
      { en: '4. Programming C++ level 2', ar: '4. البرمجة بلغة C++ - المستوى الثاني (C++ Level 2)' },
      { en: '5. Algorithms & Problem Solving level 1', ar: '5. الخوارزميات وحل المشكلات - المستوى 1' },
      { en: '6. Algorithms & Problem Solving level 2', ar: '6. الخوارزميات وحل المشكلات - المستوى 2' },
      { en: '7. Algorithms & Problem Solving level 3', ar: '7. الخوارزميات وحل المشكلات - المستوى 3' },
      { en: '8. Algorithms & Problem Solving level 4', ar: '8. الخوارزميات وحل المشكلات - المستوى 4' },
      { en: '9. Algorithms & Problem Solving level 5', ar: '9. الخوارزميات وحل المشكلات - المستوى 5' },
      { en: '10. OOP as it Should Be', ar: '10. البرمجة كائنية التوجه كما يجب أن تكون (OOP)' },
      { en: '11. OOP as it Should Be (Application)', ar: '11. تطبيقات عملية متقدمة على الـ OOP' },
      { en: '12. Data Structures level 1', ar: '12. هياكل البيانات - المستوى الأول (Data Structures 1)' },
      { en: '13. Database Level 1 - SQL', ar: '13. قواعد البيانات ولغة SQL - المستوى الأول' },
      { en: '14. Database Level 2 - SQL', ar: '14. قواعد البيانات ولغة SQL - المستوى الثاني' },
    ],
    synergyStack: ['cpp', 'postgresql', 'github'],
    credentialHash: 'IR-PA-2026-CS-ROADMAP-14',
  },
];
