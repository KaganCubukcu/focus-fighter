"use client";

import { motion, AnimatePresence } from "framer-motion";

interface MonsterProps {
  hp: number;
  maxHp: number;
  isHit: boolean;
}

export default function Monster({ hp, maxHp, isHit }: MonsterProps) {
  const hpPercentage = (hp / maxHp) * 100;

  return (
    <div className="relative flex flex-col items-center justify-center w-64 h-64">
      
      {/* HP Bar */}
      <div className="absolute -top-8 w-48 h-4 bg-zinc-800 rounded-full border border-zinc-700 overflow-hidden">
        <motion.div 
          className="h-full bg-red-600"
          initial={{ width: "100%" }}
          animate={{ width: `${hpPercentage}%` }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        />
      </div>

      {/* Monster Placeholder */}
      <motion.div
        animate={isHit ? { x: [0, -10, 10, -10, 10, 0] } : { y: [0, -10, 0] }}
        transition={isHit ? { duration: 0.4 } : { repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="w-52 h-52 flex items-center justify-center"
      >
        <div className={`w-40 h-40 rounded-xl shadow-[0_0_50px_rgba(168,85,247,0.6)] flex items-center justify-center text-7xl border-4 border-white/20 transition-colors duration-100 ${isHit ? "bg-red-600 scale-95" : "bg-purple-600"}`}>
          👾
        </div>
      </motion.div>

      {/* Damage Text Effect */}
      <AnimatePresence>
        {isHit && (
          <motion.div
            initial={{ opacity: 1, y: 0, scale: 0.5 }}
            animate={{ opacity: 0, y: -50, scale: 1.5 }}
            exit={{ opacity: 0 }}
            className="absolute text-4xl font-black text-red-500 drop-shadow-lg"
          >
            -10
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
