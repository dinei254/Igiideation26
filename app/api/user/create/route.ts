import { NextRequest, NextResponse } from "next/server";
import * as bcrypt from "bcrypt";
import prisma from "@/prisma/db";

// create account
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const association = formData.get("association") as string;
    const type = formData.get("type") as string;

    if (!type) {
      return NextResponse.json(
        { message: "Require account type" },
        { status: 400 }
      );
    }

    if (type == "ADMIN") {
      await createAdminAccount(name, password, email);
    } else if (type === "JUDGE") {
      await createJudgeAccount(name, password, email, association);
    } else {
      console.error("Unspecified account type");
      return NextResponse.json(
        { message: "Unspecified account type" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error(error);
  }
}

export const hashPassword = async (password: string) => {
  const saltRounds = 10;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error: any) {
    console.error("Error hashing password :", error);
    throw error;
  }
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string
) => {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);

    return isMatch;
  } catch (error) {
    console.error(`Failed to verify password : ${error}`);
    throw error;
  }
};

async function createAdminAccount(
  name: string,
  password: string,
  email: string
) {
  const hashedPassword = await hashPassword(password);

  const admin = await prisma.admin.create({
    data: {
      name: name,
      email: email,
      password: hashedPassword,
    },
  });

  if (admin) {
    return NextResponse.json(
      { message: "Successfully create admin account" },
      { status: 200 }
    );
  } else {
    return NextResponse.json(
      { message: "Unsuccesful create admin account" },
      { status: 400 }
    );
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
    return NextResponse.json(
      { message: "Successfully create judge account" },
      { status: 200 }
    );
  } else {
    return NextResponse.json(
      { message: "Unsuccesful create judge account" },
      { status: 400 }
    );
  }
}
