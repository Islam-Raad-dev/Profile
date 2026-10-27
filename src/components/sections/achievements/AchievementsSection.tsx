'use client';

import React from 'react';
import type { Achievement } from '@/types';
import { achievements } from '@/content/achievements';
import { ui } from '@/content/ui';
import { useLang } from '@/lib/i18n';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Chip } from '@/components/ui/Chip';
import { Reveal } from '@/components/ui/Reveal';
import { Trophy, GraduationCap, Award, BadgeCheck } from 'lucide-react';

function getAchievementIcon(achievement: Achievement) {
  if (achievement.id === 'napta-award') {
    return <Trophy className="w-5 h-5 text-accent-text" />;
  }
  if (achievement.kind === 'certificate') {
    return <BadgeCheck className="w-5 h-5 text-accent-text" />;
  }
  if (achievement.id === 'sic' || achievement.id === 'gci') {
    return <GraduationCap className="w-5 h-5 text-accent-text" />;
  }
  return <Award className="w-5 h-5 text-accent-text" />;
}

function AchievementCard({ achievement }: { achievement: Achievement }) {
  const { t } = useLang();

  return (
    <div
      id={`achievement-${achievement.id}`}
      className="group relative flex flex-col justify-between p-6 rounded-2xl bg-card border border-border backdrop-blur-glass shadow-card hover:border-accent hover:-translate-y-1 hover:shadow-xl transition-all duration-300 text-start h-full scroll-mt-24 sm:scroll-mt-32 target:ring-2 target:ring-accent target:border-accent"
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-accent-soft border border-[rgba(51,149,255,0.25)] flex items-center justify-center shrink-0">
            {getAchievementIcon(achievement)}
          </div>

          {achievement.status && (
            <Chip variant="accent">
              {t(achievement.status)}
            </Chip>
          )}

          {achievement.note && (
            <Chip variant="default">
              {t(achievement.note)}
            </Chip>
          )}
        </div>

        <h4 className="text-base sm:text-lg font-bold text-text group-hover:text-accent-text transition-colors">
          {t(achievement.title)}
        </h4>

        {achievement.issuer && (
          <p className="text-sm text-text-muted mt-1">
            {t(achievement.issuer)}
          </p>
        )}
      </div>
    </div>
  );
}

export function AchievementsSection() {
  const { t } = useLang();

  const awardsAndPrograms = achievements.filter(
    (a) => a.kind === 'award' || a.kind === 'program'
  );
  const certificates = achievements.filter((a) => a.kind === 'certificate');

  return (
    <section
      id="achievements"
      aria-labelledby="achievements-heading"
      className="py-16 md:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <Reveal>
        <SectionHeader
          eyebrow={t(ui['achievements.eyebrow'])}
          title={t(ui['achievements.title'])}
        />
      </Reveal>

      <div className="space-y-12">
        <div>
          <Reveal delay={0.1}>
            <h3 className="text-lg sm:text-xl font-bold font-display text-text mb-6 text-start flex items-center gap-2">
              <Trophy className="w-5 h-5 text-accent-text" />
              <span>{t(ui['achievements.awards'])}</span>
            </h3>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {awardsAndPrograms.map((item, index) => (
              <Reveal key={item.id} delay={0.15 + index * 0.05}>
                <AchievementCard achievement={item} />
              </Reveal>
            ))}
          </div>
        </div>

        <div>
          <Reveal delay={0.2}>
            <h3 className="text-lg sm:text-xl font-bold font-display text-text mb-6 text-start flex items-center gap-2">
              <BadgeCheck className="w-5 h-5 text-accent-text" />
              <span>{t(ui['achievements.certs'])}</span>
            </h3>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {certificates.map((item, index) => (
              <Reveal key={item.id} delay={0.25 + index * 0.05}>
                <AchievementCard achievement={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
