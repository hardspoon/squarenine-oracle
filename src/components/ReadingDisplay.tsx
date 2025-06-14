import React from 'react';
import { FadeIn } from './ui/FadeIn';
import { motion } from 'framer-motion';

interface ReadingDisplayProps {
  reading: string;
}

export const ReadingDisplay: React.FC<ReadingDisplayProps> = ({ reading }) => {
  const paragraphs = reading.split('\n\n').filter(p => p.trim());

  return (
    <FadeIn>
      <div className="mystical-reading rounded-3xl p-8 sm:p-10">
        <motion.h2 
          className="mystical-title text-3xl sm:text-4xl font-bold text-center mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          Your Reading
        </motion.h2>
        
        <div className="space-y-6 text-purple-100 leading-relaxed">
          {paragraphs.map((paragraph, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.2 }}
              className="relative"
            >
              <p className="text-base sm:text-lg text-purple-100 leading-relaxed">
                {paragraph.trim()}
              </p>
              
              {/* Decorative elements for first paragraph */}
              {index === 0 && (
                <div className="absolute -left-4 top-0 text-amber-400 text-2xl opacity-50">
                  ✦
                </div>
              )}
            </motion.div>
          ))}
        </div>
        
        {/* Blessing footer */}
        <motion.div 
          className="mt-8 pt-6 border-t border-amber-400/30 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <p className="text-amber-300 italic text-sm sm:text-base">
            ✦ Blessed by the Numbers ✦
          </p>
        </motion.div>
      </div>
    </FadeIn>
  );
};
