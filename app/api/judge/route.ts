import prisma from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const formdata = await req.formData();
    const judgeId = formdata.get("judgeId") as string;

    const judge = await prisma.judge.delete({
      where: {
        id: judgeId,
      },
    });

    if (judge) return NextResponse.json(judge, { status: 200 });
    else
      return NextResponse.json({ message: "Judge not found" }, { status: 404 });
  } catch (error: any) {
    throw error;
  }
}
