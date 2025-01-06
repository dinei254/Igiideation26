import { TableCell, TableRow } from "@/components/ui/table";
import { ProjectAndJudgeProjectBridge } from "@/util/type";
import React from "react";

const LeaderboardTableRow = ({
  project,
}: {
  project: ProjectAndJudgeProjectBridge;
}) => {
  const judgeProjectBridge = project.JudgeProjectBridge;
  const projectMarks = judgeProjectBridge.map((project) => {
    const totalMark =
      project.benefitToMankindMark! +
      project.commercializationMark! +
      project.noveltyAndUniquenessMark! +
      project.statusOfInventionMark! +
      project.supportingDocumentMark! +
      project.videoPresentationMark!;

    return totalMark;
  });

  const projectRemarks = judgeProjectBridge.map((project) => {
    return {
      projectRemark: {
        isPlatinumAward: project.isPlatinumAward,
        isSustainabilityAward: project.isSustainabilityAward,
        isInnovatexAward: project.isInnovatexAward,
      },
    };
  });

  console.log(projectRemarks);

  const calculateAverageMark = () => {
    let totalMark = 0;
    let averageMark = 0;
    const totalProjectJudges = judgeProjectBridge.length;
    projectMarks.forEach((mark) => (totalMark += mark));

    averageMark = totalMark / totalProjectJudges;

    return averageMark;
  };

  return (
    <TableRow>
      <TableCell>{project.titleOfInnovation}</TableCell>
      <TableCell>
        {projectMarks[0] || "-"} 
      </TableCell>
      <TableCell>
        {projectMarks[1] || "-"} 
      </TableCell>
      <TableCell>
        {projectMarks[2] || "-"} 
      </TableCell>
      <TableCell>
        {projectMarks[3] || "-"} 
      </TableCell>
      <TableCell>
        {projectMarks[4] || "-"} 
      </TableCell>
      <TableCell>{calculateAverageMark()}</TableCell>
      <TableCell>{}</TableCell>
    </TableRow>
  );
};

export default LeaderboardTableRow;
