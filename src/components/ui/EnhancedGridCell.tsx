import React, { useEffect } from 'react';
import { useSpring, useTrail, animated } from '@react-spring/web';
import { motion } from 'framer-motion';

interface EnhancedGridCellProps {
  digit: number;
  frequency: number;
  index: number;
  isVisible: boolean;
  className?: string;
}

export const EnhancedGridCell: React.FC<EnhancedGridCellProps> = ({ 
  digit, 
  frequency, 
  index,
  isVisible,
  className = '' 
}) => {
  const getDisplayContent = () => {
    if (frequency === 0) return '';
    if (frequency === 1) return digit.toString();
    if (frequency === 2) return `${digit} ${digit}`;
    return `${digit} ${digit} ${digit}`;
  };

  // React Spring animation for the cell entrance
  const cellSpring = useSpring({
    from: { 
      opacity: 0, 
      transform: 'scale(0.3) rotate(-180deg)',
      background: 'rgba(51, 65, 85, 0.4)'
    },
    to: { 
      opacity: isVisible ? 1 : 0, 
      transform: isVisible ? 'scale(1) rotate(0deg)' : 'scale(0.3) rotate(-180deg)',
      background: frequency > 0 
        ? `rgba(99, 102, 241, ${0.2 + (frequency * 0.1)})` 
        : 'rgba(51, 65, 85, 0.4)'
    },
    config: { 
      tension: 200, 
      friction: 20,
      mass: 1 
    },
    delay: index * 100, // Stagger the animations
  });

  // Pulsing animation for active cells
  const pulseSpring = useSpring({
    from: { scale: 1, boxShadow: '0 0 0 rgba(245, 158, 11, 0)' },
    to: async (next) => {
      if (frequency > 0 && isVisible) {
        while (true) {
          await next({ 
            scale: 1.1, 
            boxShadow: `0 0 ${20 + frequency * 10}px rgba(245, 158, 11, ${0.3 + frequency * 0.1})` 
          });
          await next({ 
            scale: 1, 
            boxShadow: `0 0 ${10 + frequency * 5}px rgba(245, 158, 11, ${0.2 + frequency * 0.05})` 
          });
        }
      }
      return { scale: 1, boxShadow: '0 0 0 rgba(245, 158, 11, 0)' };
    },
    config: { duration: 2000 + frequency * 500 },
  });

  const getCellClasses = () => {
    let classes = `
      flex items-center justify-center rounded-lg text-center font-bold
      w-16 h-16 sm:w-20 sm:h-20 cursor-pointer select-none relative
      border-2 transition-all duration-300
      ${className}
    `;

    if (frequency === 0) {
      classes += ' border-surface-600 text-surface-500';
    } else if (frequency === 1) {
      classes += ' border-primary-400 text-primary-200';
    } else if (frequency === 2) {
      classes += ' border-primary-300 text-primary-100';
    } else {
      classes += ' border-accent-400 text-accent-100 font-extrabold';
    }

    return classes;
  };

  return (
    <animated.div
      style={cellSpring}
      className={getCellClasses()}
    >
      <animated.div
        style={pulseSpring}
        className="relative z-10 w-full h-full flex items-center justify-center"
      >
        <span className="text-sm sm:text-lg font-bold">
          {getDisplayContent()}
        </span>
        
        {/* Sacred geometry overlay for high frequency cells */}
        {frequency >= 3 && isVisible && (
          <motion.div 
            className="absolute inset-0 opacity-30"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                            w-8 h-8 border border-accent-400 rotate-45 rounded-sm" />
          </motion.div>
        )}
      </animated.div>
    </animated.div>
  );
};
