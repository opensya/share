import { ApplyDataOptions } from "../apply_data";

declare global {
  var API_BASE_URL: string;
  var applyDataOptionsList: (ApplyDataOptions & { key: string })[];
  var z: typeof import("zod");
  // var _: typeof import("lodash");
}
