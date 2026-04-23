import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Youtube, Instagram, Database } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-background pt-32 pb-16 text-brand-grey relative overflow-hidden border-t border-brand-sage/10">
      {/* Decorative Blur */}
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-brand-sage/5 rounded-full blur-[80px]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-20">
          <div className="space-y-8">
            <Link to="/" className="flex items-center gap-4 transition-transform hover:scale-105 group">
              <div className="w-24 h-24 rounded-full overflow-hidden shadow-md shadow-brand-sage/10 transition-transform group-hover:scale-110 shrink-0 aspect-square border-2 border-brand-sage/20 bg-white flex items-center justify-center">
                <img 
                  src="/logo.png" 
                  alt="AIC Happy Valley" 
                  className="w-full h-full object-cover" 
                  onError={(e) => {
                    e.currentTarget.src = "/pwa-192x192.png";
                  }}
                />
              </div>
              <span className="text-3xl font-black tracking-tighter group-hover:text-brand-sage transition-colors">
                AIC <span className="text-brand-sage">Happy Valley</span>
              </span>
            </Link>
            <p className="text-muted-foreground leading-relaxed max-w-xs font-medium">
              Growing Deeper, Living Stronger. A peaceful harbor for worship, community, and spiritual growth in the heart of Happy Valley.
            </p>
          </div>
          
          <div className="space-y-8">
            <h3 className="text-[11px] font-bold text-brand-grey/50 uppercase tracking-[0.3em]">Explore</h3>
            <ul className="space-y-4 font-bold text-sm">
              <li><Link to="/about" className="hover:text-brand-sage transition-colors">Our Story</Link></li>
              <li><Link to="/sermons" className="hover:text-brand-sage transition-colors">Sermon Library</Link></li>
              <li><Link to="/ministries" className="hover:text-brand-sage transition-colors">Find Your Place</Link></li>
              <li><Link to="/events" className="hover:text-brand-sage transition-colors">What's Happening</Link></li>
            </ul>
          </div>
          
          <div className="space-y-8">
            <h3 className="text-[11px] font-bold text-brand-grey/50 uppercase tracking-[0.3em]">Connect</h3>
            <ul className="space-y-6 text-sm font-medium">
              <li className="flex items-start gap-4">
                <MapPin size={22} className="text-brand-sage shrink-0" />
                <span className="leading-relaxed">Happy Valley, Thika,<br/>Kiambu County, Kenya</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone size={22} className="text-brand-sage shrink-0" />
                <span>+254 722 000 000</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail size={22} className="text-brand-sage shrink-0" />
                <span>info@aichappyvalley.org</span>
              </li>
            </ul>
          </div>
          
          <div className="space-y-8">
            <h3 className="text-[11px] font-bold text-brand-grey/50 uppercase tracking-[0.3em]">Follow Us</h3>
            <div className="flex gap-4">
              {[
                { icon: Facebook, color: 'hover:bg-brand-sage' },
                { icon: Youtube, color: 'hover:bg-brand-sky' },
                { icon: Instagram, color: 'hover:bg-brand-gold' },
              ].map((social, i) => (
                <a 
                  key={i}
                  href="#" 
                  className={`w-12 h-12 rounded-2xl bg-brand-sage/5 flex items-center justify-center text-brand-grey ${social.color} hover:text-white transition-all transform hover:scale-110 shadow-sm`}
                >
                  <social.icon size={22} />
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="border-t border-brand-sage/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.25em] font-bold text-muted-foreground/60">
          <p>&copy; {new Date().getFullYear()} AIC Happy Valley. Peace to you.</p>
          <div className="flex gap-8">
            <Link to="/privacy" className="hover:text-brand-sage transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-brand-sage transition-colors">Terms</Link>
            <Link to="/login" className="text-brand-gold hover:text-brand-gold/80 transition-colors">Member Portal</Link>
            <Link to="/admin" className="text-brand-sage hover:text-brand-sage/80 transition-colors group flex items-center gap-1.5">
              <Database size={10} className="group-hover:animate-pulse" />
              CMS Dashboard
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
