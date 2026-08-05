"use server";

import { cookies } from "next/headers";

const isCookiesExists = async () => {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;

    console.log(sessionCookie);

    return !!sessionCookie;
  } catch (error) {
    console.error("Failed to check for cookie:", error);
    return false;
  }
};

export default isCookiesExists;