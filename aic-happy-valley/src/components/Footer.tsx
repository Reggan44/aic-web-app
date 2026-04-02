import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Youtube, Instagram, Download, LogIn, BookOpen, Lightbulb } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-brand-beige border-t border-brand-cream pt-12 pb-8 text-brand-darkGrey">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="AIC Happy Valley" className="h-10 w-auto object-contain" />
              <span className="text-xl font-black tracking-tighter">
                AIC <span className="text-brand-sage">Happy Valley</span>
              </span>
            </Link>
            <p className="text-sm text-brand-grey/70 leading-relaxed">
              Growing Deeper, Living Stronger. Join us every Sunday as we worship and grow in the Word of God.
            </p>
            {/* Download App CTA */}
            <div className="mt-6 space-y-2">
              <Link
                to="/contact"
                className="flex items-center gap-2 bg-brand-sage text-brand-darkGrey px-4 py-2.5 rounded-full font-bold text-sm hover:bg-brand-sage/80 transition-all w-fit"
              >
                <Download size={16} />
                Download App
              </Link>
              <Link
                to="/login"
                className="flex items-center gap-2 text-brand-darkGrey/70 hover:text-brand-sage text-sm font-medium transition-colors"
              >
                <LogIn size={14} />
                Admin Login
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-brand-darkGrey text-sm font-black mb-4 uppercase tracking-widest">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/about" className="hover:text-brand-sage transition font-medium">About Us</Link></li>
              <li><Link to="/sermons" className="hover:text-brand-sage transition font-medium">Sermons</Link></li>
              <li><Link to="/ministries" className="hover:text-brand-sage transition font-medium">Ministries</Link></li>
              <li><Link to="/events" className="hover:text-brand-sage transition font-medium">Events</Link></li>
              <li><Link to="/giving" className="hover:text-brand-sage transition font-medium">Giving</Link></li>
            </ul>
          </div>

          {/* App Exclusive */}
          <div>
            <h3 className="text-brand-darkGrey text-sm font-black mb-4 uppercase tracking-widest">App Features</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/daily-word" className="hover:text-brand-sage transition font-medium flex items-center gap-2">
                  <Lightbulb size={14} className="text-brand-sage" />
                  Daily Word
                </Link>
              </li>
              <li>
                <Link to="/bible" className="hover:text-brand-sage transition font-medium flex items-center gap-2">
                  <BookOpen size={14} className="text-brand-sage" />
                  Holy Bible
                </Link>
              </li>
              <li><Link to="/contact" className="hover:text-brand-sage transition font-medium">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-brand-darkGrey text-sm font-black mb-4 uppercase tracking-widest">Contact</h3>
            <ul className="space-y-3 text-sm mb-6">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-brand-sage mt-0.5 shrink-0" />
                <span className="text-brand-grey/80">Happy Valley Area, Thika, Kenya</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-brand-sage shrink-0" />
                <span className="text-brand-grey/80">+254 712 822 424</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-brand-sage shrink-0" />
                <span className="text-brand-grey/80">aichappyvalley@gmail.com</span>
              </li>
            </ul>
            <h3 className="text-brand-darkGrey text-sm font-black mb-3 uppercase tracking-widest">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-brand-sage transition" aria-label="Facebook"><Facebook size={22} /></a>
              <a href="#" className="hover:text-brand-sage transition" aria-label="YouTube"><Youtube size={22} /></a>
              <a href="#" className="hover:text-brand-gold transition" aria-label="Instagram"><Instagram size={22} /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-brand-darkGrey/10 pt-6 text-sm text-center text-brand-grey/60">
          <p>&copy; {new Date().getFullYear()} AIC Happy Valley. All rights reserved. · Built with ❤️ for the Kingdom</p>
          <div className="mt-2 flex justify-center gap-4 font-bold">
            <Link to="/privacy" className="hover:text-brand-sage transition-colors">Privacy Policy</Link>
            <span className="opacity-20">•</span>
            <Link to="/terms" className="hover:text-brand-sage transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
