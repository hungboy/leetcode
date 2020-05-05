export class BinaryNode<T> {
  value: T;
  leftNode: BinaryNode<T> | null;
  rightNode: BinaryNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.leftNode = null;
    this.rightNode = null;
  }
}
