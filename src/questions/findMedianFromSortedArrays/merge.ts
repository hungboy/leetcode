export const findMedianSortedArrays = function({
  nums1,
  nums2
}: {
  nums1: number[];
  nums2: number[];
}) {
  const merged = mergeArrays(nums1, nums2);

  if (merged.length === 0) {
    return;
  }
  console.log(merged);
  const hasOddLength = merged.length % 2 === 1;
  if (hasOddLength) {
    return merged[Math.floor(merged.length / 2)];
  } else {
    let upperIndex = merged.length / 2;
    let lowerIndex = merged.length / 2 - 1;

    return (merged[upperIndex] + merged[lowerIndex]) / 2;
  }
};

export const mergeArrays = (arr1: number[], arr2: number[]) => {
  if (arr1.length === 0 || arr2.length === 0) {
    return [...arr1, ...arr2];
  }

  // Join arrays if they aren't overlapping
  // best case constant runtime
  let max1 = arr1[arr1.length - 1];
  let max2 = arr2[arr2.length - 1];
  let min1 = arr1[0];
  let min2 = arr2[0];

  if (min1 >= max2) {
    return [...arr2, ...arr1];
  }
  if (min2 >= max1) {
    return [...arr1, ...arr2];
  }

  // Merge arrays if they are overlapping

  let merged = [...arr1];

  arr2.forEach((num, index) => {
    const insertIndex = findIndex(merged, num);
    // console.log({ num, insertIndex, merged: merged.join(',') });
    merged.splice(insertIndex, 0, num);
  });

  return merged;
};

//binary search log(n)

export const findIndex = (values: number[], num: number): number => {
  let maxIndex = values.length;
  let minIndex = 0;
  let index = Math.floor(maxIndex / 2);

  while (maxIndex > minIndex) {
    if (values[index] === num) {
      break;
    }
    if (index === maxIndex || index === minIndex) {
      break;
    }

    if (values[index] > num) {
      maxIndex = index;
      index = Math.floor(maxIndex / 2);
    } else if (values[index] < num) {
      minIndex = index;
      index = Math.floor((maxIndex + minIndex) / 2);
    }
  }

  return values[index] < num ? index + 1 : index;
};
