export const SAMPLE_GRAPH = [
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 3],
  [2, 5],
  [5, 6],
  [3, 4],
];

const calculateCriticalVertices = <T>(graphArray: T[][]) => {
  const graph = calculateAdjacencyList(graphArray);
  let criticalVertices = [];

  for (let [ommitedVertex] of graph) {
    if (isCritical(graph, ommitedVertex)) {
      criticalVertices = [...criticalVertices, ommitedVertex];
    }
  }

  return criticalVertices;
};

const calculateAdjacencyList = <T>(edges: T[][]) => {
  const graph: Map<T, T[]> = new Map();

  for (let edge of edges) {
    const [a, b] = edge;
    if (!graph.has(a)) {
      graph.set(a, []);
    }
    if (!graph.has(b)) {
      graph.set(b, []);
    }

    graph.set(a, [...graph.get(a), b]);
    graph.set(b, [...graph.get(b), a]);
  }

  return graph;
};

const isCritical = <T>(graph: Map<T, T[]>, ommittedVertex: T) => {
  let visitedMap: Map<T, boolean> = new Map();
  let startingVertex;

  for (let [key] of graph) {
    if (key !== ommittedVertex) {
      visitedMap.set(key, false);
      startingVertex = key;
    }
  }

  let queue = [startingVertex];

  while (queue.length > 0) {
    const currentVertex = queue.shift();

    visitedMap.set(currentVertex, true);

    if (graph.has(currentVertex)) {
      for (const siblingVertex of graph.get(currentVertex)) {
        if (
          siblingVertex !== ommittedVertex &&
          visitedMap.has(siblingVertex) &&
          visitedMap.get(siblingVertex) === false
        ) {
          queue.push(siblingVertex);
        }
      }
    }
  }

  let isConnected = true;

  for (let [, visited] of visitedMap) {
    isConnected = isConnected && visited;
  }

  return !isConnected;
};

console.log(`Critical Vertices: ${calculateCriticalVertices(SAMPLE_GRAPH)}`);
