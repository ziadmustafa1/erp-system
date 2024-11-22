// Badge.tsx
import * as React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'success' | 'warning';
  children: React.ReactNode;
  className?: string;
}

const Badge = ({ variant = 'default', children, className }: BadgeProps) => {
  const variants = {
    default: 'bg-gray-200 text-gray-800',
    destructive: 'bg-red-600 text-white',
    outline: 'border border-gray-300 text-gray-800',
    secondary: 'bg-blue-200 text-blue-800',
    success: 'bg-green-200 text-green-800',
    warning: 'bg-yellow-200 text-yellow-800',
  };
  
  const variantClass = variants[variant] || variants.default;
  
  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', variantClass, className)}>
      {children}
    </span>
  );
};

export { Badge };
