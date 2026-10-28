'use client';

import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useLang } from '@/lib/i18n';
import { useIsMounted, useReducedMotion } from '@/lib/media';
import { CUBIC_EASE } from '@/lib/motion';
import { digitalCv } from '@/content/cv';
import { site } from '@/content/site';
import { ui } from '@/content/ui';
import { TechLogo } from '@/components/ui/TechLogo';
import {
  useDigitalCvModal,
  closeDigitalCv,
  navigateToSectionItem,
} from '@/lib/cvNavigation';
import {
  X,
  FileText,
  Download,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  Sparkles,
  GraduationCap,
} from 'lucide-react';

export function DigitalCvModal() {
  const isOpen = useDigitalCvModal();
  const { lang, t } = useLang();
  const mounted = useIsMounted();
  const reducedMotion = useReducedMotion();
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
        closeDigitalCv();
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

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
    };
  }, [isOpen]);

  if (!mounted) return null;

  const firstName = lang === 'ar' ? 'إسلام' : 'ISLAM';
  const lastName = lang === 'ar' ? 'رعــــد' : 'RAAD';

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="digital-cv-title"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            onClick={closeDigitalCv}
            aria-hidden="true"
          />

          <motion.div
            ref={modalRef}
            initial={
              reducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.95, y: 16 }
            }
            animate={
              reducedMotion
                ? { opacity: 1 }
                : { opacity: 1, scale: 1, y: 0 }
            }
            exit={
              reducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.95, y: 16 }
            }
            transition={{ duration: 0.3, ease: CUBIC_EASE }}
            className="relative w-full max-w-4xl bg-card/95 border border-border/80 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden z-10 text-start max-h-[90vh] flex flex-col my-auto backdrop-blur-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between px-5 sm:px-8 py-4 border-b border-border/70 bg-card/60 shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-accent-soft flex items-center justify-center text-accent-text dark:text-accent">
                  <FileText className="w-4 h-4" />
                </div>
                <span className="font-display font-bold text-sm tracking-wide text-text uppercase">
                  {t(ui['cv.fastReport'])}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="/Islam_Raad Fathi_resume.pdf"
                  download="Islam_Raad_Fathi_Resume.pdf"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent-soft border border-accent/20 text-accent-text dark:text-accent text-xs font-semibold hover:bg-accent hover:text-white transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{t(ui['cta.downloadPdf'])}</span>
                </a>

                <button
                  ref={closeBtnRef}
                  type="button"
                  onClick={closeDigitalCv}
                  aria-label={t(ui['cv.close'])}
                  className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center text-text hover:text-accent-text hover:border-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="overflow-y-auto overscroll-contain p-5 sm:p-8 space-y-8 flex-1">
              <div className="border-b border-border/70 pb-6">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                  <h1
                    id="digital-cv-title"
                    className="font-display font-black text-4xl sm:text-5xl md:text-6xl tracking-tight uppercase leading-none select-none"
                  >
                    <span className="text-text">{firstName} </span>
                    <span className="text-accent-text dark:text-accent">{lastName}</span>
                  </h1>
                </div>

                <p className="font-display font-bold text-accent-text dark:text-accent text-xs sm:text-sm md:text-base tracking-widest uppercase mt-2.5">
                  {t(digitalCv.role)}
                </p>

                <div className="flex flex-wrap items-center gap-y-2 gap-x-4 mt-3 text-xs text-text-muted">
                  <a
                    href={`mailto:${digitalCv.email}`}
                    className="flex items-center gap-1.5 hover:text-accent-text transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-accent-text dark:text-accent shrink-0" />
                    <span>{digitalCv.email}</span>
                  </a>
                  <span className="text-border hidden sm:inline">•</span>
                  <a
                    href={`tel:${digitalCv.phone.replace(/\s+/g, '')}`}
                    className="flex items-center gap-1.5 hover:text-accent-text transition-colors dir-ltr"
                  >
                    <Phone className="w-3.5 h-3.5 text-accent-text dark:text-accent shrink-0" />
                    <span className="dir-ltr">{digitalCv.phone}</span>
                  </a>
                  <span className="text-border hidden sm:inline">•</span>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-accent-text dark:text-accent shrink-0" />
                    <span>{t(digitalCv.location)}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-7 space-y-7">
                  <div>
                    <h2 className="text-xs font-bold font-display tracking-widest text-accent-text dark:text-accent uppercase mb-2.5">
                      {t(ui['cv.overview'])}
                    </h2>
                    <p className="text-sm leading-relaxed text-text/90">
                      {t(digitalCv.overview)}
                    </p>
                  </div>

                  <div>
                    <h2 className="text-xs font-bold font-display tracking-widest text-accent-text dark:text-accent uppercase mb-3">
                      {t(ui['cv.projects'])}
                    </h2>
                    <div className="space-y-2.5">
                      {digitalCv.projects.map((proj) => (
                        <div
                          key={proj.id}
                          onClick={() => {
                            if (proj.targetSection) {
                              navigateToSectionItem(
                                proj.targetSection,
                                proj.targetElementId
                              );
                            }
                          }}
                          className="group p-3.5 rounded-2xl bg-surface/70 border border-border/80 hover:border-accent hover:bg-surface transition-all cursor-pointer select-none"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-display font-bold text-sm text-text group-hover:text-accent-text transition-colors uppercase">
                              {t(proj.title)}
                            </span>
                            <div className="flex items-center gap-1.5">
                              {proj.badge && (
                                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-accent-soft text-accent-text border border-accent/20">
                                  {t(proj.badge)}
                                </span>
                              )}
                              <ArrowUpRight className="w-3.5 h-3.5 text-text-muted group-hover:text-accent-text rtl:-scale-x-100 transition-transform" />
                            </div>
                          </div>
                          {proj.subtitle && (
                            <p className="text-xs text-text-muted mt-1 leading-normal">
                              {t(proj.subtitle)}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xs font-bold font-display tracking-widest text-accent-text dark:text-accent uppercase mb-3">
                      {t(ui['cv.academic'])}
                    </h2>
                    <div className="space-y-2.5">
                      {digitalCv.academic.map((acad) => (
                        <div
                          key={acad.id}
                          className="p-3.5 rounded-2xl bg-surface/70 border border-border/80"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-bold text-sm text-text">
                              {t(acad.title)}
                            </span>
                            {acad.period && (
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-accent-soft text-accent-text">
                                {t(acad.period)}
                              </span>
                            )}
                          </div>
                          {acad.subtitle && (
                            <p className="text-xs text-text-muted mt-1 flex items-center gap-1.5">
                              <GraduationCap className="w-3.5 h-3.5 text-accent-text shrink-0" />
                              <span>{t(acad.subtitle)}</span>
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xs font-bold font-display tracking-widest text-accent-text dark:text-accent uppercase mb-3">
                      {t(ui['cv.programs'])}
                    </h2>
                    <div className="space-y-2.5">
                      {digitalCv.programs.map((prog) => {
                        const isClickable = !!prog.targetSection;
                        return (
                          <div
                            key={prog.id}
                            onClick={() => {
                              if (prog.targetSection) {
                                navigateToSectionItem(
                                  prog.targetSection,
                                  prog.targetElementId
                                );
                              }
                            }}
                            className={`p-3.5 rounded-2xl bg-surface/70 border border-border/80 transition-all ${
                              isClickable
                                ? 'group hover:border-accent hover:bg-surface cursor-pointer'
                                : ''
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span
                                className={`font-semibold text-xs sm:text-sm text-text ${
                                  isClickable
                                    ? 'group-hover:text-accent-text transition-colors'
                                    : ''
                                }`}
                              >
                                {t(prog.title)}
                              </span>
                              <div className="flex items-center gap-1.5 shrink-0">
                                {prog.badge && (
                                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-accent-soft text-accent-text">
                                    {t(prog.badge)}
                                  </span>
                                )}
                                {isClickable && (
                                  <ArrowUpRight className="w-3.5 h-3.5 text-text-muted group-hover:text-accent-text rtl:-scale-x-100 transition-transform" />
                                )}
                              </div>
                            </div>
                            {prog.subtitle && (
                              <p className="text-xs text-text-muted mt-1 leading-normal">
                                {t(prog.subtitle)}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xs font-bold font-display tracking-widest text-accent-text dark:text-accent uppercase mb-3">
                      {t(ui['cv.certificates'])}
                    </h2>
                    <div className="space-y-2.5">
                      {digitalCv.certificates.map((cert) => {
                        const isClickable = !!cert.targetSection;
                        return (
                          <div
                            key={cert.id}
                            onClick={() => {
                              if (cert.targetSection) {
                                navigateToSectionItem(
                                  cert.targetSection,
                                  cert.targetElementId
                                );
                              }
                            }}
                            className={`p-3.5 rounded-2xl bg-surface/70 border border-border/80 transition-all ${
                              isClickable
                                ? 'group hover:border-accent hover:bg-surface cursor-pointer'
                                : ''
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span
                                className={`font-semibold text-xs sm:text-sm text-text ${
                                  isClickable
                                    ? 'group-hover:text-accent-text transition-colors'
                                    : ''
                                }`}
                              >
                                {t(cert.title)}
                              </span>
                              <div className="flex items-center gap-1.5 shrink-0">
                                {cert.period && (
                                  <span className="text-[10px] font-mono text-text-muted">
                                    {t(cert.period)}
                                  </span>
                                )}
                                {isClickable && (
                                  <ArrowUpRight className="w-3.5 h-3.5 text-text-muted group-hover:text-accent-text rtl:-scale-x-100 transition-transform" />
                                )}
                              </div>
                            </div>
                            {cert.subtitle && (
                              <p className="text-xs text-text-muted mt-1 leading-normal">
                                {t(cert.subtitle)}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="md:col-span-5 space-y-7">
                  <div>
                    <h2 className="text-xs font-bold font-display tracking-widest text-accent-text dark:text-accent uppercase mb-3">
                      {t(ui['cv.stack'])}
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {digitalCv.stack.map((tech) => (
                        <div
                          key={tech}
                          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-surface border border-border/80 text-xs font-medium text-text hover:border-accent transition-colors"
                        >
                          <TechLogo slug={tech} size="sm" />
                          <span>{tech}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xs font-bold font-display tracking-widest text-accent-text dark:text-accent uppercase mb-3">
                      {t(ui['cv.impact'])}
                    </h2>
                    <div className="space-y-2">
                      {digitalCv.impact.map((imp, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 text-xs leading-relaxed text-text/90 p-2.5 rounded-xl bg-surface/50 border border-border/60"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-accent-text dark:text-accent shrink-0 mt-0.5" />
                          <span>{t(imp)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xs font-bold font-display tracking-widest text-accent-text dark:text-accent uppercase mb-3">
                      {t(ui['cv.connect'])}
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      <a
                        href={site.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-surface border border-border/80 text-xs font-semibold text-text hover:text-accent-text hover:border-accent transition-colors"
                      >
                        <TechLogo slug="linkedin" size="sm" />
                        <span>LinkedIn</span>
                      </a>
                      <a
                        href={site.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-surface border border-border/80 text-xs font-semibold text-text hover:text-accent-text hover:border-accent transition-colors"
                      >
                        <TechLogo slug="github" size="sm" />
                        <span>GitHub</span>
                      </a>
                      <a
                        href={`mailto:${digitalCv.email}`}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-surface border border-border/80 text-xs font-semibold text-text hover:text-accent-text hover:border-accent transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5 text-accent-text" />
                        <span>{t(ui['contact.email'])}</span>
                      </a>
                      <a
                        href={site.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-surface border border-border/80 text-xs font-semibold text-text hover:text-accent-text hover:border-accent transition-colors"
                      >
                        <TechLogo slug="whatsapp" size="sm" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-border/70 text-center space-y-2 text-xs text-text-muted">
                <p className="font-semibold tracking-wider text-text uppercase">
                  {t(digitalCv.languages)}
                </p>
                <p className="text-[11px] tracking-wide text-text-muted/80">
                  {t(digitalCv.engineeredWith)}
                </p>
                <p className="text-[11px] text-text-muted/60">
                  © {new Date().getFullYear()} {t(ui.footer)}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
