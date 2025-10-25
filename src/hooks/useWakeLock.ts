import { useState, useEffect } from 'react';

// Wake Lock hook to prevent screen from sleeping during games

export const useWakeLock = (enabled: boolean = true) => {
  const [wakeLock, setWakeLock] = useState<WakeLockSentinel | null>(null);

  const requestWakeLock = async () => {
    if (!('wakeLock' in navigator)) {
      console.debug('Wake Lock API not supported');
      return;
    }

    try {
      const lock = await navigator.wakeLock.request('screen');
      setWakeLock(lock);

      lock.addEventListener('release', () => {
        console.debug('Wake Lock released');
      });
    } catch (error) {
      console.debug('Wake Lock request failed:', error);
    }
  };

  const releaseWakeLock = async () => {
    if (wakeLock) {
      try {
        await wakeLock.release();
        setWakeLock(null);
      } catch (error) {
        console.debug('Wake Lock release failed:', error);
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

  return { wakeLock, releaseWakeLock };
};
