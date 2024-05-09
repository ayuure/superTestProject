/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  baseUrl: "https://simple-books-api.glitch.me",
  detectOpenHandles: true,
  //yarntestMatch:["**/**/*test.ts"],
  //verbose:true,
  //forceExit:true,
  // clearMocks:true
};
// export const baseUrl = "https://simple-books-api.glitch.me";
