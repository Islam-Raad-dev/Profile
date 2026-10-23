import type { SiteConfig } from '@/types';

export const site: SiteConfig = {
  sections: [
    { id: 'home', enabled: true },
    { id: 'about', enabled: true },
    { id: 'projects', enabled: true },
    { id: 'skills', enabled: true },
    { id: 'achievements', enabled: true },
    { id: 'contact', enabled: true },
  ],
  showComingSoon: false,
  email: 'islamraad.dev@gmail.com',
  phoneDisplay: '+964 777 938 9549',
  whatsappUrl: 'https://wa.me/9647779389549',
  github: 'https://github.com/Islam-Raad-dev',
  linkedin: 'https://www.linkedin.com/in/islam-raad/',
  cvUrl: 'https://drive.google.com/file/d/1w0npwNUG9-88IZCcxWLuoOWYqjwyGfSC/view?usp=sharing',
};
