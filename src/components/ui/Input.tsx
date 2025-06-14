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
          absolute left-4 transition-all duration-300 pointer-events-none z-10
          ${focused || props.value ? 
            'top-2 text-xs text-amber-400 font-medium' : 
            'top-4 text-base text-purple-300'
          }
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
          mystical-input w-full h-16 pt-6 pb-2 px-4 text-lg rounded-xl
          ${error ? 'border-red-400' : 'border-purple-400/40'}
          placeholder-transparent focus:placeholder-purple-300/50
          transition-all duration-300
        `}
        type={type}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...props}
      />
      {error && (
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm text-red-400"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};
