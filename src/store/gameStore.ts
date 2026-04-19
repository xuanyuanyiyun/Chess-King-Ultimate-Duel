import { create } from 'zustand';
import { BoardState, getInitialBoard, getValidMoves, Piece, Side } from '../utils/chessLogic';

interface GameState {
  board: BoardState;
  currentTurn: Side;
  redEnergy: number;
  blackEnergy: number;
  selectedPos: { x: number; y: number } | null;
  validMoves: { x: number; y: number }[];
  selectPiece: (x: number, y: number) => void;
  movePiece: (toX: number, toY: number) => void;
  triggerSkill: (side: Side) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  board: getInitialBoard(),
  currentTurn: 'red',
  redEnergy: 0,
  blackEnergy: 0,
  selectedPos: null,
  validMoves: [],

  selectPiece: (x: number, y: number) => {
    const { board, currentTurn } = get();
    const piece = board[y][x];

    if (piece && piece.side === currentTurn) {
      const moves = getValidMoves(board, x, y);
      set({ selectedPos: { x, y }, validMoves: moves });
    } else {
      set({ selectedPos: null, validMoves: [] });
    }
  },

  movePiece: (toX: number, toY: number) => {
    const { board, selectedPos, currentTurn, validMoves, redEnergy, blackEnergy } = get();
    if (!selectedPos) return;

    // Check if move is valid
    const isValid = validMoves.some(m => m.x === toX && m.y === toY);
    if (!isValid) return;

    const newBoard = board.map(row => [...row]);
    const piece = newBoard[selectedPos.y][selectedPos.x];
    const targetPiece = newBoard[toY][toX];

    // Move
    newBoard[toY][toX] = piece;
    newBoard[selectedPos.y][selectedPos.x] = null;

    // Energy logic
    let newRedEnergy = redEnergy;
    let newBlackEnergy = blackEnergy;

    if (currentTurn === 'red') {
      newRedEnergy = Math.min(100, newRedEnergy + 10);
      if (targetPiece) newRedEnergy = Math.min(100, newRedEnergy + 20);
    } else {
      newBlackEnergy = Math.min(100, newBlackEnergy + 10);
      if (targetPiece) newBlackEnergy = Math.min(100, newBlackEnergy + 20);
    }

    set({
      board: newBoard,
      currentTurn: currentTurn === 'red' ? 'black' : 'red',
      selectedPos: null,
      validMoves: [],
      redEnergy: newRedEnergy,
      blackEnergy: newBlackEnergy,
    });
  },

  triggerSkill: (side: Side) => {
    const { redEnergy, blackEnergy } = get();
    if (side === 'red' && redEnergy >= 100) {
      // Trigger special effect (reset energy, add visual effect later)
      set({ redEnergy: 0 });
    } else if (side === 'black' && blackEnergy >= 100) {
      set({ blackEnergy: 0 });
    }
  },

  resetGame: () => {
    set({
      board: getInitialBoard(),
      currentTurn: 'red',
      redEnergy: 0,
      blackEnergy: 0,
      selectedPos: null,
      validMoves: [],
    });
  },
}));
