'use client';

import React, { useState } from 'react';
import { motion, type Variants } from 'motion/react';
import { skills } from '@/content/skills';
import { ui } from '@/content/ui';
import { useLang } from '@/lib/i18n';
import { useReducedMotion } from '@/lib/media';
import { TechLogo } from '@/components/ui/TechLogo';
import { Reveal } from '@/components/ui/Reveal';
import type { Skill, SkillCategory } from '@/types';

const CATEGORIES: { id: SkillCategory; labelKey: string }[] = [
  { id: 'backend', labelKey: 'skills.category.backend' },
  { id: 'frontend', labelKey: 'skills.category.frontend' },
  { id: 'ai', labelKey: 'skills.category.ai' },
  { id: 'tools', labelKey: 'skills.category.tools' },
];

function SkillTile({ skill }: { skill: Skill }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      tabIndex={0}
      role="img"
      aria-label={skill.name}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      className="group relative flex items-center justify-center h-24 sm:h-28 md:h-32 border border-dashed border-border/80 dark:border-border/60 -ms-px -mt-px bg-card/10 hover:bg-card/40 transition-colors duration-200 cursor-pointer focus-visible:outline-none"
    >
      <div className="absolute -inset-[1px] border border-solid border-text dark:border-white shadow-[0_0_20px_rgba(255,255,255,0.12)] opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 pointer-events-none transition-opacity duration-200 z-10" />

      <span className="absolute -top-1 -start-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-text/40 dark:bg-white/40 border border-bg group-hover:bg-white group-hover:scale-125 group-hover:shadow-[0_0_8px_white] transition-all duration-200 pointer-events-none z-20" />
      <span className="absolute -top-1 -end-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-text/40 dark:bg-white/40 border border-bg group-hover:bg-white group-hover:scale-125 group-hover:shadow-[0_0_8px_white] transition-all duration-200 pointer-events-none z-20" />
      <span className="absolute -bottom-1 -start-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-text/40 dark:bg-white/40 border border-bg group-hover:bg-white group-hover:scale-125 group-hover:shadow-[0_0_8px_white] transition-all duration-200 pointer-events-none z-20" />
      <span className="absolute -bottom-1 -end-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-text/40 dark:bg-white/40 border border-bg group-hover:bg-white group-hover:scale-125 group-hover:shadow-[0_0_8px_white] transition-all duration-200 pointer-events-none z-20" />

      <TechLogo
        slug={skill.id}
        size="xl"
        isHovered={isHovered}
        className="pointer-events-none text-text-muted/60 transition-transform duration-200 group-hover:scale-110"
      />

      <span className="absolute -top-8 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-all duration-200 pointer-events-none text-xs font-semibold px-2.5 py-1 rounded-md bg-card border border-border shadow-lg text-text whitespace-nowrap z-30 transform -translate-y-1 group-hover:translate-y-0">
        {skill.name}
      </span>
    </div>
  );
}

function EmptyTile() {
  return (
    <div
      aria-hidden="true"
      className="hidden lg:flex relative items-center justify-center h-24 sm:h-28 md:h-32 border border-dashed border-border/40 dark:border-border/30 -ms-px -mt-px pointer-events-none select-none opacity-40"
    >
      <span className="absolute -top-1 -start-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-text/20 dark:bg-white/20 border border-bg" />
      <span className="absolute -top-1 -end-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-text/20 dark:bg-white/20 border border-bg" />
      <span className="absolute -bottom-1 -start-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-text/20 dark:bg-white/20 border border-bg" />
      <span className="absolute -bottom-1 -end-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-text/20 dark:bg-white/20 border border-bg" />
    </div>
  );
}

export function SkillsSection() {
  const { t } = useLang();
  const reducedMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reducedMotion ? 0 : 0.03,
      },
    },
  };

  const tileVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: reducedMotion ? 1 : 0.95,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        damping: 24,
        stiffness: 300,
      },
    },
  };

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="py-16 md:py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <Reveal>
        <div className="text-center mb-14 sm:mb-20">
          <div className="inline-block transform -rotate-2 mb-1">
            <span className="font-handwriting text-accent-text dark:text-accent text-2xl sm:text-3xl tracking-wide select-none">
              {t(ui['skills.eyebrow'])}
            </span>
          </div>
          <h2
            id="skills-heading"
            className="text-5xl sm:text-6xl md:text-7xl font-display font-black text-text tracking-tight uppercase"
          >
            {t(ui['skills.title'])}
          </h2>
        </div>
      </Reveal>

      <div className="space-y-12 sm:space-y-16">
        {CATEGORIES.map((category, catIdx) => {
          const categorySkills = skills.filter(
            (s) => s.category === category.id && s.show !== false
          );
          const emptyCount = Math.max(0, 7 - categorySkills.length);

          return (
            <Reveal key={category.id} delay={catIdx * 0.08}>
              <div>
                <div className="flex items-center gap-3 mb-7">
                  <span className="w-2 h-2 rounded-full bg-accent" aria-hidden="true" />
                  <h3 className="text-sm sm:text-base font-bold font-display uppercase tracking-wider text-text">
                    {t(ui[category.labelKey])}
                  </h3>
                  <div className="h-px flex-1 border-t border-dashed border-border/80" />
                  <span className="text-xs font-mono text-text-muted/70">
                    0{categorySkills.length}
                  </span>
                </div>

                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7"
                >
                  {categorySkills.map((skill) => (
                    <motion.div key={skill.id} variants={tileVariants}>
                      <SkillTile skill={skill} />
                    </motion.div>
                  ))}
                  {Array.from({ length: emptyCount }).map((_, i) => (
                    <EmptyTile key={`empty-${category.id}-${i}`} />
                  ))}
                </motion.div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
