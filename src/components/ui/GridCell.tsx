import React from 'react';
import { motion } from 'framer-motion';

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
    const baseClasses = `
      flex items-center justify-center rounded-xl border-2 text-center font-medium
      transition-all duration-300 cursor-pointer select-none
      ${className}
    `;

    if (frequency === 0) {
      return `${baseClasses} bg-slate-100 border-slate-200 text-slate-300`;
    }
    
    if (frequency === 1) {
      return `${baseClasses} bg-mystic-purple-50 border-mystic-purple-200 text-mystic-purple-600 shadow-sm`;
    }
    
    if (frequency === 2) {
      return `${baseClasses} bg-mystic-purple-100 border-mystic-purple-300 text-mystic-purple-700 shadow-md`;
    }

    // frequency >= 3
    return `${baseClasses} bg-gradient-to-br from-mystic-purple-200 to-mystic-purple-300 border-mystic-purple-400 text-mystic-purple-800 shadow-lg`;
  };

  return (
    <motion.div
      className={getCellClasses()}
      whileHover={{ 
        scale: 1.05, 
        boxShadow: '0 8px 25px rgba(139, 66, 255, 0.25)' 
      }}
      animate={frequency >= 3 ? {
        boxShadow: [
          '0 0 0 rgba(139, 66, 255, 0.3)',
          '0 0 20px rgba(139, 66, 255, 0.6)',
          '0 0 0 rgba(139, 66, 255, 0.3)'
        ]
      } : {}}
      transition={{
        boxShadow: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
      }}
    >
      <span className="text-sm sm:text-lg font-semibold">
        {getDisplayContent()}
      </span>
    </motion.div>
  );
};
