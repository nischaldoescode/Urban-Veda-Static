// root layout - wraps all pages with global providers and metadata
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import '../styles/globals.css';
import connectDB from '@/lib/mongodb';

// load fonts with next/font for optimization
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

// default metadata - pages can override
export const metadata: Metadata = {
  metadataBase: new URL("https://urbanveda.com"),
  title: {
    default: 'Urban Veda | Ancient Wisdom for Modern Life',
    template: '%s | Urban Veda',
  },
  description: 'Premium Ayurvedic herbal juices crafted for modern lifestyles. Freshly made, preservative-free, delivered daily.',
  keywords: ['ayurveda', 'herbal juice', 'detox', 'health', 'wellness', 'organic'],
  authors: [{ name: 'Urban Veda' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://urbanveda.com',
    siteName: 'Urban Veda',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // initialize database connection on server startup
  await connectDB();

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}