import { SAMPLE_NODE, Node } from '.';

interface INodeMap<T> {
  [index: number]: T;
}

export const serializeTree = <T>(node: Node<T>) => {
  if (node) {
    const serializedTree = serializeNodeToArray(node, [], 0);
    const nulledTree = [];

    for (let node of serializedTree) {
      nulledTree.push(typeof node === 'undefined' ? 'null' : node);
    }
    return '[' + nulledTree.join(',') + ']';
  }
  return '[]';
};

const getLeftIndex = (index: number) => 2 * index + 1;

const getRightIndex = (index: number) => 2 * index + 2;

export const serializeNodeToArray = <T>(
  node: Node<T>,
  tree: T[],
  index: number
) => {
  tree[index] = node.value;
  if (node.leftNode !== null) {
    tree = serializeNodeToArray(node.leftNode, tree, getLeftIndex(index));
  }
  if (node.rightNode !== null) {
    tree = serializeNodeToArray(node.rightNode, tree, getRightIndex(index));
  }

  return tree;
};

export const SAMPLE_SERIALIZE_TREE = (node = SAMPLE_NODE) => {
  const tree = serializeTree(node);
  console.log(tree);
};
