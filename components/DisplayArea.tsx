import React from 'react';
import type { Letter } from '../types';

interface DisplayAreaProps {
  letterData: Letter | null;
}

export const DisplayArea: React.FC<DisplayAreaProps> = ({ letterData }) => {
  return (
    <div 
      className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm p-4 rounded-2xl shadow-xl h-full sticky top-8"
      aria-live="polite"
      aria-atomic="true"
    >
      {letterData ? (
        <figure className="flex flex-col items-center justify-center h-full">
          <img
            key={letterData.image} // Force re-render on image change
            src={letterData.image}
            alt={`Illustration of ${letterData.word}`}
            loading="lazy"
            className="w-full h-auto object-cover rounded-lg aspect-video max-h-[300px] lg:max-h-none"
          />
          <figcaption className="mt-4 text-3xl font-bold text-center capitalize text-slate-700 dark:text-slate-300">
            {letterData.word}
          </figcaption>
        </figure>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-center text-slate-500 dark:text-slate-400 min-h-[300px] lg:min-h-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mb-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a.5.5 0 01.708 0 4 4 0 01-5.656 0 .5.5 0 01.708-.707 3 3 0 004.24 0 .5.5 0 01.708.707z" clipRule="evenodd" />
            </svg>
            <h2 className="text-3xl font-bold">Hello!</h2>
            <p className="mt-2 text-lg">Pick a letter to start the fun!</p>
        </div>
      )}
    </div>
  );
};