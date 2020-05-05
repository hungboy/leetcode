(function () {
  const SAMPLE = 'banana';

  const findLongestDuplicate = (word: string) => {
    let longest = '';
    let currentLength = 1;

    while (currentLength < word.length) {
      let index = 0;

      while (index + currentLength <= word.length) {
        const windowWord = word.substring(index, index + currentLength);

        if (checkForDuplicate(word, windowWord)) {
          longest = windowWord;
        }

        index++;
      }

      currentLength++;
    }

    return longest;
  };

  const checkForDuplicate = (word: string, substring: string) => {
    let index = 0;
    let occurences = 0;
    while (index + substring.length <= word.length) {
      const stringWindow = word.substring(index, index + substring.length);

      if (stringWindow === substring) {
        occurences++;
      }

      index++;
    }

    return occurences > 1;
  };

  console.log({
    word: 'bananaaabanana',
    longestDup: findLongestDuplicate('bananaaabanana'),
  });
})();
