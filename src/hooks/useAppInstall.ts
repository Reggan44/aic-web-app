import { useState, useEffect } from 'react';

export const useAppInstall = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [platform, setPlatform] = useState<'ios' | 'android' | 'other'>('other');
  const [showIOSPrompt, setShowIOSPrompt] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor || (window as any).opera;
    const isIOS = /iPad|iPhone|iPod/.test(ua) || 
                  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const isAndroid = /Android/i.test(ua);
    
    setPlatform(isIOS ? 'ios' : isAndroid ? 'android' : 'other');

    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallClick = async (onSuccess?: () => void) => {
    if (platform === 'ios' || new URLSearchParams(window.location.search).get('force-ios-guide') === 'true') {
      setShowIOSPrompt(true);
    } else if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted' && onSuccess) {
        onSuccess();
      }
      setDeferredPrompt(null);
    } else {
      alert("To install, use your browser's menu (three dots) and select 'Install App' or 'Add to Home Screen'.");
    }
  };

  return {
    platform,
    showIOSPrompt,
    setShowIOSPrompt,
    handleInstallClick,
    canInstall: !!deferredPrompt || platform === 'ios'
  };
};
