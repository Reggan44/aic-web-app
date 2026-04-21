import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSermons } from '../../../hooks/useSermons';
import { Play, Calendar, ChevronRight, AlertCircle } from 'lucide-react';
import { cn } from '../../../utils';
import { useState } from 'react';
import SEO from '../../../components/seo/SEO';
import { GlowCard } from '../../../components/ui/spotlight-card';

const SERMONS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': 'https://aichappyvalley.org/sermons#webpage',
  'url': 'https://aichappyvalley.org/sermons',
  'name': 'Sermon Archive — AIC Happy Valley',
  'description': 'Watch and listen to sermon messages from AIC Happy Valley church in Thika, Kenya. Our digital library of Bible teachings.',
  'isPartOf': { '@id': 'https://aichappyvalley.org/#church' },
  'breadcrumb': {
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://aichappyvalley.org/' },
      { '@type': 'ListItem', 'position': 2, 'name': 'Sermons', 'item': 'https://aichappyvalley.org/sermons' }
    ]
  }
};

const getYouTubeEmbedUrl = (url: string) => {
  if (!url) return '';
  if (url.includes('embed/')) return url;
  
  let id = '';
  if (url.includes('v=')) {
    id = url.split('v=')[1].split('&')[0];
  } else if (url.includes('youtu.be/')) {
    id = url.split('youtu.be/')[1].split('?')[0];
  } else if (url.includes('shorts/')) {
    id = url.split('shorts/')[1].split('?')[0];
  }
  
  return id ? `https://www.youtube-nocookie.com/embed/${id}` : url;
};

const Sermons = () => {
  const { sermons, loading, error } = useSermons(24);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(sermons.map(s => s.category || 'Service')))];


  return (
    <div className="w-full bg-white">
      <SEO
        title="Sermon Archive"
        description="Watch and listen to uplifting Bible messages from AIC Happy Valley Thika. Catch up on the latest Sunday sermons and teachings anytime, anywhere."
        url="/sermons"
        keywords="sermons Thika church, Bible messages Kenya, AIC Happy Valley sermons, Sunday service preaching, Christian teaching Thika"
        schema={SERMONS_SCHEMA}
      />
      {/* 1. CINEMATIC EXPLORER HERO */}
      <section className="relative px-4 bg-brand-grey overflow-hidden pt-48 pb-24">
        {/* Cinematic Background Mesh */}
        <div className="absolute top-0 right-0 w-full h-full opacity-30 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-sage rounded-full blur-[140px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-brand-sky rounded-full blur-[160px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-12 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="space-y-6"
          >
            <span className="text-white/40 text-[10px] font-medium tracking-[0.45em] uppercase block" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Digital Mission Library
            </span>
            <h1 className="text-4xl md:text-8xl font-medium text-white tracking-[0.05em] uppercase leading-none" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Sermon <span className="text-brand-sage">Archive</span>
            </h1>
            <p className="text-white/60 text-lg max-w-xl leading-relaxed italic">
              Immerse yourself in the Word of God anytime, anywhere with our cinematic digital collection.
            </p>
          </motion.div>

          {!loading && !error && sermons.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="flex bg-white/5 backdrop-blur-2xl p-2 rounded-full border border-white/10 shadow-2xl overflow-x-auto no-scrollbar"
            >
              {categories.map(category => (activeCategory === category ? (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className="px-8 py-3 rounded-full text-[10px] font-semibold uppercase tracking-[0.2em] transition-all bg-white text-brand-grey shadow-xl shadow-white/5"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {category}
                </button>
              ) : (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className="px-8 py-3 rounded-full text-[10px] font-medium uppercase tracking-[0.2em] transition-all text-white/40 hover:text-white"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {category}
                </button>
              )))}
            </motion.div>
          )}
        </div>
        {/* Bottom cinematic vignette */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent pointer-events-none"></div>
      </section>

      {/* Content Grid - Modernized */}
      <section className="pt-52 pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          {error && (
            <div role="alert" className="flex items-center gap-4 p-6 bg-red-50 border border-red-100 text-red-700 rounded-[2rem] mb-12 shadow-sm">
              <AlertCircle size={24} aria-hidden="true" />
              <p className="font-bold">{error}</p>
            </div>
          )}

          {loading ? (
            <div className="flex flex-col justify-center items-center h-96 bg-slate-50 rounded-[3rem] border border-slate-100 shadow-inner">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-secondary shadow-lg shadow-secondary/20 mb-6" aria-label="Loading sermons" />
              <p className="text-sm font-black text-slate-400 uppercase tracking-[0.3em]">Gathering Messages…</p>
            </div>
          ) : sermons.length === 0 && !error ? (
            <div className="text-center py-32 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
              <p className="text-slate-400 font-black text-xl uppercase tracking-widest mb-2">No sermons yet</p>
              <p className="text-slate-500 font-medium">We're uploading our latest Sunday service. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {sermons
                .filter(s => activeCategory === 'All' || (s.category || 'Service') === activeCategory)
                .map((sermon, index) => (
                <motion.div
                  key={sermon.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link to={`/sermons/${sermon.id}`} className="block h-full">
                    <GlowCard className="h-full group">
                      <div className="aspect-video relative overflow-hidden bg-brand-grey">
                        {sermon.videoUrl && (
                          <iframe
                            src={getYouTubeEmbedUrl(sermon.videoUrl)}
                            title={`Sermon: ${sermon.title}`}
                            className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 pointer-events-none"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            loading="lazy"
                          />
                        )}
                        <div className="absolute inset-0 bg-brand-grey/40 group-hover:bg-transparent transition-colors duration-700"></div>
                        <div className="absolute top-4 left-4 z-20">
                          <span className="px-3 py-1 bg-white text-brand-grey text-[9px] font-semibold rounded-full uppercase tracking-widest shadow-xl">
                            {sermon.category || 'Service'}
                          </span>
                        </div>
                        <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                           <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/40 shadow-2xl">
                              <Play size={24} className="text-white ml-1" fill="currentColor" />
                           </div>
                        </div>
                      </div>

                      <div className="p-10 flex flex-col flex-grow">
                        <div className="flex items-center gap-3 text-muted-foreground text-[10px] font-medium uppercase tracking-[0.2em] mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                          <Calendar size={12} className="text-brand-sage/60" />
                          <time dateTime={sermon.date}>
                            {sermon.date ? new Date(sermon.date).toLocaleDateString(undefined, { dateStyle: 'long' }) : 'Recent'}
                          </time>
                        </div>
                        <h3 className="text-2xl font-semibold text-brand-grey mb-4 group-hover:text-brand-sage transition-colors tracking-tight uppercase leading-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                          {sermon.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-8 font-medium leading-relaxed italic">
                          "{sermon.description}"
                        </p>
                        <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                          <span className="text-[10px] font-semibold text-brand-grey/40 flex items-center gap-2 uppercase tracking-[0.2em] group-hover:text-brand-sage group-hover:translate-x-2 transition-all" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                            Watch Mission Brief <ChevronRight size={14} />
                          </span>
                        </div>
                      </div>
                    </GlowCard>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Sermons;
