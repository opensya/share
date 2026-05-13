import { ApplyDataOptions } from "../types";

export const options: ApplyDataOptions = {
  key: "desiredGrossSalary",
  schema({ $t }) {
    const schema = z
      .number($t("apply.items.desiredGrossSalary.errors.required"))
      .min(0, $t("apply.items.desiredGrossSalary.errors.invalid"))
      .max(200, $t("apply.items.desiredGrossSalary.errors.invalid"));

    return schema;
  },
};

export default options;
