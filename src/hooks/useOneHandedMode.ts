import { useState, useEffect } from 'react';

// One-handed mode hook for large phones

export const useOneHandedMode = () => {
  const [oneHandedMode, setOneHandedMode] = useState(() => {
    try {
      const saved = localStorage.getItem('oneHandedMode');
      return saved === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('oneHandedMode', oneHandedMode.toString());
    } catch {
      // Silently fail if localStorage unavailable
    }
  }, [oneHandedMode]);

  const toggleOneHandedMode = () => {
    setOneHandedMode(!oneHandedMode);
  };

  return {
    oneHandedMode,
    toggleOneHandedMode,
  };
};
