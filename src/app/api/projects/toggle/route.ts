import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { toggleHidden } from "@/lib/hidden";

export async function POST(req: NextRequest) {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { uuid } = await req.json();
    if (!uuid) {
      return NextResponse.json(
        { error: "UUID is required" },
        { status: 400 }
      );
    }

    const isNowHidden = await toggleHidden(uuid);
    return NextResponse.json({ uuid, hidden: isNowHidden });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
