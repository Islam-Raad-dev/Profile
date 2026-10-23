'use client';

import React from 'react';
import { motion } from 'motion/react';
import type { SectionId } from '@/types';
import { site } from '@/content/site';
import { ui } from '@/content/ui';
import { useLang } from '@/lib/i18n';
import {
  House,
  User,
  FolderKanban,
  Wrench,
  Award,
  Mail,
  type LucideIcon,
} from 'lucide-react';

const ICON_MAP: Record<SectionId, LucideIcon> = {
  home: House,
  about: User,
  projects: FolderKanban,
  skills: Wrench,
  achievements: Award,
  contact: Mail,
};

interface NavbarProps {
  activeSection: SectionId;
  onNavigate: (sectionId: SectionId) => void;
}

export function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const { t } = useLang();

  const enabledSections = site.sections.filter((s) => s.enabled);

  return (
    <nav
      aria-label="Main Navigation"
      className="fixed bottom-5 md:bottom-7 left-1/2 -translate-x-1/2 z-40 max-w-[95vw]"
    >
      <div className="flex items-center gap-1 p-1.5 sm:p-2 rounded-full bg-card/85 backdrop-blur-glass border border-border shadow-card">
        {enabledSections.map((sec) => {
          const id = sec.id;
          const Icon = ICON_MAP[id] || House;
          const label = t(ui[`nav.${id}`]);
          const isActive = activeSection === id;

          return (
            <button
              key={id}
              type="button"
              onClick={() => onNavigate(id)}
              aria-label={label}
              aria-current={isActive ? 'page' : undefined}
              className={`relative flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-full min-w-[44px] min-h-[44px] text-xs sm:text-sm font-medium transition-colors cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                isActive ? 'text-accent-text font-semibold' : 'text-text-muted hover:text-text'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="active-nav-pill"
                  transition={{ type: 'spring', damping: 28, stiffness: 380 }}
                  className="absolute inset-0 rounded-full bg-accent-soft border border-[rgba(51,149,255,0.25)] -z-10"
                />
              )}

              <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0" />

              <span
                className={`${
                  isActive ? 'inline-block' : 'hidden md:inline-block'
                } whitespace-nowrap`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
