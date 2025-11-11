import { isAnagram } from ".";

describe("242 - anagram", () => {
  const testCases = [
    {
      input: ["anagram", "nagaram"],
      output: true,
    },
    {
      input: ["rat", "car"],
      output: false,
    },
  ];

  for (const tc of testCases) {
    let description = tc.input.join(" <--> ");
    it(description, () => {
      const [s, t] = tc.input;
      expect(isAnagram(s, t)).toBe(tc.output);
    });
  }
});
