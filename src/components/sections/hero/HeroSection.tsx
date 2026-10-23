'use client';

import React, { useState } from 'react';
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
import { ArrowDown, Download, Mail } from 'lucide-react';

export function HeroSection() {
  const { lang, t } = useLang();
  const reducedMotion = useReducedMotion();
  const [photoError, setPhotoError] = useState(false);

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
      className="relative min-h-[calc(100vh-100px)] flex items-center justify-center py-12 md:py-20"
    >
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center"
        >
          {/* Mobile Photo (Rendered first on small screens) */}
          <motion.div
            variants={itemVariants}
            className="md:hidden flex justify-center w-full"
          >
            <div className="relative w-44 h-56">
              <div className="absolute inset-0 rounded-2xl bg-[image:var(--gradient)] opacity-30 blur-xl scale-95" />
              <div className="relative w-full h-full rounded-2xl border border-border bg-card overflow-hidden shadow-card flex items-center justify-center">
                {!photoError ? (
                  <Image
                    src="/images/islam.png"
                    alt={t(profile.fullName)}
                    fill
                    sizes="176px"
                    priority
                    className="object-cover object-top"
                    onError={() => setPhotoError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-display text-4xl text-accent-text bg-accent-soft">
                    IR
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Text Column */}
          <div className="md:col-span-7 flex flex-col items-start text-start">
            <motion.div variants={itemVariants} className="mb-2">
              <span className="font-handwriting text-accent-text text-xl sm:text-2xl transform -rotate-1 inline-block">
                {t(profile.greeting)}
              </span>
            </motion.div>

            <motion.h1
              id="hero-name"
              variants={itemVariants}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black font-display text-text uppercase tracking-tight leading-[0.95] mb-4"
            >
              <span className="block">{profile.heroName.line1[lang]}</span>
              <span className="block text-accent-text">
                {profile.heroName.line2[lang]}
              </span>
            </motion.h1>

            <motion.div variants={itemVariants} className="mb-3">
              <span className="text-lg sm:text-xl font-semibold text-text">
                {t(profile.role)}
              </span>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-text-muted max-w-xl leading-relaxed mb-6"
            >
              {t(profile.shortBio)}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-3 mb-8"
            >
              <Button href="#projects" variant="primary" icon={<ArrowDown className="w-4 h-4" />}>
                {t(ui['cta.viewProjects'])}
              </Button>
              <Button
                href={site.cvUrl}
                external
                variant="secondary"
                icon={<Download className="w-4 h-4" />}
              >
                {t(ui['cta.downloadCv'])}
              </Button>
              <Button href="#contact" variant="ghost" icon={<Mail className="w-4 h-4" />}>
                {t(ui['cta.contact'])}
              </Button>
            </motion.div>

            <motion.div variants={itemVariants}>
              <SocialIcons />
            </motion.div>
          </div>

          {/* Desktop Photo Column */}
          <motion.div
            variants={itemVariants}
            className="hidden md:flex md:col-span-5 justify-center lg:justify-end"
          >
            <div className="relative w-72 lg:w-80 h-96 lg:h-[420px]">
              <div className="absolute inset-0 rounded-3xl bg-[image:var(--gradient)] opacity-25 blur-2xl scale-95" />
              <div className="relative w-full h-full rounded-3xl border border-border bg-card overflow-hidden shadow-card flex items-center justify-center">
                {!photoError ? (
                  <Image
                    src="/images/islam.png"
                    alt={t(profile.fullName)}
                    fill
                    sizes="(min-width: 1024px) 320px, 288px"
                    priority
                    className="object-cover object-top"
                    onError={() => setPhotoError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-display text-6xl text-accent-text bg-accent-soft">
                    IR
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
