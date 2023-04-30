import * as fs from "node:fs/promises";
import * as path from "node:path";
import { performance, PerformanceObserver } from "node:perf_hooks";
import { exit, getConfig } from "../utils";
import {
  Config,
  ModuleFile,
  Observations,
  RunOptions,
  Percentile,
} from "./types";
import { chart, csv, json } from "./outputs";

/**
 * @module perf
 * @description Runs all functions inside the specified problem module and charts out
 *              the percentiles described in the MEASURED_PERCENTILES variable
 * @example     pnpm run perf 235-lowest-common-ancestor
 *
 */

const defaultConfig = {
  output: "chart",
  baseDir: path.resolve(__dirname, "..", ".."),
  percentiles: Array(100)
    .fill(0)
    .map((_, i) => i),
  iterations: 100,
};

const main = async () => {
  const config = (await getConfig(
    defaultConfig,
    "PERF_FILE",
    "./perf.config.json"
  )) as Config;

  const [module, options] = await getModule(
    path.join(config.baseDir, process.argv[2])
  );
  const observations = await observe(await module, options, config.iterations);
  const percentiled: Observations = {};
  for (const [k, v] of Object.entries(observations)) {
    percentiled[k] = {
      timings: toPercentile(v.timings, config.percentiles),
      memory: toPercentile(v.memory, config.percentiles),
    };
  }

  switch (config.output) {
    case "csv":
      return csv(percentiled, config.percentiles);
    case "chart":
      return chart(percentiled);
    case "json":
      return json(percentiled, config.percentiles);
  }
};

const getModule = async (
  directoryPath: string,
  moduleFileName = "index.js"
): Promise<[Promise<ModuleFile>, RunOptions]> => {
  // verify directory exists
  try {
    if (!(await fs.stat(directoryPath)).isDirectory()) {
      exit(`base directory path is not a directory: ${directoryPath}`);
    }
  } catch (err: any) {
    if (err.code === "ENOENT") {
      exit(`no directory found at ${directoryPath}`);
    }
  }

  // verify configuration file exists
  let runOptions: RunOptions | undefined;
  let runOptionsFile = path.join(directoryPath, "perf.config.js");
  try {
    runOptions = await import(runOptionsFile);
    if (!Array.isArray(runOptions?.input)) {
      exit(
        `exported input member in file ${runOptionsFile} must be an array but received ${typeof runOptions?.input} instead`
      );
    }
  } catch (err: any) {
    if (err.code === "MODULE_NOT_FOUND") {
      exit(
        `no file for function inputs was found. expected ${runOptionsFile} to exist`
      );
    }
  }

  // verify module can be resolved
  const moduleFilePath = path.join(directoryPath, moduleFileName);
  try {
    if (!(await fs.stat(moduleFilePath)).isFile()) {
      exit(`${moduleFilePath} is not a file`);
    }
  } catch (err: any) {
    if (err.code === "ENOENT") {
      exit(
        `module file was not found ${moduleFilePath} and no index.js exists`
      );
    }
  }

  // because exit exits the program, runOptions should always be defined
  return Promise.all([import(moduleFilePath), runOptions!]);
};

const toPercentile = (
  values: Array<number>,
  percentiles: Array<number>
): Array<number> => {
  const numericSort = (a: number, b: number) => a - b;
  const sorted = values.slice();
  sorted.sort(numericSort);

  const p = [...percentiles];
  p.sort(numericSort);

  const mapped = [];
  for (let i = 0; i < percentiles.length; i++) {
    const percentile = percentiles[i];
    const index = Math.floor(values.length * (percentile / 100));
    mapped.push(sorted[index]);
  }

  return mapped;
};

const observe = async (
  module: ModuleFile,
  options: RunOptions,
  iterations: number
): Promise<Observations> => {
  // TODO: test what happens when we have multiple PerformanceObserver
  // instead of having a single one. The code may end up cleaner because
  // we don't have to pipe the name of the function everywhere.
  return new Promise<Observations>((resolve) => {
    let functionsTested = Object.keys(module);

    // items is the list of performance events. because we set
    // buffered=true when calling perfObserver.observe(), items
    // will contain _all_ the performance events
    const perfObserver = new PerformanceObserver((items) => {
      const observations: Observations = {};
      for (const fn of functionsTested) {
        const timings = items
          .getEntriesByName(`${fn}-timing`)
          .map((item) => item.duration);

        const memory = items
          .getEntriesByName(`${fn}-memory`)
          .map((item) => (item.detail as NodeJS.MemoryUsage).heapUsed);

        observations[fn] = {
          timings,
          memory,
        };
      }

      resolve(observations);
    });

    for (const [name, fn] of Object.entries(module)) {
      // although we believe the module only has functions based on types
      // it's fake news, so verify at runtime as well
      if (typeof fn !== "function") {
        continue;
      }

      for (let i = 0; i < iterations; i++) {
        // tried to user timerify, but it puts measurements under the
        // function entryType but doesn't allow us to specify a detail
        // parameter that allows observations to be annotated with
        // the name of the function
        performance.mark(`${name}-start`);
        fn(...options.input);
        performance.measure(`${name}-memory`, {
          detail: process.memoryUsage(),
        });
        performance.mark(`${name}-end`);

        performance.measure(`${name}-timing`, `${name}-start`, `${name}-end`);
        perfObserver.observe({
          entryTypes: ["measure"],
          buffered: true,
        });
      }
    }
  });
};

main();
