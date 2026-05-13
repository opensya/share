import { WithMetas } from "@share/types/metas";
import type { Types } from "mongoose";
import type { output } from "zod";
import { getApplyShema } from "./schema";

const { schema, status } = getApplyShema((v) => v);

export type ApplySchema = output<typeof schema> & {
  jobID: Types.ObjectId;
  allStatus: { status: output<typeof status>; date: string }[];
};

export type Apply = WithMetas<ApplySchema>;
