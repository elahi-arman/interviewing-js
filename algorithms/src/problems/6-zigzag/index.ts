const interleave = (s: string): string => {
  let t: Array<string> = [];
  let front = 0;

  for (let i = 0; i < s.length; i += 2) {
    t.splice(front++, 0, s[i]);
    if (i + 1 < s.length) {
      t.push(s[i + 1]);
    }
  }

  return t.join("");
};

export const zigzag = (s: string, numRows: number): string => {
  // handle the easy cases first so the general case doesn't have complex logic
  if (numRows === 1) {
    return s;
  }

  if (numRows === 2) {
    return interleave(s);
  }

  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows[i] = "";
  }

  let stringIndex = 0;
  let rowIndex = 0;
  let isForwardPass = true;
  while (stringIndex < s.length) {
    rows[rowIndex] += s[stringIndex++];

    // IMPLEMENTATION NOTE: the logic made more sense to do
    // explicit bounds checking and then reconciliation instead
    // of carrying around `x - 1` eveywhere. The magic numbers
    // are confined to a single place
    if (isForwardPass) {
      rowIndex++;
      if (rowIndex === numRows) {
        rowIndex = rowIndex - 2;
        isForwardPass = false;
      }
    } else {
      rowIndex--;
      if (rowIndex === -1) {
        rowIndex = 1;
        isForwardPass = true;
      }
    }
  }

  return rows.join("");
};
