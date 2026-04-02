import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Book, Lightbulb, Share2, Download, Smartphone, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { dailyVerses } from '../../../data/daily-verses';

const DailyWord = () => {
  const [lang, setLang] = useState<'EN' | 'SW'>('EN');
  const [isPWA, setIsPWA] = useState(false);
  const [todayVerse, setTodayVerse] = useState(dailyVerses[0]);

  useEffect(() => {
    // Check if running in standalone mode (PWA)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true;
    setIsPWA(isStandalone);

    // Get verse based on day of month (1-31)
    const day = new Date().getDate();
    const verseIndex = (day - 1) % dailyVerses.length;
    setTodayVerse(dailyVerses[verseIndex]);
  }, []);

  const handleShare = () => {
    const text = lang === 'EN' 
      ? `"${todayVerse.verse}" - ${todayVerse.reference}` 
      : `"${todayVerse.swahiliVerse}" - ${todayVerse.swahiliReference}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Daily Word - AIC Happy Valley',
        text: text,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(text);
      alert('Copied to clipboard!');
    }
  };

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
          <h2 className="text-3xl font-black text-brand-darkGrey mb-4">Unlock the Word</h2>
          <p className="text-brand-grey/70 mb-8 leading-relaxed">
            The Daily Word and Full Bible are exclusive features of our official App. Download it now to carry the Word wherever you go.
          </p>
          <Button 
            className="w-full py-8 rounded-full text-lg font-bold bg-brand-sage group"
            onClick={() => window.location.href = '#'}
          >
            <Smartphone className="mr-2 group-hover:scale-110 transition-transform" />
            Install AIC App
          </Button>
          <p className="mt-6 text-xs text-brand-grey/50 font-medium">Available on iOS and Android via PWA</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-cream pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-brand-sage/20 rounded-xl flex items-center justify-center">
              <Lightbulb className="text-brand-sage w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black text-brand-darkGrey uppercase tracking-tighter">Daily Word</h1>
          </motion.div>

          <div className="flex border border-brand-sage/30 rounded-full overflow-hidden p-1 bg-white/50">
            <button 
              onClick={() => setLang('EN')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${lang === 'EN' ? 'bg-brand-sage text-brand-darkGrey shadow-sm' : 'text-brand-grey/60'}`}
            >
              ENGLISH
            </button>
            <button 
              onClick={() => setLang('SW')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${lang === 'SW' ? 'bg-brand-sage text-brand-darkGrey shadow-sm' : 'text-brand-grey/60'}`}
            >
              SWAHILI
            </button>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[3rem] p-12 md:p-20 shadow-2xl shadow-brand-sage/5 relative overflow-hidden border border-brand-sage/10"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-sage/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl -ml-32 -mb-32"></div>

          <div className="relative z-10">
            <Book className="text-brand-gold w-12 h-12 mb-8 opacity-50" />
            
            <p className="text-3xl md:text-5xl font-bold text-brand-darkGrey leading-[1.2] tracking-tight mb-12 italic serif">
              "{lang === 'EN' ? todayVerse.verse : todayVerse.swahiliVerse}"
            </p>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pt-8 border-t border-brand-sage/10">
              <div>
                <p className="text-xl font-black text-brand-sage uppercase tracking-[0.2em]">
                  {lang === 'EN' ? todayVerse.reference : todayVerse.swahiliReference}
                </p>
                <p className="text-brand-grey/40 text-sm font-medium mt-1">
                  Translation: {lang === 'EN' ? 'King James Version' : 'Swahili Union Version'}
                </p>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" size="icon" className="rounded-full w-14 h-14 border-brand-sage/20 text-brand-sage hover:bg-brand-sage hover:text-white transition-all" onClick={handleShare}>
                  <Share2 size={24} />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full w-14 h-14 border-brand-sage/20 text-brand-sage hover:bg-brand-sage hover:text-white transition-all">
                  <Download size={24} />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-12 text-center text-brand-grey/40 text-sm font-medium italic">
          "Grass withers and flowers fall, but the Word of our God shall stand forever." - Isaiah 40:8
        </div>
      </div>
    </div>
  );
};

export default DailyWord;
