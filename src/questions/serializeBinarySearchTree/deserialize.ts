import { SAMPLE_TREE, Node } from '.';

const calculateParentIndex = (index: number) => Math.floor((index - 1) / 2);
const isLeftIndex = index => index % 2 === 1;

export const deserialize = (data: string) => {
  if (data === '[]') {
    return null;
  }

  const dataArray = data.substring(1, data.length - 1).split(',');

  const nodeArray = dataArray.map(node =>
    node === 'null' ? null : new Node(node)
  );

  nodeArray.forEach((node, index) => {
    const parentIndex = calculateParentIndex(index);
    const isLeftChild = isLeftIndex(index);

    if (node && nodeArray[parentIndex]) {
      nodeArray[parentIndex][isLeftChild ? 'leftNode' : 'rightNode'] = node;
    }
  });

  return nodeArray[0];
};

export const DESERIALIZE_IN_PLACE = (data = SAMPLE_TREE) => {
  const node = deserialize(data);
};
