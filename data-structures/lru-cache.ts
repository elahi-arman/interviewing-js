interface ListNode<T> {
  key: string;
  value: T;
  next: ListNode<T> | null;
}

const LRUCache = function <T>(maxSize: number) {
  type CacheNode = ListNode<T>;
  let size = 0;
  let head: CacheNode | null = null;

  if (maxSize <= 3) {
    throw new Error("LRU Cache size is too small");
  }

  const get = (key: string): T | null => {
    if (head === null) {
      return null;
    } else if (head.key === key) {
      return head.value;
    }

    let current = head;
    let node: CacheNode | null = null;
    while (current.next !== null) {
      if (current.next.key === key) {
        node = current.next;
        current.next = current.next.next;
        break;
      }
      current = current.next;
    }

    if (node) {
      node.next = head;
      head = node;
      return head.value;
    }

    return null;
  };

  const set = (key: string, value: T): void => {
    const data = get(key);
    if (data) {
      return;
    }

    const node: CacheNode = {
      key,
      value,
      next: head,
    };

    head = node;
    size++;

    if (size === maxSize) {
      let runner = head;
      // since maxSize at least 3, this is safe
      while ((runner?.next?.next ?? null) !== null) {
        // already checked for nullability in while condition
        runner = runner.next as CacheNode;
      }

      if (runner !== null) {
        runner.next = null;
      }
    }
  };

  const iterate = (fn: (n: CacheNode) => void): void => {
    let current = head;
    while (current !== null) {
      fn(current);
      current = current.next;
    }
  };

  const printNode = (n: CacheNode): void => {
    console.log(`${n.key} -> ${n.value}`);
  };

  return { get, set, iterate, printNode };
};

const cache = LRUCache<string>(4);
cache.set("a", "apple");
cache.set("b", "banana");
cache.set("c", "coconut");
cache.set("d", "durian");
cache.set("e", "elderberry");
cache.set("c", "coconut");
console.log("Retrieving A", cache.get("a"));
cache.iterate(cache.printNode);
console.log("Retrieving C", cache.get("c"));
