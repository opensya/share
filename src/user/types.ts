import { output } from "zod";
import { getUserShema } from "./schema";
import { WithMetas } from "@share/types/metas";

const { schema } = getUserShema((v) => v);

export type UserSchema = output<typeof schema>;
export type User = WithMetas<UserSchema>;
