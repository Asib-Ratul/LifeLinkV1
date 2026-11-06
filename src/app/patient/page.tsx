"use client";

import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { RoleSwitcher } from "@/components/ui/RoleSwitcher";
import { MOCK_LIVE_QUEUE, MOCK_BLOOD_REQUESTS } from "@/data/mockData";
import { AppointmentService, type BookingResponse } from "@/lib/services/appointmentService";
import { Activity, Clock, FileText, Droplet, Bell, ChevronRight, CheckCircle2, AlertTriangle, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function PatientDashboardPage() {
  const [bookings, setBookings] = useState<BookingResponse[]>([]);
  useEffect(() => setBookings(AppointmentService.getBookings()), []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <RoleSwitcher />
      <Navbar />

      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full flex gap-8">
        <DashboardSidebar />

        <main className="flex-1 space-y-8">
          {/* Welcome User Header */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#CBD5E1] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#087E8B] uppercase tracking-wider block mb-1">
                Patient Control Dashboard
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">Patient Dashboard Preview</h1>
              <p className="text-xs sm:text-sm text-[#64748B] mt-1">
                Preview fictional appointment, queue, and record preference screens. Activity stays in this browser and is not sent to a provider.
              </p>
            </div>

            <Link
              href="/doctors"
              className="bg-[#087E8B] hover:bg-[#075E66] text-white font-bold text-xs px-5 py-3 rounded-xl shadow-sm transition flex items-center gap-2 whitespace-nowrap"
            >
              <span>Book New Serial</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {bookings.length > 0 && <section className="bg-white rounded-2xl border border-[#CBD5E1] shadow-sm p-5 space-y-3">
            <div>
              <h2 className="font-extrabold text-lg text-[#0F172A]">Saved demo bookings</h2>
              <p className="text-xs text-[#64748B]">Stored in this browser only. These are not sent to a provider.</p>
            </div>
            {bookings.map((booking) => <div key={booking.appointmentId} className="flex flex-wrap items-center justify-between gap-3 border-t border-[#E2E8F0] pt-3 text-sm">
              <div>
                <strong>{booking.bookingMode === "QUEUE" ? `Queue serial #${booking.serialNumber}` : `Time slot: ${booking.timeSlot}`}</strong>
                <p className="text-xs text-[#64748B]">Demo appointment • {booking.appointmentId.slice(0, 8)}</p>
              </div>
              <span className="text-xs font-semibold text-amber-700">Local demo only</span>
            </div>)}
          </section>}

          {/* Primary Feature Showcase: Active Live Queue Serial Card */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 sm:p-7 rounded-2xl border border-slate-700 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-700 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Sample Queue Preview
                </span>
              </div>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs px-3 py-0.5 rounded-full font-mono font-bold">
                SIMULATED
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-7 space-y-2">
                <h3 className="text-xl font-extrabold text-white">{MOCK_LIVE_QUEUE.doctorName}</h3>
                <p className="text-xs text-slate-300">{MOCK_LIVE_QUEUE.doctorSpecialty} • {MOCK_LIVE_QUEUE.hospitalName}</p>
                <p className="text-xs text-slate-400">{MOCK_LIVE_QUEUE.chamberRoom}</p>
                <div className="pt-2 text-xs text-emerald-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Sample record sharing state only; no doctor access is granted.</span>
                </div>
              </div>

              <div className="md:col-span-5 bg-slate-800/80 p-4 rounded-xl border border-slate-700 text-center grid grid-cols-2 gap-3">
                <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-700">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Now Serving</span>
                  <span className="text-3xl font-extrabold font-mono text-emerald-400">
                    #{MOCK_LIVE_QUEUE.nowServingSerial}
                  </span>
                </div>
                <div className="bg-teal-950/60 p-2.5 rounded-lg border border-teal-500/40">
                  <span className="text-[10px] text-teal-300 uppercase font-bold block">Your Serial</span>
                  <span className="text-3xl font-extrabold font-mono text-teal-300">
                    #{MOCK_LIVE_QUEUE.userSerial}
                  </span>
                </div>
              </div>
            </div>

            {/* ETA progress line */}
            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-4 text-slate-300">
                <span>Ahead of you: <strong className="text-white">{MOCK_LIVE_QUEUE.patientsAhead} Patients</strong></span>
                <span>•</span>
                <span>Est. Wait: <strong className="text-emerald-400">~{MOCK_LIVE_QUEUE.estimatedWaitMinutes} Mins</strong></span>
              </div>

              <Link
                href={`/queue/${MOCK_LIVE_QUEUE.appointmentId}`}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs px-4 py-2 rounded-lg transition"
              >
                Track Live Queue Fullscreen
              </Link>
            </div>
          </div>

          {/* Near-Turn Warning & Notifications */}
          <div className="bg-[#FFFBEB] p-5 rounded-2xl border border-[#D97706]/30 flex items-start gap-4">
            <div className="p-2 bg-amber-100 rounded-xl text-amber-700">
              <Bell className="w-5 h-5" />
            </div>
            <div className="flex-1 text-xs">
              <h4 className="font-extrabold text-amber-900 text-sm">Near-Turn Arrival Alert</h4>
              <p className="text-amber-800 mt-0.5">
                Sample only: this page displays a fictional queue estimate. It is not a real appointment or arrival instruction.
              </p>
            </div>
          </div>

          {/* Quick Action Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link
              href="/patient/medical-records"
              className="bg-white p-5 rounded-2xl border border-[#CBD5E1] shadow-sm hover:border-[#087E8B] transition space-y-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#E8F6F7] text-[#087E8B] flex items-center justify-center font-bold">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-base text-[#0F172A] group-hover:text-[#087E8B]">Demo Medical Records</h4>
                <p className="text-xs text-[#64748B] mt-1">Manage sample record metadata and a local sharing preference. No file is uploaded.</p>
              </div>
            </Link>

            <Link
              href="/blood"
              className="bg-white p-5 rounded-2xl border border-[#CBD5E1] shadow-sm hover:border-red-500 transition space-y-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
                <Droplet className="w-5 h-5 fill-red-500" />
              </div>
              <div>
                <h4 className="font-extrabold text-base text-[#0F172A] group-hover:text-red-600">Blood Requests</h4>
                <p className="text-xs text-[#64748B] mt-1">Create emergency requests or register as a Dhaka blood donor.</p>
              </div>
            </Link>

            <Link
              href="/doctors"
              className="bg-white p-5 rounded-2xl border border-[#CBD5E1] shadow-sm hover:border-[#087E8B] transition space-y-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#F1F5F9] text-[#0F172A] flex items-center justify-center font-bold">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-base text-[#0F172A] group-hover:text-[#087E8B]">Find Specialist</h4>
                <p className="text-xs text-[#64748B] mt-1">Browse Dhaka doctors by hospital or medical specialty.</p>
              </div>
            </Link>
          </div>
        </main>
      </div>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
