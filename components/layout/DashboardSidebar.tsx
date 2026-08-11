"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Stethoscope,
  ClipboardList,
  Users,
  FileText,
  Building2,
  ShieldCheck,
  LogOut,
  Activity,
  Droplet,
  ChevronRight,
  UserCheck,
} from "lucide-react";

interface SidebarItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

export const DashboardSidebar: React.FC = () => {
  const pathname = usePathname();

  let roleTitle = "Patient Portal";
  let items: SidebarItem[] = [
    { label: "Overview", href: "/patient", icon: LayoutDashboard },
    { label: "My Queue Serials", href: "/queue/apt-10492", icon: Activity },
    { label: "Medical Records", href: "/patient/medical-records", icon: FileText },
    { label: "Blood Requests", href: "/blood", icon: Droplet },
  ];

  if (pathname.startsWith("/doctor")) {
    roleTitle = "Doctor Dashboard";
    items = [
      { label: "My Chamber Today", href: "/doctor", icon: Stethoscope },
      { label: "Live Queue Control", href: "/staff/queue", icon: Activity },
      { label: "Patient Medical Records", href: "/patient/medical-records", icon: FileText },
      { label: "Chamber Settings", href: "/doctor", icon: Building2 },
    ];
  } else if (pathname.startsWith("/staff")) {
    roleTitle = "Hospital Staff Queue";
    items = [
      { label: "Live Queue Management", href: "/staff/queue", icon: Activity },
      { label: "Walk-In Serial Registration", href: "/staff/queue", icon: UserCheck },
      { label: "Today's Patient Roster", href: "/staff/queue", icon: ClipboardList },
    ];
  } else if (pathname.startsWith("/hospital-admin")) {
    roleTitle = "Hospital Admin";
    items = [
      { label: "Overview & Analytics", href: "/hospital-admin", icon: LayoutDashboard },
      { label: "Doctor Roster & Rooms", href: "/doctors", icon: Users },
      { label: "Emergency Blood Bank", href: "/blood", icon: Droplet },
    ];
  } else if (pathname.startsWith("/admin")) {
    roleTitle = "Platform Admin";
    items = [
      { label: "System Health & Metrics", href: "/admin", icon: ShieldCheck },
      { label: "Hospital Approvals", href: "/hospitals", icon: Building2 },
      { label: "Doctor Accounts", href: "/doctors", icon: Users },
      { label: "Emergency Blood Network", href: "/blood", icon: Droplet },
    ];
  }

  return (
    <aside className="w-64 bg-white border-r border-[#E2E8F0] min-h-[calc(100vh-100px)] p-4 flex flex-col justify-between hidden md:flex">
      <div className="space-y-6">
        <div>
          <span className="text-[10px] font-bold text-[#087E8B] uppercase tracking-wider block mb-1">
            Active Workspace
          </span>
          <h3 className="font-extrabold text-base text-[#0F172A]">{roleTitle}</h3>
        </div>

        <nav className="space-y-1">
          {items.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href + item.label}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition ${
                  active
                    ? "bg-[#E8F6F7] text-[#075E66] border border-[#087E8B]/20"
                    : "text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${active ? "text-[#087E8B]" : "text-[#94A3B8]"}`} />
                  <span>{item.label}</span>
                </div>
                {active && <ChevronRight className="w-3.5 h-3.5 text-[#087E8B]" />}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="pt-4 border-t border-[#E2E8F0] space-y-3">
        <div className="bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0] text-xs space-y-1">
          <span className="font-bold text-[#0F172A] block">Dhaka Demo Instance</span>
          <span className="text-[11px] text-[#64748B] block">Role-based access authorized</span>
        </div>

        <Link
          href="/"
          className="w-full flex items-center justify-center gap-2 text-xs font-semibold text-red-600 hover:bg-red-50 p-2 rounded-xl border border-red-200 transition"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Exit Dashboard</span>
        </Link>
      </div>
    </aside>
  );
};
