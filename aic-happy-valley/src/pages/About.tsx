import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, Heart, Star, ChevronRight, ShieldCheck, Music, Loader2, Users } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { getLeaders } from '../services/leaders';
import type { Leader } from '../types';

// Leader data is now fetched from Firestore

const ProfileModal = ({ leader, onClose }: { leader: Leader; onClose: () => void }) => (
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm pt-safe pb-safe"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.95 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="bg-white rounded-[2rem] xs:rounded-[2.5rem] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image */}
        <div className="relative h-60 xs:h-72 rounded-t-[2rem] xs:rounded-t-[2.5rem] overflow-hidden">
          <img src={leader.image} alt={leader.name} className="w-full h-full object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-all"
          >
            <X size={20} />
          </button>
          <div className="absolute bottom-6 left-6 xs:left-8">
            <h2 className="text-2xl xs:text-3xl font-black text-white">{leader.name}</h2>
            <p className="text-brand-gold font-bold text-[10px] xs:text-sm uppercase tracking-widest mt-1">{leader.role}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 xs:p-8 space-y-6 xs:space-y-8">
          {/* Tagline */}
          <p className="text-brand-sage font-bold text-base xs:text-lg italic">"{leader.tagline}"</p>

          {/* Bio */}
          <div>
            <h3 className="font-black text-brand-darkGrey text-[10px] xs:text-sm uppercase tracking-widest mb-3 flex items-center gap-2">
              <Heart size={14} className="text-brand-sage" /> About
            </h3>
            <p className="text-brand-grey/80 leading-relaxed text-sm xs:text-base">{leader.bio}</p>
          </div>

          {/* Highlights */}
          <div>
            <h3 className="font-black text-brand-darkGrey text-[10px] xs:text-sm uppercase tracking-widest mb-3 flex items-center gap-2">
              <Star size={14} className="text-brand-gold" /> Ministry Highlights
            </h3>
            <ul className="space-y-2">
              {leader.highlights.map((h, i) => (
                <li key={i} className="flex items-center gap-3 text-brand-darkGrey">
                  <ChevronRight size={16} className="text-brand-sage shrink-0" />
                  <span className="font-medium text-sm">{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Verse */}
          <div className="bg-brand-beige/60 rounded-2xl p-5 xs:p-6 border border-brand-sage/10">
            <h3 className="font-black text-brand-darkGrey text-[10px] xs:text-sm uppercase tracking-widest mb-3 flex items-center gap-2">
              <BookOpen size={14} className="text-brand-sage" /> Favourite Verse
            </h3>
            <p className="text-brand-darkGrey/90 italic leading-relaxed text-sm">{leader.verse.text}</p>
            <p className="text-brand-sage font-bold text-xs xs:text-sm mt-3">— {leader.verse.reference}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  </AnimatePresence>
);

const About = () => {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLeader, setSelectedLeader] = useState<Leader | null>(null);

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const data = await getLeaders();
        setLeaders(data);
      } catch (error) {
        console.error("Error fetching leaders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaders();
  }, []);

  return (
    <div className="min-h-screen bg-background pt-24 md:pt-32 pb-20 font-sans">
      <Helmet>
        <title>Our Mission, Vision & Leaders | AIC Happy Valley Thika</title>
        <meta name="description" content="Discover the heartbeat of AIC Happy Valley. Learn about our Christ-centered vision, our core values of faith and community, and meet our dedicated leadership team serving Thika." />
        <meta name="keywords" content="AIC Happy Valley Vision, Church Mission Thika, Bishop Albunus Musyoka, Pastor Sam, Pastor Miriam, Church Leadership Thika, Kenyan Church Values" />
        <link rel="canonical" href="https://aic-happy-valley.web.app/about" />
      </Helmet>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 xs:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 md:mb-20 space-y-4"
        >
          <span className="inline-block px-4 py-1.5 bg-brand-sage/10 text-brand-sage text-[10px] font-bold rounded-full uppercase tracking-[0.2em] border border-brand-sage/20">
            Growing Deeper, Living Stronger
          </span>
          <h1 className="text-3xl xs:text-4xl md:text-6xl font-black text-brand-darkGrey tracking-tight">
            Our <span className="text-brand-sage italic">Vision & Mission</span>
          </h1>
          <p className="text-base xs:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed italic">
            "Rooted and built up in Him, strengthened in the faith as you were taught and overflowing with thankfulness." — <span className="text-brand-sage font-bold">Colossians 2:7</span>
          </p>
        </motion.div>

        {/* Vision & Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 xs:gap-8 mb-20 md:mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 xs:p-12 rounded-[2rem] xs:rounded-[3rem] shadow-xl border-l-[8px] xs:border-l-[12px] border-brand-gold relative overflow-hidden"
          >
             <div className="absolute top-0 right-0 w-24 h-24 xs:w-32 xs:h-32 bg-brand-gold/5 rounded-full -mr-12 -mt-12 xs:-mr-16 xs:-mt-16" />
             <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold mb-4">Our Vision</h2>
             <p className="text-lg xs:text-2xl font-bold text-brand-darkGrey leading-snug">
               To be a Christ centered, spirit empowered church family where lives are deeply rooted in the word, strengthened by faith and transformed for kingdom impact.
             </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-brand-darkGrey p-8 xs:p-12 rounded-[2rem] xs:rounded-[3rem] shadow-xl border-l-[8px] xs:border-l-[12px] border-brand-sage relative overflow-hidden text-white"
          >
             <div className="absolute top-0 right-0 w-24 h-24 xs:w-32 xs:h-32 bg-brand-sage/10 rounded-full -mr-12 -mt-12 xs:-mr-16 xs:-mt-16" />
             <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-sage mb-4">Our Mission</h2>
             <p className="text-lg xs:text-2xl font-bold leading-snug">
               To lead people to Christ, nurture them in the word and equip them to live Godly, faithful lives that impact families, communities and the world for God’s glory.
             </p>
          </motion.div>
        </div>

        {/* Core Values Section */}
        <div className="mb-20 md:mb-32">
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-center mb-8 md:mb-12 text-brand-darkGrey/40">Our Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 text-center">
            {[
              { title: 'Christ centered', desc: '“Jesus is our foundation and focus”', color: 'bg-brand-gold', iconColor: 'text-brand-gold', icon: Star },
              { title: 'Deep growth', desc: '“We grow in the word and character”', color: 'bg-brand-sage', iconColor: 'text-brand-sage', icon: BookOpen },
              { title: 'Strong faith', desc: '“We stand firm and thrive in every season”', color: 'bg-brand-sky', iconColor: 'text-brand-sky', icon: ShieldCheck },
              { title: 'Loving community', desc: '“We grow, and walk together”', color: 'bg-brand-sage', iconColor: 'text-brand-sage', icon: Heart },
              { title: 'Grateful living', desc: '“We live in thankfulness and worship”', color: 'bg-brand-gold', iconColor: 'text-brand-gold', icon: Music },
            ].map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-5 xs:p-8 rounded-[1.5rem] xs:rounded-[2rem] border border-brand-grey/5 shadow-lg hover:shadow-2xl transition-all duration-300 group text-center relative overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${value.color}/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className={`w-10 h-10 xs:w-12 xs:h-12 ${value.color}/10 ${value.iconColor} rounded-2xl flex items-center justify-center mx-auto mb-4 xs:mb-6 group-hover:scale-110 transition-transform relative z-10`}>
                  <value.icon size={20} className="xs:size-[24px]" />
                </div>
                <h4 className="font-black text-brand-darkGrey text-sm xs:text-lg mb-2 leading-tight relative z-10">{value.title}</h4>
                <p className="text-[10px] xs:text-sm text-brand-grey/60 font-medium leading-relaxed italic relative z-10">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mission Focus Areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 xs:gap-12 mb-20 md:mb-32">
          <div className="bg-brand-cream/50 rounded-[2rem] xs:rounded-[3rem] p-8 xs:p-12 border border-brand-sage/10 relative overflow-hidden group">
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-brand-sage/5 rounded-full blur-3xl" />
            <h3 className="text-2xl xs:text-4xl font-black text-brand-darkGrey mb-6 xs:mb-8 flex items-center gap-4">
              <span className="w-10 h-10 xs:w-12 xs:h-12 bg-brand-sage text-white rounded-2xl flex items-center justify-center text-lg">1</span>
              Growing <span className="text-brand-sage italic">Deeper</span>
            </h3>
            <p className="text-brand-sage font-bold uppercase tracking-widest text-[10px] mb-6">Spiritual Formation</p>
            <ul className="space-y-4">
              {[
                'Encourage daily prayer and Bible study',
                'Run discipleship programs for youths',
                'Promote personal holiness'
              ].map(item => (
                <li key={item} className="flex items-start gap-4 text-brand-darkGrey font-medium text-sm xs:text-base">
                  <div className="w-5 h-5 xs:w-6 xs:h-6 bg-brand-sage/10 rounded-full flex items-center justify-center shrink-0 mt-1">
                    <ChevronRight size={14} className="text-brand-sage" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-[2rem] xs:rounded-[3rem] p-8 xs:p-12 shadow-xl border border-brand-gold/10 relative overflow-hidden group">
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-brand-gold/5 rounded-full blur-3xl" />
            <h3 className="text-2xl xs:text-4xl font-black text-brand-darkGrey mb-6 xs:mb-8 flex items-center gap-4">
              <span className="w-10 h-10 xs:w-12 xs:h-12 bg-brand-gold text-brand-darkGrey rounded-2xl flex items-center justify-center text-xl">2</span>
              Living <span className="text-brand-gold italic">Stronger</span>
            </h3>
            <p className="text-brand-gold font-bold uppercase tracking-widest text-[10px] mb-6">Practical Impact</p>
            <ul className="space-y-4">
              {[
                'Equip members to serve and lead',
                'Support and strengthen families',
                'Engage communal outreach'
              ].map(item => (
                <li key={item} className="flex items-start gap-4 text-brand-darkGrey font-medium text-sm xs:text-base">
                  <div className="w-5 h-5 xs:w-6 xs:h-6 bg-brand-gold/10 rounded-full flex items-center justify-center shrink-0 mt-1">
                    <ChevronRight size={14} className="text-brand-gold" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Commitment Summary */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-brand-darkGrey text-white rounded-[2rem] xs:rounded-[3rem] p-8 xs:p-16 text-center shadow-2xl relative overflow-hidden mb-20 md:mb-32"
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/leaf.png')] opacity-5 pointer-events-none" />
          <div className="max-w-3xl mx-auto space-y-6 xs:space-y-8 relative z-10">
            <h2 className="text-3xl xs:text-5xl font-black italic text-brand-sage">Our Commitment</h2>
            <p className="text-base xs:text-2xl font-medium leading-relaxed opacity-90 underline-offset-8">
              Like a tree deeply rooted, we will remain grounded in Christ and bear fruit in season. We will teach, model and walk out a life that is growing deeper and living stronger for the glory of God.
            </p>
            <div className="pt-6 xs:pt-8 border-t border-white/10">
              <p className="text-brand-gold font-black uppercase tracking-[0.3em] text-[10px]">AIC Happy Valley</p>
            </div>
          </div>
        </motion.div>

        {/* Leadership Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-20 space-y-4"
        >
          <span className="inline-block px-4 py-1.5 bg-brand-sage/10 text-brand-sage text-[10px] font-bold rounded-full uppercase tracking-[0.2em] border border-brand-sage/20">
            Our Leadership
          </span>
          <h1 className="text-3xl xs:text-4xl md:text-6xl font-black text-brand-darkGrey tracking-tight">
            Meet Our <span className="text-brand-sage italic">Pastors</span>
          </h1>
          <p className="text-base xs:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Guided by faith, called to serve. Our leadership team is dedicated to walking alongside every member of this community.
          </p>
        </motion.div>

        {/* Leaders Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
             <Loader2 className="size-12 text-brand-sage animate-spin mb-4" />
             <p className="text-brand-sage font-black uppercase tracking-widest text-[10px]">Gathering Leaders...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 xs:gap-8">
            {leaders.map((leader, i) => (
              <motion.div
                key={leader.id || leader.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group bg-white rounded-[2rem] xs:rounded-[2.5rem] overflow-hidden shadow-xl shadow-brand-grey/5 border border-brand-sage/10 hover:shadow-2xl hover:shadow-brand-sage/10 transition-all duration-500"
              >
                {/* Image */}
                <div className="relative h-72 xs:h-80 overflow-hidden">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                {/* Info */}
                <div className="p-6 xs:p-8 space-y-4">
                  <div>
                    <h3 className="text-xl xs:text-2xl font-black text-brand-darkGrey tracking-tight">{leader.name}</h3>
                    <p className="text-brand-sage font-bold uppercase tracking-widest text-[10px] mt-1">{leader.role}</p>
                  </div>
                  <p className="text-brand-grey/70 italic text-[12px] xs:text-sm">"{leader.tagline}"</p>
                  <p className="text-muted-foreground text-[12px] xs:text-sm leading-relaxed line-clamp-3">{leader.bio}</p>

                  <button
                    onClick={() => setSelectedLeader(leader)}
                    className="mt-2 w-full py-3 rounded-2xl bg-brand-sage/10 text-brand-sage font-bold text-sm hover:bg-brand-sage hover:text-brand-darkGrey transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                  >
                    View Full Profile
                    <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}

            {!loading && leaders.length === 0 && (
              <div className="col-span-full py-20 text-center bg-white/50 rounded-[3rem] border border-dashed border-brand-sage/20">
                 <Users className="size-16 text-brand-sage/20 mx-auto mb-4" />
                 <p className="text-brand-darkGrey/40 font-black tracking-widest uppercase text-sm">Leadership Profiles Coming Soon</p>
              </div>
            )}
          </div>
        )}

        {/* Our Purpose Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 md:mt-24 text-center bg-brand-beige/60 rounded-[2rem] xs:rounded-[2.5rem] p-10 xs:p-16 border border-brand-sage/10"
        >
          <h2 className="text-3xl xs:text-4xl md:text-6xl font-black text-brand-darkGrey mb-8 leading-none">
            A Thriving Church <span className="text-brand-sage italic">Family</span>
          </h2>
          <p className="text-lg xs:text-xl text-brand-grey max-w-4xl mx-auto leading-relaxed font-medium">
            AIC Happy Valley exists to be a thriving Christ centered church family where people are planted deeply in Christ, grow in faith, serve with purpose and bear lasting fruit.
          </p>
        </motion.div>
      </div>

      {/* Profile Modal */}
      {selectedLeader && <ProfileModal leader={selectedLeader} onClose={() => setSelectedLeader(null)} />}
    </div>
  );
};

export default About;
