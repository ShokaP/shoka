import { NextResponse } from "next/server";
import { getApplications } from "@/lib/coolify";
import { getHiddenIds } from "@/lib/hidden";
import { isAuthenticated } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [applications, hiddenIds] = await Promise.all([
      getApplications(),
      getHiddenIds(),
    ]);

    const withVisibility = applications.map((app) => ({
      ...app,
      hidden: hiddenIds.includes(app.uuid),
    }));

    return NextResponse.json(withVisibility);
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
