import { useState, useEffect } from 'react';
import { detectDeviceCapabilities } from '@/utils/deviceDetection';

// Hook to automatically detect and enable low-end mode

export const useLowEndMode = () => {
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);
  const [capabilities, setCapabilities] = useState(detectDeviceCapabilities());
  const [manualOverride, setManualOverride] = useState<boolean | null>(null);

  useEffect(() => {
    const caps = detectDeviceCapabilities();
    setCapabilities(caps);
    setIsLowEndDevice(caps.isLowEnd);

    // Log device info in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Device capabilities:', caps);
    }
  }, []);

  // Allow manual override
  const enableLowEndMode = () => setManualOverride(true);
  const disableLowEndMode = () => setManualOverride(false);
  const resetLowEndMode = () => setManualOverride(null);

  // Final determination
  const useLowEndMode = manualOverride !== null ? manualOverride : isLowEndDevice;

  return {
    isLowEndDevice: useLowEndMode,
    capabilities,
    manualOverride,
    enableLowEndMode,
    disableLowEndMode,
    resetLowEndMode,
  };
};
