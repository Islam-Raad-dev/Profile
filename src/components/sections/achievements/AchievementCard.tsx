'use client';

import React, { useRef } from 'react';
import type { Achievement } from '@/types';
import { useLang } from '@/lib/i18n';
import { ui } from '@/content/ui';
import { Chip } from '@/components/ui/Chip';
import { TechLogo } from '@/components/ui/TechLogo';
import { MilestoneCoverArt } from './MilestoneCoverArt';
import {
  Trophy,
  GraduationCap,
  Award,
  BadgeCheck,
  CodeXml,
  Sparkles,
  Star,
  Calendar,
  ArrowUpRight,
} from 'lucide-react';

interface AchievementCardProps {
  achievement: Achievement;
  onSelect: (achievement: Achievement, triggerRef: React.RefObject<HTMLButtonElement | null>) => void;
}

function getIconByKind(achievement: Achievement) {
  if (achievement.kind === 'award') {
    return <Trophy className="w-4 h-4 text-accent-text" />;
  }
  if (achievement.kind === 'honor') {
    return <Sparkles className="w-4 h-4 text-accent-text" />;
  }
  if (achievement.kind === 'course') {
    return <CodeXml className="w-4 h-4 text-accent-text" />;
  }
  if (achievement.kind === 'certificate') {
    return <BadgeCheck className="w-4 h-4 text-accent-text" />;
  }
  if (achievement.id === 'sic' || achievement.id === 'gci') {
    return <GraduationCap className="w-4 h-4 text-accent-text" />;
  }
  return <Award className="w-4 h-4 text-accent-text" />;
}

function AchievementCardComponent({ achievement, onSelect }: AchievementCardProps) {
  const { t } = useLang();
  const cardRef = useRef<HTMLButtonElement>(null);

  const starCount = achievement.rating || 5;
  const maxTags = 3;
  const visibleTags = achievement.synergyStack?.slice(0, maxTags) || [];
  const remainingTags = (achievement.synergyStack?.length || 0) - maxTags;

  return (
    <button
      id={`achievement-${achievement.id}`}
      ref={cardRef}
      type="button"
      onClick={() => onSelect(achievement, cardRef)}
      className="group relative w-full flex flex-col justify-between rounded-2xl bg-card border border-border backdrop-blur-glass shadow-card hover:border-accent hover:-translate-y-1 hover:shadow-xl transition-all duration-300 text-start h-full cursor-pointer overflow-hidden scroll-mt-24 sm:scroll-mt-32 target:ring-2 target:ring-accent target:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
    >
      <MilestoneCoverArt id={achievement.id} size="card" />

      <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 w-full -mt-5 z-10">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-accent-soft border border-[rgba(51,149,255,0.25)] flex items-center justify-center shrink-0 shadow-sm">
                {getIconByKind(achievement)}
              </div>

              {achievement.period && (
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-text-muted bg-surface px-2 py-0.5 rounded-md border border-border/70">
                  <Calendar className="w-3 h-3 text-accent-text" />
                  <span>
                    {t(achievement.period.start)}
                    {achievement.period.end
                      ? ` – ${t(achievement.period.end)}`
                      : achievement.period.isOngoing
                      ? ` – ${t(ui['achievements.card.ongoing'])}`
                      : ''}
                  </span>
                </div>
              )}
            </div>

            <div
              className="flex items-center gap-0.5 bg-surface px-1.5 py-0.5 rounded-md border border-border/60"
              aria-label={`Rating: ${starCount} out of 5 stars`}
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < starCount
                      ? 'text-accent fill-accent filter drop-shadow-[0_0_3px_rgba(51,149,255,0.4)]'
                      : 'text-text-muted/30'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
            {achievement.badge && (
              <Chip variant="accent">
                {t(achievement.badge)}
              </Chip>
            )}

            {achievement.note && (
              <Chip variant="default">
                {t(achievement.note)}
              </Chip>
            )}
          </div>

          <h3 className="text-base sm:text-lg font-bold font-display text-text group-hover:text-accent-text transition-colors mt-1">
            {t(achievement.title)}
          </h3>

          {achievement.issuer && (
            <p className="text-xs sm:text-sm font-medium text-text-muted mt-0.5">
              {t(achievement.issuer)}
            </p>
          )}

          {achievement.overview && (
            <p className="text-xs text-text-muted line-clamp-2 leading-relaxed mt-2.5">
              {t(achievement.overview)}
            </p>
          )}
        </div>

        <div className="w-full pt-3.5 mt-4 border-t border-border/80 flex items-center justify-between gap-2">
          {visibleTags.length > 0 ? (
            <div className="flex items-center gap-1.5">
              {visibleTags.map((tech) => (
                <div
                  key={tech}
                  className="p-1 rounded-md bg-surface border border-border/60"
                  title={tech}
                >
                  <TechLogo slug={tech} size="sm" />
                </div>
              ))}
              {remainingTags > 0 && (
                <span className="text-[10px] font-mono font-semibold text-text-muted px-1.5 py-0.5 rounded bg-surface border border-border/60">
                  +{remainingTags}
                </span>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-[11px] text-text-muted">
              <Sparkles className="w-3 h-3 text-accent-text" />
              <span>{t(ui['achievements.modal.verifySeal'])}</span>
            </div>
          )}

          <div className="inline-flex items-center gap-1 text-xs font-semibold text-accent-text group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform duration-200">
            <span>{t(ui['achievements.card.exploreDossier'])}</span>
            <ArrowUpRight className="w-3 h-3 rtl:rotate-[-90deg]" />
          </div>
        </div>
      </div>
    </button>
  );
}

export const AchievementCard = React.memo(AchievementCardComponent);
