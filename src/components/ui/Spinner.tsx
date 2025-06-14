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
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
  };

  return (
    <div className={`relative ${className}`}>
      <motion.div
        className={`
          mystical-spinner ${sizeClasses[size]} rounded-full
        `}
        animate={{
          rotate: 360,
        }}
        transition={{
          rotate: { duration: 2, repeat: Infinity, ease: 'linear' },
        }}
      />
      
      {/* Inner geometry */}
      <motion.div
        className={`
          absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
          ${size === 'lg' ? 'w-12 h-12' : size === 'md' ? 'w-8 h-8' : 'w-4 h-4'}
          border-2 border-amber-400 rotate-45 rounded-sm
        `}
        animate={{
          rotate: -360,
          scale: [1, 1.2, 1],
        }}
        transition={{
          rotate: { duration: 3, repeat: Infinity, ease: 'linear' },
          scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
        }}
      />
    </div>
  );
};
