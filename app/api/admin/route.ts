import prisma from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const formdata = await req.formData();
    const adminId = formdata.get("adminId") as string;

    const admin = await prisma.admin.delete({
      where: {
        id: adminId,
      },
    });

    if (admin) return NextResponse.json(admin, { status: 200 });
    else return NextResponse.json({ message: "Admin not found" });
  } catch (error: any) {
    throw error;
  }
}
