'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { SectionId } from '@/types';
import { site } from '@/content/site';
import { ui } from '@/content/ui';
import { useLang } from '@/lib/i18n';
import { useTheme } from '@/lib/theme';
import { useReducedMotion } from '@/lib/media';
import {
  House,
  User,
  FolderKanban,
  Layers,
  FileText,
  Mail,
  Sun,
  Moon,
  Languages,
  type LucideIcon,
} from 'lucide-react';

const ICON_MAP: Record<SectionId, LucideIcon> = {
  home: House,
  about: User,
  projects: FolderKanban,
  skills: Layers,
  achievements: FileText,
  contact: Mail,
};

interface NavbarProps {
  activeSection: SectionId;
  onNavigate: (sectionId: SectionId) => void;
}

export function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const { toggleLang, t } = useLang();
  const { theme, toggleTheme } = useTheme();
  const reducedMotion = useReducedMotion();
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  const enabledSections = site.sections.filter((s) => s.enabled);
  const navSections = enabledSections.filter((s) => s.id !== 'contact');
  const hasContact = enabledSections.some((s) => s.id === 'contact');

  const getTooltipData = (key: string): { icon: LucideIcon; label: string } => {
    if (key === 'theme') {
      return {
        icon: theme === 'dark' ? Sun : Moon,
        label: theme === 'dark' ? t(ui['toggle.theme.light']) : t(ui['toggle.theme.dark']),
      };
    }
    if (key === 'lang') {
      return {
        icon: Languages,
        label: t(ui['toggle.lang.label']),
      };
    }
    const sectionId = key as SectionId;
    return {
      icon: ICON_MAP[sectionId] || House,
      label: t(ui[`nav.${sectionId}`]),
    };
  };

  const handleNavClick = (id: SectionId, e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.blur();
    setHoveredKey(null);
    onNavigate(id);
  };

  const renderTooltip = (key: string) => {
    const isVisible = hoveredKey === key;
    const { icon: TooltipIcon, label } = getTooltipData(key);

    return (
      <AnimatePresence>
        {isVisible && (
          <motion.div
            key={key}
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 4 }}
            animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 4 }}
            transition={
              reducedMotion
                ? { duration: 0 }
                : { duration: 0.15 }
            }
            className="absolute -top-11 left-1/2 -translate-x-1/2 pointer-events-none z-50 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-card border border-border shadow-lg whitespace-nowrap text-text select-none"
          >
            <TooltipIcon className="w-3.5 h-3.5 text-accent-text dark:text-accent shrink-0" />
            <span className="text-xs font-semibold">{label}</span>
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-card border-b border-e border-border" />
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <nav
      aria-label="Main Navigation"
      className="fixed bottom-5 md:bottom-7 left-1/2 -translate-x-1/2 z-40 max-w-[96vw]"
    >
      <div
        onMouseLeave={() => setHoveredKey(null)}
        className="relative flex items-center gap-1 p-1.5 sm:p-2 rounded-2xl bg-card/90 backdrop-blur-glass border border-border shadow-card"
      >
        {navSections.map((sec) => {
          const id = sec.id;
          const Icon = ICON_MAP[id] || House;
          const label = t(ui[`nav.${id}`]);
          const isActive = activeSection === id;

          return (
            <button
              key={id}
              type="button"
              onClick={(e) => handleNavClick(id, e)}
              onMouseEnter={() => setHoveredKey(id)}
              onFocus={() => setHoveredKey(id)}
              onBlur={() => setHoveredKey(null)}
              aria-label={label}
              aria-current={isActive ? 'page' : undefined}
              className={`relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl transition-colors cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                isActive
                  ? 'text-text font-semibold'
                  : 'text-text-muted hover:text-text hover:bg-surface/50'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="active-nav-tile"
                  transition={
                    reducedMotion
                      ? { duration: 0 }
                      : { type: 'spring', damping: 28, stiffness: 380 }
                  }
                  className="absolute inset-0 rounded-xl bg-surface border border-border/70 dark:border-white/10 dark:bg-white/10 -z-10 shadow-sm"
                />
              )}

              {renderTooltip(id)}

              <Icon className="w-5 h-5 shrink-0" />
            </button>
          );
        })}

        <span className="w-px h-5 bg-border mx-1 shrink-0" aria-hidden="true" />

        {hasContact && (
          <button
            type="button"
            onClick={(e) => handleNavClick('contact', e)}
            onMouseEnter={() => setHoveredKey('contact')}
            onFocus={() => setHoveredKey('contact')}
            onBlur={() => setHoveredKey(null)}
            aria-label={t(ui['nav.contact'])}
            aria-current={activeSection === 'contact' ? 'page' : undefined}
            className={`relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl transition-colors cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
              activeSection === 'contact'
                ? 'text-text font-semibold'
                : 'text-text-muted hover:text-text hover:bg-surface/50'
            }`}
          >
            {activeSection === 'contact' && (
              <motion.span
                layoutId="active-nav-tile"
                transition={
                  reducedMotion
                    ? { duration: 0 }
                    : { type: 'spring', damping: 28, stiffness: 380 }
                }
                className="absolute inset-0 rounded-xl bg-surface border border-border/70 dark:border-white/10 dark:bg-white/10 -z-10 shadow-sm"
              />
            )}

            {renderTooltip('contact')}

            <Mail className="w-5 h-5 shrink-0" />
          </button>
        )}

        <button
          type="button"
          onClick={toggleTheme}
          onMouseEnter={() => setHoveredKey('theme')}
          onFocus={() => setHoveredKey('theme')}
          onBlur={() => setHoveredKey(null)}
          aria-label={t(ui['toggle.theme'])}
          className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl text-text-muted hover:text-text hover:bg-surface/50 transition-colors cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          {renderTooltip('theme')}

          {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-accent shrink-0" />
          ) : (
            <Moon className="w-5 h-5 text-accent-text shrink-0" />
          )}
        </button>

        <button
          type="button"
          onClick={toggleLang}
          onMouseEnter={() => setHoveredKey('lang')}
          onFocus={() => setHoveredKey('lang')}
          onBlur={() => setHoveredKey(null)}
          aria-label={t(ui['toggle.lang'])}
          className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl text-text-muted hover:text-text hover:bg-surface/50 transition-colors cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          {renderTooltip('lang')}

          <Languages className="w-5 h-5 shrink-0" />
        </button>
      </div>
    </nav>
  );
}
