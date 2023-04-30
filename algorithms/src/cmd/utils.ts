import * as path from "node:path";
import * as fs from "node:fs/promises";

/**
 * @function getConfig
 * @param {T} defaultConfig an object whose shape defines the config object you want
 * @param {string} env the name of the environment variable pointing to a configuration file for this module
 * @param {string} defaultFileName the default file path to look for a configuration file in
 *
 * @returns {Promise<T>} a fully filled out config object. if there were any changes, they'll be merged to the defaultji
 */
export const getConfig = async <T>(
  defaultConfig: T,
  env: string,
  defaultFileName: string
): Promise<T> => {
  let config = defaultConfig;
  const configFileEnv = process.env[env];
  let configFile = configFileEnv || path.join(".", defaultFileName);
  try {
    const f = await fs.readFile(configFile, "utf-8");
    const userConfig: Partial<T> = JSON.parse(f);
    config = {
      ...defaultConfig,
      ...userConfig,
    };
  } catch (err: any) {
    if (err instanceof SyntaxError) {
      console.warn(`${configFile} could not be parsed as JSON`);
    } else if (err.message === "ENOENT" && configFileEnv) {
      console.warn(
        `Could not find perf file at ${configFileEnv} but one was specified.`
      );
    }
  }

  return config;
};

/**
 * @function exit
 * @description Logs an error message and exits the process.
 * @param {string} message what to print to console
 * @param {number} exitCode the exit code for this program
 *
 * @returns never;
 */
export const exit = (message: string, exitCode: number = 1): never => {
  console.error(message);
  return process.exit(exitCode);
};
