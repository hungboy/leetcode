(function () {
  let SAMPLE = 'awaglknagawunagwkwagl';
  let K = 4;

  const findUniqueSubstrings = (word: string, characterCount: number) => {
    const substringSet: Set<string> = new Set();
    let index = 0;

    while (index + characterCount <= word.length) {
      let substring = word.substring(index, index + characterCount);
      const characters = substring.split('');
      const characterMap = new Map();
      let unique = true;
      for (const character of characters) {
        if (characterMap.has(character)) {
          unique = false;
          break;
        } else {
          characterMap.set(character, true);
        }
      }

      if (unique) {
        substringSet.add(substring);
      }
      index++;
    }

    return [...substringSet];
  };

  console.log(`${findUniqueSubstrings(SAMPLE, K)}`);
})();
