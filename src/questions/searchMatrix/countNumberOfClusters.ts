(function () {
  const SAMPLE = [
    [1, 0, 1, 0, 0],
    [1, 1, 1, 0, 1],
    [1, 0, 1, 0, 0],
    [0, 0, 0, 0, 1],
  ];

  const findNumberOfClusters = (graph: number[][]) => {
    if (graph.length === 0) {
      return { count: 0, largestArea: 0 };
    }
    if (graph[0].length === 0) {
      return { count: 0, largestArea: 0 };
    }

    let count = 0;
    let rowIndex = 0;
    let largestArea = 0;

    while (rowIndex < graph.length) {
      let columnIndex = 0;

      while (columnIndex < graph[0].length) {
        if (graph[rowIndex][columnIndex] === 1) {
          const { graph: nextGraph, area } = updateClusterState(
            graph,
            rowIndex,
            columnIndex
          );
          graph = nextGraph;
          largestArea = largestArea > area ? largestArea : area;
          count++;
        }

        columnIndex++;
      }
      rowIndex++;
    }

    return { count, largestArea };
  };

  const generateKey = (rowIndex: number, columnIndex: number) =>
    `${rowIndex}-${columnIndex}`;

  const updateClusterState = (
    graph: number[][],
    rowIndex: number,
    columnIndex: number
  ) => {
    const directions = [
      [-1, 0],
      [0, -1],
      [1, 0],
      [0, 1],
    ];
    const visitedMap: Map<string, boolean> = new Map();
    let area = 0;
    let stack = [[rowIndex, columnIndex]];

    while (stack.length > 0) {
      const [currentRowIndex, currentColumnIndex] = stack.pop();

      if (!visitedMap.has(generateKey(currentRowIndex, currentColumnIndex))) {
        visitedMap.set(generateKey(currentRowIndex, currentColumnIndex), true);
        graph[currentRowIndex][currentColumnIndex] = 0;
        area++;
      }

      for (const direction of directions) {
        const [dX, dY] = direction;
        const nextRowIndex = currentRowIndex + dX;
        const nextColumnIndex = currentColumnIndex + dY;

        if (
          typeof graph[nextRowIndex] !== 'undefined' &&
          graph[nextRowIndex][nextColumnIndex] === 1 &&
          !visitedMap.has(generateKey(nextRowIndex, nextColumnIndex))
        ) {
          stack.push([nextRowIndex, nextColumnIndex]);
        }
      }
    }

    return { graph, area };
  };
  const { largestArea, count } = findNumberOfClusters(SAMPLE);
  console.log(`count: ${count}, largestarea: ${largestArea}`);
})();
