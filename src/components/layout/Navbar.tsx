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
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
      scrolled 
        ? 'py-4 px-4' 
        : 'bg-transparent py-8 px-4'
    }`}>
      <div className={`max-w-7xl mx-auto px-6 py-4 transition-all duration-500 rounded-full ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] border border-white/40 translate-y-2' 
          : 'bg-transparent border-transparent'
      }`}>
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-4 group">
            <div className={`transition-all duration-500 overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.1)] aspect-square bg-black flex items-center justify-center rounded-full shrink-0 ${
              scrolled ? 'w-10 h-10' : 'w-12 h-12 md:w-16 md:h-16'
            }`}>
              <img 
                src="/logo.png" 
                alt="AIC Happy Valley" 
                className="w-full h-full object-cover scale-[1.15]" 
                onError={(e) => {
                  e.currentTarget.src = "/pwa-192x192.png";
                }}
              />
            </div>
            <span className={`font-semibold tracking-[0.05em] uppercase transition-all duration-500 ${
              scrolled ? 'text-xs md:text-sm text-brand-grey' : 'text-sm md:text-lg text-brand-grey'
            }`} style={{ fontFamily: "'Montserrat', sans-serif" }}>
              AIC <span className="text-brand-sage">Happy Valley</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div id="tour-menu" className="hidden lg:flex items-center space-x-6">
            {activeNavLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                id={link.name === 'Bible' ? 'tour-bible' : link.name === 'Daily Word' ? 'tour-daily' : undefined}
                className="text-[10px] font-medium text-brand-grey/60 hover:text-brand-sage uppercase tracking-[0.2em] transition-all"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTAs */}
          <div className="hidden md:flex items-center pl-6">
            {user ? (
              <Link to="/admin">
                <button className="px-6 py-2.5 rounded-full bg-brand-grey text-white text-[10px] font-medium uppercase tracking-[0.15em] hover:bg-brand-sage transition-all shadow-lg shadow-brand-grey/5" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Dashboard
                </button>
              </Link>
            ) : (
              <Link to="/login">
                <button className="px-6 py-2.5 rounded-full bg-brand-sage text-brand-grey text-[10px] font-medium uppercase tracking-[0.15em] hover:bg-brand-grey hover:text-white transition-all shadow-lg shadow-brand-sage/5" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Login
                </button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center">
            <button
              id="mobile-menu-btn"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full text-brand-grey hover:bg-brand-sage/10 transition-colors"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="lg:hidden mt-4 mx-4 bg-white/95 backdrop-blur-2xl border border-white/40 rounded-[2rem] p-10 space-y-4 shadow-2xl overflow-hidden"
        >
          {activeNavLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block text-sm font-semibold text-brand-grey/70 hover:text-brand-sage uppercase tracking-[0.2em] transition-colors py-2"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-6 border-t border-brand-sage/10 flex flex-col gap-4">
            {user ? (
              <Link to="/admin" onClick={() => setIsOpen(false)}>
                <button className="w-full py-4 rounded-xl bg-brand-grey text-white text-xs font-semibold uppercase tracking-[0.2em]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Admin Dashboard
                </button>
              </Link>
            ) : (
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <button className="w-full py-4 rounded-xl bg-brand-sage text-brand-grey text-xs font-semibold uppercase tracking-[0.2em]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Login
                </button>
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
