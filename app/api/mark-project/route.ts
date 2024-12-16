import prisma from "@/prisma/db";
import { decrypt } from "@/util/session";
import { Mark } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

// mark project
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const projectId = formData.get("projectId") as string;
    const mark: Mark = JSON.parse(formData.get("mark") as string);
    const sessionCookie = req.cookies.get("session");
    const jwt = sessionCookie?.value;

    // check if jwt exists
    if (!jwt || !sessionCookie)
      return NextResponse.json(
        { message: "You are not authorized" },
        { status: 401 }
      );

    // check if can decrypt
    const payload = await decrypt(jwt);
    if (!payload)
      return NextResponse.json(
        { message: "You are not a valid user" },
        { status: 401 }
      );

    // check if session in database
    const session = await prisma.session.findFirst({
      where: {
        userId: payload.userId,
      },
    });

    if (!session)
      return NextResponse.json(
        { message: "No database session" },
        { status: 401 }
      );

    // create mark and link to project
    const project = await prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        marks: {
          create: {
            noveltyAndUniquessMark: mark.noveltyAndUniquessMark,
            benefitToMankindMark: mark.benefitToMankindMark,
            commercializationMark: mark.commercializationMark,
            statusOfInventionMark: mark.statusOfInventionMark,
            videoPresentationMark: mark.videoPresentationMark,
            supportingDocumentMark: mark.supportingDocumentMark,
            comments: mark.comments,
          },
        },
      },
    });

    if (project)
      return NextResponse.json(
        { message: "Succesfully create mark and link to project" },
        { status: 200 }
      );
    else
      return NextResponse.json(
        { message: "Cannot find project" },
        { status: 404 }
      );
  } catch (error: any) {
    console.error(`Failed to change project status`, error);
    throw error;
  }
}
