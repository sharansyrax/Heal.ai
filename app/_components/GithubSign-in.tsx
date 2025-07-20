
"use client";

import { signIn } from "next-auth/react";
import { Github } from "lucide-react"; // Icon import

export default function GithubSignin() {
  const handleSignIn = () => {
    signIn("github", { callbackUrl: "/" });
  };

  return (
    <button
      onClick={handleSignIn}
      className=" flex items-center justify-center gap-2 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-800 transition"
    >
      <Github className="w-5 h-5" />
      <span>Sign in with GitHub</span>
    </button>
  );
}
