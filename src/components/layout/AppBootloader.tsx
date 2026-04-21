import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ShieldCheck, Heart, Sparkles, Loader2, CheckCircle2, X } from 'lucide-react';
import { useBibleSync } from '../../providers/BibleSyncProvider';
import { usePwaMode } from '../../hooks/usePwaMode';

const AppBootloader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isStandalone = usePwaMode();
  const { startSync, isSyncing, progress, error, isAlreadySynced, isDismissed, markAsDismissed } = useBibleSync();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show the suggestion if:
    // 1. We are in the installed PWA app (standalone mode)
    // 2. We haven't successfully synced the Bible yet
    // 3. User hasn't dismissed it before
    if (isStandalone && !isAlreadySynced && !isDismissed) {
      // Delay slightly after onboarding if needed, but for now show it
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [isStandalone, isAlreadySynced, isDismissed]);

  const handleSkip = () => {
    markAsDismissed();
    setIsVisible(false);
  };

  const handleStartSync = async () => {
    // Start sync in background and allow user to enter site
    startSync();
    // We don't automatically close so they can see it start, 
    // but we can close it if they want. Actually per user req:
    // "tell them theire download is ongoing and they can be veing the site as they wait"
    // So let's close it after a small delay once syncing starts.
    setTimeout(() => setIsVisible(false), 2000);
  };

  return (
    <>
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-brand-grey/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center"
          >
            {/* Cinematic Background Elements */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-brand-sage rounded-full blur-[160px]" />
              <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-brand-sky rounded-full blur-[140px]" />
            </div>

            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="max-w-md w-full bg-white rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden"
            >
              {/* Close Button / Skip */}
              <button 
                onClick={handleSkip}
                className="absolute top-6 right-6 text-slate-300 hover:text-brand-grey transition-colors"
                title="Explore Site First"
              >
                <X size={20} />
              </button>

              <div className="mb-8">
                <div className="w-20 h-20 bg-brand-sage/10 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner">
                  <img src="/pwa-192x192.png" alt="AIC Logo" className="w-12 h-12 object-contain grayscale-[20%]" />
                </div>
                <h1 className="text-2xl font-black text-brand-grey uppercase tracking-tight mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Welcome Home
                </h1>
                <p className="text-slate-400 font-bold text-[9px] uppercase tracking-[0.3em]">Official Offline Experience</p>
              </div>

              {!isSyncing ? (
                <div className="space-y-8">
                  <div className="bg-slate-50 border border-slate-100 p-6 rounded-3xl text-left">
                    <h3 className="text-[10px] font-black uppercase text-brand-grey tracking-widest mb-3 flex items-center gap-2">
                       <ShieldCheck size={14} className="text-brand-sage" />
                       Offline Activation
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed font-semibold">
                      Download the complete Holy Bible to your device now to keep God's Word with you, even without internet.
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-[9px] font-black text-slate-300 uppercase tracking-widest">
                      <Sparkles size={10} />
                      Approx. 5.2 MB 
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <button
                      onClick={handleStartSync}
                      className="w-full h-16 bg-brand-grey text-white rounded-2xl flex items-center justify-center gap-4 hover:bg-brand-sage transition-all shadow-xl active:scale-95 group font-black uppercase tracking-widest text-xs"
                    >
                      Setup Offline Bible
                      <Download size={18} className="group-hover:translate-y-1 transition-transform" />
                    </button>
                    
                    <button
                      onClick={handleSkip}
                      className="w-full py-4 text-slate-400 font-bold uppercase tracking-widest text-[10px] hover:text-brand-grey transition-colors"
                    >
                      Explore Site First
                    </button>
                  </div>
                </div>
              ) : (
                <div className="py-8 space-y-6">
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative w-20 h-20">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle 
                          cx="50" cy="50" r="45" 
                          fill="none" 
                          stroke="#f1f5f9" 
                          strokeWidth="8"
                        />
                        <motion.circle 
                          cx="50" cy="50" r="45" 
                          fill="none" 
                          stroke="#7c9a92" 
                          strokeWidth="8"
                          strokeLinecap="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: progress / 100 }}
                          transition={{ duration: 0.5 }}
                          style={{ rotate: -90, transformOrigin: 'center' }}
                        />
                        <text x="50" y="55" fontSize="12" fontWeight="900" textAnchor="middle" fill="#1e293b">
                          {progress}%
                        </text>
                      </svg>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-black text-brand-grey uppercase tracking-widest mb-1 italic">Ongoing...</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Entering Sanctuary shortly</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-brand-sage/5 p-4 rounded-2xl border border-brand-sage/10 text-left">
                    <Loader2 className="animate-spin text-brand-sage shrink-0" size={16} />
                    <p className="text-[10px] text-brand-sage font-black uppercase tracking-widest leading-relaxed">
                      Syncing Scriptures in the background. You can continue to explore.
                    </p>
                  </div>
                </div>
              )}

              {error && (
                <p className="mt-6 text-red-500 text-[10px] font-bold uppercase tracking-widest text-center">{error}</p>
              )}
            </motion.div>

            <div className="mt-8 flex flex-col items-center gap-4">
              <Heart size={16} className="text-white/20 fill-white/20" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AppBootloader;
