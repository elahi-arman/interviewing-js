// Enumerate to create valid percentile ranges without typing out every value
// https://stackoverflow.com/a/39495173
type Enumerate<
  N extends number,
  Acc extends number[] = []
> = Acc["length"] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc["length"]]>;

export type Percentile = Exclude<Enumerate<0>, Enumerate<99>> | 99.9 | 99.99;

interface Observation {
  timings: Array<number>;
  memory: Array<number>;
}
export type Observations = Record<string, Observation>;

export interface Config {
  output: "csv" | "chart" | "json";
  baseDir: string;
  percentiles: Array<Percentile>;
  iterations: number;
}

// don't know the type of the module or what it exports until runtime
// so this type must be any
export interface RunOptions {
  input: Array<any>;
}

export interface ModuleFile {
  [key: string]: (...args: any) => any;
}
