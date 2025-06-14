import React from 'react';
import { motion } from 'framer-motion';

import SpotlightCard from './../SpotlightCard';
interface GridCellProps {
  digit: number;
  frequency: number;
  className?: string;
}

export const GridCell: React.FC<GridCellProps> = ({ 
  digit, 
  frequency, 
  className = '' 
}) => {
  const getDisplayContent = () => {
    if (frequency === 0) return '';
    if (frequency === 1) return digit.toString();
    if (frequency === 2) return `${digit} ${digit}`;
    return `${digit} ${digit} ${digit}`;
  };

  const getCellClasses = () => {
    let classes = `
      grid-cell flex items-center justify-center rounded-lg text-center font-bold relative z-1
      w-16 h-16 sm:w-20 sm:h-20 cursor-pointer select-none relative
      ${className}
    `;

    if (frequency === 0) {
      classes += ' opacity-40 text-slate-500';
    } else if (frequency === 1) {
      classes += ' grid-cell-active text-amber-300';
    } else if (frequency === 2) {
      classes += ' grid-cell-active text-amber-200';
    } else {
      classes += ' grid-cell-intense text-amber-100 font-extrabold';
    }

    return classes;
  };

  return (
    <SpotlightCard spotlightColor="rgba(250, 204, 21, 0.3)">
      <motion.div
        className={getCellClasses()}
        whileHover={frequency > 0 ? {
          scale: 1.1,

          rotateY: 5
        } : {}}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          delay: digit * 0.1 // Stagger animation based on digit
        }}
      >
        <span className="text-sm sm:text-lg font-bold relative z-10">
          {getDisplayContent()}
        </span>

        {/* Pulsing animation for high frequency cells */}
        {frequency >= 2 && (
          <motion.div
            className="absolute inset-0 border border-amber-400 rounded-lg opacity-30"
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        {/* Rotating geometry for highest frequency cells */}
        {frequency >= 3 && (
          <motion.div
            className="absolute inset-0 border border-purple-400 rounded-full opacity-20"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        )}
      </motion.div>
    </SpotlightCard>
  );
};
