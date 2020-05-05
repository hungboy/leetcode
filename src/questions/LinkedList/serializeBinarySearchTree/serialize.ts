import { Node } from '.';

interface NodeIndex<T> {
  node: Node<T>;
  index: number;
}

const calculateLeftIndex = (index: number) => index * 2 + 1;
const calculateRightIndex = (index: number) => index * 2 + 2;

export const serialize = <T>(node: Node<T>) => {
  if (!node) {
    return '[]';
  }
  const tree = [];
  const queue: NodeIndex<T>[] = [{ node, index: 0 }];

  while (queue.length > 0) {
    const { node: currentNode, index } = queue.pop();
    if (currentNode) {
      queue.push({
        node: currentNode.leftNode,
        index: calculateLeftIndex(index)
      });
      queue.push({
        node: currentNode.rightNode,
        index: calculateRightIndex(index)
      });
      tree[index] = currentNode.value;
    }
  }

  const nulledTree = [];
  for (const node of tree) {
    nulledTree.push(typeof node === 'undefined' ? 'null' : node);
  }

  return `[${nulledTree.join(',')}]`;
};
