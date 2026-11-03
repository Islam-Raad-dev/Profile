'use client';

import React, { useRef } from 'react';
import type { VolunteeringItem } from '@/types';
import { useLang } from '@/lib/i18n';
import { ui } from '@/content/ui';
import { HeartHandshake, Calendar, MapPin, Sparkles, ArrowUpRight } from 'lucide-react';
import { Chip } from '@/components/ui/Chip';
import { MilestoneCoverArt } from './MilestoneCoverArt';

interface VolunteeringCardProps {
  item: VolunteeringItem;
  onSelect?: (item: VolunteeringItem, triggerRef: React.RefObject<HTMLButtonElement | null>) => void;
}

function VolunteeringCardComponent({ item, onSelect }: VolunteeringCardProps) {
  const { t } = useLang();
  const cardRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    if (onSelect) {
      onSelect(item, cardRef);
    }
  };

  return (
    <button
      id={`volunteering-${item.id}`}
      ref={cardRef}
      type="button"
      onClick={handleClick}
      className="group relative w-full flex flex-col justify-between rounded-2xl bg-card border border-border backdrop-blur-glass shadow-card hover:border-accent hover:-translate-y-1 hover:shadow-xl transition-all duration-300 text-start h-full cursor-pointer overflow-hidden scroll-mt-24 sm:scroll-mt-32 target:ring-2 target:ring-accent target:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
    >
      <MilestoneCoverArt id={item.id} size="card" />

      <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 w-full -mt-5 z-10">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-lg bg-accent-soft border border-[rgba(51,149,255,0.25)] flex items-center justify-center shrink-0 shadow-sm">
              <HeartHandshake className="w-4 h-4 text-accent-text" />
            </div>

            <div className="flex items-center gap-1.5 text-[11px] font-mono text-text-muted bg-surface px-2 py-0.5 rounded-md border border-border/70">
              <Calendar className="w-3 h-3 text-accent-text" />
              <span>{t(item.period)}</span>
            </div>
          </div>

          {item.highlight && (
            <div className="mb-1.5">
              <Chip variant="badge" icon={<Sparkles className="w-3 h-3 text-accent-text" />}>
                {t(item.highlight)}
              </Chip>
            </div>
          )}

          <h3 className="text-base sm:text-lg font-bold font-display text-text group-hover:text-accent-text transition-colors mt-1">
            {t(item.role)}
          </h3>

          <p className="text-xs sm:text-sm font-medium text-accent-text mt-0.5">
            {t(item.organization)}
          </p>

          <p className="text-xs text-text-muted line-clamp-2 leading-relaxed mt-2.5">
            {t(item.description)}
          </p>
        </div>

        <div className="w-full pt-3.5 mt-4 border-t border-border/80 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-[11px] text-text-muted">
            <MapPin className="w-3.5 h-3.5 text-accent-text" />
            <span>{t(item.location)}</span>
          </div>

          <div className="inline-flex items-center gap-1 text-xs font-semibold text-accent-text group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform duration-200">
            <span>{t(ui['achievements.card.exploreDossier'])}</span>
            <ArrowUpRight className="w-3 h-3 rtl:rotate-[-90deg]" />
          </div>
        </div>
      </div>
    </button>
  );
}

export const VolunteeringCard = React.memo(VolunteeringCardComponent);
