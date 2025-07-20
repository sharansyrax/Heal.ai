import { SignOutButton } from "@/app/_components/Signout-button";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { db } from "@/config/db";
import { eq } from "drizzle-orm";
import { users } from "@/config/schema";
import HistoryList from "../dashboard/_components/HistoryList";

const Page = async () => {
  const session = await auth();
  if (!session) redirect("/sign-in");

  const result = await db
    .select({ name: users.name })
    .from(users)
    .where(eq(users.email, String(session.user?.email)));

  const userName = result[0]?.name ?? session.user?.email;

  return (
   <HistoryList></HistoryList>
  );
};

export default Page;
