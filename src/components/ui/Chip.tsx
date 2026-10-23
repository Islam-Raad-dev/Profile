import React from 'react';

interface ChipProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'badge';
  icon?: React.ReactNode;
  className?: string;
}

export function Chip({
  children,
  variant = 'default',
  icon,
  className = '',
}: ChipProps) {
  const variantStyles = {
    default: 'bg-surface text-text-muted border-border',
    accent: 'bg-accent-soft text-accent-text border-[rgba(51,149,255,0.25)]',
    badge: 'bg-accent-soft text-accent-text border-[rgba(51,149,255,0.3)] font-medium',
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full border transition-colors ${variantStyles} ${className}`}
    >
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}
