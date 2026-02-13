/**
 * mobile bottom navigation bar
 * app-style bottom tab navigation with icons
 * highlights active route and provides smooth transitions
 * fixed to bottom of viewport on mobile devices only
 */
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBag, Sparkles, Info, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MobileBottomNav() {
  const pathname = usePathname();

  // navigation items with icons
  const navItems = [
    { name: 'home', path: '/', icon: Home },
    { name: 'juices', path: '/products', icon: ShoppingBag },
    { name: 'philosophy', path: '/philosophy', icon: Sparkles },
    { name: 'about', path: '/about', icon: Info },
    { name: 'contact', path: '/contact', icon: Mail },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-gray-200 safe-area-bottom">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;

          return (
            <Link
              key={item.path}
              href={item.path}
              className="flex flex-col items-center justify-center flex-1 h-full relative"
            >
              {/* active background indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-olive/10 rounded-2xl mx-1"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}

              {/* icon and label */}
              <div className="relative z-10 flex flex-col items-center space-y-1">
                <Icon
                  size={22}
                  className={`transition-colors ${
                    isActive ? 'text-olive' : 'text-gray-400'
                  }`}
                />
                <span
                  className={`text-[10px] font-bold uppercase tracking-tight transition-colors ${
                    isActive ? 'text-olive' : 'text-gray-400'
                  }`}
                >
                  {item.name}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}