'use client';

import { ReactNode } from 'react';
import { LocaleProvider } from '@/contexts/LocaleContext';
import Header from './Header';
import Footer from './Footer';

interface ClientLayoutProps {
  children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <LocaleProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-20">{children}</main>
        <Footer />
      </div>
    </LocaleProvider>
  );
}
