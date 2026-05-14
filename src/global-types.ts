import type { ApplyDataOptions } from "./apply_data";

declare global {
  // @ts-ignore
  var _: typeof import("lodash");
  var z: typeof import("zod");

  var apiBaseUrl: string;
  var applyDataOptionsList: (ApplyDataOptions & { key: string })[];
}

export {};
