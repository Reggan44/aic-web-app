import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WifiOff, Activity } from 'lucide-react';
import { useOnlineStatus } from '../../../hooks/useOnlineStatus';
import { cn } from '../../../utils';

const OfflineIndicator = () => {
  const isOnline = useOnlineStatus();

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ y: 100, opacity: 0, x: '-50%' }}
          animate={{ y: 0, opacity: 1, x: '-50%' }}
          exit={{ y: 100, opacity: 0, x: '-50%' }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] pointer-events-none md:pointer-events-auto"
        >
          <div className="bg-slate-950/80 backdrop-blur-2xl border border-white/10 rounded-full px-5 py-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center gap-4 group transition-all hover:scale-105">
            <div className="relative">
              <div className="absolute inset-0 bg-brand-sky/20 rounded-full blur-lg animate-pulse" />
              <div className="relative w-8 h-8 rounded-full bg-slate-900 border border-brand-sky/30 flex items-center justify-center">
                <WifiOff size={14} className="text-brand-sky" />
              </div>
            </div>
            
            <div className="flex flex-col">
              <span 
                className={cn(
                  "text-[9px] uppercase font-bold tracking-[0.3em] text-brand-sky mb-0.5",
                  "flex items-center gap-2"
                )}
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Offline Explorer Mode
                <Activity size={8} className="animate-pulse" />
              </span>
              <p 
                className="text-[10px] text-white/60 font-medium max-w-[200px] leading-relaxed"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Viewing synchronized mission data.
              </p>
            </div>

            {/* Expanded details on hover for desktop */}
            <div className="hidden md:block w-[1px] h-6 bg-white/10 ml-2" />
            <p className="hidden md:block text-[9px] text-white/40 italic max-w-[150px] leading-tight">
              Bible search will restore automatically when online.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OfflineIndicator;
