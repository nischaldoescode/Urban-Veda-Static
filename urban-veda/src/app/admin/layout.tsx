"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  Settings,
  Image as ImageIcon,
  Palette,
  FileText,
  X,
  LogOut,
  Home,
  Leaf,
  Navigation as NavIcon,
  Menu,
} from "lucide-react";
import { ToastProvider } from "@/components/ui/toast-provider";

const navItems = [
  { name: "dashboard", path: "/admin", icon: LayoutDashboard },
  { name: "products", path: "/admin/products", icon: Package },
  { name: "pages", path: "/admin/pages", icon: FileText },
  { name: "navigation", path: "/admin/navigation", icon: NavIcon },
  { name: "media", path: "/admin/media", icon: ImageIcon },
  { name: "settings", path: "/admin/settings", icon: Settings },
];

const mobileNavItems = [
  { name: "dash", path: "/admin", icon: LayoutDashboard },
  { name: "products", path: "/admin/products", icon: Package },
  { name: "pages", path: "/admin/pages", icon: FileText },
  { name: "nav", path: "/admin/navigation", icon: NavIcon },
  { name: "settings", path: "/admin/settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    setIsMounted(true);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // close drawer when route changes
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  useEffect(() => {
    async function checkAuth() {
      if (pathname === "/admin/login") {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch("/api/auth/verify");
        if (res.ok) {
          setIsAuthenticated(true);
          setLoading(false);
        } else {
          router.push("/admin/login");
        }
      } catch {
        router.push("/admin/login");
      }
    }
    checkAuth();
  }, [pathname, router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {}
    router.push("/admin/login");
  };

  if (pathname === "/admin/login") return <>{children}</>;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-olive border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-gray-400 text-sm">verifying...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;
  if (!isMounted) return null;

  const SidebarContent = ({ onClose }: { onClose?: () => void }) => (
    <>
      {/* header */}
      <div className="h-14 border-b border-gray-100 flex items-center justify-between px-4 flex-shrink-0">
        <Link
          href="/"
          className="flex items-center gap-2 group"
          onClick={onClose}
        >
          <div className="bg-olive p-1.5 rounded-lg text-white group-hover:rotate-6 transition-transform duration-300">
            <Leaf size={16} />
          </div>
          <div>
            <p className="font-serif text-sm font-bold text-sage-dark leading-none">
              urban veda
            </p>
            <p className="text-[9px] text-gray-400 uppercase tracking-widest">
              admin
            </p>
          </div>
        </Link>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        <div className="space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm font-semibold ${
                  isActive
                    ? "bg-olive text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <Icon size={16} />
                <span className="capitalize">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* footer */}
      <div className="border-t border-gray-100 p-2 space-y-0.5 flex-shrink-0">
        <Link
          href="/"
          target="_blank"
          onClick={onClose}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-all"
        >
          <Home size={16} />
          <span>view site</span>
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-red-500 hover:text-red-600 hover:bg-red-50 transition-all"
        >
          <LogOut size={16} />
          <span>logout</span>
        </button>
      </div>
    </>
  );

  return (
    <ToastProvider>
      <div className="min-h-screen bg-gray-50 flex overflow-hidden">
        {/* DESKTOP SIDEBAR — only in DOM on desktop */}
        {isDesktop && (
          <aside className="w-56 bg-white border-r border-gray-200 fixed top-0 left-0 h-screen z-40 flex flex-col">
            <SidebarContent />
          </aside>
        )}

        {/* MOBILE DRAWER — only in DOM on mobile */}
        {!isDesktop && (
          <>
            <AnimatePresence>
              {drawerOpen && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => setDrawerOpen(false)}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                  />
                  <motion.aside
                    initial={{ x: -240 }}
                    animate={{ x: 0 }}
                    exit={{ x: -240 }}
                    transition={{ type: "spring", stiffness: 320, damping: 32 }}
                    className="fixed top-0 left-0 h-screen w-56 bg-white border-r border-gray-200 z-50 flex flex-col"
                  >
                    <SidebarContent onClose={() => setDrawerOpen(false)} />
                  </motion.aside>
                </>
              )}
            </AnimatePresence>
          </>
        )}

        {/* MAIN CONTENT */}
        <div
          className="flex-1 flex flex-col min-h-screen transition-all duration-300 overflow-x-hidden"
          style={{ marginLeft: isDesktop ? "224px" : "0" }}
        >
          {/* mobile top bar */}
          {!isDesktop && (
            <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 sticky top-0 z-30">
              <div className="flex items-center gap-2">
                <div className="bg-olive p-1.5 rounded-md text-white">
                  <Leaf size={14} />
                </div>
                <div>
                  <span className="font-serif text-sm font-bold text-sage-dark block leading-none">
                    urban veda
                  </span>
                  <span className="text-[9px] text-gray-400 uppercase tracking-widest">
                    admin panel
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href="/"
                  target="_blank"
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500"
                >
                  <Home size={16} />
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-500"
                >
                  <LogOut size={16} />
                </button>
              </div>
            </header>
          )}

          {/* page content */}
          <main className="flex-1 overflow-x-hidden overflow-y-auto pb-20 lg:pb-6">
            {children}
          </main>

          {/* MOBILE BOTTOM FLOATING NAV */}
          {!isDesktop && (
            <div className="fixed bottom-4 left-4 right-4 z-30 flex justify-center pointer-events-none">
              <nav className="pointer-events-auto flex items-center gap-1 bg-white border border-gray-200 rounded-2xl shadow-xl px-1.5 py-1.5">
                {mobileNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      className={`flex flex-col items-center justify-center gap-0.5 px-3 py-2 rounded-xl transition-all ${
                        isActive
                          ? "bg-olive text-white"
                          : "text-gray-400 hover:text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <Icon size={16} />
                      <span className="text-[9px] font-bold uppercase tracking-tight leading-none">
                        {item.name}
                      </span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          )}
        </div>
      </div>
    </ToastProvider>
  );
}
