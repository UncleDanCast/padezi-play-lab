import { useState, useEffect } from 'react';

interface ConnectionStatus {
  isOnline: boolean;
  isSlow: boolean;
  effectiveType?: string;
}

// Connection-aware hook to adapt features based on network conditions

export const useConnectionStatus = (): ConnectionStatus => {
  const [status, setStatus] = useState<ConnectionStatus>({
    isOnline: navigator.onLine,
    isSlow: false,
    effectiveType: undefined,
  });

  useEffect(() => {
    const updateOnlineStatus = () => {
      setStatus((prev) => ({ ...prev, isOnline: navigator.onLine }));
    };

    const updateConnectionSpeed = () => {
      const connection = (navigator as any).connection ||
                        (navigator as any).mozConnection ||
                        (navigator as any).webkitConnection;

      if (connection) {
        const isSlow = connection.effectiveType === '2g' ||
                       connection.effectiveType === 'slow-2g';

        setStatus((prev) => ({
          ...prev,
          isSlow,
          effectiveType: connection.effectiveType,
        }));
      }
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    const connection = (navigator as any).connection ||
                      (navigator as any).mozConnection ||
                      (navigator as any).webkitConnection;

    if (connection) {
      connection.addEventListener('change', updateConnectionSpeed);
      updateConnectionSpeed();
    }

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);

      if (connection) {
        connection.removeEventListener('change', updateConnectionSpeed);
      }
    };
  }, []);

  return status;
};
