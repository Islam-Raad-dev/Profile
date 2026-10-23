import type { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'napta',
    title: {
      en: 'AI Napta',
      ar: 'نبتة (AI Napta)',
    },
    summary: {
      en: 'A web app that diagnoses agricultural plant diseases from images uploaded by the user, using AI.',
      ar: 'تطبيق ويب يشخّص أمراض النباتات الزراعية من صور يرفعها المستخدم باستخدام الذكاء الاصطناعي.',
    },
    description: {
      en: 'A web app that diagnoses agricultural plant diseases from images uploaded by the user, using AI. It solves one problem: identifying a plant disease from a photo.',
      ar: 'تطبيق ويب يشخّص أمراض النباتات الزراعية من صور يرفعها المستخدم باستخدام الذكاء الاصطناعي. يحل مشكلة تشخيص أمراض النباتات الزراعية من الصورة.',
    },
    stack: ['react', 'vite', 'gemini', 'openrouter', 'netlify'],
    repo: 'https://github.com/Islam-Raad-dev/Napta',
    live: 'https://napta-ai.netlify.app/',
    badge: {
      en: '3rd place at the University of Mosul level, in the university competition',
      ar: 'المركز الثالث على مستوى جامعة الموصل في مسابقة الجامعة',
    },
    featured: true,
  },
  {
    id: 'social-media-app',
    title: {
      en: 'Social Media App',
      ar: 'تطبيق سوشيال ميديا',
    },
    summary: {
      en: 'A social media app built with FastAPI, with users, posts, comments and likes, plus authentication and permissions.',
      ar: 'تطبيق سوشيال ميديا مبني بـ FastAPI يضم مستخدمين ومنشورات وتعليقات وإعجابات، مع تسجيل دخول وصلاحيات.',
    },
    description: {
      en: 'A social media app built with FastAPI, with users, posts, comments and likes, plus authentication and permissions.',
      ar: 'تطبيق سوشيال ميديا مبني بـ FastAPI يضم مستخدمين ومنشورات وتعليقات وإعجابات، مع تسجيل دخول وصلاحيات.',
    },
    stack: ['fastapi', 'docker', 'githubactions'],
    repo: 'https://github.com/Islam-Raad-dev/Python_API_Development',
    featured: false,
  },
];
