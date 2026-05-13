import { ApplyDataOptions } from "./types";

import {
  availability,
  avatar,
  cv,
  desiredGrossSalary,
  educationLevel,
  email,
  firstName,
  lastName,
  motivation,
  phone,
} from "./items";

export function registerApplyData(key: string, options: ApplyDataOptions) {
  const isKeyValid = z
    .string()
    .min(2)
    .max(64)
    // .regex(/^[a-zA-Z0-9_-]$/)
    .safeParse(key).success;

  if (!isKeyValid) return;

  const i = applyDataOptionsList.findIndex((a) => a.key === key);
  if (i !== -1) applyDataOptionsList[i] = { ...options, key };
  else applyDataOptionsList.push({ ...options, key });
}

function registerApplyNative() {
  registerApplyData("avatar", avatar.options);
  registerApplyData("firstName", firstName.options);
  registerApplyData("lastName", lastName.options);
  registerApplyData("email", email.options);
  registerApplyData("phone", phone.options);
  registerApplyData("cv", cv.options);
  registerApplyData("desiredGrossSalary", desiredGrossSalary.options);
  registerApplyData("availability", availability.options);
  registerApplyData("educationLevel", educationLevel.options);
  registerApplyData("motivation", motivation.options);
}

export function initApplyData() {
  registerApplyNative();
}
