"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

const eggMethods = {
  boiled: {
    name: "Boiled Egg",
    icon: "🥚",
    color: "bg-blue-500",
    options: [
      { name: "Soft Boiled", time: 6, description: "Runny yolk, firm white" },
      { name: "Medium Boiled", time: 8, description: "Slightly runny yolk" },
      { name: "Hard Boiled", time: 12, description: "Firm yolk and white" }
    ],
    tips: [
      "Use room temperature eggs for more consistent results",
      "Add a pinch of salt to the water to prevent cracking",
      "Start timing after the water comes to a rolling boil",
      "For easy peeling, cool eggs in ice water after cooking"
    ]
  },
  poached: {
    name: "Poached Egg",
    icon: "🍳",
    color: "bg-green-500",
    options: [
      { name: "Runny Yolk", time: 3, description: "Perfect for eggs benedict" },
      { name: "Firm Yolk", time: 4, description: "More set yolk" }
    ],
    tips: [
      "Use fresh eggs - they hold their shape better",
      "Add a splash of vinegar to help the egg white coagulate",
      "Create a gentle whirlpool in the water before adding the egg",
      "Use a slotted spoon to remove the egg from water"
    ]
  },
  fried: {
    name: "Fried Egg",
    icon: "🍳",
    color: "bg-yellow-500",
    options: [
      { name: "Sunny Side Up", time: 2, description: "Runny yolk, crispy edges" },
      { name: "Over Easy", time: 3, description: "Flipped once, runny yolk" },
      { name: "Over Medium", time: 4, description: "Flipped, semi-runny yolk" }
    ],
    tips: [
      "Use a non-stick pan or well-seasoned cast iron",
      "Heat the pan over medium heat before adding oil",
      "Crack the egg into a small bowl first, then slide into pan",
      "For over easy/medium, flip gently to avoid breaking the yolk"
    ]
  },
  scrambled: {
    name: "Scrambled Egg",
    icon: "🥚",
    color: "bg-orange-500",
    options: [
      { name: "Soft & Creamy", time: 3, description: "Moist and fluffy" },
      { name: "Firm", time: 5, description: "Well-cooked and dry" }
    ],
    tips: [
      "Whisk eggs with a splash of milk or cream for creamier texture",
      "Cook over low to medium heat for best results",
      "Stir constantly with a rubber spatula for even cooking",
      "Remove from heat just before fully cooked - eggs continue cooking"
    ]
  }
};

export default function TimerPage() {
  const params = useParams();
  const method = params.method as keyof typeof eggMethods;
  const [selectedOption, setSelectedOption] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const currentMethod = eggMethods[method];
  const currentOption = currentMethod?.options[selectedOption];

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
    if (!currentOption) return;
    setTimeLeft(currentOption.time * 60);
    setIsRunning(true);
    setIsComplete(false);
  }, [currentOption]);

  const stopTimer = () => {
    setIsRunning(false);
    setTimeLeft(0);
    setIsComplete(false);
  };

  const resetTimer = () => {
    if (!currentOption) return;
    setTimeLeft(currentOption.time * 60);
    setIsRunning(false);
    setIsComplete(false);
  };

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

  useEffect(() => {
    if (currentOption) {
      setTimeLeft(currentOption.time * 60);
      setIsRunning(false);
      setIsComplete(false);
    }
  }, [currentOption]);

  if (!currentMethod) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Method not found</h1>
          <Link href="/" className="text-blue-500 hover:underline">
            ← Back to home
          </Link>
        </div>
      </div>
    );
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = currentOption ? ((currentOption.time * 60 - timeLeft) / (currentOption.time * 60)) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <header className="text-center py-8">
          <Link href="/" className="inline-flex items-center text-blue-500 hover:text-blue-700 mb-4">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to methods
          </Link>
          <div className="flex items-center justify-center space-x-3 mb-2">
            <div className={`${currentMethod.color} text-white rounded-full w-12 h-12 flex items-center justify-center text-xl`}>
              {currentMethod.icon}
            </div>
            <h1 className="text-3xl font-bold text-gray-800">{currentMethod.name}</h1>
          </div>
        </header>

        {/* Timer Display */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="text-center">
            <div className="text-6xl font-mono font-bold text-gray-800 mb-4">
              {formatTime(timeLeft)}
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
              <div 
                className={`h-3 rounded-full transition-all duration-1000 ${
                  isComplete ? 'bg-green-500' : 'bg-blue-500'
                }`}
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            {/* Current Option Info */}
            {currentOption && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-1">
                  {currentOption.name}
                </h2>
                <p className="text-gray-600">{currentOption.description}</p>
              </div>
            )}

            {/* Timer Controls */}
            <div className="flex justify-center space-x-4 mb-4">
              {!isRunning && !isComplete && (
                <button
                  onClick={startTimer}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Start Timer
                </button>
              )}
              
              {isRunning && (
                <button
                  onClick={stopTimer}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Stop
                </button>
              )}
              
              {isComplete && (
                <button
                  onClick={resetTimer}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Sound Toggle */}
            <div className="flex items-center justify-center space-x-2">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`p-2 rounded-lg transition-colors ${
                  soundEnabled ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
                }`}
                title={soundEnabled ? 'Sound enabled' : 'Sound disabled'}
              >
                {soundEnabled ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.793L4.5 14H2a1 1 0 01-1-1V7a1 1 0 011-1h2.5l3.883-3.793a1 1 0 011.617.793zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.793L4.5 14H2a1 1 0 01-1-1V7a1 1 0 011-1h2.5l3.883-3.793a1 1 0 011.617.793zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
              <span className="text-sm text-gray-600">
                {soundEnabled ? 'Sound on' : 'Sound off'}
              </span>
            </div>

            {/* Completion Message */}
            {isComplete && (
              <div className="mt-6 p-4 bg-green-100 border border-green-300 rounded-lg animate-pulse">
                <p className="text-green-800 font-semibold text-lg">
                  🎉 Your {currentOption?.name.toLowerCase()} is ready!
                </p>
                <p className="text-green-700 text-sm mt-1">
                  Time to enjoy your perfectly cooked egg!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Cooking Options */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Cooking Options</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {currentMethod.options.map((option, index) => (
              <button
                key={index}
                onClick={() => setSelectedOption(index)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedOption === index
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-left">
                  <h4 className="font-semibold text-gray-800">{option.name}</h4>
                  <p className="text-sm text-gray-600">{option.description}</p>
                  <p className="text-blue-500 font-medium text-sm mt-1">
                    {option.time} minutes
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Cooking Tips */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Cooking Tips
          </h3>
          <div className="space-y-3">
            {currentMethod.tips.map((tip, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <p className="text-gray-700 text-sm">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 