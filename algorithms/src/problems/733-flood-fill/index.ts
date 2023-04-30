export type Grid = Array<Array<number>>;
export type Coordinate = [number, number];

const CoordinateSet = () => {
  const set = new Set<string>();
  const key = (row: number, col: number) => `(${row}, ${col})`;

  return {
    add: (row: number, col: number) => {
      return set.add(key(row, col));
    },
    has: (row: number, col: number) => {
      return set.has(key(row, col));
    },
  };
};

export function floodFill(
  image: number[][],
  sr: number,
  sc: number,
  color: number
): number[][] {
  const startingValue = image[sr][sc];
  const visited = CoordinateSet();
  const queue: Array<Coordinate> = [[sr, sc]];

  const rows = image.length;
  const cols = image[0].length;

  const validate = (row: number, col: number) => {
    const isInBound = row >= 0 && row < rows && col >= 0 && col < cols;
    return (
      isInBound &&
      !visited.has(row, col) &&
      image[row][col] === startingValue &&
      image[row][col] !== color
    );
  };

  const neighbors = (row: number, col: number): Array<Coordinate> => {
    return [
      [row - 1, col],
      [row + 1, col],
      [row, col - 1],
      [row, col + 1],
    ];
  };

  while (queue.length > 0) {
    const next = queue.shift();
    if (!next) {
      return image;
    }

    visited.add(...next);
    queue.push(...neighbors(...next).filter((c) => validate(c[0], c[1])));
    image[next[0]][next[1]] = color;
  }

  return image;
}
