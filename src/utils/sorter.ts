import { ComparitorFunction } from './types';

const swapElements = <T>(values: T, indexA: number, indexB: number) => {
  let temp = values[indexA];
  values[indexA] = values[indexB];
  values[indexB] = temp;

  return values;
};

const quickSort = <T>({
  values,
  comparitorFunction,
  startIndex,
  endIndex
}: {
  values: T[];
  startIndex: number;
  endIndex: number;
  comparitorFunction: ComparitorFunction<T>;
}) => {
  if (values.length > 1) {
    let pivot = startIndex;
    let left = startIndex;
    let right = endIndex;

    while (left < right) {
      while (
        comparitorFunction(values[left], values[pivot]) <= 0 &&
        left < endIndex
      ) {
        left++;
      }

      while (comparitorFunction(values[right], values[pivot]) > 0) {
        right--;
      }

      if (left < right) {
        values = swapElements(values, left, right);
      }
    }

    values = swapElements(values, right, pivot);

    quickSort({ values, comparitorFunction, startIndex, endIndex: right - 1 });
    quickSort({ values, comparitorFunction, startIndex: right + 1, endIndex });
  }
};
