/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testTimeout: 5,
  detectLeaks: true,
  detectOpenHandles: true,
  rootDir: "src/",
};
