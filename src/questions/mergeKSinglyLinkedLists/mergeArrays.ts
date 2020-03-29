import { ListNode } from '.';
import { Heap } from './heap';
export const mergeKLists = (lists: ListNode[]) => {
  const comparitor = (a: ListNode, b: ListNode) => {
    if (a && b) {
      return b.value - a.value;
    }
  };
  let heap = new Heap({ comparitorFunction: comparitor });
  let transientLists = [...lists];
  let finished = false;
  let merged: ListNode = { value: undefined, next: undefined };
  let tail = merged;

  for (let list of transientLists) {
    heap.addElement(list);
  }

  while (!finished) {
    const node = heap.removeElementAtIndex(0);

    if (typeof node === 'undefined') {
      finished = true;
    } else {
      if (typeof tail.value === 'undefined') {
        tail.value = node.value;
        tail.next = {};
        tail = tail.next;
      }

      if (node.next) {
        heap.addElement(node.next);
      }
    }
  }

  return merged;
};
