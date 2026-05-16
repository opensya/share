import { defineConfig } from "@rslib/core";

export default defineConfig({
  source: {
    tsconfigPath: "./tsconfig.build.json",
  },

  lib: [
    {
      source: {
        entry: {
          index: "./src/index.ts",
          "set-globals": "./src/set-globals.ts",
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
          "set-globals": "./src/set-globals.ts",
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
