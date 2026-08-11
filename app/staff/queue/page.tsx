"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { RoleSwitcher } from "@/components/ui/RoleSwitcher";
import { QueueService } from "@/lib/services/queueService";
import { Activity, Play, Pause, FastForward, RotateCcw, Plus, CheckCircle2, XCircle, AlertTriangle, UserCheck } from "lucide-react";

export default function StaffQueueDashboardPage() {
  const [queueState, setQueueState] = useState<"SCHEDULED" | "RUNNING" | "PAUSED" | "COMPLETED">("RUNNING");
  const [currentSerial, setCurrentSerial] = useState(18);
  const [totalSerials, setTotalSerials] = useState(35);
  const [skippedSerials, setSkippedSerials] = useState<number[]>([14, 16]);
  const [showWalkInModal, setShowWalkInModal] = useState(false);
  const [walkInName, setWalkInName] = useState("");

  // Canonical Queue Actions (PRD V2 Contract via QueueService)
  const handleStartSession = () => {
    QueueService.resumeQueue();
    setQueueState("RUNNING");
  };

  const handlePauseQueue = () => {
    QueueService.pauseQueue();
    setQueueState("PAUSED");
  };

  const handleResumeQueue = () => {
    QueueService.resumeQueue();
    setQueueState("RUNNING");
  };

  const handleCompleteAndCallNext = () => {
    const updated = QueueService.completeAndCallNext();
    setCurrentSerial(updated.nowServingSerial);
  };

  const handleSkipAndCallNext = () => {
    const updated = QueueService.skipAndCallNext();
    if (!skippedSerials.includes(currentSerial)) {
      setSkippedSerials([...skippedSerials, currentSerial]);
    }
    setCurrentSerial(updated.nowServingSerial);
  };

  const handleRecallSkipped = (serial: number) => {
    const updated = QueueService.recallSkipped(serial);
    setSkippedSerials(skippedSerials.filter((s) => s !== serial));
    setCurrentSerial(updated.nowServingSerial);
  };

  const handleAddWalkIn = (e: React.FormEvent) => {
    e.preventDefault();
    const newSerial = QueueService.addWalkInSerial(walkInName);
    setTotalSerials(newSerial);
    setWalkInName("");
    setShowWalkInModal(false);
  };

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
                Hospital Staff Desk
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">Chamber Live Queue Control</h1>
              <p className="text-xs sm:text-sm text-[#64748B] mt-1">
                Square Hospital • Room 408 • Dr. Sarah Rahman (Cardiology)
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-bold font-mono border ${
                queueState === "RUNNING"
                  ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                  : queueState === "PAUSED"
                  ? "bg-amber-50 text-amber-700 border-amber-300"
                  : "bg-slate-100 text-slate-700 border-slate-300"
              }`}>
                STATUS: {queueState}
              </span>
            </div>
          </div>

          {/* Current Serial & Main Action Board */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#CBD5E1] shadow-sm space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-[#CBD5E1] text-center">
                <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider block">Now Calling / Serving</span>
                <span className="text-6xl font-extrabold font-mono text-[#087E8B] mt-2 block">
                  #{currentSerial}
                </span>
                <span className="text-xs text-[#64748B] mt-1 block">Patient: Nazmul Islam</span>
              </div>

              <div className="space-y-3">
                <h4 className="font-extrabold text-sm text-[#0F172A]">Canonical Queue Actions (PRD Contract)</h4>

                {/* Primary Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleCompleteAndCallNext}
                    className="bg-[#087E8B] hover:bg-[#075E66] text-white font-bold text-xs py-3 px-4 rounded-xl shadow-sm transition flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Complete & Call Next</span>
                  </button>

                  <button
                    onClick={handleSkipAndCallNext}
                    className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs py-3 px-4 rounded-xl shadow-sm transition flex items-center justify-center gap-2"
                  >
                    <FastForward className="w-4 h-4" />
                    <span>Skip & Call Next</span>
                  </button>
                </div>

                {/* Secondary Controls */}
                <div className="grid grid-cols-2 gap-3">
                  {queueState === "RUNNING" ? (
                    <button
                      onClick={handlePauseQueue}
                      className="bg-white hover:bg-slate-100 border border-[#CBD5E1] text-slate-800 font-bold text-xs py-2.5 px-3 rounded-xl transition flex items-center justify-center gap-1.5"
                    >
                      <Pause className="w-3.5 h-3.5 text-amber-600" />
                      <span>Pause Queue</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleResumeQueue}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 px-3 rounded-xl transition flex items-center justify-center gap-1.5"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>Resume Queue</span>
                    </button>
                  )}

                  <button
                    onClick={() => setShowWalkInModal(true)}
                    className="bg-white hover:bg-[#E8F6F7] border border-[#087E8B]/30 text-[#075E66] font-bold text-xs py-2.5 px-3 rounded-xl transition flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#087E8B]" />
                    <span>Add Walk-In Serial</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Skipped Serials Recall Bar */}
            {skippedSerials.length > 0 && (
              <div className="bg-[#FFFBEB] p-4 rounded-xl border border-[#D97706]/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-amber-900 font-bold">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Skipped Serials Awaiting Recall:</span>
                </div>
                <div className="flex items-center gap-2">
                  {skippedSerials.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleRecallSkipped(s)}
                      className="bg-white hover:bg-amber-100 border border-amber-300 text-amber-900 font-mono font-bold px-3 py-1 rounded-lg flex items-center gap-1"
                    >
                      <RotateCcw className="w-3 h-3 text-amber-700" />
                      <span>Recall #{s}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Walk-In Registration Modal */}
      {showWalkInModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-[#CBD5E1] shadow-2xl space-y-4">
            <h3 className="font-extrabold text-lg text-[#0F172A]">Register Walk-In Patient Serial</h3>
            <form onSubmit={handleAddWalkIn} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#64748B] mb-1">Patient Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Anisur Rahman"
                  value={walkInName}
                  onChange={(e) => setWalkInName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F8FAFC] border rounded-xl"
                  required
                />
              </div>

              <div className="p-3 bg-[#E8F6F7] rounded-xl text-[#075E66] font-bold">
                Assigned Next Serial Number: #{totalSerials + 1}
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowWalkInModal(false)} className="flex-1 py-2 font-bold border rounded-xl">
                  Cancel
                </button>
                <button type="submit" className="flex-1 py-2 font-bold bg-[#087E8B] text-white rounded-xl">
                  Issue Walk-In Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
