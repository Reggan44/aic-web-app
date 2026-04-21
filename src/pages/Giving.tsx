import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Smartphone, Copy, CheckCircle2, ShieldCheck, HelpCircle } from 'lucide-react';
import { Button } from '../components/elements/Button';
import SEO from '../components/seo/SEO';

const GIVING_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'DonateAction',
  'name': 'Give to AIC Happy Valley',
  'description': 'Support the mission of AIC Happy Valley Church in Thika, Kenya through your generous tithes, offerings and donations.',
  'agent': {
    '@type': 'Church',
    '@id': 'https://aichappyvalley.org/#church',
    'name': 'AIC Happy Valley'
  },
  'url': 'https://aichappyvalley.org/giving',
  'instrument': [
    { '@type': 'PaymentMethod', 'name': 'M-PESA Paybill' }
  ]
};

const Giving = () => {
  const [copiedPaybill, setCopiedPaybill] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState(false);

  const handleCopy = (text: string, type: 'paybill' | 'account') => {
    navigator.clipboard.writeText(text);
    if (type === 'paybill') {
      setCopiedPaybill(true);
      setTimeout(() => setCopiedPaybill(false), 2000);
    } else {
      setCopiedAccount(true);
      setTimeout(() => setCopiedAccount(false), 2000);
    }
  };

  return (
    <div className="bg-white min-h-screen pb-24 antialiased relative overflow-hidden">
      <SEO
        title="Give & Support the Ministry"
        description="Support the mission of AIC Happy Valley Thika. Give securely via M-PESA. Your generosity transforms lives."
        url="/giving"
        keywords="give church Thika, church donation Kenya, M-PESA church giving, AIC Happy Valley donation, online tithe Kenya"
        schema={GIVING_SCHEMA}
      />

      {/* 1. CINEMATIC HERO */}
      <section className="relative px-6 bg-brand-grey overflow-hidden pt-48 pb-24">
        {/* Background Mesh */}
        <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-sage rounded-full blur-[140px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-brand-sky rounded-full blur-[160px]"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="space-y-6"
          >
            <span className="text-white/40 text-[10px] font-medium tracking-[0.45em] uppercase block" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Sacrifice & Kingdom Mission
            </span>
            <h1 className="text-4xl md:text-8xl font-medium text-white tracking-[0.05em] uppercase leading-none" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Worship Through <br /> <span className="text-brand-sage">Generosity</span>
            </h1>
            <p className="text-white/60 text-lg md:text-xl font-light italic max-w-2xl mx-auto leading-relaxed">
              Your faithful giving supports our mission to seek Christ and make Him known in every heart and community.
            </p>
          </motion.div>
        </div>
        
        {/* Bottom vignette */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent pointer-events-none"></div>
      </section>

      {/* Single Main Digital Wallet Card */}
      <section className="max-w-2xl mx-auto px-6 relative z-20 -mt-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-[2rem] p-8 md:p-12 border border-slate-100 shadow-2xl relative"
        >
          <div className="flex items-center justify-between mb-12">
            <div>
              <p className="text-[9px] uppercase font-semibold tracking-[0.4em] text-brand-sage mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Mission Method</p>
              <h2 className="text-3xl font-semibold text-brand-grey uppercase tracking-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                M-PESA
              </h2>
            </div>
            <div className="w-12 h-12 bg-brand-sage/5 border border-brand-sage/10 rounded-xl flex items-center justify-center text-brand-sage">
              <Smartphone size={24} />
            </div>
          </div>

          <div className="space-y-6">
            {/* Paybill Block */}
            <div className="bg-slate-50/50 hover:bg-slate-50 p-6 rounded-3xl border border-border/50 transition-colors group">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase font-bold tracking-widest text-muted-foreground mb-1">Business Number</p>
                  <p className="text-3xl lg:text-4xl font-black text-brand-grey tracking-tight font-mono">400222</p>
                </div>
                <Button 
                  onClick={() => handleCopy('400222', 'paybill')}
                  variant={copiedPaybill ? 'default' : 'outline'}
                  className={`rounded-xl shrink-0 transition-all ${copiedPaybill ? 'bg-green-500 text-white border-green-500' : 'text-brand-grey'}`}
                >
                  {copiedPaybill ? <CheckCircle2 size={16} className="mr-2" /> : <Copy size={16} className="mr-2" />}
                  {copiedPaybill ? 'Copied' : 'Copy'}
                </Button>
              </div>
            </div>

            {/* Account Block */}
            <div className="bg-slate-50/50 hover:bg-slate-50 p-6 rounded-3xl border border-border/50 transition-colors group">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase font-bold tracking-widest text-muted-foreground mb-1">Account Number</p>
                  <p className="text-3xl lg:text-4xl font-black text-brand-grey tracking-tight font-mono">1701889#</p>
                </div>
                <Button 
                  onClick={() => handleCopy('1701889#', 'account')}
                  variant={copiedAccount ? 'default' : 'outline'}
                  className={`rounded-xl shrink-0 transition-all ${copiedAccount ? 'bg-green-500 text-white border-green-500' : 'text-brand-grey'}`}
                >
                  {copiedAccount ? <CheckCircle2 size={16} className="mr-2" /> : <Copy size={16} className="mr-2" />}
                  {copiedAccount ? 'Copied' : 'Copy'}
                </Button>
              </div>
              <p className="text-xs font-semibold text-amber-600/80 mt-3 flex items-center gap-1.5 bg-amber-50 inline-flex px-3 py-1.5 rounded-lg border border-amber-100">
                <HelpCircle size={14} /> Include the "#" sign to ensure it routes exactly to us.
              </p>
            </div>
          </div>
          
          <div className="mt-10 pt-6 border-t border-brand-sage/5 flex items-center gap-3 text-xs font-medium text-brand-sage/70 justify-center">
            <ShieldCheck size={16} /> Safe, secure, and instant contribution.
          </div>
        </motion.div>
      </section>

      {/* 4. THE SACRIFICE QUOTE */}
      <section className="py-24 px-6 max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="mx-auto w-10 h-px bg-brand-sage/20 mb-12"></div>
          <p className="text-xl md:text-2xl font-light text-brand-grey leading-relaxed italic">
            "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver."
          </p>
          <p className="mt-8 text-[10px] font-semibold text-brand-sage uppercase tracking-[0.4em]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            2 Corinthians 9:7
          </p>
        </motion.div>
      </section>
    </div>
  );
};

export default Giving;
