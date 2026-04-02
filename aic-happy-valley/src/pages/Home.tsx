import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Users, MessageCircle, MapPin, ShieldCheck, Play, Calendar, LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getSermons } from '../services/sermons';
import { getMinistries } from '../services/ministries';
import type { Sermon, Ministry } from '../types';

const Home = () => {
  const [latestSermon, setLatestSermon] = useState<Sermon | null>(null);
  const [ministries, setMinistries] = useState<Ministry[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMinistries, setLoadingMinistries] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sermonData, ministryData] = await Promise.all([
          getSermons(),
          getMinistries()
        ]);
        
        if (sermonData.length > 0) setLatestSermon(sermonData[0]);
        setMinistries(ministryData.slice(0, 4));
      } catch (error) {
        console.error("Error fetching homepage data:", error);
      } finally {
        setLoading(false);
        setLoadingMinistries(false);
      }
    };
    fetchData();
  }, []);

  const getEmbedUrl = (url: string) => {
    try {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = url.match(regExp);
      const videoId = (match && match[2].length === 11) ? match[2] : null;
      return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    } catch (e) {
      return url;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans">
      <Helmet>
        <title>AIC Happy Valley - Growing Deeper, Living Stronger | Thika Church</title>
        <meta name="description" content="African Inland Church Happy Valley in Thika, Kenya. A Christ-centered, spirit-empowered church family where we grow deeper in Christ and live stronger in faith. Join our Sunday services at 8:00 AM & 10:30 AM." />
        <meta name="keywords" content="AIC Happy Valley Vision, Growing Deeper Living Stronger, Church in Thika, Thika Christian Church, Nairobi Metropolitan Churches, African Inland Church Kenya" />
        <link rel="canonical" href="https://aic-happy-valley.web.app/" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Church",
              "name": "AIC Happy Valley",
              "url": "https://aic-happy-valley.web.app/",
              "logo": "https://aic-happy-valley.web.app/logo.png",
              "image": "https://aic-happy-valley.web.app/hero-bg.jpg",
              "description": "AIC Happy Valley: A Christ-centered, spirit-empowered church family where lives are deeply rooted in the word and transformed for kingdom impact.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Happy Valley Area, Garissa Road",
                "addressLocality": "Thika",
                "addressRegion": "Kiambu",
                "addressCountry": "KE"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": -1.0424,
                "longitude": 37.1085
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": "Sunday",
                  "opens": "08:00",
                  "closes": "13:00"
                }
              ],
              "sameAs": [
                "https://facebook.com/aichappyvalley",
                "https://youtube.com/aichappyvalley"
              ]
            }
          `}
        </script>
      </Helmet>


      {/* 1. FULL-SCREEN VIDEO HERO — no text, just the video */}
      <section className="relative min-h-[70vh] md:min-h-screen-dvh overflow-hidden bg-brand-darkGrey">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover lg:object-center opacity-80"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        {/* Subtle gradient at bottom so next section blends nicely */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60" />

        {/* Minimal overlay — pinned to the far right */}
        <div className="absolute inset-x-0 bottom-6 xs:bottom-10 z-20">
          <div className="max-w-7xl mx-auto px-4 xs:px-6 md:px-12 flex flex-col md:flex-row-reverse md:items-end justify-between gap-6 md:gap-8">
            <motion.div 
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.5, duration: 0.8 }}
               className="w-full xs:max-w-xs bg-white/10 backdrop-blur-lg p-5 xs:p-6 rounded-[1.5rem] xs:rounded-[2rem] border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden group mx-auto md:mx-0"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-brand-gold/10 rounded-full blur-2xl -z-0 group-hover:bg-brand-gold/20 transition-all duration-700" />
              
              <div className="flex items-center gap-2 mb-2">
                <div className="px-2 py-0.5 bg-brand-gold text-brand-darkGrey rounded-full flex items-center justify-center text-[7px] font-black uppercase tracking-widest shadow-lg">
                  Vision
                </div>
                <span className="text-white/60 font-black uppercase tracking-widest text-[7px]">Col. 2:7</span>
              </div>
              
              <h1 className="text-white text-2xl xs:text-3xl font-black mb-2 tracking-tighter leading-[0.85]">
                Growing <span className="text-brand-gold italic">Deeper</span>,<br />
                Living <span className="text-brand-sage italic">Stronger</span>.
              </h1>
              
              <p className="text-white/80 font-medium mb-3 leading-relaxed text-[10px] italic">
                "Rooted and built up in Him..."
              </p>

              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="bg-white/5 rounded-lg p-2 border border-white/10">
                  <p className="text-[8px] font-black text-brand-gold uppercase tracking-widest leading-none mb-1">Morning</p>
                  <p className="text-white font-bold text-xs">8:00 AM</p>
                </div>
                <div className="bg-white/5 rounded-lg p-2 border border-white/10">
                  <p className="text-[8px] font-black text-brand-sage uppercase tracking-widest leading-none mb-1">Mid-Day</p>
                  <p className="text-white font-bold text-xs">10:30 AM</p>
                </div>
              </div>

              <Link to="/contact">
                <Button className="w-full bg-white text-brand-darkGrey hover:bg-brand-sage hover:text-white font-black h-12 rounded-lg transition-all shadow-xl text-xs group/btn">
                  Plan Your Visit
                  <ArrowRight className="ml-1.5 group-hover/btn:translate-x-1 transition-transform" size={14} />
                </Button>
              </Link>
            </motion.div>

            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 1, duration: 0.8 }}
               className="flex items-center gap-4 text-white/60 mb-6 md:mb-0 justify-center md:justify-start"
            >
              <div className="w-12 h-[2px] bg-white/20"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Scroll To Explore</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. DYNAMIC LATEST SERMON SECTION */}
      <section className="py-16 md:py-32 bg-brand-cream relative">
        <div className="max-w-7xl mx-auto px-4 xs:px-6">
          {!loading && latestSermon ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
              {/* Text Side */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-5"
              >
                <span className="inline-block px-4 py-1.5 bg-brand-sage/10 text-brand-sage text-[10px] font-bold rounded-full uppercase tracking-[0.2em] mb-6 border border-brand-sage/20">
                  Must Watch
                </span>
                <h2 className="text-4xl xs:text-5xl md:text-6xl font-black text-brand-darkGrey leading-[0.9] tracking-tighter mb-8">
                   Watch Our <span className="text-brand-sage italic">Latest Sermon</span>.
                </h2>
                
                <div className="bg-white/50 backdrop-blur-sm border border-brand-sage/10 rounded-3xl p-6 xs:p-8 mb-10 shadow-xl shadow-brand-darkGrey/5">
                   <div className="flex items-center gap-3 mb-4 text-brand-sage font-black text-xs uppercase tracking-widest">
                     <Calendar size={14} />
                     {new Date(latestSermon.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                   </div>
                   <h3 className="text-2xl xs:text-3xl font-black text-brand-darkGrey mb-4 tracking-tight leading-tight">
                     {latestSermon.title}
                   </h3>
                   <p className="text-brand-grey text-base xs:text-lg leading-relaxed font-medium line-clamp-3 italic">
                     "{latestSermon.description}"
                   </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-6">
                  <Link to="/sermons">
                    <Button className="bg-brand-darkGrey text-white hover:bg-brand-sage hover:text-brand-darkGrey px-10 h-16 rounded-full font-black text-lg transition-all shadow-xl group/btn">
                      Explore Archive
                      <ArrowRight className="ml-2 group-hover/btn:translate-x-1 transition-transform" size={20} />
                    </Button>
                  </Link>
                </div>
              </motion.div>

              {/* Video Side */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="lg:col-span-7"
              >
                <div className="relative group overflow-hidden">
                   {/* Main Video Card */}
                   <div className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-[10px] border-white/50 bg-brand-darkGrey">
                      <iframe
                        src={getEmbedUrl(latestSermon.videoUrl)}
                        title={latestSermon.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full"
                      />
                   </div>
                   
                   {/* Decorative elements */}
                 </div>
               </motion.div>
             </div>
          ) : !loading && !latestSermon ? (
             <div className="text-center py-20 bg-white/50 rounded-[3rem] border-2 border-dashed border-brand-sage/20">
                <Play className="size-16 text-brand-sage/20 mx-auto mb-6" />
                <h3 className="text-2xl font-black text-brand-darkGrey/40 uppercase tracking-tighter">Sermon Feed Offline</h3>
                <p className="text-brand-grey font-medium mt-2 italic">Connect with us on Sunday for a fresh Word.</p>
             </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-32 space-y-4">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-brand-sage"></div>
              <p className="text-brand-sage font-black uppercase tracking-widest text-[10px]">Updating Fresh Content...</p>
            </div>
          )}
        </div>
      </section>

      {/* 3. WELCOME SECTION */}
      <section className="py-16 md:py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 xs:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div className="relative">
              <span className="inline-block px-4 py-1.5 bg-brand-sage/10 text-brand-sage text-[10px] font-bold rounded-full uppercase tracking-[0.2em] mb-6 border border-brand-sage/20">
                Our Shepherd
              </span>
              <h2 className="text-3xl xs:text-5xl md:text-7xl font-black text-brand-darkGrey leading-[0.85] tracking-tighter mb-8">
                Planted In Christ. <span className="text-brand-sage italic">Bearing Fruit</span> for His Glory.
              </h2>
              <p className="text-lg xs:text-xl text-brand-grey leading-relaxed mb-10 font-medium">
                AIC Happy Valley exists to be a thriving, Christ-centered church family where lives are deeply rooted in the Word, strengthened by faith, and transformed for kingdom impact.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Link to="/about">
                  <Button className="bg-brand-sage text-brand-darkGrey hover:bg-brand-darkGrey hover:text-white px-8 xs:px-10 h-16 rounded-full font-black text-lg transition-all shadow-xl shadow-brand-sage/20">
                    Meet Our Pastors
                  </Button>
                </Link>
                <div className="flex items-center gap-4 px-6 border-l-2 border-brand-sage/20">
                  <div className="w-12 h-12 bg-brand-cream rounded-full flex items-center justify-center">
                    <MessageCircle className="text-brand-sage" size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-brand-darkGrey/40 uppercase tracking-widest leading-none mb-1">Need Prayer?</p>
                    <Link to="/contact" className="text-brand-darkGrey font-black hover:text-brand-sage transition-colors">Talk To Us</Link>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative mt-8 lg:mt-0">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative z-10 rounded-[2rem] xs:rounded-[3rem] overflow-hidden shadow-2xl border-[8px] xs:border-[12px] border-brand-cream/50 aspect-square"
              >
                <img src="/church-drone-view.jpeg" alt="Church Drone View" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
              </motion.div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border-2 border-brand-sage/10 rounded-full -z-0"></div>
              <div className="absolute -bottom-6 -right-6 xs:-bottom-10 xs:-right-10 w-32 h-32 xs:w-40 xs:h-40 bg-brand-gold rounded-full -z-0 blur-3xl opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MINISTRIES PREVIEW SECTION */}
      <section className="py-16 md:py-32 bg-brand-darkGrey text-white selection:bg-brand-sage selection:text-white relative">
        <div className="max-w-7xl mx-auto px-4 xs:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-8 text-center md:text-left">
            <div className="max-w-2xl mx-auto md:mx-0 relative">
              <span className="text-brand-sage font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Our Impact</span>
              <h2 className="text-4xl xs:text-5xl md:text-7xl font-black tracking-tighter leading-none mb-6">
                 Vibrant <span className="text-brand-sage italic underline decoration-brand-sage/30 underline-offset-8">Ministries</span>
              </h2>
              <p className="text-white/60 text-base xs:text-lg font-medium leading-relaxed">
                 Explore the various ministry areas at AIC Happy Valley where we grow together, serve our community, and impact lives for Christ.
              </p>
            </div>
            <Link to="/ministries" className="flex items-center gap-3 group mx-auto md:mx-0">
              <span className="text-base xs:text-lg font-black group-hover:text-brand-sage transition-colors">See All Ministries</span>
              <div className="w-10 h-10 xs:w-12 xs:h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-brand-sage group-hover:text-brand-darkGrey transition-all">
                <ArrowRight size={20} />
              </div>
            </Link>
          </div>

          {loadingMinistries ? (
            <div className="flex justify-center py-20">
               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-sage"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {ministries.map((ministry, i) => (
                <motion.div
                  key={ministry.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative h-[300px] xs:h-[350px] rounded-[2rem] overflow-hidden cursor-pointer"
                >
                  <Link to={`/ministries`}>
                    <img src={ministry.image} alt={ministry.name} className="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-darkGrey/90 via-brand-darkGrey/20 to-transparent" />
                    
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      <div className="w-10 h-10 bg-brand-sage/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-4 border border-white/10 group-hover:bg-brand-sage group-hover:text-brand-darkGrey transition-all">
                        <LayoutGrid size={20} />
                      </div>
                      <h3 className="text-xl xs:text-2xl font-black mb-2 tracking-tight">{ministry.name}</h3>
                      <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest group-hover:text-brand-sage transition-colors">Explore Ministry</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
              
              {ministries.length === 0 && (
                <div className="col-span-full py-20 text-center bg-white/5 rounded-[2.5rem] border border-white/10">
                   <Users className="size-16 text-white/5 mx-auto mb-4" />
                   <p className="text-white/40 font-black tracking-widest uppercase text-sm">Stay Tuned For New Ministries</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* 5. FINAL CTAs */}
      <section className="py-24 md:py-48 bg-brand-beige relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 xs:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl xs:text-4xl md:text-6xl font-black text-brand-darkGrey leading-[1.1] mb-12">
              Ready To <span className="text-brand-sage italic">Join</span> Our Growing Family?
            </h2>
            <div className="flex flex-col xs:flex-row justify-center gap-4 xs:gap-6 px-4">
              <Link to="/contact" className="w-full xs:w-auto">
                <Button className="w-full h-16 xs:h-20 px-8 xs:px-12 bg-brand-darkGrey text-white hover:bg-brand-sage hover:text-brand-darkGrey rounded-[1.5rem] xs:rounded-[2.5rem] text-lg xs:text-xl font-black transition-all shadow-2xl">
                  Connect With Us
                </Button>
              </Link>
              <Link to="/giving" className="w-full xs:w-auto">
                <Button variant="outline" className="w-full h-16 xs:h-20 px-8 xs:px-12 border-2 border-brand-sage text-brand-sage hover:bg-brand-sage hover:text-white rounded-[1.5rem] xs:rounded-[2.5rem] text-lg xs:text-xl font-black transition-all">
                  Support The Ministry
                </Button>
              </Link>
            </div>
            
            <div className="mt-16 md:mt-24 flex items-center justify-center gap-8 md:gap-12 grayscale opacity-40">
               <div className="flex flex-col items-center">
                 <MapPin className="text-brand-sage mb-2" size={20} />
                 <span className="text-[8px] xs:text-[10px] font-black uppercase tracking-[0.2em] xs:tracking-[0.3em]">Thika, Kenya</span>
               </div>
               <div className="w-[1px] h-10 bg-brand-sage/20"></div>
               <div className="flex flex-col items-center">
                 <ShieldCheck className="text-brand-sage mb-2" size={20} />
                 <span className="text-[8px] xs:text-[10px] font-black uppercase tracking-[0.2em] xs:tracking-[0.3em]">Built On Faith</span>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
