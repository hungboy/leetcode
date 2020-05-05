(function () {
  let SAMPLE = 'pqpqs';
  let k = 2;

  const countDistinctSubstrings = (word: string, uniqueCount: number) => {
    let substringCount = 0;
    let substrings = [];

    for (let startIndex = 0; startIndex < word.length; startIndex++) {
      const occurenceMap: Map<string, number> = new Map();

      for (
        let currentIndex = startIndex;
        currentIndex < word.length;
        currentIndex++
      ) {
        const character = word[currentIndex];
        if (!occurenceMap.has(character)) {
          occurenceMap.set(character, 0);
        }
        occurenceMap.set(character, 1 + occurenceMap.get(character));

        if (occurenceMap.size === uniqueCount) {
          substringCount++;
          substrings = [
            ...substrings,
            word.substring(startIndex, currentIndex + 1),
          ];
        }
      }
    }

    return { substringCount, substrings };
  };

  const { substringCount, substrings } = countDistinctSubstrings(SAMPLE, k);
  console.log({ substringCount, substrings });
})();
