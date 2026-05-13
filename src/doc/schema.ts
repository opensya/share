import { $fetch } from "ofetch";
import { getApiUrl, isBrowser } from "@share/env";

export function getDocShema({
  $t = (v) => v,
  types,
  maxSize = 10,
  errorMessage,
  errorTypeMessage,
  errorMaxSizeMessage,
  existsOnDatabase = true,
}: {
  $t?: (string: string) => string;
  existsOnDatabase?: boolean;
  types?: string[];
  maxSize?: number;
  errorMessage?: string;
  errorTypeMessage?: string;
  errorMaxSizeMessage?: string;
}) {
  maxSize = maxSize * 1024 * 1024;
  errorTypeMessage ??= $t("uploads.errors.type");
  errorMaxSizeMessage ??= $t("uploads.errors.type");

  const meta = {
    _options: {
      _IS_DOC: true,
      types,
      maxSize,
      errorMessage,
      errorTypeMessage,
      errorMaxSizeMessage,
    },
  };

  z.custom<{ filename: string }>((data: any) => {
    if ("name" in data) return { filename: data.name };
    return data as { filename: string };
  });

  let object = z.object(
    {
      id: z.string().optional(),

      filename: z.string(),

      type: types?.length
        ? z.enum(types, errorTypeMessage)
        : z.string(errorTypeMessage),

      size: z.number().min(0).max(maxSize, errorMaxSizeMessage),

      _IS_DOC: z
        .boolean()
        .optional()
        .default(true)
        .refine((d) => true),

      data: z.any(),

      url: z.url().optional(),
    },
    errorMessage
  );

  if (existsOnDatabase) {
    object = object.refine(async (doc) => {
      if (!isBrowser()) {
        if (!doc.id) return false;

        const is = await $fetch(`doc/${doc.id}/exists`, {
          baseURL: getApiUrl(),
        });
        return is;
      }

      return true;
    }, errorTypeMessage);
  }

  const file = z.file(errorMessage).max(maxSize);
  if (types?.length) file.mime(types);

  let schema = isBrowser() ? z.union([file, object]) : object;
  schema = schema.meta(meta);

  return schema as typeof object;
}
