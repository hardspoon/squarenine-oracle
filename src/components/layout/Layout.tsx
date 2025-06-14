import React from 'react';
import Aurora from '../reactbits/Aurora';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 sm:p-8 relative">
      <Aurora />
      <div className="w-full max-w-2xl mx-auto relative z-10">
        <div className="mystical-card rounded-3xl p-8 sm:p-12">
          {children}
        </div>
      </div>
    </main>
  );
};
