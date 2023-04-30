import { ListNode } from "../../helpers/list-node";
import { TestCases } from "../../../types";
import { hasCycle } from ".";

describe("141 - linked list cycle", () => {
  const testCases: TestCases<[Array<number>, number], boolean> = [
    {
      input: [[3, 2, 0, -4], 1],
      output: true,
    },
    {
      input: [[0, 1], -1],
      output: false,
    },
  ];

  for (const tc of testCases) {
    const [l, cycle] = tc.input;
    let description =
      tc.description || l.join("->") + "->" + (cycle >= 0 ? `[${cycle}]` : "x");
    it(description, () => {
      const list = ListNode.fromArray(l, {
        cycle: cycle > 0 ? cycle : undefined,
      });
      expect(hasCycle(list)).toEqual(tc.output);
    });
  }
});
