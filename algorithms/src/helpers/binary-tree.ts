/**
 * Definition of a TreeNode from leet code
 */

type TraversalFunction<T> = (node: TreeNode<T>) => void;
export type NumberTreeNode = TreeNode<number>;
export class TreeNode<T> {
  val: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
  constructor(val: T, left?: TreeNode<T> | null, right?: TreeNode<T> | null) {
    this.val = val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }

  /**
   * @static
   * @function buildCompleteBinaryTreeFromArray
   * @description builds a completely filled tree from an array. this does not work
   *              if the tree is not perfectly balanced (like a heap)
   */
  static buildCompleteBinaryTreeFromArray<T>(
    input: Array<T | null>
  ): TreeNode<T> | null {
    const nodes = input.map((v) => new TreeNode(v));
    const depth = Math.floor(Math.log2(input.length));

    for (let i = 0; i <= Math.pow(2, depth); i++) {
      const leftIndex = 2 * i + 1;
      const rightIndex = 2 * i + 2;

      if (leftIndex > input.length) {
        break;
      }

      if (nodes[leftIndex]?.val ?? null) {
        nodes[i].left = nodes[leftIndex];
      }

      if (nodes[rightIndex]?.val ?? null) {
        nodes[i].right = nodes[rightIndex];
      }
    }
    return (nodes[0] as TreeNode<T>) ?? null;
  }

  /**
   * @function toValueArray
   * @description returns all values in the tree
   */
  toValueArray(): Array<T> {
    const arr: Array<T> = [];
    this.hierarchicalTraversal((v) => arr.push(v.val));
    return arr;
  }

  /**
   * @function hierarchicalTraversal
   * @param {TraversalFunction} fn - the function to be executed on each node
   * @description traverses the tree by depth order
   */
  hierarchicalTraversal(fn: TraversalFunction<T>): void {
    let queue: Array<TreeNode<T> | null> = [this];
    let i = 0;
    while (queue.length !== 0) {
      const n = queue.shift();
      if (!n) {
        return;
      }

      fn(n);
      if (n.left) {
        queue.push(n.left);
      }
      if (n.right) {
        queue.push(n.right);
      }
    }
  }

  inOrderTraversal(fn: TraversalFunction<T>): void {
    fn(this);
    if (this.left) {
      this.left.inOrderTraversal(fn);
    }

    if (this.right) {
      this.right.inOrderTraversal(fn);
    }
  }

  preOrderTraversal(fn: TraversalFunction<T>): void {
    if (this.left) {
      this.left.inOrderTraversal(fn);
    }

    fn(this);

    if (this.right) {
      this.right.inOrderTraversal(fn);
    }
  }

  postOrderTraversal(fn: TraversalFunction<T>): void {
    if (this.right) {
      this.right.inOrderTraversal(fn);
    }

    fn(this);

    if (this.left) {
      this.left.inOrderTraversal(fn);
    }
  }
}
