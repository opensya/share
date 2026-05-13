import * as z from "zod";
import { ACCEPTED_AVATAR_TYPES, getDocShema } from "@share/doc";

export function getApplyCommentSchema($t: (string: string) => string) {
  const comment = z.string($t("apply_comment.items.errors.invalid_type"));

  const avatar = getDocShema({ $t, types: ACCEPTED_AVATAR_TYPES });

  const author = z.union([
    z.object({ user: z.string() }),
    z.object({ candidate: z.string() }),
    z.object({
      author: z.object({
        name: z.string().optional(),
        email: z.email().optional(),
        avatar,
      }),
    }),
  ]);

  const schema = z.object({ comment });

  return { comment, author, schema };
}
