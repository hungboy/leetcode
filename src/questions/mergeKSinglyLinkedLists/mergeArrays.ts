import { ListNode } from '.';
import { Heap } from '../../utils/heap';

// Merging multiple sorted arrays as a single sorted array:
// Given that each array has already been sorted
// to achieved a sorted group array, each element added to the sorted array
// should also be the smallest element of the group of lists.
// By leveraging a Heap to find the order of additions the complexity would be
// K * n * log(n) where n is the number of arrays and K is the total length of elements

// if arrays weren't sorted, then merge sort however the time complexit would be K log(K)

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
