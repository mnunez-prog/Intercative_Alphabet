import React from 'react';
import type { Letter } from '../types';

interface LetterTileProps {
  letterData: Letter;
  onClick: (letterData: Letter) => void;
  isActive: boolean;
  gradientClass: string;
}

export const LetterTile: React.FC<LetterTileProps> = ({ letterData, onClick, isActive, gradientClass }) => {
  const { letter, word } = letterData;

  return (
    <button
      onClick={() => onClick(letterData)}
      aria-label={`Play sound for letter ${letter}, ${word}`}
      className={`
        aspect-square rounded-2xl text-white font-black text-4xl md:text-5xl 
        flex items-center justify-center
        transition-all duration-300 ease-out transform
        hover:scale-115 hover:shadow-2xl
        focus:outline-none focus:ring-4 focus:ring-white/50 focus:scale-115
        ${gradientClass}
        ${isActive ? 'scale-125 shadow-2xl ring-4 ring-white/50' : 'shadow-xl'}
      `}
    >
      {letter}
    </button>
  );
};