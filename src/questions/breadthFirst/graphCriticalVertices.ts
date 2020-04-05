export const SAMPLE_GRAPH = [
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 3],
  [2, 5],
  [5, 6],
  [3, 4],
];
export const VERTEX_COUNT = 7;
export const EDGE_COUNT = 7;

interface IDistanceMap {
  [vertex: number]: number;
}
interface IAdjacencyMap {
  [vertex: number]: number[];
}
interface IVisitedMap {
  [vertex: number]: boolean;
}
export const calculateAdjacencyMap = (graph: number[][]) => {
  return graph.reduce((map, edge) => {
    let [a, b] = edge;
    if (typeof map[a] === 'undefined') {
      map[a] = [];
    }
    if (typeof map[b] === 'undefined') {
      map[b] = [];
    }

    map[a].push(b);
    map[b].push(a);

    return map;
  }, {} as { [vertex: number]: number[] });
};

export const initializeDistanceMap = (
  graph: IAdjacencyMap,
  ommittedKey: number
) => {
  return Object.keys(graph).reduce(
    (dependencies, key) => {
      if (parseInt(key) !== ommittedKey) {
        dependencies.distanceMap[key] = Number.MAX_VALUE;
        dependencies.visitedMap[key] = false;
        dependencies.vertex = parseInt(key);
      }
      return dependencies;
    },
    { distanceMap: {}, visitedMap: {}, vertex: -1 } as {
      distanceMap: IDistanceMap;
      visitedMap: IVisitedMap;
      vertex: number;
    }
  );
};

export const calculateWeights = (graph: IAdjacencyMap, vertexCount: number) => {
  const criticalVertices = [];

  let vertexIndex = 0;
  while (vertexIndex < vertexCount) {
    const { distanceMap, visitedMap, vertex } = initializeDistanceMap(
      graph,
      vertexIndex
    );

    distanceMap[vertex] = 0;
    let queue = [vertex];

    while (queue.length > 0) {
      const currentVertex = queue.shift();
      const siblingVertices = graph[currentVertex];
      visitedMap[currentVertex] = true;

      for (let sibling of siblingVertices) {
        if (sibling !== vertexIndex) {
          distanceMap[sibling] =
            distanceMap[sibling] > distanceMap[currentVertex] + 1
              ? distanceMap[currentVertex] + 1
              : distanceMap[sibling];

          if (!visitedMap[sibling]) {
            queue.push(sibling);
          }
        }
      }
    }

    const isCriticalVertex = Object.values(distanceMap).reduce(
      (isCritical, distance) => {
        isCritical = isCritical || distance === Number.MAX_VALUE;
        return isCritical;
      },
      false
    );

    if (isCriticalVertex) {
      criticalVertices.push(vertexIndex);
    }

    vertexIndex++;
  }

  return criticalVertices;
};

const ADJACENCY_MAP = calculateAdjacencyMap(SAMPLE_GRAPH);

console.log(
  `Critical Vertices: ${calculateWeights(ADJACENCY_MAP, VERTEX_COUNT)}`
);
