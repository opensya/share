import { ApplyDataOptions } from "../types";

export const options: ApplyDataOptions = {
  key: "email",
  required: true,
  formRequired: "require",
  schema({ $t }) {
    const schema = z.email($t("apply.items.email.errors.invalid"));

    return schema;
  },
};

export default options;
