import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X } from 'lucide-react';

// PWA Install Prompt Component

export const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    }

    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Don't show again for 7 days
    localStorage.setItem('installPromptDismissed', Date.now().toString());
  };

  // Check if previously dismissed
  useEffect(() => {
    const dismissed = localStorage.getItem('installPromptDismissed');
    if (dismissed) {
      const dismissedTime = parseInt(dismissed);
      const sevenDays = 7 * 24 * 60 * 60 * 1000;
      if (Date.now() - dismissedTime < sevenDays) {
        setShowPrompt(false);
      }
    }
  }, []);

  return (
    <AnimatePresence>
      {showPrompt && deferredPrompt && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:w-96"
        >
          <div className="bg-brutalist-white text-brutalist-black p-4 border-4 border-brutalist-black shadow-lg">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <Download className="w-5 h-5" />
                <h3 className="font-bold text-lg">Instaliraj Padeži</h3>
              </div>
              <button
                onClick={handleDismiss}
                className="text-brutalist-black hover:opacity-70 transition-opacity"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm mb-3 opacity-80">
              Dodaj aplikaciju na početni ekran za brži pristup i offline podršku.
            </p>
            <p className="text-xs mb-4 opacity-60">
              Add to home screen for faster access and offline support.
            </p>

            <div className="flex gap-2">
              <button
                onClick={handleInstall}
                className="flex-1 bg-brutalist-black text-brutalist-white py-2 px-4 font-bold hover:bg-brutalist-gray transition-colors"
              >
                INSTALIRAJ
              </button>
              <button
                onClick={handleDismiss}
                className="px-4 py-2 border-2 border-brutalist-black font-bold hover:bg-brutalist-gray transition-colors"
              >
                NE SADA
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
