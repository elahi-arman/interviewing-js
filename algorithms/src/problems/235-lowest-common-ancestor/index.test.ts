import { NumberTreeNode, TreeNode } from "../../helpers/binary-tree";
import { TestCases } from "../../../types";
import { lca } from ".";

describe("235 - lowest common ancestor", () => {
  const testCases: TestCases<[Array<number | null>, number, number], number> = [
    {
      input: [[6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], 2, 4],
      output: 2,
    },
    {
      input: [[6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], 2, 8],
      output: 6,
    },
    {
      input: [[2, 1], 2, 1],
      output: 2,
    },
  ];

  for (const tc of testCases) {
    const [inputArray, p, q] = tc.input;
    const tree = TreeNode.buildCompleteBinaryTreeFromArray(inputArray);
    expect(tree).not.toBeNull();

    let pNode: NumberTreeNode, qNode: NumberTreeNode;
    tree!.inOrderTraversal((v) => {
      if (v.val === p) {
        pNode = v;
      } else if (v!.val === q) {
        qNode = v;
      }
    });

    expect(pNode!).not.toBeNull();
    expect(qNode!).not.toBeNull();
    const ancestor = lca(tree!, pNode!, qNode!);
    expect(ancestor?.val).toEqual(tc.output);
  }
});
