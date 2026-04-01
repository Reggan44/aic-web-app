import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import React, { useState } from 'react';

const Contact = () => {
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      setStatus('Thank you for reaching out! We will get back to you soon.');
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <div className="py-20 px-4 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 max-w-3xl"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6 flex items-center gap-4">
          <span className="w-12 h-[2px] bg-brand-gold"></span>
          Contact Us
        </h1>
        <p className="text-gray-300 text-lg">
          We would love to hear from you. Whether you have a question, a prayer request, or want to know more about our church.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Contact Info */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-brand-grey rounded-full flex items-center justify-center shrink-0 border border-brand-lightGrey text-brand-gold">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Our Location</h3>
                <p className="text-gray-400">Happy Valley Area, Garissa Road<br/>Thika, Kenya</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-brand-grey rounded-full flex items-center justify-center shrink-0 border border-brand-lightGrey text-brand-gold">
                <Clock size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Service Times</h3>
                <p className="text-gray-400">Sunday Service: 9:00 AM - 12:30 PM</p>
                <p className="text-gray-400">Youth Service: 12:30 PM - 2:00 PM</p>
                <p className="text-gray-400">Bible Study (Wed): 5:30 PM</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-brand-grey rounded-full flex items-center justify-center shrink-0 border border-brand-lightGrey text-brand-gold">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Phone Number</h3>
                <p className="text-gray-400">+254 700 000 000</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-brand-grey rounded-full flex items-center justify-center shrink-0 border border-brand-lightGrey text-brand-gold">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Email Address</h3>
                <p className="text-gray-400">info@aichappyvalley.org</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#0f0f0f] p-8 rounded-2xl border border-brand-lightGrey shadow-xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-bl-[100px] -z-0"></div>
          <h2 className="text-2xl font-bold mb-6 relative z-10">Send a Message</h2>
          
          {status && (
            <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 text-green-200 rounded-lg text-sm">
              {status}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
              <input 
                type="text" 
                id="name" 
                required
                className="w-full bg-brand-dark border border-brand-lightGrey rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
              <input 
                type="email" 
                id="email" 
                required
                className="w-full bg-brand-dark border border-brand-lightGrey rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">Message</label>
              <textarea 
                id="message" 
                rows={5}
                required
                className="w-full bg-brand-dark border border-brand-lightGrey rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors resize-none"
                placeholder="How can we help you?"
              ></textarea>
            </div>
            <button 
              type="submit"
              className="w-full bg-brand-gold text-black font-bold py-3 rounded-lg hover:bg-yellow-500 transition-colors mt-2"
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
      
      {/* Map Embed Placeholder */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-20 w-full h-[400px] bg-brand-grey rounded-2xl overflow-hidden border border-brand-lightGrey"
      >
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15956.126584288673!2d37.065!3d-1.041!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMsKwMDInMjcuNiJTIDM3wrAwMyczNi4wIkU!5e0!3m2!1sen!2ske!4v1620000000000!5m2!1sen!2ske" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy"
        ></iframe>
      </motion.div>
    </div>
  );
};

export default Contact;
