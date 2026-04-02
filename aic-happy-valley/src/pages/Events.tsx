import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getEvents } from '../services/events';
import type { EventItem } from '../types';
import { Calendar, MapPin, ChevronDown, Download, ExternalLink } from 'lucide-react';
import { generateGoogleCalendarLink, downloadIcsFile } from '../utils/calendar';
import { Helmet } from 'react-helmet-async';

const Events = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        const sorted = data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        setEvents(sorted);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleSaveToCalendar = (event: EventItem, type: 'google' | 'ics') => {
    const calendarEvent = {
      title: event.title,
      description: event.description,
      location: event.location,
      startDate: event.date,
    };

    if (type === 'google') {
      window.open(generateGoogleCalendarLink(calendarEvent), '_blank');
    } else {
      downloadIcsFile(calendarEvent);
    }
    setOpenDropdown(null);
  };

  return (
    <div className="pt-24 md:pt-32 pb-20 px-4 xs:px-6 max-w-7xl mx-auto min-h-screen font-sans">
      <Helmet>
        <title>Upcoming Events - Join Our Community Gatherings | AIC Happy Valley</title>
        <meta name="description" content="Stay updated with upcoming church events at AIC Happy Valley. Join us for fellowships, youth conferences, and community outreaches in Thika." />
        <meta name="keywords" content="AIC Happy Valley Events, Church Calendar Thika, Christian Gatherings Kenya, Community Events Thika" />
        <link rel="canonical" href="https://aic-happy-valley.web.app/events" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": events.map((event, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "Event",
                "name": event.title,
                "startDate": event.date,
                "location": {
                  "@type": "Place",
                  "name": event.location,
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Thika",
                    "addressCountry": "KE"
                  }
                },
                "description": event.description
              }
            }))
          })}
        </script>
      </Helmet>

      <motion.h1 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-3xl xs:text-4xl md:text-5xl font-black mb-10 md:mb-12 flex items-center gap-4 text-brand-darkGrey tracking-tight"
      >
        <span className="w-8 h-[2px] xs:w-12 bg-brand-sage"></span>
        Upcoming Events
      </motion.h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-sage"></div>
        </div>
      ) : events.length === 0 ? (
        <div className="text-center text-brand-darkGrey/40 py-20 md:py-24 bg-white/50 rounded-[2rem] xs:rounded-[3rem] border border-brand-sage/10 shadow-xl">
          <Calendar size={40} className="mx-auto mb-4 opacity-20" />
          <p className="text-xl font-bold">No upcoming events scheduled</p>
          <p className="text-[10px] xs:text-sm font-medium mt-1 uppercase tracking-widest">Check back soon for updates</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xs:gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-[2rem] xs:rounded-[2.5rem] p-6 xs:p-8 border border-brand-sage/10 hover:border-brand-sage/40 hover:shadow-2xl transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 xs:w-32 xs:h-32 bg-brand-sage/5 rounded-bl-[80px] xs:rounded-bl-[100px] -z-0"></div>
              
              <div className="flex justify-between items-start mb-6 relative z-10">
                <h3 className="text-xl xs:text-2xl font-black text-brand-darkGrey leading-tight group-hover:text-brand-sage transition-colors pr-8">{event.title}</h3>
                
                <div className="relative">
                  <button 
                    onClick={() => setOpenDropdown(openDropdown === event.id ? null : (event.id || null))}
                    className="p-3 bg-brand-cream text-brand-sage rounded-2xl hover:bg-brand-sage hover:text-white transition-all shadow-md flex items-center gap-1.5"
                    title="Add to Calendar"
                  >
                    <Calendar size={18} />
                    <ChevronDown size={14} className={`transition-transform duration-300 ${openDropdown === event.id ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {openDropdown === event.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-3 w-60 bg-white rounded-2xl shadow-2xl border border-brand-sage/10 py-3 z-50 overflow-hidden"
                      >
                        <button 
                          onClick={() => handleSaveToCalendar(event, 'google')}
                          className="w-full px-5 py-4 text-left text-sm font-bold text-brand-darkGrey hover:bg-brand-sage/10 transition-colors flex items-center gap-3"
                        >
                          <div className="w-8 h-8 bg-brand-sage/10 rounded-lg flex items-center justify-center">
                            <ExternalLink size={16} className="text-brand-sage" />
                          </div>
                          Google Calendar
                        </button>
                        <button 
                          onClick={() => handleSaveToCalendar(event, 'ics')}
                          className="w-full px-5 py-4 text-left text-sm font-bold text-brand-darkGrey hover:bg-brand-sage/10 transition-colors flex items-center gap-3"
                        >
                          <div className="w-8 h-8 bg-brand-sage/10 rounded-lg flex items-center justify-center">
                            <Download size={16} className="text-brand-sage" />
                          </div>
                          Outlook / iCal (.ics)
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              
              <div className="space-y-4 mb-6 md:mb-8 relative z-10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-brand-sage/10 text-brand-sage rounded-xl flex items-center justify-center shrink-0">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <p className="text-brand-darkGrey font-black text-xs xs:text-sm uppercase tracking-widest">{new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}</p>
                    <p className="text-brand-darkGrey/50 font-bold text-[12px] xs:text-sm italic">{new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-brand-sage/10 text-brand-sage rounded-xl flex items-center justify-center shrink-0">
                    <MapPin size={20} />
                  </div>
                  <p className="text-brand-darkGrey/60 font-bold text-[12px] xs:text-sm leading-relaxed pt-1.5 md:pt-2">{event.location}</p>
                </div>
              </div>
              
              <div className="pt-6 border-t border-brand-sage/10 relative z-10">
                <p className="text-brand-darkGrey/50 font-medium text-[12px] xs:text-sm leading-relaxed italic line-clamp-3">
                  {event.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;
