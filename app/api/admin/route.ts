import prisma from "@/prisma/db";
import { Admin } from "@prisma/client";
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

export async function PATCH(req: NextRequest) {
  try {
    const formdata = await req.formData();
    const admin: Admin = JSON.parse(formdata.get("admin") as string);
    const adminId = formdata.get("adminId") as string;

    const updatedAdmin = await prisma.admin.update({
      where: {
        id: adminId,
      },
      data: {
        name: admin.name,
        email: admin.email,
        password: admin.password,
      },
    });

    return NextResponse.json(updatedAdmin, { status: 200 });
  } catch (error: any) {
    console.error(`failed to update admin account : ${error}`);
  }
}
