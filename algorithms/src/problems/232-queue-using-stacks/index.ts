import assert from "assert";
import { Stack } from "../../helpers/stack";

export class DumbassQueue {
  isPushingFast: boolean;
  fastPushStack: Stack<number>;
  fastPopStack: Stack<number>;

  constructor() {
    this.isPushingFast = true;
    this.fastPushStack = new Stack();
    this.fastPopStack = new Stack();
  }

  push(x: number): void {
    if (!this.isPushingFast) {
      while (!this.fastPopStack.isEmpty()) {
        let elt = this.fastPopStack.pop();
        assert(elt !== null);
        this.fastPushStack.push(elt);
      }
    }

    this.isPushingFast = true;
    this.fastPushStack.push(x);
  }

  pop(): number {
    if (this.isPushingFast) {
      while (!this.fastPushStack.isEmpty()) {
        let elt = this.fastPushStack.pop();
        assert(elt !== null);
        this.fastPopStack.push(elt);
      }
    }

    this.isPushingFast = false;
    let elt = this.fastPopStack.pop();
    assert(elt !== null);
    return elt;
  }

  peek(): number {
    if (this.isPushingFast) {
      while (!this.fastPushStack.isEmpty()) {
        let elt = this.fastPushStack.pop();
        this.fastPopStack.push(elt ?? -1);
      }
    }

    this.isPushingFast = false;
    let elt = this.fastPopStack.peek();
    assert(elt !== null);
    return elt;
  }

  empty(): boolean {
    return this.fastPushStack.isEmpty() && this.fastPopStack.isEmpty();
  }
}
