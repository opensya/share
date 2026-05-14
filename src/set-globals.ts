import lodash from "lodash";
import * as zod from "zod";
import type { ApplyDataOptions } from "./apply_data";

globalThis._ = lodash;
globalThis.z = zod;

declare global {
  // @ts-ignore
  var _: typeof import("lodash");
  var z: typeof import("zod");

  var apiBaseUrl: string;
  var applyDataOptionsList: (ApplyDataOptions & { key: string })[];
}

export {};
