const SAMPLE_INPUT = [
  [1, 1, 0, 0, 0],
  [1, 1, 0, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 0, 1, 1],
];
const calculateNumberOfIslands = (input = SAMPLE_INPUT) => {
  let rowIndex = 0;
  let islandCount = 0;

  for (let row of input) {
    let columnIndex = 0;

    for (let point of row) {
      if (point === 1) {
        input = convertIslandToWater(input, rowIndex, columnIndex);

        islandCount++;
      }
      columnIndex++;
    }
    rowIndex++;
  }

  return islandCount;
};

const convertIslandToWater = (grid: number[][], rowIndex, columnIndex) => {
  const directions = [
    [-1, 0],
    [0, -1],
    [1, 0],
    [0, 1],
  ];
  let stack = [[rowIndex, columnIndex]];

  while (stack.length > 0) {
    const [currentRowIndex, currentColumnIndex] = stack.pop();
    grid[currentRowIndex][currentColumnIndex] = 0;

    for (let direction of directions) {
      const [dX, dY] = direction;
      const nextRowIndex = currentRowIndex + dX;
      const nextColumnIndex = currentColumnIndex + dY;

      if ((grid[nextRowIndex] ?? [])[nextColumnIndex] === 1) {
        stack.push([nextRowIndex, nextColumnIndex]);
      }
    }
  }

  return grid;
};

console.log(`Island Count: ${calculateNumberOfIslands(SAMPLE_INPUT)}`);
