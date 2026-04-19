import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Shield, Swords } from 'lucide-react';

export const BattleUI = () => {
  const { currentTurn, redEnergy, blackEnergy, triggerSkill } = useGameStore();

  const isRedTurn = currentTurn === 'red';

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6 z-10">
      {/* Top Header */}
      <div className="flex justify-between items-start w-full">
        <div className="bg-black/50 border border-cyan-500/30 p-4 rounded-xl backdrop-blur-md shadow-[0_0_15px_rgba(0,255,255,0.2)] pointer-events-auto">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-800 rounded-full border-2 border-cyan-500 overflow-hidden flex items-center justify-center relative">
              {/* Opponent Avatar placeholder */}
              <div className="text-cyan-500 text-xl font-bold">对手</div>
              {!isRedTurn && (
                <motion.div
                  className="absolute inset-0 border-4 border-cyan-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                />
              )}
            </div>
            <div>
              <h2 className="text-cyan-400 font-bold text-xl tracking-wider">天网 AI</h2>
              <div className="w-48 h-3 bg-gray-900 rounded-full mt-2 overflow-hidden border border-gray-700">
                <div className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 w-full" />
              </div>
              <div className="w-48 h-2 bg-gray-900 rounded-full mt-1 overflow-hidden border border-gray-700 relative">
                <motion.div
                  className="h-full bg-cyan-500"
                  initial={{ width: `${blackEnergy}%` }}
                  animate={{ width: `${blackEnergy}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-black/50 border border-yellow-500/30 px-6 py-2 rounded-full backdrop-blur-md pointer-events-auto">
          <span className="text-yellow-500 font-bold tracking-widest">
            {isRedTurn ? '红方回合' : '黑方回合'}
          </span>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="flex justify-between items-end">
        {/* Player Info */}
        <div className="bg-black/60 border-t-2 border-r-2 border-red-500/50 p-6 rounded-tr-3xl backdrop-blur-lg shadow-[5px_-5px_20px_rgba(255,0,0,0.15)] pointer-events-auto relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,0,0,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:250px_250px] animate-[gradient_3s_linear_infinite]" />
          
          <div className="flex items-end space-x-6 relative z-10">
            <div className="w-24 h-24 bg-gray-800 rounded-2xl border-2 border-red-500 overflow-hidden flex items-center justify-center relative shadow-[0_0_15px_rgba(255,0,0,0.4)]">
              {/* Protagonist Avatar placeholder */}
              <div className="text-red-500 text-2xl font-bold">无悔</div>
              {isRedTurn && (
                <motion.div
                  className="absolute inset-0 border-4 border-red-500 rounded-2xl"
                  animate={{ scale: [1, 1.1, 1], opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                />
              )}
            </div>
            <div className="pb-2">
              <h2 className="text-red-400 font-bold text-3xl tracking-wider uppercase drop-shadow-[0_0_5px_rgba(255,0,0,0.8)]">聂无悔</h2>
              <div className="flex items-center mt-3 space-x-2">
                <span className="text-gray-400 text-xs font-bold w-6">HP</span>
                <div className="w-64 h-4 bg-gray-900 rounded-sm overflow-hidden border border-gray-700 shadow-inner">
                  <div className="h-full bg-gradient-to-r from-red-600 to-red-400 w-[100%]" />
                </div>
              </div>
              <div className="flex items-center mt-2 space-x-2">
                <span className="text-cyan-400 text-xs font-bold w-6">SP</span>
                <div className="w-64 h-3 bg-gray-900 rounded-sm overflow-hidden border border-gray-700 relative shadow-inner">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.8)]"
                    initial={{ width: `${redEnergy}%` }}
                    animate={{ width: `${redEnergy}%` }}
                    transition={{ type: 'spring', bounce: 0.25 }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skill Controls */}
        <div className="pointer-events-auto flex space-x-6 items-end pb-4 pr-4">
          <SkillButton
            icon={<Shield size={24} />}
            name="固若金汤"
            cooldown={50}
            active={false}
            onClick={() => {}}
          />
          <SkillButton
            icon={<Swords size={24} />}
            name="伏龙抬头"
            cooldown={80}
            active={false}
            onClick={() => {}}
          />
          <div className="relative">
            <AnimatePresence>
              {redEnergy >= 100 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute -top-12 left-1/2 -translate-x-1/2 text-red-500 font-bold tracking-widest text-lg whitespace-nowrap drop-shadow-[0_0_10px_rgba(255,0,0,1)]"
                >
                  绝招就绪!
                </motion.div>
              )}
            </AnimatePresence>
            <button
              onClick={() => triggerSkill('red')}
              disabled={redEnergy < 100}
              className={`relative w-24 h-24 rounded-full border-4 flex flex-col items-center justify-center transition-all duration-300
                ${redEnergy >= 100 
                  ? 'bg-red-900/80 border-red-500 shadow-[0_0_30px_rgba(255,0,0,0.6)] hover:bg-red-800 hover:scale-110 cursor-pointer' 
                  : 'bg-gray-900/80 border-gray-700 text-gray-500 cursor-not-allowed grayscale'}`}
            >
              {redEnergy >= 100 && (
                <motion.div
                  className="absolute inset-0 rounded-full border-4 border-red-500"
                  animate={{ scale: [1, 1.3], opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                />
              )}
              <Zap size={32} className={redEnergy >= 100 ? 'text-yellow-400 drop-shadow-[0_0_8px_rgba(255,255,0,0.8)]' : ''} />
              <span className={`text-xs mt-1 font-bold ${redEnergy >= 100 ? 'text-white' : ''}`}>天地同寿</span>
              
              {redEnergy < 100 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full backdrop-blur-sm">
                  <span className="text-xl font-bold text-white drop-shadow-md">{redEnergy}%</span>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SkillButton = ({ icon, name, cooldown, active, onClick }: { icon: React.ReactNode, name: string, cooldown: number, active: boolean, onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      disabled={!active}
      className={`relative w-16 h-16 rounded-full border-2 flex flex-col items-center justify-center transition-all duration-300
        ${active 
          ? 'bg-blue-900/60 border-cyan-400 shadow-[0_0_15px_rgba(0,255,255,0.4)] hover:bg-blue-800 cursor-pointer text-cyan-300' 
          : 'bg-gray-900/80 border-gray-700 text-gray-500 cursor-not-allowed'}`}
    >
      {icon}
      <span className="text-[10px] mt-1 scale-75 whitespace-nowrap">{name}</span>
      {!active && (
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx="32"
            cy="32"
            r="30"
            fill="none"
            stroke="rgba(0,255,255,0.3)"
            strokeWidth="4"
            strokeDasharray="188.5"
            strokeDashoffset={188.5 * (1 - cooldown / 100)}
            className="transition-all duration-300"
          />
        </svg>
      )}
    </button>
  );
};
