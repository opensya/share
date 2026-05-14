import lodash from "lodash";
import * as zod from "zod";
import { ApplyDataOptions } from "./apply_data";

if (!globalThis._) {
  globalThis._ = lodash;

  _.isArrayString = isArrayString;
  _.sleep = sleep;

  function isArrayString(value: string) {
    try {
      const array = JSON.parse(value) as any[];
      return Array.isArray(array);
    } catch {
      return false;
    }
  }

  async function sleep(time = 500) {
    await new Promise((resolve) => setTimeout(resolve, time));
  }
}

if (!globalThis.z) globalThis.z = zod;

declare global {
  // @ts-ignore
  var _: typeof import("lodash");
  var z: typeof import("zod");

  var apiBaseUrl: string;
  var applyDataOptionsList: (ApplyDataOptions & { key: string })[];
}

declare module "lodash" {
  interface LoDashStatic {
    isArrayString(value?: any): boolean;
    sleep(
      /** @default 500 */
      time?: number
    ): Promise<void>;
  }
}
