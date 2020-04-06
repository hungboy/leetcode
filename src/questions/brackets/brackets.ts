const calculateBracketPermutations = (pairCount: number) => {
  const permutations = calculateBracketPermutation(pairCount, 1, 0, '(', []);

  return permutations;
};

const calculateBracketPermutation = (
  pairCount: number,
  openCount: number,
  closedCount: number,
  permutation: string,
  permutations: string[]
) => {
  if (openCount === closedCount && pairCount === openCount) {
    return [...permutations, permutation];
  }
  if (openCount < closedCount) {
    return permutations;
  }

  if (openCount < pairCount) {
    permutations = calculateBracketPermutation(
      pairCount,
      openCount + 1,
      closedCount,
      permutation + '(',
      permutations
    );
  }
  if (closedCount < pairCount) {
    permutations = calculateBracketPermutation(
      pairCount,
      openCount,
      closedCount + 1,
      permutation + ')',
      permutations
    );
  }

  return permutations;
};

console.log(`${calculateBracketPermutations(6)}`);
