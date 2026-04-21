import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Download, ShieldCheck, Zap, Share, ChevronRight, Apple, PlaySquare } from 'lucide-react';
import SEO from '../../../components/seo/SEO';
import { useAppInstall } from '../../../hooks/useAppInstall';
import IOSInstallPrompt from '../components/IOSInstallPrompt';

const AppInstallPage: React.FC = () => {
  const { platform, handleInstallClick, showIOSPrompt, setShowIOSPrompt } = useAppInstall();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-[#fdfdfd] pt-32 pb-24 overflow-hidden relative">
      <SEO 
        title="AIC Happy Valley — Official Mobile App"
        description="Experience the Bible, Daily Word, and sermon updates offline with our official church application."
        url="/app"
      />

      {/* Cinematic Background Elements */}
      <div className="absolute top-0 right-0 w-full h-full opacity-[0.05] pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-sage rounded-full blur-[160px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-sky rounded-full blur-[140px] translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Vision & CTA */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-10"
          >
            <div>
              <motion.span 
                variants={itemVariants}
                className="inline-block text-brand-sage text-[10px] font-black uppercase tracking-[0.5em] mb-4"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                The Digital Mission
              </motion.span>
              <motion.h1 
                variants={itemVariants}
                className="text-6xl md:text-8xl font-black text-brand-grey leading-none tracking-tighter uppercase"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Church in <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-sage to-emerald-600">Your Pocket</span>
              </motion.h1>
              <motion.p 
                variants={itemVariants}
                className="mt-8 text-xl text-slate-500 max-w-lg leading-relaxed font-medium"
              >
                Carry the Word of God wherever you go. Our official app provides instant, 100% offline access to Scripture and daily devotions.
              </motion.p>
            </div>

            {/* Platform Selection */}
            <motion.div variants={itemVariants} className="space-y-6">
              <button
                onClick={() => handleInstallClick()}
                className="w-full md:w-auto h-20 px-10 bg-brand-grey text-white rounded-[2rem] flex items-center justify-between gap-8 group hover:bg-brand-sage transition-all shadow-2xl hover:shadow-brand-sage/20 whitespace-nowrap active:scale-95"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <Download className="animate-bounce" />
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] font-bold uppercase tracking-widest block opacity-60">Mission Deployment</span>
                    <span className="text-lg font-black uppercase tracking-tight">Deploy Official App</span>
                  </div>
                </div>
                <ChevronRight className="group-hover:translate-x-2 transition-transform opacity-30" />
              </button>

              <div className="flex items-center gap-6 px-4">
                <div className="flex items-center gap-2 text-slate-400">
                  <Apple size={16} /> <span className="text-[10px] font-bold uppercase tracking-widest">iOS Support</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-slate-200" />
                <div className="flex items-center gap-2 text-slate-400">
                  <PlaySquare size={16} /> <span className="text-[10px] font-bold uppercase tracking-widest">Android PWA</span>
                </div>
              </div>
            </motion.div>

            {/* Feature Pills */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: ShieldCheck, title: "100% Offline", desc: "No data mission reading." },
                { icon: Zap, title: "Zero Lag", desc: "Instant Bible access." },
              ].map((feature, i) => (
                <div key={i} className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-brand-sage/10 text-brand-sage flex items-center justify-center shrink-0">
                    <feature.icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-grey text-sm uppercase tracking-tight">{feature.title}</h3>
                    <p className="text-xs text-slate-400 mt-1">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column: Visual Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: -2 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative"
          >
            {/* Phone Frame Mockup */}
            <div className="relative mx-auto w-[300px] h-[600px] bg-slate-900 rounded-[3rem] border-8 border-slate-800 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden">
              {/* Speaker Bar */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-slate-800 rounded-b-2xl z-20" />
              
              {/* Internal Screen Content (Church Theme) */}
              <div className="absolute inset-0 bg-brand-grey p-4 pt-12 flex flex-col items-center justify-center text-center">
                 <img src="/pwa-192x192.png" alt="App Logo" className="w-24 h-24 mb-6" />
                 <h4 className="text-white text-xl font-black uppercase tracking-widest leading-none mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>AIC</h4>
                 <h4 className="text-brand-sage text-sm font-black uppercase tracking-[0.3em]" style={{ fontFamily: "'Montserrat', sans-serif" }}>Happy Valley</h4>
                 
                 <div className="mt-12 space-y-3 w-full px-4">
                    <div className="h-2 bg-white/10 rounded-full w-full animate-pulse" />
                    <div className="h-2 bg-white/10 rounded-full w-[80%] animate-pulse delay-75" />
                    <div className="h-2 bg-white/10 rounded-full w-[90%] animate-pulse delay-150" />
                 </div>
              </div>

              {/* Home Indicator */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1.5 bg-white/20 rounded-full" />
            </div>

            {/* Decorative Orbitals */}
            <div className="absolute -top-12 -left-12 w-32 h-32 bg-brand-sky/20 rounded-full blur-2xl border-4 border-white animate-pulse" />
            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-brand-sage/20 rounded-full blur-3xl" />
          </motion.div>
        </div>

        {/* Deployment Instructions Section */}
        <section className="mt-32 pt-24 border-t border-slate-100">
           <div className="text-center mb-16">
              <h2 className="text-3xl font-black text-brand-grey uppercase tracking-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>Installation Protocol</h2>
              <p className="text-slate-400 text-sm mt-3 uppercase tracking-[0.2em] font-bold">Standard Operating Procedures</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="space-y-6">
                 <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-brand-grey font-black">01</div>
                 <h3 className="text-lg font-black uppercase tracking-tight">Open Safari / Chrome</h3>
                 <p className="text-sm text-slate-500 leading-relaxed">Ensure you are visiting this page using your phone's native browser for the best deployment experience.</p>
              </div>
              <div className="space-y-6">
                 <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-brand-grey font-black">02</div>
                 <h3 className="text-lg font-black uppercase tracking-tight">Select 'Add to Home'</h3>
                 <p className="text-sm text-slate-500 leading-relaxed">On iOS, tap the <Share size={16} className="inline mx-1" /> Share button. On Android, look for the 'Install App' option in the settings menu.</p>
              </div>
              <div className="space-y-6">
                 <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-brand-grey font-black">03</div>
                 <h3 className="text-lg font-black uppercase tracking-tight">Activate Alerts</h3>
                 <p className="text-sm text-slate-500 leading-relaxed">Once launched from your home screen, click 'Enable Notifications' to receive daily spiritual encouragement.</p>
              </div>
           </div>
        </section>
      </div>

      <IOSInstallPrompt isOpen={showIOSPrompt} onClose={() => setShowIOSPrompt(false)} />
    </div>
  );
};

export default AppInstallPage;
