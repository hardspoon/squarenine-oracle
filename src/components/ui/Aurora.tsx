import React from 'react';

export const Aurora: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-br from-cream-50 via-mystic-purple-50 to-gold-50 opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-tr from-mystic-purple-100/30 via-transparent to-gold-100/30 animate-pulse" 
           style={{ animationDuration: '4s' }} />
    </div>
  );
};
