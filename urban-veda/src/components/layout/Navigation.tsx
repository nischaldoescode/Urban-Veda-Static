/**
 * main desktop navigation component
 * displays logo and navigation links
 * features scroll-based background opacity and border effects
 * no hamburger menu - mobile uses bottom tab bar
 */
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Leaf } from "lucide-react";

interface NavigationProps {
  config: {
    logoName: string;
    logoImage?: string;
  };
  onMobileMenuOpen: () => void; // kept for compatibility but not used
}

export default function Navigation({ config }: NavigationProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  // detect scroll for background effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "home", path: "/" },
    { name: "juices", path: "/products" },
    { name: "philosophy", path: "/philosophy" },
    { name: "about", path: "/about" },
    { name: "contact", path: "/contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-100"
          : "bg-white/70 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* logo section */}
        <Link href="/" className="flex items-center space-x-3 group">
          {config.logoImage ? (
            <div className="relative w-12 h-12">
              <Image
                src={config.logoImage}
                alt={config.logoName}
                fill
                className="object-contain"
              />
            </div>
          ) : (
            <div className="bg-olive p-2 rounded-xl text-white group-hover:rotate-6 transition-transform duration-300">
              <Leaf size={24} />
            </div>
          )}
          <span className="font-serif text-2xl sm:text-3xl font-bold text-sage-dark tracking-tight">
            {config.logoName}
          </span>
        </Link>

        {/* desktop navigation links - hidden on mobile */}
        <div className="hidden lg:flex items-center space-x-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;

            return (
              <Link key={link.path} href={link.path} className="relative group">
                <span
                  className={`text-sm font-bold tracking-widest uppercase transition-colors ${
                    isActive
                      ? "text-olive"
                      : "text-gray-500 group-hover:text-olive"
                  }`}
                >
                  {link.name}
                </span>

                {/* active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-2 left-0 right-0 h-0.5 bg-olive"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}

                {/* hover indicator */}
                <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-olive scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Link>
            );
          })}
        </div>

        {/* mobile: logo only, navigation in bottom tab bar */}
      </div>
    </motion.nav>
  );
}
