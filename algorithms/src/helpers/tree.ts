type TraversalFunction<T> = (node: Tree<T>) => void;

export class Tree<T> {
  val: T;
  children: Array<Tree<T>>;

  constructor(val: T) {
    this.val = val;
    this.children = [];
  }

  /**
   * @function depthOrderTraversal
   * @param {TraversalFunction} fn - the function to be executed on each node
   * @description traverses the tree by depth order
   */
  depthOrderTraversal(fn: TraversalFunction<T>): void {
    let queue: Array<Tree<T> | null> = [this];
    let i = 0;
    for (let n = queue.shift(); n; n = queue.shift()) {
      fn(n);
      for (const child of n.children) {
        queue.push(child);
      }
    }
  }
}
