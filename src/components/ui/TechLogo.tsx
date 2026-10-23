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

interface TechLogoProps {
  slug: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showLabel?: boolean;
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
  className = '',
}: TechLogoProps) {
  const [isHovered, setIsHovered] = useState(false);

  const skillInfo = skills.find((s) => s.id === slug);
  const displayName = skillInfo?.name || slug;
  const icon = ICON_MAP[slug];

  const sizeStyles = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-8 h-8',
    xl: 'w-10 h-10',
  }[size];

  const monogramSizeStyles = {
    sm: 'w-4 h-4 text-[9px]',
    md: 'w-5 h-5 text-[10px]',
    lg: 'w-8 h-8 text-xs',
    xl: 'w-10 h-10 text-sm',
  }[size];

  const renderIcon = () => {
    if (icon) {
      return (
        <svg
          role="img"
          viewBox="0 0 24 24"
          className={`${sizeStyles} transition-colors duration-200`}
          style={{
            fill: isHovered ? `#${icon.hex}` : 'currentColor',
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
        className={`${monogramSizeStyles} font-bold rounded flex items-center justify-center bg-accent-soft text-accent-text border border-[rgba(51,149,255,0.25)] select-none shrink-0`}
        aria-hidden="true"
      >
        {initials}
      </span>
    );
  };

  return (
    <div
      className={`inline-flex items-center gap-1.5 group relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
