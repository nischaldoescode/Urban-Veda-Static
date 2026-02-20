"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag, Sparkles, Info, Mail } from "lucide-react";
import { motion } from "framer-motion";

interface MobileBottomNavProps {
  navBgColor?: string;
}

export default function MobileBottomNav({ navBgColor }: MobileBottomNavProps) {
  const pathname = usePathname();

  const navItems = [
    { name: "home", path: "/", icon: Home },
    { name: "juices", path: "/products", icon: ShoppingBag },
    { name: "philosophy", path: "/philosophy", icon: Sparkles },
    { name: "about", path: "/about", icon: Info },
    { name: "contact", path: "/contact", icon: Mail },
  ];

  return (
    <div className="lg:hidden fixed bottom-4 left-4 right-4 z-50 flex justify-center pointer-events-none">
      <nav 
        style={navBgColor ? { backgroundColor: navBgColor } : undefined}
        className={`pointer-events-auto flex items-center gap-0.5 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-xl px-1.5 py-1.5 ${
          navBgColor ? '' : 'bg-white/95'
        }`}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;

          return (
            <Link
              key={item.path}
              href={item.path}
              className="relative flex flex-col items-center justify-center flex-1 px-3 py-2 rounded-xl transition-all"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabFrontend"
                  className="absolute inset-0 bg-olive/10 rounded-xl"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <div className="relative z-10 flex flex-col items-center gap-0.5">
                <Icon
                  size={18}
                  className={`transition-colors ${isActive ? "text-olive" : "text-gray-400"}`}
                />
                <span
                  className={`text-[9px] font-bold uppercase tracking-tight transition-colors ${isActive ? "text-olive" : "text-gray-400"}`}
                >
                  {item.name}
                </span>
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}