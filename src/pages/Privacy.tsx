import { motion } from 'framer-motion';
import SEO from '../components/seo/SEO';

const Privacy = () => {
  return (
    <div className="bg-white min-h-screen pb-24 antialiased overflow-hidden relative">
      <SEO 
        title="Privacy Policy" 
        description="Privacy policy for AIC Happy Valley Church, Thika."
        url="/privacy"
        noIndex={true}
      />

      {/* Background Mesh */}
      <div className="absolute top-0 right-0 w-full h-full opacity-[0.05] pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-sage rounded-full blur-[140px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-sky rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 pt-48">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-brand-sage text-[10px] font-semibold uppercase tracking-[0.45em] mb-4 block" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Operational Security
          </span>
          <h1 className="text-5xl md:text-8xl font-medium text-brand-grey tracking-[0.05em] uppercase leading-none mb-16" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Privacy <span className="text-brand-sage">Policy</span>
          </h1>

          <div className="prose prose-lg max-w-none text-muted-foreground space-y-12">
            <section className="space-y-6">
              <h2 className="text-xl font-bold text-brand-grey uppercase tracking-wider" style={{ fontFamily: "'Montserrat', sans-serif" }}>1. Data Collection</h2>
              <p className="font-light leading-relaxed">
                At AIC Happy Valley, we respect your spiritual and digital privacy. Personal data collected via our contact forms (Name, Email) is used strictly for pastoral care and communication dispatched from our church office.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-xl font-bold text-brand-grey uppercase tracking-wider" style={{ fontFamily: "'Montserrat', sans-serif" }}>2. Digital Security</h2>
              <p className="font-light leading-relaxed">
                We implement mission-grade security protocols to protect your information. Your data is stored securely and never shared with external agencies or third-party marketing entities.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-xl font-bold text-brand-grey uppercase tracking-wider" style={{ fontFamily: "'Montserrat', sans-serif" }}>3. Communication</h2>
              <p className="font-light leading-relaxed">
                By providing your contact information, you consent to receive spiritual updates, mission newsletters, and community alerts. You may opt-out of digital dispatches at any time via the link in our emails.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-xl font-bold text-brand-grey uppercase tracking-wider" style={{ fontFamily: "'Montserrat', sans-serif" }}>4. Cookies & Analytics</h2>
              <p className="font-light leading-relaxed">
                Our platform uses minimal cookies to optimize the "Mission Explorer" experience. These are used strictly for functional performance and anonymous site analytics to help us serve our community better online.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;
