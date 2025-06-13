import React from 'react';
import { motion } from 'framer-motion';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ 
  size = 'md', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <motion.div
      className={`
        ${sizeClasses[size]} 
        rounded-full border-4 border-mystic-purple-200 
        border-t-mystic-purple-600 
        ${className}
      `}
      animate={{
        rotate: 360,
        scale: [1, 1.1, 1],
        opacity: [0.7, 1, 0.7]
      }}
      transition={{
        rotate: { duration: 1, repeat: Infinity, ease: 'linear' },
        scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
        opacity: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
      }}
    />
  );
};
