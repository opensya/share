import * as z from "zod";
import { ACCEPTED_AVATAR_TYPES, getDocShema } from "@share/doc";

export const USER_ROLES = ["admin", "recruiter", "guest"] as const;

export function getUserShema($t: (string: string) => string) {
  const avatar = getDocShema({ $t, types: ACCEPTED_AVATAR_TYPES }).optional();

  const active = z.boolean($t("user.items.active.errors.invalid")).optional();
  const role = z.enum(USER_ROLES, $t("user.items.role.errors.invalid"));
  const email = z.email($t("user.items.email.errors.invalid"));

  const firstName = z
    .string($t("user.items.firstName.errors.required"))
    .min(2, $t("user.items.firstName.errors.min"))
    .max(50, $t("user.items.firstName.errors.max"));
  const lastName = z
    .string($t("user.items.lastName.errors.required"))
    .min(2, $t("user.items.lastName.errors.min"))
    .max(50, $t("user.items.lastName.errors.max"));

  const password = z
    .string($t("password.items.password.errors.required"))
    .regex(/.{8,}/, "Minimum 8 caractères")
    .regex(/\d/, "Au moins un chiffre")
    .regex(/[a-z]/, "Au moins une lettre minuscule")
    .regex(/[A-Z]/, "Au moins une lettre majuscule");

  const passwordEdit = z
    .object({
      password,
      passwordRepeat: z.string(
        $t("password.items.passwordRepeat.errors.required")
      ),
    })
    .superRefine((data, ctx) => {
      if (data.password !== data.passwordRepeat) {
        ctx.addIssue({
          code: "custom",
          message: "Passwords do not match",
          path: ["passwordRepeat"],
        });
      }
    });

  const schema = z.object({
    email,
    role,
    firstName,
    lastName,
    avatar,
    active,
  });

  return {
    avatar,
    role,
    email,
    firstName,
    lastName,
    password,
    passwordEdit,
    active,
    schema,
  };
}
