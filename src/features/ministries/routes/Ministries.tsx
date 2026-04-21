import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Music, Users, Shield, Heart, Award, Loader2 } from 'lucide-react';
import SEO from '../../../components/seo/SEO';
import { getMinistries } from '../api/getMinistries';
import { RadialScrollGallery } from '../../../components/ui/radial-scroll-gallery';
import { Badge } from '../../../components/ui/badge';
import type { Ministry } from '../../../types';

const MINISTRIES_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  'name': 'Ministries at AIC Happy Valley',
  'description': 'Connect and grow at AIC Happy Valley. Explore our Choir, Youth, Women\'s, Men\'s, NextGen and Cadets ministries in Thika, Kenya.',
  'url': 'https://aichappyvalley.org/ministries',
  'numberOfItems': 6,
  'itemListElement': [
    { '@type': 'ListItem', 'position': 1, 'name': 'Choir Ministry', 'url': 'https://aichappyvalley.org/ministries/choir' },
    { '@type': 'ListItem', 'position': 2, 'name': 'Men\'s Fellowship', 'url': 'https://aichappyvalley.org/ministries/men' },
    { '@type': 'ListItem', 'position': 3, 'name': 'Women\'s Ministry', 'url': 'https://aichappyvalley.org/ministries/women' },
    { '@type': 'ListItem', 'position': 4, 'name': 'Youth Ministry', 'url': 'https://aichappyvalley.org/ministries/youth' },
    { '@type': 'ListItem', 'position': 5, 'name': 'NextGen Ministry', 'url': 'https://aichappyvalley.org/ministries/nextgen' },
    { '@type': 'ListItem', 'position': 6, 'name': 'Cadets', 'url': 'https://aichappyvalley.org/ministries/cadets' }
  ]
};

const iconMap: Record<string, any> = {
  BookOpen,
  Music,
  Users,
  Shield,
  Heart,
  Award
};

const Ministries = () => {
  const [ministries, setMinistries] = useState<Ministry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMinistries = async () => {
      try {
        const data = await getMinistries();
        setMinistries(data);
      } catch (error) {
        console.error('Error fetching ministries:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMinistries();
  }, []);

  // No longer auto-scrolling on arrival to prevent "hiccups"
  // Users can now freely swipe the gallery below

  return (
    <div className="w-full bg-background min-h-screen">
      <SEO
        title="Our Ministries"
        description="Connect and grow at AIC Happy Valley Thika. Explore our Choir, Youth, Women's, Men's, Sunday School and Cadets ministries. Find your community."
        url="/ministries"
        keywords="AIC Happy Valley ministries, church groups Thika, youth ministry Kenya, women ministry church, men fellowship Thika, Sunday school Thika"
        schema={MINISTRIES_SCHEMA}
      />

      {/* 1. CINEMATIC EXPLORER HERO */}
      <section className="relative w-full bg-brand-grey overflow-hidden pt-48 pb-20">
        {/* Cinematic Backdrop Mesh */}
        <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
          <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-brand-sage rounded-full blur-[160px]"></div>
          <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-brand-sky rounded-full blur-[140px]"></div>
        </div>

        <div className="flex flex-col items-center justify-center space-y-4 relative z-10">
          <div className="space-y-4 text-center px-6">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] font-medium tracking-[0.45em] text-white/40 uppercase block"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Mission Fellowship Explorer
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-8xl font-medium tracking-[0.05em] text-white uppercase leading-none"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Our <span className="text-brand-sage">Fellowships</span>
            </motion.h1>
          </div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="animate-pulse text-brand-sage/60 text-[10px] font-medium uppercase tracking-[0.4em] pt-6 flex items-center gap-4"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            ← Swipe to Explore Missions →
          </motion.div>
        </div>

        <RadialScrollGallery
          className="!min-h-[600px] md:!min-h-[800px]"
          baseRadius={500}
          mobileRadius={240}
          visiblePercentage={45}
          scrollDuration={2500}
          onItemSelect={(index) => {
            const id = ministries[index]?.id;
            if (id) {
              const el = document.getElementById(id);
              if (el) {
                // We add a small offset for the sticky header
                const top = el.getBoundingClientRect().top + window.pageYOffset - 100;
                window.scrollTo({ top, behavior: 'smooth' });
              }
            }
          }}
        >
          {(hoveredIndex) =>
            ministries.map((m, index) => {
              const isActive = hoveredIndex === index;
              return (
                <div 
                  key={m.id} 
                  className="group relative w-[220px] h-[300px] sm:w-[280px] sm:h-[380px] overflow-hidden rounded-[2.5rem] bg-white border border-white/20 shadow-2xl transition-all duration-500"
                >
                  <div className="absolute inset-0 overflow-hidden">
                    <img
                      src={m.image}
                      alt={m.name}
                      className={`h-full w-full object-cover transition-transform duration-1000 ease-out ${
                        isActive ? 'scale-110 blur-0 grayscale-0' : 'scale-100 blur-[2px] grayscale-[40%]'
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-grey/90 via-brand-grey/20 to-transparent opacity-70" />
                  </div>

                  <div className="absolute inset-0 flex flex-col justify-between p-8">
                    <div className="flex justify-between items-start">
                      <Badge variant="secondary" className="text-[9px] px-3 py-1 bg-white/20 backdrop-blur-md text-white border-white/30 font-black uppercase tracking-widest">
                        Fellowship
                      </Badge>
                      <div className={`w-8 h-8 rounded-full bg-brand-sage text-brand-grey flex items-center justify-center transition-all duration-500 ${isActive ? 'opacity-100 rotate-0 translate-y-0' : 'opacity-0 -rotate-45 -translate-y-2'}`}>
                        <ArrowRight size={16} />
                      </div>
                    </div>

                    <div className={`transition-all duration-500 ${isActive ? 'translate-y-0' : 'translate-y-4 opacity-80'}`}>
                      <h3 className="text-2xl md:text-3xl font-semibold leading-tight text-white tracking-tight uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>{m.name}</h3>
                      <div className={`h-1 bg-brand-sage mt-3 transition-all duration-700 ${isActive ? 'w-full opacity-100' : 'w-0 opacity-0'}`} />
                      <p className={`text-[10px] text-white/60 font-medium mt-3 line-clamp-2 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                        {m.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          }
        </RadialScrollGallery>
      </section>

      {/* Intro Header */}
      <section className="pt-32 pb-16 px-6 bg-white relative z-10 mx-auto">
        {/* Top vignette to blend from Dark Hero to White Content */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-brand-grey to-white pointer-events-none -translate-y-full"></div>
        
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <p className="text-xl md:text-2xl text-muted-foreground font-light italic leading-relaxed">
            "Find a beautiful community where you can grow deeply, serve meaningfully, and connect with our mission family. Our fellowships are designed to support every season of your kingdom journey."
          </p>
        </div>
      </section>

      {/* Ministry Sections */}
      <section className="py-20 px-4 space-y-32 max-w-7xl mx-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 size={40} className="animate-spin text-brand-sage mb-4" />
            <p className="text-muted-foreground font-medium italic">Preparing our ministry details...</p>
          </div>
        ) : ministries.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No ministries found. Please check back later.</p>
          </div>
        ) : (
          ministries.map((section, index) => {
            const isEven = index % 2 !== 0; // Alternate layout
            const Icon = iconMap[section.iconName] || BookOpen;

            return (
              <motion.div
                key={section.id}
                id={section.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className={`flex flex-col ${isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-20 items-center`}
              >
                {/* Content Side */}
                <div className="w-full lg:w-1/2 space-y-8">
                  <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-slate-100 border border-slate-200">
                    <div className={`p-2 rounded-full ${section.color} text-white`}>
                      <Icon size={18} />
                    </div>
                    <span className={`font-bold uppercase tracking-wider text-sm ${section.textColor}`}>
                      {section.name.split(' ')[0]} Focus
                    </span>
                  </div>
                  
                  <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-brand-grey" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {section.name}
                  </h2>
                  
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {section.description}
                  </p>

                  <div className="pt-4">
                    <Link to="/contact">
                      <button className="flex items-center gap-2 font-bold uppercase tracking-widest text-sm text-brand-grey hover:text-brand-sage transition-colors group">
                        Join This Ministry 
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Image Side */}
                <div className="w-full lg:w-1/2 space-y-4">
                  {/* Main Feature Image */}
                  <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl">
                    <img 
                      src={section.image} 
                      alt={section.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-brand-grey/40 to-transparent pointer-events-none"></div>
                  </div>

                  {/* Sub-gallery (if available) */}
                  {section.gallery && section.gallery.length > 0 && (
                    <div className="grid grid-cols-2 gap-4">
                      {section.gallery.map((img, i) => (
                        <div key={i} className={`relative rounded-2xl overflow-hidden shadow-md aspect-video ${section.gallery.length === 1 ? 'col-span-2 aspect-[21/9]' : ''}`}>
                          <img 
                            src={img} 
                            alt={`${section.name} activity ${i + 1}`}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })
        )}
      </section>
    </div>
  );
};

export default Ministries;
