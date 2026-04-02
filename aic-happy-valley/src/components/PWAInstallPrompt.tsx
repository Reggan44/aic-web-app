import { useState, useEffect } from 'react';
import { Download, X, Smartphone, Info } from 'lucide-react';

// Global trigger: other components can call window.triggerPWAInstall()
declare global {
  interface Window {
    triggerPWAInstall: () => void;
  }
}

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches || (navigator as any).standalone === true;

  useEffect(() => {
    if (isInStandaloneMode) {
      setIsInstalled(true);
      return;
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      console.log('✅ beforeinstallprompt fired');
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Register global trigger for the Navbar "Get App" button
    window.triggerPWAInstall = () => {
      if (isIOS) {
        setShowIOSGuide(true);
      } else if (deferredPrompt) {
        handleInstall();
      } else {
        // Browser supports it but prompt not ready yet — show banner
        setShowPrompt(true);
      }
    };

    // Auto-show banner after 10 seconds (first visit)
    const dismissed = localStorage.getItem('pwa-install-dismissed');
    if (!dismissed) {
      const timer = setTimeout(() => setShowPrompt(true), 10000);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      };
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, [deferredPrompt]);

  const handleInstall = async () => {
    if (isIOS) {
      setShowIOSGuide(true);
      setShowPrompt(false);
      return;
    }

    if (deferredPrompt) {
      try {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          setIsInstalled(true);
          setShowPrompt(false);
        }
        setDeferredPrompt(null);
      } catch (error) {
        console.error('PWA install error:', error);
      }
    } else {
      // Fallback — show instructions
      setShowIOSGuide(true);
      setShowPrompt(false);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa-install-dismissed', Date.now().toString());
  };

  if (isInstalled) return null;

  return (
    <>
      {/* Install banner */}
      {showPrompt && (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:w-96 bg-brand-darkGrey border border-brand-sage/30 rounded-2xl p-5 shadow-2xl z-50 animate-in slide-in-from-bottom-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-brand-sage rounded-xl flex items-center justify-center shrink-0">
              <Smartphone className="w-6 h-6 text-brand-darkGrey" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-black mb-1">Install AIC App</h3>
              <p className="text-white/60 text-sm mb-4 leading-relaxed">
                Get quick access to sermons, Bible, Daily Word and events — right from your home screen.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handleInstall}
                  className="flex items-center gap-2 px-4 py-2 bg-brand-sage text-brand-darkGrey font-bold rounded-xl hover:bg-brand-sage/80 transition-all text-sm"
                >
                  <Download size={16} />
                  Install App
                </button>
                <button
                  onClick={handleDismiss}
                  className="px-3 py-2 text-white/50 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* iOS Instructions Modal */}
      {showIOSGuide && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setShowIOSGuide(false)}
        >
          <div
            className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl mb-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-brand-sage/20 rounded-xl flex items-center justify-center">
                <Info className="text-brand-sage w-5 h-5" />
              </div>
              <h3 className="font-black text-brand-darkGrey text-lg">Install on iPhone / iPad</h3>
            </div>
            <ol className="space-y-4 text-brand-darkGrey/80 text-sm">
              <li className="flex gap-3">
                <span className="w-6 h-6 bg-brand-sage/20 text-brand-sage font-black rounded-full flex items-center justify-center shrink-0 text-xs">1</span>
                <span>Tap the <strong>Share</strong> button (the square with an arrow pointing up) at the bottom of your Safari browser.</span>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 bg-brand-sage/20 text-brand-sage font-black rounded-full flex items-center justify-center shrink-0 text-xs">2</span>
                <span>Scroll down and tap <strong>"Add to Home Screen"</strong>.</span>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 bg-brand-sage/20 text-brand-sage font-black rounded-full flex items-center justify-center shrink-0 text-xs">3</span>
                <span>Tap <strong>"Add"</strong> — the AIC app icon will appear on your home screen!</span>
              </li>
            </ol>
            <p className="mt-4 text-xs text-brand-darkGrey/40 italic">Works on iPhone and iPad using Safari browser.</p>
            <button
              onClick={() => setShowIOSGuide(false)}
              className="mt-6 w-full py-3 rounded-xl bg-brand-sage text-brand-darkGrey font-bold hover:bg-brand-sage/80 transition-all"
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PWAInstallPrompt;
