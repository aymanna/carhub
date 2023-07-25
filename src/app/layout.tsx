import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'Car Hub',
  description: 'Discover the best cars in the world.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/model-icon.png" />
      </head>
      <body className="relative">
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
