import { ApplyDataOptions } from "../types";

export const options: ApplyDataOptions = {
  key: "motivation",
  schema({ $t }) {
    const schema = z
      .string($t("apply.items.motivation.errors.invalid"))
      .optional();

    return schema;
  },
};

export default options;
