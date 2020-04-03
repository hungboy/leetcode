import { IAdjacencyList, SAMPLE_ADJACENCY_LIST } from './adjacencyLists';

interface INodeMap {
  [node: string]: boolean;
}

type CyclePath = string[];

export const printAllPaths = (
  sourceNode: string,
  destinationNode: string,
  graph: IAdjacencyList
) => {
  const { visitedMap } = Object.keys(graph).reduce(
    (dependencies, node) => {
      dependencies['visitedMap'][node] = false;
      return dependencies;
    },
    { visitedMap: {} } as { visitedMap: INodeMap }
  );

  const { pathsToDestination } = findAllPaths(
    sourceNode,
    destinationNode,
    graph,
    visitedMap,
    [],
    []
  );

  console.log(pathsToDestination);
};

const findAllPaths = (
  currentNode: string,
  destinationNode: string,
  graph: IAdjacencyList,
  visitedMap: INodeMap,
  path: string[],
  pathsToDestination: string[][]
) => {
  visitedMap[currentNode] = true;
  path = [...path, currentNode];

  if (currentNode === destinationNode) {
    pathsToDestination = [...pathsToDestination, path];
  } else {
    let edges = graph[currentNode];
    for (let { connectingNode } of edges) {
      if (!visitedMap[connectingNode] || connectingNode === destinationNode) {
        let {
          pathsToDestination: nextPathToDestination,
          path: nextPath
        } = findAllPaths(
          connectingNode,
          destinationNode,
          graph,
          visitedMap,
          path,
          pathsToDestination
        );

        path = nextPath;
        pathsToDestination = nextPathToDestination;
      }
    }
  }

  return { pathsToDestination, path: path.slice(0, path.length - 1) };
};

export const PRINT_ALL_PATHS = (
  source = 'a',
  destination = 'b',
  graph = SAMPLE_ADJACENCY_LIST
) => {
  printAllPaths(source, destination, graph);
};
