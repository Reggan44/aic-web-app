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
    <div className="bg-gradient-to-b from-[#f8f6f2] to-[#fffefe] min-h-screen pb-24 font-sans">
      <SEO
        title="Give & Support the Ministry"
        description="Support the mission of AIC Happy Valley Thika. Give securely via M-PESA. Your generosity transforms lives."
        url="/giving"
        keywords="give church Thika, church donation Kenya, M-PESA church giving, AIC Happy Valley donation, online tithe Kenya"
        schema={GIVING_SCHEMA}
      />

      {/* Modern Hero */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand-sage/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -top-20 right-0 w-[400px] h-[400px] bg-brand-gold/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-3xl mx-auto text-center relative z-10 space-y-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-16 h-16 mx-auto bg-white rounded-full shadow-lg shadow-brand-sage/10 flex items-center justify-center border border-brand-sage/10"
          >
            <Heart className="w-8 h-8 text-brand-sage fill-brand-sage/20" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-4xl md:text-6xl font-black text-brand-grey tracking-tight leading-tight">
              Worship Through <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-sage to-brand-gold">Generosity</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
              Your faithful giving supports the mission to seek Christ and make Him known in our community, country, and the world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Single Main Digital Wallet Card */}
      <section className="max-w-2xl mx-auto px-4 relative z-20 -mt-2">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/90 backdrop-blur-3xl rounded-[2.5rem] p-8 md:p-12 border border-white shadow-2xl shadow-brand-sage/15 overflow-hidden relative"
        >
          {/* Card Accent */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-brand-sage via-brand-gold to-brand-sage rounded-t-full" />
          
          <div className="flex items-center justify-between mb-10 pb-6 border-b border-brand-sage/10">
            <div>
              <p className="text-[10px] uppercase font-black tracking-[0.3em] text-brand-sage mb-2">Primary Method</p>
              <h2 className="text-3xl font-black text-brand-grey flex items-center gap-3">
                M-PESA
              </h2>
            </div>
            <div className="w-14 h-14 bg-brand-sage/10 rounded-2xl flex items-center justify-center text-brand-sage shadow-inner">
              <Smartphone size={28} />
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

      {/* Why We Give */}
      <section className="py-24 px-4 max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-white/50 backdrop-blur-sm border border-brand-sage/10 p-10 md:p-14 rounded-[3rem] text-center shadow-lg shadow-brand-sage/5"
        >
          <div className="mx-auto w-10 h-10 bg-brand-sage/10 rounded-full flex items-center justify-center mb-8">
            <div className="w-2 h-2 bg-brand-sage rounded-full" />
          </div>
          <p className="text-xl md:text-2xl font-bold text-brand-grey leading-[1.6] tracking-tight italic">
            "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver."
          </p>
          <p className="mt-8 text-sm font-black text-brand-sage uppercase tracking-[0.25em]">
            2 Corinthians 9:7
          </p>
        </motion.div>
      </section>
    </div>
  );
};

export default Giving;
