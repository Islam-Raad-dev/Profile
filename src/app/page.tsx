'use client';

import { Toggles } from '@/components/layout/Toggles';
import { HeroSection } from '@/components/sections/hero/HeroSection';
import { AboutSection } from '@/components/sections/about/AboutSection';
import { ProjectsSection } from '@/components/sections/projects/ProjectsSection';
import { useLang } from '@/lib/i18n';
import { ui } from '@/content/ui';

export default function Home() {
  const { t } = useLang();

  return (
    <div className="relative min-h-screen bg-bg text-text selection:bg-accent-soft selection:text-accent-text">
      {/* Preferences Toggles (Top Corner) */}
      <Toggles />

      {/* Main Content Sections */}
      <main className="space-y-12 md:space-y-20 pb-28">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />

        {/* Phase 3 Placeholder Anchors */}
        <div id="skills" />
        <div id="achievements" />
        <div id="contact" />
      </main>

      {/* Footer */}
      <footer className="py-8 text-center border-t border-border/60 text-xs text-text-muted">
        <p>
          © {new Date().getFullYear()} {t(ui.footer)}
        </p>
      </footer>
    </div>
  );
}
