'use client';

import React from 'react';
import Image from 'next/image';
import { motion, type Variants } from 'motion/react';
import { CUBIC_EASE } from '@/lib/motion';
import { profile } from '@/content/profile';
import { site } from '@/content/site';
import { ui } from '@/content/ui';
import { useLang } from '@/lib/i18n';
import { useReducedMotion } from '@/lib/media';
import { Button } from '@/components/ui/Button';
import { SocialIcons } from '@/components/ui/SocialIcons';
import { ArrowUpRight, Download, Mail } from 'lucide-react';

export function HeroSection() {
  const { lang, t } = useLang();
  const reducedMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reducedMotion ? 0 : 0.08,
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

  return (
    <section
      id="home"
      aria-labelledby="hero-name"
      className="relative min-h-[calc(100vh-140px)] flex flex-col items-center justify-center pt-4 pb-12 md:py-12"
    >
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center justify-center text-center w-full"
        >
          <motion.div
            variants={itemVariants}
            className="hidden md:flex items-center justify-center relative w-full"
          >
            <div className="flex-1 flex flex-col items-end text-end z-0 pe-2 lg:pe-4">
              <span className="font-handwriting text-accent-text dark:text-accent text-2xl lg:text-3xl block transform -rotate-3 mb-1 select-none">
                {t(profile.greeting)}
              </span>
              <h1
                id="hero-name"
                className="font-display font-black text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-tight text-text uppercase leading-none select-none"
              >
                {profile.heroName.line1[lang]}
              </h1>
            </div>

            <div className="relative z-10 shrink-0 w-64 md:w-72 lg:w-80 xl:w-96 h-80 md:h-[400px] lg:h-[450px] -mx-6 md:-mx-8 lg:-mx-12">
              <div className="absolute inset-0 bg-accent/25 dark:bg-accent/35 blur-3xl rounded-full scale-110 pointer-events-none" />
              <div className="relative w-full h-full [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)]">
                <Image
                  src="/images/islam.png"
                  alt={t(profile.fullName)}
                  fill
                  priority
                  sizes="(min-width: 1024px) 384px, 320px"
                  className="object-contain object-bottom drop-shadow-[0_20px_35px_rgba(0,0,0,0.5)]"
                />
              </div>
            </div>

            <div className="flex-1 flex flex-col items-start text-start z-0 ps-2 lg:ps-4">
              <div className="h-7 lg:h-9 mb-1" aria-hidden="true" />
              <span className="font-display font-black text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-tight text-text uppercase leading-none select-none">
                {profile.heroName.line2[lang]}
              </span>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex md:hidden flex-col items-center justify-center relative w-full pt-2 pb-2"
          >
            <div className="relative w-64 h-80 sm:w-72 sm:h-92 flex items-center justify-center">
              <div className="absolute inset-0 bg-accent/25 dark:bg-accent/35 blur-3xl rounded-full scale-110 pointer-events-none" />

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

              <div className="relative z-10 w-56 h-72 sm:w-64 sm:h-80 [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)]">
                <Image
                  src="/images/islam.png"
                  alt={t(profile.fullName)}
                  fill
                  priority
                  sizes="288px"
                  className="object-contain object-bottom drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]"
                />
              </div>
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
              href={site.cvUrl}
              external
              variant="secondary"
              className="w-full sm:w-auto px-7 py-3 rounded-full border border-border/80 bg-card/40 hover:bg-card/80"
              icon={<Download className="w-4 h-4" />}
            >
              {t(ui['cta.downloadCv'])}
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
            className="mt-6 md:mt-0 flex justify-center md:absolute md:bottom-4 md:start-8 z-30"
          >
            <SocialIcons rounded="full" size="md" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
