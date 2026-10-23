'use client';

import React, { useRef } from 'react';
import type { Project } from '@/types';
import { useLang } from '@/lib/i18n';
import { ui } from '@/content/ui';
import { ProjectCover } from './ProjectCover';
import { TechLogo } from '@/components/ui/TechLogo';
import { Chip } from '@/components/ui/Chip';
import { Star, Trophy } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project, triggerRef: React.RefObject<HTMLButtonElement | null>) => void;
}

export function ProjectCard({ project, onSelect }: ProjectCardProps) {
  const { t } = useLang();
  const cardRef = useRef<HTMLButtonElement>(null);

  const maxVisibleTech = 5;
  const visibleTech = project.stack.slice(0, maxVisibleTech);
  const remainingCount = project.stack.length - maxVisibleTech;

  return (
    <button
      ref={cardRef}
      type="button"
      onClick={() => onSelect(project, cardRef)}
      className="group relative w-full flex flex-col text-start rounded-2xl border border-border bg-card backdrop-blur-glass shadow-card hover:shadow-xl hover:border-accent hover:-translate-y-1 transition-all duration-200 overflow-hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
    >
      {/* Featured Star Badge */}
      {project.featured && (
        <div className="absolute top-3 start-3 z-10 flex items-center gap-1 px-2.5 py-1 rounded-full bg-accent-soft/90 backdrop-blur-md border border-[rgba(51,149,255,0.3)] text-accent-text text-xs font-semibold shadow-sm">
          <Star className="w-3 h-3 fill-current" />
          <span>{t(ui['project.featured'])}</span>
        </div>
      )}

      {/* Cover Image or Fallback */}
      <ProjectCover project={project} />

      {/* Card Content */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between w-full">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <h3 className="text-xl font-bold font-display text-text group-hover:text-accent-text transition-colors">
              {t(project.title)}
            </h3>
            {project.badge && (
              <Chip variant="badge" icon={<Trophy className="w-3 h-3 text-accent-text" />}>
                {t(project.badge)}
              </Chip>
            )}
          </div>

          <p className="text-sm text-text-muted line-clamp-2 leading-relaxed mb-4">
            {t(project.summary)}
          </p>
        </div>

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-border/80">
          {visibleTech.map((tech) => (
            <div
              key={tech}
              className="p-1 rounded-lg bg-surface border border-border/60 hover:border-accent transition-colors"
            >
              <TechLogo slug={tech} size="sm" />
            </div>
          ))}
          {remainingCount > 0 && (
            <span className="text-[11px] font-semibold text-text-muted px-2 py-0.5 rounded-lg bg-surface border border-border/60">
              +{remainingCount}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
