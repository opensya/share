import * as z from "zod";
import { ConfigCurrency } from "./types";
import { getDocShema } from "@share/doc";

["config", "logo"];

export function getConfigSchema($t: (string: string) => string) {
  const logo = getDocShema({
    $t,
    types: ["image/jpeg", "image/png", "image/webp"],
    errorMaxSizeMessage: $t("config.items.errors.logo.max"),
    errorTypeMessage: $t("config.items.errors.logo.invalid"),
  })
    .nullable()
    .optional();

  const favicon = getDocShema({
    $t,
    types: ["image/jpeg", "image/png", "image/webp", "image/ico"],
    errorMaxSizeMessage: $t("config.items.errors.favicon.max"),
    errorTypeMessage: $t("config.items.errors.favicon.invalid"),
  })
    .nullable()
    .optional();

  const name = z.string($t("config.items.orgName.errors.invalid"));

  const currency = z
    .enum(ConfigCurrency, $t("config.items.currency.errors.invalid"))
    .optional();

  const cityId = z
    .any()
    .refine(async (v) => {
      const id = Number(v);
      if (Number.isNaN(id)) return false;

      //   const runtime = useRuntimeConfig();
      //   const area = await $fetch(`${runtime.public.areaCompletionUrl}/${id}`);

      //   if (!area) return false;
      return true;
    }, $t("config.items.cities.errors.id_invalid"))
    .transform((value) => String(value));

  const cities = z
    .array(cityId, $t("config.items.cities.errors.invalid"))
    .optional();

  const colorModeEnum = z.enum(
    ["dark", "light"],
    $t("config.items.colorMode.errors.invalid")
  );

  const colorMode = colorModeEnum.optional();

  const colorEnum = z.enum(
    [
      "red",
      "orange",
      "amber",
      "yellow",
      "lime",
      "green",
      "emerald",
      "teal",
      "cyan",
      "sky",
      "blue",
      "indigo",
      "violet",
      "purple",
      "fuchsia",
      "pink",
      "rose",
    ],
    $t("config.items.primary.errors.invalid")
  );
  const primaryColor = colorEnum.nullable().optional();

  const language = z
    .enum(["fr"], $t("config.items.primary.errors.invalid"))
    .default("fr");

  const schema = z.object({
    logo,
    name,
    colorMode,
    primaryColor,
    favicon,

    // language,
    // currency,
    // cities,
  });

  return {
    schema,
    logo,
    favicon,
    name,
    currency,
    cities,
    colorMode,
    primaryColor,
    language,
    colorEnum,
    colorModeEnum,
  };
}
