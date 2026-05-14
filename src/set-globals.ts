import lodash from "lodash";
import * as zod from "zod";

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
