import { motion } from 'framer-motion';
import { Scale, Users, AlertCircle, CheckCircle2 } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-brand-cream pt-24 md:pt-32 pb-20 px-4 xs:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-block p-4 bg-brand-sage/10 text-brand-sage rounded-2xl mb-6">
            <Scale size={32} className="md:size-[40px]" />
          </div>
          <h1 className="text-3xl xs:text-4xl md:text-5xl font-black text-brand-darkGrey tracking-tight mb-4">
            Terms of Service
          </h1>
          <p className="text-brand-darkGrey/60 text-sm xs:text-base font-medium italic">
            Last Updated: April 1, 2026
          </p>
        </motion.div>

        <div className="bg-white rounded-[2rem] xs:rounded-[2.5rem] p-6 xs:p-8 md:p-12 border border-brand-sage/10 shadow-2xl space-y-8 xs:space-y-10">
          
          <section>
            <h2 className="text-xl xs:text-2xl font-black text-brand-darkGrey flex items-center gap-3 mb-6">
              <Users className="text-brand-sage w-5 h-5 xs:w-6 xs:h-6" />
              1. Acceptance of Terms
            </h2>
            <p className="text-brand-darkGrey/70 leading-relaxed font-medium text-sm xs:text-base">
              By accessing the AIC Happy Valley website and mobile application, you agree to comply with and be bound by these Terms of Service. These terms are designed to ensure a safe, respectful, and community-focused environment for all church members and visitors.
            </p>
          </section>

          <section>
            <h2 className="text-xl xs:text-2xl font-black text-brand-darkGrey flex items-center gap-3 mb-6">
              <CheckCircle2 className="text-brand-sage w-5 h-5 xs:w-6 xs:h-6" />
              2. User Conduct
            </h2>
            <p className="text-brand-darkGrey/70 font-medium mb-4 text-sm xs:text-base">We ask that all users of our digital platforms communicate in a manner consistent with Christian values:</p>
            <ul className="list-disc pl-6 space-y-2 text-brand-darkGrey/70 font-medium text-sm xs:text-base">
              <li>Be respectful and kind in all messages and prayer requests.</li>
              <li>Do not use the platform to spread hate speech, misinformation, or offensive content.</li>
              <li>Do not attempt to compromise the security of the website or application.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl xs:text-2xl font-black text-brand-darkGrey flex items-center gap-3 mb-6">
              <AlertCircle className="text-brand-sage w-5 h-5 xs:w-6 xs:h-6" />
              3. Privacy and Data
            </h2>
            <p className="text-brand-darkGrey/70 leading-relaxed font-medium text-sm xs:text-base">
              Your use of our services is also governed by our Privacy Policy. By agreeing to these Terms, you also acknowledge and accept how we handle your personal data as described in our Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl xs:text-2xl font-black text-brand-darkGrey flex items-center gap-3 mb-6">
              <AlertCircle className="text-brand-sage w-5 h-5 xs:w-6 xs:h-6" />
              4. Service Limitations
            </h2>
            <p className="text-brand-darkGrey/70 leading-relaxed font-medium text-sm xs:text-base">
              While we strive to keep our digital services available 24/7, we reserve the right to modify or discontinue any part of the service for maintenance or church-related reasons. We are not liable for any temporary unavailability of the platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl xs:text-2xl font-black text-brand-darkGrey flex items-center gap-3 mb-6">
              5. Governing Law
            </h2>
            <p className="text-brand-darkGrey/70 leading-relaxed font-medium text-sm xs:text-base">
              Terms and conditions shall be governed by and construed in accordance with the laws of Kenya. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the Kenyan courts.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
