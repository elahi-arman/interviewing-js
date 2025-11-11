import { NumberTreeNode } from "../../helpers/binary-tree";

export function lca(
  root: NumberTreeNode | null,
  p: NumberTreeNode | null,
  q: NumberTreeNode | null
): NumberTreeNode | null {
  if (p === null || q === null || root === null) {
    return root;
  }
  const __lca: typeof lca = (r, lower, higher) => {
    if (!lower || !higher || !r) {
      return root;
    }

    if (lower.val > r.val) {
      return __lca(r.right, lower, higher);
    } else if (higher.val < r.val) {
      return __lca(r.left, lower, higher);
    }

    return r;
  };

  // normalize into higher and lower value because there's no guarantee that
  // p < q but our lca depends on that fact
  const [lower, higher] = p.val <= q.val ? [p, q] : [q, p];
  return __lca(root, lower, higher);
}

export function lcaI(
  root: NumberTreeNode | null,
  p: NumberTreeNode | null,
  q: NumberTreeNode | null
): NumberTreeNode | null {
  if (p === null || q === null || root === null) {
    return root;
  }

  let current: ReturnType<typeof lcaI> = root;
  const [lower, higher] = p.val <= q.val ? [p, q] : [q, p];
  while (current) {
    if (lower.val > current.val) {
      current = current.right;
    } else if (higher.val < current.val) {
      current = current.left;
    } else {
      break;
    }
  }

  return current;
}
