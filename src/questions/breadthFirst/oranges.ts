const SAMPLE_BUCKET = [
  [2, 1, 1],
  [1, 1, 0],
  [0, 1, 1],
];

const calculateRottenPositions = (bucket: number[][]) =>
  bucket.reduce((rottenPositions, row, rowIndex) => {
    const newRottenCoordinates = row.reduce(
      (rottenRowPositions, ripeness, columnIndex) => {
        if (ripeness === 2) {
          rottenRowPositions = [...rottenRowPositions, [rowIndex, columnIndex]];
        }
        return rottenRowPositions;
      },
      [] as number[][]
    );
    rottenPositions = [...rottenPositions, ...newRottenCoordinates];

    return rottenPositions;
  }, [] as number[][]);

const calculateNextBucketState = (
  bucket: number[][],
  rottenCoordinates: number[][]
) => {
  const directions: number[][] = [
    [-1, 0],
    [0, -1],
    [1, 0],
    [0, 1],
  ];

  let nextRottenCoordinates = [];
  let nextBucket = [...bucket];

  for (let coordinate of rottenCoordinates) {
    const [rowIndex, columnIndex] = coordinate;
    for (let direction of directions) {
      const [dX, dY] = direction;
      const nextRowIndex = rowIndex + dX;
      const nextColumnIndex = columnIndex + dY;

      if ((bucket[nextRowIndex] ?? [])[nextColumnIndex] === 1) {
        nextBucket[nextRowIndex][nextColumnIndex] = 2;
        nextRottenCoordinates = [
          ...nextRottenCoordinates,
          [nextRowIndex, nextColumnIndex],
        ];
      }
    }
  }

  return {
    nextRottenCoordinates,
    nextBucket,
  };
};

const calculateNumberOfIterations = (bucket: number[][]) => {
  if (bucket.length === 0) {
    return 0;
  }
  if (bucket[0].length === 0) {
    return 0;
  }

  let currentRottenOranges = calculateRottenPositions(bucket);

  let newRottenOranges = currentRottenOranges;
  let iterations = 0;
  while (newRottenOranges.length > 0) {
    let { nextBucket, nextRottenCoordinates } = calculateNextBucketState(
      bucket,
      currentRottenOranges
    );

    newRottenOranges = nextRottenCoordinates;
    bucket = nextBucket;
    currentRottenOranges = [...currentRottenOranges, ...nextRottenCoordinates];
    if (newRottenOranges.length > 0) {
      iterations++;
    }
  }

  return iterations;
};

console.log(
  `Bucket will rott after ${calculateNumberOfIterations(
    SAMPLE_BUCKET
  )} iterations`
);
