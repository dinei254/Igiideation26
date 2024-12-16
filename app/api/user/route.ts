import { decrypt, updateSession } from "@/util/session";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const sessionCookie = req.cookies.get("session");

    if (!sessionCookie)
      return NextResponse.json(
        { message: "No session cookie included" },
        { status: 401 }
      );
    await updateSession();

    const sessionValue = sessionCookie.value;
    const payload = await decrypt(sessionValue);


    if (!payload)
      return NextResponse.json(
        { message: "Invalid session value" },
        { status: 401 }
      );

    const userId = payload.userId;
    return NextResponse.json(userId, { status: 200 });
  } catch (error: any) {
    console.error(error);
  }
}
