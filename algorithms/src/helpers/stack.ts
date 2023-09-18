export class Stack<T> {
  stack: Array<T>;
  constructor() {
    this.stack = [];
  }

  push(x: T) {
    this.stack.push(x);
  }

  isEmpty(): boolean {
    return this.stack.length === 0;
  }

  pop(): T | null {
    return this.isEmpty() ? null : this.stack.pop() ?? null;
  }

  peek(): T | null {
    return this.isEmpty() ? null : this.stack.at(-1) ?? null;
  }
}
