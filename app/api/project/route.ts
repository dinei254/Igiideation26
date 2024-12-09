import prisma from "@/prisma/db";
import { Project } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

// create project title
export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const teamName = formData.get("teamName") as string;
  const advisorName = formData.get("advisorName") as string;
  const teamLeaderName = formData.get("teamLeaderName") as string;
  const participantsName: { name: string }[] = JSON.parse(
    formData.get("participantsName") as string
  );
  const participantNamesArr = participantsName.map(
    (participant) => participant.name
  );
  const email = formData.get("email") as string;
  const phoneNumber = formData.get("phoneNumber") as string;
  const titleOfInnovation = formData.get("titleOfInnovation") as string;
  const categoryOfInnovation = formData.get("categoryOfInnovation") as string;
  const abstractLink = formData.get("abstractLink") as string;
  const supportingDocumentLinks: { link: string }[] = JSON.parse(
    formData.get("supportingDocumentLinks") as string
  );
  const supportingDocLinksArr = supportingDocumentLinks.map((doc) => doc.link);
  const posterLink = formData.get("posterLink") as string;
  const videoLink = formData.get("videoLink") as string;

  try {
    const project = await prisma.project.create({
      data: {
        teamName: teamName,
        advisorName: advisorName,
        teamLeaderName: teamLeaderName,
        participantsName: participantNamesArr,
        email: email,
        phoneNumber: phoneNumber,
        titleOfInnovation: titleOfInnovation,
        categoryOfInnovation: categoryOfInnovation,
        abstractLink: abstractLink,
        supportingDocumentLinks: supportingDocLinksArr,
        posterLink: posterLink,
        videoLink: videoLink,
      },
    });

    return NextResponse.json(project, { status: 200 });
  } catch (error: any) {
    console.error(`Failed to create project`, error);
    throw error;
  }
}

// search project
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const projectId = searchParams.get("projectId");

    if (!projectId)
      return NextResponse.json(
        { message: "Bad request. Enter project id" },
        { status: 400 }
      );

    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
      },
    });

    if (project) return NextResponse.json(project, { status: 200 });
    else
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
  } catch (error: any) {
    console.error("Failed to fetch project", error);
    throw error;
  }
}

// update project
export async function PATCH(req: NextRequest) {
  try {
    const formData = await req.formData();
    const updatedProject: Project = JSON.parse(
      formData.get("project") as string
    );

    if (!updatedProject)
      return NextResponse.json(
        { message: "Bad request. Provide updated project" },
        { status: 400 }
      );

    const project = await prisma.project.update({
      where: {
        id: updatedProject.id,
      },
      data: {
        teamName: updatedProject.teamName,
        advisorName: updatedProject.advisorName,
        teamLeaderName: updatedProject.teamLeaderName,
        participantsName: updatedProject.participantsName,
        email: updatedProject.email,
        phoneNumber: updatedProject.phoneNumber,
        titleOfInnovation: updatedProject.titleOfInnovation,
        categoryOfInnovation: updatedProject.categoryOfInnovation,
        abstractLink: updatedProject.abstractLink,
        supportingDocumentLinks: updatedProject.supportingDocumentLinks,
        posterLink: updatedProject.posterLink,
        videoLink: updatedProject.videoLink,
      },
    });

    if (project)
      return NextResponse.json(
        {
          message: `Successfully update project title : ${project.titleOfInnovation}`,
        },
        { status: 200 }
      );
    else
      return NextResponse.json(
        { message: `Project title to be updated not found` },
        { status: 404 }
      );
  } catch (error: any) {
    console.error("Failed to edit project", error);
    throw error;
  }
}

// delete project
export async function DELETE(req: NextRequest) {
  try {
    const formData = await req.formData();
    const projectId = formData.get("id") as string;

    if (!projectId)
      return NextResponse.json(
        { message: "Bad response. Provide project ID" },
        { status: 400 }
      );

    const project = await prisma.project.delete({
      where: {
        id: projectId,
      },
    });

    if (project)
      return NextResponse.json(
        { message: "Successfully delete project" },
        { status: 200 }
      );
    else
      return NextResponse.json(
        { message: "Project to be deleted not found" },
        { status: 404 }
      );
  } catch (error: any) {
    console.error(`Failed to delete project`, error);
    throw error;
  }
}
