import React from 'react';
import { GameScene } from './components/3D/GameScene';
import { BattleUI } from './components/UI/BattleUI';

function App() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black font-sans selection:bg-cyan-500/30">
      <GameScene />
      <BattleUI />
    </div>
  );
}

export default App;
