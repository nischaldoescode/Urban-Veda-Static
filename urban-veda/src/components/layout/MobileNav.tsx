// mobile navigation drawer with animations
"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Home, ShoppingBag, Sparkles, Info, Mail, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  config: {
    logoName: string;
    whatsappLink: string;
  };
}

export default function MobileNav({ isOpen, onClose, config }: MobileNavProps) {
  const pathname = usePathname();

  // prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // close menu on route change
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  const navLinks = [
    { name: "home", path: "/", icon: Home },
    { name: "juices", path: "/products", icon: ShoppingBag },
    { name: "philosophy", path: "/philosophy", icon: Sparkles },
    { name: "about", path: "/about", icon: Info },
    { name: "contact", path: "/contact", icon: Mail },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
          />

          {/* drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-96 bg-white z-50 shadow-2xl lg:hidden overflow-y-auto"
          >
            <div className="p-8 space-y-8">
              {/* header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-olive p-2 rounded-xl text-white">
                    <Leaf size={20} />
                  </div>
                  <span className="font-serif text-2xl font-bold text-sage-dark">
                    {config.logoName}
                  </span>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="rounded-full"
                >
                  <X size={24} />
                </Button>
              </div>

              {/* navigation links */}
              <nav className="space-y-2">
                {navLinks.map((link, i) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.path;

                  return (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.4 }}
                    >
                      <Link href={link.path}>
                        <div
                          className={`flex items-center space-x-4 p-4 rounded-2xl transition-all ${
                            isActive
                              ? "bg-olive text-white shadow-lg"
                              : "text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          <Icon size={22} />
                          <span className="text-lg font-bold capitalize">
                            {link.name}
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* divider */}
              <div className="border-t border-gray-100 pt-8">
                {/* whatsapp cta */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                >
                  <a
                    href={config.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-6 rounded-2xl">
                      join whatsapp community
                    </Button>
                  </a>
                </motion.div>

                {/* footer info */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                  className="mt-8 text-center text-sm text-gray-400"
                >
                  <p>100% organic • no preservatives</p>
                  <p className="mt-1">daily fresh delivery</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
