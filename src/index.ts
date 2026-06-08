import "./set-globals";
import type { ApplyDataOptions } from "./apply_data";
import type { LoDashStatic } from "lodash";

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

declare global {
  // @ts-ignore
  var _: LoDashStatic;
  var z: typeof import("zod");

  var apiBaseUrl: string;
  var applyDataOptionsList: (ApplyDataOptions & { key: string })[];
}

declare module "lodash" {
  interface LoDashStatic {
    isArrayString(value?: any): boolean;
    sleep(
      /** @default 500 */
      time?: number,
    ): Promise<void>;
  }
}
