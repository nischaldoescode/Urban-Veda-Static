/**
 * admin layout wrapper
 * 
 * purpose:
 * - provides dedicated admin interface (no public nav/footer)
 * - handles authentication for all admin routes
 * - includes admin sidebar navigation
 * - responsive with mobile drawer
 * 
 * authentication flow:
 * 1. user visits /admin/*
 * 2. layout checks if authenticated
 * 3. if not authenticated → redirect to /admin/login
 * 4. if authenticated → show admin interface
 * 
 * exception: /admin/login doesn't get wrapped (shows standalone)
 * 
 * @component
 */
'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Package,
  Settings,
  Image as ImageIcon,
  Palette,
  FileText,
  Menu,
  X,
  LogOut,
  Home,
  Leaf,
  Navigation as NavIcon,
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  /**
   * check authentication on mount and route changes
   * protects all admin routes except /admin/login
   */
  useEffect(() => {
    async function checkAuth() {
      // skip auth check for login page
      if (pathname === '/admin/login') {
        setLoading(false);
        return;
      }

      try {
        // check if user has valid session
        const res = await fetch('/api/auth/verify');
        
        if (res.ok) {
          setIsAuthenticated(true);
          setLoading(false);
        } else {
          // not authenticated - redirect to login
          router.push('/admin/login');
        }
      } catch (error) {
        console.error('auth check failed:', error);
        router.push('/admin/login');
      }
    }

    checkAuth();
  }, [pathname, router]);

  /**
   * handle user logout
   * clears session cookie and redirects to login
   */
  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (error) {
      console.error('logout error:', error);
    }
  };

  // don't wrap login page in admin layout
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sage-bg">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-olive border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 font-semibold">verifying authentication...</p>
        </div>
      </div>
    );
  }

  // only show admin interface if authenticated
  if (!isAuthenticated) {
    return null;
  }

  // admin navigation items
  const navItems = [
    { name: 'dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'products', path: '/admin/products', icon: Package },
    { name: 'pages', path: '/admin/pages', icon: FileText },
    { name: 'navigation', path: '/admin/navigation', icon: NavIcon },
    { name: 'media', path: '/admin/media', icon: ImageIcon },
    { name: 'design', path: '/admin/design', icon: Palette },
    { name: 'settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-sage-bg flex">
      {/* mobile sidebar backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* sidebar navigation */}
      <motion.aside
        initial={false}
        animate={{
          x: sidebarOpen ? 0 : -320,
        }}
        className="fixed lg:sticky top-0 left-0 h-screen w-80 bg-white border-r border-gray-200 z-50 flex flex-col shadow-2xl lg:shadow-none lg:translate-x-0"
      >
        {/* sidebar header */}
        <div className="h-20 border-b border-gray-200 flex items-center justify-between px-6">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="bg-olive p-2 rounded-xl text-white group-hover:rotate-6 transition-transform duration-300">
              <Leaf size={20} />
            </div>
            <div>
              <p className="font-serif text-xl font-bold text-sage-dark">
                urban veda
              </p>
              <p className="text-xs text-gray-400 uppercase tracking-widest">
                admin panel
              </p>
            </div>
          </Link>

          {/* close button for mobile */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* navigation links */}
        <nav className="flex-1 overflow-y-auto py-6 px-4">
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all font-semibold text-sm ${
                    isActive
                      ? 'bg-olive text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={20} />
                  <span className="capitalize">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* sidebar footer */}
        <div className="border-t border-gray-200 p-4 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center space-x-3 px-4 py-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <Home size={18} />
            <span className="text-sm font-semibold text-gray-700">
              view site
            </span>
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3 rounded-xl bg-red-50 hover:bg-red-100 transition-colors w-full text-left"
          >
            <LogOut size={18} className="text-red-600" />
            <span className="text-sm font-semibold text-red-600">logout</span>
          </button>
        </div>
      </motion.aside>

      {/* main content area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* mobile header with menu button */}
        <header className="lg:hidden h-16 bg-white border-b border-gray-200 flex items-center px-4 sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu size={24} />
          </button>
          <span className="ml-4 font-serif text-xl font-bold text-sage-dark">
            admin panel
          </span>
        </header>

        {/* page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}