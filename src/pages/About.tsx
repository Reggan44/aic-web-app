import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Target, Heart, Anchor, Users, Sparkles, Sprout, ArrowRight } from 'lucide-react';
import SEO from '../components/seo/SEO';

const ABOUT_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AboutPage',
      '@id': 'https://aichappyvalley.org/about#webpage',
      'url': 'https://aichappyvalley.org/about',
      'name': 'About AIC Happy Valley — Vision & Mission',
      'description': 'AIC Happy Valley exists to be a thriving Christ-centered church family. Growing Deeper, Living Stronger — rooted in Colossians 2:7.',
      'isPartOf': { '@id': 'https://aichappyvalley.org/#church' },
      'breadcrumb': {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://aichappyvalley.org/' },
          { '@type': 'ListItem', 'position': 2, 'name': 'About Us', 'item': 'https://aichappyvalley.org/about' }
        ]
      }
    },
    {
      '@type': 'Organization',
      '@id': 'https://aichappyvalley.org/#church',
      'name': 'AIC Happy Valley',
      'foundingDate': '1980',
      'mission': 'To lead people to Christ, nurture them in the word and equip them to live Godly, faithful lives that impact families, communities and the world for God\'s glory.',
      'knowsAbout': ['Spiritual formation', 'Bible study', 'Community outreach', 'Youth ministry', 'Discipleship']
    }
  ]
};

const About = () => {
  const [leaders, setLeaders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const { getLeaders } = await import('../features/leaders/api/getLeaders');
        const data = await getLeaders();
        setLeaders(data);
      } catch (err) {
        console.error("Failed to load leaders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaders();
  }, []);

  const coreValues = [
    { icon: Target, title: "Christ Centered", desc: "Jesus is our foundation and focus." },
    { icon: Sprout, title: "Deep Growth", desc: "We grow in the word and character." },
    { icon: Anchor, title: "Strong Faith", desc: "We stand firm and thrive in every season." },
    { icon: Users, title: "Loving Community", desc: "We grow, and walk together." },
    { icon: Sparkles, title: "Grateful Living", desc: "We live in thankfulness and worship." },
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <SEO
        title="About Us & Our Vision"
        description="AIC Happy Valley exists to be a thriving, Christ-centered church family in Thika, Kenya. Learn about our vision, mission, core values, and pastoral leadership."
        url="/about"
        image="/church-drone-view.jpeg"
        keywords="AIC Happy Valley about, church vision, church mission, Christian values Thika, pastoral leadership Kenya"
        schema={ABOUT_SCHEMA}
      />

      {/* 1. CINEMATIC EXPLORER HERO */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-brand-grey">
        {/* Cinematic Backdrop Overlay */}
        <div className="absolute inset-0 bg-[url('/church-compound-view.jpeg')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-brand-grey/90 via-brand-grey/60 to-brand-grey/90"></div>
        <div className="absolute inset-0 bg-brand-grey/40 mix-blend-multiply"></div>
        
        {/* Mesh Gradient Effect */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-sage/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-brand-sky/10 rounded-full blur-[150px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <span className="text-white/40 text-[10px] font-medium tracking-[0.4em] uppercase mb-8 block" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Our Global Mission Brief
            </span>
            <h1 className="text-4xl md:text-8xl font-medium text-white tracking-[0.05em] uppercase leading-none mb-8" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Growing Deeper<br />
              <span className="text-brand-sage">Living Stronger</span>
            </h1>
            <div className="flex items-center justify-center gap-6 mt-12">
              <div className="h-px w-12 bg-white/20"></div>
              <p className="text-white/60 text-xs sm:text-sm tracking-[0.2em] font-light uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Colossians 2:7
              </p>
              <div className="h-px w-12 bg-white/20"></div>
            </div>
          </motion.div>
        </div>

        {/* Bottom vignette */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-10"></div>
      </section>

      {/* 2. THE QUOTE */}
      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xl md:text-3xl text-brand-grey leading-relaxed font-light italic"
          >
            "Rooted and built up in Him, strengthened in the faith as you were taught and overflowing with thankfulness."
          </motion.p>
        </div>
      </section>

      {/* Vision & Mission */}
      <div className="bg-slate-50 border-y border-border py-24 mb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-[3rem] shadow-xl border border-border"
            >
              <div className="w-16 h-16 bg-brand-sky/10 text-brand-sky rounded-2xl flex items-center justify-center mb-8">
                <Target size={32} />
              </div>
              <h2 className="text-3xl font-semibold text-brand-grey tracking-tight mb-6 uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>Our Vision</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To be a Christ-centered, spirit-empowered church family where lives are deeply rooted in the word, strengthened by faith and transformed for kingdom impact.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-brand-sage text-white p-10 rounded-[3rem] shadow-xl shadow-brand-sage/20"
            >
              <div className="w-16 h-16 bg-white/20 text-white rounded-2xl flex items-center justify-center mb-8 backdrop-blur-sm">
                <Heart size={32} />
              </div>
              <h2 className="text-3xl font-semibold tracking-tight mb-6 text-white uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>Our Mission</h2>
              <p className="text-brand-sage-50 text-lg leading-relaxed">
                To lead people to Christ, nurture them in the word and equip them to live Godly, faithful lives that impact families, communities and the world for God's glory.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-semibold text-brand-grey tracking-[0.05em] uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>Our Core Values</h2>
          <div className="w-24 h-1 bg-brand-sage/20 mx-auto mt-6 rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {coreValues.map((value, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-[2rem] border border-border shadow-md hover:shadow-xl transition-shadow text-center group"
            >
              <div className="w-14 h-14 mx-auto bg-brand-sage/10 text-brand-sage rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <value.icon size={24} />
              </div>
              <h3 className="text-lg font-bold text-brand-grey mb-3">{value.title}</h3>
              <p className="text-sm text-muted-foreground">"{value.desc}"</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Focus Areas & Commitment */}
      <div className="bg-brand-grey text-white py-24 mb-24 rounded-[4rem] mx-4 sm:mx-8 shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
           <div className="absolute -top-32 -right-32 w-96 h-96 bg-brand-sage rounded-full blur-[100px]"></div>
           <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-brand-sky rounded-full blur-[100px]"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div className="space-y-12">
              <div>
                <h3 className="text-3xl font-black mb-8 border-l-4 border-brand-sage pl-6">Mission Focus Areas</h3>
                <div className="space-y-8 pl-7">
                  <div>
                    <h4 className="text-xl font-bold text-brand-sage mb-4 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-brand-sage"></div> Growing Deeper (Spiritual Formation)</h4>
                    <ul className="space-y-3 text-slate-300">
                      <li>• Encourage daily prayer and Bible study.</li>
                      <li>• Run discipleship programs for youths, children and adults.</li>
                      <li>• Promote personal holiness and intimacy with God.</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-brand-sky mb-4 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-brand-sky"></div> Living Stronger (Practical Impact)</h4>
                    <ul className="space-y-3 text-slate-300">
                      <li>• Equip members to serve and lead in ministry.</li>
                      <li>• Support and strengthen families and marriages.</li>
                      <li>• Engage the community through acts of love and goodness.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 p-10 rounded-[3rem] backdrop-blur-sm border border-white/10 flex flex-col justify-center">
              <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-brand-sage mb-6">Our Commitment</h3>
              <p className="text-xl leading-relaxed text-slate-200 mb-8 italic">
                Like a tree deeply rooted, we will remain grounded in Christ and bear fruit in season. We will teach, model and walk out a life that is not only growing deeper, but also living stronger for the glory of God and the transformation of lives.
              </p>
              <div className="border-t border-white/20 pt-8 mt-auto">
                <p className="text-sm text-slate-400 leading-relaxed font-medium">
                  <strong className="text-white">Summary:</strong> AIC Happy Valley exists to be a thriving Christ centered church family where people are planted deeply in Christ, grow in faith, serve with purpose and bear lasting fruit. We develop deeper spiritual roots and grow stronger in practical impact, we live our mission, to be a light in our community and a true reflection of God's kingdom.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Leadership Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[10px] font-medium tracking-[0.4em] text-brand-sage uppercase block mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            The Pastoral Team
          </span>
          <h2 className="text-3xl md:text-5xl font-semibold text-brand-grey tracking-[0.05em] uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>Our Leadership</h2>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-8 h-8 rounded-full border-4 border-brand-sage/30 border-t-brand-sage animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto gap-8 lg:gap-12">
            {leaders.map((leader, i) => (
              <motion.div
                key={leader.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to={`/about/pastors/${leader.id}`} className="block h-full group">
                  <div className="bg-white rounded-[2rem] p-8 border border-border hover:shadow-2xl transition-all duration-500 flex flex-col items-center text-center h-full relative overflow-hidden">
                    <div className="absolute top-0 w-full h-32 bg-gradient-to-b from-brand-sage/5 to-transparent -z-10 group-hover:from-brand-sage/10 transition-colors"></div>
                    
                    <div className="relative w-40 h-40 rounded-full overflow-hidden shadow-2xl border-4 border-white mb-8 group-hover:scale-105 transition-transform duration-500 grayscale-[40%] group-hover:grayscale-0 bg-slate-100">
                      <img 
                        src={leader.image} 
                        alt={leader.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="space-y-3 flex-grow">
                      <h3 className="text-2xl font-semibold text-brand-grey tracking-tight uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>{leader.name}</h3>
                      <p className="text-brand-sage font-medium uppercase tracking-[0.2em] text-[10px]" style={{ fontFamily: "'Montserrat', sans-serif" }}>{leader.role}</p>
                      <p className="text-muted-foreground leading-relaxed text-sm pt-4 italic font-medium">
                        "{leader.bio}"
                      </p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-100 w-full flex items-center justify-center text-brand-grey/40 font-semibold text-[10px] tracking-[0.2em] group-hover:text-brand-sage transition-all uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      View Mission Profile <ArrowRight size={14} className="ml-2 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default About;

