import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Youtube, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-brand-beige border-t border-brand-cream pt-12 pb-8 text-brand-darkGrey">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-2xl font-bold tracking-tighter text-brand-darkGrey">
              AIC <span className="text-brand-sage">Happy Valley</span>
            </Link>
            <p className="mt-4 text-sm">
              Growing Deeper, Living Stronger. Join us every Sunday as we worship and grow in the Word.
            </p>
          </div>
          
          <div>
            <h3 className="text-brand-darkGrey text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-brand-skyBlue transition">About Us</Link></li>
              <li><Link to="/sermons" className="hover:text-brand-skyBlue transition">Sermons</Link></li>
              <li><Link to="/ministries" className="hover:text-brand-skyBlue transition">Ministries</Link></li>
              <li><Link to="/events" className="hover:text-brand-skyBlue transition">Events</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-brand-darkGrey text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-brand-sage" />
                <span>Happy Valley Area, Thika</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-brand-sage" />
                <span>+254 700 000 000</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-brand-sage" />
                <span>info@aichappyvalley.org</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-brand-darkGrey text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-brand-skyBlue transition"><Facebook size={24} /></a>
              <a href="#" className="hover:text-brand-skyBlue transition"><Youtube size={24} /></a>
              <a href="#" className="hover:text-brand-gold transition"><Instagram size={24} /></a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-brand-lightGrey pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} AIC Happy Valley. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
