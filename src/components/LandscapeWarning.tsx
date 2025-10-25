import { RotateCcw } from 'lucide-react';

// Landscape orientation warning for mobile devices

export const LandscapeWarning = () => {
  return (
    <div className="landscape-warning hidden fixed inset-0 bg-brutalist-black text-brutalist-white z-[100] items-center justify-center p-8">
      <div className="text-center max-w-md">
        <RotateCcw className="w-16 h-16 mx-auto mb-6 animate-spin" style={{ animationDuration: '3s' }} />

        <h2 className="text-3xl brutalist-subtitle mb-4">
          OKRENI UREĐAJ
        </h2>

        <p className="text-lg mb-2 opacity-80">
          Ova igra je optimizirana za portretni način rada
        </p>

        <p className="text-base opacity-60">
          This game is optimized for portrait mode
        </p>

        <div className="mt-8 border-2 border-brutalist-white inline-block p-4 transform rotate-90">
          <div className="w-16 h-24 border-4 border-brutalist-white rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};
