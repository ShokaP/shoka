import { NextRequest, NextResponse } from "next/server";
import { checkPassword, createToken, setAuthCookie } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    if (!password || !checkPassword(password)) {
      return NextResponse.json({ error: "Wrong password" }, { status: 401 });
    }

    const token = await createToken();
    await setAuthCookie(token);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
