import React, { useState, useEffect } from 'react';
import { getSermons, addSermon, updateSermon, deleteSermon } from '../services/sermons';
import { getEvents, addEvent, updateEvent, deleteEvent } from '../services/events';
import { getMinistries, addMinistry, updateMinistry, deleteMinistry } from '../services/ministries';
import type { Sermon, EventItem, Ministry } from '../types';
import { Trash2, Edit2, X } from 'lucide-react';

const Admin = () => {
  const [activeTab, setActiveTab] = useState<'sermons' | 'events' | 'ministries'>('sermons');
  
  // Data State
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [ministries, setMinistries] = useState<Ministry[]>([]);
  const [loading, setLoading] = useState(true);

  // Edit State
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State Defaults
  const initSermon = { title: '', date: '', videoUrl: '', description: '', category: '' };
  const initEvent = { title: '', date: '', location: '', description: '' };
  const initMinistry = { name: '', description: '', image: '' };

  const [sermonData, setSermonData] = useState<Omit<Sermon, 'id'>>(initSermon);
  const [eventData, setEventData] = useState<Omit<EventItem, 'id'>>(initEvent);
  const [ministryData, setMinistryData] = useState<Omit<Ministry, 'id'>>(initMinistry);

  useEffect(() => {
    fetchData();
    cancelEdit();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'sermons') setSermons(await getSermons());
      else if (activeTab === 'events') setEvents(await getEvents());
      else setMinistries(await getMinistries());
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    if (activeTab === 'sermons') setSermonData(initSermon);
    else if (activeTab === 'events') setEventData(initEvent);
    else setMinistryData(initMinistry);
  };

  const startEdit = (item: any, type: 'sermon' | 'event' | 'ministry') => {
    setEditingId(item.id);
    if (type === 'sermon') setSermonData({ title: item.title, date: item.date, videoUrl: item.videoUrl, description: item.description, category: item.category || '' });
    else if (type === 'event') setEventData({ title: item.title, date: item.date, location: item.location, description: item.description });
    else setMinistryData({ name: item.name, description: item.description, image: item.image });
  };

  const handleSermonSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) await updateSermon(editingId, sermonData);
      else await addSermon(sermonData);
      cancelEdit();
      fetchData();
    } catch (error) { console.error('Error saving sermon:', error); }
  };

  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) await updateEvent(editingId, eventData);
      else await addEvent(eventData);
      cancelEdit();
      fetchData();
    } catch (error) { console.error('Error saving event:', error); }
  };

  const handleMinistrySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) await updateMinistry(editingId, ministryData);
      else await addMinistry(ministryData);
      cancelEdit();
      fetchData();
    } catch (error) { console.error('Error saving ministry:', error); }
  };

  const handleDelete = async (id: string, type: 'sermon' | 'event' | 'ministry') => {
    if (confirm(`Are you sure you want to delete this ${type}?`)) {
      if (type === 'sermon') await deleteSermon(id);
      else if (type === 'event') await deleteEvent(id);
      else await deleteMinistry(id);
      if (editingId === id) cancelEdit();
      fetchData();
    }
  };

  return (
    <div className="pt-44 pb-20 px-4 max-w-7xl mx-auto min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-brand-gold">CMS Dashboard</h1>

      {/* Tabs */}
      <div className="flex flex-wrap gap-4 mb-8 border-b border-[#2a2a2a] pb-4">
        {['sermons', 'events', 'ministries'].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-6 py-2 rounded-lg font-bold transition-all capitalize ${
              activeTab === tab 
                ? 'bg-brand-gold text-black shadow-lg scale-105' 
                : 'bg-transparent text-gray-400 hover:text-white border border-[#2a2a2a] hover:border-gray-500'
            }`}
          >
            Manage {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Container */}
        <div className="bg-[#0f0f0f] p-8 rounded-2xl border border-brand-gold/30 lg:col-span-1 h-fit shadow-xl relative">
          {editingId && (
            <button onClick={cancelEdit} className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-full hover:bg-brand-dark transition-colors">
              <X size={20} />
            </button>
          )}
          
          <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
            {editingId ? <span className="text-blue-400"><Edit2 size={24}/></span> : <span className="text-brand-gold">+</span>}
            {editingId ? `Edit ${activeTab.slice(0, -1)}` : `Add New ${activeTab.slice(0, -1)}`}
          </h2>
          
          {activeTab === 'sermons' && (
            <form onSubmit={handleSermonSubmit} className="space-y-5">
              <div><label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Title</label>
                <input required type="text" value={sermonData.title} onChange={e => setSermonData({...sermonData, title: e.target.value})} className="w-full bg-brand-dark border border-[#2a2a2a] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors" /></div>
              <div><label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Date</label>
                <input required type="date" value={sermonData.date} onChange={e => setSermonData({...sermonData, date: e.target.value})} className="w-full bg-brand-dark border border-[#2a2a2a] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors" /></div>
              <div><label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Video URL (YouTube)</label>
                <input required type="url" value={sermonData.videoUrl} onChange={e => setSermonData({...sermonData, videoUrl: e.target.value})} className="w-full bg-brand-dark border border-[#2a2a2a] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors" /></div>
              <div><label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Category</label>
                <input required type="text" value={sermonData.category} onChange={e => setSermonData({...sermonData, category: e.target.value})} className="w-full bg-brand-dark border border-[#2a2a2a] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors" placeholder="e.g. Sunday Service" /></div>
              <div><label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Description</label>
                <textarea required rows={4} value={sermonData.description} onChange={e => setSermonData({...sermonData, description: e.target.value})} className="w-full bg-brand-dark border border-[#2a2a2a] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors resize-none" /></div>
              <button type="submit" className={`w-full font-bold py-3 rounded-xl transition-colors mt-4 text-black ${editingId ? 'bg-blue-400 hover:bg-blue-500' : 'bg-brand-gold hover:bg-yellow-500'}`}>
                {editingId ? 'Update Sermon' : 'Save Sermon'}
              </button>
            </form>
          )}

          {activeTab === 'events' && (
            <form onSubmit={handleEventSubmit} className="space-y-5">
              <div><label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Title</label>
                <input required type="text" value={eventData.title} onChange={e => setEventData({...eventData, title: e.target.value})} className="w-full bg-brand-dark border border-[#2a2a2a] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors" /></div>
              <div><label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Date & Time</label>
                <input required type="datetime-local" value={eventData.date} onChange={e => setEventData({...eventData, date: e.target.value})} className="w-full bg-brand-dark border border-[#2a2a2a] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors" /></div>
              <div><label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Location</label>
                <input required type="text" value={eventData.location} onChange={e => setEventData({...eventData, location: e.target.value})} className="w-full bg-brand-dark border border-[#2a2a2a] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors" /></div>
              <div><label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Description</label>
                <textarea required rows={4} value={eventData.description} onChange={e => setEventData({...eventData, description: e.target.value})} className="w-full bg-brand-dark border border-[#2a2a2a] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors resize-none" /></div>
              <button type="submit" className={`w-full font-bold py-3 rounded-xl transition-colors mt-4 text-black ${editingId ? 'bg-blue-400 hover:bg-blue-500' : 'bg-brand-gold hover:bg-yellow-500'}`}>
                {editingId ? 'Update Event' : 'Save Event'}
              </button>
            </form>
          )}

          {activeTab === 'ministries' && (
            <form onSubmit={handleMinistrySubmit} className="space-y-5">
              <div><label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Name</label>
                <input required type="text" value={ministryData.name} onChange={e => setMinistryData({...ministryData, name: e.target.value})} className="w-full bg-brand-dark border border-[#2a2a2a] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors" /></div>
              <div><label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Image URL</label>
                <input required type="url" value={ministryData.image} onChange={e => setMinistryData({...ministryData, image: e.target.value})} className="w-full bg-brand-dark border border-[#2a2a2a] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors" placeholder="https://unsplash.com/..." /></div>
              <div><label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Description</label>
                <textarea required rows={4} value={ministryData.description} onChange={e => setMinistryData({...ministryData, description: e.target.value})} className="w-full bg-brand-dark border border-[#2a2a2a] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors resize-none" /></div>
              <button type="submit" className={`w-full font-bold py-3 rounded-xl transition-colors mt-4 text-black ${editingId ? 'bg-blue-400 hover:bg-blue-500' : 'bg-brand-gold hover:bg-yellow-500'}`}>
                {editingId ? 'Update Ministry' : 'Save Ministry'}
              </button>
            </form>
          )}
        </div>

        {/* List Container */}
        <div className="bg-[#0f0f0f] p-8 rounded-2xl border border-[#2a2a2a] lg:col-span-2 shadow-xl">
          <h2 className="text-2xl font-bold mb-6 text-white capitalize">Database Records</h2>
          
          {loading ? (
             <div className="flex justify-center items-center h-32">
               <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand-gold"></div>
             </div>
          ) : (
            <div className="space-y-4">
              {activeTab === 'sermons' && sermons.map(s => (
                <div key={s.id} className={`bg-brand-dark p-5 rounded-xl flex justify-between items-center border transition-colors group ${editingId === s.id ? 'border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.2)]' : 'border-[#2a2a2a] hover:border-brand-gold/50'}`}>
                  <div>
                    <h4 className="font-bold text-lg text-white mb-1 group-hover:text-brand-gold">{s.title}</h4>
                    <p className="text-sm text-gray-400">{new Date(s.date).toLocaleDateString()} &bull; {s.category}</p>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => startEdit(s, 'sermon')} className="p-3 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500 hover:text-white transition-colors"><Edit2 size={20} /></button>
                    <button onClick={() => handleDelete(s.id!, 'sermon')} className="p-3 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors"><Trash2 size={20} /></button>
                  </div>
                </div>
              ))}
              
              {activeTab === 'events' && events.map(e => (
                <div key={e.id} className={`bg-brand-dark p-5 rounded-xl flex justify-between items-center border transition-colors group ${editingId === e.id ? 'border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.2)]' : 'border-[#2a2a2a] hover:border-brand-gold/50'}`}>
                  <div>
                    <h4 className="font-bold text-lg text-white mb-1 group-hover:text-brand-gold">{e.title}</h4>
                    <p className="text-sm text-gray-400">{new Date(e.date).toLocaleString()} &bull; {e.location}</p>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => startEdit(e, 'event')} className="p-3 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500 hover:text-white transition-colors"><Edit2 size={20} /></button>
                    <button onClick={() => handleDelete(e.id!, 'event')} className="p-3 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors"><Trash2 size={20} /></button>
                  </div>
                </div>
              ))}

              {activeTab === 'ministries' && ministries.map(m => (
                <div key={m.id} className={`bg-brand-dark p-5 rounded-xl flex justify-between items-center border transition-colors group ${editingId === m.id ? 'border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.2)]' : 'border-[#2a2a2a] hover:border-brand-gold/50'}`}>
                  <div className="flex items-center gap-4">
                    <img src={m.image} alt={m.name} className="w-16 h-16 rounded-lg object-cover bg-gray-800" />
                    <div>
                      <h4 className="font-bold text-lg text-white mb-1 group-hover:text-brand-gold">{m.name}</h4>
                      <p className="text-sm text-gray-400 line-clamp-1 max-w-md">{m.description}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                     <button onClick={() => startEdit(m, 'ministry')} className="p-3 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500 hover:text-white transition-colors"><Edit2 size={20} /></button>
                     <button onClick={() => handleDelete(m.id!, 'ministry')} className="p-3 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors"><Trash2 size={20} /></button>
                  </div>
                </div>
              ))}

              {((activeTab === 'sermons' && sermons.length === 0) || 
                (activeTab === 'events' && events.length === 0) || 
                (activeTab === 'ministries' && ministries.length === 0)) && (
                <div className="text-center py-12 border-2 border-dashed border-[#2a2a2a] rounded-2xl">
                  <p className="text-gray-500 text-lg">No {activeTab} exist in your Firebase database.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Admin;
