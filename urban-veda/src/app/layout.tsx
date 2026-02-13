/**
 * root layout component
 * 
 * purpose:
 * - wraps all pages with consistent navigation and footer
 * - loads google fonts with optimization
 * - fetches site configuration from api on mount
 * - manages mobile menu state
 * - provides app-style bottom navigation on mobile devices
 * 
 * structure:
 * - desktop: top navigation bar with links
 * - mobile: hamburger menu + bottom tab bar (app-style)
 * - both: footer with links and social media
 * 
 * fonts:
 * - inter: body text (sans-serif)
 * - playfair display: headings (serif)
 * 
 * state management:
 * - config: site configuration from mongodb
 * - mobileMenuOpen: hamburger menu visibility
 * 
 * @component
 */
'use client';

import { Inter, Playfair_Display } from 'next/font/google';
import { useState, useEffect } from 'react';
import '../styles/globals.css';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import MobileNav from '@/components/layout/MobileBottomNav';
import MobileBottomNav from '@/components/layout/MobileBottomNav';

// load google fonts with optimization
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
});

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  preload: true,
});

/**
 * layout configuration interface
 * defines shape of config object fetched from api
 */
interface LayoutConfig {
  logoName: string;
  logoImage?: string;
  whatsappLink: string;
}

/**
 * root layout component
 * client component to enable state management and api calls
 * 
 * @param children - page content to render
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // mobile menu visibility state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // site configuration state with defaults
  const [config, setConfig] = useState<LayoutConfig>({
    logoName: 'Urban Veda',
    logoImage: undefined,
    whatsappLink: 'https://chat.whatsapp.com/HGAz9W01xJsHpIHnGUn38M',
  });

  /**
   * fetch site configuration from api on component mount
   * updates config state with database values
   * handles errors gracefully with console logging
   */
  useEffect(() => {
    async function fetchConfig() {
      try {
        const res = await fetch('/api/config');
        const data = await res.json();
        
        if (data.success) {
          setConfig({
            logoName: data.data.logoName,
            logoImage: data.data.logoImage,
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
        {/* desktop navigation bar - hidden on mobile */}
        <Navigation 
          config={config}
          onMobileMenuOpen={() => setMobileMenuOpen(true)}
        />
        
        {/* mobile hamburger menu - slide-in drawer */}
        <MobileNav
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          config={config}
        />

        {/* main content area with bottom padding for mobile nav */}
        <main className="min-h-screen pb-20 lg:pb-0">
          {children}
        </main>

        {/* mobile bottom tab navigation - app-style */}
        <MobileBottomNav />

        {/* footer - desktop and mobile */}
        <Footer config={config} />
      </body>
    </html>
  );
}