import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Youtube, Instagram, Database } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white pt-32 pb-16 text-brand-grey relative overflow-hidden border-t border-brand-sage/10">
      {/* Decorative Blur */}
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-brand-sage/5 rounded-full blur-[80px]"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-20">
          <div className="space-y-8">
            <Link to="/" className="flex items-center gap-4 group">
              <div className="w-16 h-16 rounded-full overflow-hidden shadow-sm transition-transform group-hover:scale-105 shrink-0 aspect-square border border-brand-sage/10 bg-white flex items-center justify-center">
                <img 
                  src="/logo.png" 
                  alt="AIC Happy Valley" 
                  className="w-[70%] h-[70%] object-contain" 
                  onError={(e) => {
                    e.currentTarget.src = "/pwa-192x192.png";
                  }}
                />
              </div>
              <span className="text-xl font-semibold tracking-tight uppercase group-hover:text-brand-sage transition-colors" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                AIC <span className="text-brand-sage">Happy Valley</span>
              </span>
            </Link>
            <p className="text-muted-foreground leading-relaxed max-w-xs text-sm font-medium">
              Growing Deeper, Living Stronger. A peaceful harbor for worship, community, and spiritual growth in the heart of Happy Valley.
            </p>
          </div>
          
          <div className="space-y-8">
            <h3 className="text-[10px] font-semibold text-brand-grey/40 uppercase tracking-[0.4em]" style={{ fontFamily: "'Montserrat', sans-serif" }}>Explore</h3>
            <ul className="space-y-4 text-xs font-semibold uppercase tracking-widest" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              <li><Link to="/about" className="hover:text-brand-sage transition-colors">Our Story</Link></li>
              <li><Link to="/sermons" className="hover:text-brand-sage transition-colors">Sermons</Link></li>
              <li><Link to="/ministries" className="hover:text-brand-sage transition-colors">Fellowships</Link></li>
              <li><Link to="/events" className="hover:text-brand-sage transition-colors">Events</Link></li>
            </ul>
          </div>
          
          <div className="space-y-8">
            <h3 className="text-[10px] font-semibold text-brand-grey/40 uppercase tracking-[0.4em]" style={{ fontFamily: "'Montserrat', sans-serif" }}>Connect</h3>
            <ul className="space-y-6 text-sm font-medium">
              <li className="flex items-start gap-4">
                <MapPin size={20} className="text-brand-sage/60 shrink-0" />
                <span className="leading-relaxed text-muted-foreground">Happy Valley, Thika,<br/>Kiambu County, Kenya</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone size={20} className="text-brand-sage/60 shrink-0" />
                <span className="text-muted-foreground">+254 722 000 000</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail size={20} className="text-brand-sage/60 shrink-0" />
                <span className="text-muted-foreground italic">aichappyvalley@gmail.com</span>
              </li>
            </ul>
          </div>
          
          <div className="space-y-8">
            <h3 className="text-[10px] font-semibold text-brand-grey/40 uppercase tracking-[0.4em]" style={{ fontFamily: "'Montserrat', sans-serif" }}>Mission Portal</h3>
            <div className="flex gap-3">
              {[
                { icon: Facebook, color: 'hover:bg-brand-sage' },
                { icon: Youtube, color: 'hover:bg-brand-sky' },
                { icon: Instagram, color: 'hover:bg-brand-gold' },
              ].map((social, i) => (
                <a 
                  key={i}
                  href="#" 
                  className={`w-10 h-10 rounded-full border border-brand-sage/10 flex items-center justify-center text-brand-grey/60 ${social.color} hover:text-white transition-all transform hover:scale-110 shadow-sm`}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="border-t border-brand-sage/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] uppercase tracking-[0.3em] font-medium text-muted-foreground/50" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          <p>&copy; {new Date().getFullYear()} AIC Happy Valley. Thika, Kenya.</p>
          <div className="flex gap-8">
            <Link to="/privacy" className="hover:text-brand-sage transition-colors">Privacy Dispatch</Link>
            <Link to="/terms" className="hover:text-brand-sage transition-colors">Terms of Mission</Link>
            <Link to="/admin" className="text-brand-sage hover:text-brand-sage/80 transition-colors group flex items-center gap-1.5 font-bold">
              <Database size={10} />
              CMS
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
