'use client';

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence, type Variants } from 'motion/react';
import type { SectionId } from '@/types';
import { site } from '@/content/site';
import { ui } from '@/content/ui';
import { useLang } from '@/lib/i18n';
import { useReducedMotion } from '@/lib/media';
import { Navbar } from '@/components/layout/Navbar';
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

const slideVariants: Variants = {
  enter: (custom: { direction: number; isRTL: boolean; reducedMotion: boolean }) => {
    if (custom.reducedMotion) {
      return { opacity: 0 };
    }
    const offset = 40 * custom.direction * (custom.isRTL ? -1 : 1);
    return {
      opacity: 0,
      x: offset,
      filter: 'blur(8px)',
    };
  },
  center: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: (custom: { direction: number; isRTL: boolean; reducedMotion: boolean }) => {
    if (custom.reducedMotion) {
      return { opacity: 0, transition: { duration: 0.15 } };
    }
    const offset = -40 * custom.direction * (custom.isRTL ? -1 : 1);
    return {
      opacity: 0,
      x: offset,
      filter: 'blur(8px)',
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
      },
    };
  },
};

export function SectionSwitcher() {
  const { lang, t } = useLang();
  const isRTL = lang === 'ar';
  const reducedMotion = useReducedMotion();

  const enabledSections = useMemo(
    () => site.sections.filter((s) => s.enabled),
    []
  );
  const initialSection = enabledSections[0]?.id || 'home';

  const [activeSection, setActiveSection] = useState<SectionId>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '') as SectionId;
      if (hash && enabledSections.some((s) => s.id === hash)) {
        return hash;
      }
    }
    return initialSection;
  });

  const [direction, setDirection] = useState<number>(1);

  const navigateTo = useCallback(
    (targetId: SectionId) => {
      if (targetId === activeSection) return;
      const currentIndex = enabledSections.findIndex((s) => s.id === activeSection);
      const nextIndex = enabledSections.findIndex((s) => s.id === targetId);
      setDirection(nextIndex > currentIndex ? 1 : -1);
      setActiveSection(targetId);
      window.history.pushState(null, '', '#' + targetId);
      window.scrollTo({ top: 0, behavior: 'instant' });
    },
    [activeSection, enabledSections]
  );

  // Handle browser back and forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      const hash = (window.location.hash.replace('#', '') || initialSection) as SectionId;
      const isEnabled = enabledSections.some((s) => s.id === hash);
      if (isEnabled && hash !== activeSection) {
        const currentIndex = enabledSections.findIndex((s) => s.id === activeSection);
        const nextIndex = enabledSections.findIndex((s) => s.id === hash);
        setDirection(nextIndex > currentIndex ? 1 : -1);
        setActiveSection(hash);
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, [activeSection, enabledSections, initialSection]);

  // Keyboard navigation with ArrowLeft / ArrowRight
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const active = document.activeElement;
      if (
        active &&
        (active.tagName === 'INPUT' ||
          active.tagName === 'TEXTAREA' ||
          active.getAttribute('contenteditable') === 'true')
      ) {
        return;
      }

      if (document.querySelector('dialog[open], [role="dialog"]')) {
        return;
      }

      const currentIndex = enabledSections.findIndex((s) => s.id === activeSection);
      if (currentIndex === -1) return;

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        const targetIndex = isRTL ? currentIndex - 1 : currentIndex + 1;
        if (targetIndex >= 0 && targetIndex < enabledSections.length) {
          navigateTo(enabledSections[targetIndex].id);
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const targetIndex = isRTL ? currentIndex + 1 : currentIndex - 1;
        if (targetIndex >= 0 && targetIndex < enabledSections.length) {
          navigateTo(enabledSections[targetIndex].id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection, enabledSections, isRTL, navigateTo]);

  const ActiveComponent = SECTION_COMPONENTS[activeSection] || HeroSection;

  return (
    <>
      {/* Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:start-4 focus:z-50 focus:px-4 focus:py-2.5 focus:rounded-xl focus:bg-accent focus:text-white focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent font-medium text-sm transition-all"
      >
        {t(ui['a11y.skip'])}
      </a>

      {/* Main Content Area */}
      <main
        id="main-content"
        className="min-h-[calc(100vh-140px)] flex flex-col justify-center pb-28 md:pb-36 overflow-x-hidden"
      >
        <AnimatePresence mode="wait" custom={{ direction, isRTL, reducedMotion }}>
          <motion.div
            key={activeSection}
            custom={{ direction, isRTL, reducedMotion }}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full"
          >
            <ActiveComponent />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating Bottom Navigation */}
      <Navbar activeSection={activeSection} onNavigate={navigateTo} />
    </>
  );
}
