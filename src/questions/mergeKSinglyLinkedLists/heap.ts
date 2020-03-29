import { ComparitorFunction } from './types';

export class Heap<T> {
  public contents: T[];

  private comparitorFunction;

  private getLeftIndex(index: number) {
    return index * 2 + 1;
  }

  private getRightIndex(index: number) {
    return index * 2 + 2;
  }

  private getParentIndex(index: number) {
    return Math.floor((index - 1) / 2);
  }

  private swapElements(elements: T[], indexA: number, indexB: number): T[] {
    let tempElement = elements[indexA];
    elements[indexA] = elements[indexB];
    elements[indexB] = tempElement;

    return elements;
  }

  constructor({
    comparitorFunction
  }: {
    comparitorFunction: ComparitorFunction<T>;
  }) {
    this.contents = [];
    this.comparitorFunction = comparitorFunction;
  }

  public addElement(element: T) {
    let transientContents = [...this.contents, element];
    transientContents = this.bubbleUp(
      transientContents,
      transientContents.length - 1
    );

    this.contents = transientContents;
  }

  public removeElementAtIndex(index: number) {
    let transientContents = this.swapElements(
      this.contents,
      index,
      this.contents.length - 1
    );
    const element = transientContents.pop();

    transientContents = this.sinkDown(transientContents, index);
    transientContents = this.bubbleUp(transientContents, index);

    this.contents = transientContents;

    return element;
  }

  private bubbleUp(contents: T[], index: number): T[] {
    if (index < 1 || index >= this.contents.length) {
      return contents;
    }
    let transientContents = [...contents];
    let currentIndex = index;

    let finished = false;

    while (!finished) {
      let parentIndex = this.getParentIndex(currentIndex);
      let parentValue = transientContents[parentIndex];

      if (this.comparitorFunction(transientContents[index], parentValue) > 0) {
        transientContents = this.swapElements(
          transientContents,
          currentIndex,
          parentIndex
        );
        currentIndex = parentIndex;
      } else {
        finished = true;
      }
    }

    return transientContents;
  }

  private sinkDown(contents: T[], index: number): T[] {
    if (index < 0 || index >= this.contents.length) {
      //Can't sink any further than beyond the boundaries of an array
      return contents;
    }

    let transientContents = [...contents];
    let currentIndex = index;
    let finished = false;

    while (!finished) {
      const rightIndex = this.getRightIndex(currentIndex);
      const leftIndex = this.getLeftIndex(currentIndex);
      const leftValue = transientContents[this.getLeftIndex(currentIndex)];
      const rightValue = transientContents[this.getRightIndex(currentIndex)];

      const leftScore =
        typeof leftValue !== 'undefined' &&
        this.comparitorFunction(transientContents[currentIndex], leftValue) < 0
          ? this.comparitorFunction(transientContents[currentIndex], leftValue)
          : 0;

      const rightScore =
        typeof rightValue !== 'undefined' &&
        this.comparitorFunction(transientContents[currentIndex], rightValue) < 0
          ? this.comparitorFunction(transientContents[currentIndex], rightValue)
          : 0;

      if (rightScore < 0 || leftScore < 0) {
        transientContents = this.swapElements(
          transientContents,
          currentIndex,
          rightScore < leftScore ? rightIndex : leftIndex
        );
        currentIndex = rightScore < leftScore ? rightIndex : leftIndex;
      } else {
        finished = true;
      }
    }

    return transientContents;
  }
}
