import type { WithMetas } from "../types/metas";

export type DocSchema = {
  filename: string;
  type: string;
  data: any; // Buffer;
  size: number;
};

export type Doc = WithMetas<DocSchema & { url?: string; _IS_DOC: boolean }>;

export type Docable = File | DocSchema | Doc | null | undefined;
