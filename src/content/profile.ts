import type { Education, L, TimelineItem } from '@/types';

export const profile = {
  fullName: { en: 'Islam Raad', ar: 'إسلام رعد' } as L,
  shortName: { en: 'Islam', ar: 'إسلام' } as L,
  heroName: { line1: { en: 'ISLAM', ar: 'إسلام' }, line2: { en: 'RAAD', ar: 'رعد' } },
  role: { en: 'AI Engineering Student', ar: 'طالب هندسة الذكاء الاصطناعي' } as L,
  tagline: {
    en: 'AI Engineering student at the University of Mosul.',
    ar: 'طالب هندسة ذكاء اصطناعي في جامعة الموصل.',
  } as L,
  location: { en: 'Mosul, Iraq', ar: 'الموصل، العراق' } as L,
  greeting: { en: "Hello, I'm", ar: 'أهلاً، أنا' } as L,
  shortBio: {
    en: "I build AI-powered applications and backend systems, and I'm deepening my machine learning skills.",
    ar: 'أقوم ببناء تطبيقات وأنظمة خلفية مدعومة بالذكاء الاصطناعي، وأعمل على تعميق مهاراتي في تعلم الآلة.',
  } as L,
  longBio: {
    en: "Second-year AI Engineering student at the University of Mosul. I build AI-powered applications and backend systems, and I'm deepening my machine learning skills through Samsung Innovation Campus and GCI World. I'm seeking opportunities to learn and contribute to real-world AI and software projects.",
    ar: 'طالب في المرحلة الثانية بهندسة الذكاء الاصطناعي في جامعة الموصل. أبني تطبيقات مدعومة بالذكاء الاصطناعي وأنظمة خلفية، وأعمّق مهاراتي في تعلّم الآلة من خلال Samsung Innovation Campus وGCI World. أبحث عن فرص للتعلّم والمساهمة في مشاريع حقيقية في الذكاء الاصطناعي وهندسة البرمجيات.',
  } as L,
  education: {
    school: { en: 'University of Mosul', ar: 'جامعة الموصل' },
    faculty: { en: 'College of Computer Science and Mathematics', ar: 'كلية علوم الحاسوب والرياضيات' },
    program: { en: 'AI Engineering', ar: 'هندسة الذكاء الاصطناعي' },
    stage: { en: 'Second year', ar: 'المرحلة الثانية' },
    note: { en: 'Ranked first in my class in the first year', ar: 'الأول على دفعتي في السنة الأولى' },
  } as Education,
  activities: [
    {
      id: 'media-team',
      role: { en: 'Media Team Member', ar: 'عضو الفريق الإعلامي' },
      org: { en: 'Department of Artificial Intelligence, University of Mosul', ar: 'قسم الذكاء الاصطناعي، جامعة الموصل' },
      period: { en: 'Nov 2025 - Present', ar: 'تشرين الثاني 2025 - حتى الآن' },
    },
    {
      id: 'library-assistant',
      role: { en: 'Library Coordinator and Management Assistant', ar: 'منسّق مكتبة ومساعد إداري' },
      org: { en: 'School Library, Mosul, Iraq', ar: 'مكتبة المدرسة، الموصل، العراق' },
      period: { en: 'Oct 2023 - Jun 2025', ar: 'تشرين الأول 2023 - حزيران 2025' },
    },
  ] as TimelineItem[],
};
