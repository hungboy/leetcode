/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
  const rowCount = matrix.length;

  if (rowCount === 0) {
    return false;
  }

  const columnCount = matrix[0].length;

  if (columnCount === 0) {
    return false;
  }

  let rowIndex = 0;
  let columnIndex = 0;

  while (
    rowIndex < rowCount &&
    rowIndex >= 0 &&
    columnIndex >= 0 &&
    columnIndex < columnCount
  ) {
    const currentValue = matrix[rowIndex][columnIndex];
    if (target === currentValue) {
      return true;
    }

    if (currentValue > target) {
      let [diagonalRowIndex, diagonalColumnIndex] = getDiagonal(
        rowIndex,
        columnIndex
      );
      let [leftRowIndex, leftColumnIndex] = getLeft(rowIndex, columnIndex);

      let leftValue = (leftRowIndex >= 0 ? matrix[leftRowIndex] : [])[
        leftColumnIndex
      ];

      rowIndex =
        typeof leftValue === 'number' && leftValue >= target
          ? leftRowIndex
          : diagonalRowIndex;
      columnIndex =
        typeof leftValue === 'number' && leftValue >= target
          ? leftColumnIndex
          : diagonalColumnIndex;
      continue;
    } else if (currentValue < target) {
      let [nextRowIndex, nextColumnIndex] =
        columnIndex < columnCount - 1
          ? getRight(rowIndex, columnIndex)
          : getDown(rowIndex, columnIndex);
      rowIndex = nextRowIndex;
      columnIndex = nextColumnIndex;
      continue;
    }
  }

  return false;
};

const getDiagonal = (rowIndex, columnIndex) => [rowIndex + 1, columnIndex - 1];
const getLeft = (rowIndex, columnIndex) => [rowIndex, columnIndex - 1];

const getRight = (rowIndex, columnIndex) => [rowIndex, columnIndex + 1];
const getDown = (rowIndex, columnIndex) => [rowIndex + 1, columnIndex];
