"use client";

import React from "react";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { MobileBottomNav } from "../../components/layout/MobileBottomNav";
import { DashboardSidebar } from "../../components/layout/DashboardSidebar";
import { RoleSwitcher } from "../../components/ui/RoleSwitcher";
import { Building2, Users, Activity, Droplet, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function HospitalAdminPage() {
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
                Hospital Administration Portal
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">Square Hospital Management</h1>
              <p className="text-xs text-[#64748B] mt-1">Panthapath, Dhaka • 145 Active Specialists • Emergency Blood Bank Active</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-[#CBD5E1] shadow-sm space-y-2">
              <span className="text-xs font-bold text-[#64748B]">Active Consultation Chambers</span>
              <span className="text-3xl font-extrabold text-[#0F172A] font-mono block">18 Rooms</span>
              <span className="text-xs text-emerald-600 font-bold">14 Live Queues Running</span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#CBD5E1] shadow-sm space-y-2">
              <span className="text-xs font-bold text-[#64748B]">Today's Total Patients</span>
              <span className="text-3xl font-extrabold text-[#087E8B] font-mono block">420</span>
              <span className="text-xs text-[#64748B]">~12 mins average turn duration</span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#CBD5E1] shadow-sm space-y-2">
              <span className="text-xs font-bold text-[#64748B]">Emergency Blood Bank</span>
              <span className="text-3xl font-extrabold text-red-600 font-mono block">48 Bags</span>
              <span className="text-xs text-emerald-600 font-bold">O+ & B+ stock verified</span>
            </div>
          </div>
        </main>
      </div>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
