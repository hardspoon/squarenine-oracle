import React from 'react';

interface ShineProps {
  className?: string;
}

export const Shine: React.FC<ShineProps> = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 -z-10 overflow-hidden rounded-xl ${className}`}>
      <div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer"
        style={{
          animation: 'shimmer 2s infinite',
          transform: 'translateX(-100%)',
        }}
      />
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
      `}</style>
    </div>
  );
};
