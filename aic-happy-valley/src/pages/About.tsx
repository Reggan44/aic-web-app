import { motion } from 'framer-motion';

const About = () => {
  const leaders = [
    {
      name: 'Bishop Albunus Musyoka',
      role: 'Presiding Bishop',
      image: '/bishop.jpeg',
      bio: 'Bishop Albunus Musyoka leads AIC Happy Valley with a vision for spiritual depth, community impact, and the faithful proclamation of the Gospel.',
    },
  ];

  return (
    <div className="min-h-screen bg-background pt-44 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20 space-y-4"
        >
          <h1 className="text-4xl md:text-6xl font-black text-brand-grey tracking-tight">Our Leadership</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Guided by faith and committed to serving our community with love and integrity.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-1 max-w-lg mx-auto gap-12">
          {leaders.map((leader, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-brand-cream/50 rounded-[3rem] p-10 border border-brand-sage/10 shadow-xl shadow-brand-grey/5 flex flex-col items-center text-center space-y-8"
            >
              <div className="relative w-48 h-48 rounded-full overflow-hidden shadow-2xl border-4 border-white">
                <img 
                  src={leader.image} 
                  alt={leader.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-3xl font-black text-brand-grey tracking-tight">{leader.name}</h3>
                  <p className="text-brand-sage font-bold uppercase tracking-widest text-sm mt-2">{leader.role}</p>
                </div>
                <p className="text-muted-foreground leading-relaxed text-lg max-w-md">
                  {leader.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
