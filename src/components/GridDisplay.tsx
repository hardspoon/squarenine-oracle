import React from 'react';
import { GridCell } from './ui/GridCell';
import type { GridFrequencies } from '../types/numerology';
import { GRID_ORDER } from '../constants';
import { FadeIn } from './ui/FadeIn';
import { motion } from 'framer-motion';

interface GridDisplayProps {
  frequencies: GridFrequencies;
}

export const GridDisplay: React.FC<GridDisplayProps> = ({ frequencies }) => {
  return (
    <FadeIn delay={0.3}>
      <div className="numerology-grid mb-8">
        <motion.h2 
          className="mystical-title text-2xl sm:text-3xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Your Energetic Grid
        </motion.h2>
        
        <div className="grid grid-cols-3 gap-3 sm:gap-4 w-fit mx-auto justify-items-center">
          {GRID_ORDER.map((digit, index) => (
            <motion.div
              key={digit}
              initial={{ opacity: 0, scale: 0, rotateY: -180 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ 
                delay: 0.7 + index * 0.15,
                duration: 0.6,
                type: "spring",
                stiffness: 100
              }}
            >
              <GridCell
                digit={digit}
                frequency={frequencies[digit.toString()]}
              />
            </motion.div>
          ))}
        </div>
        
        {/* Geometry overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                          w-32 h-32 border border-amber-400 rounded-full animate-pulse" 
               style={{ animationDuration: '4s' }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                          w-24 h-24 border border-purple-400 rotate-45 animate-pulse" 
               style={{ animationDuration: '6s', animationDelay: '2s' }} />
        </div>
      </div>
    </FadeIn>
  );
};
