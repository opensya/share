import * as z from "zod";
import { ApplyDataConfig, ApplyDataUploadOptions } from "./types";
import { getDocShema } from "@share/doc";

export function getApplyDataSchema({
  $t,
  applyDataConfigs,
}: {
  $t: (str: string) => string;
  applyDataConfigs: ApplyDataConfig;
}) {
  applyDataConfigs ||= {};

  const keys = Object.keys(applyDataConfigs);
  const useApllyData = applyDataOptionsList.filter(
    (a) => a.required || keys.includes(a.key)
  );

  const schemas: Record<string, z.ZodType<any>> = {};

  for (const dataOptions of useApllyData) {
    const key = dataOptions.key;
    const require = dataOptions.formRequired || applyDataConfigs[key] || "use";

    let schema = dataOptions.schema({ $t });
    if (require === "use") {
      const meta = schema.meta();
      schema = schema.optional().meta(meta ?? {});
    }

    schemas[key] = schema;
  }

  return z.object(schemas);
}

export function getApplyDataUploadOptions({
  $t,
  applyDataConfigs,
}: {
  $t: (str: string) => string;
  applyDataConfigs: ApplyDataConfig;
}) {
  applyDataConfigs ||= {};

  const keys = Object.keys(applyDataConfigs);
  const useApllyData = applyDataOptionsList.filter(
    (a) => a.required || keys.includes(a.key)
  );

  const docSchema = getDocShema({ $t });
  const uploadOptions: Record<string, ApplyDataUploadOptions> = {};

  for (const dataOptions of useApllyData) {
    let schema = dataOptions.schema({ $t }) as typeof docSchema;

    const meta = schema.meta();
    if (!meta?._IS_DOC) continue;

    const options = meta._options as any;

    uploadOptions[dataOptions.key] = options;
  }

  return uploadOptions;
}

export function ApplyDataOptionsList({
  $t,
  applyDataConfigs,
}: {
  $t: (str: string) => string;
  applyDataConfigs: ApplyDataConfig;
}) {
  applyDataConfigs ||= {};

  const keys = Object.keys(applyDataConfigs);
  const useApllyData = applyDataOptionsList.filter(
    (a) => a.required || keys.includes(a.key)
  );

  return useApllyData;
}
