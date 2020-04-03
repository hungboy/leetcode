import { SAMPLE_ADJACENCY_LIST_2, IAdjacencyList } from './adjacencyLists';

interface IPath {
  path: string[];
  weight: number;
}

interface INodeMap {
  [vertex: string]: boolean;
}

export const calculatePaths = (
  graph: IAdjacencyList,
  maxPathLength: number,
  currentVertex: string,
  destinationVertex: string,
  path: string[],
  paths: IPath[],
  nextVertices: INodeMap,
  currentWeight: number
) => {
  path = [...path, currentVertex];

  const edges = graph[currentVertex];

  if (currentVertex === destinationVertex && path.length > 1) {
    paths.push({ path, weight: currentWeight });
  }

  for (let { connectingNode, weight } of edges) {
    if (
      nextVertices[connectingNode] ||
      (path.length === maxPathLength && connectingNode === destinationVertex)
    ) {
      const { path: nextPath, paths: nextPaths } = calculatePaths(
        graph,
        maxPathLength,
        connectingNode,
        destinationVertex,
        path,
        paths,
        {
          ...nextVertices,
          [connectingNode]: false,
          [currentVertex]: false
        },
        currentWeight + weight
      );

      path = nextPath;
      paths = nextPaths;
    }
  }

  return { paths, path: path.slice(0, path.length - 1) };
};

export const FIND_PATHS = (graph = SAMPLE_ADJACENCY_LIST_2, vertex = 'w') => {
  const { nextVertices, maxPathLength } = Object.keys(graph).reduce(
    (dependencies, key) => {
      dependencies['nextVertices'][key] = true;
      dependencies['maxPathLength'] = 1 + dependencies['maxPathLength'];
      return dependencies;
    },
    { nextVertices: {}, maxPathLength: 0 } as {
      nextVertices: INodeMap;
      maxPathLength: number;
    }
  );
  const { paths } = calculatePaths(
    graph,
    maxPathLength,
    vertex,
    vertex,
    [],
    [],
    nextVertices,
    0
  );

  console.log(paths);
};
