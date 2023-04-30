interface NodeType<T> {
  data: T;
  next: NodeType<T> | null;
}

const Node = function <T>(data: T, next?: NodeType<T> | null): NodeType<T> {
  return {
    data,
    next: next ?? null,
  };
};

export const List = function <T>() {
  type TNode = NodeType<T>;
  let head: TNode | null = null;
  return {
    head,

    insertHead: (data: T): TNode => {
      if (head === null) {
        head = Node(data);
      } else {
        let temp = Node(data, head);
        head = temp;
      }

      return head;
    },

    /**
     * @function insertSorted
     * @param {T} data - the new data to be insrted
     * @param {function} compareNodes - takes the data of two nodes, returns -1 if a < b, 0 if equal, and 1 if a > b
     * @returns {TNode} the newly inserted node
     */
    insertSorted: (data: T, compareNodes: (a: T, b: T) => number): TNode => {
      if (head === null) {
        head = Node(data);
        return head;
      } else if (
        head.next &&
        compareNodes(head.data, data) > 1 &&
        compareNodes(head.next.data, data) < 1
      ) {
        const node = Node(data);
        node.next = head.next;
        head.next = node;
        return node;
      }

      let current = head.next!; // null checked above in the else if
      while (current.next !== null) {
        if (compareNodes(current.next.data, data) > 1) {
          if (current.next)
        } else {
        }
      }
    },

    insertTail: (data: T): TNode => {
      let current = head;

      if (current === null) {
        head = Node(data);
        return head;
      }

      while (current.next !== null) {
        current = current.next;
      }

      current.next = Node(data);
      return current.next;
    },

    removeHead: (): TNode | null => {
      let temp = head;
      if (!head) {
        return null;
      }
      head = head.next;
      return temp;
    },

    removeTail: (): TNode | null => {
      let runner = head;
      if (runner === null) {
        return null;
      }
      if (runner.next === null) {
        head = null;
        return runner;
      }

      while (runner?.next?.next !== null) {
        runner = runner!.next;
      }

      let temp = runner.next.next;
      runner.next = null;
      return temp;
    },

    iterate: (fn: (n: TNode) => void): void => {
      let current = head;
      while (current != null) {
        fn(current);
        current = current.next;
      }
    },
  };
};
