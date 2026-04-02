import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getSermons } from '../services/sermons';
import type { Sermon } from '../types';
import { Play, Calendar, Search, Filter, X, ChevronRight, MessageCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const Sermons = () => {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSermon, setSelectedSermon] = useState<Sermon | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchSermons = async () => {
      try {
        const data = await getSermons();
        setSermons(data);
      } catch (error) {
        console.error("Error fetching sermons:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSermons();
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

  const filteredSermons = sermons.filter(sermon => 
    sermon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sermon.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-brand-cream pt-24 md:pt-32 pb-20 px-4 xs:px-6 lg:px-8 font-sans">
      <Helmet>
        <title>Sermon Archive - Bible-Based Teaching | AIC Happy Valley</title>
        <meta name="description" content="Watch and listen to our latest sermons at AIC Happy Valley. Explore our archive of Bible-based teachings from Bishop Albunus Musyoka, Pastor Sam, and guest speakers serving Thika." />
        <meta name="keywords" content="AIC Happy Valley Sermons, Thika Church Teachings, Christian Messages Kenya, Bible Study Thika, Online Sermons Thika" />
        <link rel="canonical" href="https://aic-happy-valley.web.app/sermons" />
      </Helmet>
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-brand-sage/10 text-brand-sage text-[10px] xs:text-xs font-bold rounded-full uppercase tracking-[0.2em] border border-brand-sage/20 mb-4">
            Archive
          </span>
          <h1 className="text-3xl xs:text-4xl md:text-6xl font-black text-brand-darkGrey tracking-tight mb-6">
            The <span className="text-brand-sage italic">Sermon</span> Library.
          </h1>
          <p className="text-brand-darkGrey/60 text-base xs:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
            Explore our collection of Bible-based teachings, recorded live from our Sunday services at Happy Valley.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <div className="mb-10 md:mb-12 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-sage/40" size={18} />
            <input 
              type="text" 
              placeholder="Search by topic or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-brand-sage/10 rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:ring-2 focus:ring-brand-sage transition-all shadow-xl shadow-brand-darkGrey/5 text-brand-darkGrey font-medium text-sm xs:text-base"
            />
          </div>
          <div className="flex gap-4 w-full md:w-auto">
             <button className="flex-grow md:flex-none flex items-center justify-center gap-2 px-6 py-4 bg-white border border-brand-sage/10 rounded-2xl font-bold text-brand-darkGrey/60 hover:bg-brand-sage/10 transition-all text-sm xs:text-base">
               <Filter size={18} />
               Filter
             </button>
          </div>
        </div>

        {/* Sermons Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-sage"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xs:gap-8">
            {filteredSermons.map((sermon, index) => (
              <motion.div
                key={sermon.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-[2rem] xs:rounded-[2.5rem] overflow-hidden border border-brand-sage/10 shadow-2xl shadow-brand-darkGrey/5 group hover:shadow-brand-sage/10 transition-all duration-500 flex flex-col cursor-pointer"
                onClick={() => setSelectedSermon(sermon)}
              >
                {/* Video Thumbnail Placeholder */}
                <div className="relative h-52 xs:h-56 bg-brand-darkGrey overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-darkGrey/80 to-transparent z-10" />
                  <img 
                    src={`https://img.youtube.com/vi/${getEmbedUrl(sermon.videoUrl).split('/').pop()}/maxresdefault.jpg`} 
                    alt={sermon.title}
                    className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                    onError={(e) => { (e.target as any).src = '/hero-bg.jpg'; }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="w-14 h-14 xs:w-16 xs:h-16 bg-brand-sage text-brand-darkGrey rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all group-hover:bg-brand-gold">
                      <Play size={20} className="xs:size-[24px]" fill="currentColor" />
                    </div>
                  </div>
                  <div className="absolute bottom-5 left-6 z-20 flex items-center gap-2">
                    <Calendar size={14} className="text-brand-sage" />
                    <span className="text-white/60 text-[10px] font-black uppercase tracking-widest">
                       {new Date(sermon.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                </div>

                <div className="p-6 xs:p-8 flex flex-col flex-grow">
                  <h3 className="text-xl xs:text-2xl font-black text-brand-darkGrey mb-3 tracking-tight group-hover:text-brand-sage transition-colors leading-tight">
                    {sermon.title}
                  </h3>
                  <p className="text-brand-grey/70 text-[12px] xs:text-sm leading-relaxed mb-6 line-clamp-3 font-medium italic">
                    "{sermon.description}"
                  </p>
                  <div className="mt-auto pt-6 border-t border-brand-sage/10 flex items-center justify-between">
                     <span className="text-[10px] font-black text-brand-darkGrey/40 uppercase tracking-widest">Sunday Service</span>
                     <ChevronRight className="text-brand-sage group-hover:translate-x-1 transition-transform" size={16} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Video Modal */}
        <AnimatePresence>
          {selectedSermon && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl pt-safe pb-safe"
              onClick={() => setSelectedSermon(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-brand-darkGrey rounded-[2rem] xs:rounded-[3rem] w-full max-w-5xl overflow-hidden shadow-2xl border border-white/10 max-h-[90vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
              >
                <div className="aspect-video w-full bg-black relative">
                  <iframe
                    src={`${getEmbedUrl(selectedSermon.videoUrl)}?autoplay=1`}
                    title={selectedSermon.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
                <div className="p-6 xs:p-10 text-white">
                  <div className="flex justify-between items-start mb-6 gap-4">
                    <div>
                      <h2 className="text-2xl xs:text-3xl font-black mb-2 tracking-tight leading-tight">{selectedSermon.title}</h2>
                      <div className="flex items-center gap-4 text-brand-sage font-bold text-[10px] xs:text-sm uppercase tracking-widest">
                        <span>{new Date(selectedSermon.date).toLocaleDateString()}</span>
                        <span className="hidden xs:block w-1 h-1 bg-white/20 rounded-full" />
                        <span className="hidden xs:block">Sunday Main Service</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedSermon(null)}
                      className="w-10 h-10 xs:w-12 xs:h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-all border border-white/10 shrink-0"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  <p className="text-white/60 text-base xs:text-lg leading-relaxed italic max-w-3xl">
                    "{selectedSermon.description}"
                  </p>
                  
                  <div className="mt-8 md:mt-10 pt-8 md:pt-10 border-t border-white/5 flex flex-col sm:flex-row gap-4">
                     <button className="px-8 py-4 bg-brand-sage text-brand-darkGrey font-black rounded-2xl hover:bg-white transition-all flex items-center justify-center gap-2 text-sm xs:text-base">
                        <MessageCircle size={20} />
                        Discuss on WhatsApp
                     </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Sermons;
