import prisma from "@/prisma/db";
import { NextResponse } from "next/server";

// get all projects
export async function GET() {
  try {
    const projects = await prisma.project.findMany({});

    return NextResponse.json(projects, { status: 200 });
  } catch (error: any) {
    console.error(`Failed to get all projects`, error);
    throw error;
  }
}
