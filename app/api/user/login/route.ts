import prisma from "@/prisma/db";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { verifyPassword } from "../create/route";
import { createSession } from "@/util/session";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const type = formData.get("type") as string;

    if (!email || !password)
      return NextResponse.json(
        { message: "Bad response : Enter email and password" },
        { status: 400 }
      );

    // login for admin account
    if (type === "ADMIN") {
      const admin = await prisma.admin.findFirst({
        where: { email: email },
      });

      if (admin) {
        const isMatchPassword = await verifyPassword(password, admin.password);

        if (isMatchPassword) {
          await createSession(admin.id);
          return NextResponse.json(
            { message: "Successfully login to admin account" },
            { status: 200 }
          );
        } else {
          return NextResponse.json(
            { message: "Not authenticated to admin account" },
            { status: 401 }
          );
        }
      } else {
        return NextResponse.json(
          { message: "Admin account not found" },
          { status: 404 }
        );
      }
      // login for judge account
    } else if (type === "JUDGE") {
      const judge = await prisma.judge.findFirst({
        where: {
          email: email,
        },
      });

      if (judge) {
        const isMatchPassword = await verifyPassword(password, judge.password);

        if (isMatchPassword) {
          await createSession(judge.id);
          return NextResponse.json(
            { message: "Successfully login to judge account" },
            { status: 200 }
          );
        } else {
          return NextResponse.json(
            { message: "Not authenticated to judge account" },
            { status: 401 }
          );
        }
      } else {
        return NextResponse.json(
          { message: "Judge account not found" },
          { status: 404 }
        );
      }
    } else {
      console.error("Unspecified account type");
      return NextResponse.json(
        { message: "Unspecified account type" },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error(`Failed to login account`, error);
    throw error;
  }
}
