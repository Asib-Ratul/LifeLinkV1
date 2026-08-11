"use client";

import React from "react";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { MobileBottomNav } from "../../components/layout/MobileBottomNav";
import { DashboardSidebar } from "../../components/layout/DashboardSidebar";
import { RoleSwitcher } from "../../components/ui/RoleSwitcher";
import { ShieldCheck, Building2, Users, Droplet, Activity } from "lucide-react";

export default function PlatformAdminPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <RoleSwitcher />
      <Navbar />

      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full flex gap-8">
        <DashboardSidebar />

        <main className="flex-1 space-y-8">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#CBD5E1] shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#087E8B] uppercase tracking-wider block">
                Super Admin Console
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">LifeLink Dhaka Platform System</h1>
              <p className="text-xs text-[#64748B] mt-1">Platform overview, hospital verification, and network analytics.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-[#CBD5E1] shadow-sm space-y-1">
              <span className="text-xs font-bold text-[#64748B]">Verified Hospitals</span>
              <span className="text-3xl font-extrabold text-[#0F172A] font-mono block">12</span>
              <span className="text-xs text-emerald-600 font-bold">Dhaka Metro Area</span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#CBD5E1] shadow-sm space-y-1">
              <span className="text-xs font-bold text-[#64748B]">Active Doctors</span>
              <span className="text-3xl font-extrabold text-[#087E8B] font-mono block">240+</span>
              <span className="text-xs text-[#64748B]">32 Medical Specialties</span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#CBD5E1] shadow-sm space-y-1">
              <span className="text-xs font-bold text-[#64748B]">Active Live Queues</span>
              <span className="text-3xl font-extrabold text-emerald-600 font-mono block">18</span>
              <span className="text-xs text-emerald-600 font-bold">Real-time serial updates</span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#CBD5E1] shadow-sm space-y-1">
              <span className="text-xs font-bold text-[#64748B]">Blood Donors Online</span>
              <span className="text-3xl font-extrabold text-red-600 font-mono block">142</span>
              <span className="text-xs text-red-600 font-bold">Exact-group matching</span>
            </div>
          </div>
        </main>
      </div>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
