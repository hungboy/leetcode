(function () {
  let EDGES = [
    [1, 2],
    [1, 3],
    [3, 4],
    [1, 4],
    [4, 5],
  ];

  let VERTEX_COUNT = 5;

  const calculateAdjacencyList = (
    edges: number[][],
    vertexCount: number,
    ommitedIndex: number
  ) => {
    const graph: Map<number, number[]> = new Map();

    let index = 1;

    while (index < vertexCount + 1) {
      graph.set(index, []);
      index++;
    }

    index = 0;

    for (const edge of edges) {
      if (index !== ommitedIndex) {
        let [a, b] = edge;

        graph.set(a, [...graph.get(a), b]);
        graph.set(b, [...graph.get(b), a]);
      }
      index++;
    }

    return graph;
  };

  const calculateCriticalEdges = (edges: number[][], vertexCount: number) => {
    let index = 0;
    let criticalIndices = [];

    while (index < edges.length) {
      const graph = calculateAdjacencyList(edges, vertexCount, index);
      const visitedVertices: Map<number, boolean> = new Map();
      const vertices = graph.keys();
      let startingVertex: number;

      for (const vertex of vertices) {
        visitedVertices.set(vertex, false);
        startingVertex = vertex;
      }

      let queue = [startingVertex];

      while (queue.length > 0) {
        const currentVertex = queue.shift();
        visitedVertices.set(currentVertex, true);

        const siblings = graph.get(currentVertex);

        for (const sibling of siblings) {
          if (!visitedVertices.get(sibling)) {
            queue.push(sibling);
          }
        }
      }

      let connected = true;
      for (const visited of visitedVertices.values()) {
        connected = connected && visited;
      }

      if (!connected) {
        criticalIndices.push(edges[index]);
      }

      index++;
    }

    return criticalIndices;
  };

  console.log(`${calculateCriticalEdges(EDGES, VERTEX_COUNT)}`);
})();
