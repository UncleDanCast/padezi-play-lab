import { useEffect, useState } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { isBrowserSupported } from '@/utils/deviceDetection';

// Browser support warning for old browsers

export const BrowserSupport = () => {
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const supported = isBrowserSupported();
    setShowWarning(!supported);
  }, []);

  if (!showWarning) return null;

  return (
    <div className="fixed inset-0 bg-brutalist-black text-brutalist-white z-[200] flex items-center justify-center p-4">
      <div className="max-w-md bg-brutalist-white text-brutalist-black p-6 border-4 border-brutalist-red">
        <AlertTriangle className="w-16 h-16 mx-auto mb-4 text-brutalist-red" />

        <h1 className="text-2xl brutalist-subtitle mb-4 text-center">
          PREGLEDNIK NIJE PODRŽAN
        </h1>

        <p className="mb-2 font-bold">Browser Not Supported</p>

        <p className="mb-4 text-sm opacity-80">
          Vaš preglednik je previše star za ovu aplikaciju. Molimo ažurirajte na najnoviju verziju.
        </p>

        <p className="mb-6 text-xs opacity-60">
          Your browser is too old for this app. Please update to the latest version.
        </p>

        <div className="space-y-2 mb-6 text-sm">
          <p className="font-bold mb-2">Preporučeni preglednici / Recommended:</p>
          <ul className="list-disc list-inside space-y-1 opacity-80">
            <li>Google Chrome 70+ (2018)</li>
            <li>Mozilla Firefox 60+ (2018)</li>
            <li>Samsung Internet 9+ (2019)</li>
            <li>Microsoft Edge 79+ (2020)</li>
          </ul>
        </div>

        <a
          href="https://www.google.com/chrome/"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-brutalist-black text-brutalist-white py-3 px-4 text-center font-bold hover:bg-brutalist-gray transition-colors flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-5 h-5" />
          PREUZMI CHROME / DOWNLOAD CHROME
        </a>
      </div>
    </div>
  );
};
