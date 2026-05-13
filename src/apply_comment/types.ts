import type { Types } from "mongoose";
import { output } from "zod";
import { getApplyCommentSchema } from "./schema";
import { WithMetas } from "@share/types/metas";

const { schema: _schema, author } = getApplyCommentSchema((str: string) => str);
const schema = _schema.extend({ author });

export type ApplyCommentSchema = output<typeof schema> & {
  applyID: Types.ObjectId;
};

export type ApplyComment = WithMetas<ApplyCommentSchema>;
