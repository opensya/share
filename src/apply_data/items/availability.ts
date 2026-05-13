import { ApplyDataOptions } from "../types";

export const availability = [
  "immediately",
  "1month",
  "2mois",
  "3mois",
  "other",
];

export const options: ApplyDataOptions = {
  key: "availability",
  schema({ $t }) {
    const schema = z.enum(
      availability,
      $t("apply.items.availability.errors.required")
    );

    return schema;
  },
};

export default options;
