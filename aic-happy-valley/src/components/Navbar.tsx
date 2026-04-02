import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MenuToggleIcon } from './ui/menu-toggle-icon';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, LogIn } from 'lucide-react';

declare global {
  interface Window {
    triggerPWAInstall: () => void;
  }
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Sermons', path: '/sermons' },
    { name: 'Events', path: '/events' },
    { name: 'Ministries', path: '/ministries' },
    { name: 'Daily Word', path: '/daily-word' },
    { name: 'Bible', path: '/bible' },
    { name: 'Giving', path: '/giving' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-brand-cream/95 backdrop-blur-md sticky top-0 z-50 border-b border-brand-beige shadow-sm pt-safe">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 md:h-24">

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-3 p-2 -ml-2 rounded-xl">
              <img src="/logo.png" alt="AIC Happy Valley" className="h-10 w-auto xs:h-12 object-contain" />
              <span className="text-xl font-black tracking-tighter text-brand-darkGrey hidden sm:block">
                AIC <span className="text-brand-sage">Happy Valley</span>
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-brand-sage px-2 py-1 ${
                  isActive(link.path)
                    ? 'text-brand-sage border-b-2 border-brand-sage pb-0.5'
                    : 'text-brand-darkGrey'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/login"
              className="flex items-center gap-1.5 text-sm font-semibold text-brand-darkGrey hover:text-brand-sage transition-colors px-4 py-2 rounded-full hover:bg-brand-sage/10"
            >
              <LogIn size={16} />
              Login
            </Link>
            <button
              onClick={() => window.triggerPWAInstall?.()}
              className="flex items-center gap-1.5 bg-brand-sage text-brand-darkGrey px-6 py-3 rounded-full font-bold hover:bg-brand-sage/80 transition-all shadow-sm"
            >
              <Download size={16} />
              Get App
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <Link to="/login" className="p-3 text-brand-darkGrey hover:text-brand-sage rounded-full flex items-center justify-center">
              <LogIn size={24} />
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-3 text-brand-darkGrey hover:text-brand-sage focus:outline-none rounded-full flex items-center justify-center"
              aria-label="Toggle Menu"
            >
              <MenuToggleIcon open={isOpen} className="size-7" duration={300} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-brand-cream/98 backdrop-blur-xl border-b border-brand-beige shadow-xl"
          >
            <div className="px-4 pt-2 pb-8 space-y-2 pb-safe">
              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-5 py-4 rounded-2xl text-lg font-bold transition-all ${
                    isActive(link.path)
                      ? 'text-brand-sage bg-brand-sage/10'
                      : 'text-brand-darkGrey active:bg-brand-sage/5'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-brand-beige mt-4">
                <button
                  onClick={() => { setIsOpen(false); window.triggerPWAInstall?.(); }}
                  className="flex items-center justify-center gap-3 w-full py-4 bg-brand-sage text-brand-darkGrey rounded-2xl font-black shadow-lg active:scale-95 transition-transform"
                >
                  <Download size={20} />
                  Download App
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
