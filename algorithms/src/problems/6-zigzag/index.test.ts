import { zigzag } from ".";

describe("6 - zigzag", () => {
  const testCases: Array<{ input: [string, number]; output: string }> = [
    {
      input: ["A", 3],
      output: "A",
    },
    {
      input: ["AB", 1],
      output: "AB",
    },
    {
      input: ["AZEXIYOTUW", 2],
      output: "AEIOUZXYTW",
    },
    {
      input: ["PAYPALISHIRING", 3],
      output: "PAHNAPLSIIGYIR",
    },
  ];

  for (const tc of testCases) {
    let description = `${tc.input[0]} --> ${tc.output}`;
    it(description, () => {
      const [str, rows] = tc.input;
      const output = zigzag(str, rows);
      expect(output).toBe(tc.output);
    });
  }
});
