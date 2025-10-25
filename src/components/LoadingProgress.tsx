import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingProgressProps {
  message?: string;
  showProgress?: boolean;
}

// Loading indicator with progress for slow connections

export const LoadingProgress = ({ message, showProgress = true }: LoadingProgressProps) => {
  const [progress, setProgress] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    // Simulate progress (real implementation would track actual loading)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return prev;
        return prev + Math.random() * 10;
      });
      setTimeElapsed((prev) => prev + 1);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const estimatedTime = Math.max(0, Math.round((100 - progress) / 5));

  return (
    <div className="min-h-screen bg-brutalist-black text-brutalist-white flex items-center justify-center p-4">
      <div className="text-center max-w-md w-full">
        <Loader2 className="w-16 h-16 mx-auto mb-6 animate-spin" />

        <h2 className="text-3xl brutalist-title mb-2">UČITAVANJE...</h2>
        <p className="text-lg opacity-60 mb-6">Loading...</p>

        {showProgress && (
          <>
            {/* Progress bar */}
            <div className="w-full bg-brutalist-gray h-4 mb-4 border-2 border-brutalist-white">
              <div
                className="h-full bg-brutalist-yellow transition-all duration-300"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>

            {/* Progress text */}
            <p className="text-2xl brutalist-subtitle mb-2">
              {Math.round(progress)}%
            </p>

            {/* Estimated time */}
            {estimatedTime > 0 && (
              <p className="text-sm opacity-70">
                Preostalo ~ {estimatedTime}s • Remaining ~ {estimatedTime}s
              </p>
            )}

            {/* Slow connection warning */}
            {timeElapsed > 5 && progress < 50 && (
              <div className="mt-6 p-4 bg-brutalist-red text-brutalist-white border-2 border-brutalist-black">
                <p className="text-sm font-bold mb-1">
                  Spora veza • Slow Connection
                </p>
                <p className="text-xs opacity-80">
                  Vaša veza je spora. Aplikacija će raditi kada se učita.
                  <br />
                  Your connection is slow. The app will work once loaded.
                </p>
              </div>
            )}
          </>
        )}

        {message && (
          <p className="mt-4 text-sm opacity-70">{message}</p>
        )}
      </div>
    </div>
  );
};
