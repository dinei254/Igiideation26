import prisma from "@/prisma/db";
import classifyMark from "@/util/classifyMark";
import { Project } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
// export format
// project id, title of innovation, mark judge1, judge2, judge3, judge4, judge5, average mark, badge

// Requirements
//1. check if all judges have mark their assigned project

type JudgeType = {
  name: string;
  total_mark: number;
  novelty_and_uniqueness_mark: number;
  benefit_to_mankind_mark: number;
  commercialization_mark: number;
  status_of_invention_mark: number;
  video_presentation_mark: number;
  supporting_document_mark: number;
  is_platinum_award: boolean;
  is_sustainability_award: boolean;
  is_innovatex_award: boolean;
  comment: string | null;
};

type ProjectRowType = {
  project_id: string;
  project_title: string;
  average_mark: number;
  badge: "GOLD" | "SILVER" | "BRONZE";
  total_judges: number;

  judge1_name: string;
  judge1_total_mark: number;
  judge1_novelty_and_uniqueness_mark: number;
  judge1_benefit_to_mankind_mark: number;
  judge1_commercialization_mark: number;
  judge1_status_of_invention_mark: number;
  judge1_video_presentation_mark: number;
  judge1_supporting_document_mark: number;
  judge1_is_platinum_award: boolean;
  judge1_is_sustainability_award: boolean;
  judge1_is_innovatex_award: boolean;
  judge1_comment: string | null;

  judge2_name: string;
  judge2_total_mark: number;
  judge2_novelty_and_uniqueness_mark: number;
  judge2_benefit_to_mankind_mark: number;
  judge2_commercialization_mark: number;
  judge2_status_of_invention_mark: number;
  judge2_video_presentation_mark: number;
  judge2_supporting_document_mark: number;
  judge2_is_platinum_award: boolean;
  judge2_is_sustainability_award: boolean;
  judge2_is_innovatex_award: boolean;
  judge2_comment: string | null;

  judge3_name: string;
  judge3_total_mark: number;
  judge3_novelty_and_uniqueness_mark: number;
  judge3_benefit_to_mankind_mark: number;
  judge3_commercialization_mark: number;
  judge3_status_of_invention_mark: number;
  judge3_video_presentation_mark: number;
  judge3_supporting_document_mark: number;
  judge3_is_platinum_award: boolean;
  judge3_is_sustainability_award: boolean;
  judge3_is_innovatex_award: boolean;
  judge3_comment: string | null;

  judge4_name: string;
  judge4_total_mark: number;
  judge4_novelty_and_uniqueness_mark: number;
  judge4_benefit_to_mankind_mark: number;
  judge4_commercialization_mark: number;
  judge4_status_of_invention_mark: number;
  judge4_video_presentation_mark: number;
  judge4_supporting_document_mark: number;
  judge4_is_platinum_award: boolean;
  judge4_is_sustainability_award: boolean;
  judge4_is_innovatex_award: boolean;
  judge4_comment: string | null;

  judge5_name: string;
  judge5_total_mark: number;
  judge5_novelty_and_uniqueness_mark: number;
  judge5_benefit_to_mankind_mark: number;
  judge5_commercialization_mark: number;
  judge5_status_of_invention_mark: number;
  judge5_video_presentation_mark: number;
  judge5_supporting_document_mark: number;
  judge5_is_platinum_award: boolean;
  judge5_is_sustainability_award: boolean;
  judge5_is_innovatex_award: boolean;
  judge5_comment: string | null;
};

export async function GET(req: NextRequest) {
  try {
    const projects = await prisma.project.findMany({
      include: {
        JudgeProjectBridge: {
          include: {
            judge: true,
          },
        },
      },
    });

    const header = [
      "project_id",
      "project_title",
      "average_mark",
      "badge",
      "total_judges",

      "judge1_name",
      "novelty_and_uniqueness_mark_judge1",
      "benefit_to_mankind_mark_judge1",
      "commercialization_mark_judge1",
      "status_of_invention_mark_judge1",
      "video_presentation_mark_judge1",
      "supporting_document_mark_judge1",
      "total_mark_judge1",
      "is_platinum_award_judge1",
      "is_sustainability_award_judge1",
      "is_innovatex_award_judge1",
      "comment_judge1",

      "judge2_name",
      "novelty_and_uniqueness_mark_judge2",
      "benefit_to_mankind_mark_judge2",
      "commercialization_mark_judge2",
      "status_of_invention_mark_judge2",
      "video_presentation_mark_judge2",
      "supporting_document_mark_judge2",
      "total_mark_judge2",
      "is_platinum_award_judge2",
      "is_sustainability_award_judge2",
      "is_innovatex_award_judge2",
      "comment_judge2",

      "judge3_name",
      "novelty_and_uniqueness_mark_judge3",
      "benefit_to_mankind_mark_judge3",
      "commercialization_mark_judge3",
      "status_of_invention_mark_judge3",
      "video_presentation_mark_judge3",
      "supporting_document_mark_judge3",
      "total_mark_judge3",
      "is_platinum_award_judge3",
      "is_sustainability_award_judge3",
      "is_innovatex_award_judge3",
      "comment_judge3",

      "judge4_name",
      "novelty_and_uniqueness_mark_judge4",
      "benefit_to_mankind_mark_judge4",
      "commercialization_mark_judge4",
      "status_of_invention_mark_judge4",
      "video_presentation_mark_judge4",
      "supporting_document_mark_judge4",
      "total_mark_judge4",
      "is_platinum_award_judge4",
      "is_sustainability_award_judge4",
      "is_innovatex_award_judge4",
      "comment_judge4",

      "judge5_name",
      "novelty_and_uniqueness_mark_judge5",
      "benefit_to_mankind_mark_judge5",
      "commercialization_mark_judge5",
      "status_of_invention_mark_judge5",
      "video_presentation_mark_judge5",
      "supporting_document_mark_judge5",
      "total_mark_judge5",
      "is_platinum_award_judge5",
      "is_sustainability_award_judge5",
      "is_innovatex_award_judge5",
      "comment_judge5",
    ];

    const projectRowsObj = projects.map((project) => {
      const totalJudges = project.JudgeProjectBridge.length;

      let grandTotalMark = 0;
      project.JudgeProjectBridge.forEach((proj) => {
        const total =
          proj.benefitToMankindMark +
          proj.commercializationMark +
          proj.noveltyAndUniquenessMark +
          proj.statusOfInventionMark +
          proj.supportingDocumentMark +
          proj.videoPresentationMark;
        grandTotalMark += total;
      });

      const averageMark = grandTotalMark / totalJudges;

      const row: ProjectRowType = {
        project_id: project.id,
        project_title: project.titleOfInnovation,
        average_mark: averageMark,
        badge: classifyMark(averageMark),
        total_judges: totalJudges,
        judge1_name: "",
        judge1_total_mark: 0,
        judge1_novelty_and_uniqueness_mark: 0,
        judge1_benefit_to_mankind_mark: 0,
        judge1_commercialization_mark: 0,
        judge1_status_of_invention_mark: 0,
        judge1_video_presentation_mark: 0,
        judge1_supporting_document_mark: 0,
        judge1_is_platinum_award: false,
        judge1_is_sustainability_award: false,
        judge1_is_innovatex_award: false,
        judge1_comment: null,
        judge2_name: "",
        judge2_total_mark: 0,
        judge2_novelty_and_uniqueness_mark: 0,
        judge2_benefit_to_mankind_mark: 0,
        judge2_commercialization_mark: 0,
        judge2_status_of_invention_mark: 0,
        judge2_video_presentation_mark: 0,
        judge2_supporting_document_mark: 0,
        judge2_is_platinum_award: false,
        judge2_is_sustainability_award: false,
        judge2_is_innovatex_award: false,
        judge2_comment: null,
        judge3_name: "",
        judge3_total_mark: 0,
        judge3_novelty_and_uniqueness_mark: 0,
        judge3_benefit_to_mankind_mark: 0,
        judge3_commercialization_mark: 0,
        judge3_status_of_invention_mark: 0,
        judge3_video_presentation_mark: 0,
        judge3_supporting_document_mark: 0,
        judge3_is_platinum_award: false,
        judge3_is_sustainability_award: false,
        judge3_is_innovatex_award: false,
        judge3_comment: null,
        judge4_name: "",
        judge4_total_mark: 0,
        judge4_novelty_and_uniqueness_mark: 0,
        judge4_benefit_to_mankind_mark: 0,
        judge4_commercialization_mark: 0,
        judge4_status_of_invention_mark: 0,
        judge4_video_presentation_mark: 0,
        judge4_supporting_document_mark: 0,
        judge4_is_platinum_award: false,
        judge4_is_sustainability_award: false,
        judge4_is_innovatex_award: false,
        judge4_comment: null,
        judge5_name: "",
        judge5_total_mark: 0,
        judge5_novelty_and_uniqueness_mark: 0,
        judge5_benefit_to_mankind_mark: 0,
        judge5_commercialization_mark: 0,
        judge5_status_of_invention_mark: 0,
        judge5_video_presentation_mark: 0,
        judge5_supporting_document_mark: 0,
        judge5_is_platinum_award: false,
        judge5_is_sustainability_award: false,
        judge5_is_innovatex_award: false,
        judge5_comment: null,
      };

      return row;
    });

    const projectRows = projectRowsObj.map((projObj) =>
      Object.values(projObj).join(",")
    );

    const csvContent = [header.join(","), ...projectRows].join("\n")

    return new NextResponse(csvContent as any, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": "attachment; filename=projects.csv",
      },
    });
  } catch (error: any) {
    console.error(`Failed to export into CSV :${error}`);
    return NextResponse.json({ error }, { status: 500 });
  }
}

// const calculateAverageMarks = (projectId: string) => {
//   try {
//   } catch (error: any) {
//     console.log(`Error calculating average marks`);
//     throw new Error(error);
//   }
// };
