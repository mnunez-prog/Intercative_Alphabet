
import { useCallback } from 'react';

type SpeechOptions = {
    onend?: () => void;
};

export const useTTS = () => {
  const speak = useCallback((text: string, options: SpeechOptions = {}) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      console.warn('Text-to-Speech not supported in this browser.');
      if (options.onend) {
        options.onend();
      }
      return;
    }

    // Cancel any ongoing speech to prevent overlap
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    
    if (options.onend) {
      utterance.onend = options.onend;
    }

    window.speechSynthesis.speak(utterance);
  }, []);

  return speak;
};
