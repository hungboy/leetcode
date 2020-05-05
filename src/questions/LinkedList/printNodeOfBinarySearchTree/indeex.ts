import { BinaryNode } from '../';

(function () {
  const NODE_1 = new BinaryNode(1);
  const NODE_2 = new BinaryNode(2);
  const NODE_3 = new BinaryNode(3);
  const NODE_4 = new BinaryNode(4);
  const NODE_5 = new BinaryNode(5);
  const NODE_6 = new BinaryNode(6);
  const NODE_7 = new BinaryNode(7);
  const NODE_8 = new BinaryNode(8);
  const NODE_9 = new BinaryNode(9);
  const NODE_10 = new BinaryNode(10);

  const ROOT = NODE_6;
  ROOT.leftNode = NODE_3;
  ROOT.rightNode = NODE_9;
  NODE_3.leftNode = NODE_2;
  NODE_2.leftNode = NODE_1;
  NODE_3.rightNode = NODE_5;
  NODE_5.leftNode = NODE_4;
  NODE_9.rightNode = NODE_10;
  NODE_9.leftNode = NODE_8;
  NODE_8.leftNode = NODE_7;

  const isTerminatedNode = <T>(
    node: BinaryNode<T> | null,
    visitedMap: Map<BinaryNode<T>, boolean>
  ) => node === null || visitedMap.get(node) === true;

  const orderByStack = <T>(root: BinaryNode<T>) => {
    let stack = [root];
    let visitedMap = new Map();

    while (stack.length > 0) {
      const currentNode = stack.pop();

      if (!isTerminatedNode(currentNode.rightNode, visitedMap)) {
        stack.push(currentNode.rightNode);
      }

      if (isTerminatedNode(currentNode.leftNode, visitedMap)) {
        if (!isTerminatedNode(currentNode, visitedMap)) {
          console.log(currentNode.value);
          visitedMap.set(currentNode, true);
        }
      } else {
        stack.push(currentNode);
      }

      if (!isTerminatedNode(currentNode.leftNode, visitedMap)) {
        stack.push(currentNode.leftNode);
      }
    }
  };

  const printRecursively = <T>(node: BinaryNode<T>) => {
    if (node === null) {
      return;
    }

    printRecursively(node.leftNode);
    console.log(node.value);
    printRecursively(node.rightNode);
  };

  orderByStack(ROOT);
})();
