import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getSermons } from '../services/sermons';
import type { Sermon } from '../types';
import DownloadButton from '../components/DownloadButton';

const getYoutubeEmbedUrl = (url: string) => {
  if (!url) return '';
  // Support both watch?v= and youtu.be formats
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  
  if (match && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}`;
  }
  
  return url;
};

const Sermons = () => {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('All');

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

  return (
    <div className="pt-44 pb-20 px-4 max-w-7xl mx-auto min-h-screen">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold mb-12 flex items-center gap-4"
      >
        <span className="w-12 h-[2px] bg-brand-gold"></span>
        Sermons Archive
      </motion.h1>

      <p className="text-gray-300 max-w-2xl mb-12">
        Catch up on the latest messages. Immerse yourself in the Word of God anytime, anywhere.
      </p>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-gold"></div>
        </div>
      ) : sermons.length === 0 ? (
        <div className="text-center text-gray-400 py-20 bg-brand-grey rounded-2xl border border-brand-lightGrey">
          <p className="text-xl">No sermons available yet. Check back soon!</p>
        </div>
      ) : (
        <>
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-3 mb-10">
            {['All', ...Array.from(new Set(sermons.map(s => s.category || 'Service')))].map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  activeCategory === category 
                    ? 'bg-brand-gold text-black shadow-lg scale-105' 
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sermons
              .filter(s => activeCategory === 'All' || (s.category || 'Service') === activeCategory)
              .map((sermon, index) => (
              <motion.div
                key={sermon.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-brand-grey rounded-xl overflow-hidden border border-brand-lightGrey hover:border-brand-gold transition-colors block group cursor-pointer"
              >
                <div className="aspect-video bg-[#0f0f0f] relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 z-10 pointer-events-none">
                    <div className="w-12 h-12 bg-brand-gold rounded-full flex items-center justify-center scale-75 group-hover:scale-100 transition-transform">
                      <div className="w-0 h-0 border-t-6 border-t-transparent border-l-8 border-l-black border-b-6 border-b-transparent ml-1"></div>
                    </div>
                  </div>
                  {/* Fallback gradient if no videoUrl is parsed as iframe properly */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand-grey to-brand-lightGrey opacity-50"></div>
                  {sermon.videoUrl && (
                    <iframe 
                      src={getYoutubeEmbedUrl(sermon.videoUrl)} 
                      title={sermon.title}
                      className="w-full h-full object-cover relative z-0"
                      allowFullScreen
                    />
                  )}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-brand-gold text-xs font-semibold tracking-wider uppercase">{sermon.category || 'Service'}</span>
                    <span className="text-gray-400 text-xs">{sermon.date ? new Date(sermon.date).toLocaleDateString() : 'Recent'}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-brand-gold transition-colors">{sermon.title}</h3>
                  <p className="text-gray-400 text-sm line-clamp-2 mb-4">{sermon.description}</p>
                  <DownloadButton
                    title={sermon.title}
                    url={sermon.videoUrl}
                    content={sermon.description}
                    type="sermon"
                    className="mt-auto"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sermons;
