import React from 'react';
import { Aurora } from '../ui/Aurora';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 sm:p-8 relative overflow-x-hidden">
      <Aurora />
      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg px-4 sm:px-0 relative z-10">
        {children}
      </div>
    </main>
  );
};
