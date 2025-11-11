type Comparison<T> = (a: T, b: T) => boolean;

export class Heap<T> {
  private arr: Array<T>;
  private compare: Comparison<T>;

  constructor(compare: Comparison<T>) {
    this.arr = [];
    this.compare = compare;
  }

  private left(index: number) {
    return 2 * index + 1;
  }

  private right(index: number) {
    return 2 * index + 2;
  }

  private parent(index: number) {
    return Math.floor((index - 1) / 2);
  }

  peek() {
    return (this.arr?.length ?? 0) === 0 ? null : this.arr[0];
  }

  size() {
    return this.arr.length;
  }

  pop() {
    let n = this.arr.length;
    if (n === 1) {
      return this.arr.pop();
    }

    let res = this.arr[0];
    this.arr[0] = this.arr[this.arr.length - 1];
    this.arr.pop();
    this.heapify(0);
    return res;
  }

  insert(t: T) {
    this.arr.push(t);

    let i = this.arr.length - 1;
    while (i > 0 && this.compare(t, this.arr[this.parent(i)])) {
      const p = this.parent(i);
      const temp = this.arr[p];
      this.arr[p] = t;
      this.arr[i] = temp;
      i = p;
    }
  }

  heapify(index: number) {
    const arr = this.arr;
    let n = arr.length;
    let l = this.left(index);
    let r = this.right(index);
    let smallest = index;

    if (l < n && this.compare(arr[l], arr[index])) smallest = l;
    if (r < n && this.compare(arr[r], arr[smallest])) smallest = r;

    if (smallest !== index) {
      [arr[index], arr[smallest]] = [arr[smallest], arr[index]];
      this.heapify(smallest);
    }
  }

  debug() {
    return this.arr;
  }
}
