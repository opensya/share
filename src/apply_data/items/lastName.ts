import { ApplyDataOptions } from "../types";

export const options: ApplyDataOptions = {
  required: true,
  formRequired: "require",
  key: "lastName",
  schema({ $t }) {
    const schema = z
      .string($t("apply.items.lastName.errors.required"))
      .min(2, $t("apply.items.lastName.errors.required"));

    return schema;
  },
};

export default options;
