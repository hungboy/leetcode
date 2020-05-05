(function () {
  class Point {
    id: number;
    x: number;
    y: number;

    constructor(id, x, y) {
      this.x = x;
      this.y = y;
      this.id = id;
    }
  }

  class Bridge {
    left: number;
    right: number;

    constructor(left, right) {
      this.left = left;
      this.right = right;
    }
  }

  const SAMPLE_POINTS = [
    new Point(0, 1, 2),
    new Point(1, 2, 3),
    new Point(2, 3, 4),
    new Point(3, 3, 5),
  ];

  const SAMPLE_BRIDGES = [
    new Bridge(0, 1),
    new Bridge(1, 2),
    new Bridge(2, 3),
    new Bridge(0, 3),
    new Bridge(0, 1),
  ];

  const calculateAdjacencyMap = (bridges: Bridge[], points: Point[]) =>
    bridges.reduce((map, { left, right }) => {
      const [leftPoint] = points.filter((point) => point.id === left);
      const [rightPoint] = points.filter((point) => point.id === right);

      if (!map.has(leftPoint)) {
        map.set(leftPoint, []);
      }
      if (!map.has(rightPoint)) {
        map.set(rightPoint, []);
      }

      map.set(leftPoint, [...map.get(leftPoint), rightPoint]);
      map.set(rightPoint, [...map.get(rightPoint), leftPoint]);
      return map;
    }, new Map());

  const identifyPointsFromCoordinates = (
    coordinates: number[][],
    points: Point[]
  ) => {
    const [x1, y1] = coordinates[0];
    const [x2, y2] = coordinates[1];
    return points.reduce((pointsOfInterest, point) => {
      const { x, y } = point;

      if (x === x1 && y === y1) {
        pointsOfInterest = [...pointsOfInterest, point];
      }

      if (x === x2 && y === y2) {
        pointsOfInterest = [...pointsOfInterest, point];
      }

      return pointsOfInterest;
    }, []);
  };

  const initializeVisitedMap = (points: Point[]) =>
    points.reduce((map, point) => {
      map.set(point, false);

      return map;
    }, new Map());

  const generatePathCalculator = (points: Point[], bridges: Bridge[]) => (
    origin: number[],
    destination: number[],
    steps: number
  ) => {
    const identifiedPoints = identifyPointsFromCoordinates(
      [origin, destination],
      points
    );

    if (identifiedPoints.length < 2) {
      return false;
    }

    const [originPoint, destinationPoint] = identifiedPoints;

    const adjacencyMap = calculateAdjacencyMap(bridges, points);
    const visitedPoints = initializeVisitedMap(points);
    let paths = [];
    let stack = [[originPoint]];

    while (stack.length > 0) {
      const currentPath = stack.pop();
      const point = currentPath[currentPath.length - 1];

      if (point === destinationPoint) {
        paths = [...paths, currentPath];
      }

      visitedPoints.set(point, true);

      const nextPoints = adjacencyMap.get(point) ?? [];

      nextPoints.forEach((nextPoint) => {
        if (
          visitedPoints.get(nextPoint) !== true ||
          nextPoint === destinationPoint
        ) {
          stack.push([...currentPath, nextPoint]);
        }
      });
    }

    const matchedPaths = paths.filter((path) => path.length === steps + 1);

    return matchedPaths.length > 0;
  };

  const patchCalculator = generatePathCalculator(SAMPLE_POINTS, SAMPLE_BRIDGES);

  const doesPathExist = patchCalculator([1, 2], [2, 3], 2);
  console.log(doesPathExist);
})();
