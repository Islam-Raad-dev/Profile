'use client';

import React from 'react';
import { useLang } from '@/lib/i18n';
import { profile } from '@/content/profile';
import { ui } from '@/content/ui';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Chip } from '@/components/ui/Chip';
import { Reveal } from '@/components/ui/Reveal';
import { GraduationCap, Award, Calendar, Briefcase } from 'lucide-react';

export function AboutSection() {
  const { t } = useLang();

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-16 md:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <Reveal>
        <SectionHeader
          eyebrow={t(ui['about.eyebrow'])}
          title={t(ui['about.title'])}
        />
      </Reveal>

      {/* Long Bio */}
      <Reveal delay={0.1}>
        <div className="bg-card backdrop-blur-glass border border-border rounded-2xl p-6 sm:p-8 shadow-card mb-10 text-start">
          <p className="text-base sm:text-lg text-text leading-relaxed max-w-3xl">
            {t(profile.longBio)}
          </p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Education Card */}
        <Reveal delay={0.2} className="h-full">
          <div className="bg-card backdrop-blur-glass border border-border rounded-2xl p-6 sm:p-8 shadow-card h-full flex flex-col justify-between text-start">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-accent-soft border border-[rgba(51,149,255,0.25)] flex items-center justify-center text-accent-text">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold font-display text-text">
                  {t(ui['about.education'])}
                </h3>
              </div>

              <div className="space-y-2 mt-4">
                <p className="text-lg font-semibold text-text">
                  {t(profile.education.program)}
                </p>
                <p className="text-sm text-text-muted">
                  {t(profile.education.faculty)} • {t(profile.education.school)}
                </p>
                <p className="text-xs text-text-muted inline-block py-1">
                  {t(profile.education.stage)}
                </p>
              </div>
            </div>

            {profile.education.note && (
              <div className="mt-6 pt-4 border-t border-border">
                <Chip variant="badge" icon={<Award className="w-3.5 h-3.5 text-accent-text" />}>
                  {t(profile.education.note)}
                </Chip>
              </div>
            )}
          </div>
        </Reveal>

        {/* Activities Timeline */}
        <Reveal delay={0.3} className="h-full">
          <div className="bg-card backdrop-blur-glass border border-border rounded-2xl p-6 sm:p-8 shadow-card h-full text-start">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-accent-soft border border-[rgba(51,149,255,0.25)] flex items-center justify-center text-accent-text">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold font-display text-text">
                {t(ui['about.activities'])}
              </h3>
            </div>

            <div className="relative ps-6 sm:ps-8 border-s-2 border-border space-y-8 ms-2">
              {profile.activities.map((item) => (
                <div key={item.id} className="relative group">
                  {/* Timeline Dot */}
                  <span className="absolute -start-[31px] sm:-start-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-bg border-2 border-accent transition-transform duration-200 group-hover:scale-125" />

                  <div>
                    <h4 className="text-base font-semibold text-text group-hover:text-accent-text transition-colors">
                      {t(item.role)}
                    </h4>
                    <p className="text-sm text-text-muted mt-0.5">
                      {t(item.org)}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-xs text-text-muted/80 mt-2">
                      <Calendar className="w-3 h-3" />
                      <span>{t(item.period)}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
