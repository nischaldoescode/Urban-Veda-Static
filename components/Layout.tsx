
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf, Home, ShoppingBag, Info, Sparkles } from 'lucide-react';
import { getAppState } from '../store';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [config, setConfig] = useState(() => getAppState().config);

  useEffect(() => {
    const handleUpdate = () => setConfig(getAppState().config);
    window.addEventListener('app_state_updated', handleUpdate);
    return () => window.removeEventListener('app_state_updated', handleUpdate);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Juices', path: '/products', icon: ShoppingBag },
    { name: 'Philosophy', path: '/philosophy', icon: Sparkles },
    { name: 'About', path: '/about', icon: Info },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Dynamic Announcement */}
      <div className="bg-[#1a251a] text-white py-2 px-4 text-center text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase">
        {config.announcement}
      </div>

      {/* Modern Desktop Navigation */}
      <nav className="hidden md:flex fixed top-0 w-full z-50 bg-white/70 backdrop-blur-2xl border-b border-gray-100 h-20 items-center justify-between px-16 transition-all">
        <Link to="/" className="flex items-center space-x-3 group">
          {config.logoImage ? (
            <img src={config.logoImage} alt={config.logoName} className="h-10 w-auto object-contain" />
          ) : (
            <div className="flex items-center space-x-2">
              <div className="bg-olive p-1.5 rounded-lg text-white group-hover:rotate-6 transition-transform">
                <Leaf size={18} />
              </div>
              <span className="serif text-2xl font-bold text-sage-dark tracking-tight">{config.logoName}</span>
            </div>
          )}
        </Link>
        
        <div className="flex space-x-12 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-[13px] font-bold tracking-widest uppercase transition-all hover:text-olive ${
                location.pathname === link.path ? 'text-olive border-b-2 border-olive pb-1' : 'text-gray-400'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile Nav */}
      <div className="md:hidden fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 h-16 flex items-center justify-center">
         <span className="serif text-xl font-bold text-sage-dark tracking-tight">{config.logoName}</span>
      </div>

      <main className="md:pt-20 pt-16">
        {children}
      </main>

      {/* Footer & Secret Admin Link */}
      <footer className="py-24 bg-gray-50 border-t border-gray-100 px-8">
        <div className="max-w-7xl mx-auto flex flex-col items-center space-y-12">
          <div className="flex space-x-8 text-xs font-bold text-gray-400 tracking-widest uppercase">
            <Link to="/products" className="hover:text-olive">Products</Link>
            <Link to="/philosophy" className="hover:text-olive">Philosophy</Link>
            <Link to="/about" className="hover:text-olive">Founders</Link>
          </div>
          
          <div className="text-center space-y-4">
             <p className="text-sm text-gray-400 italic">© 2024 {config.logoName}. Ancient Wisdom for a Modern World.</p>
             <Link to="/admin" className="text-[10px] text-gray-300 hover:text-gray-500 transition-colors uppercase tracking-[0.3em]">Management Portal</Link>
          </div>
        </div>
      </footer>

      {/* Bottom Nav for Mobile */}
      <nav className="md:hidden fixed bottom-0 w-full z-50 bg-white/95 backdrop-blur-2xl border-t border-gray-100 h-20 flex items-center justify-around px-4 pb-4">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path;
          return (
            <Link key={link.path} to={link.path} className={`flex flex-col items-center justify-center w-full transition-all ${isActive ? 'text-olive' : 'text-gray-300'}`}>
              <Icon size={22} className={isActive ? 'scale-110 mb-1' : 'mb-1'} />
              <span className="text-[9px] font-bold uppercase tracking-tighter">{link.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Layout;
