import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, Music, Heart, BookOpen, Baby, Shield, Dumbbell, ChevronRight, LayoutGrid } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { getMinistries } from '../services/ministries';
import type { Ministry } from '../types';

// Helper to map ministry names/IDs to icons for visual consistency
const getMinistryIcon = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes('choir') || n.includes('music')) return Music;
  if (n.includes('men')) return Users;
  if (n.includes('women')) return Heart;
  if (n.includes('youth')) return Dumbbell;
  if (n.includes('sunday school')) return BookOpen;
  if (n.includes('cadet')) return Shield;
  if (n.includes('child') || n.includes('nextgen') || n.includes('kid')) return Baby;
  return LayoutGrid;
};

// Helper for brand colors
const getMinistryColor = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes('choir')) return 'from-purple-900/80';
  if (n.includes('men')) return 'from-blue-900/80';
  if (n.includes('women')) return 'from-rose-900/80';
  if (n.includes('youth')) return 'from-orange-900/80';
  if (n.includes('sunday school')) return 'from-green-900/80';
  if (n.includes('cadet')) return 'from-slate-900/80';
  return 'from-brand-darkGrey/80';
};

const MinistryModal = ({ ministry, onClose }: { ministry: Ministry; onClose: () => void }) => {
  const Icon = getMinistryIcon(ministry.name);
  const color = getMinistryColor(ministry.name);
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm pt-safe pb-safe"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-white rounded-[2rem] xs:rounded-[2.5rem] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Hero Image */}
          <div className="relative h-60 xs:h-64 rounded-t-[2rem] xs:rounded-t-[2.5rem] overflow-hidden">
            <img src={ministry.image} alt={ministry.name} className="w-full h-full object-cover" />
            <div className={`absolute inset-0 bg-gradient-to-t ${color} to-transparent`} />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-all"
            >
              <X size={20} />
            </button>
            <div className="absolute bottom-6 left-6 xs:left-8 flex items-center gap-3 xs:gap-4">
              <div className="w-10 h-10 xs:w-12 xs:h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Icon className="text-white w-5 h-5 xs:w-6 xs:h-6" />
              </div>
              <div>
                <h2 className="text-xl xs:text-2xl font-black text-white">{ministry.name}</h2>
                <p className="text-white/80 text-[10px] xs:text-sm italic">"{ministry.tagline}"</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 xs:p-8 space-y-6">
            <p className="text-brand-grey/80 leading-relaxed text-sm xs:text-base font-medium">{ministry.description}</p>

            <div>
              <h3 className="font-black text-brand-darkGrey text-[10px] xs:text-sm uppercase tracking-widest mb-3">Our Activities</h3>
              <ul className="space-y-2">
                {(ministry.activities || []).map((a, i) => (
                  <li key={i} className="flex items-center gap-3 text-brand-darkGrey">
                    <ChevronRight size={16} className="text-brand-sage shrink-0" />
                    <span className="font-medium text-xs xs:text-sm">{a}</span>
                  </li>
                ))}
              </ul>
            </div>

            {ministry.images && ministry.images.length > 1 && (
              <div>
                <h3 className="font-black text-brand-darkGrey text-[10px] xs:text-sm uppercase tracking-widest mb-3">Photo Gallery</h3>
                <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
                  {ministry.images.map((img, i) => (
                    <div key={i} className="shrink-0 w-52 xs:w-60 h-36 xs:h-40 rounded-2xl overflow-hidden snap-center border border-brand-sage/10">
                      <img src={img} alt={`${ministry.name} ${i + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 xs:gap-4">
              <div className="bg-brand-beige/60 rounded-2xl p-4 border border-brand-sage/10">
                <p className="text-[10px] font-black text-brand-darkGrey uppercase tracking-widest mb-1">Meeting Time</p>
                <p className="text-brand-sage font-bold text-[10px] xs:text-sm">{ministry.meetingTime}</p>
              </div>
              <div className="bg-brand-beige/60 rounded-2xl p-4 border border-brand-sage/10">
                <p className="text-[10px] font-black text-brand-darkGrey uppercase tracking-widest mb-1">Leadership</p>
                <p className="text-brand-sage font-bold text-[10px] xs:text-sm">{ministry.leader}</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-4 rounded-2xl bg-brand-sage text-brand-darkGrey font-black text-sm xs:text-base hover:bg-brand-sage/80 transition-all active:scale-95 transition-transform"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Ministries = () => {
  const [ministries, setMinistries] = useState<Ministry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Ministry | null>(null);

  useEffect(() => {
    const fetchMinistries = async () => {
      try {
        const data = await getMinistries();
        setMinistries(data);
      } catch (error) {
        console.error("Error fetching ministries:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMinistries();
  }, []);

  return (
    <div className="min-h-screen bg-background pt-24 md:pt-32 pb-20 font-sans">
      <Helmet>
        <title>Our Ministries - Find Your Place to Serve | AIC Happy Valley</title>
        <meta name="description" content="Explore the vibrant ministries at AIC Happy Valley. From Youth and Women's fellowship to Sunday School and Choir, find a community where you can grow and serve in Thika." />
        <meta name="keywords" content="AIC Happy Valley Ministries, Church Groups Thika, Youth Ministry Thika, Women's Fellowship Kenya, Christian Community Service Thika" />
        <link rel="canonical" href="https://aic-happy-valley.web.app/ministries" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 xs:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 md:mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-brand-sage/10 text-brand-sage text-[10px] font-bold rounded-full uppercase tracking-[0.2em] border border-brand-sage/20 mb-4">
            Plug In
          </span>
          <h1 className="text-3xl xs:text-4xl md:text-6xl font-black text-brand-darkGrey tracking-tight mb-6">
            Our <span className="text-brand-sage italic">Ministries</span>
          </h1>
          <p className="text-brand-grey/70 text-base xs:text-xl max-w-3xl leading-relaxed font-medium">
            There is a place for everyone at AIC Happy Valley. Find a ministry where you can grow, serve, connect, and make a lasting impact in the Kingdom of God.
          </p>
        </motion.div>

        {/* Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-brand-sage"></div>
            <p className="text-brand-sage font-black uppercase tracking-widest text-[10px]">Lifting up Ministries...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xs:gap-8">
            {ministries.map((ministry, index) => {
              const Icon = getMinistryIcon(ministry.name);
              const color = getMinistryColor(ministry.name);
              return (
              <motion.div
                key={ministry.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="group relative overflow-hidden rounded-[2rem] xs:rounded-[2.5rem] h-[26rem] xs:h-[28rem] md:h-96 cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500"
                onClick={() => setSelected(ministry)}
              >
                {/* Background Image */}
                <img
                  src={ministry.image}
                  alt={ministry.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${color} via-black/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity`} />

                {/* Icon badge */}
                <div className="absolute top-5 right-5 xs:top-6 xs:right-6 w-10 h-10 xs:w-12 xs:h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <Icon className="text-white w-5 h-5 xs:w-6 xs:h-6" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 xs:p-8">
                  <motion.div className="translate-y-6 md:translate-y-12 group-hover:translate-y-0 transition-transform duration-500">
                    <h2 className="text-xl xs:text-2xl font-black text-white mb-1 leading-tight">{ministry.name}</h2>
                    <p className="text-white/70 text-[10px] xs:text-sm italic mb-4">"{ministry.tagline}"</p>
                    <p className="text-white/80 text-[12px] xs:text-sm leading-relaxed line-clamp-2 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {ministry.description}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-brand-gold font-black text-xs xs:text-sm md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span>Learn More</span>
                      <ChevronRight size={16} />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
          </div>
        )}

        {/* Join CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 md:mt-24 text-center bg-brand-beige/60 rounded-[2rem] xs:rounded-[3rem] p-10 xs:p-16 border border-brand-sage/10"
        >
          <h2 className="text-2xl xs:text-3xl md:text-4xl font-black text-brand-darkGrey mb-4">
            Find Your <span className="text-brand-sage italic">Place</span> to Serve
          </h2>
          <p className="text-muted-foreground text-sm xs:text-base max-w-md md:max-w-2xl mx-auto mb-8 leading-relaxed font-medium">
            Every ministry is a family. We'd love to help you find where you belong and how your gifts can serve the community and the Kingdom.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-brand-sage text-brand-darkGrey px-8 xs:px-10 py-4 xs:py-5 rounded-full font-black text-base xs:text-lg hover:scale-105 transition-all shadow-xl shadow-brand-sage/20 active:scale-95"
          >
            Get Connected <ChevronRight size={20} />
          </a>
        </motion.div>
      </div>

      {selected && <MinistryModal ministry={selected} onClose={() => setSelected(null)} />}
    </div>
  );
};

export default Ministries;
