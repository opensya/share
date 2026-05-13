import { ApplyDataOptions } from "../types";

export const options: ApplyDataOptions = {
  required: true,
  formRequired: "require",
  key: "phone",
  schema({ $t }) {
    const schema = z.string($t("apply.items.phone.errors.invalid"));

    return schema;
  },
};

export default options;
