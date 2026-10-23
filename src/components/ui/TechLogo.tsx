'use client';

import React, { useState } from 'react';
import {
  siPython,
  siCplusplus,
  siJavascript,
  siHtml5,
  siCss,
  siFastapi,
  siReact,
  siVite,
  siPytorch,
  siScikitlearn,
  siNumpy,
  siPandas,
  siGooglegemini,
  siOpenrouter,
  siPostgresql,
  siMongodb,
  siGithub,
  siGithubactions,
  siDocker,
  siNetlify,
  siPytest,
  siGraphql,
  type SimpleIcon,
} from 'simple-icons';
import { skills } from '@/content/skills';

export const BRAND_COLORS: Record<string, string> = {
  python: '#3776AB',
  fastapi: '#009688',
  cpp: '#00599C',
  postgresql: '#4169E1',
  mongodb: '#47A248',
  rest: '#3395FF',
  graphql: '#E10098',
  react: '#61DAFB',
  javascript: '#F7DF1E',
  html: '#E34F26',
  css: '#1572B6',
  vite: '#646CFF',
  pytorch: '#EE4C2C',
  scikitlearn: '#F7931E',
  numpy: '#4DABCF',
  pandas: '#E70488',
  matplotlib: '#11557C',
  gemini: '#8E75B2',
  openrouter: '#673AB7',
  docker: '#2496ED',
  github: '#FFFFFF',
  githubactions: '#2088FF',
  netlify: '#00C7B7',
  pytest: '#0A9EDC',
};

interface TechLogoProps {
  slug: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showLabel?: boolean;
  isHovered?: boolean;
  className?: string;
}

const ICON_MAP: Record<string, SimpleIcon> = {
  python: siPython,
  cpp: siCplusplus,
  javascript: siJavascript,
  html: siHtml5,
  css: siCss,
  fastapi: siFastapi,
  react: siReact,
  vite: siVite,
  pytorch: siPytorch,
  scikitlearn: siScikitlearn,
  numpy: siNumpy,
  pandas: siPandas,
  gemini: siGooglegemini,
  openrouter: siOpenrouter,
  postgresql: siPostgresql,
  mongodb: siMongodb,
  github: siGithub,
  githubactions: siGithubactions,
  docker: siDocker,
  netlify: siNetlify,
  pytest: siPytest,
  graphql: siGraphql,
};

export function TechLogo({
  slug,
  size = 'md',
  showLabel = false,
  isHovered: propHovered,
  className = '',
}: TechLogoProps) {
  const [internalHover, setInternalHover] = useState(false);
  const activeHover = propHovered !== undefined ? propHovered : internalHover;

  const skillInfo = skills.find((s) => s.id === slug);
  const displayName = skillInfo?.name || slug;
  const icon = ICON_MAP[slug];
  const brandColor =
    slug === 'github'
      ? 'var(--color-text)'
      : BRAND_COLORS[slug] || (icon ? `#${icon.hex}` : '#3395FF');

  const sizeStyles = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-8 h-8',
    xl: 'w-10 h-10',
    '2xl': 'w-12 h-12 sm:w-14 sm:h-14',
  }[size];

  const monogramSizeStyles = {
    sm: 'w-4 h-4 text-[9px]',
    md: 'w-5 h-5 text-[10px]',
    lg: 'w-8 h-8 text-xs',
    xl: 'w-10 h-10 text-sm',
    '2xl': 'w-12 h-12 text-base',
  }[size];

  const renderIcon = () => {
    if (slug === 'javascript' && activeHover) {
      return (
        <div
          className={`${sizeStyles} rounded bg-[#F7DF1E] text-black font-black flex items-center justify-center text-base sm:text-lg select-none shadow-[0_0_12px_rgba(247,223,30,0.5)]`}
          aria-hidden="true"
        >
          JS
        </div>
      );
    }

    if (slug === 'matplotlib') {
      return (
        <svg
          role="img"
          viewBox="0 0 24 24"
          className={`${sizeStyles} transition-all duration-300`}
          style={{
            fill: 'none',
            stroke: activeHover ? brandColor : 'currentColor',
            strokeWidth: 2,
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            filter: activeHover ? `drop-shadow(0 0 10px ${brandColor}80)` : 'none',
          }}
          aria-hidden="true"
        >
          <path d="M3 3v18h18" />
          <path d="M6 15l4-7 4 5 6-9" />
          <circle cx="6" cy="15" r="1.5" fill={activeHover ? brandColor : 'currentColor'} stroke="none" />
          <circle cx="10" cy="8" r="1.5" fill={activeHover ? brandColor : 'currentColor'} stroke="none" />
          <circle cx="14" cy="13" r="1.5" fill={activeHover ? brandColor : 'currentColor'} stroke="none" />
          <circle cx="20" cy="4" r="1.5" fill={activeHover ? brandColor : 'currentColor'} stroke="none" />
        </svg>
      );
    }

    if (slug === 'rest') {
      return (
        <div
          className={`${sizeStyles} rounded border select-none font-black flex items-center justify-center text-[9px] sm:text-[11px] tracking-tight transition-all duration-300`}
          style={{
            borderColor: activeHover ? brandColor : 'currentColor',
            color: activeHover ? brandColor : 'currentColor',
            backgroundColor: activeHover ? `${brandColor}20` : 'transparent',
            boxShadow: activeHover ? `0 0 12px ${brandColor}60` : 'none',
          }}
          aria-hidden="true"
        >
          REST
        </div>
      );
    }

    if (icon) {
      return (
        <svg
          role="img"
          viewBox="0 0 24 24"
          className={`${sizeStyles} transition-all duration-300`}
          style={{
            fill: activeHover ? brandColor : 'currentColor',
            filter: activeHover ? `drop-shadow(0 0 10px ${brandColor}80)` : 'none',
          }}
          aria-hidden="true"
        >
          <path d={icon.path} />
        </svg>
      );
    }

    const initials = displayName.slice(0, 2).toUpperCase();
    return (
      <span
        className={`${monogramSizeStyles} font-bold rounded flex items-center justify-center border select-none shrink-0 transition-all duration-300`}
        style={{
          backgroundColor: activeHover ? `${brandColor}25` : 'var(--accent-soft)',
          color: activeHover ? brandColor : 'var(--accent-text)',
          borderColor: activeHover ? brandColor : 'rgba(51,149,255,0.25)',
          boxShadow: activeHover ? `0 0 10px ${brandColor}60` : 'none',
        }}
        aria-hidden="true"
      >
        {initials}
      </span>
    );
  };

  return (
    <div
      className={`inline-flex items-center gap-1.5 group relative ${className}`}
      onMouseEnter={() => setInternalHover(true)}
      onMouseLeave={() => setInternalHover(false)}
      title={displayName}
      aria-label={displayName}
    >
      {renderIcon()}
      {showLabel && (
        <span className="text-xs font-medium text-text-muted group-hover:text-text transition-colors">
          {displayName}
        </span>
      )}
    </div>
  );
}
