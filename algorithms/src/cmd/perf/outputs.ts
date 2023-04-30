import * as asciichart from "asciichart";
import { Observations, Percentile } from "./types";

export const chart = (observations: Observations) => {
  const colors = [asciichart.blue, asciichart.green, undefined];
  const config = {
    colors,
    height: 10,
    width: 80,
  };

  const legend: Array<string> = [];
  let timingFactor = 10_000;
  let memoryFactor = 100_000;

  const timingSeries: Array<Array<number>> = [];
  const memorySeries: Array<Array<number>> = [];
  for (const [k, v] of Object.entries(observations)) {
    // ascii charts doesn't do well with numbers that are too small  or too
    // large, so we have to scale the numbers by some factor.
    legend.push(k);
    timingSeries.push(v.timings.map((n) => n * timingFactor));
    memorySeries.push(v.memory.map((n) => n / memoryFactor));
    // console.log(memorySeries);
  }

  console.log("TIME\n---\n");
  console.log(asciichart.plot(timingSeries, config));

  console.log("\nMEMORY\n---");
  console.log(asciichart.plot(memorySeries, config));

  console.log("\nLEGEND\n---");
  for (let i = 0; i < legend.length; i++) {
    console.log(colors[i], `┈┈┈┈ ${legend[i]}`, asciichart.reset);
  }
};

export const csv = (
  observations: Observations,
  percentilesMeasured: Array<Percentile>
) => {
  console.log(
    [
      "function",
      "measurement_type",
      ...percentilesMeasured.map((x) => `${x}_percentile`),
    ].join(",")
  );
  for (const [k, v] of Object.entries(observations)) {
    console.log([k, "timings", ...v.timings].join(","));
    console.log([k, "memory", ...v.memory].join(","));
  }
};

export const json = (
  observations: Observations,
  percentilesMeasured: Array<Percentile>
) => {
  console.log(
    JSON.stringify({
      metadata: {
        percentiles: percentilesMeasured,
      },
      observations,
    })
  );
};
