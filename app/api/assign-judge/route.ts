import prisma from "@/prisma/db";
import { Judge } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formdata = await req.formData();
    const judges: Judge[] = JSON.parse(formdata.get("judges") as string);
    const projectId = formdata.get("projectId") as string;

    judges.forEach(async (judge) => {
      await prisma.judgeProjectBridge.create({
        data: {
          judgeId: judge.id,
          projectId: projectId,
        },
      });

      await prisma.judge.update({
        where: {
          id: judge.id,
        },
        data: {
          projectToBeJudged: {
            push: projectId,
          },
        },
      });
    });

    await prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        assignedJudges: {
          push: judges.map((judge) => judge.id),
        },
      },
    });

    return NextResponse.json(
      { message: "Successfully assign judge to project" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(error, {status : 500})

  }
}
