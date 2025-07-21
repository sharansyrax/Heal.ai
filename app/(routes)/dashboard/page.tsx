import { SignOutButton } from "@/app/_components/Signout-button";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { db } from "@/config/db";
import { eq } from "drizzle-orm";
import { users } from "@/config/schema";
import dynamic from "next/dynamic";
import { FlipWords } from "@/components/ui/flip-words";

 import NextPage   from "./_components/nextpagesnavigator"
import { WobbleCard } from "@/components/ui/wobble-card";


const Page = async () => {
  const session = await auth();
  if (!session) redirect("/sign-in");

  const result = await db
    .select({ name: users.name })
    .from(users)
    .where(eq(users.email, String(session.user?.email)));

  const userName = result[0]?.name ?? session.user?.email;
    const words = ["better", "cute", "beautiful", "modern"];
  return (
    <>
     <div className="h-[20rem] flex justify-center items-center px-4">
      <div className="text-4xl mx-auto font-normal text-purple-600 dark:text-purple-400">
        Build
        <FlipWords words={words} /> <br />
        websites with Aceternity UI
      </div>
    </div>
      <p className="text-xl mb-4">Welcome, {userName}!</p>
      <NextPage path="/dashboard/emotiondetector" />
      <NextPage path ="/dashboard/aicare"></NextPage>
       
    </>
  );
};

export default Page;
