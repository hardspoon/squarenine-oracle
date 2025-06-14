import React from 'react';
import { FadeIn } from './ui/FadeIn';
import { motion } from 'framer-motion';

interface NumerologyReading { // Assuming NumerologyReading is defined elsewhere, but adding a local interface for clarity
  name: string;
  birthdate: string;
  email: string;
  gridFrequencies: any; // Replace 'any' with actual type if needed
  lifePath: number;
}

interface ReadingDisplayProps {
  reading: string;
  savedReadings: NumerologyReading[];
}

export const ReadingDisplay: React.FC<ReadingDisplayProps> = ({ reading, savedReadings }) => {
  const paragraphs = reading.split('\n\n').filter(p => p.trim());

  return (
    <FadeIn>
      <div className="mystical-reading rounded-3xl p-8 sm:p-10 space-y-8">
        <div> {/* Container for the current reading */}
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

        {/* Saved Readings Section */}
        {savedReadings.length > 0 && (
          <div className="mt-10 pt-8 border-t border-primary-700/50">
            <h3 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-amber-300">
              Saved Journeys
            </h3>
            <ul className="space-y-6">
              {savedReadings.map((savedReading, index) => (
                <motion.li
                  key={index}
                  className="bg-primary-800/50 border border-primary-700/50 rounded-xl p-6 space-y-2 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <p className="text-primary-200 text-lg font-semibold">{savedReading.name}</p>
                  <p className="text-primary-300 text-sm">Born: {savedReading.birthdate}</p>
                  <p className="text-primary-300 text-sm">Email: {savedReading.email}</p>
                  {/* You can add more details from the savedReading object here if needed */}
                </motion.li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </FadeIn>
  );
};
