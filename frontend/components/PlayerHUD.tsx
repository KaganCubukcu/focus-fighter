"use client";

interface PlayerHUDProps {
  level: number;
  currentXP: number;
  requiredXP: number;
}

export default function PlayerHUD({ level, currentXP, requiredXP }: PlayerHUDProps) {
  const progressPercentage = Math.min(100, (currentXP / requiredXP) * 100);

  return (
    <div className="fixed top-0 left-0 w-full p-6 z-50 pointer-events-none">
      <div className="max-w-4xl mx-auto flex items-center gap-4">
        
        {/* Level Badge */}
        <div className="relative">
          <div className="w-16 h-16 bg-zinc-900 rounded-xl border-2 border-yellow-600 flex items-center justify-center shadow-[0_0_15px_rgba(202,138,4,0.3)] transform rotate-3">
            <span className="text-2xl font-black text-white transform -rotate-3">
              {level}
            </span>
          </div>
          <div className="absolute -bottom-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md transform rotate-3">
            LVL
          </div>
        </div>

        {/* XP Bar Container */}
        <div className="flex-1 flex flex-col gap-1">
          <div className="flex justify-between text-xs font-bold tracking-widest uppercase text-zinc-400">
            <span>Experience</span>
            <span>{currentXP} / {requiredXP} XP</span>
          </div>
          
          <div className="h-4 bg-zinc-900/80 rounded-full border border-zinc-800 overflow-hidden backdrop-blur-sm">
            <div 
              className="h-full bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-300 transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(234,179,8,0.5)]"
              style={{ width: `${progressPercentage}%` }}
            >
              <div className="w-full h-full opacity-30 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')]"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
