"use client";

import { LogOut } from "lucide-react"; // optional: icon
import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-900 text-white font-semibold px-3 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
    >
      <LogOut className="w-4 h-4" />
      Sign Out
    </button>
  );
}
