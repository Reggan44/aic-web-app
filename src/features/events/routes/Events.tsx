import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useEvents } from '../../../hooks/useEvents';
import { Button } from '../../../components/elements/Button';
import { Calendar, MapPin, Clock, ChevronRight, AlertCircle, Share2, Plus } from 'lucide-react';
import SEO from '../../../components/seo/SEO';
import { getGoogleCalendarLink, downloadICS } from '../../../utils/calendar';

const EVENTS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': 'https://aichappyvalley.org/events#webpage',
  'url': 'https://aichappyvalley.org/events',
  'name': 'Upcoming Events — AIC Happy Valley',
  'description': 'View all upcoming events at AIC Happy Valley Church in Thika, Kenya. Join us for worship, fellowship and community gatherings.',
  'isPartOf': { '@id': 'https://aichappyvalley.org/#church' },
  'breadcrumb': {
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://aichappyvalley.org/' },
      { '@type': 'ListItem', 'position': 2, 'name': 'Events', 'item': 'https://aichappyvalley.org/events' }
    ]
  }
};

const Events = () => {
  const { events, loading, error } = useEvents(24);

  return (
    <div className="w-full">
      <SEO
        title="Upcoming Events"
        description="Join us for worship, fellowship and community gatherings at AIC Happy Valley Church Thika. View our full events calendar and add events to your calendar."
        url="/events"
        keywords="church events Thika, AIC Happy Valley events, Christian gatherings Kenya, church calendar Thika"
        schema={EVENTS_SCHEMA}
      />
      {/* 1. CINEMATIC EXPLORER HERO */}
      <section className="relative px-4 bg-brand-grey overflow-hidden pt-48 pb-24">
        {/* Mesh Background */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-brand-sage rounded-full blur-[160px]"></div>
          <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-brand-sky rounded-full blur-[140px]"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="space-y-6"
          >
            <span className="text-white/40 text-[10px] font-medium tracking-[0.45em] uppercase block" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Community Life Calendar
            </span>
            <h1 className="text-4xl md:text-8xl font-medium text-white tracking-[0.05em] uppercase leading-none" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Upcoming <span className="text-brand-sage">Events</span>
            </h1>
            <p className="text-white/60 text-lg max-w-xl italic leading-relaxed">
              Join our vibrant mission family for worship, fellowship, and special kingdom gatherings.
            </p>
          </motion.div>
        </div>
        
        {/* Bottom vignette */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent pointer-events-none"></div>
      </section>

      {/* Events Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {error && (
            <div role="alert" className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl mb-8">
              <AlertCircle size={20} aria-hidden="true" />
              <p>{error}</p>
            </div>
          )}

          {loading ? (
            <div className="flex flex-col justify-center items-center h-64 bg-slate-50 rounded-2xl border border-border">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary mb-4" aria-label="Loading events" />
              <p className="text-sm text-muted-foreground">Loading events…</p>
            </div>
          ) : events.length === 0 && !error ? (
            <div className="text-center pt-52 pb-20 bg-slate-50 rounded-2xl border border-dashed border-border">
              <Calendar className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" aria-hidden="true" />
              <p className="text-muted-foreground font-medium">No upcoming events</p>
              <p className="text-sm text-muted-foreground mt-1">New events are added regularly. Stay tuned!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event, index) => {
                const eventDate = new Date(event.date);
                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link to={`/events/${event.id}`} className="block h-full group">
                      <div className="bg-white border border-slate-100 rounded-[2rem] overflow-hidden hover:shadow-2xl transition-all duration-700 h-full flex flex-col relative group">
                        {/* Event Glow Bar */}
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-brand-sage scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>

                        <div className="p-8 flex flex-col flex-grow">
                          {/* Date & Title Header */}
                          <div className="flex items-start justify-between mb-8">
                            <div className="space-y-1">
                              <span className="text-[10px] font-semibold text-brand-sage uppercase tracking-[0.2em]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                                {eventDate.toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}
                              </span>
                              <h3 className="text-2xl font-semibold text-brand-grey tracking-tight uppercase leading-tight group-hover:text-brand-sage transition-colors" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                                {event.title}
                              </h3>
                            </div>
                            <div className="w-12 h-12 border border-brand-sage/20 rounded-xl flex flex-col items-center justify-center text-brand-grey bg-brand-sage/5 group-hover:bg-brand-sage group-hover:text-white transition-all duration-500">
                              <span className="text-sm font-bold leading-none">{eventDate.getDate()}</span>
                              <span className="text-[8px] font-black uppercase tracking-tighter">{eventDate.toLocaleDateString(undefined, { month: 'short' })}</span>
                            </div>
                          </div>

                          <div className="space-y-3 mb-8">
                            <div className="flex items-center gap-3 text-xs font-medium text-muted-foreground">
                              <Clock size={14} className="text-brand-sage/60" />
                              <time dateTime={event.date}>
                                {eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} · {eventDate.toLocaleDateString(undefined, { weekday: 'long' })}
                              </time>
                            </div>
                            <div className="flex items-center gap-3 text-xs font-medium text-muted-foreground">
                              <MapPin size={14} className="text-brand-sage/60" />
                              <span className="line-clamp-1">{event.location}</span>
                            </div>
                          </div>

                          <p className="text-sm text-muted-foreground leading-relaxed mb-8 line-clamp-3 italic font-medium">
                            "{event.description}"
                          </p>

                          <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                            <span className="text-[10px] font-semibold text-brand-grey/40 flex items-center gap-2 uppercase tracking-[0.2em] group-hover:text-brand-sage group-hover:translate-x-2 transition-all" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                              View Details <ChevronRight size={14} />
                            </span>
                            <div className="flex gap-2" onClick={(e) => e.preventDefault()}>
                               <button 
                                  className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center text-muted-foreground hover:bg-brand-sage/10 hover:text-brand-sage transition-all"
                                  onClick={() => window.open(getGoogleCalendarLink({
                                    title: event.title,
                                    description: event.description,
                                    location: event.location,
                                    startTime: event.date
                                  }), '_blank')}
                                  title="Add to Google Calendar"
                               >
                                  <Plus size={14} />
                                </button>
                               <button 
                                  className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center text-muted-foreground hover:bg-brand-sage/10 hover:text-brand-sage transition-all"
                                  onClick={() => downloadICS({
                                    title: event.title,
                                    description: event.description,
                                    location: event.location,
                                    startTime: event.date
                                  })}
                                  title="Download Apple/Outlook Calendar File"
                               >
                                  <Calendar size={14} />
                                </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Events;
