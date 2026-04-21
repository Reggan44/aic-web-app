import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Sparkles, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePwaMode } from '../../../hooks/usePwaMode';
import { useAppInstall } from '../../../hooks/useAppInstall';
import { useBibleSync } from '../../../providers/BibleSyncProvider';

const AppInstallFAB: React.FC = () => {
  const isStandalone = usePwaMode();
  const navigate = useNavigate();
  const { canInstall, handleInstallClick, platform } = useAppInstall();
  const { isSyncing, progress, isAlreadySynced } = useBibleSync();
  const [isHovered, setIsHovered] = useState(false);

  const handleActionClick = () => {
    // If we are syncing, we might want to show sync status on click too?
    // But for now follow standard install flow
    if (canInstall && platform === 'android' && !isStandalone) {
      handleInstallClick();
    } else {
      navigate('/app');
    }
  };

  return (
    <div id="tour-fab" className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[80]">
      <div onClick={handleActionClick} className="cursor-pointer touch-manipulation">
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          className="relative group lg:block"
        >
          {/* Pulsing Outer Ring or Progress Ring */}
          {isSyncing ? (
            <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 100 100">
              <circle 
                cx="50" cy="50" r="48" 
                fill="none" 
                stroke="white" 
                strokeOpacity="0.1"
                strokeWidth="4"
              />
              <motion.circle 
                cx="50" cy="50" r="48" 
                fill="none" 
                stroke="#7c9a92" 
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: progress / 100 }}
                transition={{ duration: 0.5 }}
              />
            </svg>
          ) : (
            <div className="absolute inset-0 bg-brand-sage/20 rounded-full animate-ping pointer-events-none" style={{ animationDuration: '3s' }} />
          )}
          
          <div className="relative w-14 h-14 md:w-16 md:h-16 bg-black rounded-full shadow-2xl border border-brand-sage/10 flex items-center justify-center overflow-hidden">
            {/* Church Logo Background */}
            <img 
              src="/pwa-192x192.png" 
              alt="AIC Logo" 
              className="w-full h-full object-cover scale-[1.15] grayscale-[20%] group-hover:grayscale-0 transition-all opacity-40 group-hover:opacity-100" 
            />

            {/* Pulsing Badge / Sync Status */}
            <div className="absolute top-0 right-0 md:top-1 md:right-1 w-5 h-5 md:w-6 md:h-6 bg-brand-sage rounded-full flex items-center justify-center text-white shadow-lg border-2 border-white animate-bounce-slow">
              {isSyncing ? (
                <Loader2 size={10} strokeWidth={3} className="animate-spin scale-75 md:scale-100" />
              ) : (
                <Download size={10} strokeWidth={3} className="scale-75 md:scale-100" />
              )}
            </div>

            {/* Glowing Mesh Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-sage/5 to-transparent pointer-events-none" />
          </div>

          {/* Expanded Label */}
          <AnimatePresence>
            {(isHovered || isSyncing) && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: -10 }}
                exit={{ opacity: 0, x: -20 }}
                className="absolute right-full top-1/2 -translate-y-1/2 mr-4 whitespace-nowrap bg-slate-900 text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-2 pointer-events-none"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {isSyncing ? (
                  <>
                    <Activity size={12} className="text-brand-sage animate-pulse" />
                    Syncing Bible {progress}%
                  </>
                ) : (
                  <>
                    <Sparkles size={14} className="text-brand-sage" />
                    {isStandalone ? 'Stay Connected' : 'Get Official App'}
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

// Simple Activity icon replacement since it was missing in lucide import
const Activity = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);

export default AppInstallFAB;
