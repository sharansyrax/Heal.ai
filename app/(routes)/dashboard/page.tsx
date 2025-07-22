// app/dashboard/page.tsx

import { SignOutButton } from "@/app/_components/Signout-button";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { db } from "@/config/db";
import { eq } from "drizzle-orm";
import { users } from "@/config/schema";
import { FlipWords } from "@/components/ui/flip-words";
import NextPage from "./_components/nextpagesnavigator"; // ✅ Fixed casing

const Page = async () => {
  const session = await auth();
  if (!session) redirect("/sign-in");

  const result = await db
    .select({ name: users.name })
    .from(users)
    .where(eq(users.email, String(session.user?.email)));

  const userName = result[0]?.name ?? session.user?.email;

  const words = ["Happy :)", "Sad :(", "Excited :D", "Angry >:(", "Surprised :O"];

  const features = [
    {
      title: "Emotion Detector",
      desc: "Detect and understand how you're feeling using AI-powered analysis.",
      img: "/ED.png",
      path:"/dashboard/emotiondetector"
    },
    {
      title: "AI Doctor",
      desc: "Get personalized health insights and suggestions based on your emotions.",
      img: "/AID.png",
       path:"/dashboard/aicare"
    },
    {
      title: "Mental Health Journal",
      desc: "Log your thoughts and track emotional patterns over time.",
      img: "/EJ.png",
        path:"/dashboard/aicare"
    },
    {
      title: "Meditation",
      desc: "Relax your mind with guided meditation and breathing exercises.",
      img: "/MY.png",
        path:"/dashboard/meditation"
    },
    {
      title: "Emotional Art Pad",
      desc: "Talk to an empathetic AI bot for support and CBT-based prompts.",
      img: "/EC.png",
        path:"/dashboard/artpad"
    },
    {
      title: "Emotion Trends Dashboard",
      desc: "Visualize your emotional history and gain personal insights.",
      img: "/TD.png",
        path:"/dashboard/emotionaltrend"
    },
  ];

  return (
    <div>
<div className="fixed inset-0 -z-10 min-h-screen w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
  <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]" />
</div>

   
    <div className="px-4 py-6">
      
      {/* Greeting */}
       <div className="m-10 py-3 text-4xl mx-auto font-normal text-purple-400 dark:text-purple-600  text-center">
       
        Hellooo,
         {userName}! 
        How are you feeling <br/>
         today?
        <FlipWords words={words} /> <br />
       
      </div>
      {/* Features Grid */}
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 rounded-lg">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="bg-purple-50 dark:bg-gray-900 shadow-md hover:shadow-xl transition overflow-hidden rounded-lg"
          >
            <img
              src={feature.img}
              alt={feature.title}
              className="w-full h-100 object-cover bg-white p-2 rounded-lg"
            />
              <div className=" p-2 flex justify-center items-center">

              <NextPage path={feature.path} titles={feature.title} />
              </div>
           
          </div>
        ))}
      </div>

    </div>
     </div>
  );
};

export default Page;
