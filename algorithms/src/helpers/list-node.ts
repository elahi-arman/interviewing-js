/**
 * Definition for singly-linked list from LeetCode
 */
interface fromArrayOptions {
  cycle?: number;
}

export class ListNode<T> {
  val: T;
  next: ListNode<T> | null;
  constructor(val: T, next?: ListNode<T> | null) {
    this.val = val;
    this.next = next === undefined ? null : next;
  }

  /**
   * @function fromArray
   * @description creates a new Linked List from the given array
   * @returns the head of the Linked List
   */
  static fromArray<T>(arr: Array<T>, options: fromArrayOptions): ListNode<T> {
    const head = new ListNode(arr[0], null);
    let temp = head;

    // invariant: at the end  of this loop, temp should point to the tail of the list
    for (let i = 1; i < arr.length; i++) {
      const newNode = new ListNode(arr[i], null);
      temp.next = newNode;
      temp = temp.next;
    }

    if (options.cycle !== undefined) {
      let cycled = head.getNode(options.cycle);
      temp.next = cycled;
    }

    return head;
  }

  getNode(position: number): ListNode<T> | null {
    let temp: ListNode<T> | null = this;

    if (temp === null || position < 0) {
      return null;
    }

    for (let i = 0; temp !== null && i < position; i++) {
      temp = temp.next;
    }

    return temp;
  }
}
