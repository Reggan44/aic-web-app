import { useState, useEffect } from 'react';

/**
 * Hook to detect if the app is running as a standalone PWA.
 */
export const usePwaMode = () => {
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const checkStandalone = () => {
      const standalone = window.matchMedia('(display-mode: standalone)').matches || 
                         (window.navigator as any).standalone ||
                         document.referrer.includes('android-app://');
      
      setIsStandalone(standalone);
    };

    checkStandalone();
    
    // Listen for display mode changes (e.g. if user installs while app is open)
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    mediaQuery.addEventListener('change', checkStandalone);

    return () => mediaQuery.removeEventListener('change', checkStandalone);
  }, []);

  return isStandalone;
};
