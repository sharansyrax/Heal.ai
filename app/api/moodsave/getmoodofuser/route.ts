import { NextResponse } from "next/server";
import { db } from "@/config/db";
import { users, usermood } from "@/config/schema";
import { eq, desc } from "drizzle-orm";
import { auth } from "@/auth";

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Find the current user
    const user = await db.query.users.findFirst({
      where: (u, { eq }) => eq(u.email, String(session.user!.email)),
      columns: { id: true },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Parse pagination params
    const { searchParams } = new URL(req.url);
    const limit = Math.min(Number(searchParams.get("limit") ?? "20"), 100); // cap at 100
    const offset = Math.max(Number(searchParams.get("offset") ?? "0"), 0);

    // Fetch history (newest first)
    const history = await db
      .select({
        id: usermood.id,
        emotion: usermood.emotion,
        thought: usermood.thought,
        response: usermood.response,
        createdAt: (usermood as any).createdAt ?? undefined, // safe if you added createdAt
      })
      .from(usermood)
      .where(eq(usermood.userId, user.id))
      .orderBy(
        // Prefer createdAt if you added it; otherwise fall back to id ordering
        (usermood as any).createdAt ? desc((usermood as any).createdAt) : desc(usermood.id)
      )
      .limit(limit)
      .offset(offset);

    return NextResponse.json({ data: history, limit, offset }, { status: 200 });
  } catch (err) {
    console.error("History fetch error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
