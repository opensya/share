export * from "./config";
export * from "./user";
export * from "./job";
export * from "./job_user";
export * from "./apply";
export * from "./apply_comment";
export * from "./apply_data";
export * from "./doc";
export * from "./currency";
export * from "./types";
export * from "./utils";

import type { ApplyDataOptions } from "./apply_data";

declare global {
  // @ts-ignore
  var _: typeof import("lodash");
  var z: typeof import("zod");

  var apiBaseUrl: string;
  var applyDataOptionsList: (ApplyDataOptions & { key: string })[];
}
