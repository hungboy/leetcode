import { SAMPLE_TREE, Node } from '.';

export const getLeftIndex = (index: number) => 2 * index + 1;
export const getRightIndex = (index: number) => 2 * index + 2;

export const deserializeDataToNode = (data: string) => {
  if (data === '[]') {
    return null;
  }
  const tree = data.substring(1, data.length - 1).split(',');
  const root = deserializeData(tree, 0);

  return root;
};

export const deserializeData = (tree: string[], index) => {
  if (index >= tree.length || tree[index] === 'null') {
    return null;
  } else {
    const currentNode = new Node(tree[index]);

    const leftIndex = getLeftIndex(index);
    const rightIndex = getRightIndex(index);

    currentNode.leftNode = deserializeData(tree, leftIndex);
    currentNode.rightNode = deserializeData(tree, rightIndex);

    return currentNode;
  }
};

export const SAMPLE_DESERIALIZE = (tree = SAMPLE_TREE) => {
  const root = deserializeDataToNode(tree);
  debugger;
  console.log(root);
};
