import { motion } from 'framer-motion';

const Giving = () => {
  return (
    <div className="pt-44 pb-20 px-4 max-w-6xl mx-auto min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-24"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-white">Partner With Us</h1>
        <p className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
          Your generosity helps us continue our mission of growing deeper and living stronger, impacting lives in Thika and beyond.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#0f0f0f] border border-[#2a2a2a] p-12 rounded-3xl flex flex-col"
        >
          <div className="flex items-center gap-6 mb-12">
            <div className="w-24 h-16 bg-[#4CAF50] rounded-xl flex items-center justify-center shadow-[0_4px_20px_rgba(76,175,80,0.2)] p-2">
              <img src="https://upload.wikimedia.org/wikipedia/commons/1/15/M-PESA_LOGO-01.svg" alt="M-PESA Logo" className="w-full h-full object-contain filter brightness-0 invert" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">M-PESA Paybill</h2>
              <span className="bg-brand-dark px-3 py-1 rounded-full text-brand-gold text-xs font-bold uppercase tracking-widest border border-[#2a2a2a]">Safe & Instant</span>
            </div>
          </div>

          <div className="space-y-4 flex-grow">
            <div className="bg-brand-dark p-8 text-center rounded-2xl border border-[#2a2a2a]">
              <p className="text-gray-500 text-sm tracking-widest uppercase mb-3 font-semibold">M-PESA Paybill Number</p>
              <p className="text-5xl font-mono text-brand-gold tracking-widest font-black">555 123</p>
            </div>
            
            <p className="text-sm text-gray-500 text-center leading-relaxed mt-6">
              Transactions are processed immediately and securely by Safaricom.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col gap-8"
        >
          <div className="bg-[#0f0f0f] border border-[#2a2a2a] p-10 rounded-3xl">
            <h3 className="text-2xl font-bold mb-4 text-white">Why We Give</h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              Giving is a profound expression of our worship, our trust in God as our provider, and our commitment to His kingdom's expansion. 
            </p>
          </div>

          <div className="bg-[#0f0f0f] border border-[#2a2a2a] p-10 rounded-3xl flex-grow">
            <h3 className="text-2xl font-bold mb-8 text-white">Other Ways to Give</h3>
            <ul className="space-y-6 text-gray-300 text-lg">
              <li className="flex items-center gap-5">
                <div className="w-3 h-3 bg-brand-gold rounded-full"></div>
                <span className="font-medium">In-person during Sunday Services</span>
              </li>
              <li className="flex items-center gap-5">
                <div className="w-3 h-3 bg-brand-gold rounded-full"></div>
                <span className="font-medium">Bank Transfer (Contact Admin)</span>
              </li>
              <li className="flex items-center gap-5">
                <div className="w-3 h-3 bg-brand-gold rounded-full"></div>
                <span className="font-medium">Material Donations to CSR</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Giving;
