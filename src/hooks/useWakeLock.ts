import { useState, useEffect, useRef } from 'react';

// Wake Lock hook with NoSleep.js fallback for old browsers

export const useWakeLock = (enabled: boolean = true) => {
  const [wakeLock, setWakeLock] = useState<WakeLockSentinel | null>(null);
  const noSleepRef = useRef<any>(null);
  const [usingFallback, setUsingFallback] = useState(false);

  const requestWakeLock = async () => {
    // Try modern Wake Lock API first
    if ('wakeLock' in navigator) {
      try {
        const lock = await navigator.wakeLock.request('screen');
        setWakeLock(lock);

        lock.addEventListener('release', () => {
          console.debug('Wake Lock released');
        });

        console.debug('Using Wake Lock API');
        return;
      } catch (error) {
        console.debug('Wake Lock request failed:', error);
      }
    }

    // Fallback to NoSleep.js for old browsers
    try {
      const NoSleep = (await import('nosleep.js')).default;
      noSleepRef.current = new NoSleep();

      // NoSleep requires user interaction, so enable on next touch/click
      const enableNoSleep = () => {
        try {
          noSleepRef.current?.enable();
          setUsingFallback(true);
          console.debug('Using NoSleep.js fallback for old browser');
        } catch (err) {
          console.debug('NoSleep enable failed:', err);
        }
      };

      // Enable on first user interaction
      document.addEventListener('touchstart', enableNoSleep, { once: true });
      document.addEventListener('click', enableNoSleep, { once: true });
    } catch (error) {
      console.debug('NoSleep.js fallback failed:', error);
    }
  };

  const releaseWakeLock = async () => {
    // Release modern Wake Lock
    if (wakeLock) {
      try {
        await wakeLock.release();
        setWakeLock(null);
      } catch (error) {
        console.debug('Wake Lock release failed:', error);
      }
    }

    // Release NoSleep fallback
    if (noSleepRef.current && usingFallback) {
      try {
        noSleepRef.current.disable();
        setUsingFallback(false);
        console.debug('NoSleep.js disabled');
      } catch (error) {
        console.debug('NoSleep disable failed:', error);
      }
    }
  };

  useEffect(() => {
    if (enabled) {
      requestWakeLock();
    } else {
      releaseWakeLock();
    }

    return () => {
      releaseWakeLock();
    };
  }, [enabled]);

  return { wakeLock, releaseWakeLock, usingFallback };
};
