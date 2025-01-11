import prisma from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";
// export format
// project id, title of innovation, judge1, judge2, judge3, judge4, judge5, average mark, badge

// Requirements
//1. check if all judges have mark their assigned project

export async function GET(req: NextRequest) {
  try {
    let isAllJudgesFinishJudge = true;
    const projects = await prisma.project.findMany({
      include: {
        JudgeProjectBridge: true,
      },
    });

    projects.forEach((project) =>
      project.JudgeProjectBridge.forEach((judgeProjBridge) => {
        if (!judgeProjBridge.isProjectMarked)
          return NextResponse.json({ status: "not yet" }, { status: 200 });
      })
    );

    const csvRows = [];
    const header = [
      "Project ID",
      "Title of innovation",
      "Judge 1",
      "Judge 2",
      "Judge 3",
      "Judge 4",
      "Judge 5",
      "Average mark",
      "Badge",
    ];

    csvRows.push(header.join(","));

    projects.forEach((project) => {
      const projectId = project.id;
      const titleOfInnovation = project.titleOfInnovation;
      const marks = project.JudgeProjectBridge.map((judgeProjBridge) => {
        let totalMark = 0;

        if (judgeProjBridge.isProjectMarked) {
          totalMark =
            judgeProjBridge.benefitToMankindMark! +
            judgeProjBridge.commercializationMark! +
            judgeProjBridge.noveltyAndUniquenessMark! +
            judgeProjBridge.statusOfInventionMark! +
            judgeProjBridge.supportingDocumentMark! +
            judgeProjBridge.videoPresentationMark!;
        }
        return totalMark;
      });

      let totalMark = 0;
      marks.forEach((mark) => {
        totalMark += mark;
      });

      const averageMark = totalMark / project.JudgeProjectBridge.length; // total mark divided by total assigned judges

      
    });
  } catch (error: any) {
    console.error(`Failed to export into CSV :${error}`);
    return NextResponse.json({ error }, { status: 500 });
  }
}
