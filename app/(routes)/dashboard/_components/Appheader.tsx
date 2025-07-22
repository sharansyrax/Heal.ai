import React from "react";
import Link from "next/link";
import { SignOutButton } from "@/app/_components/Signout-button";

const menuoptions = [
  { id: 1, name: "Home", path: "/dashboard" },
  { id: 2, name: "capture", path: "/dashboard/emotiondetector" },
  { id: 3, name: "aidoctor", path: "/dashboard/aicare" },
  { id: 4, name: "Profile", path: "/profile" },
];

const Appheader = () => {
  return (
    <div className="flex justify-between items-center p-4 m-4 shadow-md bg-white rounded-full bg-gradient-to-r from-purple-100 to-white-100 ">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img src="/logo.png" alt="Heal AI Logo" className="h-[40px] w-[40px]" />
        <span className="text-xl font-bold text-purple-600">Heal.ai</span>
      </div>

      {/* Navigation */}
      <div className="hidden md:flex gap-6">
        {menuoptions.map((option) => (
          <Link
            key={option.id}
            href={option.path}
            className="text-gray-700 hover:text-purple-600 font-medium transition"
          >
            {option.name}
          </Link>
        ))}
      </div>

      {/* Sign Out */}
      <div>
        <SignOutButton />
      </div>
    </div>
  );
};

export default Appheader;
