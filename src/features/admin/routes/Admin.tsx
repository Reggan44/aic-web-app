import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { signOut } from 'firebase/auth';
import { auth } from '../../../lib/firebase';
import { useNavigate } from 'react-router-dom';
import { getSermons, addSermon, updateSermon, deleteSermon } from '../../sermons/api/getSermons';
import { getEvents, addEvent, updateEvent, deleteEvent } from '../../events/api/getEvents';
import { getBroadcastHistory, broadcastNotification } from '../../notifications/api/notifications';
import { getMinistries, addMinistry, updateMinistry, deleteMinistry } from '../../ministries/api/getMinistries';
import { getLeaders, addLeader, updateLeader, deleteLeader } from '../../leaders/api/getLeaders';
import { getContactMessages, deleteContactMessage, markMessageAsRead, type ContactMessage } from '../api/contact';
import { uploadImage } from '../../../lib/storage';
import type { Sermon, EventItem, BroadcastNotification, Ministry, Leader } from '../../../types';
import {
  Trash2, Edit2, X, Plus, Database, Calendar as CalendarIcon,
  Library, Heart, MapPin, LogOut, CheckCircle, AlertCircle, Loader2,
  Image as ImageIcon, FileText, Bell, Send, Upload, Tag, LayoutList,
  PlusCircle, MinusCircle, Users, MessageSquare
} from 'lucide-react';
import { Button } from '../../../components/elements/Button';
import { Input } from '../../../components/elements/Input';
import { Label } from '../../../components/elements/Label';
import { cn } from '../../../utils';
import {
  isNonEmpty, isValidUrl, isWithinMaxLength, sanitizeText
} from '../../../utils/validation';

// ─── Types ──────────────────────────────────────────────────────────────────

type TabKey = 'sermons' | 'events' | 'notifications' | 'ministries' | 'leaders' | 'messages';
type ToastType = 'success' | 'error';

interface Toast {
  message: string;
  type: ToastType;
}

// ─── Toast Component ─────────────────────────────────────────────────────────

const ToastNotification = ({ toast, onDismiss }: { toast: Toast; onDismiss: () => void }) => (
  <div
    role="status"
    aria-live="polite"
    className={cn(
      "fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl shadow-xl text-sm font-medium transition-all",
      toast.type === 'success'
        ? 'bg-green-50 text-green-800 border border-green-200'
        : 'bg-red-50 text-red-800 border border-red-200'
    )}
  >
    {toast.type === 'success'
      ? <CheckCircle size={18} className="text-green-600 shrink-0" aria-hidden="true" />
      : <AlertCircle size={18} className="text-red-500 shrink-0" aria-hidden="true" />
    }
    {toast.message}
    <button onClick={onDismiss} className="ml-2 text-current opacity-60 hover:opacity-100" aria-label="Dismiss notification">
      <X size={14} />
    </button>
  </div>
);

// ─── Validation ───────────────────────────────────────────────────────────────

const validateSermon = (data: Omit<Sermon, 'id'>): string | null => {
  if (!isNonEmpty(data.title)) return 'Title is required.';
  if (!isWithinMaxLength(data.title, 200)) return 'Title must be 200 characters or fewer.';
  if (!isNonEmpty(data.date)) return 'Date is required.';
  if (!isNonEmpty(data.videoUrl)) return 'Video URL is required.';
  if (!isValidUrl(data.videoUrl)) return 'Video URL must be a valid https:// URL.';
  if (!isWithinMaxLength(data.description, 2000)) return 'Description must be 2000 characters or fewer.';
  return null;
};

const validateEvent = (data: Omit<EventItem, 'id'>): string | null => {
  if (!isNonEmpty(data.title)) return 'Title is required.';
  if (!isWithinMaxLength(data.title, 200)) return 'Title must be 200 characters or fewer.';
  if (!isNonEmpty(data.date)) return 'Date is required.';
  if (!isNonEmpty(data.location)) return 'Location is required.';
  if (!isWithinMaxLength(data.description, 2000)) return 'Description must be 2000 characters or fewer.';
  return null;
};

const validateMinistry = (data: Omit<Ministry, 'id'>): string | null => {
  if (!isNonEmpty(data.name)) return 'Name is required.';
  if (!isWithinMaxLength(data.name, 100)) return 'Name must be 100 characters or fewer.';
  if (!isNonEmpty(data.description)) return 'Description is required.';
  if (!isWithinMaxLength(data.description, 1000)) return 'Description must be 1000 characters or fewer.';
  if (!isNonEmpty(data.image)) return 'Image URL is required.';
  return null;
};

const validateLeader = (data: Omit<Leader, 'id'>): string | null => {
  if (!isNonEmpty(data.name)) return 'Name is required.';
  if (!isNonEmpty(data.role)) return 'Role is required.';
  if (!isNonEmpty(data.bio)) return 'Bio is required.';
  if (!isNonEmpty(data.image)) return 'Profile image is required.';
  return null;
};

// ─── Initial States ──────────────────────────────────────────────────────────
const initSermon: Omit<Sermon, 'id'> = { title: '', date: '', videoUrl: '', description: '', category: '' };
const initEvent: Omit<EventItem, 'id'> = { title: '', date: '', location: '', description: '' };
const initNotification: Omit<BroadcastNotification, 'id'> = { title: '', body: '', sentAt: '' };
const initMinistry: Omit<Ministry, 'id'> = { 
  name: '', 
  description: '', 
  image: '', 
  gallery: [], 
  iconName: 'BookOpen', 
  color: 'bg-brand-sage', 
  textColor: 'text-brand-sage',
  order: 0
};
const initLeader: Omit<Leader, 'id'> = { name: '', role: '', bio: '', image: '', responsibilities: [], order: 0 };

// ─── Main Component ───────────────────────────────────────────────────────────

const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabKey>('sermons');
  
  // Content States
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [notifications, setNotifications] = useState<BroadcastNotification[]>([]);
  const [ministries, setMinistries] = useState<Ministry[]>([]);
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  
  // UI States
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [toast, setToast] = useState<Toast | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Form States
  const [sermonData, setSermonData] = useState<Omit<Sermon, 'id'>>(initSermon);
  const [eventData, setEventData] = useState<Omit<EventItem, 'id'>>(initEvent);
  const [notificationData, setNotificationData] = useState<Omit<BroadcastNotification, 'id'>>(initNotification);
  const [ministryData, setMinistryData] = useState<Omit<Ministry, 'id'>>(initMinistry);
  const [leaderData, setLeaderData] = useState<Omit<Leader, 'id'>>(initLeader);

  const showToast = (message: string, type: ToastType) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      if (activeTab === 'sermons') setSermons(await getSermons());
      else if (activeTab === 'events') setEvents(await getEvents());
      else if (activeTab === 'notifications') setNotifications(await getBroadcastHistory());
      else if (activeTab === 'ministries') setMinistries(await getMinistries());
      else if (activeTab === 'leaders') setLeaders(await getLeaders());
      else if (activeTab === 'messages') setMessages(await getContactMessages());
    } catch (err: any) {
      console.error('Fetch failed:', err);
      showToast('Failed to load data. Please refresh.', 'error');
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    fetchData();
    cancelEdit();
  }, [activeTab]);

  const cancelEdit = () => {
    setEditingId(null);
    setFormError(null);
    setSermonData(initSermon);
    setEventData(initEvent);
    setNotificationData(initNotification);
    setMinistryData(initMinistry);
    setLeaderData(initLeader);
  };

  const startEdit = (item: any, type: TabKey) => {
    setEditingId(item.id ?? null);
    setFormError(null);
    if (type === 'sermons') {
      const s = item as Sermon;
      setSermonData({ title: s.title, date: s.date, videoUrl: s.videoUrl, description: s.description, category: s.category || '' });
    } else if (type === 'events') {
      const ev = item as EventItem;
      setEventData({ title: ev.title, date: ev.date, location: ev.location, description: ev.description });
    } else if (type === 'ministries') {
      const m = item as Ministry;
      setMinistryData({ 
        name: m.name, 
        description: m.description, 
        image: m.image, 
        gallery: m.gallery || [], 
        iconName: m.iconName, 
        color: m.color, 
        textColor: m.textColor,
        order: m.order || 0
      });
    } else if (type === 'leaders') {
      const l = item as Leader;
      setLeaderData({ name: l.name, role: l.role, bio: l.bio, image: l.image, responsibilities: l.responsibilities || [], order: l.order || 0 });
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, folder: string, callback: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploading(true);
    setFormError(null);
    try {
      const url = await uploadImage(file, folder);
      callback(url);
      showToast('Image uploaded successfully!', 'success');
    } catch (err: any) {
      setFormError(err.message);
    } finally {
      setUploading(false);
    }
  };

  // Generic submit with validation
  const handleSubmit = async (type: TabKey, e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setSubmitting(true);

    try {
      if (type === 'sermons') {
        const sanitized = { ...sermonData, title: sanitizeText(sermonData.title), description: sanitizeText(sermonData.description) };
        const err = validateSermon(sanitized);
        if (err) { setFormError(err); setSubmitting(false); return; }
        if (editingId) await updateSermon(editingId, sanitized);
        else await addSermon(sanitized);
      } else if (type === 'events') {
        const sanitized = { ...eventData, title: sanitizeText(eventData.title), description: sanitizeText(eventData.description), location: sanitizeText(eventData.location) };
        const err = validateEvent(sanitized);
        if (err) { setFormError(err); setSubmitting(false); return; }
        if (editingId) await updateEvent(editingId, sanitized);
        else await addEvent(sanitized);
      } else if (type === 'notifications') {
        if (!notificationData.title || !notificationData.body) { setFormError('Title and Body are required'); setSubmitting(false); return; }
        await broadcastNotification({ ...notificationData, sentAt: new Date().toISOString() });
      } else if (type === 'ministries') {
        const sanitized = { ...ministryData, name: sanitizeText(ministryData.name), description: sanitizeText(ministryData.description) };
        const err = validateMinistry(sanitized);
        if (err) { setFormError(err); setSubmitting(false); return; }
        if (editingId) await updateMinistry(editingId, sanitized);
        else await addMinistry(sanitized);
      } else if (type === 'leaders') {
        const sanitized = { ...leaderData, name: sanitizeText(leaderData.name), role: sanitizeText(leaderData.role), bio: sanitizeText(leaderData.bio) };
        const err = validateLeader(sanitized);
        if (err) { setFormError(err); setSubmitting(false); return; }
        if (editingId) await updateLeader(editingId, sanitized);
        else await addLeader(sanitized);
      }

      cancelEdit();
      await fetchData();
      showToast(`${editingId ? 'Updated' : 'Sent/Created'} successfully!`, 'success');
    } catch (err: any) {
      showToast('An error occurred. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, type: TabKey, name: string) => {
    if (!window.confirm(`Delete "${name}"? This action cannot be undone.`)) return;
    try {
      if (type === 'sermons') await deleteSermon(id);
      else if (type === 'events') await deleteEvent(id);
      else if (type === 'ministries') await deleteMinistry(id);
      else if (type === 'leaders') await deleteLeader(id);
      else if (type === 'messages') await deleteContactMessage(id);
      
      if (editingId === id) cancelEdit();
      await fetchData();
      showToast('Deleted successfully.', 'success');
    } catch {
      showToast('Failed to delete. Please try again.', 'error');
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    navigate('/login');
  };

  const repairAndSyncMinistries = async () => {
    if (!window.confirm('Sync & Repair ministries? This will add missing items and update existing ones to match official branding (colors, icons, galleries).')) return;
    setLoading(true);
    try {
      const { ministrySeedData } = await import('../../../data/ministries-seed');
      const current = await getMinistries();
      
      let createdCount = 0;
      let updatedCount = 0;

      for (const seedItem of ministrySeedData) {
        const normalizedSeedName = seedItem.name.toLowerCase().trim();
        const existing = current.find(m => m.name.toLowerCase().trim() === normalizedSeedName);

        if (existing) {
          // Check if update is needed (compare key fields)
          const needsUpdate = 
            existing.iconName !== seedItem.iconName || 
            existing.color !== seedItem.color || 
            existing.image !== seedItem.image ||
            (seedItem.gallery && JSON.stringify(existing.gallery) !== JSON.stringify(seedItem.gallery));

          if (needsUpdate) {
            await updateMinistry(existing.id!, {
              iconName: seedItem.iconName,
              color: seedItem.color,
              textColor: seedItem.textColor,
              image: seedItem.image,
              gallery: seedItem.gallery || [],
              description: seedItem.description // Also sync description in case it changed
            });
            updatedCount++;
          }
        } else {
          // Create new
          await addMinistry({
            name: seedItem.name.trim(),
            description: seedItem.description,
            image: seedItem.image,
            gallery: seedItem.gallery || [],
            iconName: seedItem.iconName,
            color: seedItem.color,
            textColor: seedItem.textColor,
            order: (createdCount + current.length) * 10
          });
          createdCount++;
        }
      }
      
      await fetchData();
      const message = [
        createdCount > 0 ? `Created ${createdCount}` : null,
        updatedCount > 0 ? `Repaired/Updated ${updatedCount}` : null,
        (createdCount === 0 && updatedCount === 0) ? 'All ministries already match official records.' : null
      ].filter(Boolean).join(' and ') || 'Sync complete.';
      
      showToast(message, 'success');
    } catch (err: any) {
      console.error('Repair/Sync failed:', err);
      showToast('Repair/Sync failed: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const repairAndSyncLeaders = async () => {
    if (!window.confirm('Sync & Repair leaders? This will restore missing pastors and update existing ones from the official seed data.')) return;
    setLoading(true);
    try {
      const { leaderSeedData } = await import('../../../data/ministries-seed');
      const current = await getLeaders();
      
      let createdCount = 0;
      let updatedCount = 0;

      for (const seedItem of leaderSeedData) {
        const leaderItem = seedItem as Leader;
        const normalizedSeedName = leaderItem.name.toLowerCase().trim();
        const existing = current.find(l => l.name.toLowerCase().trim() === normalizedSeedName);

        if (existing) {
          // Update existing
          await updateLeader(existing.id!, {
            role: leaderItem.role,
            bio: leaderItem.bio,
            image: leaderItem.image,
            responsibilities: leaderItem.responsibilities || [],
            order: leaderItem.order || 0
          });
          updatedCount++;
        } else {
          // Create new
          const { id, ...leaderDataToAdd } = seedItem;
          await addLeader({
            ...leaderDataToAdd,
            responsibilities: seedItem.responsibilities || [],
            order: seedItem.order || 0
          } as Omit<Leader, 'id'>);
          createdCount++;
        }
      }
      
      await fetchData();
      const message = [
        createdCount > 0 ? `Created ${createdCount}` : null,
        updatedCount > 0 ? `Repaired/Updated ${updatedCount}` : null,
        (createdCount === 0 && updatedCount === 0) ? 'All leaders already match official records.' : null
      ].filter(Boolean).join(' and ') || 'Sync complete.';
      
      showToast(message, 'success');
    } catch (err: any) {
      console.error('Repair/Sync failed:', err);
      showToast('Repair/Sync failed: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const tabConfig = [
    { key: 'sermons' as const, icon: <Library size={16} aria-hidden="true" />, label: 'Sermons' },
    { key: 'ministries' as const, icon: <LayoutList size={16} aria-hidden="true" />, label: 'Ministries' },
    { key: 'events' as const, icon: <CalendarIcon size={16} aria-hidden="true" />, label: 'Events' },
    { key: 'notifications' as const, icon: <Bell size={16} aria-hidden="true" />, label: 'Broadcast' },
    { key: 'leaders' as const, icon: <Users size={16} aria-hidden="true" />, label: 'Pastors/Leaders' },
    { key: 'messages' as const, icon: <MessageSquare size={16} aria-hidden="true" />, label: 'Messages' },
  ];

  return (
    <div className="min-h-screen bg-white relative overflow-hidden pb-24">
      {/* Cinematic Background */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-sage rounded-full blur-[160px]"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-sky rounded-full blur-[140px]"></div>
      </div>

      <div className="pt-32 md:pt-48 px-4 max-w-7xl mx-auto relative z-10">
        {toast && <ToastNotification toast={toast} onDismiss={() => setToast(null)} />}

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <span className="text-brand-sage text-[10px] font-semibold uppercase tracking-[0.45em] block" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Mission Control Center
            </span>
            <h1 className="text-4xl md:text-6xl font-medium text-brand-grey tracking-[0.05em] uppercase leading-none" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              CMS <span className="text-brand-sage">Dashboard</span>
            </h1>
            <p className="text-muted-foreground text-sm font-medium italic">Manage ministry dispatches, kingdom events, and community messages.</p>
          </motion.div>

          <div className="flex items-center gap-4">
            {activeTab === 'ministries' && (
              <Button
                variant="outline"
                onClick={repairAndSyncMinistries}
                disabled={loading && ministries.length === 0}
                className="flex items-center gap-2 h-12 px-6 rounded-2xl text-[10px] font-black uppercase tracking-widest border-brand-sage/20 text-brand-sage hover:bg-brand-sage/5 transition-all"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {loading ? <Loader2 size={14} className="animate-spin" /> : <Database size={14} />}
                Sync Records
              </Button>
            )}
            {activeTab === 'leaders' && (
              <Button
                variant="outline"
                onClick={repairAndSyncLeaders}
                disabled={loading && leaders.length === 0}
                className="flex items-center gap-2 h-12 px-6 rounded-2xl text-[10px] font-black uppercase tracking-widest border-brand-sage/20 text-brand-sage hover:bg-brand-sage/5 transition-all"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {loading ? <Loader2 size={14} className="animate-spin" /> : <Users size={14} />}
                Sync Records
              </Button>
            )}
            <Button
              variant="ghost"
              onClick={handleSignOut}
              className="flex items-center gap-2 h-12 px-6 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-red-500 hover:bg-red-50 border border-transparent hover:border-red-100 transition-all"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <LogOut size={14} /> Abort Session
            </Button>
          </div>
        </div>

        {/* Tab Navigator - Mission Style */}
        <div className="mb-12 overflow-x-auto no-scrollbar -mx-4 px-4">
          <div className="flex bg-slate-50/50 backdrop-blur-xl p-1.5 rounded-[2rem] border border-slate-100 min-w-max">
            {tabConfig.map((tab) => (
              <button
                key={tab.key}
                role="tab"
                aria-selected={activeTab === tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  "px-8 py-4 rounded-[1.5rem] text-[10px] font-bold uppercase tracking-[0.2em] transition-all flex items-center gap-3",
                  activeTab === tab.key
                    ? 'bg-white text-brand-sage shadow-xl shadow-slate-200/50 scale-[1.02]'
                    : 'text-muted-foreground/50 hover:text-brand-grey'
                )}
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Panel */}
        {activeTab !== 'messages' && (
          <div className="lg:col-span-4 lg:order-1 order-2">
            <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-2xl lg:sticky lg:top-44 overflow-hidden relative group">
              {/* Card Decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-sage/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000"></div>

              <div className="flex items-center justify-between mb-8 relative z-10">
                <h2 className="font-bold text-brand-grey flex items-center gap-3 uppercase tracking-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg transition-colors", editingId ? "bg-brand-sky text-white" : "bg-brand-sage text-white")}>
                    {editingId ? <Edit2 size={18} aria-hidden="true" /> : <Plus size={18} aria-hidden="true" />}
                  </div>
                  <div>
                    <span className="block text-[10px] text-brand-sage/60 tracking-[0.2em] font-bold">Input Protocol</span>
                    {editingId ? `Update ${activeTab.slice(0, -1)}` : `New ${activeTab.slice(0, -1)}`}
                  </div>
                </h2>
                {editingId && (
                  <Button variant="ghost" size="icon" onClick={cancelEdit} className="h-10 w-10 rounded-2xl bg-slate-50 border border-slate-100" aria-label="Cancel editing">
                    <X size={16} />
                  </Button>
                )}
              </div>

            {formError && (
              <div role="alert" className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl mb-4 text-xs">
                <AlertCircle size={14} className="shrink-0 mt-0.5" aria-hidden="true" />
                {formError}
              </div>
            )}

            {/* Sermons Form */}
            {activeTab === 'sermons' && (
              <form onSubmit={(e) => handleSubmit('sermons', e)} className="space-y-4" noValidate>
                <div className="space-y-1.5">
                  <Label htmlFor="s-title" className="text-xs font-medium">Title <span className="text-red-500">*</span></Label>
                  <Input id="s-title" required maxLength={200} value={sermonData.title} onChange={e => setSermonData({...sermonData, title: e.target.value})} className="h-10" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="s-date" className="text-xs font-medium">Date <span className="text-red-500">*</span></Label>
                    <Input id="s-date" required type="date" value={sermonData.date} onChange={e => setSermonData({...sermonData, date: e.target.value})} className="h-10" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="s-category" className="text-xs font-medium">Category</Label>
                    <Input id="s-category" maxLength={100} value={sermonData.category} onChange={e => setSermonData({...sermonData, category: e.target.value})} className="h-10" placeholder="Sunday" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="s-url" className="text-xs font-medium">Video URL (https://) <span className="text-red-500">*</span></Label>
                  <Input id="s-url" required type="url" placeholder="https://youtube.com/watch?v=" value={sermonData.videoUrl} onChange={e => setSermonData({...sermonData, videoUrl: e.target.value})} className="h-10" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="s-desc" className="text-xs font-medium">Description</Label>
                  <textarea id="s-desc" rows={3} maxLength={2000} value={sermonData.description} onChange={e => setSermonData({...sermonData, description: e.target.value})} className="w-full border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none" />
                </div>
                <Button type="submit" disabled={submitting} className={cn("w-full h-10 font-semibold rounded-xl", editingId && "bg-blue-500 hover:bg-blue-600")}>
                  {submitting ? <Loader2 size={16} className="animate-spin" aria-hidden="true" /> : (editingId ? 'Update' : 'Create')}
                </Button>
              </form>
            )}

            {/* Events Form */}
            {activeTab === 'events' && (
              <form onSubmit={(e) => handleSubmit('events', e)} className="space-y-4" noValidate>
                <div className="space-y-1.5">
                  <Label htmlFor="e-title" className="text-xs font-medium">Title <span className="text-red-500">*</span></Label>
                  <Input id="e-title" required maxLength={200} value={eventData.title} onChange={e => setEventData({...eventData, title: e.target.value})} className="h-10" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="e-date" className="text-xs font-medium">Date & Time <span className="text-red-500">*</span></Label>
                  <Input id="e-date" required type="datetime-local" value={eventData.date} onChange={e => setEventData({...eventData, date: e.target.value})} className="h-10" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="e-location" className="text-xs font-medium flex items-center gap-1">
                    <MapPin size={12} aria-hidden="true" /> Location <span className="text-red-500">*</span>
                  </Label>
                  <Input id="e-location" required maxLength={500} value={eventData.location} onChange={e => setEventData({...eventData, location: e.target.value})} className="h-10" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="e-desc" className="text-xs font-medium">Description</Label>
                  <textarea id="e-desc" rows={3} maxLength={2000} value={eventData.description} onChange={e => setEventData({...eventData, description: e.target.value})} className="w-full border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none" />
                </div>
                <Button type="submit" disabled={submitting} className={cn("w-full h-10 font-semibold rounded-xl", editingId && "bg-blue-500 hover:bg-blue-600")}>
                  {submitting ? <Loader2 size={16} className="animate-spin" aria-hidden="true" /> : (editingId ? 'Update' : 'Create')}
                </Button>
              </form>
            )}

            {/* Notifications Form */}
            {activeTab === 'notifications' && (
              <form onSubmit={(e) => handleSubmit('notifications', e)} className="space-y-4" noValidate>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
                  <div className="flex gap-3">
                    <Bell className="text-amber-600 shrink-0" size={18} />
                    <p className="text-[11px] text-amber-800 leading-relaxed font-medium">
                      Broadcast messages are sent to all users who have subscribed to notifications via the website or app.
                    </p>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="n-title" className="text-xs font-medium">Title <span className="text-red-500">*</span></Label>
                  <Input id="n-title" required placeholder="Service Starting Soon!" value={notificationData.title} onChange={e => setNotificationData({...notificationData, title: e.target.value})} className="h-10" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="n-body" className="text-xs font-medium">Message <span className="text-red-500">*</span></Label>
                  <textarea id="n-body" rows={4} maxLength={200} placeholder="Join us today at 10 AM for a powerful word..." value={notificationData.body} onChange={e => setNotificationData({...notificationData, body: e.target.value})} className="w-full border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
                <Button type="submit" disabled={submitting} className="w-full h-12 font-bold rounded-xl bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-200 flex items-center justify-center gap-2">
                  {submitting ? <Loader2 size={18} className="animate-spin" /> : <><Send size={18} /> Broadcast Now</>}
                </Button>
              </form>
            )}

            {/* Ministries Form */}
            {activeTab === 'ministries' && (
              <form onSubmit={(e) => handleSubmit('ministries', e)} className="space-y-4" noValidate>
                <div className="space-y-1.5">
                  <Label htmlFor="m-name" className="text-xs font-medium">Ministry Name <span className="text-red-500">*</span></Label>
                  <Input id="m-name" required value={ministryData.name} onChange={e => setMinistryData({...ministryData, name: e.target.value})} className="h-10" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="m-icon" className="text-xs font-medium">Icon</Label>
                    <select 
                      id="m-icon" 
                      className="w-full h-10 border border-border rounded-xl px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white"
                      value={ministryData.iconName}
                      onChange={e => setMinistryData({...ministryData, iconName: e.target.value})}
                    >
                      <option value="BookOpen">Learning (BookOpen)</option>
                      <option value="Users">Community (Users)</option>
                      <option value="Heart">Care (Heart)</option>
                      <option value="Music">Worship (Music)</option>
                      <option value="Shield">Protection (Shield)</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="m-order" className="text-xs font-medium">Display order</Label>
                    <Input id="m-order" type="number" value={ministryData.order} onChange={e => setMinistryData({...ministryData, order: parseInt(e.target.value) || 0})} className="h-10" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="m-style" className="text-xs font-medium">Theme Color</Label>
                  <div className="flex gap-2">
                    {[
                      { bg: 'bg-brand-sage', text: 'text-brand-sage', label: 'Sage' },
                      { bg: 'bg-brand-sky', text: 'text-brand-sky', label: 'Sky' },
                      { bg: 'bg-rose-500', text: 'text-rose-500', label: 'Rose' },
                      { bg: 'bg-brand-gold', text: 'text-brand-gold', label: 'Gold' },
                      { bg: 'bg-brand-grey', text: 'text-brand-grey', label: 'Grey' },
                    ].map(style => (
                      <button
                        key={style.bg}
                        type="button"
                        onClick={() => setMinistryData({...ministryData, color: style.bg, textColor: style.text})}
                        className={cn(
                          "w-8 h-8 rounded-full border-2 transition-all",
                          style.bg,
                          ministryData.color === style.bg ? "border-primary scale-110 shadow-md" : "border-white"
                        )}
                        title={style.label}
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="m-desc" className="text-xs font-medium">Description <span className="text-red-500">*</span></Label>
                  <textarea id="m-desc" rows={3} required value={ministryData.description} onChange={e => setMinistryData({...ministryData, description: e.target.value})} className="w-full border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Main Image <span className="text-red-500">*</span></Label>
                  <div className="flex items-center gap-3">
                    <Input value={ministryData.image} onChange={e => setMinistryData({...ministryData, image: e.target.value})} placeholder="/image.jpg" className="h-10 text-xs" />
                    <Label className="h-10 px-3 bg-slate-50 border border-dashed border-slate-300 rounded-xl flex items-center justify-center cursor-pointer hover:bg-slate-100 transition-colors shrink-0">
                      <ImageIcon size={16} className="text-slate-400" />
                      <input type="file" className="hidden" accept="image/*" onChange={e => handleFileUpload(e, 'ministries', (url) => setMinistryData({...ministryData, image: url}))} />
                    </Label>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Gallery Images</Label>
                  <div className="space-y-2">
                    {ministryData.gallery.map((img, idx) => (
                      <div key={idx} className="flex gap-2 items-center">
                        <Input value={img} onChange={e => {
                          const newGallery = [...ministryData.gallery];
                          newGallery[idx] = e.target.value;
                          setMinistryData({...ministryData, gallery: newGallery});
                        }} className="h-8 text-[10px] flex-1" placeholder="/gallery-image.jpg" />
                        <Label className="h-8 px-2 bg-slate-50 border border-dashed border-slate-300 rounded-lg flex items-center justify-center cursor-pointer hover:bg-slate-100 transition-colors shrink-0">
                          <ImageIcon size={14} className="text-slate-400" />
                          <input type="file" className="hidden" accept="image/*" onChange={e => handleFileUpload(e, 'ministries_gallery', (url) => {
                            const newGallery = [...ministryData.gallery];
                            newGallery[idx] = url;
                            setMinistryData({...ministryData, gallery: newGallery});
                          })} />
                        </Label>
                        <button type="button" onClick={() => setMinistryData({...ministryData, gallery: ministryData.gallery.filter((_, i) => i !== idx)})} className="text-red-400 hover:text-red-600"><Trash2 size={14}/></button>
                      </div>
                    ))}
                    <Button 
                      variant="ghost" 
                      type="button" 
                      size="sm" 
                      onClick={() => setMinistryData({...ministryData, gallery: [...ministryData.gallery, '']})}
                      className="h-8 text-[10px] w-full border border-dashed border-border"
                    >
                      <Plus size={12} className="mr-1" /> Add Image
                    </Button>
                  </div>
                </div>

                <Button type="submit" disabled={submitting} className={cn("w-full h-10 font-semibold rounded-xl", editingId && "bg-blue-500 hover:bg-blue-600")}>
                  {submitting ? <Loader2 size={16} className="animate-spin" /> : (editingId ? 'Update Ministry' : 'Create Ministry')}
                </Button>
              </form>
            )}

            {/* Leaders Form */}
            {activeTab === 'leaders' && (
              <form onSubmit={(e) => handleSubmit('leaders', e)} className="space-y-4" noValidate>
                <div className="space-y-1.5">
                  <Label htmlFor="l-name" className="text-xs font-medium">Full Name <span className="text-red-500">*</span></Label>
                  <Input id="l-name" required value={leaderData.name} onChange={e => setLeaderData({...leaderData, name: e.target.value})} className="h-10" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="l-role" className="text-xs font-medium">Role / Title <span className="text-red-500">*</span></Label>
                  <Input id="l-role" required value={leaderData.role} onChange={e => setLeaderData({...leaderData, role: e.target.value})} className="h-10" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="l-order" className="text-xs font-medium">Display order <span className="text-red-500">*</span></Label>
                  <Input id="l-order" type="number" value={leaderData.order} onChange={e => setLeaderData({...leaderData, order: parseInt(e.target.value) || 0})} className="h-10" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Profile Image <span className="text-red-500">*</span></Label>
                  <div className="flex items-center gap-3">
                    <Input value={leaderData.image} onChange={e => setLeaderData({...leaderData, image: e.target.value})} placeholder="/pastor.jpg" className="h-10 text-xs flex-1" />
                    <Label className="h-10 px-3 bg-slate-50 border border-dashed border-slate-300 rounded-xl flex items-center justify-center cursor-pointer hover:bg-slate-100 transition-colors shrink-0">
                      <ImageIcon size={16} className="text-slate-400" />
                      <input type="file" className="hidden" accept="image/*" onChange={e => handleFileUpload(e, 'leaders', (url) => setLeaderData({...leaderData, image: url}))} />
                    </Label>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="l-bio" className="text-xs font-medium">Biography <span className="text-red-500">*</span></Label>
                  <textarea id="l-bio" rows={4} required value={leaderData.bio} onChange={e => setLeaderData({...leaderData, bio: e.target.value})} className="w-full border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Key Responsibilities / Focus Areas</Label>
                  <div className="space-y-2">
                    {leaderData.responsibilities.map((req, idx) => (
                      <div key={idx} className="flex gap-2 items-center">
                        <Input value={req} onChange={e => {
                          const newReqs = [...leaderData.responsibilities];
                          newReqs[idx] = e.target.value;
                          setLeaderData({...leaderData, responsibilities: newReqs});
                        }} className="h-8 text-[11px] flex-1" placeholder="e.g. Oversight of Youth Ministry" />
                        <button type="button" onClick={() => setLeaderData({...leaderData, responsibilities: leaderData.responsibilities.filter((_, i) => i !== idx)})} className="text-red-400 hover:text-red-600"><Trash2 size={14}/></button>
                      </div>
                    ))}
                    <Button type="button" variant="outline" onClick={() => setLeaderData({...leaderData, responsibilities: [...leaderData.responsibilities, '']})} className="w-full h-8 text-[11px] border-dashed border-slate-300">
                      <PlusCircle size={14} className="mr-1" /> Add Responsibility
                    </Button>
                  </div>
                </div>
                <Button type="submit" disabled={submitting} className={cn("w-full h-10 font-semibold rounded-xl", editingId && "bg-blue-500 hover:bg-blue-600")}>
                  {submitting ? <Loader2 size={16} className="animate-spin" /> : (editingId ? 'Update Leader' : 'Create Leader')}
                </Button>
              </form>
            )}
          </div>
        </div>
        )}

        {/* Items List */}
        <div className={cn("lg:col-span-8 lg:order-2 order-1", activeTab === 'messages' && "lg:col-span-12")}>
          {loading ? (
            <div className="flex flex-col justify-center items-center h-48 bg-white border border-border rounded-2xl">
              <Loader2 className="animate-spin text-primary mb-3" size={28} aria-label="Loading" />
              <p className="text-sm text-muted-foreground">Loading…</p>
            </div>
          ) : (
            <div className="space-y-3">
              {activeTab === 'sermons' && sermons.map(sermon => (
                <ItemCard
                  key={sermon.id}
                  title={sermon.title}
                  subtitle={sermon.date}
                  badge={sermon.category}
                  onEdit={() => startEdit(sermon, 'sermons')}
                  onDelete={() => handleDelete(sermon.id!, 'sermons', sermon.title)}
                  isEditing={editingId === sermon.id}
                />
              ))}
              {activeTab === 'events' && events.map(event => (
                <ItemCard
                  key={event.id}
                  title={event.title}
                  subtitle={event.date}
                  badge={event.location}
                  onEdit={() => startEdit(event, 'events')}
                  onDelete={() => handleDelete(event.id!, 'events', event.title)}
                  isEditing={editingId === event.id}
                />
              ))}
              {activeTab === 'notifications' && notifications.map(n => (
                <div key={n.id} className="bg-white border border-border rounded-2xl p-4 flex gap-4 items-start shadow-sm hover:shadow-md transition-all">
                  <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                    <Bell size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-bold text-sm text-slate-800">{n.title}</h4>
                      <span className="text-[10px] text-slate-400 font-bold uppercase whitespace-nowrap">
                        {new Date(n.sentAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">{n.body}</p>
                  </div>
                </div>
              ))}
              {activeTab === 'ministries' && ministries.map(m => (
                <ItemCard
                  key={m.id}
                  title={m.name}
                  subtitle={m.description.slice(0, 60) + '...'}
                  badge={m.iconName}
                  onEdit={() => startEdit(m, 'ministries')}
                  onDelete={() => handleDelete(m.id!, 'ministries', m.name)}
                  isEditing={editingId === m.id}
                />
              ))}
              {activeTab === 'leaders' && leaders.map(l => (
                <ItemCard
                  key={l.id}
                  title={l.name}
                  subtitle={l.role}
                  onEdit={() => startEdit(l, 'leaders')}
                  onDelete={() => handleDelete(l.id!, 'leaders', l.name)}
                  isEditing={editingId === l.id}
                />
              ))}
              {activeTab === 'messages' && messages.map(msg => (
                <div key={msg.id} className={cn(
                  "bg-white border rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden",
                  !msg.read ? "border-brand-sage/30 bg-brand-sage/[0.02]" : "border-border"
                )}>
                  {!msg.read && (
                    <div className="absolute top-0 right-0 px-4 py-1.5 bg-brand-sage text-white text-[10px] font-black uppercase tracking-widest rounded-bl-2xl">
                      New Message
                    </div>
                  )}
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                          <Users size={24} />
                        </div>
                        <div>
                          <h4 className="font-black text-brand-grey tracking-tight">{msg.name}</h4>
                          <p className="text-xs text-brand-sage font-bold">{msg.email}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-full uppercase tracking-wider">Subject</span>
                          <span className="text-sm font-bold text-slate-700">{msg.subject || '(No Subject)'}</span>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100 italic">
                          "{msg.message}"
                        </p>
                      </div>

                      <div className="flex items-center gap-4 pt-2">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1">
                          <CalendarIcon size={12} /> {msg.createdAt?.toDate ? msg.createdAt.toDate().toLocaleString() : 'Just now'}
                        </span>
                      </div>
                    </div>

                    <div className="flex md:flex-col gap-2 shrink-0">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          const subject = encodeURIComponent(`RE: ${msg.subject || 'Inquiry'} - AIC Happy Valley`);
                          const replyBody = encodeURIComponent(
                            `Dear ${msg.name},\n\nThank you for reaching out to AIC Happy Valley regarding: "${msg.subject || 'your inquiry'}".\n\nYou mentioned: "${msg.message}"\n\n---\n[Write your reply here]\n\nGod bless,\nAIC Happy Valley Team`
                          );
                          const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${msg.email}&su=${subject}&body=${replyBody}`;
                          window.open(gmailUrl, 'composeWindow', 'width=800,height=600');
                        }}
                        className="flex items-center justify-center gap-2 h-12 px-6 bg-brand-sage text-white rounded-2xl font-bold text-[10px] uppercase tracking-widest shadow-lg shadow-brand-sage/20 hover:shadow-brand-sage/40 transition-all hover:-translate-y-0.5"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        <Send size={14} /> Dispatch Reply
                      </button>
                      {!msg.read && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            markMessageAsRead(msg.id);
                            fetchData();
                          }}
                          className="rounded-xl h-10 px-4 border-brand-sage/20 text-brand-sage font-bold text-xs gap-2 hover:bg-brand-sage/5"
                        >
                          <CheckCircle size={14} /> Mark as Read
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(msg.id, 'messages', `Message from ${msg.name}`)}
                        className="rounded-xl h-10 px-4 text-red-400 hover:text-red-500 hover:bg-red-50 font-bold text-xs gap-2"
                      >
                        <Trash2 size={14} /> Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              {activeTab === 'sermons' && sermons.length === 0 && <EmptyState label="sermons" />}
              {activeTab === 'events' && events.length === 0 && <EmptyState label="events" />}
              {activeTab === 'notifications' && notifications.length === 0 && <EmptyState label="broadcast message history" />}
              {activeTab === 'ministries' && ministries.length === 0 && <EmptyState label="ministries" />}
              {activeTab === 'leaders' && leaders.length === 0 && <EmptyState label="leaders" />}
              {activeTab === 'messages' && messages.length === 0 && <EmptyState label="messages" />}
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
  );
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const ItemCard = ({
  title, subtitle, badge, onEdit, onDelete, isEditing
}: {
  title: string;
  subtitle?: string;
  badge?: string;
  onEdit: () => void;
  onDelete: () => void;
  isEditing: boolean;
}) => (
  <div className={cn(
    "bg-white border rounded-[2rem] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 transition-all duration-500 relative overflow-hidden group",
    isEditing 
      ? "border-brand-sky shadow-2xl shadow-brand-sky/10 bg-brand-sky/[0.02]" 
      : "border-slate-100 hover:border-brand-sage/30 hover:shadow-xl hover:shadow-slate-200/50"
  )}>
    {/* Status Glow */}
    {isEditing && (
      <div className="absolute top-0 left-0 w-1 h-full bg-brand-sky"></div>
    )}

    <div className="min-w-0 flex-1 space-y-2">
      <div className="flex items-center gap-3 flex-wrap">
        <h3 className="font-bold text-brand-grey text-lg tracking-tight uppercase leading-none" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          {title}
        </h3>
        {badge && (
          <span className="px-3 py-1 bg-brand-sage/10 text-brand-sage text-[8px] font-black rounded-full uppercase tracking-widest border border-brand-sage/5">
            {badge}
          </span>
        )}
      </div>
      {subtitle && (
        <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-[0.2em] italic" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          {subtitle}
        </p>
      )}
    </div>

    <div className="flex items-center gap-3 shrink-0">
      <Button
        variant="ghost"
        size="icon"
        onClick={onEdit}
        aria-label={`Edit ${title}`}
        className={cn(
          "h-12 w-12 rounded-2xl transition-all duration-500",
          isEditing 
            ? "bg-brand-sky text-white shadow-lg shadow-brand-sky/20" 
            : "bg-slate-50 text-slate-400 hover:bg-brand-sky hover:text-white border border-slate-100"
        )}
      >
        <Edit2 size={16} />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={onDelete}
        aria-label={`Delete ${title}`}
        className="h-12 w-12 rounded-2xl bg-slate-50 text-slate-400 hover:bg-red-500 hover:text-white border border-slate-100 transition-all duration-500"
      >
        <Trash2 size={16} />
      </Button>
    </div>
  </div>
);

const EmptyState = ({ label }: { label: string }) => (
  <div className="text-center py-16 bg-white border border-dashed border-border rounded-2xl">
    <p className="text-muted-foreground font-medium">No {label} yet</p>
    <p className="text-xs text-muted-foreground mt-1">Use the form on the left to add your first {label.slice(0, -1)}.</p>
  </div>
);

export default Admin;
