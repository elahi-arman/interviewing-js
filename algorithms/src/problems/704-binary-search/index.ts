// once search space is small enough, it's quicker to use a for loop
// MIN_SPLIT_SIZE is this point
const MIN_SPLIT_SIZE = 3;

/**
 * @function searchRecursively
 * @description performs a binary search using recursion
 * @returns index of the target or -1 if it doesn't exist
 */
export const searchRecursively = (nums: number[], target: number): number => {
  // prevents infinite loops and ensures that algorithm runs in O(log n) time
  let iterations = 0;
  const maxIterations = Math.log2(nums.length);

  const search = (start: number, end: number): number => {
    if (iterations++ > maxIterations) {
      throw new Error("Exceeded max iteration count");
    }

    const size = end - start;
    if (size <= MIN_SPLIT_SIZE) {
      for (let i = 0; i < 3; i++) {
        if (nums[start + i] === target) {
          return start + i;
        }
      }
      return -1;
    }

    const midpoint = start + Math.floor(size / 2);
    const middle = nums[midpoint];

    if (middle === target) {
      return midpoint;
    } else if (middle > target) {
      return search(start, midpoint);
    } else {
      return search(midpoint, end);
    }
  };

  return search(0, nums.length);
};
