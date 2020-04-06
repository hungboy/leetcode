export const findPoint = (aX: number, aY: number, bX: number, bY: number) => {
  const dX = bX - aX;
  const dY = bY - aY;
  const slope = dY / dX;
  const orthagonalDX = -dY;
  const orthagonalDY = dX;

  let direction = dY > 0 ? 1 : -1;

  const orthagonalSlope = orthagonalDY / orthagonalDX;
  let nextXA;
  let nextYA;

  let step = 1;

  while (true) {
    nextXA = bX + direction * step;
    nextYA = orthagonalSlope * (nextXA - bX) + bY;

    if (nextYA % 1 === 0) {
      return [nextXA, nextYA];
    }

    step++;
  }
};

console.log(`Orthangonal point to [-1,3] [3,1]: ${findPoint(-1, 3, 3, 1)}`);
