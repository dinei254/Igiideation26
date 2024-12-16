import prisma from "@/prisma/db";
import { Project } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

// create project title
export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const projectForm = JSON.parse(formData.get("project") as string);

  try {
    const project = await prisma.project.create({
      data: {
        titleOfInnovation: projectForm.titleOfInnovation,
        abstractLink: projectForm.abstractLink,
        supportingDocumentLink1: projectForm.supportingDocumentLink1,
        supportingDocumentLink2: projectForm.supportingDocumentLink2,
        supportingDocumentLink3: projectForm.supportingDocumentLink3,
        posterLink: projectForm.posterLink,
        videoLink: projectForm.videoLink,
        status: "PENDING",
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
    const id = formData.get("id") as string;

    if (!updatedProject)
      return NextResponse.json(
        { message: "Bad request. Provide updated project" },
        { status: 400 }
      );


    const project = await prisma.project.update({
      where: {
        id: id,
      },
      data: {
        titleOfInnovation: updatedProject.titleOfInnovation,
        abstractLink: updatedProject.abstractLink,
        supportingDocumentLink1: updatedProject.supportingDocumentLink1,
        supportingDocumentLink2: updatedProject.supportingDocumentLink2,
        supportingDocumentLink3: updatedProject.supportingDocumentLink3,
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
