import prisma from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";
import * as bcrypt from "bcrypt";
import { Judge } from "@prisma/client";
import hashPassword from "@/util/hashPassword";

export async function POST(req: NextRequest) {
  try {
    const formdata = await req.formData();
    const name = formdata.get("name") as string;
    const email = formdata.get("email") as string;
    const association = formdata.get("association") as string;
    const password = formdata.get("password") as string;

    const judge = await createJudgeAccount(name, password, email, association);
    if (judge)
      return NextResponse.json(
        { message: "Successfully create judge account" },
        { status: 200 }
      );
    else
      return NextResponse.json(
        { message: "Failed to create judge account" },
        { status: 400 }
      );
  } catch (error: any) {
    console.error(`Failed to create judge : ${error}`);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const formdata = await req.formData();

    const judge: Judge = JSON.parse(formdata.get("judge") as string);
    const judgeId = formdata.get("judgeId") as string;

    await prisma.judge.update({
      where: {
        id: judgeId,
      },
      data: {
        name: judge.name,
        email: judge.email,
        association: judge.association,
        password: judge.password,
      },
    });

    return NextResponse.json(
      { message: "Successfully update judge" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(`Failed to update judge : ${error}`);
  }
}

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





async function createJudgeAccount(
  name: string,
  password: string,
  email: string,
  association: string
) {
  const hashedPassword = await hashPassword(password);

  const judge = await prisma.judge.create({
    data: {
      name: name,
      email: email,
      password: hashedPassword,
      association: association,
    },
  });

  if (judge) {
    return judge;
  } else {
    return null;
  }
}
