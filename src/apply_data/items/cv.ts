import { getDocShema, MAX_FILE_SIZE } from "../../doc";
import { ApplyDataOptions } from "../types";

export const options: ApplyDataOptions = {
  required: true,
  formRequired: "require",
  key: "avatar",
  schema({ $t }) {
    const schema = getDocShema({
      $t,
      types: ["application/pdf"],
      maxSize: MAX_FILE_SIZE,
      errorMessage: $t("apply.items.cv.errors.required"),
      errorTypeMessage: $t("apply.items.avatar.errors.type"),
      errorMaxSizeMessage: $t("apply.items.cv.errors.size"),
    });

    // const schema = z
    //   .any()
    //   .refine(
    //     (file) => file !== undefined,
    //     $t("apply.items.cv.errors.required")
    //   )
    //   .refine(
    //     (file) => file?.type === "application/pdf",
    //     $t("apply.items.avatar.errors.type")
    //   )

    //   .refine(
    //     (file) => file?.size <= MAX_FILE_SIZE,
    //     $t("apply.items.cv.errors.size")
    //   );

    return schema;
  },
};

export default options;
