import React from 'react';

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  className = '',
}: SectionHeaderProps) {
  return (
    <div className={`mb-10 text-start ${className}`}>
      <span className="text-xs font-semibold tracking-wider uppercase text-accent-text inline-block mb-2">
        {eyebrow}
      </span>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-text tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-base text-text-muted max-w-2xl leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
