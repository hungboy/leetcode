export interface IEdge {
  connectingNode: string;
  weight: number;
}

export interface IAdjacencyList {
  [node: string]: IEdge[];
}

export const SAMPLE_ADJACENCY_LIST: IAdjacencyList = {
  a: [
    { connectingNode: 'b', weight: 1 },
    { connectingNode: 'c', weight: 1 },
    { connectingNode: 'e', weight: 10 }
  ],
  b: [
    { connectingNode: 'd', weight: 1 },
    { connectingNode: 'c', weight: 1 },
    { connectingNode: 'e', weight: 1 }
  ],
  c: [{ connectingNode: 'd', weight: 1 }],
  d: [
    {
      connectingNode: 'e',
      weight: 3
    },
    {
      connectingNode: 'b',
      weight: 3
    }
  ],
  e: [{ connectingNode: 'd', weight: 12 }]
};

export const SAMPLE_ADJACENCY_LIST_2: IAdjacencyList = {
  w: [
    { connectingNode: 'x', weight: 6 },
    { connectingNode: 'z', weight: 3 },
    { connectingNode: 'y', weight: 1 }
  ],
  x: [
    { connectingNode: 'w', weight: 6 },
    { connectingNode: 'z', weight: 3 },
    { connectingNode: 'y', weight: 4 }
  ],
  y: [
    { connectingNode: 'x', weight: 4 },
    { connectingNode: 'z', weight: 2 },
    { connectingNode: 'w', weight: 1 }
  ],
  z: [
    { connectingNode: 'y', weight: 2 },
    { connectingNode: 'x', weight: 3 },
    { connectingNode: 'w', weight: 3 }
  ]
};
