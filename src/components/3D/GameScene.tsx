import React, { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Stars, PerspectiveCamera } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { Board } from './Board';
import { Piece } from './Piece';
import { useGameStore } from '../../store/gameStore';
import * as THREE from 'three';

export const GameScene = () => {
  const { board, selectedPos, selectPiece } = useGameStore();
  const chromaticOffset = useMemo(() => new THREE.Vector2(0.002, 0.002), []);

  return (
    <div className="w-full h-full bg-black">
      <Canvas shadows camera={{ position: [0, 8, 10], fov: 45 }}>
        <color attach="background" args={['#050510']} />
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 10, 5]} intensity={1} castShadow />
        <pointLight position={[0, 5, 0]} intensity={0.5} color="#0ff" />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <Suspense fallback={null}>
          <Board />
          {board.map((row, y) =>
            row.map((piece, x) =>
              piece ? (
                <Piece
                  key={piece.id}
                  piece={piece}
                  x={x}
                  y={y}
                  isSelected={selectedPos?.x === x && selectedPos?.y === y}
                  onClick={() => selectPiece(x, y)}
                />
              ) : null
            )
          )}
        </Suspense>

        <OrbitControls
          enablePan={false}
          maxPolarAngle={Math.PI / 2.2}
          minPolarAngle={Math.PI / 6}
          minDistance={5}
          maxDistance={15}
        />
        
        <EffectComposer>
          <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} intensity={1.5} />
          <ChromaticAberration offset={chromaticOffset} radialModulation={false} modulationOffset={0} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};
