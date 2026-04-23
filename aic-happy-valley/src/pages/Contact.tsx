import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Button } from '../components/elements/Button';
import { Input } from '../components/elements/Input';
import { Label } from '../components/elements/Label';
import { checkRateLimit, recordSubmission } from '../utils/validation';
import SEO from '../components/seo/SEO';

const CONTACT_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ContactPage',
      '@id': 'https://aichappyvalley.org/contact#webpage',
      'url': 'https://aichappyvalley.org/contact',
      'name': 'Contact AIC Happy Valley',
      'description': 'Get in touch with AIC Happy Valley Church in Thika, Kenya. Visit us Sundays or send a message.',
      'isPartOf': { '@id': 'https://aichappyvalley.org/#church' },
      'breadcrumb': {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://aichappyvalley.org/' },
          { '@type': 'ListItem', 'position': 2, 'name': 'Contact', 'item': 'https://aichappyvalley.org/contact' }
        ]
      }
    },
    {
      '@type': 'LocalBusiness',
      '@id': 'https://aichappyvalley.org/#church',
      'name': 'AIC Happy Valley',
      'image': 'https://aichappyvalley.org/church-compound-view.jpeg',
      'telephone': '+254700000000',
      'email': 'info@aichappyvalley.org',
      'url': 'https://aichappyvalley.org',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Happy Valley',
        'addressLocality': 'Thika',
        'addressRegion': 'Kiambu',
        'postalCode': '01000',
        'addressCountry': 'KE'
      },
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': -1.0395,
        'longitude': 37.0900
      },
      'openingHoursSpecification': [
        { '@type': 'OpeningHoursSpecification', 'dayOfWeek': 'Sunday', 'opens': '08:00', 'closes': '12:30' },
        { '@type': 'OpeningHoursSpecification', 'dayOfWeek': 'Wednesday', 'opens': '17:30', 'closes': '19:00' }
      ],
      'contactPoint': {
        '@type': 'ContactPoint',
        'telephone': '+254700000000',
        'contactType': 'customer service',
        'availableLanguage': ['English', 'Swahili']
      }
    }
  ]
};
const RATE_LIMIT_KEY = 'aic_contact_last_submission';
const COOLDOWN_MS = 60_000;

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!recaptchaToken) {
      setErrorMessage('Please verify that you are not a robot.');
      return;
    }

    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    if (!checkRateLimit(RATE_LIMIT_KEY, COOLDOWN_MS)) {
      setErrorMessage('Please wait 60 seconds before sending another message.');
      return;
    }

    setStatus('submitting');
    try {
      await addDoc(collection(db, 'contact_messages'), {
        ...formData,
        read: false,
        createdAt: serverTimestamp()
      });
      
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      recaptchaRef.current?.reset();
      setRecaptchaToken(null);
      recordSubmission(RATE_LIMIT_KEY);
      
      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err: any) {
      console.error('Error submitting form:', err);
      setStatus('error');
      setErrorMessage(err.message || 'Failed to send message. Please try again.');
    }
  };

  return (
    <div className="bg-background min-h-screen pb-20">
      <SEO
        title="Contact Us"
        description="Get in touch with AIC Happy Valley Thika. We'd love to hear from you — visit us on Sundays at 8:00 AM or 10:30 AM, or send us a message."
        url="/contact"
        keywords="contact AIC Happy Valley, church address Thika, Happy Valley church location, church phone Kenya"
        schema={CONTACT_SCHEMA}
      />
      
      {/* Hero */}
      <section className="bg-brand-sage/10 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-black text-brand-grey mb-6 tracking-tight">
            Get in <span className="text-brand-sage">Touch</span>
          </h1>
          <p className="text-lg text-muted-foreground font-medium max-w-2xl mx-auto">
            Whether you have a question, a prayer request, or want to learn more about our church family, we're here for you.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 mt-[-40px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-border shadow-xl space-y-8">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-brand-sage/20 text-brand-sage flex items-center justify-center shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-brand-grey">Visit Us</h3>
                  <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                    Happy Valley, Thika Town<br />
                    P.O. Box 123-01000<br />
                    Thika, Kenya
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-brand-sky/20 text-brand-sky flex items-center justify-center shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-brand-grey">Email Us</h3>
                  <p className="text-muted-foreground mt-1 text-sm">info@aichappyvalley.org</p>
                  <p className="text-muted-foreground text-sm">office@aichappyvalley.org</p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-brand-gold/20 text-brand-gold flex items-center justify-center shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-brand-grey">Call Us</h3>
                  <p className="text-muted-foreground mt-1 text-sm">+254 700 000 000</p>
                  <p className="text-muted-foreground text-sm">+254 711 111 111</p>
                </div>
              </div>
            </div>

            {/* Service Times */}
            <div className="bg-brand-grey p-8 rounded-3xl text-white shadow-xl">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <MessageSquare size={20} className="text-brand-sage" />
                Service Times
              </h3>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex justify-between border-b border-white/10 pb-2">
                  <span>English Service</span>
                  <span className="font-bold text-white">8:00 AM</span>
                </li>
                <li className="flex justify-between border-b border-white/10 pb-2">
                  <span>Kiswahili Service</span>
                  <span className="font-bold text-white">10:30 AM</span>
                </li>
                <li className="flex justify-between border-b border-white/10 pb-2">
                  <span>Mid-week Prayer</span>
                  <span className="font-bold text-white">Wed 5:30 PM</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 md:p-12 rounded-3xl border border-border shadow-2xl h-full font-sans">
              <h2 className="text-2xl font-bold text-brand-grey mb-8">Send us a Message</h2>
              


              <AnimatePresence>
                {status === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    className="mb-8 p-8 bg-brand-sage/10 border border-brand-sage/20 rounded-3xl flex flex-col items-center text-center gap-4 text-brand-grey shadow-lg shadow-brand-sage/5"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 0.1 
                      }}
                      className="w-16 h-16 rounded-full bg-brand-sage text-white flex items-center justify-center shadow-lg shadow-brand-sage/20"
                    >
                      <CheckCircle size={32} />
                    </motion.div>
                    <div>
                      <h4 className="font-black text-xl uppercase tracking-tighter">Message Received</h4>
                      <p className="text-sm mt-2 font-medium opacity-80 leading-relaxed">
                        Thank you for reaching out to your church family. <br />
                        We've received your request and will get back to you soon.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {errorMessage && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3 text-red-800">
                  <AlertCircle className="shrink-0 mt-0.5" size={18} />
                  <p className="text-sm font-medium">{errorMessage}</p>
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="c-name">Full Name <span className="text-red-500">*</span></Label>
                    <Input 
                      id="c-name" 
                      required
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      placeholder="John Doe" 
                      className="h-12 rounded-xl" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="c-email">Email Address <span className="text-red-500">*</span></Label>
                    <Input 
                      id="c-email" 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      placeholder="john@example.com" 
                      className="h-12 rounded-xl" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="c-subject">Subject</Label>
                  <Input 
                    id="c-subject" 
                    value={formData.subject}
                    onChange={e => setFormData({...formData, subject: e.target.value})}
                    placeholder="How can we help?" 
                    className="h-12 rounded-xl" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="c-msg">Message <span className="text-red-500">*</span></Label>
                  <textarea 
                    id="c-msg" 
                    rows={6} 
                    required
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                    className="w-full border border-border rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-sage/50 transition-all font-sans"
                    placeholder="Your message here..."
                  />
                </div>

                <div className="pt-2 min-h-[78px]">
                  {import.meta.env.VITE_RECAPTCHA_SITE_KEY ? (
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                      onChange={(token) => setRecaptchaToken(token)}
                    />
                  ) : (
                    <div className="text-sm text-yellow-600 bg-yellow-50 p-4 rounded-xl border border-yellow-100 flex items-center gap-2">
                      <AlertCircle size={18} />
                      Captcha configuration missing.
                    </div>
                  )}
                </div>

                <Button 
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full h-14 rounded-2xl text-lg font-bold bg-brand-sage hover:scale-[1.02] transition-transform text-brand-grey shadow-lg shadow-brand-sage/10 disabled:opacity-70 disabled:hover:scale-100"
                >
                  {status === 'submitting' ? (
                    <><Loader2 className="animate-spin mr-2" size={20} /> Sending...</>
                  ) : (
                    <><Send className="mr-2 w-5 h-5" /> Send Message</>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
