import React from 'react';
import GlareHover from '../reactbits/GlareHover';
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
    mystical-button min-h-[48px] px-8 py-4 text-lg font-semibold
    rounded-xl transition-all duration-300 relative overflow-hidden
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
  `;

  const variantClasses = {
    primary: 'mystical-button',
    secondary: `
      bg-gradient-to-r from-slate-700/80 to-slate-600/80 
      border-2 border-purple-400/40 text-purple-200
      hover:border-amber-400/60 hover:text-amber-200
    `
  };

  return (
    <motion.div
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
    >
      <GlareHover
        width="auto"
        height="auto"
        background="transparent"
        borderRadius="12px"
        glareColor="#f59e0b"
        glareOpacity={0.3}
        className={`${baseClasses} ${variant === 'primary' ? variantClasses.primary : variantClasses.secondary} ${className}`}
        style={{ border: 'none' }}
      >
        <button
          className="w-full h-full bg-transparent border-none outline-none cursor-inherit"
          disabled={disabled}
          type={props.type}
          onClick={props.onClick}
        >
          <span className="relative z-10">{children}</span>
        </button>
      </GlareHover>
    </motion.div>
  );
};
