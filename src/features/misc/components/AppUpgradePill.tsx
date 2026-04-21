import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cloud, ArrowRight, Smartphone } from 'lucide-react';
import { usePwaMode } from '../../../hooks/usePwaMode';
import { useAppInstall } from '../../../hooks/useAppInstall';
import IOSInstallPrompt from './IOSInstallPrompt';

const AppUpgradePill: React.FC = () => {
  const isStandalone = usePwaMode();
  const { showIOSPrompt, setShowIOSPrompt, handleInstallClick } = useAppInstall();

  // If already installed, don't show the pill
  if (isStandalone) return null;

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200, delay: 1 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] w-[90%] max-w-sm"
        >
          <div 
            onClick={() => handleInstallClick()}
            className="bg-white/90 backdrop-blur-xl border border-brand-sage/20 shadow-2xl rounded-full p-2 pr-4 flex items-center justify-between cursor-pointer hover:bg-white hover:scale-[1.02] transition-all group overflow-hidden"
          >
            {/* Animated background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-sage/0 via-brand-sage/5 to-brand-sage/0 opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-100%] group-hover:translate-x-[100%] duration-1000 ease-in-out pointer-events-none" />

            <div className="flex items-center gap-3 relative z-10">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                <Cloud size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-brand-sage leading-none mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Cloud Mode Active
                </span>
                <span className="text-xs font-semibold text-brand-grey leading-none">
                  Get App for Offline Access
                </span>
              </div>
            </div>

            <div className="w-8 h-8 rounded-full bg-brand-sage text-white flex items-center justify-center shrink-0 shadow-lg group-hover:bg-brand-grey transition-colors relative z-10">
              <Smartphone size={14} className="group-hover:hidden" />
              <ArrowRight size={14} className="hidden group-hover:block" />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <IOSInstallPrompt isOpen={showIOSPrompt} onClose={() => setShowIOSPrompt(false)} />
    </>
  );
};

export default AppUpgradePill;
