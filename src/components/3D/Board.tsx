import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { Box, Plane } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export const Board = () => {
  const { validMoves, selectedPos } = useGameStore();

  const CELL_SIZE = 1;
  const BOARD_WIDTH = 9 * CELL_SIZE;
  const BOARD_HEIGHT = 10 * CELL_SIZE;

  // Render a 9x10 grid with holographic style
  return (
    <group position={[-BOARD_WIDTH / 2 + 0.5, 0, -BOARD_HEIGHT / 2 + 0.5]}>
      {/* Base Grid */}
      <Plane
        args={[BOARD_WIDTH, BOARD_HEIGHT, 9, 10]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[BOARD_WIDTH / 2 - 0.5, -0.1, BOARD_HEIGHT / 2 - 0.5]}
      >
        <meshStandardMaterial color="#0ff" wireframe transparent opacity={0.2} />
      </Plane>

      {/* River separator */}
      <Plane
        args={[BOARD_WIDTH, CELL_SIZE]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[BOARD_WIDTH / 2 - 0.5, -0.05, 4.5 * CELL_SIZE]}
      >
        <meshBasicMaterial color="#00f" transparent opacity={0.1} />
      </Plane>

      {/* Highlight valid moves */}
      {validMoves.map((move, idx) => (
        <Box
          key={`move-${idx}`}
          args={[0.8, 0.1, 0.8]}
          position={[move.x * CELL_SIZE, 0, move.y * CELL_SIZE]}
          onClick={(e) => {
            e.stopPropagation();
            useGameStore.getState().movePiece(move.x, move.y);
          }}
        >
          <meshStandardMaterial color="#0f0" transparent opacity={0.6} emissive="#0f0" emissiveIntensity={0.5} />
        </Box>
      ))}

      {/* Highlight selected cell */}
      {selectedPos && (
        <Box
          args={[0.9, 0.1, 0.9]}
          position={[selectedPos.x * CELL_SIZE, 0, selectedPos.y * CELL_SIZE]}
        >
          <meshStandardMaterial color="#f0f" transparent opacity={0.5} emissive="#f0f" emissiveIntensity={1} />
        </Box>
      )}

      {/* Empty cells for selection/movement interaction */}
      {Array(10).fill(null).map((_, y) =>
        Array(9).fill(null).map((_, x) => (
          <Plane
            key={`cell-${x}-${y}`}
            args={[1, 1]}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[x * CELL_SIZE, 0.05, y * CELL_SIZE]}
            onClick={(e) => {
              e.stopPropagation();
              const { validMoves, movePiece } = useGameStore.getState();
              const isValid = validMoves.some(m => m.x === x && m.y === y);
              if (isValid) {
                movePiece(x, y);
              }
            }}
            visible={false}
          >
            <meshBasicMaterial transparent opacity={0} />
          </Plane>
        ))
      )}
    </group>
  );
};
