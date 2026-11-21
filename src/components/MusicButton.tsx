import React, { useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { musicPlayer } from '../utils/audio';

export const MusicButton: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleToggle = () => {
    const active = musicPlayer.toggle();
    setIsPlaying(active);
  };

  return (
    <button
      onClick={handleToggle}
      className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-3.5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all shadow-md backdrop-blur-md ${
        isPlaying
          ? 'bg-rose-500/90 text-white shadow-rose-300 ring-2 ring-rose-300/60 animate-pulse-slow'
          : 'bg-white/80 text-rose-700 hover:bg-white shadow-slate-200'
      }`}
      title={isPlaying ? "Pause music box" : "Play romantic music box"}
    >
      {isPlaying ? (
        <>
          <Volume2 className="w-4 h-4 animate-spin-slow" />
          <span className="hidden sm:inline">Playing Melody</span>
          <span className="flex gap-0.5 items-end h-3 ml-1">
            <span className="w-0.5 bg-white h-full animate-bounce"></span>
            <span className="w-0.5 bg-white h-2/3 animate-bounce" style={{ animationDelay: '0.15s' }}></span>
            <span className="w-0.5 bg-white h-4/5 animate-bounce" style={{ animationDelay: '0.3s' }}></span>
          </span>
        </>
      ) : (
        <>
          <Music className="w-4 h-4 text-rose-500" />
          <span>Play Melody</span>
          <VolumeX className="w-3.5 h-3.5 opacity-60 ml-0.5" />
        </>
      )}
    </button>
  );
};
