export interface TestCase<T, U> {
  description?: string;
  input: T;
  output: U;
}

export type TestCases<T, U> = Array<TestCase<T, U>>;
