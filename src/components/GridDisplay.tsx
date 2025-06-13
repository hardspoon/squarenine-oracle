import React from 'react';
import { GridCell } from './ui/GridCell';
import { GridFrequencies } from '../types/numerology';
import { GRID_ORDER } from '../constants';
import { FadeIn } from './ui/FadeIn';

interface GridDisplayProps {
  frequencies: GridFrequencies;
}

export const GridDisplay: React.FC<GridDisplayProps> = ({ frequencies }) => {
  return (
    <FadeIn delay={0.3}>
      <div className="mb-8 px-4">
        <h2 className="text-xl sm:text-2xl font-light text-mystic-purple-700 mb-6 text-center">
          Your Energetic Grid
        </h2>
        <div className="grid grid-cols-3 gap-2 sm:gap-4 w-fit mx-auto max-w-xs sm:max-w-none">
          {GRID_ORDER.map((digit, index) => (
            <FadeIn key={digit} delay={0.5 + index * 0.1}>
              <GridCell
                digit={digit}
                frequency={frequencies[digit.toString()]}
                className="w-16 h-16 sm:w-20 sm:h-20"
              />
            </FadeIn>
          ))}
        </div>
      </div>
    </FadeIn>
  );
};
