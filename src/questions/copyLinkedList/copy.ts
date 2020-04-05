class ListNode<T> {
  value: T | null;
  next: ListNode<T> | null;
  random: ListNode<T> | null;

  constructor(value: T | null) {
    this.value = value;
    this.next = null;
    this.random = null;
  }
}

const deepCopy = (root: ListNode<number>) => {
  const head = new ListNode<number>(null);
  let currentNode = root;
  let currentParentClone = head;
  const nodeMap = new Map();

  while (currentNode !== null) {
    const clone = new ListNode(currentNode.value);
    currentParentClone.next = clone;
    nodeMap.set(currentNode, clone);

    currentParentClone = currentParentClone.next;
    currentNode = currentNode.next;
  }

  currentNode = root;
  while (currentNode !== null) {
    const randomNode = currentNode.random;
    const currentClone = nodeMap.get(currentNode);
    if (randomNode === null) {
      currentClone.random = null;
    } else {
      const randomClone = nodeMap.get(currentNode.random);
      currentClone.random = randomClone;
    }
    currentNode = currentNode.next;
  }

  return currentParentClone.next;
};
