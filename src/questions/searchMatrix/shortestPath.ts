(function () {
  let SAMPLE = [
    ['O', 'O', 'O', 'O'],
    ['D', 'O', 'D', 'O'],
    ['O', 'O', 'O', 'O'],
    ['X', 'D', 'D', 'O'],
  ];

  const directions = [
    [-1, 0],
    [0, -1],
    [1, 0],
    [0, 1],
  ];

  const calculateShortestPath = (graph: string[][]) => {
    const visitedMap: Map<string, boolean> = new Map();
    // let { pathToDestination, pathLength } = findAllPathsDFS(
    //   graph,
    //   visitedMap,
    //   [[0, 0]],
    //   [],
    //   Number.MAX_VALUE
    // );
    const steps = findMinStepsToDestination(graph);
    return { steps };
  };

  const findMinStepsToDestination = (graph: string[][]) => {
    let queue = [[0, 0]];
    let steps = 0;
    const visitedMap = new Map();

    while (queue.length > 0) {
      const currentNodeCount = queue.length;
      for (let i = 0; i < currentNodeCount; i++) {
        const [currentRowIndex, currentColumnIndex] = queue.shift();
        visitedMap.set(generateKey(currentRowIndex, currentColumnIndex), true);

        if (graph[currentRowIndex][currentColumnIndex] === 'X') {
          return steps;
        }

        for (const direction of directions) {
          const [dX, dY] = direction;
          const nextRowIndex = currentRowIndex + dX;
          const nextColumnIndex = currentColumnIndex + dY;
          const nextCoordinates = [nextRowIndex, nextColumnIndex];
          const nextValue = (graph[nextRowIndex] ?? [])[nextColumnIndex];

          if (
            nextValue === 'X' ||
            (nextValue === 'O' &&
              !visitedMap.has(generateKey(nextRowIndex, nextColumnIndex)))
          ) {
            queue.push(nextCoordinates);
          }
        }
      }

      steps++;
    }

    if (steps === 0) {
      return Number.MAX_VALUE;
    }
  };

  const findAllPathsDFS = (
    graph: string[][],

    visitedNodes: Map<string, boolean>,
    path: number[][],
    pathToDestination: number[][],
    pathLength: number
  ) => {
    const [currentRowIndex, currentColumnIndex] = path[path.length - 1];

    if (graph[currentRowIndex][currentColumnIndex] === 'X') {
      if (path.length < pathLength) {
        pathToDestination = path;
        pathLength = path.length;
      }
      return { pathToDestination, pathLength };
    }

    visitedNodes.set(generateKey(currentRowIndex, currentColumnIndex), true);

    for (const direction of directions) {
      const [dX, dY] = direction;
      const nextRowIndex = dX + currentRowIndex;
      const nextColumnIndex = dY + currentColumnIndex;
      const nextValue = (graph[nextRowIndex] ?? [])[nextColumnIndex];
      if (
        (nextValue === 'O' &&
          !visitedNodes.has(generateKey(nextRowIndex, nextColumnIndex))) ||
        nextValue === 'X'
      ) {
        const {
          pathLength: nextPathLength,
          pathToDestination: nextPathToDestination,
        } = findAllPathsDFS(
          graph,
          visitedNodes,
          [...path, [nextRowIndex, nextColumnIndex]],
          pathToDestination,
          pathLength
        );

        pathLength = nextPathLength;
        pathToDestination = nextPathToDestination;
      }
    }

    return { pathToDestination, pathLength };
  };

  const generateKey = (rowIndex, columnIndex) => `${rowIndex}-${columnIndex}`;

  const { steps } = calculateShortestPath(SAMPLE);

  console.log({ steps });
})();
