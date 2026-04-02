import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-brand-cream pt-24 md:pt-32 pb-20 px-4 xs:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-block p-4 bg-brand-sage/10 text-brand-sage rounded-2xl mb-6">
            <Shield size={32} className="md:size-[40px]" />
          </div>
          <h1 className="text-3xl xs:text-4xl md:text-5xl font-black text-brand-darkGrey tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-brand-darkGrey/60 text-sm xs:text-base font-medium italic">
            Last Updated: April 1, 2026
          </p>
        </motion.div>

        <div className="bg-white rounded-[2rem] xs:rounded-[2.5rem] p-6 xs:p-8 md:p-12 border border-brand-sage/10 shadow-2xl space-y-8 xs:space-y-10">
          
          <section>
            <h2 className="text-2xl font-black text-brand-darkGrey flex items-center gap-3 mb-6">
              <Eye className="text-brand-sage" />
              1. Introduction
            </h2>
            <p className="text-brand-darkGrey/70 leading-relaxed font-medium">
              AIC Happy Valley ("we," "our," or "the Church") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our website and mobile application.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-brand-darkGrey flex items-center gap-3 mb-6">
              <FileText className="text-brand-sage" />
              2. Information We Collect
            </h2>
            <div className="space-y-4 text-brand-darkGrey/70 leading-relaxed font-medium">
              <p>We may collect information that you provide directly to us, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Contact Information: Name, email address, and phone number when you use our Contact form or submit prayer requests.</li>
                <li>Communication Preferences: Information about how you wish to receive updates from the Church.</li>
                <li>Donation Information: We do not store credit card details; all financial transactions are handled through secure third-party providers (e.g., M-PESA).</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black text-brand-darkGrey flex items-center gap-3 mb-6">
              <Lock className="text-brand-sage" />
              3. How We Use Your Information
            </h2>
            <p className="text-brand-darkGrey/70 leading-relaxed font-medium">
              We use your information solely for the following church-related purposes:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2 text-brand-darkGrey/70 font-medium">
              <li>To respond to your inquiries and prayer requests.</li>
              <li>To provide you with updates about church events and services.</li>
              <li>To improve our website and mobile application features.</li>
              <li>To comply with legal obligations as a non-profit religious organization.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-brand-darkGrey flex items-center gap-3 mb-6">
              <Shield className="text-brand-sage" />
              4. Data Security
            </h2>
            <p className="text-brand-darkGrey/70 leading-relaxed font-medium">
              We implement industry-standard security measures, including Firebase security rules and encryption, to protect your data. We never sell or rent your personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-brand-darkGrey flex items-center gap-3 mb-6">
              5. Contact Us
            </h2>
            <p className="text-brand-darkGrey/70 leading-relaxed font-medium">
              If you have any questions about our Privacy Policy or how we handle your data, please contact us at <span className="text-brand-sage font-black">aichappyvalley@gmail.com</span>.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
