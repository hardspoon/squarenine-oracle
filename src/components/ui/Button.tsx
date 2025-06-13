import React from 'react';
import { Shine } from './Shine';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  withShine?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  withShine = false,
  children,
  disabled,
  className = '',
  ...props
}) => {
  const baseClasses = `
    min-h-[44px] px-6 py-3 sm:py-4 text-base sm:text-lg
    rounded-xl font-medium transition-all duration-300
    touch-manipulation select-none relative overflow-hidden
    ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
  `;

  const variantClasses = {
    primary: disabled 
      ? 'bg-slate-500 text-slate-300'
      : 'bg-gradient-to-r from-mystic-purple-600 to-mystic-purple-700 text-white hover:from-mystic-purple-700 hover:to-mystic-purple-800',
    secondary: disabled
      ? 'bg-slate-300 text-slate-500'
      : 'bg-cream-100 text-mystic-purple-700 hover:bg-cream-200 border border-cream-300'
  };

  return (
    <motion.button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      whileHover={!disabled ? { scale: 1.02, boxShadow: '0 8px 25px rgba(139, 66, 255, 0.25)' } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      disabled={disabled}
      {...props}
    >
      {withShine && !disabled && <Shine />}
      {children}
    </motion.button>
  );
};
