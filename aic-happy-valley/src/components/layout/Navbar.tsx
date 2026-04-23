import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../elements/Button';
import { Menu, X, Bell } from 'lucide-react';
import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../../lib/firebase';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return () => unsub();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Sermons', path: '/sermons' },
    { name: 'Bible', path: '/bible' },
    { name: 'Daily Word', path: '/daily-word' },
    { name: 'Ministries', path: '/ministries' },
    { name: 'Events', path: '/events' },
    { name: 'Giving', path: '/giving' },
    { name: 'Contact', path: '/contact' },
  ];

  const activeNavLinks = user 
    ? [...navLinks, { name: 'Admin', path: '/admin' }]
    : navLinks;

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-background/80 backdrop-blur-md py-4 shadow-sm border-b border-brand-sage/10' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-24 h-24 rounded-full overflow-hidden shadow-md transition-transform group-hover:scale-110 shrink-0 aspect-square border-2 border-brand-sage/20 bg-white flex items-center justify-center">
              <img 
                src="/logo.png" 
                alt="AIC Happy Valley" 
                className="w-full h-full object-cover" 
                onError={(e) => {
                  e.currentTarget.src = "/pwa-192x192.png"; // Fallback to PWA icon
                }}
              />
            </div>
            <span className="text-2xl font-black tracking-tighter text-brand-grey group-hover:text-brand-sage transition-colors">
              AIC <span className="text-brand-sage">Happy Valley</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {activeNavLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className="px-5 py-2 text-[13px] font-bold text-brand-grey/70 hover:text-brand-sage uppercase tracking-widest transition-all rounded-full hover:bg-brand-sage/5"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTAs */}
          <div className="hidden md:flex items-center gap-4 border-l border-brand-sage/20 pl-6 ml-4">
            {user ? (
              <Link to="/admin">
                <Button size="sm" className="rounded-full bg-brand-sage text-brand-grey font-bold shadow-md shadow-brand-sage/10 hover:scale-105 transition-all">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button size="sm" className="rounded-full bg-brand-sage text-brand-grey font-bold shadow-md shadow-brand-sage/10 hover:scale-105 transition-all">
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full text-brand-grey hover:bg-brand-sage/10 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden bg-background/95 backdrop-blur-xl border-b border-brand-sage/10 absolute top-full left-0 w-full p-8 space-y-6 shadow-2xl"
        >
          {activeNavLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block text-2xl font-black text-brand-grey hover:text-brand-sage transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-6 border-t border-brand-sage/10 flex flex-col gap-4">
            {user ? (
              <Link to="/admin" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full rounded-full py-7 border-brand-sage/30 text-brand-grey font-bold text-lg">
                  Admin Dashboard
                </Button>
              </Link>
            ) : (
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full rounded-full py-7 border-brand-sage/30 text-brand-grey font-bold text-lg">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
