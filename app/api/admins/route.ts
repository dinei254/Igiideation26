import prisma from "@/prisma/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const admins = await prisma.admin.findMany({});

    return NextResponse.json(admins, { status: 200 });
  } catch (error: any) {
    throw error;
  }
}
