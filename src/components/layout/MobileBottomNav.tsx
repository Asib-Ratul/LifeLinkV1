"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Stethoscope, Calendar, Droplet, User } from "lucide-react";

export const MobileBottomNav: React.FC = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path || (path !== "/" && pathname.startsWith(path));

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E2E8F0] shadow-lg py-2 px-3 flex items-center justify-around">
      <Link
        href="/"
        className={`flex flex-col items-center gap-1 text-[11px] font-semibold transition ${
          pathname === "/" ? "text-[#087E8B]" : "text-[#64748B] hover:text-[#0F172A]"
        }`}
      >
        <Home className="w-5 h-5" />
        <span>Home</span>
      </Link>

      <Link
        href="/doctors"
        className={`flex flex-col items-center gap-1 text-[11px] font-semibold transition ${
          isActive("/doctors") ? "text-[#087E8B]" : "text-[#64748B] hover:text-[#0F172A]"
        }`}
      >
        <Stethoscope className="w-5 h-5" />
        <span>Doctors</span>
      </Link>

      <Link
        href="/patient"
        className={`flex flex-col items-center gap-1 text-[11px] font-semibold transition ${
          isActive("/patient") || isActive("/queue") ? "text-[#087E8B]" : "text-[#64748B] hover:text-[#0F172A]"
        }`}
      >
        <Calendar className="w-5 h-5" />
        <span>Appointments</span>
      </Link>

      <Link
        href="/blood"
        className={`flex flex-col items-center gap-1 text-[11px] font-semibold transition ${
          isActive("/blood") ? "text-red-600 font-bold" : "text-[#64748B] hover:text-red-600"
        }`}
      >
        <Droplet className="w-5 h-5 fill-red-500 text-red-500" />
        <span>Blood</span>
      </Link>

      <Link
        href="/patient/medical-records"
        className={`flex flex-col items-center gap-1 text-[11px] font-semibold transition ${
          isActive("/patient/medical-records") ? "text-[#087E8B]" : "text-[#64748B] hover:text-[#0F172A]"
        }`}
      >
        <User className="w-5 h-5" />
        <span>Profile</span>
      </Link>
    </nav>
  );
};
