import type { Achievement } from '@/types';

export const achievements: Achievement[] = [
  {
    id: 'napta-award',
    kind: 'award',
    title: {
      en: '3rd place, University of Mosul competition (AI Napta)',
      ar: 'المركز الثالث في مسابقة جامعة الموصل (نبتة)',
    },
    issuer: {
      en: 'University of Mosul',
      ar: 'جامعة الموصل',
    },
    status: {
      en: '3rd place',
      ar: 'المركز الثالث',
    },
  },
  {
    id: 'sic',
    kind: 'program',
    title: {
      en: 'Samsung Innovation Campus - AI Course 2026',
      ar: 'Samsung Innovation Campus - كورس الذكاء الاصطناعي 2026',
    },
    issuer: {
      en: 'Samsung Innovation Campus',
      ar: 'Samsung Innovation Campus',
    },
    status: {
      en: 'Accepted, started 11 Oct 2026',
      ar: 'مقبول، بدأ في 11 تشرين الأول 2026',
    },
  },
  {
    id: 'gci',
    kind: 'program',
    title: {
      en: 'GCI World 2026 - September',
      ar: 'GCI World 2026 - September',
    },
    issuer: {
      en: 'Matsuo-Iwasawa Lab, University of Tokyo',
      ar: 'Matsuo-Iwasawa Lab، جامعة طوكيو',
    },
    status: {
      en: 'Accepted',
      ar: 'مقبول',
    },
  },
  {
    id: 'huawei',
    kind: 'program',
    title: {
      en: 'Huawei ICT Competition 2026-2027 - Cloud and AI track',
      ar: 'Huawei ICT Competition 2026-2027 - مسار Cloud & AI',
    },
    issuer: {
      en: 'Huawei',
      ar: 'Huawei',
    },
    status: {
      en: 'Registered',
      ar: 'مسجّل',
    },
  },
  {
    id: 'ml-spec',
    kind: 'certificate',
    title: {
      en: 'Machine Learning Specialization',
      ar: 'Machine Learning Specialization',
    },
    issuer: {
      en: 'DeepLearning.AI',
      ar: 'DeepLearning.AI',
    },
  },
  {
    id: 'fastapi-cert',
    kind: 'certificate',
    title: {
      en: 'Creating APIs with Python (FastAPI)',
      ar: 'Creating APIs with Python (FastAPI)',
    },
    issuer: {
      en: 'freeCodeCamp',
      ar: 'freeCodeCamp',
    },
    note: {
      en: '19 hours',
      ar: '19 ساعة',
    },
  },
];
