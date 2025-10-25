// Device capability detection for old Android devices

export interface DeviceCapabilities {
  isLowEnd: boolean;
  memory?: number; // GB
  cores?: number;
  connectionType?: string;
  supportsWakeLock: boolean;
  supportsServiceWorker: boolean;
  browserVersion?: string;
}

export const detectDeviceCapabilities = (): DeviceCapabilities => {
  const nav = navigator as any;

  // Memory detection (Chrome only)
  const memory = nav.deviceMemory || undefined;

  // CPU cores
  const cores = nav.hardwareConcurrency || undefined;

  // Connection type
  const connection = nav.connection || nav.mozConnection || nav.webkitConnection;
  const connectionType = connection?.effectiveType || undefined;

  // Feature support
  const supportsWakeLock = 'wakeLock' in navigator;
  const supportsServiceWorker = 'serviceWorker' in navigator;

  // Browser version detection
  const userAgent = navigator.userAgent;
  let browserVersion: string | undefined;

  const chromeMatch = userAgent.match(/Chrome\/(\d+)/);
  if (chromeMatch) {
    browserVersion = `Chrome ${chromeMatch[1]}`;
  }

  // Determine if low-end device
  const isLowEnd = (
    (memory !== undefined && memory <= 2) ||
    (cores !== undefined && cores <= 4) ||
    connectionType === '2g' ||
    connectionType === 'slow-2g' ||
    (chromeMatch && parseInt(chromeMatch[1]) < 70) // Chrome < 70 (2018)
  );

  return {
    isLowEnd,
    memory,
    cores,
    connectionType,
    supportsWakeLock,
    supportsServiceWorker,
    browserVersion,
  };
};

// Check if browser is too old
export const isBrowserSupported = (): boolean => {
  // Minimum requirements
  const requirements = {
    serviceWorker: 'serviceWorker' in navigator,
    promise: typeof Promise !== 'undefined',
    fetch: typeof fetch !== 'undefined',
    localStorage: typeof localStorage !== 'undefined',
    arrayFrom: typeof Array.from !== 'undefined',
  };

  return Object.values(requirements).every(Boolean);
};

// Get readable device info for debugging
export const getDeviceInfo = (): string => {
  const caps = detectDeviceCapabilities();

  return `
Device Info:
- Type: ${caps.isLowEnd ? 'Low-end' : 'High-end'}
- Memory: ${caps.memory ? `${caps.memory}GB` : 'Unknown'}
- CPU Cores: ${caps.cores || 'Unknown'}
- Connection: ${caps.connectionType || 'Unknown'}
- Wake Lock: ${caps.supportsWakeLock ? 'Yes' : 'No'}
- Service Worker: ${caps.supportsServiceWorker ? 'Yes' : 'No'}
- Browser: ${caps.browserVersion || 'Unknown'}
  `.trim();
};
