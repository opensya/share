import { ApplyDataOptions } from "../types";

export const options: ApplyDataOptions = {
  required: true,
  formRequired: "require",
  key: "firstName",
  schema({ $t }: { $t: (str: string) => string }) {
    const schema = z
      .string($t("apply.items.firstName.errors.required"))
      .min(2, $t("apply.items.firstName.errors.min"));

    return schema;
  },
};

export default options;
