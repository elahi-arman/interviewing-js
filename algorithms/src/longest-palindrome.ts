import { isPalindrome } from "./problems/125-palindrome";

const outwardExpansion = (
  start: number,
  end: number,
  s: string,
  previous: string
): string => {
  return start >= 0 && end <= s.length && isPalindrome(s.substring(start, end))
    ? outwardExpansion(start - 1, end + 1, s, s.substring(start, end))
    : previous;
};

const expandPalindrome = (start: number, end: number, s: string): string => {
  let expansion = s.substring(start, end);
  const bound = Math.min(start, s.length - end);
  for (let i = 1; i <= bound; i++) {
    const next = s.substring(start - i, end + i);
    if (isPalindrome(next)) {
      expansion = next;
    } else {
      break;
    }
  }
  return expansion;
};

function longestPalindrome(s: string): string {
  if (s.length < 2) {
    return s[0];
  }

  let palindrome = "";
  for (let i = 0; i < s.length - 1; i++) {
    let p;
    let substring = s.substring(i, i + 2);
    if (isPalindrome(substring)) {
      // p = expandPalindrome(i, i + 2, s);
      p = outwardExpansion(i - 1, i + 3, s, substring);
      palindrome = palindrome.length > p.length ? palindrome : p;
    }

    if (i < s.length - 2) {
      substring = s.substring(i, i + 3);
      if (isPalindrome(substring)) {
        p = expandPalindrome(i, i + 3, s);
        // p = outwardExpansion(i - 1, i + 4, s, substring);
        palindrome = palindrome.length > p.length ? palindrome : p;
      }
    }
  }

  return palindrome === "" ? s[0] : palindrome;
}
