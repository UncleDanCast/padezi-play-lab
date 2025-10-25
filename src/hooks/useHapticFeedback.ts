// Haptic feedback hook for mobile devices

export const useHapticFeedback = () => {
  const vibrate = (pattern: number | number[]) => {
    if ('vibrate' in navigator && window.matchMedia('(max-width: 1023px)').matches) {
      try {
        navigator.vibrate(pattern);
      } catch (error) {
        // Silently fail if vibration not supported
        console.debug('Vibration not supported:', error);
      }
    }
  };

  const success = () => vibrate([50, 100, 50]); // Success pattern
  const error = () => vibrate(200); // Error vibration
  const tap = () => vibrate(10); // Light tap feedback
  const warning = () => vibrate([100, 50, 100]); // Warning pattern

  return {
    vibrate,
    success,
    error,
    tap,
    warning,
  };
};
