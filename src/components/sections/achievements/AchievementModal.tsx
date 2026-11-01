'use client';

import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import type { Achievement, VolunteeringItem } from '@/types';
import { useLang } from '@/lib/i18n';
import { useIsMounted } from '@/lib/media';
import { CUBIC_EASE } from '@/lib/motion';
import { ui } from '@/content/ui';
import { TechLogo } from '@/components/ui/TechLogo';
import { Chip } from '@/components/ui/Chip';
import { MilestoneCoverArt } from './MilestoneCoverArt';
import { navigateToSectionItem } from '@/lib/cvNavigation';
import { ModalCloseButton } from '@/components/ui/ModalCloseButton';
import {
  ExternalLink,
  Trophy,
  GraduationCap,
  Award,
  BadgeCheck,
  CodeXml,
  Sparkles,
  Star,
  Calendar,
  FolderGit2,
  ArrowUpRight,
  BookOpen,
  ShieldCheck,
  Copy,
  Check,
  Layers,
  Cpu,
  MapPin,
  HeartHandshake,
} from 'lucide-react';

interface AchievementModalProps {
  achievement: Achievement | null;
  volunteering?: VolunteeringItem | null;
  isOpen: boolean;
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLElement | null>;
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function getIconByKind(achievement: Achievement) {
  if (achievement.kind === 'award') {
    return <Trophy className="w-6 h-6 text-accent-text" />;
  }
  if (achievement.kind === 'honor') {
    return <Sparkles className="w-6 h-6 text-accent-text" />;
  }
  if (achievement.kind === 'course') {
    return <CodeXml className="w-6 h-6 text-accent-text" />;
  }
  if (achievement.kind === 'certificate') {
    return <BadgeCheck className="w-6 h-6 text-accent-text" />;
  }
  if (achievement.id === 'sic' || achievement.id === 'gci') {
    return <GraduationCap className="w-6 h-6 text-accent-text" />;
  }
  return <Award className="w-6 h-6 text-accent-text" />;
}

export function AchievementModal({
  achievement,
  volunteering,
  isOpen,
  onClose,
  triggerRef,
}: AchievementModalProps) {
  const { t } = useLang();
  const mounted = useIsMounted();
  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [verifiedId, setVerifiedId] = useState<string | null>(null);
  const [copiedHash, setCopiedHash] = useState(false);

  const activeId = achievement?.id || volunteering?.id || null;
  const isHashVerified = Boolean(activeId && verifiedId === activeId);

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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const handleCopyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const handleProjectClick = (projectId: string) => {
    onClose();
    setTimeout(() => {
      navigateToSectionItem('projects', `project-${projectId}`);
    }, 150);
  };

  if (!mounted) return null;

  const starCount = achievement?.rating || 5;
  const itemHash = achievement?.credentialHash || volunteering?.credentialHash;

  return createPortal(
    <AnimatePresence>
      {isOpen && (achievement || volunteering) && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="achievement-modal-title"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.32, ease: CUBIC_EASE }}
            className="relative w-full max-w-3xl bg-card border border-border rounded-3xl shadow-2xl overflow-hidden z-10 text-start max-h-[92vh] flex flex-col my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <ModalCloseButton
              ref={closeBtnRef}
              onClick={onClose}
              ariaLabel={t(ui['achievements.modal.close'])}
              className="absolute top-4 end-4 z-30"
            />

            <div className="overflow-y-auto w-full overscroll-contain">
              <div className="relative w-full">
                <MilestoneCoverArt id={achievement?.id || volunteering?.id || ''} size="hero" />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-card via-card/60 to-transparent pointer-events-none" />
              </div>

              <div
                onMouseMove={handleMouseMove}
                className="relative px-6 sm:px-8 pb-6 sm:pb-8 -mt-8 sm:-mt-10 z-10 border-b border-border overflow-hidden"
              >
                <div
                  className="absolute inset-0 opacity-20 dark:opacity-30 pointer-events-none transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(51,149,255,0.35), transparent 60%)`,
                  }}
                />

                <div className="relative z-10 flex flex-col gap-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-12 h-12 rounded-2xl bg-accent-soft border border-[rgba(51,149,255,0.3)] flex items-center justify-center shrink-0 shadow-sm">
                        {achievement ? (
                          getIconByKind(achievement)
                        ) : (
                          <HeartHandshake className="w-6 h-6 text-accent-text" />
                        )}
                      </div>

                      {achievement?.period && (
                        <div className="flex items-center gap-1.5 text-xs font-mono text-text-muted bg-card/80 px-3 py-1.5 rounded-xl border border-border">
                          <Calendar className="w-3.5 h-3.5 text-accent-text" />
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

                      {volunteering?.period && (
                        <div className="flex items-center gap-1.5 text-xs font-mono text-text-muted bg-card/80 px-3 py-1.5 rounded-xl border border-border">
                          <Calendar className="w-3.5 h-3.5 text-accent-text" />
                          <span>{t(volunteering.period)}</span>
                        </div>
                      )}
                    </div>

                    {achievement && (
                      <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-card/80 border border-border">
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < starCount
                                  ? 'text-accent fill-accent filter drop-shadow-[0_0_5px_rgba(51,149,255,0.5)]'
                                  : 'text-text-muted/30'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs font-mono font-bold text-text ms-1.5">
                          {starCount}.0
                        </span>
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      {achievement?.badge && (
                        <Chip variant="accent">
                          {t(achievement.badge)}
                        </Chip>
                      )}
                      {achievement?.note && (
                        <Chip variant="default">
                          {t(achievement.note)}
                        </Chip>
                      )}
                      {volunteering?.highlight && (
                        <Chip variant="badge" icon={<Sparkles className="w-3.5 h-3.5 text-accent-text" />}>
                          {t(volunteering.highlight)}
                        </Chip>
                      )}
                    </div>

                    <h2
                      id="achievement-modal-title"
                      className="text-2xl sm:text-3xl font-bold font-display text-text"
                    >
                      {achievement ? t(achievement.title) : volunteering ? t(volunteering.role) : ''}
                    </h2>

                    <p className="text-sm sm:text-base font-semibold text-accent-text mt-1 flex items-center gap-2">
                      {achievement?.issuer && <span>{t(achievement.issuer)}</span>}
                      {volunteering?.organization && <span>{t(volunteering.organization)}</span>}
                    </p>

                    {volunteering?.location && (
                      <p className="text-xs text-text-muted mt-1.5 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-accent-text" />
                        <span>{t(volunteering.location)}</span>
                      </p>
                    )}
                  </div>

                  {itemHash && (
                    <div className="mt-2 p-3 rounded-2xl bg-card/90 border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                      <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
                        <ShieldCheck className="w-4 h-4 text-accent-text shrink-0" />
                        <span className="truncate">
                          HASH: <strong className="text-text">{itemHash}</strong>
                        </span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleCopyHash(itemHash)}
                          aria-label="Copy credential hash"
                          className="p-1.5 rounded-lg bg-surface hover:bg-card border border-border text-text-muted hover:text-text transition-colors cursor-pointer"
                        >
                          {copiedHash ? (
                            <Check className="w-3.5 h-3.5 text-accent-text" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => setVerifiedId(activeId)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                            isHashVerified
                              ? 'bg-accent text-white shadow-[0_0_12px_rgba(51,149,255,0.4)]'
                              : 'bg-surface hover:bg-card border border-border text-text-muted hover:text-text'
                          }`}
                        >
                          {isHashVerified
                            ? `✓ ${t(ui['achievements.modal.verifiedLive'])}`
                            : t(ui['achievements.modal.verifyBtn'])}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-7">
                {(achievement?.overview || volunteering?.description) && (
                  <div>
                    <p className="text-sm sm:text-base text-text leading-relaxed">
                      {achievement ? t(achievement.overview!) : volunteering ? t(volunteering.description) : ''}
                    </p>
                  </div>
                )}

                {achievement?.synergyStack && achievement.synergyStack.length > 0 && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-surface border border-border/80">
                    <div className="flex items-center gap-2 mb-3">
                      <Cpu className="w-4 h-4 text-accent-text" />
                      <h3 className="text-xs font-bold uppercase tracking-wider text-text">
                        {t(ui['achievements.modal.synergyTitle'])}
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div className="p-3 rounded-xl bg-card border border-border">
                        <span className="text-[10px] uppercase font-bold text-text-muted block mb-1">
                          01. {t(ui['achievements.modal.synergyTrack'])}
                        </span>
                        <p className="font-semibold text-text truncate">
                          {t(achievement.title)}
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-card border border-border">
                        <span className="text-[10px] uppercase font-bold text-text-muted block mb-1">
                          02. {t(ui['achievements.modal.synergySkills'])}
                        </span>
                        <div className="flex flex-wrap items-center gap-1.5 mt-1">
                          {achievement.synergyStack.map((slug) => (
                            <div
                              key={slug}
                              className="p-1 rounded-md bg-surface border border-border/60"
                              title={slug}
                            >
                              <TechLogo slug={slug} size="sm" />
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-card border border-border">
                        <span className="text-[10px] uppercase font-bold text-text-muted block mb-1">
                          03. {t(ui['achievements.modal.synergyProject'])}
                        </span>
                        {achievement.projects && achievement.projects[0] ? (
                          <p className="font-semibold text-accent-text truncate">
                            {t(achievement.projects[0].name)}
                          </p>
                        ) : (
                          <p className="text-text-muted">
                            {t(ui['achievements.modal.verifiedStatus'])}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {achievement?.learnings && achievement.learnings.length > 0 && (
                  <div className="border-t border-border pt-6">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-3 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-accent-text" />
                      <span>{t(ui['achievements.card.learnings'])}</span>
                    </h3>
                    <ul className="space-y-2">
                      {achievement.learnings.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-text"
                        >
                          <span className="w-2 h-2 rounded-full bg-accent mt-1.5 shrink-0 shadow-[0_0_6px_rgba(51,149,255,0.6)]" />
                          <span className="leading-relaxed">{t(item)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {achievement?.projects && achievement.projects.length > 0 && (
                  <div className="border-t border-border pt-6">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-3 flex items-center gap-2">
                      <FolderGit2 className="w-4 h-4 text-accent-text" />
                      <span>{t(ui['achievements.card.projects'])}</span>
                    </h3>
                    <div className="space-y-3">
                      {achievement.projects.map((proj, pIdx) => (
                        <div
                          key={pIdx}
                          className="p-4 rounded-2xl bg-surface border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                        >
                          <div>
                            <h4 className="text-sm sm:text-base font-bold text-text">
                              {t(proj.name)}
                            </h4>
                            {proj.description && (
                              <p className="text-xs text-text-muted mt-0.5 leading-relaxed">
                                {t(proj.description)}
                              </p>
                            )}
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {proj.portfolioProjectId && (
                              <button
                                type="button"
                                onClick={() => handleProjectClick(proj.portfolioProjectId!)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-accent text-white text-xs font-semibold hover:bg-accent/90 transition-colors shadow-sm cursor-pointer"
                              >
                                <span>{t(ui['achievements.card.viewProject'])}</span>
                                <ArrowUpRight className="w-3.5 h-3.5 rtl:rotate-[-90deg]" />
                              </button>
                            )}

                            {proj.repoUrl && (
                              <a
                                href={proj.repoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-card border border-border text-xs font-semibold text-text hover:text-accent-text transition-colors"
                              >
                                <GithubIcon className="w-3.5 h-3.5" />
                                <span>{t(ui['achievements.card.repoLink'])}</span>
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {achievement?.subCourses && achievement.subCourses.length > 0 && (
                  <div className="border-t border-border pt-6">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-3 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-accent-text" />
                      <span>{t(ui['achievements.modal.syllabusTitle'])}</span>
                    </h3>
                    <div className="p-4 rounded-2xl bg-surface/70 border border-border grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {achievement.subCourses.map((sub, sIdx) => (
                        <div
                          key={sIdx}
                          className="flex items-center gap-2 p-2 rounded-xl bg-card border border-border/70 text-text"
                        >
                          <span className="font-mono text-accent-text font-bold text-xs">
                            {String(sIdx + 1).padStart(2, '0')}
                          </span>
                          <span className="truncate">{t(sub)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {achievement && (achievement.courseUrl ||
                  achievement.repoUrl ||
                  achievement.certificateUrl ||
                  achievement.hasCertificate) && (
                  <div className="border-t border-border pt-6 flex flex-wrap gap-3">
                    {achievement.courseUrl && (
                      <a
                        href={achievement.courseUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface hover:bg-card border border-border text-xs sm:text-sm font-semibold text-text hover:text-accent-text hover:border-accent transition-colors"
                      >
                        <ExternalLink className="w-4 h-4 rtl:rotate-180" />
                        <span>{t(ui['achievements.card.courseLink'])}</span>
                      </a>
                    )}

                    {achievement.repoUrl && (
                      <a
                        href={achievement.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface hover:bg-card border border-border text-xs sm:text-sm font-semibold text-text hover:text-accent-text hover:border-accent transition-colors"
                      >
                        <GithubIcon className="w-4 h-4" />
                        <span>{t(ui['achievements.card.repoLink'])}</span>
                      </a>
                    )}

                    {achievement.certificateUrl && (
                      <a
                        href={achievement.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-soft border border-[rgba(51,149,255,0.3)] text-xs sm:text-sm font-semibold text-accent-text hover:bg-accent hover:text-white transition-colors"
                      >
                        <BadgeCheck className="w-4 h-4" />
                        <span>{t(ui['achievements.card.certificateLink'])}</span>
                      </a>
                    )}

                    {achievement.hasCertificate && !achievement.certificateUrl && (
                      <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-surface border border-border text-xs font-semibold text-text-muted">
                        <BadgeCheck className="w-4 h-4 text-accent-text" />
                        <span>{t(ui['achievements.card.certificateBadge'])}</span>
                      </div>
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
