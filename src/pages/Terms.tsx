import { motion } from 'framer-motion';
import SEO from '../components/seo/SEO';

const Terms = () => {
  return (
    <div className="bg-white min-h-screen pb-24 antialiased overflow-hidden relative">
      <SEO 
        title="Terms of Service" 
        description="Terms of Service for AIC Happy Valley Church, Thika."
        url="/terms"
        noIndex={true}
      />

      {/* Background Mesh */}
      <div className="absolute top-0 right-0 w-full h-full opacity-[0.05] pointer-events-none">
        <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] bg-brand-sage rounded-full blur-[160px]"></div>
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-brand-sky rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 pt-48">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-brand-sage text-[10px] font-semibold uppercase tracking-[0.45em] mb-4 block" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Operational Conduct
          </span>
          <h1 className="text-5xl md:text-8xl font-medium text-brand-grey tracking-[0.05em] uppercase leading-none mb-16" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Terms of <span className="text-brand-sage">Service</span>
          </h1>

          <div className="prose prose-lg max-w-none text-muted-foreground space-y-12">
            <section className="space-y-6">
              <h2 className="text-xl font-bold text-brand-grey uppercase tracking-wider" style={{ fontFamily: "'Montserrat', sans-serif" }}>1. Mission Acceptance</h2>
              <p className="font-light leading-relaxed">
                By accessing AIC Happy Valley's digital platform, you agree to engage in a respectful and spiritually constructive manner consistent with our community values.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-xl font-bold text-brand-grey uppercase tracking-wider" style={{ fontFamily: "'Montserrat', sans-serif" }}>2. Authorized Use</h2>
              <p className="font-light leading-relaxed">
                All media dispatches, sermon recordings, and ministry resources provided on this site are for personal, spiritual use. Re-distribution for commercial gain without written clearance from the Church board is prohibited.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-xl font-bold text-brand-grey uppercase tracking-wider" style={{ fontFamily: "'Montserrat', sans-serif" }}>3. Giving & Contributions</h2>
              <p className="font-light leading-relaxed">
                Mission contributions made via M-PESA or other digital channels are voluntary. AIC Happy Valley ensures all sacrifices are used strictly for kingdom initiatives and community outreach.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-xl font-bold text-brand-grey uppercase tracking-wider" style={{ fontFamily: "'Montserrat', sans-serif" }}>4. Governance</h2>
              <p className="font-light leading-relaxed">
                These terms are governed by the ecclesiastical laws of the AIC Kenya and the civil laws of the Republic of Kenya.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Terms;
