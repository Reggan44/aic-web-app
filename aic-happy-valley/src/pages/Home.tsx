import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';
import { Button } from '../components/elements/Button';
import { Link } from 'react-router-dom';
import { GlowCard } from '@/components/ui/spotlight-card';
import { getMinistries } from '../features/ministries/api/getMinistries';
import { CircularGallery, type GalleryItem } from '../components/ui/circular-gallery-og';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Ministry } from '../types';
import SEO from '../components/seo/SEO';

gsap.registerPlugin(ScrollTrigger);

const HOME_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Church',
  '@id': 'https://aichappyvalley.org/#church',
  'name': 'AIC Happy Valley',
  'alternateName': 'Africa Inland Church Happy Valley',
  'description': 'A Christ-centered, spirit-empowered church family in Thika, Kenya. Join us Sundays at 8:00 AM (English) & 10:30 AM (Kiswahili).',
  'url': 'https://aichappyvalley.org',
  'logo': 'https://aichappyvalley.org/logo.png',
  'image': 'https://aichappyvalley.org/church-drone-view.jpeg',
  'telephone': '+254700000000',
  'email': 'info@aichappyvalley.org',
  'address': {
    '@type': 'PostalAddress',
    'streetAddress': 'Happy Valley',
    'addressLocality': 'Thika',
    'addressRegion': 'Kiambu County',
    'postalCode': '01000',
    'addressCountry': 'KE'
  },
  'geo': {
    '@type': 'GeoCoordinates',
    'latitude': -1.0395,
    'longitude': 37.0900
  },
  'openingHoursSpecification': [
    { '@type': 'OpeningHoursSpecification', 'dayOfWeek': 'Sunday', 'opens': '08:00', 'closes': '12:30' },
    { '@type': 'OpeningHoursSpecification', 'dayOfWeek': 'Wednesday', 'opens': '17:30', 'closes': '19:00' }
  ],
  'sameAs': [
    'https://www.facebook.com/aichappyvalley',
    'https://www.youtube.com/@aichappyvalley'
  ],
  'hasMap': 'https://maps.google.com/?q=AIC+Happy+Valley+Thika+Kenya',
  'currenciesAccepted': 'KES',
  'paymentAccepted': 'Cash, M-PESA',
  'priceRange': 'Free'
};


const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  };

  const [ministries, setMinistries] = useState<Ministry[]>([]);

  useEffect(() => {
    const fetchMin = async () => {
      try {
        const data = await getMinistries(5); // Get top 5 for "Featured"
        setMinistries(data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchMin();
  }, []);

  // background light effects logic
  const bgRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (!bgRef.current) return;
    
    gsap.fromTo(".bg-glow-1", 
      { x: -100, opacity: 0 },
      { 
        x: 100, 
        opacity: 0.3,
        scrollTrigger: {
          trigger: bgRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2
        }
      }
    );
    
    gsap.fromTo(".bg-glow-2", 
      { x: 100, opacity: 0 },
      { 
        x: -100, 
        opacity: 0.2,
        scrollTrigger: {
          trigger: bgRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5
        }
      }
    );
  }, { scope: bgRef });

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans selection:bg-brand-sage/30">
      <SEO
        title="Welcome to AIC Happy Valley"
        description="AIC Happy Valley is a Christ-centered, spirit-empowered church family in Thika, Kenya. Join us Sundays at 8:00 AM (English) & 10:30 AM (Kiswahili). Growing Deeper, Living Stronger."
        url="/"
        image="/church-drone-view.jpeg"
        keywords="church Thika Kenya, Sunday service Happy Valley, Christian worship Thika, AIC church"
        schema={HOME_SCHEMA}
      />
      
      {/* 1. PEACEFUL HERO SECTION WITH VIDEO BACKGROUND */}

      <section className="relative min-h-[95vh] flex items-center justify-center pt-32 px-4 overflow-hidden bg-brand-cream">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover opacity-60 mix-blend-multiply"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-brand-cream/80 via-transparent to-brand-cream"></div>
        </div>

        {/* Subtle Decorative Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-brand-sage/10 rounded-full blur-[80px] md:blur-[100px] animate-pulse opacity-50 md:opacity-100"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 md:w-80 md:h-80 bg-brand-sky/10 rounded-full blur-[80px] md:blur-[100px] animate-pulse opacity-50 md:opacity-100" style={{ animationDelay: '2s' }}></div>
        
        <motion.div 
          className="max-w-4xl mx-auto text-center relative z-10"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.span 
            variants={itemVariants}
            className="inline-block px-4 py-1.5 bg-brand-sage/10 text-brand-grey text-[13px] font-semibold rounded-full uppercase tracking-[0.2em] mb-8 border border-brand-sage/20"
          >
            AIC Happy Valley
          </motion.span>
          
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-7xl lg:text-8xl font-black leading-[1.2] sm:leading-[1.1] tracking-tight mb-8 text-brand-grey"
          >
            Growing <span className="text-brand-sage italic">Deeper</span>,<br />
            Living <span className="text-brand-gold italic">Stronger</span>.
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg sm:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed font-medium"
          >
            “You are welcome here.” Experience a Christ-centered family in the heart of Happy Valley. Join us this Sunday.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link to="/contact">
              <Button size="lg" className="rounded-full px-10 py-8 text-lg font-bold bg-brand-sage hover:scale-105 transition-all text-brand-grey shadow-lg shadow-brand-sage/20 border-none group">
                Plan Your Visit
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/sermons">
              <Button variant="outline" size="lg" className="rounded-full px-10 py-8 text-lg font-bold border-brand-sage/30 text-brand-grey hover:bg-brand-sage/5 hover:border-brand-sage transition-all">
                Watch Sermons
              </Button>
            </Link>
          </motion.div>

          <motion.div 
            variants={itemVariants} 
            className="mt-16 flex flex-wrap justify-center gap-8 text-sm font-bold text-muted-foreground/80 tracking-wide uppercase"
          >
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-brand-sage" />
              Sundays @ 8:00 & 10:30 AM
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold"></span>
              Thika, Happy Valley
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* 2. CALMING MISSION SECTION (Beige Background) */}
      <section className="py-32 bg-brand-beige/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <h2 className="text-4xl md:text-5xl font-black text-brand-grey leading-tight tracking-tight">
                A Place to Belong and Be <span className="text-brand-sage">Transformed</span>.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                At AIC Happy Valley, we believe everyone has a seat at the table. Our mission is to know Christ and make Him known, fostering a community where faith finds practical expression in daily life.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-4">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-brand-sage/20 flex items-center justify-center text-brand-grey font-bold">1</div>
                  <h4 className="font-bold">Bible Based</h4>
                  <p className="text-sm text-muted-foreground">Transformative teaching grounded in the Word of God.</p>
                </div>
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-brand-sky/20 flex items-center justify-center text-brand-grey font-bold">2</div>
                  <h4 className="font-bold">Family First</h4>
                  <p className="text-sm text-muted-foreground">A multi-generational home for all ages and backgrounds.</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl shadow-brand-grey/5"
            >
              <img
                src="/church-drone-view.jpeg"
                alt="AIC Happy Valley Church Community"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-brand-sage/10 mix-blend-overlay"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED MINISTRIES EXPLORER (Cream Background with Background Effects) */}
      <section ref={bgRef} className="py-32 bg-background relative overflow-hidden">
        {/* Decorative Background Effects */}
        <div className="bg-glow-1 absolute top-1/4 left-1/4 w-96 h-96 bg-brand-sage/20 rounded-full blur-[120px] pointer-events-none z-0"></div>
        <div className="bg-glow-2 absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-brand-sky/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 space-y-4">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[10px] font-black tracking-[0.4em] text-brand-sage uppercase block"
            >
              Discover Our Life Together
            </motion.span>
            <h2 className="text-4xl md:text-7xl font-black text-brand-grey tracking-tighter uppercase italic">
              Featured <span className="text-brand-sage not-italic">Fellowships</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto font-medium">
              A glimpse into our vibrant community. From the youngest to the elders, there is a place for you to belong.
            </p>
          </div>
          
          <div className="relative h-[500px] md:h-[700px] w-full mt-12">
            <CircularGallery
              items={ministries.map(m => ({
                id: m.id,
                image: m.image,
                text: m.name
              }))}
              bend={3}
              borderRadius={0.05}
              autoScrollSpeed={0.01}
              resumeDelay={2000} // Matches user's 2-second requirement
              scrollEase={0.05}
            />
          </div>

          <div className="mt-16 text-center">
            <Link to="/ministries">
              <Button variant="ghost" className="rounded-full px-12 py-8 text-lg font-black border-2 border-brand-sage/20 text-brand-grey hover:bg-brand-sage/5 hover:text-brand-sage hover:border-brand-sage transition-all group uppercase tracking-tighter">
                View All Ministries 
                <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" size={24} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. WELCOMING CALL TO ACTION (Beige Background) */}
      <section className="py-32 bg-brand-beige">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-12">
          <h2 className="text-4xl md:text-6xl font-black text-brand-grey leading-tight">
            We'd Love to <span className="text-brand-sage">Meet You</span>.
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Whether you're just starting your spiritual journey or looking for a church home, we're here for you.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/contact">
              <Button size="lg" className="rounded-full px-12 py-8 text-xl font-bold bg-brand-grey text-white hover:bg-brand-grey/90 shadow-xl shadow-brand-grey/10 border-none outline-none">
                Contact Us
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="rounded-full px-12 py-8 text-xl font-bold border-brand-grey/20 text-brand-grey hover:bg-brand-grey/5">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
