const SAMPLE_KEYWORDS = [
  'anacell',
  'betacellular',
  'cetracular',
  'deltacellular',
  'eurocell',
];
const SAMPLE_REVIEWS = [
  'I love anacell Best services; Best services provided by anacell',
  'betacellular has great services',
  'deltacellular provides much better services than betacellular',
  'cetracular is worse than anacell',
  'Betacellular is better than deltacellular.',
];

const replacePunctuation = (str: string) => str.replace(/^[a-zA-Z0-9]/, '');

const calculateTopKOccurences = (
  k: number,
  keywords: string[],
  reviews: string[]
) => {
  const formattedReviews = reviews.map((review) =>
    replacePunctuation(review.toLowerCase()).split(' ')
  );

  const keywordCountMap = keywords.reduce((map, keyword) => {
    map[keyword] = 0;
    return map;
  }, {} as { [key: string]: number });

  for (let review of formattedReviews) {
    for (let word of review) {
      if (typeof keywordCountMap[word] === 'number') {
        keywordCountMap[word]++;
      }
    }
  }

  const sortedKeys = Object.entries(keywordCountMap).sort(
    ([keywordA, countA], [keywordB, countB]) => {
      if (countA === countB) {
        return keywordA < keywordB ? 1 : -1;
      }
      return countB - countA;
    }
  );

  let index = 0;
  let keys = [];
  while (k > index) {
    keys = [...keys, sortedKeys[index][0]];
    index++;
  }

  return keys;
};

const keys = calculateTopKOccurences(2, SAMPLE_KEYWORDS, SAMPLE_REVIEWS);

console.log(keys);
