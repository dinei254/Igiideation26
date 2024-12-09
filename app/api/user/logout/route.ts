import prisma from "@/prisma/db";
import { deleteSession } from "@/util/session";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const userId = formData.get("id") as string;

    if (!userId)
      return NextResponse.json(
        { message: "Bad response : Include userid" },
        { status: 400 }
      );

    await deleteSession(userId);

    return NextResponse.redirect(new URL("/login", req.url));
  } catch (error: any) {
    console.error(`Failed to logout from account`, error);
    throw error;
  }
}
