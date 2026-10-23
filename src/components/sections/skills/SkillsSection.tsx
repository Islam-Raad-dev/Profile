'use client';

import React from 'react';
import { motion, type Variants } from 'motion/react';
import { skills } from '@/content/skills';
import { ui } from '@/content/ui';
import { useLang } from '@/lib/i18n';
import { useReducedMotion, useMediaQuery, PHONE_QUERY } from '@/lib/media';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { TechLogo } from '@/components/ui/TechLogo';
import { Reveal } from '@/components/ui/Reveal';
import type { Skill } from '@/types';

function SkillTile({ skill, isFeatured }: { skill: Skill; isFeatured: boolean }) {
  return (
    <div
      tabIndex={0}
      role="img"
      aria-label={skill.name}
      className={`group relative flex flex-col items-center justify-center rounded-2xl bg-card border border-border backdrop-blur-glass shadow-card hover:border-accent hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(51,149,255,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-all duration-200 cursor-pointer ${
        isFeatured ? 'w-24 h-24 sm:w-28 sm:h-28' : 'w-[72px] h-[72px] sm:w-20 sm:h-20'
      }`}
    >
      <TechLogo
        slug={skill.id}
        size={isFeatured ? 'lg' : 'md'}
        className="pointer-events-none"
      />

      <span className="absolute -top-9 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-200 pointer-events-none text-xs font-semibold px-2.5 py-1 rounded-md bg-card/95 border border-border shadow-lg text-text whitespace-nowrap z-30">
        {skill.name}
      </span>
    </div>
  );
}

export function SkillsSection() {
  const { t } = useLang();
  const reducedMotion = useReducedMotion();
  const isPhone = useMediaQuery(PHONE_QUERY);

  const featuredSkills = skills.filter((s) => s.featured);
  const otherSkills = skills.filter((s) => !s.featured && s.show !== false);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reducedMotion || isPhone ? 0 : 0.04,
      },
    },
  };

  const tileVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: reducedMotion ? 1 : 0.9,
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
      className="py-16 md:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <Reveal>
        <SectionHeader
          eyebrow={t(ui['skills.eyebrow'])}
          title={t(ui['skills.title'])}
        />
      </Reveal>

      <div className="space-y-10">
        <Reveal delay={0.1}>
          <div>
            <div className="flex flex-wrap gap-4 sm:gap-6 justify-center sm:justify-start">
              {featuredSkills.map((skill) => (
                <SkillTile key={skill.id} skill={skill} isFeatured={true} />
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="flex flex-wrap gap-3 sm:gap-4 justify-center sm:justify-start pt-2"
          >
            {otherSkills.map((skill) => (
              <motion.div key={skill.id} variants={tileVariants}>
                <SkillTile skill={skill} isFeatured={false} />
              </motion.div>
            ))}
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
