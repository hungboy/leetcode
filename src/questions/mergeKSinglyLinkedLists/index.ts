export { mergeKLists } from './mergeArrays';
export type ListNode = {
  value?: number;
  next?: ListNode;
};

let a: ListNode = { value: 2 };
let b: ListNode = { value: 3 };
let c: ListNode = { value: 4 };
let d: ListNode = { value: 5 };
let e: ListNode = { value: 6 };

a.next = b;
b.next = c;
c.next = d;
d.next = e;

let f: ListNode = { value: 4 };
let g: ListNode = { value: 5 };

f.next = g;

let h: ListNode = { value: 3 };
let i: ListNode = { value: 4 };
let j: ListNode = { value: 5 };
let k: ListNode = { value: 6 };

h.next = i;
i.next = j;
j.next = k;

export const INPUT = [a, f, h];

export const logLinkedList = (list: ListNode) => {
  let values = [];

  while (typeof list !== 'undefined') {
    values.push(list.value);
    list = list.next;
  }

  console.log(values.join(','));
};

console.log({ list: 'a', h: logLinkedList(a) });
console.log({ list: 'f', h: logLinkedList(f) });
console.log({ list: 'h', h: logLinkedList(h) });
