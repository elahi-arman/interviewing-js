import { TestCases } from "../../../types";
import { Grid, floodFill } from ".";

describe("733 - flood fill", () => {
  const testCases: TestCases<[Grid, number, number, number], Grid> = [
    {
      input: [
        [
          [1, 1, 1],
          [1, 1, 0],
          [1, 0, 1],
        ],
        1,
        1,
        2,
      ],
      output: [
        [2, 2, 2],
        [2, 2, 0],
        [2, 0, 1],
      ],
    },
    {
      input: [
        [
          [0, 0, 0],
          [0, 0, 0],
        ],
        0,
        0,
        0,
      ],
      output: [
        [0, 0, 0],
        [0, 0, 0],
      ],
    },
  ];

  for (const tc of testCases) {
    const [grid, sr, sc, color] = tc.input;
    let description = `(${sr}, ${sc}) => ${color}`;
    it(description, () => {
      expect(floodFill(grid, sr, sc, color)).toEqual(tc.output);
    });
  }
});
