'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence, type Variants } from 'motion/react';
import type { Achievement, VolunteeringItem, MilestoneStage } from '@/types';
import { achievements } from '@/content/achievements';
import { volunteeringItems } from '@/content/volunteering';
import { ui } from '@/content/ui';
import { useLang } from '@/lib/i18n';
import { useReducedMotion } from '@/lib/media';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Reveal } from '@/components/ui/Reveal';
import { AchievementCard } from './AchievementCard';
import { VolunteeringCard } from './VolunteeringCard';
import { StageTransitionBridge } from './StageTransitionBridge';
import { Trophy, GraduationCap, HeartHandshake } from 'lucide-react';

const AchievementModal = dynamic(
  () => import('./AchievementModal').then((mod) => mod.AchievementModal),
  { ssr: false }
);

const STAGES: MilestoneStage[] = ['achievements', 'programs_certs', 'volunteering'];

export function AchievementsSection() {
  const { lang, t } = useLang();
  const isRTL = lang === 'ar';
  const reducedMotion = useReducedMotion();

  const [activeStage, setActiveStage] = useState<MilestoneStage>('achievements');
  const [direction, setDirection] = useState<number>(1);
  const [scrollAttempt, setScrollAttempt] = useState<number>(0);

  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [selectedVolunteering, setSelectedVolunteering] = useState<VolunteeringItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const activeTriggerRef = useRef<HTMLElement | null>(null);

  const scrollAttemptTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartYRef = useRef<number>(0);
  const sectionRef = useRef<HTMLElement | null>(null);

  const achievementList = achievements.filter((a) => a.category === 'achievement');
  const programList = achievements.filter((a) => a.category === 'program_cert');

  const stageIndex = STAGES.indexOf(activeStage);

  const scrollToSectionTop = useCallback(() => {
    const el = document.getElementById('achievements');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const goToStage = useCallback((nextStage: MilestoneStage) => {
    const currIdx = STAGES.indexOf(activeStage);
    const targetIdx = STAGES.indexOf(nextStage);
    if (currIdx === targetIdx) return;

    setDirection(targetIdx > currIdx ? 1 : -1);
    setActiveStage(nextStage);
    setScrollAttempt(0);
    scrollToSectionTop();
  }, [activeStage, scrollToSectionTop]);

  const advanceStage = useCallback(() => {
    if (stageIndex < STAGES.length - 1) {
      goToStage(STAGES[stageIndex + 1]);
    }
  }, [goToStage, stageIndex]);

  const previousStage = useCallback(() => {
    if (stageIndex > 0) {
      goToStage(STAGES[stageIndex - 1]);
    }
  }, [goToStage, stageIndex]);

  const registerScrollDownAttempt = useCallback(() => {
    if (stageIndex >= STAGES.length - 1) return;

    setScrollAttempt((prev) => {
      const nextAttempt = prev + 1;
      if (nextAttempt >= 2) {
        if (scrollAttemptTimeoutRef.current) {
          clearTimeout(scrollAttemptTimeoutRef.current);
        }
        setTimeout(() => {
          advanceStage();
        }, 80);
        return 0;
      }

      if (scrollAttemptTimeoutRef.current) {
        clearTimeout(scrollAttemptTimeoutRef.current);
      }
      scrollAttemptTimeoutRef.current = setTimeout(() => {
        setScrollAttempt(0);
      }, 1400);

      return nextAttempt;
    });
  }, [advanceStage, stageIndex]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (document.querySelector('dialog[open], [role="dialog"]')) return;
      if (e.deltaY <= 25) return;

      const mainContent = document.getElementById('main-content');
      let isAtBottom = false;

      if (mainContent && mainContent.scrollHeight > mainContent.clientHeight) {
        const threshold = 40;
        isAtBottom =
          mainContent.scrollTop + mainContent.clientHeight >=
          mainContent.scrollHeight - threshold;
      } else {
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY || window.pageYOffset;
        const totalHeight = document.documentElement.scrollHeight;
        isAtBottom = windowHeight + scrollY >= totalHeight - 60;
      }

      if (isAtBottom && stageIndex < STAGES.length - 1) {
        registerScrollDownAttempt();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (document.querySelector('dialog[open], [role="dialog"]')) return;
      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartYRef.current - touchEndY;

      if (diff > 50) {
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY || window.pageYOffset;
        const totalHeight = document.documentElement.scrollHeight;
        const isAtBottom = windowHeight + scrollY >= totalHeight - 80;

        if (isAtBottom && stageIndex < STAGES.length - 1) {
          registerScrollDownAttempt();
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      if (scrollAttemptTimeoutRef.current) {
        clearTimeout(scrollAttemptTimeoutRef.current);
      }
    };
  }, [registerScrollDownAttempt, stageIndex]);

  const handleOpenModal = (
    achievement: Achievement,
    triggerRef: React.RefObject<HTMLButtonElement | null>
  ) => {
    activeTriggerRef.current = triggerRef.current;
    setSelectedVolunteering(null);
    setSelectedAchievement(achievement);
    setIsModalOpen(true);
  };

  const handleOpenVolunteeringModal = (
    item: VolunteeringItem,
    triggerRef: React.RefObject<HTMLButtonElement | null>
  ) => {
    activeTriggerRef.current = triggerRef.current;
    setSelectedAchievement(null);
    setSelectedVolunteering(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const stageTabs = [
    {
      id: 'achievements' as MilestoneStage,
      labelKey: 'achievements.tab.achievements',
      count: achievementList.length,
      icon: <Trophy className="w-4 h-4" />,
    },
    {
      id: 'programs_certs' as MilestoneStage,
      labelKey: 'achievements.tab.programs',
      count: programList.length,
      icon: <GraduationCap className="w-4 h-4" />,
    },
    {
      id: 'volunteering' as MilestoneStage,
      labelKey: 'achievements.tab.volunteering',
      count: volunteeringItems.length,
      icon: <HeartHandshake className="w-4 h-4" />,
    },
  ];

  const slideVariants: Variants = {
    enter: (dir: number) => {
      if (reducedMotion) return { opacity: 0 };
      return {
        opacity: 0,
        x: dir * (isRTL ? -36 : 36),
        y: 12,
      };
    },
    center: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: (dir: number) => {
      if (reducedMotion) return { opacity: 0, transition: { duration: 0.15 } };
      return {
        opacity: 0,
        x: -dir * (isRTL ? -36 : 36),
        y: -12,
        transition: {
          duration: 0.22,
          ease: [0.22, 1, 0.36, 1],
        },
      };
    },
  };

  return (
    <section
      ref={sectionRef}
      id="achievements"
      aria-labelledby="achievements-heading"
      className="py-16 md:py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <Reveal>
        <SectionHeader
          eyebrow={t(ui['achievements.eyebrow'])}
          title={t(ui['achievements.title'])}
        />
      </Reveal>

      <div className="flex justify-center mb-10 sm:mb-12">
        <div className="inline-flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-2xl bg-card border border-border backdrop-blur-glass shadow-card">
          {stageTabs.map((tab) => {
            const isActive = activeStage === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => goToStage(tab.id)}
                className={`relative flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  isActive ? 'text-white' : 'text-text-muted hover:text-text'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeMilestoneStage"
                    className="absolute inset-0 bg-accent rounded-xl shadow-md"
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 32,
                    }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {tab.icon}
                  <span>{t(ui[tab.labelKey])}</span>
                  <span
                    className={`text-[11px] font-mono px-1.5 py-0.5 rounded-md ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-surface border border-border text-text-muted'
                    }`}
                  >
                    {tab.count}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait" custom={direction}>
        {activeStage === 'achievements' && (
          <motion.div
            key="stage-achievements"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {achievementList.map((item) => (
                <AchievementCard
                  key={item.id}
                  achievement={item}
                  onSelect={handleOpenModal}
                />
              ))}
            </div>

            <StageTransitionBridge
              targetTitle={t(ui['achievements.tab.programs'])}
              targetIcon={<GraduationCap className="w-5 h-5" />}
              direction="down"
              onAdvance={advanceStage}
              scrollAttempt={scrollAttempt}
            />
          </motion.div>
        )}

        {activeStage === 'programs_certs' && (
          <motion.div
            key="stage-programs"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full"
          >
            <StageTransitionBridge
              targetTitle={t(ui['achievements.tab.achievements'])}
              targetIcon={<Trophy className="w-5 h-5" />}
              direction="up"
              onAdvance={previousStage}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-7">
              {programList.map((item) => (
                <AchievementCard
                  key={item.id}
                  achievement={item}
                  onSelect={handleOpenModal}
                />
              ))}
            </div>

            <StageTransitionBridge
              targetTitle={t(ui['achievements.tab.volunteering'])}
              targetIcon={<HeartHandshake className="w-5 h-5" />}
              direction="down"
              onAdvance={advanceStage}
              scrollAttempt={scrollAttempt}
            />
          </motion.div>
        )}

        {activeStage === 'volunteering' && (
          <motion.div
            key="stage-volunteering"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full"
          >
            <StageTransitionBridge
              targetTitle={t(ui['achievements.tab.programs'])}
              targetIcon={<GraduationCap className="w-5 h-5" />}
              direction="up"
              onAdvance={previousStage}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {volunteeringItems.map((vol) => (
                <VolunteeringCard
                  key={vol.id}
                  item={vol}
                  onSelect={handleOpenVolunteeringModal}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AchievementModal
        achievement={selectedAchievement}
        volunteering={selectedVolunteering}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        triggerRef={activeTriggerRef}
      />
    </section>
  );
}
