import { isPalindrome } from ".";

describe("125 - palindrome", () => {
  const testCases = [
    {
      input: "A man, a plan, a canal: Panama",
      output: true,
    },
    {
      input: "race a car",
      output: false,
    },
    {
      input: " ",
      output: true,
      description: "empty string",
    },
    {
      input: "ab_a",
      output: true,
    },
  ];

  for (const tc of testCases) {
    let description = tc.description || tc.input;
    it(description, () => {
      expect(isPalindrome(tc.input)).toEqual(tc.output);
    });
  }
});
