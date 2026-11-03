'use client';

import React, { useState } from 'react';
import { site } from '@/content/site';
import { ui } from '@/content/ui';
import { useLang } from '@/lib/i18n';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import {
  Mail,
  FileText,
  ExternalLink,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { openDigitalCv } from '@/lib/cvNavigation';

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.44 0-2.85-.38-4.09-1.11l-.29-.17-3.12.82.83-3.04-.19-.3a8.21 8.21 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.64c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.24-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.4-.42-.56-.43-.14-.01-.31-.01-.48-.01-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.12-.23-.19-.48-.31" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

export function ContactSection() {
  const { t } = useLang();

  const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;
  const isConfigured = Boolean(formspreeId && formspreeId.trim().length > 0);

  const [formState, setFormState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '', _gotcha: '' });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const validate = () => {
    const newErrors: { name?: string; email?: string; message?: string } = {};
    if (!formData.name.trim()) {
      newErrors.name = t(ui['contact.required']);
    }
    if (!formData.email.trim()) {
      newErrors.email = t(ui['contact.required']);
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = t(ui['contact.invalidEmail']);
    }
    if (!formData.message.trim()) {
      newErrors.message = t(ui['contact.required']);
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConfigured) return;

    if (formData._gotcha) {
      setFormState('success');
      return;
    }

    if (!validate()) return;

    setFormState('sending');

    try {
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
        }),
      });

      if (response.ok) {
        setFormState('success');
        setFormData({ name: '', email: '', message: '', _gotcha: '' });
        setErrors({});
      } else {
        setFormState('error');
      }
    } catch {
      setFormState('error');
    }
  };

  const contactMethods = [
    {
      id: 'email',
      label: site.email,
      href: `mailto:${site.email}`,
      icon: <Mail className="w-5 h-5 text-accent-text" />,
      sublabel: 'Email',
    },
    {
      id: 'whatsapp',
      label: site.phoneDisplay,
      href: site.whatsappUrl,
      icon: <WhatsAppIcon className="w-5 h-5 text-accent-text" />,
      sublabel: 'WhatsApp',
      ltr: true,
    },
    {
      id: 'linkedin',
      label: 'Islam Raad',
      href: site.linkedin,
      icon: <LinkedInIcon className="w-5 h-5 text-accent-text" />,
      sublabel: 'LinkedIn',
      external: true,
    },
    {
      id: 'github',
      label: 'Islam-Raad-dev',
      href: site.github,
      icon: <GithubIcon className="w-5 h-5 text-accent-text" />,
      sublabel: 'GitHub',
      external: true,
    },
    {
      id: 'cv',
      label: t(ui['cta.viewCv']),
      href: '/Islam_Raad Fathi_resume.pdf',
      icon: <FileText className="w-5 h-5 text-accent-text" />,
      sublabel: 'Curriculum Vitae',
      onClick: openDigitalCv,
    },
  ];

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-16 md:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <Reveal>
        <SectionHeader
          eyebrow={t(ui['contact.eyebrow'])}
          title={t(ui['contact.title'])}
        />
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start text-start">
        <Reveal delay={0.1} className="lg:col-span-5 space-y-3">
          {contactMethods.map((method) => (
            <a
              key={method.id}
              href={method.href}
              onClick={
                method.onClick
                  ? (e) => {
                      e.preventDefault();
                      method.onClick?.();
                    }
                  : undefined
              }
              target={method.external ? '_blank' : undefined}
              rel={method.external ? 'noopener noreferrer' : undefined}
              className="group flex items-center justify-between p-4 rounded-2xl bg-card border border-border backdrop-blur-glass shadow-card hover:border-accent hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-accent-soft border border-[rgba(51,149,255,0.25)] flex items-center justify-center shrink-0">
                  {method.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-text-muted font-medium">
                    {method.sublabel}
                  </p>
                  <p
                    className={`text-sm font-semibold text-text group-hover:text-accent-text transition-colors truncate ${
                      method.ltr ? 'dir-ltr text-start' : ''
                    }`}
                    style={method.ltr ? { direction: 'ltr', unicodeBidi: 'isolate' } : undefined}
                  >
                    {method.label}
                  </p>
                </div>
              </div>

              <ExternalLink className="w-4 h-4 text-text-muted group-hover:text-accent-text rtl:rotate-180 shrink-0 ms-2 transition-colors" />
            </a>
          ))}
        </Reveal>

        <Reveal delay={0.2} className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border backdrop-blur-glass shadow-card relative">
            {!isConfigured && (
              <div
                role="status"
                className="mb-6 p-4 rounded-xl bg-accent-soft/60 border border-[rgba(51,149,255,0.3)] text-text text-sm flex items-start gap-3"
              >
                <AlertCircle className="w-5 h-5 text-accent-text shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  {t(ui['contact.disabled'])}
                </p>
              </div>
            )}

            {formState === 'success' && (
              <div
                role="status"
                aria-live="polite"
                className="mb-6 p-4 rounded-xl bg-accent-soft border border-[rgba(51,149,255,0.3)] text-accent-text text-sm flex items-center gap-3"
              >
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <p className="font-medium">{t(ui['contact.success'])}</p>
              </div>
            )}

            {formState === 'error' && (
              <div
                role="status"
                aria-live="polite"
                className="mb-6 p-4 rounded-xl bg-accent-soft/60 border border-[rgba(51,149,255,0.3)] text-text text-sm flex items-start gap-3"
              >
                <AlertCircle className="w-5 h-5 text-accent-text shrink-0 mt-0.5" />
                <p className="leading-relaxed">{t(ui['contact.error'])}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <input
                type="text"
                name="_gotcha"
                value={formData._gotcha}
                onChange={(e) => setFormData({ ...formData, _gotcha: e.target.value })}
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5"
                >
                  {t(ui['contact.name'])}
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  disabled={!isConfigured || formState === 'sending'}
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: undefined });
                  }}
                  className={`w-full px-4 py-2.5 rounded-xl bg-surface border text-sm text-text placeholder-text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                    errors.name ? 'border-accent-text' : 'border-border'
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-accent-text">{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5"
                >
                  {t(ui['contact.email'])}
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  disabled={!isConfigured || formState === 'sending'}
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: undefined });
                  }}
                  className={`w-full px-4 py-2.5 rounded-xl bg-surface border text-sm text-text placeholder-text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                    errors.email ? 'border-accent-text' : 'border-border'
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-accent-text">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5"
                >
                  {t(ui['contact.message'])}
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  required
                  disabled={!isConfigured || formState === 'sending'}
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    if (errors.message) setErrors({ ...errors, message: undefined });
                  }}
                  className={`w-full px-4 py-2.5 rounded-xl bg-surface border text-sm text-text placeholder-text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent transition-colors resize-none disabled:opacity-50 disabled:cursor-not-allowed ${
                    errors.message ? 'border-accent-text' : 'border-border'
                  }`}
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-accent-text">{errors.message}</p>
                )}
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={!isConfigured || formState === 'sending'}
                  icon={
                    formState === 'sending' ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4 rtl:rotate-180" />
                    )
                  }
                  className="w-full sm:w-auto"
                >
                  {formState === 'sending'
                    ? t(ui['contact.sending'])
                    : t(ui['contact.send'])}
                </Button>
              </div>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
