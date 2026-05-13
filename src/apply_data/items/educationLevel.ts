import { ApplyDataOptions } from "../types";

export const educationLevel = [
  "none",
  "bepCap",
  "baccalaureate",
  "bacPlus2",
  "bacPlus3",
  "bacPlus4",
  "bacPlus5",
  "doctorate",
];

export const options: ApplyDataOptions = {
  key: "educationLevel",
  schema({ $t }) {
    const schema = z.enum(
      educationLevel,
      $t("apply.items.educationLevel.errors.required")
    );

    return schema;
  },
};

export default options;
