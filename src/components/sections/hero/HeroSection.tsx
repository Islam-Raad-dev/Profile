'use client';

import React, { useSyncExternalStore } from 'react';
import { motion, type Variants } from 'motion/react';
import { CUBIC_EASE } from '@/lib/motion';
import { profile } from '@/content/profile';
import { ui } from '@/content/ui';
import { useLang } from '@/lib/i18n';
import { useReducedMotion } from '@/lib/media';
import { Button } from '@/components/ui/Button';
import { SocialIcons } from '@/components/ui/SocialIcons';
import { ArrowUpRight, Mail, FileText } from 'lucide-react';
import { openDigitalCv } from '@/lib/cvNavigation';
import { HeroBackground } from './HeroBackground';
import { HeroPhoto } from './HeroPhoto';

const emptySubscribe = () => () => {};

export function HeroSection() {
  const { lang, t } = useLang();
  const isRTL = lang === 'ar';
  const reducedMotion = useReducedMotion();

  const isFirstVisit = useSyncExternalStore(
    emptySubscribe,
    () => {
      if (typeof window === 'undefined') return true;
      const visited = sessionStorage.getItem('hero_visited');
      if (visited) return false;
      sessionStorage.setItem('hero_visited', 'true');
      return true;
    },
    () => true
  );

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reducedMotion ? 0 : 0.08,
        delayChildren: isFirstVisit && !reducedMotion ? 0.15 : 0,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: reducedMotion ? 0 : 16,
      filter: reducedMotion ? 'none' : 'blur(8px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'none',
      transition: {
        duration: 0.45,
        ease: CUBIC_EASE,
      },
    },
  };

  const nameLeftVariants: Variants = {
    hidden: {
      opacity: 0,
      x: reducedMotion || !isFirstVisit ? 0 : isRTL ? 28 : -28,
      filter: reducedMotion ? 'none' : 'blur(6px)',
    },
    visible: {
      opacity: 1,
      x: 0,
      filter: 'none',
      transition: {
        duration: 0.6,
        delay: isFirstVisit && !reducedMotion ? 0.25 : 0.05,
        ease: CUBIC_EASE,
      },
    },
  };

  const nameRightVariants: Variants = {
    hidden: {
      opacity: 0,
      x: reducedMotion || !isFirstVisit ? 0 : isRTL ? -28 : 28,
      filter: reducedMotion ? 'none' : 'blur(6px)',
    },
    visible: {
      opacity: 1,
      x: 0,
      filter: 'none',
      transition: {
        duration: 0.6,
        delay: isFirstVisit && !reducedMotion ? 0.35 : 0.08,
        ease: CUBIC_EASE,
      },
    },
  };

  return (
    <section
      id="home"
      aria-labelledby="hero-name"
      className="relative min-h-screen flex flex-col items-center justify-center pt-6 pb-28 md:pb-32 isolate overflow-hidden"
    >
      <HeroBackground isFirstVisit={isFirstVisit} />

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center justify-center text-center w-full"
        >
          <div className="hidden md:flex items-center justify-center relative w-full">
            <motion.div
              variants={nameLeftVariants}
              className="flex-1 flex flex-col items-end text-end z-0 pe-2 lg:pe-4"
            >
              <span className="font-handwriting text-accent-text dark:text-accent text-2xl lg:text-3xl block transform -rotate-3 mb-1 select-none">
                {t(profile.greeting)}
              </span>
              <h1
                id="hero-name"
                className="font-display font-black text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-tight text-text uppercase leading-none select-none"
              >
                {profile.heroName.line1[lang]}
              </h1>
            </motion.div>

            <HeroPhoto alt={t(profile.fullName)} isFirstVisit={isFirstVisit} />

            <motion.div
              variants={nameRightVariants}
              className="flex-1 flex flex-col items-start text-start z-0 ps-2 lg:ps-4"
            >
              <div className="h-7 lg:h-9 mb-1" aria-hidden="true" />
              <span className="font-display font-black text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-tight text-text uppercase leading-none select-none">
                {profile.heroName.line2[lang]}
              </span>
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            className="flex md:hidden flex-col items-center justify-center relative w-full pt-2 pb-2"
          >
            <div className="relative w-64 h-80 sm:w-72 sm:h-92 flex items-center justify-center">
              <div className="absolute inset-0 flex flex-col justify-between py-4 pointer-events-none z-0">
                <div className="text-start ps-2">
                  <span className="font-handwriting text-accent-text dark:text-accent text-xl block transform -rotate-3 mb-0.5 select-none">
                    {t(profile.greeting)}
                  </span>
                  <span className="font-display font-black text-5xl sm:text-6xl tracking-tight text-text uppercase leading-none select-none">
                    {profile.heroName.line1[lang]}
                  </span>
                </div>
                <div className="text-end pe-2">
                  <span className="font-display font-black text-5xl sm:text-6xl tracking-tight text-text uppercase leading-none select-none">
                    {profile.heroName.line2[lang]}
                  </span>
                </div>
              </div>

              <HeroPhoto
                alt={t(profile.fullName)}
                isFirstVisit={isFirstVisit}
                className="relative z-10 w-56 h-72 sm:w-64 sm:h-80 select-none group"
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-6 sm:mt-8">
            <h2 className="font-display font-bold text-accent-text dark:text-accent text-xl sm:text-2xl md:text-3xl tracking-wider uppercase">
              {t(profile.role)}
            </h2>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-text-muted text-sm sm:text-base max-w-xl mx-auto text-center mt-2.5 sm:mt-3 leading-relaxed px-4"
          >
            {t(profile.shortBio)}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full max-w-md sm:max-w-none px-6 sm:px-0"
          >
            <Button
              href="#projects"
              variant="primary"
              className="w-full sm:w-auto px-7 py-3 rounded-full shadow-[0_0_25px_rgba(51,149,255,0.4)]"
              icon={<ArrowUpRight className="w-4 h-4 rtl:-scale-x-100" />}
            >
              {t(ui['cta.viewProjects'])}
            </Button>
            <Button
              type="button"
              onClick={openDigitalCv}
              variant="secondary"
              className="w-full sm:w-auto px-7 py-3 rounded-full border border-border/80 bg-card/40 hover:bg-card/80 cursor-pointer"
              icon={<FileText className="w-4 h-4" />}
            >
              {t(ui['cta.viewCv'])}
            </Button>
            <Button
              href="#contact"
              variant="ghost"
              className="w-auto py-2 text-text-muted hover:text-text"
              icon={<Mail className="w-4 h-4" />}
            >
              {t(ui['cta.contact'])}
            </Button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-6 md:mt-0 flex justify-center md:absolute md:bottom-8 md:start-8 z-30"
          >
            <SocialIcons rounded="full" size="md" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
