import { useState, useEffect, useCallback } from 'react';
import { CookingOption } from '@/data/eggMethods';

interface UseEggTimerProps {
  initialOption: CookingOption;
  soundEnabled: boolean;
}

interface UseEggTimerReturn {
  timeLeft: number;
  isRunning: boolean;
  isComplete: boolean;
  progress: number;
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
  updateOption: (option: CookingOption) => void;
}

export const useEggTimer = ({ initialOption, soundEnabled }: UseEggTimerProps): UseEggTimerReturn => {
  const [currentOption, setCurrentOption] = useState<CookingOption>(initialOption);
  const [timeLeft, setTimeLeft] = useState(initialOption.time * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Create audio context for notifications
  const playNotificationSound = useCallback(() => {
    if (!soundEnabled) return;
    
    try {
      const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioContext = new AudioContextClass();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.2);
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch (error) {
      console.log('Audio notification failed:', error);
    }
  }, [soundEnabled]);

  const startTimer = useCallback(() => {
    setTimeLeft(currentOption.time * 60);
    setIsRunning(true);
    setIsComplete(false);
  }, [currentOption.time]);

  const stopTimer = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(0);
    setIsComplete(false);
  }, []);

  const resetTimer = useCallback(() => {
    setTimeLeft(currentOption.time * 60);
    setIsRunning(false);
    setIsComplete(false);
  }, [currentOption.time]);

  const updateOption = useCallback((option: CookingOption) => {
    setCurrentOption(option);
    setTimeLeft(option.time * 60);
    setIsRunning(false);
    setIsComplete(false);
  }, []);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsComplete(true);
            playNotificationSound();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, playNotificationSound]);

  // Calculate progress percentage
  const progress = ((currentOption.time * 60 - timeLeft) / (currentOption.time * 60)) * 100;

  return {
    timeLeft,
    isRunning,
    isComplete,
    progress,
    startTimer,
    stopTimer,
    resetTimer,
    updateOption
  };
}; 