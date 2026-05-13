import * as z from "zod";
import _ from "lodash";

export enum JobContractTypeEnum {
  CDI = "CDI",
  CDD = "CDD",
  INTERNSHIP = "INTERNSHIP",
  FREELANCE = "FREELANCE",
  PART_TIME = "PART_TIME",
}

export enum JobNatureEnum {
  ONSITE = "ONSITE",
  REMOTE = "REMOTE",
  HYBRID = "HYBRID",
}

export const allowedPrefixedSkills = [
  "$nuxtjs",
  "$react",
  "$vue",
  "$nestjs",
  "$nextjs",
] as const;

export function getJobShema($t: (str: string) => string = (str) => str) {
  const skillSchema = z
    .string()
    .transform((skill) => skill.trim())
    .refine(
      (skill) => {
        // Cas 1 : commence par $
        if (skill.startsWith("$")) {
          return allowedPrefixedSkills.includes(
            skill.toLowerCase() as (typeof allowedPrefixedSkills)[number]
          );
        }

        // Cas 2 : skill libre
        return skill.length >= 2;
      },
      {
        message: $t("job.items.skills.errors.invalid"),
      }
    );

  const title = z
    .string($t("job.items.title.errors.required"))
    .min(3, $t("job.items.title.errors.min"))
    .max(150, $t("job.items.title.errors.max"));

  const companyDescription = z
    .string($t("job.items.companyDescription.errors.required"))
    .min(20, $t("job.items.companyDescription.errors.min"))
    .optional();

  const jobDescription = z
    .string($t("job.items.jobDescription.errors.required"))
    .min(50, $t("job.items.jobDescription.errors.min"));

  const contractType = z.enum(
    JobContractTypeEnum,
    $t("job.items.contractType.errors.invalid")
  );

  const location = z
    .string($t("job.items.location.errors.required"))
    .min(2, $t("job.items.location.errors.min"));

  const jobNature = z.enum(
    ["ONSITE", "REMOTE", "HYBRID"],
    $t("job.items.jobNature.errors.invalid")
  );

  const salary = z
    .tuple(
      [
        z.number().min(0, $t("job.items.salary.errors.invalidRange")),
        z.number().max(200, $t("job.items.salary.errors.invalidRange")),
      ],
      $t("job.items.salary.errors.invalid")
    )
    .refine((value) => value[0] < value[1], {
      message: $t("job.items.salary.errors.invalidRange"),
      path: ["max"],
    })
    .optional();

  const skills = z.array(skillSchema).default([]).optional();

  const candidateProfile = z
    .string($t("job.items.candidateProfile.errors.required"))
    .min(30, $t("job.items.candidateProfile.errors.min"))
    .optional();

  const defaultPipeline = [
    { key: "REJECTED" },
    { key: "TO_CONTACT" },
    { key: "INTERVIEW" },
    { key: "HIRED" },
  ];

  const pipeline = z
    .object({
      key: z.string(),
      label: z.string().max(180).optional(),
      color: z.string().optional(),
      icon: z.string().optional(),
    })
    .transform((v) => {
      return v;
    });

  const pipelines = pipeline
    .array()
    .min(1)
    .default(defaultPipeline)
    .transform((pipelines) => {
      pipelines = _.uniqBy(pipelines, "key");
      return pipelines;
    });

  const statusEnum = z.enum(["open", "close", "pause"]);
  const status = statusEnum.default("open");

  const applyDataConfigs = z
    .record(
      z
        .string()
        .refine((key) => applyDataOptionsList.map((a) => a.key).includes(key)),
      z.enum(["use", "require"])
    )
    .default({});

  const schema = z.object({
    title,
    companyDescription,
    contractType,
    jobDescription,
    location,
    jobNature,
    salary,
    skills,
    candidateProfile,
    pipelines,
    status,
    applyDataConfigs,
  });

  return {
    schema,

    title,

    location,
    jobNature,
    contractType,
    salary,

    jobDescription,
    skills,

    candidateProfile,

    companyDescription,

    pipeline,
    pipelines,
    defaultPipeline,

    applyDataConfigs,

    statusEnum,
    status,
  };
}
