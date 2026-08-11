"use client";

import React from "react";
import { User, Stethoscope, ClipboardList, Building2, Shield, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type UserRole = "PATIENT" | "DOCTOR" | "STAFF" | "HOSPITAL_ADMIN" | "PLATFORM_ADMIN";

interface RoleSwitcherProps {
  currentRole?: UserRole;
}

export const RoleSwitcher: React.FC<RoleSwitcherProps> = () => {
  const pathname = usePathname();

  const getRoleFromPath = (path: string): UserRole => {
    if (path.startsWith("/doctor")) return "DOCTOR";
    if (path.startsWith("/staff")) return "STAFF";
    if (path.startsWith("/hospital-admin")) return "HOSPITAL_ADMIN";
    if (path.startsWith("/admin")) return "PLATFORM_ADMIN";
    return "PATIENT";
  };

  const activeRole = getRoleFromPath(pathname);

  return (
    <aside aria-label="Demo Role Switcher" className="bg-slate-900 text-white text-xs border-b border-slate-800 px-4 py-2 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-teal-400" />
          <span className="font-bold text-teal-300">LifeLink Demo Switcher:</span>
          <span className="text-slate-400 hidden sm:inline">Switch views instantly to evaluate role dashboards</span>
        </div>

        <nav aria-label="Role navigation" className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto py-1 sm:py-0">
          <Link
            href="/patient"
            className={`flex items-center gap-1 px-2.5 py-1 rounded font-medium transition whitespace-nowrap ${
              activeRole === "PATIENT"
                ? "bg-teal-500 text-slate-950 font-bold"
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            <User className="w-3 h-3" />
            <span>Patient</span>
          </Link>

          <Link
            href="/doctor"
            className={`flex items-center gap-1 px-2.5 py-1 rounded font-medium transition whitespace-nowrap ${
              activeRole === "DOCTOR"
                ? "bg-teal-500 text-slate-950 font-bold"
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Stethoscope className="w-3 h-3" />
            <span>Doctor</span>
          </Link>

          <Link
            href="/staff/queue"
            className={`flex items-center gap-1 px-2.5 py-1 rounded font-medium transition whitespace-nowrap ${
              activeRole === "STAFF"
                ? "bg-teal-500 text-slate-950 font-bold"
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            <ClipboardList className="w-3 h-3" />
            <span>Staff Queue</span>
          </Link>

          <Link
            href="/hospital-admin"
            className={`flex items-center gap-1 px-2.5 py-1 rounded font-medium transition whitespace-nowrap ${
              activeRole === "HOSPITAL_ADMIN"
                ? "bg-teal-500 text-slate-950 font-bold"
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Building2 className="w-3 h-3" />
            <span>Hosp Admin</span>
          </Link>

          <Link
            href="/admin"
            className={`flex items-center gap-1 px-2.5 py-1 rounded font-medium transition whitespace-nowrap ${
              activeRole === "PLATFORM_ADMIN"
                ? "bg-teal-500 text-slate-950 font-bold"
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Shield className="w-3 h-3" />
            <span>Platform Admin</span>
          </Link>
        </nav>
      </div>
    </aside>
  );
};
