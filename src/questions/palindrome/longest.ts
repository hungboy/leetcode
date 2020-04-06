(function () {
  const SAMPLE_WORD = 'asdffdsaeeee';

  const findLongestPalindrone = (word: string) => {
    if (word.length === 0) {
      return '';
    }

    let greatestLength = 1;
    let startIndex = 0;
    let length = greatestLength;

    while (length <= word.length) {
      const { index } = findPalindrone(word, length, 0);

      if (typeof index === 'number' && length > greatestLength) {
        greatestLength = length;
        startIndex = index;
      }

      length++;
    }

    return word.substring(startIndex, startIndex + greatestLength);
  };

  const findPalindrone = (word: string, length: number, startIndex: number) => {
    let index = startIndex;

    while (index + length <= word.length) {
      const substring = word.substring(index, index + length);
      if (isPalindrone(substring)) {
        return { index };
      }
      index++;
    }

    return {};
  };

  const isPalindrone = (word: string) => {
    let startIndex = 0;
    let endIndex = word.length - 1;

    while (startIndex < endIndex) {
      if (word[startIndex] !== word[endIndex]) {
        return false;
      }

      startIndex++;
      endIndex--;
    }

    return true;
  };

  console.log(
    `${SAMPLE_WORD} longest palindrone in here is:  ${findLongestPalindrone(
      SAMPLE_WORD
    )}`
  );
})();
