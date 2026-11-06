"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, Bell, Droplet, User, Search, Menu, X, ArrowRight } from "lucide-react";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasUnreadNotification, setHasUnreadNotification] = useState(true);

  const isActive = (path: string) => pathname === path || (path !== "/" && pathname.startsWith(path));

  return (
    <header className="bg-white border-b border-[#E2E8F0] sticky top-[37px] z-40 shadow-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#075E66] to-[#087E8B] text-white font-extrabold flex items-center justify-center text-lg shadow-md">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-extrabold text-2xl tracking-tight text-[#0F172A]">Life<span className="text-[#087E8B]">Link</span></span>
            <span className="block text-[10px] text-[#64748B] font-semibold tracking-wider uppercase">Dhaka Healthcare</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-[#64748B]">
          <Link
            href="/"
            className={`transition py-6 ${isActive("/") && pathname === "/" ? "text-[#087E8B] font-bold border-b-2 border-[#087E8B]" : "hover:text-[#0F172A]"}`}
          >
            Home
          </Link>
          <Link
            href="/doctors"
            className={`transition py-6 ${isActive("/doctors") ? "text-[#087E8B] font-bold border-b-2 border-[#087E8B]" : "hover:text-[#0F172A]"}`}
          >
            Find Doctors
          </Link>
          <Link
            href="/hospitals"
            className={`transition py-6 ${isActive("/hospitals") ? "text-[#087E8B] font-bold border-b-2 border-[#087E8B]" : "hover:text-[#0F172A]"}`}
          >
            Hospitals
          </Link>
          <Link
            href="/blood"
            className={`transition py-6 flex items-center gap-1.5 ${isActive("/blood") ? "text-red-600 font-bold border-b-2 border-red-600" : "text-red-600 hover:text-red-700"}`}
          >
            <Droplet className="w-4 h-4 fill-red-500 text-red-500" />
            <span>Blood Network</span>
          </Link>
        </nav>

        {/* Desktop User Right Control */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/patient"
            className="relative p-2.5 rounded-xl hover:bg-[#F1F5F9] text-[#64748B] hover:text-[#0F172A] transition"
            title="Notifications"
          >
            <Bell className="w-5 h-5 text-[#64748B]" />
            {hasUnreadNotification && (
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white animate-pulse" />
            )}
          </Link>

          <Link
            href="/patient"
            className="flex items-center gap-2.5 bg-[#F8FAFC] hover:bg-[#E8F6F7] border border-[#CBD5E1] p-1.5 pr-3.5 rounded-xl transition"
          >
            <div className="w-8 h-8 rounded-lg bg-[#087E8B] text-white font-bold flex items-center justify-center text-xs">
              RA
            </div>
            <div className="text-left">
              <span className="block text-xs font-bold text-[#0F172A]">Demo Patient</span>
              <span className="block text-[10px] text-[#64748B]">Patient Dashboard</span>
            </div>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-[#0F172A] hover:bg-[#F1F5F9]"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#E2E8F0] px-4 pt-3 pb-6 space-y-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 font-semibold text-sm text-[#0F172A]"
          >
            Home
          </Link>
          <Link
            href="/doctors"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 font-semibold text-sm text-[#0F172A]"
          >
            Find Doctors
          </Link>
          <Link
            href="/hospitals"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 font-semibold text-sm text-[#0F172A]"
          >
            Hospitals
          </Link>
          <Link
            href="/blood"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 font-semibold text-sm text-red-600 flex items-center gap-2"
          >
            <Droplet className="w-4 h-4 fill-red-500" />
            <span>Blood Requests</span>
          </Link>
          <div className="pt-3 border-t border-[#E2E8F0] flex flex-col gap-2">
            <Link
              href="/patient"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center bg-[#087E8B] text-white font-bold py-2.5 rounded-xl text-sm"
            >
              Patient Dashboard
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
