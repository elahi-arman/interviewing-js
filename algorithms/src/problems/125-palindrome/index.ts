function isValid(c: string): boolean {
  return /[a-zA-Z0-9]/.test(c);
}

export function isPalindrome(s: string): boolean {
  let normalized = "";

  for (let i = 0; i < s.length; i++) {
    if (isValid(s.charAt(i))) {
      normalized += s.charAt(i).toLowerCase();
    }
  }

  // only go halfway through the string since we have a pointer
  // from each end
  const end = normalized.length;
  const midpoint = end % 2 === 0 ? end / 2 : end / 2 + 1;

  for (let i = 0; i < midpoint; i++) {
    if (normalized[i] !== normalized[end - (i + 1)]) {
      return false;
    }
  }

  return true;
}
