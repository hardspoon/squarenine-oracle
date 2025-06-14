import React, { useState, useEffect } from 'react';
import { useTrail, animated } from '@react-spring/web';
import { EnhancedGridCell } from './ui/EnhancedGridCell';
import type { GridFrequencies } from '../types/numerology';
import { GRID_ORDER } from '../constants';
import { motion } from 'framer-motion';

interface EnhancedGridDisplayProps {
  frequencies: GridFrequencies;
}

export const EnhancedGridDisplay: React.FC<EnhancedGridDisplayProps> = ({ frequencies }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [cellsVisible, setCellsVisible] = useState<boolean[]>(new Array(9).fill(false));

  // Trigger the grid animation sequence
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      
      // Stagger cell visibility
      GRID_ORDER.forEach((_, index) => {
        setTimeout(() => {
          setCellsVisible(prev => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
          });
        }, index * 150);
      });
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // React Spring trail for the title animation
  const titleTrail = useTrail(1, {
    from: { opacity: 0, transform: 'translateY(-30px)' },
    to: { opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0px)' : 'translateY(-30px)' },
    config: { tension: 200, friction: 25 },
  });

  return (
    <div className="mb-8 px-4">
      <animated.div style={titleTrail[0]}>
        <motion.h2 
          className="text-2xl sm:text-3xl font-bold text-center mb-8 bg-gradient-to-r from-primary-400 via-accent-400 to-primary-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Your Energetic Grid
        </motion.h2>
      </animated.div>
      
      <div className="numerology-grid relative">
        <div className="grid grid-cols-3 gap-3 sm:gap-4 w-fit mx-auto justify-items-center">
          {GRID_ORDER.map((digit, index) => (
            <EnhancedGridCell
              key={digit}
              digit={digit}
              frequency={frequencies[digit.toString()]}
              index={index}
              isVisible={cellsVisible[index]}
            />
          ))}
        </div>
        
        {/* Geometric overlay animations */}
        <motion.div 
          className="absolute inset-0 pointer-events-none opacity-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ delay: 2 }}
        >
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                       w-32 h-32 border border-accent-400 rounded-full"
            animate={{ rotate: 360, scale: [1, 1.1, 1] }}
            transition={{ 
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                       w-24 h-24 border border-primary-400 rotate-45"
            animate={{ rotate: [45, 405], scale: [0.8, 1.2, 0.8] }}
            transition={{ 
              duration: 15, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 1
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};
