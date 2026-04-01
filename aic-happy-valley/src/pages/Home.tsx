import { motion } from 'framer-motion';
import { ArrowRight, Heart, Calendar, Users, MessageCircle, BookOpen, Music, Coffee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans selection:bg-brand-sage/30">
      
      {/* 1. PEACEFUL HERO SECTION WITH VIDEO BACKGROUND */}
      <section className="relative min-h-[95vh] flex items-center justify-center pt-20 px-4 overflow-hidden bg-brand-cream">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover opacity-60 mix-blend-multiply"
          >
            <source src="/new%20%20AIC.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-brand-cream/80 via-transparent to-brand-cream"></div>
        </div>

        {/* Subtle Decorative Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-sage/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-sky/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        <motion.div 
          className="max-w-4xl mx-auto text-center relative z-10"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.span 
            variants={itemVariants}
            className="inline-block px-4 py-1.5 bg-brand-sage/10 text-brand-grey text-[13px] font-semibold rounded-full uppercase tracking-[0.2em] mb-8 border border-brand-sage/20"
          >
            AIC Happy Valley
          </motion.span>
          
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.1] tracking-tight mb-8 text-brand-grey"
          >
            Growing <span className="text-brand-sage italic">Deeper</span>,<br />
            Living <span className="text-brand-gold italic">Stronger</span>.
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed font-medium"
          >
            “You are welcome here.” Experience a Christ-centered family in the heart of Happy Valley. Join us this Sunday.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link to="/contact">
              <Button size="lg" className="rounded-full px-10 py-8 text-lg font-bold bg-brand-sage hover:scale-105 transition-all text-brand-grey shadow-lg shadow-brand-sage/20 border-none group">
                Plan Your Visit
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/sermons">
              <Button variant="outline" size="lg" className="rounded-full px-10 py-8 text-lg font-bold border-brand-sage/30 text-brand-grey hover:bg-brand-sage/5 hover:border-brand-sage transition-all">
                Watch Sermons
              </Button>
            </Link>
          </motion.div>

          <motion.div 
            variants={itemVariants} 
            className="mt-16 flex flex-wrap justify-center gap-8 text-sm font-bold text-muted-foreground/80 tracking-wide uppercase"
          >
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-brand-sage" />
              Sundays @ 8:00 & 10:30 AM
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold"></span>
              Thika, Happy Valley
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* 2. CALMING MISSION SECTION (Beige Background) */}
      <section className="py-32 bg-brand-beige/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <h2 className="text-4xl md:text-5xl font-black text-brand-grey leading-tight tracking-tight">
                A Place to Belong and Be <span className="text-brand-sage">Transformed</span>.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                At AIC Happy Valley, we believe everyone has a seat at the table. Our mission is to know Christ and make Him known, fostering a community where faith finds practical expression in daily life.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-4">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-brand-sage/20 flex items-center justify-center text-brand-grey font-bold">1</div>
                  <h4 className="font-bold">Bible Based</h4>
                  <p className="text-sm text-muted-foreground">Transformative teaching grounded in the Word of God.</p>
                </div>
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-brand-sky/20 flex items-center justify-center text-brand-grey font-bold">2</div>
                  <h4 className="font-bold">Family First</h4>
                  <p className="text-sm text-muted-foreground">A multi-generational home for all ages and backgrounds.</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl shadow-brand-grey/5"
            >
              <div className="absolute inset-0 bg-brand-sage/10 mix-blend-overlay"></div>
              <div className="w-full h-full bg-gradient-to-br from-brand-sage/20 to-brand-gold/20 flex items-center justify-center italic text-brand-grey font-medium text-xl">
                Community Worship Photo
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. MINISTRIES PREVIEW (Cream Background) */}
      <section className="py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-brand-grey tracking-tight">Our Ministries</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Discover your place to serve and grow within our various ministry areas.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Worship', icon: Music, color: 'bg-brand-sage/10' },
              { title: 'NextGen', icon: Heart, color: 'bg-brand-gold/10' },
              { title: 'Men', icon: Users, color: 'bg-brand-sky/10' },
              { title: 'Women', icon: Coffee, color: 'bg-brand-beige' },
            ].map((ministry, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="bg-brand-sage/5 p-10 rounded-[2.5rem] space-y-6 transition-all border border-transparent hover:border-brand-sage/20"
              >
                <ministry.icon size={40} className="text-brand-grey" />
                <h3 className="text-2xl font-black text-brand-grey">{ministry.title}</h3>
                <Link to="/ministries" className="inline-flex items-center text-sm font-bold text-brand-grey hover:gap-2 transition-all">
                  Read More <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WELCOMING CALL TO ACTION (Beige Background) */}
      <section className="py-32 bg-brand-beige">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-12">
          <h2 className="text-4xl md:text-6xl font-black text-brand-grey leading-tight">
            We'd Love to <span className="text-brand-sage">Meet You</span>.
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Whether you're just starting your spiritual journey or looking for a church home, we're here for you.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/contact">
              <Button size="lg" className="rounded-full px-12 py-8 text-xl font-bold bg-brand-grey text-white hover:bg-brand-grey/90 shadow-xl shadow-brand-grey/10 border-none outline-none">
                Contact Us
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="rounded-full px-12 py-8 text-xl font-bold border-brand-grey/20 text-brand-grey hover:bg-brand-grey/5">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
