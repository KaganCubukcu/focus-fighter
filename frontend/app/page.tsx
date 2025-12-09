"use client";

import { useState } from "react";
import FocusTimer from "@/components/FocusTimer";
import PlayerHUD from "@/components/PlayerHUD";
import Monster from "@/components/Monster";

export default function Home() {
  const [level, setLevel] = useState(1);
  const [currentXP, setCurrentXP] = useState(0);
  const [requiredXP, setRequiredXP] = useState(100);
  
  // Monster State
  const [monsterHp, setMonsterHp] = useState(100);
  const [isMonsterHit, setIsMonsterHit] = useState(false);

  const handleTick = () => {
    if (monsterHp > 0) {
      setMonsterHp((prev) => Math.max(0, prev - 10));
      setIsMonsterHit(true);
      setTimeout(() => setIsMonsterHit(false), 300);
    }
  };

  const handleSessionComplete = async (minutes: number) => {
    try {
      const envUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
      const API_BASE = envUrl.replace(/\/$/, '');

      const res = await fetch(`${API_BASE}/calculate-xp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ minutes }),
      });

      if (res.ok) {
        const data = await res.json();
        const earnedXP = data.xp_earned;
        
        let newXP = currentXP + earnedXP;
        let newLevel = level;
        let newRequired = requiredXP;

        while (newXP >= newRequired) {
          newXP -= newRequired;
          newLevel++;
          newRequired = newLevel * 100; 
        }

        setCurrentXP(newXP);
        setLevel(newLevel);
        setRequiredXP(newRequired);
        
        setMonsterHp(100);
      }
    } catch (error) {
      console.error("XP Calculation failed:", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white overflow-hidden relative selection:bg-red-500/30">
      
      <PlayerHUD level={level} currentXP={currentXP} requiredXP={requiredXP} />

      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-900/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[120px]"></div>
      </div>

      {/* Battle Arena */}
      <div className="z-10 flex flex-col items-center gap-12 w-full px-4">
        
        {/* Monster Area */}
        <div className="h-64 flex items-center justify-center">
          <Monster hp={monsterHp} maxHp={100} isHit={isMonsterHit} />
        </div>
        
        <FocusTimer onComplete={handleSessionComplete} onTick={handleTick} />
      </div>

      <footer className="mt-12 text-center text-zinc-600 text-sm max-w-md mx-auto pb-8">
        <p>Backend hosted on Render Free Tier.</p>
        <p>Initial XP calculation may take up to 50s to wake up.</p>
      </footer>
    </main>
  );
}
