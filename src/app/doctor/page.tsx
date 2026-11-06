"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { RoleSwitcher } from "@/components/ui/RoleSwitcher";
import { MOCK_LIVE_QUEUE } from "@/data/mockData";
import { Stethoscope, Activity, FileText, CheckCircle2, Users, Building2, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function DoctorDashboardPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <RoleSwitcher />
      <Navbar />

      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full flex gap-8">
        <DashboardSidebar />

        <main className="flex-1 space-y-8">
          {/* Header */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#CBD5E1] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#087E8B] uppercase tracking-wider block mb-1">
                Fictional Doctor Dashboard Preview
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">Prof. Dr. Sarah Rahman</h1>
              <p className="text-xs sm:text-sm text-[#64748B] mt-1">
                Panthapath General Hospital • Room 408 • Cardiology Chamber
              </p>
            </div>

            <Link
              href="/staff/queue"
              className="bg-[#087E8B] hover:bg-[#075E66] text-white font-bold text-xs px-5 py-3 rounded-xl shadow-sm transition flex items-center gap-2"
            >
              <Activity className="w-4 h-4" />
              <span>Open Live Queue Control</span>
            </Link>
          </div>

          {/* Today Chamber Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-[#CBD5E1] shadow-sm">
              <span className="text-xs font-bold text-[#64748B] block">Now Serving</span>
              <span className="text-3xl font-extrabold text-emerald-600 font-mono mt-1 block">#18</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-[#CBD5E1] shadow-sm">
              <span className="text-xs font-bold text-[#64748B] block">Total Registered</span>
              <span className="text-3xl font-extrabold text-[#0F172A] font-mono mt-1 block">35</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-[#CBD5E1] shadow-sm">
              <span className="text-xs font-bold text-[#64748B] block">Completed Today</span>
              <span className="text-3xl font-extrabold text-[#087E8B] font-mono mt-1 block">17</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-[#CBD5E1] shadow-sm">
              <span className="text-xs font-bold text-[#64748B] block">Avg Visit Duration</span>
              <span className="text-3xl font-extrabold text-amber-600 font-mono mt-1 block">8 min</span>
            </div>
          </div>

          {/* Current Active Patient Box */}
          <div className="bg-white p-6 rounded-2xl border border-[#CBD5E1] shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b border-[#E2E8F0] pb-3">
              <h3 className="font-extrabold text-lg text-[#0F172A]">Sample Queue Patient</h3>
              <span className="bg-emerald-50 text-emerald-700 font-bold text-xs px-3 py-1 rounded-full border border-emerald-200">
                SERIAL #18
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-extrabold text-base text-[#0F172A]">Demo Patient</h4>
                <p className="text-xs text-[#64748B] mt-0.5">Sample appointment details</p>
                <div className="mt-2 text-xs font-bold text-[#087E8B] flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-[#087E8B]" />
                  <span>No real record or patient data is connected to this screen</span>
                </div>
              </div>

              <Link
                href="/patient/medical-records"
                className="bg-[#E8F6F7] text-[#075E66] hover:bg-[#087E8B] hover:text-white font-bold text-xs px-4 py-2.5 rounded-xl border border-[#087E8B]/20 transition flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>View Sample Record Screen</span>
              </Link>
            </div>
          </div>
        </main>
      </div>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
