"use client";

import { useState, useEffect } from "react";

interface FocusTimerProps {
  onComplete: (minutes: number) => void;
  onTick?: () => void;
}

export default function FocusTimer({ onComplete, onTick }: FocusTimerProps) {
  const [time, setTime] = useState(10);
  const [initialTime, setInitialTime] = useState(10);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          return prevTime - 1;
        });
        if (onTick) onTick();
      }, 1000);
    } else if (time === 0 && isActive) {
      setIsActive(false);
      if (interval) clearInterval(interval);
      
      const durationMins = Math.max(1, Math.floor(initialTime / 60));
      onComplete(durationMins); 
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, time, initialTime, onComplete, onTick]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTime(10);
    setInitialTime(10);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="relative flex flex-col items-center justify-center space-y-8 p-8 bg-zinc-900/50 rounded-3xl border border-zinc-800 shadow-2xl backdrop-blur-sm overflow-hidden w-full max-w-md">
      
      {/* Timer Display */}
      <div className="relative group cursor-default">
        <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-orange-600 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative">
          <h1 className="text-8xl sm:text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400 font-mono tabular-nums select-none">
            {formatTime(time)}
          </h1>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleTimer}
          className={`
            px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95
            ${
              isActive
                ? "bg-zinc-800 text-red-500 hover:bg-zinc-700 border border-zinc-700"
                : "bg-red-600 text-white hover:bg-red-500 shadow-lg shadow-red-900/20"
            }
          `}
        >
          {isActive ? "DURAKLAT" : "ODAKLAN"}
        </button>

        <button
          onClick={resetTimer}
          className="p-4 rounded-xl bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white transition-all duration-300 border border-zinc-700 hover:border-zinc-600"
          aria-label="Reset Timer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
        </button>
      </div>

      <p className="text-zinc-500 text-sm font-medium tracking-widest uppercase">
        {isActive ? "Savaş Modu Aktif" : "Hazır mısın?"}
      </p>
    </div>
  );
}
