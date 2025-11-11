import { TreeNode } from "../../helpers/binary-tree";
import { invertTree } from ".";

describe("226 - invert binary tree", () => {
  const testCases = [
    {
      input: [4, 2, 7, 1, 3, 6, 9],
      output: [4, 7, 2, 9, 6, 3, 1],
    },
    {
      input: [2, 1, 3],
      output: [2, 3, 1],
    },
  ];

  for (const tc of testCases) {
    let description = tc.input.join(", ");
    it(description, () => {
      const tree = TreeNode.buildCompleteBinaryTreeFromArray(tc.input);
      invertTree(tree);
      expect(tree!.toValueArray()).toEqual(tc.output);
    });
  }

  it("should handle an empty tree", () => {
    const tree = TreeNode.buildCompleteBinaryTreeFromArray([]);
    invertTree(tree);
    expect(tree).toEqual(null);
  });
});
