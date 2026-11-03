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
  siTensorflow,
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
  siPostman,
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
  tensorflow: '#FF6F00',
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
  postman: '#FF6C37',
  linkedin: '#0A66C2',
  whatsapp: '#25D366',
  aws: '#FF9900',
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
  tensorflow: siTensorflow,
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
  postman: siPostman,
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

  const normalized = slug.toLowerCase().replace(/[\s\-_.]/g, '');
  const skillInfo = skills.find(
    (s) =>
      s.id.toLowerCase() === slug.toLowerCase() ||
      s.id.toLowerCase().replace(/[\s\-_.]/g, '') === normalized ||
      s.name.toLowerCase() === slug.toLowerCase() ||
      s.name.toLowerCase().replace(/[\s\-_.]/g, '') === normalized
  );
  const displayName = skillInfo?.name || slug;

  const resolvedKey =
    (slug in ICON_MAP ? slug : undefined) ||
    Object.keys(ICON_MAP).find(
      (k) =>
        k.toLowerCase() === slug.toLowerCase() ||
        k.toLowerCase().replace(/[\s\-_.]/g, '') === normalized
    ) ||
    (skillInfo?.icon && skillInfo.icon in ICON_MAP ? skillInfo.icon : undefined) ||
    normalized;

  const icon = ICON_MAP[resolvedKey];
  const brandColor =
    resolvedKey === 'github'
      ? 'var(--color-text)'
      : BRAND_COLORS[resolvedKey] ||
        BRAND_COLORS[normalized] ||
        (icon ? `#${icon.hex}` : '#3395FF');

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
    if ((resolvedKey === 'javascript' || normalized === 'javascript') && activeHover) {
      return (
        <div
          className={`${sizeStyles} rounded bg-[#F7DF1E] text-black font-black flex items-center justify-center text-base sm:text-lg select-none shadow-[0_0_12px_rgba(247,223,30,0.5)]`}
          aria-hidden="true"
        >
          JS
        </div>
      );
    }

    if (normalized === 'linkedin') {
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
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
      );
    }

    if (normalized === 'whatsapp') {
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
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.44 0-2.85-.38-4.09-1.11l-.29-.17-3.12.82.83-3.04-.19-.3a8.21 8.21 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.64c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.24-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.4-.42-.56-.43-.14-.01-.31-.01-.48-.01-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.12-.23-.19-.48-.31" />
        </svg>
      );
    }

    if (resolvedKey === 'matplotlib' || normalized === 'matplotlib') {
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

    if (resolvedKey === 'rest' || normalized === 'rest') {
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
