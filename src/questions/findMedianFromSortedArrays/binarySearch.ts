export const findMedianFromSortedArrays = (
  nums1: number[],
  nums2: number[]
) => {
  const fullLength = nums1.length + nums2.length;
  const midValueCount = 2 - (fullLength % 2);

  let shiftCount = Math.floor(fullLength / 2);

  let index1 = 0;
  let index2 = 0;

  let mid = 0;

  while (shiftCount >= 0) {
    let tempMid;

    if (index1 < nums1.length && index2 < nums2.length) {
      tempMid =
        nums1[index1] < nums2[index2] ? nums1[index1++] : nums2[index2++];
    } else {
      tempMid = index1 >= nums1.length ? nums2[index2++] : nums1[index1++];
    }

    if (shiftCount < midValueCount) {
      mid = mid + tempMid;
    }

    shiftCount--;
  }

  return mid / midValueCount;
};
