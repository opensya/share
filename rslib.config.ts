import { defineConfig } from "@rslib/core";

const autoExternal = {
  dependencies: true,
  peerDependencies: true,
  optionalDependencies: true,
  devDependencies: true,
};

export default defineConfig({
  source: {
    tsconfigPath: "./tsconfig.build.json",
  },

  lib: [
    {
      format: "esm",
      syntax: "es2020",
      dts: true,
      bundle: false,
      autoExternal,
    },
    {
      format: "cjs",
      syntax: "es2020",
      dts: true,
      bundle: false,
      autoExternal,
    },
  ],
});
