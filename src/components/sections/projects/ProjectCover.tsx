'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import type { Project } from '@/types';
import { TechLogo } from '@/components/ui/TechLogo';
import { useLang } from '@/lib/i18n';

interface ProjectCoverProps {
  project: Project;
  className?: string;
}

export function ProjectCover({ project, className = '' }: ProjectCoverProps) {
  const { t } = useLang();
  const [imageError, setImageError] = useState(false);

  const title = t(project.title);
  const firstLetter = title ? title.charAt(0).toUpperCase() : 'P';
  const hasImage = project.images && project.images.length > 0 && !imageError;

  if (hasImage && project.images) {
    return (
      <div className={`relative aspect-[16/10] w-full overflow-hidden rounded-t-xl bg-surface ${className}`}>
        <Image
          src={project.images[0]}
          alt={title}
          fill
          sizes="(min-width: 1024px) 500px, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          onError={() => setImageError(true)}
        />
      </div>
    );
  }

  return (
    <div
      className={`relative aspect-[16/10] w-full overflow-hidden rounded-t-xl bg-surface border-b border-border flex items-center justify-center p-6 ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent/15 via-accent-2/10 to-transparent" />
      <div className="absolute -bottom-8 -end-8 w-36 h-36 rounded-full bg-accent/20 blur-2xl" />

      <span className="font-display text-8xl sm:text-9xl font-black text-text/10 select-none pointer-events-none transform -rotate-6 transition-transform duration-300 group-hover:scale-110">
        {firstLetter}
      </span>

      <div className="absolute bottom-3 end-3 flex items-center gap-1.5 p-1.5 rounded-lg bg-card/80 backdrop-blur-md border border-border/80">
        {project.stack.slice(0, 4).map((tech) => (
          <TechLogo key={tech} slug={tech} size="sm" />
        ))}
      </div>
    </div>
  );
}
