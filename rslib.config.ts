import { defineConfig } from "@rslib/core";

export default defineConfig({
  lib: [
    {
      source: {
        entry: {
          index: "./src/index.ts",
        },
      },
      format: "esm",
      syntax: "es2020",
      dts: true,
      autoExternal: {
        dependencies: true,
        peerDependencies: true,
        optionalDependencies: true,
        devDependencies: true,
      },
    },
    {
      source: {
        entry: {
          index: "./src/index.ts",
        },
      },
      format: "cjs",
      syntax: "es2020",
      dts: true,
      autoExternal: {
        dependencies: true,
        peerDependencies: true,
        optionalDependencies: true,
        devDependencies: true,
      },
    },
  ],

  output: {
    externals: {
      "@babel/core": "@babel/core",
      "@babel/parser": "@babel/parser",
      "@babel/traverse": "@babel/traverse",
      "@babel/types": "@babel/types",
      "node:module": "node:module",
      module: "module",
      fs: "fs",
      path: "path",
    },
  },
});
