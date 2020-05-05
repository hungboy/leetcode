(function () {
  const SAMPLE = [
    [0, 0],
    [1, 1],
    [-1, 1],
    [0, 1],
    [1, 0],
  ];
  interface Pair {
    origin: number[];
    destination: number[];
  }

  const generateLineFunction = (slope: number, point: number[]) => (
    x: number
  ) => slope * (x - point[0]) + point[1];

  const generateOrtagonalFunction = ({ origin, destination }: Pair) => (
    point: number[]
  ) => {
    let dX = destination[0] - origin[0];
    let dY = destination[1] - origin[1];
    const [x, y] = point;

    if (dX === 0) {
      //Current Slope is vertical
      return (
        (y === origin[1] || y === destination[1]) &&
        x !== origin[0] &&
        x !== destination[0]
      );
    } else if (dY === 0) {
      //current slope is horizontal

      return (
        (x === origin[0] || x === destination[0]) &&
        y !== origin[1] &&
        y !== destination[1]
      );
    } else {
      const slope = -dX / dY;

      const line1Func = generateLineFunction(slope, origin);
      const line2Func = generateLineFunction(slope, destination);

      return y === line1Func(x) || y === line2Func(x);
    }
  };

  const calculateNumberOfRightAngles = (points: number[][]) => {
    let numberOfRightAngles = 0;
    const recordedGroup = new Set();

    for (let originIndex = 0; originIndex < points.length; originIndex++) {
      for (
        let destinationIndex = originIndex + 1;
        destinationIndex < points.length;
        destinationIndex++
      ) {
        let pair: Pair = {
          origin: points[originIndex],
          destination: points[destinationIndex],
        };

        const isPointOrtagonalFunction = generateOrtagonalFunction(pair);

        for (let pointIndex = 0; pointIndex < points.length; pointIndex++) {
          if (pointIndex === originIndex || pointIndex === destinationIndex) {
            continue;
          }
          if (isPointOrtagonalFunction(points[pointIndex])) {
            recordedGroup.add(
              [originIndex, destinationIndex, pointIndex].sort().join(',')
            );
          }
        }
      }
    }

    return [...recordedGroup];
  };

  const permutations = calculateNumberOfRightAngles(SAMPLE);
})();
