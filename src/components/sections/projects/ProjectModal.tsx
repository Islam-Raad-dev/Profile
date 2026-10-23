'use client';

import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import type { Project } from '@/types';
import { useLang } from '@/lib/i18n';
import { useIsMounted } from '@/lib/media';
import { CUBIC_EASE } from '@/lib/motion';
import { ui } from '@/content/ui';
import { TechLogo } from '@/components/ui/TechLogo';
import { Button } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';
import { ProjectCover } from './ProjectCover';
import { X, ExternalLink, Trophy } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLElement | null>;
}

export function ProjectModal({
  project,
  isOpen,
  onClose,
  triggerRef,
}: ProjectModalProps) {
  const { t } = useLang();
  const mounted = useIsMounted();
  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    const triggerElement = triggerRef?.current;

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
      triggerElement?.focus();
    };
  }, [isOpen, onClose, triggerRef]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && project && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.32, ease: CUBIC_EASE }}
            className="relative w-full max-w-2xl bg-card border border-border rounded-3xl shadow-2xl overflow-hidden z-10 text-start max-h-[85vh] flex flex-col my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              aria-label={t(ui['project.close'])}
              className="absolute top-4 end-4 z-20 w-10 h-10 rounded-full bg-card/85 border border-border backdrop-blur-md flex items-center justify-center text-text hover:text-accent-text hover:border-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent shadow-md cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="overflow-y-auto w-full overscroll-contain">
              <ProjectCover
                project={project}
                aspectRatio="aspect-[21/9] sm:aspect-[2/1] max-h-52 sm:max-h-60"
              />

            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h3
                    id="project-modal-title"
                    className="text-2xl sm:text-3xl font-bold font-display text-text"
                  >
                    {t(project.title)}
                  </h3>
                  {project.badge && (
                    <Chip variant="badge" icon={<Trophy className="w-3.5 h-3.5 text-accent-text" />}>
                      {t(project.badge)}
                    </Chip>
                  )}
                </div>
                <p className="text-sm text-text-muted">
                  {t(project.summary)}
                </p>
              </div>

              {project.description && (
                <div className="border-t border-border pt-4">
                  <p className="text-base text-text leading-relaxed whitespace-pre-line">
                    {t(project.description)}
                  </p>
                </div>
              )}

              <div className="border-t border-border pt-4">
                <h4 className="text-xs font-semibold tracking-wider uppercase text-text-muted mb-3">
                  {t(ui['project.stack'])}
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  {project.stack.map((tech) => (
                    <div
                      key={tech}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface border border-border text-xs font-medium text-text"
                    >
                      <TechLogo slug={tech} size="sm" />
                      <span>{tech}</span>
                    </div>
                  ))}
                </div>
              </div>

              {(project.live || project.repo) && (
                <div className="border-t border-border pt-6 flex flex-wrap gap-3">
                  {project.live && (
                    <Button
                      href={project.live}
                      external
                      variant="primary"
                      icon={<ExternalLink className="w-4 h-4 rtl:rotate-180" />}
                    >
                      {t(ui['project.live'])}
                    </Button>
                  )}
                  {project.repo && (
                    <Button
                      href={project.repo}
                      external
                      variant="secondary"
                      icon={<TechLogo slug="github" size="sm" />}
                    >
                      {t(ui['project.code'])}
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
