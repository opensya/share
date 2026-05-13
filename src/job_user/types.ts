import { Job } from "@share/job/types";
import { WithMetas } from "@share/types/metas";
import { User, USER_ROLES } from "@share/user";
import { Types } from "mongoose";

export type JobUserSchema = {
  jobID: Types.ObjectId;
  userID: Types.ObjectId;
  role: (typeof USER_ROLES)[number];
};

export type JobUser = WithMetas<JobUserSchema> & {
  userID: string;
  jobID: string;
  user: User;
  job: Job;
};
