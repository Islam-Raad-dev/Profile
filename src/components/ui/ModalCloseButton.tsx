'use client';

import { forwardRef } from 'react';
import { X } from 'lucide-react';

interface ModalCloseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  ariaLabel: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
};

const iconSizes = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

export const ModalCloseButton = forwardRef<HTMLButtonElement, ModalCloseButtonProps>(
  function ModalCloseButton({ ariaLabel, size = 'md', className = '', onClick, ...props }, ref) {
    return (
      <button
        ref={ref}
        type="button"
        onClick={onClick}
        aria-label={ariaLabel}
        className={`group flex items-center justify-center shrink-0 rounded-full bg-neutral-950/70 dark:bg-white/10 border border-white/20 text-white backdrop-blur-md shadow-md cursor-pointer select-none transition-all duration-300 ease-out hover:bg-[#ef4444] hover:border-[#ef4444] hover:scale-110 hover:rotate-90 hover:shadow-[0_0_20px_rgba(239,68,68,0.55)] hover:text-white active:scale-95 active:bg-[#dc2626] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-card motion-reduce:hover:rotate-0 motion-reduce:hover:scale-100 motion-reduce:transition-none ${sizeClasses[size]} ${className}`}
        {...props}
      >
        <X className={`${iconSizes[size]} transition-transform duration-300 ease-out`} />
      </button>
    );
  }
);
