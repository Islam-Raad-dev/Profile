'use client';

import React, { useEffect, useState } from 'react';
import type { SectionId } from '@/types';
import { site } from '@/content/site';
import { ui } from '@/content/ui';
import { useLang } from '@/lib/i18n';
import { Navbar } from '@/components/layout/Navbar';
import { PageTransition } from '@/components/layout/PageTransition';
import { HeroSection } from '@/components/sections/hero/HeroSection';
import { AboutSection } from '@/components/sections/about/AboutSection';
import { ProjectsSection } from '@/components/sections/projects/ProjectsSection';
import { SkillsSection } from '@/components/sections/skills/SkillsSection';
import { AchievementsSection } from '@/components/sections/achievements/AchievementsSection';
import { ContactSection } from '@/components/sections/contact/ContactSection';

const SECTION_COMPONENTS: Record<SectionId, React.ComponentType> = {
  home: HeroSection,
  about: AboutSection,
  projects: ProjectsSection,
  skills: SkillsSection,
  achievements: AchievementsSection,
  contact: ContactSection,
};

export function ScrollLayout() {
  const { lang, t } = useLang();
  const isRTL = lang === 'ar';

  const enabledSections = site.sections.filter((s) => s.enabled);
  const initialSection = enabledSections[0]?.id || 'home';

  const [activeSection, setActiveSection] = useState<SectionId>(initialSection);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [pendingSection, setPendingSection] = useState<SectionId | null>(null);
  const [direction, setDirection] = useState<number>(1);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const targetId = window.location.hash.replace('#', '');
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'instant', block: 'start' });
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length > 0) {
          visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          const topEntryId = visibleEntries[0].target.id as SectionId;
          if (topEntryId) {
            setActiveSection(topEntryId);
          }
        }
      },
      {
        rootMargin: '-20% 0px -40% 0px',
        threshold: [0.1, 0.3, 0.6],
      }
    );

    enabledSections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [enabledSections]);

  const handleNavigate = (sectionId: SectionId) => {
    if (sectionId === activeSection || isTransitioning) return;
    const currentIndex = enabledSections.findIndex((s) => s.id === activeSection);
    const nextIndex = enabledSections.findIndex((s) => s.id === sectionId);
    setDirection(nextIndex > currentIndex ? 1 : -1);
    setPendingSection(sectionId);
    setIsTransitioning(true);
  };

  const handleCurtainCovered = () => {
    if (pendingSection) {
      setActiveSection(pendingSection);
      const element = document.getElementById(pendingSection);
      if (element) {
        element.scrollIntoView({ behavior: 'instant', block: 'start' });
      }
    }
  };

  const handleTransitionComplete = () => {
    setIsTransitioning(false);
    setPendingSection(null);
  };

  const targetSectionId = pendingSection || activeSection;
  const targetSectionName = t(ui[`nav.${targetSectionId}`]);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:start-4 focus:z-50 focus:px-4 focus:py-2.5 focus:rounded-xl focus:bg-accent focus:text-white focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent font-medium text-sm transition-all"
      >
        {t(ui['a11y.skip'])}
      </a>

      <main id="main-content" className="space-y-12 md:space-y-20 pb-28 md:pb-36">
        {enabledSections.map((sec) => {
          const Component = SECTION_COMPONENTS[sec.id];
          if (!Component) return null;
          return <Component key={sec.id} />;
        })}
      </main>

      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

      <PageTransition
        isTransitioning={isTransitioning}
        targetSectionName={targetSectionName}
        direction={direction}
        isRTL={isRTL}
        onCurtainCovered={handleCurtainCovered}
        onTransitionComplete={handleTransitionComplete}
      />
    </>
  );
}
