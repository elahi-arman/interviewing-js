import { DumbassQueue } from ".";

describe("232 - queue using two stacks", () => {
  const testCases = [
    {
      input: [4, 2, 7, 1, 3, 6, 9],
      output: [4, 2, 7, 1, 3, 6, 9],
    },
  ];

  for (const tc of testCases) {
    let description = tc.input.join(", ");
    it(description, () => {
      const queue = new DumbassQueue();
      for (const i of tc.input) {
        queue.push(i);
      }

      for (let i = 0; !queue.empty(); i++) {
        expect(queue.pop()).toEqual(tc.output[i]);
      }
    });
  }

  it("handles switching directions randomly", () => {
    const queue = new DumbassQueue();
    queue.push(1);
    queue.push(2);

    expect(queue.peek()).toEqual(1);
    queue.push(3);
    expect(queue.peek()).toEqual(1);
    expect(queue.pop()).toEqual(1);
    queue.push(4);

    for (let i = 0; i < 3; i++) {
      expect(queue.pop()).toEqual(i + 2);
    }
  });
});
