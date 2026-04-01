import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getEvents } from '../services/events';
import type { EventItem } from '../types';
import { Calendar, MapPin } from 'lucide-react';

const Events = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        // Sort events by date ascending
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

  return (
    <div className="pt-44 pb-20 px-4 max-w-7xl mx-auto min-h-screen">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold mb-12 flex items-center gap-4"
      >
        <span className="w-12 h-[2px] bg-brand-gold"></span>
        Upcoming Events
      </motion.h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-gold"></div>
        </div>
      ) : events.length === 0 ? (
        <div className="text-center text-gray-400 py-20 bg-brand-grey rounded-2xl border border-brand-lightGrey">
          <p className="text-xl">No upcoming events at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-brand-grey rounded-xl p-6 border border-brand-lightGrey hover:border-brand-gold transition-colors group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold/5 rounded-bl-[100px] -z-0"></div>
              
              <h3 className="text-2xl font-bold mb-4 relative z-10 group-hover:text-brand-gold transition-colors">{event.title}</h3>
              
              <div className="space-y-3 mb-6 relative z-10">
                <div className="flex items-start gap-3 text-gray-300">
                  <Calendar className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                  <span>{new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}<br/>
                  <span className="text-sm text-gray-400">{new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span></span>
                </div>
                
                <div className="flex items-start gap-3 text-gray-300">
                  <MapPin className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                  <span>{event.location}</span>
                </div>
              </div>
              
              <p className="text-gray-400 text-sm leading-relaxed relative z-10 border-t border-brand-lightGrey/50 pt-4">
                {event.description}
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;
