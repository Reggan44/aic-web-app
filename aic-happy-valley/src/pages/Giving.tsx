import { motion } from 'framer-motion';
import { Heart, Smartphone, Banknote, ShieldCheck, Info, ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const Giving = () => {
  return (
    <div className="min-h-screen bg-brand-cream pt-24 md:pt-32 pb-20 px-4 xs:px-6 lg:px-8 font-sans">
      <Helmet>
        <title>Giving & Support - Partner With Our Mission | AIC Happy Valley</title>
        <meta name="description" content="Support the ministries of AIC Happy Valley. Learn how to give via M-PESA, bank transfer, or in-person. Your generosity helps us serve the Thika community and spread the Gospel." />
        <meta name="keywords" content="Give to AIC Happy Valley, M-PESA Paybill Church, Church Donations Thika, Supporting Christian Ministry Kenya" />
        <link rel="canonical" href="https://aic-happy-valley.web.app/giving" />
      </Helmet>

      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 md:mb-24 max-w-3xl mx-auto"
        >
          <span className="inline-block px-4 py-1.5 bg-brand-sage/10 text-brand-sage text-[10px] xs:text-xs font-bold rounded-full uppercase tracking-[0.2em] border border-brand-sage/20 mb-4">
            Generosity
          </span>
          <h1 className="text-3xl xs:text-4xl md:text-6xl font-black text-brand-darkGrey tracking-tight mb-6 md:mb-8">
            Partner With <span className="text-brand-sage italic">Us</span>.
          </h1>
          <p className="text-brand-darkGrey/60 text-base xs:text-xl leading-relaxed font-medium">
            Your generosity impacts lives in Thika and beyond. Every gift helps us continue our mission of growing deeper and living stronger.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xs:gap-12 items-stretch">
          
          {/* M-PESA Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 xs:p-10 md:p-14 rounded-[2rem] xs:rounded-[3rem] border border-brand-sage/10 shadow-2xl flex flex-col relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-24 h-24 xs:w-32 xs:h-32 bg-brand-sage/5 rounded-bl-[80px] xs:rounded-bl-full transition-all group-hover:scale-110"></div>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-6 xs:gap-8 mb-8 xs:mb-12">
              <div className="w-20 h-14 xs:w-24 xs:h-16 bg-[#4CAF50] rounded-2xl flex items-center justify-center shadow-lg p-2 group-hover:rotate-3 transition-transform shrink-0">
                <img 
                   src="https://upload.wikimedia.org/wikipedia/commons/1/15/M-PESA_LOGO-01.svg" 
                   alt="M-PESA Logo" 
                   className="w-full h-full object-contain filter brightness-0 invert" 
                />
              </div>
              <div>
                <h2 className="text-2xl xs:text-3xl font-black text-brand-darkGrey mb-1 shrink-0">M-PESA Paybill</h2>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-[#2E7D32] rounded-full text-[10px] font-black uppercase tracking-widest border border-green-100">
                  <ShieldCheck size={14} />
                  Safe & Instant
                </span>
              </div>
            </div>

            <div className="space-y-6 flex-grow">
              <div className="bg-brand-cream/40 p-6 xs:p-8 md:p-10 text-center rounded-[1.5rem] xs:rounded-[2rem] border border-brand-sage/10 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-4 text-[10px] font-black text-brand-darkGrey/40 uppercase tracking-widest">Paybill Number</div>
                <p className="text-3xl xs:text-4xl md:text-6xl font-black text-brand-darkGrey tracking-widest">400222</p>
              </div>

              <div className="bg-brand-cream/40 p-6 xs:p-8 md:p-10 text-center rounded-[1.5rem] xs:rounded-[2rem] border border-brand-sage/10 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-4 text-[10px] font-black text-brand-darkGrey/40 uppercase tracking-widest">Account Number</div>
                <p className="text-xl xs:text-2xl sm:text-3xl md:text-5xl font-black text-brand-sage tracking-wider break-all px-2">1701889#</p>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-brand-sage/10 rounded-2xl">
                 <Info className="text-brand-sage shrink-0" size={18} />
                 <p className="text-[10px] xs:text-sm font-bold text-brand-darkGrey/60 italic leading-snug">
                   Please include the '#' sign in the account number for correct processing.
                 </p>
              </div>
            </div>
          </motion.div>

          {/* Why We Give & Info */}
          <div className="flex flex-col gap-6 xs:gap-8">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-brand-darkGrey p-8 xs:p-10 md:p-12 rounded-[2rem] xs:rounded-[3rem] shadow-2xl relative overflow-hidden"
            >
              <Heart className="absolute -bottom-6 -right-6 w-32 h-32 xs:w-40 xs:h-40 text-white/5 rotate-12" />
              <h3 className="text-xl xs:text-2xl font-black mb-6 text-white flex items-center gap-3">
                 <Heart className="text-brand-sage" size={24} />
                 Why We Give
              </h3>
              <p className="text-white/70 text-base xs:text-lg leading-relaxed font-medium mb-6">
                Giving is a profound expression of our worship, our trust in God as our provider, and our commitment to His kingdom's expansion. 
              </p>
              <div className="h-px bg-white/10 w-full mb-6"></div>
              <p className="text-brand-sage font-black text-[10px] xs:text-sm uppercase tracking-[0.2em] italic">
                "Each of you should give what you have decided in your heart to give..." — 2 Cor 9:7
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white p-8 xs:p-10 md:p-12 rounded-[2rem] xs:rounded-[3rem] border border-brand-sage/10 shadow-xl flex-grow flex flex-col"
            >
              <h3 className="text-xl xs:text-2xl font-black mb-8 text-brand-darkGrey">Other Ways to Give</h3>
              <ul className="space-y-6 flex-grow">
                {[
                  { icon: Banknote, text: 'In-person during Sunday Services' },
                  { icon: Smartphone, text: 'Bank Transfer (EFT/Mobile App)' },
                  { icon: Info, text: 'Material Donations for Outreach' },
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 xs:gap-6 group">
                    <div className="w-10 h-10 xs:w-12 xs:h-12 bg-brand-cream rounded-[1rem] xs:rounded-2xl flex items-center justify-center text-brand-sage group-hover:bg-brand-sage group-hover:text-white transition-all duration-300 shadow-sm shrink-0">
                      <item.icon size={18} className="xs:size-[20px]" />
                    </div>
                    <div>
                        <span className="text-sm xs:text-lg font-black text-brand-darkGrey group-hover:text-brand-sage transition-colors">{item.text}</span>
                        <p className="text-[8px] xs:text-[10px] font-bold text-brand-darkGrey/30 uppercase tracking-widest mt-0.5">Available Daily</p>
                    </div>
                  </li>
                ))}
              </ul>
              <button className="mt-8 md:mt-10 w-full py-4 rounded-full border-2 border-brand-sage/20 text-brand-darkGrey font-black hover:bg-brand-sage/5 transition-all flex items-center justify-center gap-2 text-sm xs:text-base active:scale-95 transition-transform">
                 Contact Admin for details
                 <ArrowRight size={18} />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Giving;
