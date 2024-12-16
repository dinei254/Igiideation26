import prisma from "@/prisma/db";
import { Project } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const judgeId = searchParams.get("judgeId") as string;

    if (judgeId) {
      // return projects associated to the judge only
      const judge = await prisma.judge.findFirst({
        where: {
          id: judgeId,
        },
        select: {
          projectToBeJudged: true,
        },
      });

      let projects: Project[] = [];
      for (const projectId of judge?.projectToBeJudged || []) {
        const project = await prisma.project.findFirst({
          where: {
            id: projectId,
          },
        });

        if (project) {
          projects.push(project);
        }
      }

      return NextResponse.json(projects, { status: 200 });
    } else {
      // return all projects
      const projects = await prisma.project.findMany({});
      if (projects) return NextResponse.json(projects, { status: 200 });
      else
        NextResponse.json({ message: "Projects not found" }, { status: 404 });
    }
  } catch (error: any) {
    console.error(`Failed to get all projects`, error);
    throw error;
  }
}
