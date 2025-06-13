import React from 'react';
import { FadeIn } from './ui/FadeIn';

interface ReadingDisplayProps {
  reading: string;
}

export const ReadingDisplay: React.FC<ReadingDisplayProps> = ({ reading }) => {
  const paragraphs = reading.split('\n\n').filter(p => p.trim());

  return (
    <FadeIn>
      <div className="bg-cream-100 rounded-2xl p-6 sm:p-8 shadow-lg border border-cream-200">
        <h2 className="text-2xl sm:text-3xl font-light text-mystic-purple-700 mb-6 text-center">
          Your Sacred Reading
        </h2>
        <div className="space-y-4 text-slate-700 leading-relaxed">
          {paragraphs.map((paragraph, index) => (
            <FadeIn key={index} delay={index * 0.2}>
              <p className="text-base sm:text-lg">
                {paragraph.trim()}
              </p>
            </FadeIn>
          ))}
        </div>
      </div>
    </FadeIn>
  );
};
