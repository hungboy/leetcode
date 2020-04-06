const SAMPLE = [
  [1, 3],
  [-2, 2],
];
const K = 1;
var kClosest = function (points: number[][], K: number) {
  const distances = [];

  for (let point of points) {
    let [x, y] = point;

    distances.push([x ** 2 + y ** 2, [x, y]]);
  }

  const sortedPoints = distances.sort((a, b) => a[0] - b[0]);

  let index = 0;
  let closestPoints = [];
  console.log(sortedPoints);

  while (index < K) {
    if (typeof sortedPoints[index] !== 'undefined') {
      closestPoints.push(sortedPoints[index][1]);
    }
    index++;
  }

  return closestPoints;
};

console.log(`Closest point to origin is:  ${kClosest(SAMPLE, K)}`);
