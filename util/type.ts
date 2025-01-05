import { Project } from "@prisma/client";

export type ProjectAndTotalJudgesType = Project & { totalJudges: number };
