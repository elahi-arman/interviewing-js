import { TreeNode } from "../../helpers/tree-node";

const tree = TreeNode.buildCompleteBinaryTreeFromArray([
  6,
  2,
  8,
  0,
  4,
  7,
  9,
  null,
  null,
  3,
  5,
]);

if (tree === null) {
  console.log(
    "Tree created was null, cannot run performance tests on null tree"
  );
  process.exit(1);
}

let pNode, qNode;
tree.inOrderTraversal((v) => {
  if (v.val === 2) {
    pNode = v;
  } else if (v.val === 4) {
    qNode = v;
  }
});

export const input = [tree, pNode, qNode];
