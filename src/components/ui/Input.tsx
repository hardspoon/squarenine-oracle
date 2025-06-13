import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  type = 'text',
  className = '',
  ...props
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <motion.label
        className={`
          absolute left-4 transition-all duration-200 pointer-events-none
          ${focused || props.value ? 'top-2 text-xs text-mystic-purple-600' : 'top-4 text-slate-400'}
        `}
        animate={{
          y: focused || props.value ? -8 : 0,
          scale: focused || props.value ? 0.85 : 1,
        }}
      >
        {label}
      </motion.label>
      <input
        className={`
          w-full h-14 pt-6 pb-2 px-4 text-lg rounded-xl
          border-2 ${error ? 'border-red-300' : 'border-cream-200'}
          bg-cream-50 focus:ring-4 focus:ring-gold-300 focus:border-gold-400
          touch-manipulation transition-all duration-200
          outline-none
        `}
        type={type}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...props}
      />
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};
