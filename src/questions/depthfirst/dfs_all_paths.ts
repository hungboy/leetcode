(function () {
  const EDGES = [
    ['a', 'b'],
    ['a', 'c'],
    ['a', 'd'],
    ['d', 'b'],
    ['c', 'e'],
  ];

  const calculateAdjacencyList = <T>(edges: T[][]) =>
    edges.reduce((adjacencyMap, [a, b]) => {
      if (!adjacencyMap.has(a)) {
        adjacencyMap.set(a, []);
      }
      if (!adjacencyMap.has(b)) {
        adjacencyMap.set(b, []);
      }
      adjacencyMap.set(a, [...adjacencyMap.get(a), b]);
      adjacencyMap.set(b, [...adjacencyMap.get(b), a]);

      return adjacencyMap;
    }, new Map() as Map<T, T[]>);

  const calculateJunctionNodes = <T>(edges: T[][]): T[] => {
    const cycleNodes: Set<T> = new Set();

    if (edges.length > 0) {
      const graph = calculateAdjacencyList(edges);

      const startingVertex = edges[0][0];
      const pathMap = new Map([[startingVertex, true]]);
      const visitedMap: Map<T, boolean> = new Map();

      const stack = [{ path: [startingVertex], map: pathMap }];

      while (stack.length > 0) {
        const { path: currentPath, map: pathNodes } = stack.pop();
        const currentNode = currentPath.pop();
        if (visitedMap.has(currentNode)) {
          cycleNodes.add(currentNode);
        } else {
          visitedMap.set(currentNode, true);

          graph.get(currentNode).forEach((edge) => {
            if (!visitedMap.has(edge)) {
              stack.push({
                path: [...currentPath, edge],
                map: new Map([...pathNodes, [edge, true]]),
              });
            }
          });
        }
      }
    }

    return [...cycleNodes];
  };
})();
