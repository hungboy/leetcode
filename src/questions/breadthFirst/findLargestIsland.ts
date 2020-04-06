const SAMPLE_INPUT = [
  [1, 1, 0, 0, 0],
  [1, 1, 0, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 0, 1, 1],
];

export const calculateIslandSize = (
  grid: number[][],
  rootRowIndex: number,
  rootColumnIndex: number
) => {
  const directions = [
    [-1, 0],
    [0, -1],
    [1, 0],
    [0, 1],
  ];
  let area = 0;
  const stack = [[rootRowIndex, rootColumnIndex]];
  const visitedMap = new Map();

  while (stack.length > 0) {
    const [rowIndex, columnIndex] = stack.pop();
    visitedMap.set([rowIndex, columnIndex], true);
    grid[rowIndex][columnIndex] = 0;

    for (let direction of directions) {
      const [dX, dY] = direction;
      const nextRowIndex = dX + rowIndex;
      const nextColumnIndex = dY + columnIndex;

      if (
        (grid[nextRowIndex] ?? [])[nextColumnIndex] === 1 &&
        !visitedMap.has([nextRowIndex, nextColumnIndex])
      ) {
        stack.push([nextRowIndex, nextColumnIndex]);
        area++;
      }
    }
  }

  return { grid, area };
};

const bfsCalculateIslandSize = (
  grid: number[][],
  rootRowIndex,
  rootColumnIndex
) => {
  let queue = [[rootRowIndex, rootColumnIndex]];
  let area = 0;

  const directions = [
    [-1, 0],
    [0, -1],
    [1, 0],
    [0, 1],
  ];

  while (queue.length > 0) {
    const [currentRowIndex, currentColumnIndex] = queue.shift();
    if (grid[currentRowIndex][currentColumnIndex] === 1) {
      area++;
    }
    grid[currentRowIndex][currentColumnIndex] = 0;

    for (let direction of directions) {
      const [dX, dY] = direction;
      const nextRowIndex = dX + currentRowIndex;
      const nextColumnIndex = dY + currentColumnIndex;

      if ((grid[nextRowIndex] ?? [])[nextColumnIndex] === 1) {
        queue.push([nextRowIndex, nextColumnIndex]);
      }
    }
  }

  return { grid, area };
};

const findLargestIsland = (input: number[][]) => {
  let rowIndex = 0;
  let largestArea = 0;

  for (let row of input) {
    let columnIndex = 0;
    for (let column of row) {
      if (input[rowIndex][columnIndex] === 1) {
        const { grid, area } = bfsCalculateIslandSize(
          input,
          rowIndex,
          columnIndex
        );
        input = grid;
        if (area > largestArea) {
          largestArea = area;
        }
      }
      columnIndex++;
    }
    rowIndex++;
  }

  return largestArea;
};

console.log(`Largest area is: ${findLargestIsland(SAMPLE_INPUT)}`);
