import prisma from "@/prisma/db";
import { decrypt, deleteSession } from "@/util/session";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest, response: NextResponse) {
  const rootUrl = req.nextUrl.origin;

  const isCookieExists = () => {
    const sessionCookie = req.cookies.get("session");
    const value = sessionCookie?.value;
    return value || null;
  };

  const isSessionExists = async (sessionVal: string) => {
    const payload = await decrypt(sessionVal);

    if (!payload?.userId) return null;

    const url = `${rootUrl}/api/session?userId=${payload.userId}`;
    const res = await fetch(url, { method: "GET" });

    if (res.ok) {
      const sessionData = await res.json();
      return sessionData;
    }
  };

  const checkAccessLevel = async (userId: string) => {
    const adminUrl = `${rootUrl}/api/admin?id=${userId}`;
    const judgeUrl = `${rootUrl}/api/judge?id=${userId}`;

    const resAdmin = await fetch(adminUrl, { method: "GET" });
    const resJudge = await fetch(judgeUrl, { method: "GET" });

    const isAdmin = resAdmin.ok;
    const isJudge = resJudge.ok;

    if (isAdmin) return "admin";
    if (isJudge) return "judge";
    else return "not identified";
  };

  // Main Execution
  const excludedPaths = ["/admin/login", "/login"];
  if (excludedPaths.includes(req.nextUrl.pathname)) {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/admin/:path*", "/judge", "/evaluate/:path*"],
};
