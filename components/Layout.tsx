
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf, Home, ShoppingBag, Info, Settings, Sparkles } from 'lucide-react';
import { getAppState } from '../store';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [config, setConfig] = useState(() => getAppState().config);

  // Re-sync UI if store changes (e.g., from Admin)
  useEffect(() => {
    const handleUpdate = () => {
      const currentState = getAppState();
      setConfig(currentState.config);
    };
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
      {/* Announcement Bar */}
      <div className="bg-sage-dark text-white py-2 px-4 text-center text-[10px] md:text-xs font-bold tracking-widest uppercase">
        {config.announcement}
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 h-20 items-center justify-between px-12 transition-all">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="bg-olive p-1.5 rounded-lg text-white group-hover:rotate-12 transition-transform">
            <Leaf size={18} />
          </div>
          <span className="serif text-2xl font-bold text-sage-dark tracking-tight">{config.logoName}</span>
        </Link>
        
        <div className="flex space-x-10 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-semibold transition-all hover:text-olive relative pb-1 ${
                location.pathname === link.path ? 'text-olive border-b-2 border-olive' : 'text-gray-400'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/admin" className="ml-4 p-2 bg-gray-50 text-gray-400 hover:text-olive hover:bg-olive/10 rounded-full transition-all">
            <Settings size={18} />
          </Link>
        </div>
      </nav>

      {/* Mobile Top Header */}
      <div className="md:hidden fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 h-14 flex items-center justify-between px-5">
        <Link to="/" className="flex items-center space-x-2">
           <Leaf className="text-olive" size={20} />
           <span className="serif text-lg font-bold text-sage-dark">{config.logoName}</span>
        </Link>
        <Link to="/admin" className="text-gray-300">
           <Settings size={18} />
        </Link>
      </div>

      {/* Content Body */}
      <main className="md:pt-20 pt-14">
        {children}
      </main>

      {/* App-Style Bottom Navigation for Mobile */}
      <nav className="md:hidden fixed bottom-0 w-full z-50 bg-white/95 backdrop-blur-xl border-t border-gray-100 h-16 flex items-center justify-around px-2 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`flex flex-col items-center justify-center w-full h-full transition-all ${
                isActive ? 'text-olive' : 'text-gray-300'
              }`}
            >
              <div className={`p-1.5 rounded-xl transition-all ${isActive ? 'bg-olive/10 scale-110' : ''}`}>
                <Icon size={20} />
              </div>
              <span className={`text-[9px] font-bold mt-1 uppercase tracking-tighter ${isActive ? 'opacity-100' : 'opacity-60'}`}>
                {link.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Desktop Footer Only */}
      <footer className="hidden md:block py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h4 className="serif text-xl font-bold text-sage-dark mb-4">{config.logoName}</h4>
            <p className="text-sm text-gray-500 italic max-w-xs">{config.metaDescription}</p>
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Explore</h4>
            <div className="flex flex-col space-y-3">
              <Link to="/products" className="text-sm text-gray-600 hover:text-olive">Juice Range</Link>
              <Link to="/philosophy" className="text-sm text-gray-600 hover:text-olive">Our Science</Link>
              <Link to="/admin" className="text-sm text-gray-600 hover:text-olive">Admin Panel</Link>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Contact</h4>
            <p className="text-sm text-gray-600 mb-2">Bangalore, Sobha City Residents Exclusive</p>
            <a href={config.whatsappLink} className="text-sm font-bold text-olive">Join WhatsApp Group</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
