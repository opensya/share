import { WithMetas } from "@share/types/metas";
import { getJobShema } from "./schema";
import { output } from "zod";

const { schema } = getJobShema();

export type JobSchema = output<typeof schema>;

export type Job = WithMetas<
  JobSchema & {
    _uploadTokens?: Record<string, string>;
  }
>;
