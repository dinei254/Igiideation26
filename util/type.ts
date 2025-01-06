import { Project, JudgeProjectBridge } from "@prisma/client";

export type ProjectAndTotalJudgesType = Project & { totalJudges: number };
export type ProjectAndJudgeProjectBridge = Project & {JudgeProjectBridge : JudgeProjectBridge[]};
