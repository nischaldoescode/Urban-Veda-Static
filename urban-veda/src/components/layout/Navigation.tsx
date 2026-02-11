// main desktop navigation with scroll effects
'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Leaf, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavigationProps {
  config: {
    logoName: string;
    logoImage?: string;
    announcement: string;
  };
  onMobileMenuOpen: () => void;
}

export default function Navigation({ config, onMobileMenuOpen }: NavigationProps) {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  // background opacity based on scroll
  const navBackground = useTransform(
    scrollY,
    [0, 100],
    ['rgba(255, 255, 255, 0.7)', 'rgba(255, 255, 255, 0.95)']
  );

  const borderOpacity = useTransform(scrollY, [0, 100], [0, 1]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'home', path: '/' },
    { name: 'juices', path: '/products' },
    { name: 'philosophy', path: '/philosophy' },
    { name: 'about', path: '/about' },
    { name: 'contact', path: '/contact' },
  ];

  return (
    <>
      {/* announcement bar */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-sage-dark text-white py-3 px-4 text-center text-xs sm:text-sm font-bold tracking-wider uppercase relative overflow-hidden"
      >
        {/* animated background gradient */}
        <motion.div
          animate={{
            x: ['0%', '100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-olive/20 to-transparent"
        />
        <span className="relative z-10">{config.announcement}</span>
      </motion.div>

      {/* main navigation */}
      <motion.nav
        style={{
          backgroundColor: navBackground,
          borderBottomColor: `rgba(229, 231, 235, ${borderOpacity})`,
        }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? 'shadow-lg backdrop-blur-xl' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            {config.logoImage ? (
              <div className="relative w-10 h-10 sm:w-12 sm:h-12">
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
            <span className="font-serif text-2xl sm:text-3xl font-bold text-sage-dark tracking-tight hidden sm:block">
              {config.logoName}
            </span>
          </Link>

          {/* desktop navigation links */}
          <div className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className="relative group"
                >
                  <span
                    className={`text-sm font-bold tracking-widest uppercase transition-colors ${
                      isActive
                        ? 'text-olive'
                        : 'text-gray-500 group-hover:text-olive'
                    }`}
                  >
                    {link.name}
                  </span>
                  
                  {/* active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-2 left-0 right-0 h-0.5 bg-olive"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  
                  {/* hover indicator */}
                  <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-olive scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </Link>
              );
            })}
          </div>

          {/* mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onMobileMenuOpen}
            className="lg:hidden"
          >
            <Menu className="text-sage-dark" size={24} />
          </Button>
        </div>
      </motion.nav>

      {/* spacer to prevent content jump */}
      <div className="h-[92px]" /> {/* announcement (48px) + nav (80px) */}
    </>
  );
}