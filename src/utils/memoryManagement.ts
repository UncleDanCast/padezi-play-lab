// Memory management utilities for low-end devices

interface MemoryInfo {
  usedJSHeapSize?: number;
  jsHeapSizeLimit?: number;
  totalJSHeapSize?: number;
  usagePercentage: number;
  isHighUsage: boolean;
}

// Get current memory usage (Chrome only)
export const getMemoryInfo = (): MemoryInfo => {
  const performance = window.performance as any;

  if (performance.memory) {
    const { usedJSHeapSize, jsHeapSizeLimit, totalJSHeapSize } = performance.memory;
    const usagePercentage = (usedJSHeapSize / jsHeapSizeLimit) * 100;

    return {
      usedJSHeapSize,
      jsHeapSizeLimit,
      totalJSHeapSize,
      usagePercentage,
      isHighUsage: usagePercentage > 90,
    };
  }

  // Fallback if memory API not available
  return {
    usagePercentage: 0,
    isHighUsage: false,
  };
};

// Monitor memory and trigger cleanup if needed
export const startMemoryMonitoring = (
  onHighUsage?: () => void,
  interval: number = 30000 // Check every 30 seconds
): (() => void) => {
  const checkMemory = () => {
    const info = getMemoryInfo();

    if (info.isHighUsage) {
      console.warn('High memory usage detected:', info);
      onHighUsage?.();
    }
  };

  const intervalId = setInterval(checkMemory, interval);

  // Return cleanup function
  return () => clearInterval(intervalId);
};

// Force garbage collection (only in development)
export const forceGarbageCollection = () => {
  if (process.env.NODE_ENV === 'development' && (window as any).gc) {
    (window as any).gc();
    console.debug('Garbage collection triggered');
  }
};

// Cleanup unused resources
export const cleanupResources = () => {
  // Clear any cached data older than 1 hour
  try {
    const keys = Object.keys(localStorage);
    const now = Date.now();
    const oneHour = 60 * 60 * 1000;

    keys.forEach((key) => {
      if (key.includes('Timestamp')) {
        try {
          const timestamp = parseInt(localStorage.getItem(key) || '0');
          if (now - timestamp > oneHour) {
            localStorage.removeItem(key);
            console.debug(`Cleaned up old cache: ${key}`);
          }
        } catch {
          // Skip invalid entries
        }
      }
    });
  } catch (error) {
    console.debug('Cleanup failed:', error);
  }

  // Clear console to free memory
  if (console.clear && process.env.NODE_ENV !== 'development') {
    console.clear();
  }
};

// Get memory info as human-readable string
export const getMemoryInfoString = (): string => {
  const info = getMemoryInfo();

  if (!info.usedJSHeapSize) {
    return 'Memory info not available (non-Chrome browser)';
  }

  const usedMB = (info.usedJSHeapSize / (1024 * 1024)).toFixed(2);
  const limitMB = (info.jsHeapSizeLimit! / (1024 * 1024)).toFixed(2);

  return `Memory: ${usedMB}MB / ${limitMB}MB (${info.usagePercentage.toFixed(1)}%)`;
};
