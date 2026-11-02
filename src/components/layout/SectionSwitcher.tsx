'use client';

import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence, type Variants } from 'motion/react';
import type { SectionId } from '@/types';
import { site } from '@/content/site';
import { ui } from '@/content/ui';
import { useLang } from '@/lib/i18n';
import { useReducedMotion } from '@/lib/media';
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

const slideVariants: Variants = {
  enter: (custom: { direction: number; isRTL: boolean; reducedMotion: boolean }) => {
    if (custom.reducedMotion) {
      return { opacity: 0 };
    }
    const offset = 32 * custom.direction * (custom.isRTL ? -1 : 1);
    return {
      opacity: 0,
      x: offset,
    };
  },
  center: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.25,
      ease: [0.25, 1, 0.5, 1],
    },
  },
  exit: (custom: { direction: number; isRTL: boolean; reducedMotion: boolean }) => {
    if (custom.reducedMotion) {
      return { opacity: 0, transition: { duration: 0.15 } };
    }
    const offset = -32 * custom.direction * (custom.isRTL ? -1 : 1);
    return {
      opacity: 0,
      x: offset,
      transition: {
        duration: 0.2,
        ease: [0.25, 1, 0.5, 1],
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
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [pendingSection, setPendingSection] = useState<SectionId | null>(null);

  const lastTransitionTimeRef = useRef<number>(0);
  const accumulatedDeltaRef = useRef<number>(0);
  const deltaResetTimerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const touchStartXRef = useRef<number | null>(null);

  const checkScrollBoundaries = useCallback(() => {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight;
    const isAtTop = scrollY <= 15;
    const isAtBottom = windowHeight + scrollY >= scrollHeight - 30;
    return { isAtTop, isAtBottom };
  }, []);

  const navigateTo = useCallback(
    (targetId: SectionId) => {
      if (targetId === activeSection || isTransitioning) return;
      const now = Date.now();
      if (now - lastTransitionTimeRef.current < 850) return;
      lastTransitionTimeRef.current = now;
      accumulatedDeltaRef.current = 0;

      const currentIndex = enabledSections.findIndex((s) => s.id === activeSection);
      const nextIndex = enabledSections.findIndex((s) => s.id === targetId);
      setDirection(nextIndex > currentIndex ? 1 : -1);
      setPendingSection(targetId);
      setIsTransitioning(true);
    },
    [activeSection, enabledSections, isTransitioning]
  );

  const handleCurtainCovered = useCallback(() => {
    if (pendingSection) {
      setActiveSection(pendingSection);
      window.history.pushState(null, '', '#' + pendingSection);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pendingSection]);

  const handleTransitionComplete = useCallback(() => {
    setIsTransitioning(false);
    setPendingSection(null);
    lastTransitionTimeRef.current = Date.now();
    accumulatedDeltaRef.current = 0;
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const currentHash = (window.location.hash.replace('#', '') || initialSection) as SectionId;
      const valid = enabledSections.some((s) => s.id === currentHash);
      if (valid && currentHash !== activeSection && !isTransitioning) {
        const currentIndex = enabledSections.findIndex((s) => s.id === activeSection);
        const nextIndex = enabledSections.findIndex((s) => s.id === currentHash);
        setDirection(nextIndex > currentIndex ? 1 : -1);
        setPendingSection(currentHash);
        setIsTransitioning(true);
      }
    };

    const handleCustomNavigate = (e: Event) => {
      const custom = e as CustomEvent<{ sectionId: SectionId; elementId?: string }>;
      if (custom.detail?.sectionId) {
        navigateTo(custom.detail.sectionId);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    window.addEventListener('app-navigate-section', handleCustomNavigate);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
      window.removeEventListener('app-navigate-section', handleCustomNavigate);
    };
  }, [activeSection, enabledSections, initialSection, isTransitioning, navigateTo]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isTransitioning || Date.now() - lastTransitionTimeRef.current < 850) {
        return;
      }

      if (document.querySelector('dialog[open], [role="dialog"]')) {
        return;
      }

      const active = document.activeElement;
      if (
        active &&
        (active.tagName === 'INPUT' ||
          active.tagName === 'TEXTAREA' ||
          active.getAttribute('contenteditable') === 'true')
      ) {
        return;
      }

      if (deltaResetTimerRef.current) {
        clearTimeout(deltaResetTimerRef.current);
      }
      deltaResetTimerRef.current = setTimeout(() => {
        accumulatedDeltaRef.current = 0;
      }, 250);

      const { isAtTop, isAtBottom } = checkScrollBoundaries();
      const currentIndex = enabledSections.findIndex((s) => s.id === activeSection);
      if (currentIndex === -1) return;

      if (e.deltaY > 0) {
        if (!isAtBottom) {
          accumulatedDeltaRef.current = 0;
          return;
        }

        if (activeSection === 'achievements') {
          const achElement = document.getElementById('achievements');
          if (achElement && achElement.getAttribute('data-is-last-stage') === 'false') {
            return;
          }
        }

        if (currentIndex >= enabledSections.length - 1) return;

        accumulatedDeltaRef.current += e.deltaY;
        if (accumulatedDeltaRef.current >= 45) {
          accumulatedDeltaRef.current = 0;
          navigateTo(enabledSections[currentIndex + 1].id);
        }
      } else if (e.deltaY < 0) {
        if (!isAtTop) {
          accumulatedDeltaRef.current = 0;
          return;
        }

        if (activeSection === 'achievements') {
          const achElement = document.getElementById('achievements');
          if (achElement && achElement.getAttribute('data-is-first-stage') === 'false') {
            return;
          }
        }

        if (currentIndex <= 0) return;

        accumulatedDeltaRef.current += e.deltaY;
        if (accumulatedDeltaRef.current <= -45) {
          accumulatedDeltaRef.current = 0;
          navigateTo(enabledSections[currentIndex - 1].id);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (deltaResetTimerRef.current) {
        clearTimeout(deltaResetTimerRef.current);
      }
    };
  }, [activeSection, checkScrollBoundaries, enabledSections, isTransitioning, navigateTo]);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartYRef.current = e.touches[0].clientY;
        touchStartXRef.current = e.touches[0].clientX;
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartYRef.current === null) return;
      if (isTransitioning || Date.now() - lastTransitionTimeRef.current < 850) return;
      if (document.querySelector('dialog[open], [role="dialog"]')) return;

      const active = document.activeElement;
      if (
        active &&
        (active.tagName === 'INPUT' ||
          active.tagName === 'TEXTAREA' ||
          active.getAttribute('contenteditable') === 'true')
      ) {
        return;
      }

      const touchEndY = e.changedTouches[0].clientY;
      const touchEndX = e.changedTouches[0].clientX;
      const deltaY = touchStartYRef.current - touchEndY;
      const deltaX = (touchStartXRef.current || 0) - touchEndX;

      touchStartYRef.current = null;
      touchStartXRef.current = null;

      if (Math.abs(deltaX) > Math.abs(deltaY)) return;
      if (Math.abs(deltaY) < 50) return;

      const { isAtTop, isAtBottom } = checkScrollBoundaries();
      const currentIndex = enabledSections.findIndex((s) => s.id === activeSection);
      if (currentIndex === -1) return;

      if (deltaY > 0) {
        if (!isAtBottom) return;
        if (activeSection === 'achievements') {
          const achElement = document.getElementById('achievements');
          if (achElement && achElement.getAttribute('data-is-last-stage') === 'false') {
            return;
          }
        }
        if (currentIndex < enabledSections.length - 1) {
          navigateTo(enabledSections[currentIndex + 1].id);
        }
      } else if (deltaY < 0) {
        if (!isAtTop) return;
        if (activeSection === 'achievements') {
          const achElement = document.getElementById('achievements');
          if (achElement && achElement.getAttribute('data-is-first-stage') === 'false') {
            return;
          }
        }
        if (currentIndex > 0) {
          navigateTo(enabledSections[currentIndex - 1].id);
        }
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [activeSection, checkScrollBoundaries, enabledSections, isTransitioning, navigateTo]);

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
      } else if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        const { isAtBottom } = checkScrollBoundaries();
        if (activeSection === 'home' || isAtBottom) {
          if (activeSection === 'achievements') {
            const achElement = document.getElementById('achievements');
            if (achElement && achElement.getAttribute('data-is-last-stage') === 'false') {
              return;
            }
          }
          if (currentIndex < enabledSections.length - 1) {
            e.preventDefault();
            navigateTo(enabledSections[currentIndex + 1].id);
          }
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        const { isAtTop } = checkScrollBoundaries();
        if (isAtTop) {
          if (activeSection === 'achievements') {
            const achElement = document.getElementById('achievements');
            if (achElement && achElement.getAttribute('data-is-first-stage') === 'false') {
              return;
            }
          }
          if (currentIndex > 0) {
            e.preventDefault();
            navigateTo(enabledSections[currentIndex - 1].id);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection, checkScrollBoundaries, enabledSections, isRTL, navigateTo]);

  const ActiveComponent = SECTION_COMPONENTS[activeSection] || HeroSection;
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

      <main
        id="main-content"
        className={`flex flex-col justify-center overflow-x-hidden ${
          activeSection === 'home'
            ? 'min-h-screen pb-0'
            : 'min-h-[calc(100vh-140px)] pb-28 md:pb-36'
        }`}
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
            {activeSection === 'contact' && (
              <footer className="mt-8 text-center text-xs text-text-muted">
                <p>
                  © {new Date().getFullYear()} {t(ui.footer)}
                </p>
              </footer>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <Navbar activeSection={activeSection} onNavigate={navigateTo} />

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
