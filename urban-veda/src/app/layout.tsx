/**
 * root layout component
 *
 * purpose:
 * - wraps all pages with consistent navigation and footer
 * - loads google fonts with optimization
 * - fetches site configuration from api on mount
 * - provides app-style bottom navigation on mobile devices
 *
 * structure:
 * - desktop: top navigation bar with links
 * - mobile: bottom tab bar (app-style)
 * - both: footer with links and social media
 *
 * fonts:
 * - inter: body text (sans-serif)
 * - playfair display: headings (serif)
 *
 * state management:
 * - config: site configuration from mongodb
 *
 * @component
 */
"use client";

import { Inter, Playfair_Display } from "next/font/google";
import { useState, useEffect } from "react";
import "../styles/globals.css";
import { usePathname } from "next/navigation";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import MobileBottomNav from "@/components/layout/MobileBottomNav";

// load google fonts with optimization
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
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
  footerTagline?: string;
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
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
  const pathname = usePathname();
  // site configuration state with defaults
  const [config, setConfig] = useState<LayoutConfig>({
    logoName: "Urban Veda",
    logoImage: undefined,
    whatsappLink: "https://chat.whatsapp.com/HGAz9W01xJsHpIHnGUn38M",
    footerTagline: "ancient wisdom for a modern world.",
    socialLinks: { instagram: "#", facebook: "#", twitter: "#" },
  });

  const isAdminRoute = pathname?.startsWith("/admin");
  /**
   * fetch site configuration from api on component mount
   * updates config state with database values
   * handles errors gracefully with console logging
   */
  useEffect(() => {
    async function fetchConfig() {
      try {
        const res = await fetch("/api/config");
        const data = await res.json();

        if (data.success) {
          setConfig({
            logoName: data.data.logoName,
            logoImage: data.data.logoImage,
            whatsappLink: data.data.whatsappLink,
            footerTagline: data.data.footerTagline,
            socialLinks: data.data.socialLinks,
          });
        }
      } catch (error) {
        console.error("failed to fetch config:", error);
      }
    }

    fetchConfig();
  }, []);

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased">
        {/* only show public nav if NOT on admin routes */}
        {!isAdminRoute && (
          <>
            <Navigation config={config} onMobileMenuOpen={() => {}} />
          </>
        )}

        {/* main content - admin layout handles its own wrapper */}
        <main className={!isAdminRoute ? "min-h-screen pb-24 lg:pb-0" : ""}>
          {children}
        </main>

        {/* only show public nav/footer if NOT on admin routes */}
        {!isAdminRoute && (
          <>
            <MobileBottomNav />
            <Footer config={config} />
          </>
        )}
      </body>
    </html>
  );
}
