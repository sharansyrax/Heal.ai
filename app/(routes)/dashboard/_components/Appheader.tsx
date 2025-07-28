"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignOutButton } from "@/app/_components/Signout-button";
import { Menu, X } from "lucide-react";

const menuoptions = [
  { id: 1, name: "Home", path: "/dashboard" },
  { id: 2, name: "Capture", path: "/dashboard/emotiondetector" },
  { id: 3, name: "AIDoctor", path: "/dashboard/aicare" },
  { id: 4, name: "Profile", path: "/profile" },
];

const Appheader = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <header className=" bg-white shadow-md px-6 py-3 rounded-full m-4 bg-gradient-to-r from-purple-100 to-white flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img src="/logo.png" alt="Heal AI Logo" className="h-[40px] w-[40px]" />
        <span className="text-xl font-bold text-purple-700">Heal.ai</span>
      </div>

      {/* Desktop Nav */}
      <nav className="hidden md:flex gap-6">
        {menuoptions.map((option) => (
          <Link
            key={option.id}
            href={option.path}
            className={`transition font-medium ${
              isActive(option.path)
                ? "text-purple-700 font-semibold border-b-2 border-purple-600"
                : "text-gray-700 hover:text-purple-500"
            }`}
          >
            {option.name}
          </Link>
        ))}
      </nav>

      {/* Mobile Menu Icon */}
      <div className="md:hidden flex items-center">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="h-6 w-6 text-purple-600" /> : <Menu className="h-6 w-6 text-purple-600" />}
        </button>
      </div>

      {/* Sign Out */}
      <div className="hidden md:block">
        <SignOutButton />
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-20 right-6 bg-white rounded-xl shadow-md w-52 flex flex-col items-start p-4 gap-3 z-50">
          {menuoptions.map((option) => (
            <Link
              key={option.id}
              href={option.path}
              onClick={() => setMenuOpen(false)}
              className={`w-full text-left ${
                isActive(option.path)
                  ? "text-purple-700 font-semibold"
                  : "text-gray-700 hover:text-purple-600"
              }`}
            >
              {option.name}
            </Link>
          ))}
          <div className="mt-2">
            <SignOutButton />
          </div>
        </div>
      )}
    </header>
  );
};

export default Appheader;
