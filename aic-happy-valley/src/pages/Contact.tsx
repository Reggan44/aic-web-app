import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Clock, Send, CheckCircle2, ShieldAlert, ShieldCheck, ExternalLink } from 'lucide-react';
import React, { useState, useCallback } from 'react';
import { sendMessage } from '../services/contact';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { Helmet } from 'react-helmet-async';
import { contactSchema } from '../lib/validations';
import { z } from 'zod';


const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: -1.042358, 
  lng: 37.108502,
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
  styles: [
    {
      "featureType": "all",
      "elementType": "labels.text.fill",
      "stylers": [{"saturation": 36}, {"color": "#333333"}, {"lightness": 40}]
    },
    {
      "featureType": "all",
      "elementType": "labels.text.stroke",
      "stylers": [{"visibility": "on"}, {"color": "#ffffff"}, {"lightness": 16}]
    },
    {
      "featureType": "all",
      "elementType": "labels.icon",
      "stylers": [{"visibility": "off"}]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry.fill",
      "stylers": [{"color": "#fefefe"}, {"lightness": 20}]
    }
  ]
};

const Contact = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
  });

  const { executeRecaptcha } = useGoogleReCaptcha();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if (!executeRecaptcha) {
      console.warn('Execute recaptcha not yet available');
      return;
    }

    // Validation
    try {
      contactSchema.parse(formData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setStatus(`Validation Error: ${error.errors[0].message}`);
        return;
      }
    }

    setStatus('Verifying...');
    try {
      const token = await executeRecaptcha('contact_form');
      if (!token) {
        setStatus('Security check failed. Please try again.');
        return;
      }

      setStatus('Sending...');
      await sendMessage(formData);
      setStatus('Message sent! We will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('Error sending message. Please try again.');
    }
  }, [executeRecaptcha, formData]);

  if (loadError) return <div className="pt-32 text-center text-red-500 font-bold">Error loading maps. Please refresh.</div>;

  return (
    <div className="min-h-screen bg-brand-cream pt-24 md:pt-32 pb-20 px-4 xs:px-6 lg:px-8 font-sans">
      <Helmet>
        <title>Contact Us - We Are Here for You | AIC Happy Valley Thika</title>
        <meta name="description" content="Get in touch with AIC Happy Valley. Whether you have a prayer request, a question about our services, or want to visit us in Thika, we'd love to hear from you." />
        <meta name="keywords" content="Contact AIC Happy Valley, Church Location Thika, Prayer Request Thika, Email AIC Happy Valley, Church Phone Number Thika" />
        <link rel="canonical" href="https://aic-happy-valley.web.app/contact" />
      </Helmet>
      <div className="max-w-7xl mx-auto">

        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-brand-sage/10 text-brand-sage text-[10px] xs:text-xs font-bold rounded-full uppercase tracking-[0.2em] border border-brand-sage/20 mb-4">
            Get In Touch
          </span>
          <h1 className="text-3xl xs:text-4xl md:text-6xl font-black text-brand-darkGrey tracking-tight mb-6 leading-tight">
            We Are Here <span className="text-brand-sage italic">For You</span>.
          </h1>
          <p className="text-brand-darkGrey/60 text-base xs:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
            Whether you have a prayer request, a question about our ministries, or just want to say hello, we'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xs:gap-12 items-start">
          
          {/* Contact Information & Map */}
          <div className="lg:col-span-5 space-y-6 xs:space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-6 xs:p-8 md:p-10 rounded-[2rem] xs:rounded-[2.5rem] shadow-2xl shadow-brand-darkGrey/5 border border-brand-sage/10 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-24 h-24 xs:w-32 xs:h-32 bg-brand-sage/5 rounded-bl-[80px] xs:rounded-bl-[100px] transition-transform group-hover:scale-110"></div>
              
              <h2 className="text-xl xs:text-2xl font-black text-brand-darkGrey mb-8 relative z-10">Contact Information</h2>
              
              <div className="space-y-6 relative z-10">
                <div className="flex items-start gap-4 xs:gap-5">
                  <div className="w-10 h-10 xs:w-12 xs:h-12 bg-brand-sage/10 text-brand-sage rounded-2xl flex items-center justify-center shrink-0">
                    <MapPin size={20} className="xs:size-[24px]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-brand-darkGrey/40 uppercase tracking-widest mb-1">Our Location</p>
                    <p className="text-brand-darkGrey font-bold text-sm xs:text-base leading-relaxed">Happy Valley Area, Garissa Road, Thika, Kenya</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 xs:gap-5">
                  <div className="w-10 h-10 xs:w-12 xs:h-12 bg-brand-sage/10 text-brand-sage rounded-2xl flex items-center justify-center shrink-0">
                    <Mail size={20} className="xs:size-[24px]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-brand-darkGrey/40 uppercase tracking-widest mb-1">Email Us</p>
                    <p className="text-brand-darkGrey font-bold text-sm xs:text-base break-all">aichappyvalley@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 xs:gap-5">
                  <div className="w-10 h-10 xs:w-12 xs:h-12 bg-brand-sage/10 text-brand-sage rounded-2xl flex items-center justify-center shrink-0">
                    <Phone size={20} className="xs:size-[24px]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-brand-darkGrey/40 uppercase tracking-widest mb-1">Call Us</p>
                    <p className="text-brand-darkGrey font-bold text-sm xs:text-base">+254 712 822 424</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 xs:gap-5">
                  <div className="w-10 h-10 xs:w-12 xs:h-12 bg-brand-sage/10 text-brand-sage rounded-2xl flex items-center justify-center shrink-0">
                    <Clock size={20} className="xs:size-[24px]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-brand-darkGrey/40 uppercase tracking-widest mb-1">Service Times</p>
                    <p className="text-brand-darkGrey font-bold text-sm xs:text-base">Sundays: 8:00 AM & 10:30 AM</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Map Placeholder */}
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               className="h-64 xs:h-80 bg-brand-darkGrey rounded-[2rem] xs:rounded-[2.5rem] overflow-hidden shadow-2xl border-4 xs:border-8 border-white relative group"
            >
              {!isLoaded ? (
                <div className="w-full h-full flex items-center justify-center bg-brand-darkGrey text-white/20">
                  <MapPin size={40} className="animate-bounce" />
                </div>
              ) : (
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={center}
                  zoom={15}
                  options={options as any}
                >
                  <Marker position={center} />
                </GoogleMap>
              )}
              <div className="absolute bottom-4 left-4 right-4 xs:bottom-6 xs:left-6 xs:right-6">
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=-1.042358,37.108502" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-white/90 backdrop-blur-md text-brand-darkGrey font-black py-3 xs:py-4 rounded-xl xs:rounded-2xl flex items-center justify-center gap-2 hover:bg-brand-sage hover:text-white transition-all shadow-xl text-xs xs:text-base"
                >
                   <ExternalLink size={16} className="xs:size-[18px]" />
                   Open in Google Maps
                </a>
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-6 xs:p-10 md:p-14 rounded-[2rem] xs:rounded-[3rem] shadow-2xl shadow-brand-darkGrey/5 border border-brand-sage/10 relative"
            >
              <h2 className="text-2xl xs:text-3xl font-black text-brand-darkGrey mb-8">Send a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-5 xs:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 xs:gap-6">
                  <div>
                    <label className="text-[10px] font-black text-brand-darkGrey/40 uppercase tracking-widest mb-2 block">Your Name</label>
                    <input 
                      required
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="John Doe"
                      className="w-full bg-brand-cream/50 border border-brand-sage/20 rounded-xl xs:rounded-2xl px-6 py-4 text-brand-darkGrey font-medium focus:outline-none focus:ring-2 focus:ring-brand-sage transition-all text-sm xs:text-base"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-brand-darkGrey/40 uppercase tracking-widest mb-2 block">Email Address</label>
                    <input 
                      required
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="john@example.com"
                      className="w-full bg-brand-cream/50 border border-brand-sage/20 rounded-xl xs:rounded-2xl px-6 py-4 text-brand-darkGrey font-medium focus:outline-none focus:ring-2 focus:ring-brand-sage transition-all text-sm xs:text-base"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black text-brand-darkGrey/40 uppercase tracking-widest mb-2 block">Subject</label>
                  <input 
                    required
                    type="text" 
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    placeholder="Prayer Request / Inquiry"
                    className="w-full bg-brand-cream/50 border border-brand-sage/20 rounded-xl xs:rounded-2xl px-6 py-4 text-brand-darkGrey font-medium focus:outline-none focus:ring-2 focus:ring-brand-sage transition-all text-sm xs:text-base"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-black text-brand-darkGrey/40 uppercase tracking-widest mb-2 block">Your Message</label>
                  <textarea 
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="How can we help you today?"
                    className="w-full bg-brand-cream/50 border border-brand-sage/20 rounded-xl xs:rounded-2xl px-6 py-4 text-brand-darkGrey font-medium focus:outline-none focus:ring-2 focus:ring-brand-sage transition-all resize-none text-sm xs:text-base"
                  />
                </div>

                <div className="flex flex-col gap-4 pt-4">
                  <button 
                    type="submit" 
                    disabled={status === 'Sending...' || status === 'Verifying...'}
                    className="w-full bg-brand-darkGrey text-white font-black py-4 xs:py-5 rounded-[1.5rem] xs:rounded-[2rem] shadow-xl hover:bg-brand-sage hover:text-brand-darkGrey transition-all flex items-center justify-center gap-3 disabled:opacity-50 group text-sm xs:text-base active:scale-[0.98] transition-transform"
                  >
                    <Send size={18} className="xs:size-[20px] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    {status === 'Sending...' ? 'Sending Message...' : status === 'Verifying...' ? 'Security Check...' : 'Send Message'}
                  </button>
                  
                  {status && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`p-4 rounded-xl xs:rounded-2xl flex items-center gap-3 text-xs xs:text-sm font-bold ${
                        status.includes('sent') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                      }`}
                    >
                      <div className="shrink-0">
                        {status.includes('sent') ? <CheckCircle2 size={18} /> : 
                         status.includes('Validation') ? <ShieldAlert size={18} /> : <ShieldCheck size={18} />}
                      </div>
                      <span className="leading-tight">{status}</span>
                    </motion.div>
                  )}
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
