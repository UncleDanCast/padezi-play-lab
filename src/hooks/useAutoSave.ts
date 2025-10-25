import { useEffect } from 'react';

interface GameState {
  score: number;
  currentIndex: number;
  timeLeft: number;
  timestamp: number;
}

// Auto-save game progress for mobile interruptions (phone calls, app switching)

export const useAutoSave = (
  storageKey: string,
  score: number,
  currentIndex: number,
  timeLeft: number,
  enabled: boolean = true
) => {
  // Save state
  useEffect(() => {
    if (enabled) {
      try {
        const state: GameState = {
          score,
          currentIndex,
          timeLeft,
          timestamp: Date.now(),
        };
        localStorage.setItem(storageKey, JSON.stringify(state));
      } catch (error) {
        console.debug('Failed to save game state:', error);
      }
    }
  }, [storageKey, score, currentIndex, timeLeft, enabled]);

  // Load saved state
  const loadSavedState = (): GameState | null => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const state: GameState = JSON.parse(saved);
        // Check if less than 5 minutes old
        if (Date.now() - state.timestamp < 300000) {
          return state;
        }
      }
    } catch (error) {
      console.debug('Failed to load game state:', error);
    }
    return null;
  };

  // Clear saved state
  const clearSavedState = () => {
    try {
      localStorage.removeItem(storageKey);
    } catch (error) {
      console.debug('Failed to clear game state:', error);
    }
  };

  return { loadSavedState, clearSavedState };
};
