import React, { useState, useEffect } from 'react';
import { getSermons, addSermon, updateSermon, deleteSermon } from '../services/sermons';
import { getEvents, addEvent, updateEvent, deleteEvent } from '../services/events';
import { getMinistries, addMinistry, updateMinistry, deleteMinistry } from '../services/ministries';
import { getLeaders, addLeader, updateLeader, deleteLeader } from '../services/leaders';
import { getMessages, deleteMessage } from '../services/contact';
import type { Sermon, EventItem, Message, Ministry, Leader } from '../types';
import { Trash2, Edit2, Plus, Database, Calendar, Play, Mail, Reply, Send, ShieldAlert, CheckCircle2, LayoutGrid, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { sermonSchema, eventSchema, notificationSchema, ministrySchema, leaderSchema } from '../lib/validations';
import { z } from 'zod';

const Admin = () => {
  const [activeTab, setActiveTab] = useState<'sermons' | 'events' | 'ministries' | 'leaders' | 'messages' | 'broadcast'>('sermons');
  
  // Data State
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [ministries, setMinistries] = useState<Ministry[]>([]);
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  // Edit State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [status, setStatus] = useState<{ type: 'error' | 'success', message: string } | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [sermonData, eventData, ministryData, leaderData, messageData] = await Promise.all([
        getSermons(),
        getEvents(),
        getMinistries(),
        getLeaders(),
        getMessages()
      ]);
      setSermons(sermonData);
      setEvents(eventData);
      setMinistries(ministryData);
      setLeaders(leaderData);
      setMessages(messageData);
    } catch (error) {
      console.error("Error fetching admin data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSermonSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    try {
      sermonSchema.parse(formData);
      if (editingId) {
        await updateSermon(editingId, formData);
        setStatus({ type: 'success', message: 'Sermon updated successfully' });
      } else {
        await addSermon(formData);
        setStatus({ type: 'success', message: 'Sermon added successfully' });
      }
      setEditingId(null);
      setFormData({});
      fetchData();
    } catch (error) {
      if (error instanceof z.ZodError) {
        setStatus({ type: 'error', message: `Validation: ${error.errors[0].message}` });
      } else {
        console.error("Error saving sermon:", error);
        setStatus({ type: 'error', message: 'Failed to save sermon' });
      }
    }
  };

  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    try {
      eventSchema.parse(formData);
      if (editingId) {
        await updateEvent(editingId, formData);
        setStatus({ type: 'success', message: 'Event updated successfully' });
      } else {
        await addEvent(formData);
        setStatus({ type: 'success', message: 'Event added successfully' });
      }
      setEditingId(null);
      setFormData({});
      fetchData();
    } catch (error) {
      if (error instanceof z.ZodError) {
        setStatus({ type: 'error', message: `Validation: ${error.errors[0].message}` });
      } else {
        console.error("Error saving event:", error);
        setStatus({ type: 'error', message: 'Failed to save event' });
      }
    }
  };

  const handleMinistrySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    try {
      // Manual mapping for activities array if it's a string
      const finalData = { ...formData };
      if (typeof finalData.activities === 'string') {
        finalData.activities = finalData.activities.split(',').map((a: string) => a.trim()).filter((a: string) => a !== '');
      }
      if (typeof finalData.images === 'string') {
        finalData.images = finalData.images.split(',').map((i: string) => i.trim()).filter((i: string) => i !== '');
      }

      ministrySchema.parse(finalData);

      if (editingId) {
        await updateMinistry(editingId, finalData);
        setStatus({ type: 'success', message: 'Ministry updated successfully' });
      } else {
        await addMinistry(finalData);
        setStatus({ type: 'success', message: 'Ministry added successfully' });
      }
      setEditingId(null);
      setFormData({});
      fetchData();
    } catch (error) {
      console.error("Error saving ministry:", error);
      setStatus({ type: 'error', message: 'Failed to save ministry' });
    }
  };

  const handleLeaderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    try {
      const finalData = { ...formData };
      // highlights: string[]
      if (typeof finalData.highlights === 'string') {
        finalData.highlights = finalData.highlights.split(',').map((h: string) => h.trim()).filter((h: string) => h !== '');
      }
      // verse: { text, reference }
      if (typeof finalData.verseText === 'string') {
        finalData.verse = {
          text: finalData.verseText,
          reference: finalData.verseReference || ''
        };
        delete finalData.verseText;
        delete finalData.verseReference;
      }

      leaderSchema.parse(finalData);

      if (editingId) {
        await updateLeader(editingId, finalData);
        setStatus({ type: 'success', message: 'Leader updated successfully' });
      } else {
        await addLeader(finalData);
        setStatus({ type: 'success', message: 'Leader added successfully' });
      }
      setEditingId(null);
      setFormData({});
      fetchData();
    } catch (error) {
      console.error("Error saving leader:", error);
      setStatus({ type: 'error', message: 'Failed to save leader' });
    }
  };

  const handleDelete = async (type: 'sermons' | 'events' | 'ministries' | 'leaders' | 'messages', id: string) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      if (type === 'sermons') await deleteSermon(id);
      if (type === 'events') await deleteEvent(id);
      if (type === 'ministries') await deleteMinistry(id);
      if (type === 'leaders') await deleteLeader(id);
      if (type === 'messages') await deleteMessage(id);
      fetchData();
    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
    }
  };

  const handleReply = (msg: Message) => {
    const subject = encodeURIComponent(`RE: ${msg.subject} - AIC Happy Valley`);
    const bodyText = `Dear ${msg.name},\n\nThank you for reaching out to AIC Happy Valley. We have received your message regarding "${msg.subject}".\n\n[Your Response Here]\n\nBlessings,\nAIC Happy Valley Team`;
    const mailtoUrl = `mailto:${msg.email}?subject=${subject}&body=${encodeURIComponent(bodyText)}`;
    
    // Copy to clipboard as fallback
    navigator.clipboard.writeText(msg.email).catch(() => {});
    
    // Open mail app directly without blank tab
    window.location.href = mailtoUrl;
  };

  const [notificationData, setNotificationData] = useState({ title: '', body: '' });
  const [sendingNotification, setSendingNotification] = useState(false);

  const handleSendNotification = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    try {
      notificationSchema.parse(notificationData);
      setSendingNotification(true);
      // This will be implemented with FCM logic in next step
      console.log("Broadcasting:", notificationData);
      setTimeout(() => {
        setStatus({ type: 'success', message: 'Notification broadcast initialized' });
        setNotificationData({ title: '', body: '' });
        setSendingNotification(false);
      }, 1000);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setStatus({ type: 'error', message: `Broadcast: ${error.errors[0].message}` });
      }
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream pt-24 md:pt-32 pb-20 px-4 xs:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 md:mb-12">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl xs:text-4xl font-black text-brand-darkGrey font-sans tracking-tight">Admin Dashboard</h1>
            <button 
              onClick={async () => {
                const seedData = [
                  {
                    name: 'Choir Ministry',
                    tagline: 'Lifting voices in praise',
                    image: '/choir.jpeg',
                    description: 'Our Choir Ministry leads the congregation in spirit-filled worship every Sunday. We believe that praise and worship create an atmosphere for God to move mightily.',
                    activities: ['Sunday Service Worship', 'Special Concerts & Events', 'Choir Rehearsals'],
                    meetingTime: 'Saturdays, 3:00 PM',
                    leader: 'Choir Director',
                  },
                  {
                    name: "Men's Fellowship",
                    tagline: 'Iron sharpening iron',
                    image: '/men.jpeg',
                    description: "The Men's Fellowship is a brotherhood of men committed to growing in faith, family, and purpose.",
                    activities: ['Monthly Fellowships', 'Bible Study', 'Community Projects'],
                    meetingTime: 'First Saturday, 6:00 AM',
                    leader: "Men's Fellowship Chairman",
                  },
                  {
                    name: "Women's Ministry",
                    tagline: 'Empowered women, transformed homes',
                    image: '/women.jpeg',
                    description: "Our Women's Ministry is a vibrant community of ladies from all walks of life, united in faith and sisterhood.",
                    activities: ['Weekly Bible Study', 'Mentorship', 'Outreach'],
                    meetingTime: 'Wednesdays, 5:30 PM',
                    leader: "Women's Ministry Chairlady",
                  },
                  {
                    name: 'Youth Ministry',
                    tagline: 'A generation on fire for God',
                    image: '/youth.jpeg',
                    description: 'Our Youth Ministry is a dynamic and energetic community for young people aged 13–35.',
                    activities: ['Sunday Youth Services', 'Camps', 'Sports'],
                    meetingTime: 'Sundays, 10:30 AM',
                    leader: 'Youth Pastor',
                  },
                  {
                    name: 'Sunday School',
                    tagline: 'Raising godly children',
                    image: '/sunday-school.jpeg',
                    description: 'Sunday School is the foundation we lay for our youngest members.',
                    activities: ['Bible Lessons', 'Stories', 'Crafts'],
                    meetingTime: 'Sundays, 8:00 AM',
                    leader: 'Superintendent',
                  },
                  {
                    name: 'Cadets Ministry',
                    tagline: 'Discipline, devotion, and dedication',
                    image: '/cadets.jpg',
                    description: 'The Cadets Ministry instills discipline, leadership, and a love for God.',
                    activities: ['Drills', 'Parades', 'Community Service'],
                    meetingTime: 'Saturdays, 8:00 AM',
                    leader: 'Cadet Corps Officer',
                  },
                  {
                    name: 'Children & NextGen',
                    tagline: 'Every child precious in His sight',
                    image: '/sunday-school-kids.jpeg',
                    description: 'NextGen is our comprehensive children\'s ministry.',
                    activities: ['Nursery Care', 'Junior Church', 'Kids\' Worship'],
                    meetingTime: 'Every Sunday',
                    leader: 'Children\'s Ministry Director',
                  },
                ];

                setStatus({ type: 'success', message: 'Starting sync...' });
                try {
                  const existingNames = new Set(ministries.map(m => m.name));
                  for (const m of seedData) {
                    if (!existingNames.has(m.name)) {
                      await addMinistry(m);
                    }
                  }
                  setStatus({ type: 'success', message: 'Database Synced Successfully!' });
                  fetchData();
                } catch (err) {
                  console.error(err);
                  setStatus({ type: 'error', message: 'Sync failed: ' + (err as any).message });
                }
              }}
              className="px-4 py-2 bg-brand-gold text-brand-darkGrey font-black rounded-xl text-[10px] uppercase tracking-widest hover:scale-105 transition-transform"
            >
              Seed Ministries
            </button>
            <button 
              onClick={async () => {
                const leaderData = [
                  {
                    name: 'Bishop Albunus Musyoka',
                    role: 'Presiding Bishop',
                    tagline: 'A Shepherd, Visionary, and Servant of God',
                    image: '/bishop.jpeg',
                    bio: 'Bishop Albunus Musyoka has served AIC Happy Valley with unwavering devotion for many years. His vision for the church is rooted in spiritual depth, community transformation, and the faithful proclamation of the Gospel of Jesus Christ.',
                    verse: { text: '"Feed the flock of God which is among you, taking the oversight thereof, not by constraint, but willingly."', reference: '1 Peter 5:2' },
                    highlights: ['Presiding Bishop of AIC Happy Valley', 'Community Leader & Visionary', 'Champion of Gospel Outreach'],
                  },
                  {
                    name: 'Pastor Sam',
                    role: 'Senior Pastor',
                    tagline: 'A Pastor, Mentor, and Author',
                    image: '/pastor-sam.jpeg',
                    bio: 'Pastor Sam is a gifted communicator and a passionate shepherd whose ministry is marked by deep biblical teaching, personal mentorship, and the written word.',
                    verse: { text: '"Preach the word; be instant in season, out of season; reprove, rebuke, exhort with all longsuffering and doctrine."', reference: '2 Timothy 4:2' },
                    highlights: ['Senior Pastor & Bible Teacher', 'Author of Faith Literature', 'Personal Mentor & Discipler'],
                  },
                  {
                    name: 'Pastor Miriam',
                    role: 'Associate Pastor',
                    tagline: 'A Pastor and Mentor',
                    image: '/pastor Miriam.jpeg',
                    bio: 'Pastor Miriam brings a spirit of warmth, wisdom, and compassionate leadership to AIC Happy Valley. Her ministry focuses on nurturing the spiritual growth of individuals and families.',
                    verse: { text: '"She openeth her mouth with wisdom; and in her tongue is the law of kindness."', reference: 'Proverbs 31:26' },
                    highlights: ['Associate Pastor & Counselor', 'Women\'s Ministry Leader', 'Mentor & Spiritual Guide'],
                  },
                ];

                setStatus({ type: 'success', message: 'Starting leader sync...' });
                try {
                  const existingNames = new Set(leaders.map(l => l.name));
                  for (const l of leaderData) {
                    if (!existingNames.has(l.name)) {
                      await addLeader(l);
                    }
                  }
                  setStatus({ type: 'success', message: 'Leaders Synced Successfully!' });
                  fetchData();
                } catch (err) {
                  console.error(err);
                  setStatus({ type: 'error', message: 'Leader sync failed: ' + (err as any).message });
                }
              }}
              className="px-4 py-2 bg-brand-sage text-brand-darkGrey font-black rounded-xl text-[10px] uppercase tracking-widest hover:scale-105 transition-transform"
            >
              Seed Leaders
            </button>
          </div>
          <div className="flex flex-wrap gap-2 xs:gap-4">
            {[
              { id: 'sermons', icon: Play, label: 'Sermons' },
              { id: 'events', icon: Calendar, label: 'Events' },
              { id: 'ministries', icon: LayoutGrid, label: 'Ministries' },
              { id: 'leaders', icon: Users, label: 'Leaders' },
              { id: 'messages', icon: Mail, label: 'Messages' },
              { id: 'broadcast', icon: Send, label: 'Push' },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button 
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    setEditingId(null);
                    setFormData({});
                    setStatus(null);
                  }}
                  className={`flex items-center gap-2 px-4 xs:px-6 py-2.5 xs:py-3 rounded-xl xs:rounded-2xl font-bold transition-all text-xs xs:text-base ${activeTab === tab.id ? 'bg-brand-sage text-brand-darkGrey shadow-lg scale-105' : 'bg-white text-brand-darkGrey/60 hover:bg-brand-sage/20'}`}
                >
                  <Icon size={16} className="xs:size-[18px]" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form (only for sermons/events) or Stats (for messages) */}
          <div className="lg:col-span-4">
            {activeTab === 'broadcast' ? (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-brand-darkGrey p-6 xs:p-8 rounded-[2rem] xs:rounded-[2.5rem] shadow-xl text-white sticky top-32 overflow-hidden group">
                <Send className="absolute -bottom-4 -right-4 w-24 h-24 xs:w-32 xs:h-32 text-white/5 -rotate-12 group-hover:rotate-0 transition-transform duration-700" />
                <h2 className="text-xl xs:text-2xl font-black mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                    <Send size={18} className="xs:size-[20px] text-brand-sage" />
                  </div>
                  Broadcaster
                </h2>
                <form onSubmit={handleSendNotification} className="space-y-4 xs:space-y-5 relative z-10">
                  <div>
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-2 block">Alert Title</label>
                    <input required type="text" value={notificationData.title} onChange={e => setNotificationData({...notificationData, title: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl xs:rounded-2xl px-5 py-3.5 text-white font-medium focus:outline-none focus:ring-2 focus:ring-brand-sage transition-all text-sm xs:text-base" placeholder="Sunday Service Over" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-2 block">Message Body</label>
                    <textarea required rows={4} value={notificationData.body} onChange={e => setNotificationData({...notificationData, body: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl xs:rounded-2xl px-5 py-3.5 text-white font-medium focus:outline-none focus:ring-2 focus:ring-brand-sage transition-all resize-none text-sm xs:text-base" placeholder="The service was amazing! Click to read today's word..." />
                  </div>
                  <button disabled={sendingNotification} type="submit" className="w-full bg-brand-sage text-brand-darkGrey font-black py-4 rounded-xl xs:rounded-2xl shadow-lg hover:bg-brand-sage/80 transition-all flex items-center justify-center gap-2 disabled:opacity-50 text-sm xs:text-base active:scale-95 transition-transform">
                    <Send size={18} />
                    {sendingNotification ? 'Sending...' : 'Broadcast Alert'}
                  </button>
                </form>
              </motion.div>
            ) : activeTab !== 'messages' ? (
              <motion.div 
                layout
                className="bg-white p-6 xs:p-8 rounded-[2rem] xs:rounded-[2.5rem] shadow-xl shadow-brand-darkGrey/5 border border-brand-sage/10 sticky top-32"
              >
                <h2 className="text-xl xs:text-2xl font-black text-brand-darkGrey mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-sage/10 rounded-xl flex items-center justify-center text-brand-sage">
                    {editingId ? <Edit2 size={20} /> : <Plus size={20} />}
                  </div>
                  {editingId ? 'Edit Item' : 'Add New'}
                </h2>
                
                <form onSubmit={
                  activeTab === 'sermons' ? handleSermonSubmit : 
                  activeTab === 'events' ? handleEventSubmit : 
                  activeTab === 'ministries' ? handleMinistrySubmit :
                  handleLeaderSubmit
                } className="space-y-4 xs:space-y-5">
                  <div>
                    <label className="text-[10px] font-black text-brand-darkGrey/40 uppercase tracking-widest mb-2 block">Title / Name</label>
                    <input required type="text" value={formData.title || formData.name || ''} onChange={e => setFormData({...formData, title: e.target.value, name: e.target.value})} className="w-full bg-brand-cream/50 border border-brand-sage/20 rounded-xl xs:rounded-2xl px-5 py-3.5 text-brand-darkGrey font-medium focus:outline-none focus:ring-2 focus:ring-brand-sage transition-all text-sm xs:text-base" />
                  </div>
                  
                  {activeTab === 'ministries' && (
                    <div>
                      <label className="text-[10px] font-black text-brand-darkGrey/40 uppercase tracking-widest mb-2 block">Tagline</label>
                      <input required type="text" value={formData.tagline || ''} onChange={e => setFormData({...formData, tagline: e.target.value})} className="w-full bg-brand-cream/50 border border-brand-sage/20 rounded-xl xs:rounded-2xl px-5 py-3.5 text-brand-darkGrey font-medium focus:outline-none focus:ring-2 focus:ring-brand-sage transition-all text-sm xs:text-base" placeholder="e.g. Iron sharpening iron" />
                    </div>
                  )}

                  <div>
                    <label className="text-[10px] font-black text-brand-darkGrey/40 uppercase tracking-widest mb-2 block">Date / Schedule</label>
                    <input required type={activeTab === 'events' ? "datetime-local" : activeTab === 'ministries' ? "text" : "date"} value={formData.date || formData.meetingTime || ''} onChange={e => setFormData({...formData, date: e.target.value, meetingTime: e.target.value})} className="w-full bg-brand-cream/50 border border-brand-sage/20 rounded-xl xs:rounded-2xl px-5 py-3.5 text-brand-darkGrey font-medium focus:outline-none focus:ring-2 focus:ring-brand-sage transition-all text-sm xs:text-base" placeholder={activeTab === 'ministries' ? "e.g. Saturdays, 3:00 PM" : ""} />
                  </div>

                  {activeTab === 'sermons' && (
                    <div>
                      <label className="text-[10px] font-black text-brand-darkGrey/40 uppercase tracking-widest mb-2 block">YouTube URL</label>
                      <input required type="text" value={formData.videoUrl || ''} onChange={e => setFormData({...formData, videoUrl: e.target.value})} className="w-full bg-brand-cream/50 border border-brand-sage/20 rounded-xl xs:rounded-2xl px-5 py-3.5 text-brand-darkGrey font-medium focus:outline-none focus:ring-2 focus:ring-brand-sage transition-all text-sm xs:text-base" />
                    </div>
                  )}

                  {activeTab === 'events' && (
                    <div>
                      <label className="text-[10px] font-black text-brand-darkGrey/40 uppercase tracking-widest mb-2 block">Location</label>
                      <input required type="text" value={formData.location || ''} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full bg-brand-cream/50 border border-brand-sage/20 rounded-xl xs:rounded-2xl px-5 py-3.5 text-brand-darkGrey font-medium focus:outline-none focus:ring-2 focus:ring-brand-sage transition-all text-sm xs:text-base" />
                    </div>
                  )}

                  {activeTab === 'ministries' && (
                    <>
                      <div>
                        <label className="text-[10px] font-black text-brand-darkGrey/40 uppercase tracking-widest mb-2 block">Main Image URL</label>
                        <input required type="text" value={formData.image || ''} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full bg-brand-cream/50 border border-brand-sage/20 rounded-xl xs:rounded-2xl px-5 py-3.5 text-brand-darkGrey font-medium focus:outline-none focus:ring-2 focus:ring-brand-sage transition-all text-sm xs:text-base" placeholder="e.g. /choir.jpeg" />
                      </div>
                      <div>
                        <label className="text-[10px] font-black text-brand-darkGrey/40 uppercase tracking-widest mb-2 block">Leader / Contact</label>
                        <input required type="text" value={formData.leader || ''} onChange={e => setFormData({...formData, leader: e.target.value})} className="w-full bg-brand-cream/50 border border-brand-sage/20 rounded-xl xs:rounded-2xl px-5 py-3.5 text-brand-darkGrey font-medium focus:outline-none focus:ring-2 focus:ring-brand-sage transition-all text-sm xs:text-base" />
                      </div>
                      <div>
                        <label className="text-[10px] font-black text-brand-darkGrey/40 uppercase tracking-widest mb-2 block">Activities (comma separated)</label>
                        <textarea value={Array.isArray(formData.activities) ? formData.activities.join(', ') : formData.activities || ''} onChange={e => setFormData({...formData, activities: e.target.value})} className="w-full bg-brand-cream/50 border border-brand-sage/20 rounded-xl xs:rounded-2xl px-5 py-3.5 text-brand-darkGrey font-medium focus:outline-none focus:ring-2 focus:ring-brand-sage transition-all text-sm xs:text-base" placeholder="e.g. Sunday Service, Choir Rehearsals" />
                      </div>
                      <div>
                        <label className="text-[10px] font-black text-brand-darkGrey/40 uppercase tracking-widest mb-2 block">Gallery Images (comma separated URLs)</label>
                        <textarea value={Array.isArray(formData.images) ? formData.images.join(', ') : formData.images || ''} onChange={e => setFormData({...formData, images: e.target.value})} className="w-full bg-brand-cream/50 border border-brand-sage/20 rounded-xl xs:rounded-2xl px-5 py-3.5 text-brand-darkGrey font-medium focus:outline-none focus:ring-2 focus:ring-brand-sage transition-all text-sm xs:text-base" placeholder="e.g. /image1.jpg, /image2.jpg" />
                      </div>
                    </>
                  )}

                  {activeTab === 'leaders' && (
                    <>
                      <div>
                        <label className="text-[10px] font-black text-brand-darkGrey/40 uppercase tracking-widest mb-2 block">Role</label>
                        <input required type="text" value={formData.role || ''} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full bg-brand-cream/50 border border-brand-sage/20 rounded-xl xs:rounded-2xl px-5 py-3.5 text-brand-darkGrey font-medium focus:outline-none focus:ring-2 focus:ring-brand-sage transition-all text-sm xs:text-base" />
                      </div>
                      <div>
                        <label className="text-[10px] font-black text-brand-darkGrey/40 uppercase tracking-widest mb-2 block">Leader Photo URL</label>
                        <input required type="text" value={formData.image || ''} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full bg-brand-cream/50 border border-brand-sage/20 rounded-xl xs:rounded-2xl px-5 py-3.5 text-brand-darkGrey font-medium focus:outline-none focus:ring-2 focus:ring-brand-sage transition-all text-sm xs:text-base" />
                      </div>
                      <div>
                        <label className="text-[10px] font-black text-brand-darkGrey/40 uppercase tracking-widest mb-2 block">Highlights (comma separated)</label>
                        <input type="text" value={Array.isArray(formData.highlights) ? formData.highlights.join(', ') : formData.highlights || ''} onChange={e => setFormData({...formData, highlights: e.target.value})} className="w-full bg-brand-cream/50 border border-brand-sage/20 rounded-xl xs:rounded-2xl px-5 py-3.5 text-brand-darkGrey font-medium focus:outline-none focus:ring-2 focus:ring-brand-sage transition-all text-sm xs:text-base" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] font-black text-brand-darkGrey/40 uppercase tracking-widest mb-2 block">Favorite Verse text</label>
                          <input type="text" value={formData.verse?.text || formData.verseText || ''} onChange={e => setFormData({...formData, verseText: e.target.value})} className="w-full bg-brand-cream/50 border border-brand-sage/20 rounded-xl xs:rounded-2xl px-5 py-3.5 text-brand-darkGrey font-medium focus:outline-none focus:ring-2 focus:ring-brand-sage transition-all text-sm xs:text-base" />
                        </div>
                        <div>
                          <label className="text-[10px] font-black text-brand-darkGrey/40 uppercase tracking-widest mb-2 block">Verse Reference</label>
                          <input type="text" value={formData.verse?.reference || formData.verseReference || ''} onChange={e => setFormData({...formData, verseReference: e.target.value})} className="w-full bg-brand-cream/50 border border-brand-sage/20 rounded-xl xs:rounded-2xl px-5 py-3.5 text-brand-darkGrey font-medium focus:outline-none focus:ring-2 focus:ring-brand-sage transition-all text-sm xs:text-base" />
                        </div>
                      </div>
                    </>
                  )}

                  <div>
                    <label className="text-[10px] font-black text-brand-darkGrey/40 uppercase tracking-widest mb-2 block">Description</label>
                    <textarea required rows={4} value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-brand-cream/50 border border-brand-sage/20 rounded-xl xs:rounded-2xl px-5 py-3.5 text-brand-darkGrey font-medium focus:outline-none focus:ring-2 focus:ring-brand-sage transition-all resize-none text-sm xs:text-base" />
                  </div>
                  <div className="flex gap-4 pt-2">
                    <button type="submit" className="flex-grow bg-brand-darkGrey text-white font-black py-4 rounded-xl xs:rounded-2xl shadow-lg hover:bg-brand-darkGrey/80 transition-all text-sm xs:text-base active:scale-95 transition-transform">
                      {editingId ? 'Update' : 'Save'}
                    </button>
                    {editingId && (
                      <button type="button" onClick={() => { setEditingId(null); setFormData({}); setStatus(null); }} className="px-4 xs:px-6 bg-brand-cream border border-brand-sage/20 text-brand-darkGrey/60 font-bold rounded-xl xs:rounded-2xl hover:bg-brand-sage/10 transition-all text-xs xs:text-base">
                        Cancel
                      </button>
                    )}
                  </div>
                  {status && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className={`p-4 rounded-2xl flex items-center gap-3 text-sm font-bold border ${status.type === 'success' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                      {status.type === 'success' ? <CheckCircle2 size={18} /> : <ShieldAlert size={18} />}
                      {status.message}
                    </motion.div>
                  )}
                </form>
              </motion.div>
            ) : (
              <div className="bg-brand-darkGrey p-8 rounded-[2.5rem] shadow-xl text-white sticky top-32 overflow-hidden group">
                <Database className="absolute -bottom-4 -right-4 w-32 h-32 text-white/5 -rotate-12 group-hover:rotate-0 transition-transform duration-700" />
                <h3 className="text-xl font-black mb-4 relative z-10">Database Status</h3>
                <div className="space-y-4 relative z-10">
                  <div className="bg-white/10 rounded-2xl p-6 border border-white/10">
                    <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-1">Total Inquiries</p>
                    <p className="text-4xl font-black text-brand-sage">{messages.length}</p>
                  </div>
                  <p className="text-sm font-medium text-white/50 leading-relaxed italic">
                    Messages are cleared automatically from the primary dashboard once processed to maintain data security.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: List */}
          <div className="lg:col-span-8">
            <div className="space-y-4">
              {loading ? (
                <div className="flex justify-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-sage"></div>
                </div>
              ) : activeTab === 'sermons' ? (
                sermons.map((sermon) => (
                  <motion.div key={sermon.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-3xl border border-brand-sage/10 shadow-xl shadow-brand-grey/5 flex justify-between items-center group">
                    <div>
                      <h3 className="text-lg font-black text-brand-darkGrey">{sermon.title}</h3>
                      <p className="text-sm text-brand-darkGrey/40 font-bold">{new Date(sermon.date).toLocaleDateString()}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => { setEditingId(sermon.id || null); setFormData(sermon); }} className="p-3 bg-brand-cream text-brand-darkGrey/60 rounded-xl hover:bg-brand-sage hover:text-brand-darkGrey transition-all transform hover:scale-105 shadow-sm">
                        <Edit2 size={18} />
                      </button>
                      <button onClick={() => handleDelete('sermons', sermon.id!)} className="p-3 bg-brand-cream text-red-500/60 rounded-xl hover:bg-red-500 hover:text-white transition-all transform hover:scale-105 shadow-sm">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </motion.div>
                ))
              ) : activeTab === 'events' ? (
                events.map((event) => (
                  <motion.div key={event.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-3xl border border-brand-sage/10 shadow-xl shadow-brand-grey/5 flex justify-between items-center group">
                    <div>
                      <h3 className="text-lg font-black text-brand-darkGrey">{event.title}</h3>
                      <p className="text-sm text-brand-darkGrey/40 font-bold">{new Date(event.date).toLocaleString()}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => { setEditingId(event.id || null); setFormData(event); }} className="p-3 bg-brand-cream text-brand-darkGrey/60 rounded-xl hover:bg-brand-sage hover:text-brand-darkGrey transition-all transform hover:scale-105 shadow-sm">
                        <Edit2 size={18} />
                      </button>
                      <button onClick={() => handleDelete('events', event.id!)} className="p-3 bg-brand-cream text-red-500/60 rounded-xl hover:bg-red-500 hover:text-white transition-all transform hover:scale-105 shadow-sm">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </motion.div>
                ))
              ) : activeTab === 'ministries' ? (
                ministries.map((ministry) => (
                  <motion.div key={ministry.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-3xl border border-brand-sage/10 shadow-xl shadow-brand-grey/5 flex justify-between items-center group">
                    <div className="flex items-center gap-4">
                      {ministry.image && (
                         <div className="w-12 h-12 rounded-xl overflow-hidden bg-brand-cream">
                           <img src={ministry.image} alt="" className="w-full h-full object-cover grayscale opacity-50" />
                         </div>
                      )}
                      <div>
                        <h3 className="text-lg font-black text-brand-darkGrey">{ministry.name}</h3>
                        <p className="text-sm text-brand-darkGrey/40 font-bold uppercase tracking-widest">{ministry.tagline}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => { setEditingId(ministry.id || null); setFormData(ministry); }} className="p-3 bg-brand-cream text-brand-darkGrey/60 rounded-xl hover:bg-brand-sage hover:text-brand-darkGrey transition-all transform hover:scale-105 shadow-sm">
                        <Edit2 size={18} />
                      </button>
                      <button onClick={() => handleDelete('ministries', ministry.id!)} className="p-3 bg-brand-cream text-red-500/60 rounded-xl hover:bg-red-500 hover:text-white transition-all transform hover:scale-105 shadow-sm">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </motion.div>
                ))
              ) : activeTab === 'leaders' ? (
                leaders.map((leader) => (
                  <motion.div key={leader.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-3xl border border-brand-sage/10 shadow-xl shadow-brand-grey/5 flex justify-between items-center group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-brand-cream">
                        <img src={leader.image} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-brand-darkGrey">{leader.name}</h3>
                        <p className="text-sm text-brand-sage font-bold uppercase tracking-widest">{leader.role}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => { setEditingId(leader.id || null); setFormData(leader); }} className="p-3 bg-brand-cream text-brand-darkGrey/60 rounded-xl hover:bg-brand-sage hover:text-brand-darkGrey transition-all transform hover:scale-105 shadow-sm">
                        <Edit2 size={18} />
                      </button>
                      <button onClick={() => handleDelete('leaders', leader.id!)} className="p-3 bg-brand-cream text-red-500/60 rounded-xl hover:bg-red-500 hover:text-white transition-all transform hover:scale-105 shadow-sm">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </motion.div>
                ))
              ) : activeTab === 'messages' ? (
                messages.map((message) => (
                  <motion.div key={message.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-[2.5rem] border border-brand-sage/10 shadow-xl shadow-brand-grey/5 overflow-hidden group relative">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-brand-sage text-white rounded-2xl flex items-center justify-center font-black text-lg shadow-lg rotate-3 group-hover:rotate-0 transition-transform">
                          {message.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="text-xl font-black text-brand-darkGrey">{message.name}</h3>
                          <div className="flex items-center gap-2 text-brand-darkGrey/40 font-bold text-sm">
                             <Mail size={12} />
                             <span>{message.email}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-3">
                         <button onClick={() => handleReply(message)} className="px-6 py-3 bg-brand-sage text-brand-darkGrey font-black rounded-2xl hover:bg-brand-sage/80 transition-all flex items-center gap-2 shadow-md">
                           <Reply size={18} />
                           Reply
                         </button>
                         <button onClick={() => handleDelete('messages', message.id!)} className="p-3 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-md">
                           <Trash2 size={18} />
                         </button>
                      </div>
                    </div>
                    <div className="bg-brand-cream/40 p-6 rounded-2xl border border-brand-sage/10">
                      <h4 className="font-black text-brand-darkGrey text-sm uppercase tracking-widest mb-2 flex items-center gap-2">
                        <Database size={14} className="text-brand-sage" />
                        Subject: {message.subject}
                      </h4>
                      <p className="text-brand-darkGrey/60 leading-relaxed font-medium italic">
                        "{message.message}"
                      </p>
                    </div>
                  </motion.div>
                ))
              ) : null}

              {!loading && ((activeTab === 'sermons' && sermons.length === 0) || (activeTab === 'events' && events.length === 0) || (activeTab === 'messages' && messages.length === 0)) && (
                <div className="bg-white/50 backdrop-blur-sm rounded-[2.5rem] p-20 text-center border-2 border-dashed border-brand-sage/20">
                  <Database size={48} className="mx-auto mb-4 text-brand-sage/20" />
                  <p className="text-brand-darkGrey/40 text-xl font-black">Record Registry Empty</p>
                  <p className="text-brand-darkGrey/30 font-bold text-sm uppercase tracking-[0.2em] mt-2">Standing by for data input</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
