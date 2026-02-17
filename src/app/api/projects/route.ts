import { NextResponse } from "next/server";
import { getApplications } from "@/lib/coolify";
import { getHiddenIds } from "@/lib/hidden";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [applications, hiddenIds] = await Promise.all([
      getApplications(),
      getHiddenIds(),
    ]);

    const visible = applications.filter(
      (app) => !hiddenIds.includes(app.uuid)
    );

    return NextResponse.json(visible);
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
