'use client';

import React, { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import type { Project } from '@/types';
import { projects } from '@/content/projects';
import { site } from '@/content/site';
import { ui } from '@/content/ui';
import { useLang } from '@/lib/i18n';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ProjectCard } from './ProjectCard';
import { Reveal } from '@/components/ui/Reveal';
import { Sparkles } from 'lucide-react';

const ProjectModal = dynamic(
  () => import('./ProjectModal').then((mod) => mod.ProjectModal),
  { ssr: false }
);

interface ProjectsSectionProps {
  customProjects?: Project[];
}

export function ProjectsSection({ customProjects }: ProjectsSectionProps) {
  const { t } = useLang();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const activeTriggerRef = useRef<HTMLElement | null>(null);

  const list = customProjects || projects;

  const sortedProjects = [...list].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  const handleOpenModal = (
    project: Project,
    triggerRef: React.RefObject<HTMLButtonElement | null>
  ) => {
    activeTriggerRef.current = triggerRef.current;
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="py-16 md:py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <Reveal>
        <SectionHeader
          eyebrow={t(ui['projects.eyebrow'])}
          title={t(ui['projects.title'])}
        />
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {sortedProjects.map((project, index) => (
          <Reveal key={project.id} delay={index * 0.1}>
            <ProjectCard project={project} onSelect={handleOpenModal} />
          </Reveal>
        ))}

        {site.showComingSoon && (
          <Reveal delay={sortedProjects.length * 0.1}>
            <div className="h-full min-h-[300px] flex flex-col items-center justify-center p-8 rounded-2xl border border-dashed border-border bg-surface/50 text-center">
              <Sparkles className="w-8 h-8 text-accent-text mb-3 opacity-60" />
              <p className="text-base font-medium text-text-muted">
                {t(ui.comingSoon)}
              </p>
            </div>
          </Reveal>
        )}
      </div>

      {isModalOpen && (
        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          triggerRef={activeTriggerRef}
        />
      )}
    </section>
  );
}
