import { IAdjacencyList, SAMPLE_ADJACENCY_LIST } from './adjacencyLists';

interface IDistanceMap {
  [node: string]: { weight: number; parentNode?: string };
}

interface INodeMap {
  [node: string]: boolean;
}

export const findShortestPath = (
  graph: IAdjacencyList,
  vertexA: string,
  vertexB: string
) => {
  let distanceMap = calculateDistanceMap(graph, vertexA);

  return typeof distanceMap[vertexB] === 'undefined'
    ? Number.MAX_VALUE
    : distanceMap[vertexB]['weight'];
};

export const calculateDistanceMap = (
  graph: IAdjacencyList,
  vertexA: string
) => {
  const { distanceMap, visitedNodes } = Object.keys(graph).reduce(
    (dependencies, node) => {
      dependencies.distanceMap[node] = { weight: Number.MAX_VALUE };
      dependencies.visitedNodes[node] = false;

      return dependencies;
    },
    { distanceMap: {}, visitedNodes: {} } as {
      distanceMap: IDistanceMap;
      visitedNodes: INodeMap;
    }
  );
  distanceMap[vertexA]['weight'] = 0;
  const nodeQueue = [vertexA];

  while (nodeQueue.length > 0) {
    const currentNode = nodeQueue.shift();
    const currentWeight = distanceMap[currentNode]['weight'];

    if (visitedNodes[currentNode]) {
      continue;
    }

    for (const { connectingNode, weight } of graph[currentNode]) {
      if (distanceMap[connectingNode]['weight'] > currentWeight + weight) {
        distanceMap[connectingNode]['weight'] = currentWeight + weight;
        distanceMap[connectingNode]['parentNode'] = currentNode;
      }
      if (!visitedNodes[connectingNode]) {
        nodeQueue.push(connectingNode);
      }
    }

    visitedNodes[currentNode] = true;
  }

  return distanceMap;
};

export const FIND_SHORTEST_PATH_EXAMPLE = (
  graph = SAMPLE_ADJACENCY_LIST,
  vertexA = 'a',
  vertexB = 'e'
) => {
  let shortestWeight = findShortestPath(graph, vertexA, vertexB);
  console.log({ shortestWeight });
  let distanceMap = calculateDistanceMap(graph, vertexA);
  console.log({ distanceMap });
};
