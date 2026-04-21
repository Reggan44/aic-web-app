import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Mail, Phone, Calendar, ArrowRight } from 'lucide-react';
import SEO from '../components/seo/SEO';

// Mock data (In a real app, this might come from Firebase or a CMS)
const PASTORS_DATA: Record<string, any> = {
  'albunus-musyoka': {
    id: 'albunus-musyoka',
    name: 'Bishop Albunus Musyoka',
    role: 'Presiding Bishop',
    image: '/bishop.jpeg',
    email: 'aichappyvalley@gmail.com',
    phone: '+254 700 000 000',
    bio: [
      "Bishop Albunus Musyoka leads AIC Happy Valley with a profound vision for spiritual depth, community impact, and the faithful proclamation of the Gospel.",
      "With decades of dedicated service to the church, Bishop Musyoka has been instrumental in guiding the congregation through transformative seasons. His leadership is marked by a deep commitment to the authoritative teaching of the Word and a pastoral heart that cares for every member of the flock.",
      "Under his guidance, AIC Happy Valley continues to embrace the vision of 'Growing Deeper, Living Stronger', ensuring that every believer is rooted in Christ and equipped to make a kingdom impact in their families and communities."
    ],
    responsibilities: [
      'Spiritual oversight and visionary leadership of the church.',
      'Preaching and teaching the Word of God.',
      'Mentoring pastors and church leaders.',
      'Providing pastoral care and counseling.'
    ]
  },
  'sam': {
    id: 'sam',
    name: 'Pastor Sam',
    role: 'Associate Pastor',
    image: '/pastor-sam.jpeg',
    fallbackImage: null,
    email: 'aichappyvalley@gmail.com',
    phone: '+254 700 000 001',
    bio: [
      "Pastor Sam serves as a dynamic and passionate leader at AIC Happy Valley, focusing on spiritual formation and community engagement.",
      "He brings a vibrant energy to the pulpit and a genuine love for people, actively working to ensure the church family is deeply connected and growing in their faith journey.",
      "Pastor Sam champions our 'Living Stronger' initiative, empowering members to step out in faith, serve their community with purpose, and support one another in practical, life-changing ways."
    ],
    responsibilities: [
      'Leading discipleship and youth programs.',
      'Coordinating community outreach initiatives.',
      'Assisting in preaching and pastoral care.',
      'Overseeing volunteer ministries.'
    ]
  },
  'miriam': {
    id: 'miriam',
    name: 'Pastor Miriam',
    role: 'Associate Pastor',
    image: '/pastor Miriam.jpeg',
    email: 'aichappyvalley@gmail.com',
    phone: '+254 700 000 002',
    bio: [
      "Pastor Miriam is a dedicated leader at AIC Happy Valley, where she provides spiritual guidance and fosters a loving, faith-filled environment.",
      "She ensures that every member feels welcomed and supported, and she is deeply committed to nurturing the congregation through the Word of God.",
      "In her role, she leads and supports various church initiatives, focusing on community outreach and family-centered growth."
    ],
    responsibilities: [
      'Leading small group fellowships.',
      'Providing pastoral care and spiritual guidance.',
      'Overseeing outreach and community support.',
      'Ensuring a welcoming environment for visitors.'
    ]
  }
};

const PastorProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [leader, setLeader] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeader = async () => {
      try {
        if (!id) return;
        const { getLeaderById } = await import('../features/leaders/api/getLeaders');
        const data = await getLeaderById(id);
        setLeader(data);
      } catch (err) {
        console.error("Failed to load leader profile", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeader();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-background min-h-screen pt-32 pb-24 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-brand-sage/30 border-t-brand-sage animate-spin"></div>
      </div>
    );
  }

  if (!leader) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 pt-32">
        <h1 className="text-3xl font-bold mb-4">Profile Not Found</h1>
        <p className="text-muted-foreground mb-8">We couldn't find the pastoral profile you were looking for.</p>
        <Link to="/about" className="text-brand-sage hover:underline flex items-center font-bold">
          <ChevronLeft size={20} className="mr-1" /> Back to About Us
        </Link>
      </div>
    );
  }

  const bioParagraphs = leader.bio ? leader.bio.split('\n').filter((p: string) => p.trim() !== '') : [];

  return (
    <div className="bg-white min-h-screen pb-24 antialiased overflow-hidden relative">
      {/* Background Mesh */}
      <div className="absolute top-0 right-0 w-full h-full opacity-[0.05] pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-sage rounded-full blur-[140px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-sky rounded-full blur-[120px]"></div>
      </div>
      <SEO
        title={`${leader.name} — ${leader.role}`}
        description={bioParagraphs[0] || 'Leadership profile for AIC Happy Valley'}
        url={`/about/pastors/${leader.id}`}
        image={leader.image}
        keywords={`${leader.name}, ${leader.role}, AIC Happy Valley pastor, church leader Thika`}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Person',
          '@id': `https://aichappyvalley.org/about/pastors/${leader.id}`,
          'name': leader.name,
          'jobTitle': leader.role,
          'description': bioParagraphs[0] || '',
          'image': `https://aichappyvalley.org${leader.image}`,
          'url': `https://aichappyvalley.org/about/pastors/${leader.id}`,
          'worksFor': {
            '@type': 'Church',
            '@id': 'https://aichappyvalley.org/#church',
            'name': 'AIC Happy Valley'
          },
          'knowsAbout': ['Christian theology', 'Pastoral care', 'Discipleship'],
          'sameAs': ['https://aichappyvalley.org/about']
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10 pt-48">
        <Link to="/about" className="inline-flex items-center text-muted-foreground hover:text-brand-sage mb-12 transition-all font-semibold text-[10px] uppercase tracking-[0.3em]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          <ChevronLeft size={14} className="mr-2" /> Return to Command
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          <div className="lg:col-span-12 mb-20">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
            >
              <span className="inline-block text-brand-sage text-[10px] font-semibold uppercase tracking-[0.45em] mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                {leader.role}
              </span>
              <h1 className="text-5xl md:text-8xl font-medium text-brand-grey tracking-[0.05em] uppercase leading-none" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                {leader.name}
              </h1>
            </motion.div>
          </div>
          
          {/* Left Column: Image & Quick Info */}
          <div className="lg:col-span-5 space-y-12">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl bg-brand-grey border border-slate-100"
            >
              <img 
                src={leader.image}
                onError={(e) => {
                  e.currentTarget.src = '/pwa-512x512.png';
                }}
                alt={leader.name}
                className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-700"
              />
            </motion.div>

            <div className="bg-white rounded-[2rem] p-10 border border-slate-100 shadow-xl">
              <h3 className="text-[10px] font-semibold text-brand-grey uppercase tracking-[0.3em] mb-8" style={{ fontFamily: "'Montserrat', sans-serif" }}>Dispatch Access</h3>
              <ul className="space-y-6">
                <li className="flex items-center gap-4 text-muted-foreground hover:text-brand-sage transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-brand-sage/5 border border-brand-sage/10 flex items-center justify-center text-brand-sage shrink-0">
                    <Mail size={16} />
                  </div>
                  <a href={`mailto:aichappyvalley@gmail.com`} className="text-xs font-semibold uppercase tracking-tight">aichappyvalley@gmail.com</a>
                </li>
              </ul>

              <div className="mt-12 pt-8 border-t border-slate-50">
                 <Link to="/contact" className="w-full h-14 bg-brand-grey text-white text-[10px] font-semibold uppercase tracking-[0.2em] rounded-full flex items-center justify-center gap-3 hover:bg-brand-sage transition-all shadow-xl">
                    <Calendar size={16} /> Request Mission Brief
                 </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Bio & Details */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-12"
            >
              <div className="prose prose-lg max-w-none">
                {bioParagraphs.map((paragraph: string, index: number) => (
                  <p key={index} className="text-muted-foreground text-lg leading-relaxed font-light italic">
                    "{paragraph}"
                  </p>
                ))}
              </div>

              {leader.responsibilities && leader.responsibilities.length > 0 && (
                <div className="bg-slate-50/50 rounded-[2rem] p-10 border border-slate-100">
                  <h3 className="text-[10px] font-semibold text-brand-grey uppercase tracking-[0.3em] mb-8" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    Operational Focus Areas
                  </h3>
                  <ul className="space-y-5">
                    {leader.responsibilities.map((req: string, index: number) => (
                      <li key={index} className="flex items-start gap-4 text-muted-foreground">
                        <ArrowRight size={16} className="text-brand-sage shrink-0 mt-0.5" />
                        <span className="text-sm font-semibold text-brand-grey/60 uppercase tracking-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PastorProfile;
