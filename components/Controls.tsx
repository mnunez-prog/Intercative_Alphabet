import React from 'react';

interface ControlsProps {
  isMuted: boolean;
  onMuteToggle: () => void;
  isPlayingAll: boolean;
  onPlayAllToggle: () => void;
}

const MuteIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
    </svg>
);

const UnmuteIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M20 4a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
    </svg>
);

const PlayIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const StopIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
    </svg>
);


export const Controls: React.FC<ControlsProps> = ({ isMuted, onMuteToggle, isPlayingAll, onPlayAllToggle }) => {
  return (
    <div className="flex items-center justify-center space-x-4">
      <button
        onClick={onMuteToggle}
        aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
        className="flex items-center space-x-3 px-6 py-3 rounded-full font-bold bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 shadow-lg hover:bg-slate-50 dark:hover:bg-slate-600 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
      >
        {isMuted ? <MuteIcon className="h-6 w-6" /> : <UnmuteIcon className="h-6 w-6" />}
        <span className="hidden sm:inline text-lg">{isMuted ? 'Unmute' : 'Mute'}</span>
      </button>

      <button
        onClick={onPlayAllToggle}
        aria-label={isPlayingAll ? 'Stop playing all letters' : 'Play all letters'}
        className="flex items-center space-x-3 px-6 py-3 rounded-full font-bold text-white shadow-lg transition-all transform hover:scale-105 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
      >
        {isPlayingAll ? <StopIcon className="h-6 w-6" /> : <PlayIcon className="h-6 w-6" />}
        <span className="hidden sm:inline text-lg">{isPlayingAll ? 'Stop' : 'Play All'}</span>
      </button>
    </div>
  );
};
