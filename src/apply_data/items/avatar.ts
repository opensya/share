import { getDocShema } from "@share/doc";
import { ACCEPTED_AVATAR_TYPES, MAX_FILE_SIZE } from "../../doc";
import { ApplyDataOptions } from "../types";

export const options: ApplyDataOptions = {
  key: "avatar",
  schema({ $t }) {
    const schema = getDocShema({
      $t,
      types: ACCEPTED_AVATAR_TYPES,
      maxSize: MAX_FILE_SIZE,
      errorTypeMessage: $t("apply.items.cv.errors.type"),
      errorMaxSizeMessage: $t("apply.items.avatar.errors.size"),
    });

    return schema;
  },
};

export default options;
