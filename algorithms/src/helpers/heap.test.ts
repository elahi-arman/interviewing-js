import { Heap } from "./heap";

const cmp = (a: number, b: number) => a < b;

describe("heap", () => {
  const testCases = [
    {
      input: [1, 4, 6],
      output: [1, 4, 6],
    },
    {
      input: [4, 6, 1],
      output: [1, 6, 4],
    },
    {
      input: [8, 3, 5, 1, 2],
      output: [1, 2, 5, 8, 3],
    },
  ];

  for (const tc of testCases) {
    let description = tc.input.join(" <--> ");
    it(description, () => {
      const h = new Heap(cmp);

      for (const i of tc.input) {
        h.insert(i);
      }

      expect(h.debug()).toEqual(tc.output);
    });
  }
});
