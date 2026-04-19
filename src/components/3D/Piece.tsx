import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Cylinder } from '@react-three/drei';
import { Piece as PieceType } from '../../utils/chessLogic';
import * as THREE from 'three';

interface PieceProps {
  piece: PieceType;
  x: number;
  y: number;
  isSelected: boolean;
  onClick: () => void;
}

const PIECE_LABELS: Record<string, string> = {
  'jiang': '将',
  'shi': '士',
  'xiang': '象',
  'ma': '马',
  'che': '车',
  'pao': '炮',
  'bing': '兵',
};

const RED_LABELS: Record<string, string> = {
  'jiang': '帅',
  'shi': '仕',
  'xiang': '相',
  'ma': '马',
  'che': '车',
  'pao': '炮',
  'bing': '兵',
};

export const Piece = ({ piece, x, y, isSelected, onClick }: PieceProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const CELL_SIZE = 1;
  const BOARD_WIDTH = 9 * CELL_SIZE;
  const BOARD_HEIGHT = 10 * CELL_SIZE;
  
  const posX = x * CELL_SIZE - BOARD_WIDTH / 2 + 0.5;
  const posZ = y * CELL_SIZE - BOARD_HEIGHT / 2 + 0.5;
  const posY = isSelected ? 0.5 : 0.2;

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Smooth transition
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, posX, 0.1);
    meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, posZ, 0.1);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, posY, 0.1);

    if (isSelected) {
      meshRef.current.rotation.y += 0.05;
    } else {
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, 0, 0.1);
    }
  });

  const isRed = piece.side === 'red';
  const color = isRed ? '#ff3333' : '#33ccff';
  const emissiveColor = isRed ? '#ff0000' : '#00ffff';
  const label = isRed ? RED_LABELS[piece.type] : PIECE_LABELS[piece.type];

  return (
    <group onClick={(e) => { e.stopPropagation(); onClick(); }}>
      <Cylinder
        ref={meshRef}
        args={[0.4, 0.4, 0.2, 32]}
        position={[posX, posY, posZ]}
      >
        <meshStandardMaterial
          color={color}
          emissive={emissiveColor}
          emissiveIntensity={isSelected ? 1.5 : 0.5}
          metalness={0.8}
          roughness={0.2}
        />
        
        {/* Inner ring */}
        <Cylinder args={[0.3, 0.3, 0.22, 32]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#111" metalness={0.9} roughness={0.1} />
        </Cylinder>

        {/* Text Label */}
        <Text
          position={[0, 0.12, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.4}
          color={color}
          anchorX="center"
          anchorY="middle"
        >
          {label}
        </Text>
      </Cylinder>
    </group>
  );
};
