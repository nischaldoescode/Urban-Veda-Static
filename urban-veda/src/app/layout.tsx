// root layout - wraps all pages with navigation and footer
'use client';

import { Inter, Playfair_Display } from 'next/font/google';
import { useState, useEffect } from 'react';
import '../styles/globals.css';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import MobileNav from '@/components/layout/MobileNav';
// load fonts
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

// define config type
interface LayoutConfig {
  logoName: string;
  logoImage?: string;
  announcement: string;
  whatsappLink: string;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [config, setConfig] = useState<LayoutConfig>({
    logoName: 'Urban Veda',
    logoImage: undefined,
    announcement: '🌿 trial packs now available!',
    whatsappLink: 'https://chat.whatsapp.com/HGAz9W01xJsHpIHnGUn38M',
  });

  // fetch config on mount
  useEffect(() => {
    async function fetchConfig() {
      try {
        const res = await fetch('/api/config');
        const data = await res.json();
        if (data.success) {
          setConfig({
            logoName: data.data.logoName,
            logoImage: data.data.logoImage,
            announcement: data.data.announcement,
            whatsappLink: data.data.whatsappLink,
          });
        }
      } catch (error) {
        console.error('failed to fetch config:', error);
      }
    }
    
    fetchConfig();
  }, []);

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased">
        <Navigation 
          config={config}
          onMobileMenuOpen={() => setMobileMenuOpen(true)}
        />
        
        <MobileNav
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          config={config}
        />

        <main className="min-h-screen">
          {children}
        </main>

        <Footer config={config} />
      </body>
    </html>
  );
}