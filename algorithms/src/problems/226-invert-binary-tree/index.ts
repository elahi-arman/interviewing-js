import { TreeNode } from "../../helpers/tree-node";

export function invertTree(
  root: TreeNode<number> | null
): TreeNode<number> | null {
  if (!root) {
    return null;
  }
  let tempChild = root.right;
  root.right = root.left;
  root.left = tempChild;

  invertTree(root.left);
  invertTree(root.right);

  return root;
}
