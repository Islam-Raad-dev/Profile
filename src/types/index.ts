export type Lang = 'en' | 'ar';
export type L = { en: string; ar: string };

export type SectionId = 'home' | 'about' | 'projects' | 'skills' | 'achievements' | 'contact';

export type SkillCategory = 'backend' | 'frontend' | 'ai' | 'tools' | 'database' | 'language' | 'framework' | 'tool';

export type Skill = {
  id: string;
  name: string;
  icon?: string;
  category: SkillCategory;
  featured?: boolean;
  show?: boolean;
};

export type Project = {
  id: string;
  title: L;
  summary: L;
  description?: L;
  stack: string[];
  repo?: string;
  live?: string;
  download?: string;
  images?: string[];
  featured?: boolean;
  badge?: L;
};

export type AchievementCategory = 'achievement' | 'program_cert';

export type MilestoneStage = 'achievements' | 'programs_certs' | 'volunteering';

export type AchievementProject = {
  name: L;
  description?: L;
  portfolioProjectId?: string;
  repoUrl?: string;
  liveUrl?: string;
};

export type AchievementPeriod = {
  start: L;
  end?: L;
  isOngoing?: boolean;
};

export type Achievement = {
  id: string;
  category: AchievementCategory;
  kind: 'award' | 'program' | 'certificate' | 'course' | 'honor';
  title: L;
  issuer?: L;
  status?: L;
  note?: L;
  period?: AchievementPeriod;
  badge?: L;
  rating?: number;
  overview?: L;
  learnings?: L[];
  projects?: AchievementProject[];
  courseUrl?: string;
  repoUrl?: string;
  certificateUrl?: string;
  hasCertificate?: boolean;
  subCourses?: L[];
  synergyStack?: string[];
  credentialHash?: string;
};

export type VolunteeringItem = {
  id: string;
  role: L;
  organization: L;
  period: L;
  location: L;
  description: L;
  highlight?: L;
  credentialHash?: string;
  synergyStack?: string[];
};

export type TimelineItem = {
  id: string;
  role: L;
  org: L;
  period: L;
};

export type Education = {
  school: L;
  faculty: L;
  program: L;
  stage: L;
  note?: L;
};

export type SectionConfig = {
  id: SectionId;
  enabled: boolean;
};

export type SiteConfig = {
  sections: SectionConfig[];
  showComingSoon: boolean;
  email: string;
  phoneDisplay: string;
  whatsappUrl: string;
  github: string;
  linkedin: string;
  cvUrl: string;
};

export type DigitalCvEntry = {
  id: string;
  title: L;
  subtitle?: L;
  period?: L;
  badge?: L;
  targetSection?: SectionId;
  targetElementId?: string;
  externalUrl?: string;
};

export type DigitalCvData = {
  title: L;
  role: L;
  location: L;
  email: string;
  phone: string;
  overview: L;
  stack: string[];
  impact: L[];
  projects: DigitalCvEntry[];
  academic: DigitalCvEntry[];
  programs: DigitalCvEntry[];
  certificates: DigitalCvEntry[];
  languages: L;
  engineeredWith: L;
};

