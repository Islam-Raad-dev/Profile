import type { VolunteeringItem } from '@/types';

export const volunteeringItems: VolunteeringItem[] = [
  {
    id: 'vol-ai-media',
    role: {
      en: 'Media Team Member',
      ar: 'عضو الفريق الإعلامي',
    },
    organization: {
      en: 'Department of Artificial Intelligence, University of Mosul',
      ar: 'قسم هندسة الذكاء الاصطناعي، جامعة الموصل',
    },
    period: {
      en: 'Nov 2025 – Present',
      ar: 'تشرين الثاني 2025 – حتى الآن',
    },
    location: {
      en: 'Mosul, Iraq',
      ar: 'الموصل، العراق',
    },
    description: {
      en: 'Contribute to the department’s official media presence by covering academic events, creating digital content, and highlighting student innovations and technical achievements.',
      ar: 'المساهمة في الهوية الإعلامية للقسم من خلال تغطية الفعاليات الأكاديمية وصناعة المحتوى الرقمي وإبراز إنجازات وابتكارات الطلبة.',
    },
    highlight: {
      en: 'Media & Event Documentation',
      ar: 'التغطية الإعلامية والتوثيق',
    },
    credentialHash: 'IR-MOSUL-AI-MEDIA-2025',
    synergyStack: ['python'],
  },
  {
    id: 'vol-school-library',
    role: {
      en: 'Library Coordinator & Management Assistant',
      ar: 'منسق ومساعد إدارة المكتبة',
    },
    organization: {
      en: 'School Library, Al-Amjad Preparatory',
      ar: 'مكتبة ثانوية الأمجاد',
    },
    period: {
      en: 'Oct 2023 – Jun 2025',
      ar: 'تشرين الأول 2023 – حزيران 2025',
    },
    location: {
      en: 'Mosul, Iraq',
      ar: 'الموصل، العراق',
    },
    description: {
      en: 'Coordinated day-to-day library operations, organized book categorizations, managed borrowing and circulation logs, and fostered an encouraging reading and study environment.',
      ar: 'تنظيم وإدارة العمليات اليومية للمكتبة، وتصنيف الكتب وفهرستها، ومتابعة سجلات الاستعارة والإرجاع، وتوفير بيئة دراسية محفزة للقراءة والبحث.',
    },
    highlight: {
      en: 'Cataloging & Operations Management',
      ar: 'الفهرسة والتنظيم الإداري',
    },
    credentialHash: 'IR-AMJAD-LIBRARY-2023',
  },
  {
    id: 'vol-khalouha-ajmal',
    role: {
      en: 'Community Heritage Volunteer',
      ar: 'متطوع في حملة بيئية وتراثية',
    },
    organization: {
      en: '"Khalouha Ajmal" Campaign',
      ar: 'حملة «خلوها أجمل»',
    },
    period: {
      en: 'Aug 2024',
      ar: 'آب 2024',
    },
    location: {
      en: 'Prophet Yunus (Jonah) Historic Site, Mosul',
      ar: 'موقع جامع النبي يونس التاريخي، الموصل',
    },
    description: {
      en: 'Participated in a civic community restoration and clean-up initiative at the historic Prophet Yunus archaeological site, supporting the preservation of Mosul’s cultural heritage.',
      ar: 'المشاركة الفعالة في مبادرة مجتمعية لتنظيف وتأهيل موقع جامع النبي يونس التاريخي، والمساهمة في الحفاظ على الهوية التراثية والثقافية للمدينة.',
    },
    highlight: {
      en: 'Civic & Cultural Heritage Restoration',
      ar: 'المحافظة على التراث الحضاري',
    },
    credentialHash: 'IR-MOSUL-YUNUS-2024',
  },
];
