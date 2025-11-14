
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { LetterTile } from './components/LetterTile';
import { DisplayArea } from './components/DisplayArea';
import { Controls } from './components/Controls';
import { ALPHABET_DATA, TILE_GRADIENTS } from './constants';
import type { Letter } from './types';
import { useTTS } from './hooks/useTTS';

const App: React.FC = () => {
  const [activeLetter, setActiveLetter] = useState<Letter | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlayingAll, setIsPlayingAll] = useState(false);
  const [playAllIndex, setPlayAllIndex] = useState(0);

  const letterAudioRef = useRef<HTMLAudioElement | null>(null);
  const wordAudioRef = useRef<HTMLAudioElement | null>(null);
  const playIdRef = useRef(0);
  const isPlayingAllRef = useRef(isPlayingAll);

  const speak = useTTS();

  useEffect(() => {
    isPlayingAllRef.current = isPlayingAll;
  }, [isPlayingAll]);

  const stopAllAudio = useCallback(() => {
    if (letterAudioRef.current) {
      letterAudioRef.current.pause();
      letterAudioRef.current.currentTime = 0;
    }
    if (wordAudioRef.current) {
      wordAudioRef.current.pause();
      wordAudioRef.current.currentTime = 0;
    }
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, []);

  const playSound = useCallback((letterData: Letter, onComplete?: () => void) => {
    stopAllAudio();
    const currentPlayId = ++playIdRef.current;

    const playWordSound = () => {
      if (playIdRef.current !== currentPlayId) return;

      wordAudioRef.current = new Audio(letterData.wordSound);
      wordAudioRef.current.muted = isMuted;
      if (onComplete) {
        wordAudioRef.current.onended = onComplete;
      }
      wordAudioRef.current.play().catch(() => {
        if (playIdRef.current === currentPlayId) {
          if (!isMuted) {
            speak(letterData.word, { onend: onComplete });
          } else if (onComplete) {
            onComplete();
          }
        }
      });
    };

    const letterAudio = new Audio(letterData.letterSound);
    letterAudioRef.current = letterAudio;
    letterAudio.muted = isMuted;
    letterAudio.onended = playWordSound;

    letterAudio.play().catch(() => {
      if (playIdRef.current === currentPlayId) {
        if (!isMuted) {
          speak(letterData.letter, { onend: playWordSound });
        } else {
          playWordSound();
        }
      }
    });
  }, [stopAllAudio, speak, isMuted]);

  const handleLetterSelect = useCallback((letterData: Letter) => {
    if (isPlayingAll) {
      setIsPlayingAll(false);
      setPlayAllIndex(0);
    }
    setActiveLetter(letterData);
    playSound(letterData);
  }, [playSound, isPlayingAll]);

  const handleMuteToggle = useCallback(() => {
    setIsMuted(prev => !prev);
    if (!isMuted) { // If it's about to be muted
        stopAllAudio();
    }
  }, [isMuted, stopAllAudio]);

  const handlePlayAllToggle = useCallback(() => {
    stopAllAudio();
    if (isPlayingAll) {
      setIsPlayingAll(false);
      setPlayAllIndex(0);
      setActiveLetter(null);
    } else {
      setIsPlayingAll(true);
      setPlayAllIndex(0);
    }
  }, [isPlayingAll, stopAllAudio]);
  
  useEffect(() => {
    if (!isPlayingAll) return;

    if (playAllIndex >= ALPHABET_DATA.length) {
      setIsPlayingAll(false);
      setPlayAllIndex(0);
      setActiveLetter(null);
      return;
    }
    
    const letterData = ALPHABET_DATA[playAllIndex];
    setActiveLetter(letterData);
    
    const playNext = () => {
        setTimeout(() => {
            if (isPlayingAllRef.current) {
                setPlayAllIndex(i => i + 1);
            }
        }, 500);
    }
    playSound(letterData, playNext);
    
  }, [isPlayingAll, playAllIndex, playSound]);

  useEffect(() => {
    return () => stopAllAudio();
  }, [stopAllAudio]);


  return (
    <main className="container mx-auto p-4 md:p-8 font-sans">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-pink-500 to-purple-600">
          Interactive Alphabet
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 mt-2">Click a letter to learn!</p>
      </div>

      <div className="mb-8">
        <Controls
          isMuted={isMuted}
          onMuteToggle={handleMuteToggle}
          isPlayingAll={isPlayingAll}
          onPlayAllToggle={handlePlayAllToggle}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 order-2 lg:order-1">
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7 gap-3">
            {ALPHABET_DATA.map((letterData, index) => (
              <LetterTile
                key={letterData.letter}
                letterData={letterData}
                onClick={handleLetterSelect}
                isActive={activeLetter?.letter === letterData.letter}
                gradientClass={TILE_GRADIENTS[index]}
              />
            ))}
          </div>
        </div>
        
        <div className="lg:col-span-1 order-1 lg:order-2">
            <DisplayArea letterData={activeLetter} />
        </div>
      </div>
    </main>
  );
};

export default App;
