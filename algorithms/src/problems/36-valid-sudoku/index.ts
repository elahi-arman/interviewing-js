// Only the filled cells need to be validated according to the rules
const CENTERS: Array<[number, number]> = [
  [1, 1],
  [1, 4],
  [1, 7],
  [4, 1],
  [4, 4],
  [4, 7],
  [7, 1],
  [7, 4],
  [7, 7],
];
const numerals = "0123456789";
const BOARD_SIZE = 9;

const isValid = (n: string[]): boolean => {
  const s = new Set();
  for (const c of n) {
    if (!numerals.includes(c)) {
      continue;
    }

    if (s.has(c)) {
      return false;
    }

    s.add(c);
  }

  return true;
};

const getSubGrid = (
  board: string[][],
  center: [number, number],
  radius: number = 1
): Array<string> => {
  const cells = [];
  const [x, y] = center;

  const size = board.length;

  for (let i = x - radius; i <= x + radius; i++) {
    if (i < 0 || i >= size) {
      continue;
    }

    for (let j = y - radius; j <= y + radius; j++) {
      if (j < 0 || j >= size) {
        continue;
      }

      cells.push(board[i][j]);
    }
  }

  return cells;
};

export const isSudoku = (board: string[][]): boolean => {
  // check the board is structured properly
  if (board.length !== BOARD_SIZE) {
    console.error("board must have exactly 8 rows");
    return false;
  }

  for (const row of board) {
    if (row.length !== BOARD_SIZE) {
      console.error(`rows must have exactly 8 columns`);
      return false;
    }

    if (!isValid(row)) {
      return false;
    }
  }

  for (let i = 0; i < BOARD_SIZE; i++) {
    const column = board.map((row) => row[i]);
    if (!isValid(column)) {
      return false;
    }
  }

  for (const center of CENTERS) {
    if (!isValid(getSubGrid(board, center, 1))) {
      return false;
    }
  }

  return true;
};
