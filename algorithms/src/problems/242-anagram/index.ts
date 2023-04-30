export function isAnagram(s: string, t: string): boolean {
  const letters = new Map<string, number>();
  if (s.length !== t.length) {
    return false;
  }

  for (let i = 0; i < s.length; i++) {
    const c = s.charAt(i).toLowerCase();
    letters.set(c, (letters.get(c) ?? 0) + 1);
  }

  for (let i = 0; i < s.length; i++) {
    const c = t.charAt(i).toLowerCase();
    const count = letters.get(c);
    if (!count || count <= 0) {
      return false;
    }
    letters.set(c, (letters.get(c) ?? 0) - 1);
  }

  return true;
}
