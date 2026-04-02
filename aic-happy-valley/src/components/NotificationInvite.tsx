import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, CheckCircle2, AlertTriangle } from 'lucide-react';
import { requestNotificationPermission } from '../services/notifications';

export const NotificationInvite = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [status, setStatus] = useState<'idle' | 'prompting' | 'success' | 'denied' | 'error'>('idle');
  const [currentPermission, setCurrentPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    if (typeof Notification === 'undefined') return;

    setCurrentPermission(Notification.permission);
    const dismissedUntil = localStorage.getItem('notification_prompt_dismissed_until');
    const isDismissed = dismissedUntil && new Date().getTime() < parseInt(dismissedUntil);

    // Show if permission is default OR denied (to help them fix it)
    if ((Notification.permission === 'default' || Notification.permission === 'denied') && !isDismissed) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 5000); // 5 seconds delay for better UX
      return () => clearTimeout(timer);
    }
  }, []);

  const handleRequest = async () => {
    if (Notification.permission === 'denied') {
       setStatus('denied');
       // Don't hide immediately to let them read the instruction
       setTimeout(() => setIsVisible(false), 8000);
       return;
    }

    setStatus('prompting');
    try {
      const result = await requestNotificationPermission();
      
      if (result === 'granted') {
        setStatus('success');
        setCurrentPermission('granted');
        setTimeout(() => setIsVisible(false), 3000);
      } else if (result === 'denied') {
        setStatus('denied');
        setCurrentPermission('denied');
        // Stay visible to show instructions
      } else {
        setStatus('error');
        // Hide after error message
        setTimeout(() => setIsVisible(false), 4000);
      }
    } catch (error) {
      console.error('Notification prompt failed:', error);
      setStatus('error');
      setTimeout(() => setIsVisible(false), 4000);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    const tomorrow = new Date().getTime() + 24 * 60 * 60 * 1000;
    localStorage.setItem('notification_prompt_dismissed_until', tomorrow.toString());
  };

  const getMessage = () => {
    if (status === 'success') return "You're all set for alerts!";
    if (status === 'denied' || currentPermission === 'denied') 
      return "Notifications are disabled. Click the padlock icon in your URL bar to allow alerts.";
    if (status === 'error') return "Something went wrong. Please check your connection.";
    return "Allow alerts for latest sermons & events.";
  };

  const getIcon = () => {
    if (status === 'success') return <CheckCircle2 size={24} className="text-emerald-500" />;
    if (status === 'denied' || currentPermission === 'denied') return <AlertTriangle size={24} className="text-amber-500" />;
    return <Bell size={24} className="text-brand-sage" />;
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          className="fixed bottom-6 right-6 z-[60] max-w-[calc(100vw-3rem)] sm:max-w-sm"
        >
          <div className="bg-white rounded-3xl p-5 shadow-2xl border border-brand-sage/10 flex items-center gap-4 relative overflow-hidden group">
            
            <div className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center ${
              status === 'success' ? 'bg-emerald-50' : 
              status === 'denied' || currentPermission === 'denied' ? 'bg-amber-50' : 'bg-brand-sage/10'
            }`}>
              {getIcon()}
            </div>

            <div className="flex-grow pr-6">
              <p className="text-brand-darkGrey font-black text-sm leading-tight mb-1">
                {status === 'success' ? 'Great News!' : status === 'denied' ? 'Attention' : 'Stay Rooted!'}
              </p>
              <p className={`text-[10px] font-medium leading-normal ${
                status === 'denied' || currentPermission === 'denied' ? 'text-amber-700' : 'text-brand-darkGrey/60'
              }`}>
                {getMessage()}
              </p>
            </div>

            <div className="flex gap-2">
              {status === 'idle' && currentPermission !== 'denied' && (
                <button
                  onClick={handleRequest}
                  className="px-4 py-2 bg-brand-sage text-brand-darkGrey font-black text-xs rounded-xl hover:bg-brand-sage/80 transition-all shadow-md active:scale-95 whitespace-nowrap"
                >
                  Enable
                </button>
              )}
            </div>

            <button
              onClick={handleDismiss}
              className="absolute top-3 right-3 text-brand-darkGrey/20 hover:text-brand-darkGrey/40 transition-colors p-1"
              aria-label="Dismiss"
            >
              <X size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
