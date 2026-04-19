export type Side = 'red' | 'black';
export type PieceType = 'jiang' | 'shi' | 'xiang' | 'ma' | 'che' | 'pao' | 'bing';

export interface Piece {
  id: string;
  type: PieceType;
  side: Side;
}

export type BoardState = (Piece | null)[][];

const createPiece = (type: PieceType, side: Side): Piece => ({
  id: `${side}-${type}-${Math.random().toString(36).substring(7)}`,
  type,
  side,
});

export const getInitialBoard = (): BoardState => {
  const board: BoardState = Array(10).fill(null).map(() => Array(9).fill(null));

  // Black pieces (top, y = 0-3)
  board[0][0] = createPiece('che', 'black');
  board[0][1] = createPiece('ma', 'black');
  board[0][2] = createPiece('xiang', 'black');
  board[0][3] = createPiece('shi', 'black');
  board[0][4] = createPiece('jiang', 'black');
  board[0][5] = createPiece('shi', 'black');
  board[0][6] = createPiece('xiang', 'black');
  board[0][7] = createPiece('ma', 'black');
  board[0][8] = createPiece('che', 'black');

  board[2][1] = createPiece('pao', 'black');
  board[2][7] = createPiece('pao', 'black');

  board[3][0] = createPiece('bing', 'black');
  board[3][2] = createPiece('bing', 'black');
  board[3][4] = createPiece('bing', 'black');
  board[3][6] = createPiece('bing', 'black');
  board[3][8] = createPiece('bing', 'black');

  // Red pieces (bottom, y = 6-9)
  board[9][0] = createPiece('che', 'red');
  board[9][1] = createPiece('ma', 'red');
  board[9][2] = createPiece('xiang', 'red');
  board[9][3] = createPiece('shi', 'red');
  board[9][4] = createPiece('jiang', 'red');
  board[9][5] = createPiece('shi', 'red');
  board[9][6] = createPiece('xiang', 'red');
  board[9][7] = createPiece('ma', 'red');
  board[9][8] = createPiece('che', 'red');

  board[7][1] = createPiece('pao', 'red');
  board[7][7] = createPiece('pao', 'red');

  board[6][0] = createPiece('bing', 'red');
  board[6][2] = createPiece('bing', 'red');
  board[6][4] = createPiece('bing', 'red');
  board[6][6] = createPiece('bing', 'red');
  board[6][8] = createPiece('bing', 'red');

  return board;
};

// Valid move logic
export const getValidMoves = (board: BoardState, x: number, y: number): { x: number; y: number }[] => {
  const piece = board[y][x];
  if (!piece) return [];

  const moves: { x: number; y: number }[] = [];
  const side = piece.side;

  const addMove = (nx: number, ny: number) => {
    if (nx >= 0 && nx < 9 && ny >= 0 && ny < 10) {
      const target = board[ny][nx];
      if (!target || target.side !== side) {
        moves.push({ x: nx, y: ny });
      }
    }
  };

  if (piece.type === 'che') {
    // Up
    for (let i = y - 1; i >= 0; i--) {
      addMove(x, i);
      if (board[i][x]) break;
    }
    // Down
    for (let i = y + 1; i < 10; i++) {
      addMove(x, i);
      if (board[i][x]) break;
    }
    // Left
    for (let i = x - 1; i >= 0; i--) {
      addMove(i, y);
      if (board[y][i]) break;
    }
    // Right
    for (let i = x + 1; i < 9; i++) {
      addMove(i, y);
      if (board[y][i]) break;
    }
  }

  // Basic move rules for a demo. Real rules (like Ma blocking) can be fully implemented or simplified.
  if (piece.type === 'ma') {
    const directions = [
      { dx: 1, dy: -2, blockX: 0, blockY: -1 },
      { dx: 2, dy: -1, blockX: 1, blockY: 0 },
      { dx: 2, dy: 1, blockX: 1, blockY: 0 },
      { dx: 1, dy: 2, blockX: 0, blockY: 1 },
      { dx: -1, dy: 2, blockX: 0, blockY: 1 },
      { dx: -2, dy: 1, blockX: -1, blockY: 0 },
      { dx: -2, dy: -1, blockX: -1, blockY: 0 },
      { dx: -1, dy: -2, blockX: 0, blockY: -1 },
    ];
    directions.forEach(({ dx, dy, blockX, blockY }) => {
      const bx = x + blockX;
      const by = y + blockY;
      if (bx >= 0 && bx < 9 && by >= 0 && by < 10 && !board[by][bx]) {
        addMove(x + dx, y + dy);
      }
    });
  }

  if (piece.type === 'xiang') {
    const directions = [
      { dx: 2, dy: -2, blockX: 1, blockY: -1 },
      { dx: 2, dy: 2, blockX: 1, blockY: 1 },
      { dx: -2, dy: 2, blockX: -1, blockY: 1 },
      { dx: -2, dy: -2, blockX: -1, blockY: -1 },
    ];
    directions.forEach(({ dx, dy, blockX, blockY }) => {
      const bx = x + blockX;
      const by = y + blockY;
      const nx = x + dx;
      const ny = y + dy;
      // Xiang cannot cross river
      if (side === 'red' && ny < 5) return;
      if (side === 'black' && ny > 4) return;
      
      if (bx >= 0 && bx < 9 && by >= 0 && by < 10 && !board[by][bx]) {
        addMove(nx, ny);
      }
    });
  }

  if (piece.type === 'shi') {
    const directions = [
      { dx: 1, dy: 1 }, { dx: 1, dy: -1 }, { dx: -1, dy: 1 }, { dx: -1, dy: -1 }
    ];
    directions.forEach(({ dx, dy }) => {
      const nx = x + dx;
      const ny = y + dy;
      if (nx >= 3 && nx <= 5) {
        if (side === 'red' && ny >= 7 && ny <= 9) addMove(nx, ny);
        if (side === 'black' && ny >= 0 && ny <= 2) addMove(nx, ny);
      }
    });
  }

  if (piece.type === 'jiang') {
    const directions = [
      { dx: 0, dy: 1 }, { dx: 0, dy: -1 }, { dx: 1, dy: 0 }, { dx: -1, dy: 0 }
    ];
    directions.forEach(({ dx, dy }) => {
      const nx = x + dx;
      const ny = y + dy;
      if (nx >= 3 && nx <= 5) {
        if (side === 'red' && ny >= 7 && ny <= 9) addMove(nx, ny);
        if (side === 'black' && ny >= 0 && ny <= 2) addMove(nx, ny);
      }
    });
    // Flying general
    // (Simplified logic: we can skip for demo or just add basic move)
  }

  if (piece.type === 'bing') {
    if (side === 'red') {
      addMove(x, y - 1); // Move forward
      if (y < 5) { // Crossed river
        addMove(x - 1, y);
        addMove(x + 1, y);
      }
    } else {
      addMove(x, y + 1); // Move forward
      if (y > 4) { // Crossed river
        addMove(x - 1, y);
        addMove(x + 1, y);
      }
    }
  }

  if (piece.type === 'pao') {
    // Up
    let foundPiece = false;
    for (let i = y - 1; i >= 0; i--) {
      if (!foundPiece) {
        if (board[i][x]) {
          foundPiece = true;
        } else {
          addMove(x, i);
        }
      } else {
        if (board[i][x]) {
          if (board[i][x]?.side !== side) addMove(x, i);
          break;
        }
      }
    }
    // Down
    foundPiece = false;
    for (let i = y + 1; i < 10; i++) {
      if (!foundPiece) {
        if (board[i][x]) {
          foundPiece = true;
        } else {
          addMove(x, i);
        }
      } else {
        if (board[i][x]) {
          if (board[i][x]?.side !== side) addMove(x, i);
          break;
        }
      }
    }
    // Left
    foundPiece = false;
    for (let i = x - 1; i >= 0; i--) {
      if (!foundPiece) {
        if (board[y][i]) {
          foundPiece = true;
        } else {
          addMove(i, y);
        }
      } else {
        if (board[y][i]) {
          if (board[y][i]?.side !== side) addMove(i, y);
          break;
        }
      }
    }
    // Right
    foundPiece = false;
    for (let i = x + 1; i < 9; i++) {
      if (!foundPiece) {
        if (board[y][i]) {
          foundPiece = true;
        } else {
          addMove(i, y);
        }
      } else {
        if (board[y][i]) {
          if (board[y][i]?.side !== side) addMove(i, y);
          break;
        }
      }
    }
  }

  return moves;
};
