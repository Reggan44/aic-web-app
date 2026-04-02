import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchChapter, bibleBooks } from '../api/bible-api';
import type { BibleVerse } from '../api/bible-api';
import { ChevronRight, ChevronLeft, Lock, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BibleReader = () => {
  const [lang, setLang] = useState<'KJV' | 'SUV'>('KJV');
  const [bookId, setBookId] = useState(1);
  const [chapter, setChapter] = useState(1);
  const [verses, setVerses] = useState<BibleVerse[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPWA, setIsPWA] = useState(false);
  const [books] = useState(bibleBooks);

  useEffect(() => {
    // Check if running in standalone mode (PWA)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true;
    setIsPWA(isStandalone);
    
    loadChapter();
  }, [bookId, chapter, lang]);

  const loadChapter = async () => {
    setLoading(true);
    try {
      const data = await fetchChapter(lang, bookId, chapter);
      setVerses(data);
    } catch (err) {
      console.error('Error loading Bible chapter:', err);
    } finally {
      setLoading(false);
    }
  };

  const currentBook = books.find(b => b.id === bookId);

  if (!isPWA && import.meta.env.PROD) {
    return (
      <div className="min-h-screen bg-brand-cream flex items-center justify-center p-6 pt-32">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-[2.5rem] p-10 shadow-2xl text-center border border-brand-sage/20"
        >
          <div className="w-20 h-20 bg-brand-sage/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <Lock className="text-brand-sage w-10 h-10" />
          </div>
          <h2 className="text-3xl font-black text-brand-darkGrey mb-4">Unlock the Full Bible</h2>
          <p className="text-brand-grey/70 mb-8 leading-relaxed">
            The full Bible reader is a premium feature for our App members. Download it now to follow along with sermons directly from your home screen.
          </p>
          <Button 
            className="w-full py-8 rounded-full text-lg font-bold bg-brand-sage group shadow-lg shadow-brand-sage/20"
            onClick={() => window.location.href = '#'}
          >
            <Smartphone className="mr-2 group-hover:scale-110 transition-transform" />
            Install AIC App
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-cream pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4">
        
        {/* Bible Controls */}
        <div className="flex flex-col md:flex-row gap-6 mb-12 items-center bg-white/50 backdrop-blur-md p-6 rounded-[2rem] border border-brand-sage/10 sticky top-24 z-30 shadow-lg shadow-brand-sage/5">
          <div className="flex-1 flex gap-4 w-full">
            <select 
              value={bookId} 
              onChange={(e) => {
                setBookId(parseInt(e.target.value));
                setChapter(1);
              }}
              className="flex-1 bg-white border border-brand-sage/20 rounded-2xl px-6 py-4 text-brand-darkGrey font-bold outline-none focus:border-brand-sage transition-colors appearance-none"
            >
              {books.map(b => (
                <option key={b.id} value={b.id}>
                  {lang === 'KJV' ? b.name : b.swahili}
                </option>
              ))}
            </select>

            <select 
              value={chapter} 
              onChange={(e) => setChapter(parseInt(e.target.value))}
              className="w-32 bg-white border border-brand-sage/20 rounded-2xl px-6 py-4 text-brand-darkGrey font-bold outline-none focus:border-brand-sage transition-colors appearance-none text-center"
            >
              {Array.from({ length: 150 }, (_, i) => i + 1).map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="flex border border-brand-sage/30 rounded-full overflow-hidden p-1 bg-white shrink-0 shadow-sm">
            <button 
              onClick={() => setLang('KJV')}
              className={`px-6 py-2.5 rounded-full text-xs font-black transition-all ${lang === 'KJV' ? 'bg-brand-sage text-brand-darkGrey shadow-sm' : 'text-brand-grey/50 hover:text-brand-sage'}`}
            >
              ENGLISH
            </button>
            <button 
              onClick={() => setLang('SUV')}
              className={`px-6 py-2.5 rounded-full text-xs font-black transition-all ${lang === 'SUV' ? 'bg-brand-sage text-brand-darkGrey shadow-sm' : 'text-brand-grey/50 hover:text-brand-sage'}`}
            >
              SWAHILI
            </button>
          </div>
        </div>

        {/* Reader Title */}
        <div className="text-center mb-12">
          <motion.div
            key={`${bookId}-${chapter}-${lang}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl md:text-6xl font-black text-brand-darkGrey tracking-tighter uppercase">
              {lang === 'KJV' ? currentBook?.name : currentBook?.swahili} <span className="text-brand-sage italic">{chapter}</span>
            </h2>
            <p className="text-brand-grey/40 text-sm font-bold mt-2 uppercase tracking-[0.3em]">
              {lang === 'KJV' ? 'King James Version' : 'Hapo mwanzo kulikuwa na Neno'}
            </p>
          </motion.div>
        </div>

        {/* Bible Text */}
        <div className="bg-white rounded-[3rem] p-10 md:p-20 shadow-2xl shadow-brand-sage/5 border border-brand-sage/10 min-h-[50vh]">
          {loading ? (
            <div className="flex items-center justify-center min-h-[40vh]">
              <div className="w-12 h-12 border-4 border-brand-sage/20 border-t-brand-sage rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="space-y-10">
              {verses.map(v => {
                // Clean up Strong's numbers and other metadata tags
                const cleanText = v.text.replace(/<S>\d+<\/S>/g, '').replace(/<[^>]+>/g, '').trim();
                
                return (
                  <motion.p 
                    key={v.pk}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-xl md:text-2xl leading-relaxed text-brand-darkGrey/90 group"
                  >
                    <sup className="text-brand-gold font-black mr-3 text-sm">{v.verse}</sup>
                    <span className="font-medium">{cleanText}</span>
                  </motion.p>
                );
              })}
            </div>
          )}
        </div>

        {/* Floating Navigation Controls */}
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 flex gap-4 z-40">
          <Button 
            disabled={chapter === 1}
            onClick={() => setChapter(prev => prev - 1)}
            className="rounded-full w-16 h-16 bg-brand-darkGrey text-white shadow-2xl hover:scale-105 transition-all disabled:opacity-30 disabled:hover:scale-100"
          >
            <ChevronLeft size={32} />
          </Button>
          
          <Button 
            onClick={() => setChapter(prev => prev + 1)}
            className="rounded-full w-24 h-16 bg-brand-sage text-brand-darkGrey font-bold shadow-2xl hover:scale-105 transition-all flex gap-1"
          >
            {lang === 'KJV' ? 'NEXT' : 'Mbele'}
            <ChevronRight size={24} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BibleReader;
