export function getApplyShema($t: (string: string) => string) {
  const note = z
    .number($t("apply.note.errors.required"))
    .min(0, $t("apply.note.errors.required"))
    .max(200, $t("apply.note.errors.required"));

  const status = z
    .string($t("apply.errors.invalid_status"))
    .optional()
    .nullable();

  const data = z.record(z.string(), z.any());

  const schema = z.object({ note, status, data });

  return { note, status, data, schema };
}
