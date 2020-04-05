export const SAMPLE = [1, 10, 25, 35, 60, 35, 0, 95, -5, -35];
export const SAMPLE_TARGET = 60;

const findPair = (values: number[], target: number) => {
  const { occurenceMap } = values.reduce(
    (dependencies, value, index) => {
      if (typeof dependencies.occurenceMap[value] === 'undefined') {
        dependencies.occurenceMap[value] = [];
      }

      dependencies.occurenceMap[value].push(index);

      return dependencies;
    },
    { occurenceMap: {} } as {
      occurenceMap: { [value: number]: number[] };
    }
  );

  const pairs: number[][] = [];

  for (let entry of Object.entries(occurenceMap)) {
    const [val, indices] = entry;
    const parsedVal = parseInt(val);
    const targetVal = target - parsedVal;

    if (typeof occurenceMap[targetVal] !== 'undefined') {
      if (targetVal === parsedVal && occurenceMap[targetVal].length > 1) {
        pairs.push([targetVal, targetVal]);
      }
      pairs.push([targetVal, parsedVal]);
    }
  }

  pairs.sort(([a], [b]) => a - b);

  return pairs[0];
};

console.log(findPair(SAMPLE, SAMPLE_TARGET));
