import * as z from "zod";

export type ApplyDataOptions = {
  required?: boolean;
  formRequired?: "use" | "require";
  key: string;
  schema(options: { $t(str: string): string }): z.ZodType;
};

export type ApplyDataConfig = Record<string, "use" | "require">;

export type ApplyDataUploadOptions = {
  type?: string[];
  maxSize?: number;
  errorMessage?: string;
  errorTypeMessage?: string;
  errorMaxSizeMessage?: string;
};
