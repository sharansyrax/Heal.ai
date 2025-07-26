import { NextResponse } from "next/server";
import { db } from "@/config/db";
import { users ,usermood} from "@/config/schema";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";


export async function POST(req: Request) {
  try {
    console.log("API HIT")
    const session= await auth();
  const body = await req.json();
    const { emotion, thought, response } = body;
   const user = await db.query.users.findFirst({
  where: (u, { eq }) => eq(u.email, String(session?.user?.email)),
});
 if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
const userId =user?.id;


   await db.insert(usermood).values({
        id:uuidv4()
        ,userId:userId,
        emotion,
        thought,
        response

    })
   
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
