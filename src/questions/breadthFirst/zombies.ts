import { calculateDistanceMap } from '../graph/djkstraAL';

const SAMPLE_LANDSCAPE = [
  [1, 0, 0, 0],
  [1, 0, 1, 0],
  [0, 0, 0, 0],
];

const calculateCoordinates = (input: number[][]) =>
  input.reduce((coordinates, row, rowIndex) => {
    const newCoordinates = row.reduce((rowCoordinates, val, columnIndex) => {
      if (val === 1) {
        rowCoordinates = [...rowCoordinates, [rowIndex, columnIndex]];
      }

      return rowCoordinates;
    }, [] as number[][]);
    coordinates = [...coordinates, ...newCoordinates];
    return coordinates;
  }, [] as number[][]);

export const calculateNumberIterations = (landscape: number[][]) => {
  if (landscape.length === 0) {
    return 0;
  }
  if (landscape[0].length === 0) {
    return 0;
  }

  let instancePositions = calculateCoordinates(landscape);

  let iterationCount = 0;

  let nextInstances = instancePositions;

  while (nextInstances.length > 0) {
    iterationCount++;
    let { nextInstances: newInstances, nextLandscape } = calculateNextState(
      landscape,
      instancePositions
    );

    instancePositions = [...instancePositions, ...newInstances];
    nextInstances = newInstances;
    landscape = nextLandscape;
  }

  return iterationCount;
};

export const calculateNextState = (
  landscape: number[][],
  instancePositions: number[][]
) => {
  const directions = [
    [-1, 0],
    [0, -1],
    [1, 0],
    [0, 1],
  ];
  const nextInstances: number[][] = [];
  const nextLandscape = [...landscape];
  for (let instance of instancePositions) {
    let [instanceX, instanceY] = instance;
    for (let direction of directions) {
      let [x, y] = direction;
      const nextX = instanceX + x;
      const nextY = instanceY + y;

      if (
        typeof (nextLandscape[nextX] ?? [])[nextY] === 'number' &&
        nextLandscape[nextX][nextY] === 0
      ) {
        nextLandscape[nextX][nextY] = 1;
        nextInstances.push([nextX, nextY]);
      }
    }
  }

  return { nextInstances, nextLandscape };
};

const SAMPLE_INSTANCES = calculateCoordinates(SAMPLE_LANDSCAPE);

const NEXT_LANDSCAPE = calculateNextState(SAMPLE_LANDSCAPE, SAMPLE_INSTANCES);
