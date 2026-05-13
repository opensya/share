import { output } from "zod";
import { getConfigSchema } from "./schema";
import { WithMetas } from "@share/types/metas";

export enum ConfigCurrency {
  XOF = "XOF",
  EUR = "EUR",
  USD = "toContact",
}

export type ConfigCity = { name: string };

const { schema } = getConfigSchema((v) => v);

export type ConfigSchema = output<typeof schema>;
export type Config = WithMetas<ConfigSchema>;
