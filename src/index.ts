import {
  findMedianSortedArrays,
  findMedianFromSortedArrays,
  INPUT
} from './questions/findMedianFromSortedArrays';

const median = findMedianSortedArrays(INPUT);
console.log({ median });

const median2 = findMedianFromSortedArrays(INPUT.nums1, INPUT.nums2);
console.log({ median2 });
