"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { RoleSwitcher } from "@/components/ui/RoleSwitcher";
import { MOCK_LIVE_QUEUE } from "@/app/data/mockData";
import { Activity, Clock, Bell, CheckCircle2, RefreshCw, ChevronLeft, MapPin, AlertCircle, ShieldCheck, Settings } from "lucide-react";
import Link from "next/link";

export default function LiveQueueTrackerPage({ params }: { params: { id: string } }) {
  const [queue, setQueue] = useState(MOCK_LIVE_QUEUE);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [notifyAlertSet, setNotifyAlertSet] = useState(true);
  const [alertThreshold, setAlertThreshold] = useState<number>(3); // Default 3 patients ahead per PRD Section 28

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  const alertSerialTarget = Math.max(1, queue.userSerial - alertThreshold);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <RoleSwitcher />
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-10 w-full space-y-8">
        {/* Back Link */}
        <Link href="/patient" className="inline-flex items-center gap-1 text-xs font-bold text-[#087E8B] hover:underline">
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Patient Dashboard</span>
        </Link>

        {/* Live Queue Header Box */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-[#075E66] text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-floating space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-emerald-500 animate-pulse" />
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                  Live Consultation Queue Tracker
                </span>
                <span className="text-xs text-slate-300">Appointment ID: {queue.appointmentId}</span>
              </div>
            </div>

            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs px-4 py-2 rounded-xl border border-slate-700 transition flex items-center gap-2"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-teal-400" : ""}`} />
              <span>Refresh Queue State</span>
            </button>
          </div>

          {/* Doctor & Chamber Details */}
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{queue.doctorName}</h1>
            <p className="text-xs sm:text-sm text-teal-200">{queue.doctorSpecialty} • {queue.hospitalName}</p>
            <p className="text-xs text-slate-300 flex items-center gap-1 mt-1">
              <MapPin className="w-3.5 h-3.5 text-teal-400" />
              <span>{queue.chamberRoom}</span>
            </p>
          </div>

          {/* Large Serial Counter Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-800/80 p-6 rounded-2xl border border-slate-700">
            <div className="text-center p-4 bg-slate-900/90 rounded-xl border border-slate-700">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Currently Serving</span>
              <span className="text-5xl font-extrabold font-mono text-emerald-400 mt-2 block">
                #{queue.nowServingSerial}
              </span>
              <span className="text-[11px] text-emerald-300 font-semibold mt-1 block">In Doctor's Room</span>
            </div>

            <div className="text-center p-4 bg-teal-950/70 rounded-xl border border-teal-500/40">
              <span className="text-xs font-bold text-teal-300 uppercase tracking-wider block">Your Assigned Serial</span>
              <span className="text-5xl font-extrabold font-mono text-teal-300 mt-2 block">
                #{queue.userSerial}
              </span>
              <span className="text-[11px] text-teal-200 font-semibold mt-1 block">Your Turn Pending</span>
            </div>
          </div>

          {/* ETA Metrics Row */}
          <div className="grid grid-cols-3 gap-3 text-center text-xs">
            <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
              <span className="text-slate-400 text-[11px] block">Patients Ahead</span>
              <span className="text-base sm:text-lg font-extrabold text-white">{queue.patientsAhead} Patients</span>
            </div>
            <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
              <span className="text-slate-400 text-[11px] block">Est. Waiting Time</span>
              <span className="text-base sm:text-lg font-extrabold text-emerald-400">~{queue.estimatedWaitMinutes} Mins</span>
            </div>
            <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
              <span className="text-slate-400 text-[11px] block">Expected Turn</span>
              <span className="text-base sm:text-lg font-extrabold text-white">{queue.estimatedTurnTime}</span>
            </div>
          </div>

          <div className="text-center text-xs text-slate-300 border-t border-slate-800 pt-4 flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{queue.statusMessage}</span>
          </div>
        </div>

        {/* Visual Queue Serial Timeline */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#CBD5E1] shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-lg text-[#0F172A]">Chamber Serial Progression</h3>
            <span className="text-xs font-bold text-[#64748B]">Updated Live</span>
          </div>

          <div className="space-y-3">
            {[18, 19, 20, 21, 22, 23, 24, 25].map((serialNum) => {
              const isNowServing = serialNum === queue.nowServingSerial;
              const isUserSerial = serialNum === queue.userSerial;
              const isAlertTarget = serialNum === alertSerialTarget && notifyAlertSet;

              return (
                <div
                  key={serialNum}
                  className={`p-4 rounded-2xl border transition flex items-center justify-between text-xs font-semibold ${
                    isNowServing
                      ? "bg-[#F0FDF4] border-emerald-300 text-emerald-900 shadow-sm"
                      : isUserSerial
                      ? "bg-[#E8F6F7] border-[#087E8B] text-[#075E66] font-bold shadow-sm"
                      : isAlertTarget
                      ? "bg-[#FFFBEB] border-amber-400 text-amber-900 font-bold"
                      : "bg-[#F8FAFC] border-[#E2E8F0] text-[#64748B]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-base font-extrabold w-10">#{serialNum}</span>
                    <span>
                      {isNowServing
                        ? "Patient currently in consultation"
                        : isUserSerial
                        ? "Your Consultation Turn (Rahim Ahmed)"
                        : isAlertTarget
                        ? `Arrival Alert Trigger Serial (${alertThreshold} patients ahead)`
                        : `Waiting patient in chamber queue`}
                    </span>
                  </div>

                  <div>
                    {isNowServing && (
                      <span className="bg-emerald-600 text-white text-[10px] px-2.5 py-1 rounded-full font-bold">
                        NOW SERVING
                      </span>
                    )}
                    {isUserSerial && (
                      <span className="bg-[#087E8B] text-white text-[10px] px-2.5 py-1 rounded-full font-bold">
                        YOUR TURN (#25)
                      </span>
                    )}
                    {isAlertTarget && !isNowServing && !isUserSerial && (
                      <span className="bg-amber-500 text-white text-[10px] px-2.5 py-1 rounded-full font-bold">
                        ALERT TRIGGER
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Near-Turn Notification Customization Box */}
        <div className="bg-white p-6 rounded-3xl border border-[#CBD5E1] shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#E2E8F0] pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#E8F6F7] text-[#087E8B] rounded-2xl">
                <Bell className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-base text-[#0F172A]">Near-Turn Arrival Notifications</h4>
                <p className="text-xs text-[#64748B] mt-0.5">
                  {notifyAlertSet ? (
                    <>You will be alerted when the queue reaches <strong>Serial #{alertSerialTarget}</strong> ({alertThreshold} patients ahead).</>
                  ) : (
                    <>Arrival alert is currently turned off.</>
                  )}
                </p>
              </div>
            </div>

            <button
              onClick={() => setNotifyAlertSet(!notifyAlertSet)}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs transition ${
                notifyAlertSet
                  ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {notifyAlertSet ? "✓ Arrival Alert Active" : "Enable Arrival Alert"}
            </button>
          </div>

          {/* Threshold Manual Selector Dropdown */}
          <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div>
              <span className="font-bold text-[#0F172A] block">Set Alert Distance (PRD Threshold):</span>
              <span className="text-[#64748B] text-[11px]">Choose how many patients ahead trigger your notification.</span>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={alertThreshold}
                onChange={(e) => setAlertThreshold(Number(e.target.value))}
                className="bg-white border border-[#CBD5E1] text-[#0F172A] font-bold px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#087E8B]"
              >
                <option value={1}>1 Patient Ahead</option>
                <option value={2}>2 Patients Ahead</option>
                <option value={3}>3 Patients Ahead (Default)</option>
                <option value={5}>5 Patients Ahead</option>
                <option value={10}>10 Patients Ahead</option>
              </select>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
