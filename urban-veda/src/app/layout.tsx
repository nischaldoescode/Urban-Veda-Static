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
 * navigation item interface
 * defines shape of navigation links fetched from database
 */
interface NavItem {
  id: string;
  name: string;
  path: string;
  order: number;
  isVisible: boolean;
}

/**
 * layout configuration interface
 * defines shape of config object fetched from api
 */
interface LayoutConfig {
  logoName: string;
  logoImage?: string;
  navBgColor?: string;
  whatsappLink: string;
  footerTagline?: string;
  navItems?: NavItem[];
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
    navBgColor: undefined,
    whatsappLink: "https://chat.whatsapp.com/HGAz9W01xJsHpIHnGUn38M",
    footerTagline: "ancient wisdom for a modern world.",
    navItems: undefined,
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
        // First, initialize CSRF token
        await fetch("/api/csrf/init", {
          method: "POST",
          headers: {
            "x-app-request": "urbanveda-internal",
          },
        });

        // Then fetch config with protection
        const res = await fetch("/api/config", {
          headers: {
            "x-app-request": "urbanveda-internal",
          },
        });
        const data = await res.json();

        if (data.success) {
          setConfig({
            logoName: data.data.logoName,
            logoImage: data.data.logoImage,
            navBgColor: data.data.navBgColor,
            whatsappLink: data.data.whatsappLink,
            footerTagline: data.data.footerTagline,
            socialLinks: data.data.socialLinks,
            navItems: data.data.navItems,
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
            <Navigation
              config={{
                logoName: config.logoName,
                logoImage: config.logoImage,
                navBgColor: config.navBgColor,
              }}
              navItems={config.navItems}
              onMobileMenuOpen={() => {}}
            />
          </>
        )}

        {/* main content - admin layout handles its own wrapper */}
        <main className={!isAdminRoute ? "min-h-screen pb-24 lg:pb-0" : ""}>
          {children}
        </main>

        {/* only show public nav/footer if NOT on admin routes */}
        {!isAdminRoute && (
          <>
            <MobileBottomNav navBgColor={config.navBgColor} />
            <Footer config={config} />
          </>
        )}
      </body>
    </html>
  );
}
