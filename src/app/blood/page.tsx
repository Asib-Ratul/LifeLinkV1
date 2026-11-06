"use client";

import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { RoleSwitcher } from "@/components/ui/RoleSwitcher";
import { BloodService } from "@/lib/services/bloodService";
import { MOCK_BLOOD_REQUESTS } from "@/data/mockData";
import type { BloodRequest } from "@/types";
import { Droplet, MapPin, Plus, ShieldCheck, CheckCircle2, UserCheck, HeartPulse, X } from "lucide-react";
import Link from "next/link";

export default function BloodNetworkPage() {
  const [bloodRequests, setBloodRequests] = useState(MOCK_BLOOD_REQUESTS);
  const [selectedGroup, setSelectedGroup] = useState("ALL");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDonorModal, setShowDonorModal] = useState(false);

  // Form states for creating blood request
  const [reqBloodGroup, setReqBloodGroup] = useState("O+");
  const [reqUnits, setReqUnits] = useState(2);
  const [reqHospital, setReqHospital] = useState("Panthapath General Hospital");
  const [reqArea, setReqArea] = useState("Panthapath, Dhaka");
  const [reqUrgency, setReqUrgency] = useState<"CRITICAL" | "URGENT" | "STANDARD">("CRITICAL");

  useEffect(() => setBloodRequests(BloodService.getBloodRequests()), []);

  const filteredRequests = bloodRequests.filter((req) => {
    return selectedGroup === "ALL" || req.bloodGroup === selectedGroup;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReq: Omit<BloodRequest, "id" | "status" | "matchedDonorsCount"> = {
      patientNameInitials: "M. H.",
      bloodGroup: reqBloodGroup as BloodRequest["bloodGroup"],
      unitsNeeded: reqUnits,
      hospitalName: reqHospital,
      hospitalArea: reqArea,
      urgency: reqUrgency,
      requiredDate: "Today",
      requiredTime: "As soon as possible",
      verifiedHospitalRequest: false,
    };
    const created = BloodService.createBloodRequest(newReq);
    setBloodRequests((requests) => [created, ...requests]);
    setShowCreateModal(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <RoleSwitcher />
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-10 w-full">
        {/* Banner */}
        <div className="bg-gradient-to-r from-red-900 via-red-950 to-slate-950 text-white p-8 rounded-3xl border border-red-900 shadow-xl mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-600/30 text-red-200 border border-red-500/40 text-xs font-bold rounded-full">
              <Droplet className="w-4 h-4 text-red-400 fill-red-400" />
              <span>Exact-Group Emergency Blood Network</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold">Dhaka Emergency Blood Donor Network</h1>
            <p className="text-xs sm:text-sm text-red-200 leading-relaxed">
              Browse and create fictional requests using exact blood groups. The demo does not contact donors or deliver alerts.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-lg transition flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Create Blood Request</span>
            </button>

            <button
              onClick={() => setShowDonorModal(true)}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs px-5 py-3 rounded-xl transition flex items-center justify-center gap-2"
            >
              <UserCheck className="w-4 h-4 text-emerald-400" />
              <span>Register as Blood Donor</span>
            </button>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6">
          <span className="text-xs font-bold text-[#64748B] mr-2">Blood Group:</span>
          {["ALL", "A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((grp) => (
            <button
              key={grp}
              onClick={() => setSelectedGroup(grp)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                selectedGroup === grp
                  ? "bg-red-600 text-white shadow-sm"
                  : "bg-white border border-[#CBD5E1] text-[#0F172A] hover:bg-[#F1F5F9]"
              }`}
            >
              {grp}
            </button>
          ))}
        </div>

        {/* Request Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRequests.map((req) => (
            <div key={req.id} className="bg-white p-6 rounded-2xl border border-[#CBD5E1] shadow-sm hover:shadow-card transition flex flex-col justify-between space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-red-600 font-extrabold text-2xl text-white flex items-center justify-center shadow-md">
                    {req.bloodGroup}
                  </div>
                  <div>
                    <span className="bg-red-50 text-red-700 border border-red-200 text-[10px] font-bold px-2 py-0.5 rounded">
                      {req.urgency}
                    </span>
                    <h3 className="font-extrabold text-lg text-[#0F172A] mt-1">{req.unitsNeeded} Bag(s) Needed</h3>
                    <p className="text-xs text-[#64748B]">{req.hospitalName}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs text-[#64748B] bg-[#F8FAFC] p-3.5 rounded-xl border border-[#E2E8F0]">
                <div className="flex justify-between">
                  <span>Location:</span>
                  <span className="font-bold text-[#0F172A]">{req.hospitalArea}</span>
                </div>
                <div className="flex justify-between">
                  <span>Required Date:</span>
                  <span className="font-bold text-[#0F172A]">{req.requiredDate} ({req.requiredTime})</span>
                </div>
                <div className="flex justify-between">
                  <span>Donor Responses:</span>
                  <span className="font-bold text-emerald-600">{req.matchedDonorsCount} Matched Donors</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#E2E8F0]">
                <Link
                  href={`/blood/${req.id}`}
                  className="w-full bg-[#087E8B] hover:bg-[#075E66] text-white font-bold text-xs py-2.5 rounded-xl shadow-sm transition block text-center"
                >
                  Respond as Donor / View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Create Blood Request Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-[#CBD5E1] shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-extrabold text-lg text-[#0F172A]">Create Emergency Blood Request</h3>
              <button onClick={() => setShowCreateModal(false)}><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#64748B] mb-1">Required Blood Group</label>
                <select
                  value={reqBloodGroup}
                  onChange={(e) => setReqBloodGroup(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F8FAFC] border rounded-xl"
                >
                  {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(g => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#64748B] mb-1">Units (Bags) Needed</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={reqUnits}
                  onChange={(e) => setReqUnits(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-[#F8FAFC] border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-[#64748B] mb-1">Hospital Name</label>
                <input
                  type="text"
                  value={reqHospital}
                  onChange={(e) => setReqHospital(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F8FAFC] border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-[#64748B] mb-1">Urgency Level</label>
                <select
                  value={reqUrgency}
                  onChange={(e) => setReqUrgency(e.target.value as BloodRequest["urgency"])}
                  className="w-full px-3 py-2 bg-[#F8FAFC] border rounded-xl"
                >
                  <option value="CRITICAL">CRITICAL (Immediate)</option>
                  <option value="URGENT">URGENT (Within 12 hrs)</option>
                  <option value="STANDARD">STANDARD (Scheduled surgery)</option>
                </select>
              </div>

              <div className="pt-2 flex gap-3">
                <button type="button" onClick={() => setShowCreateModal(false)} className="flex-1 py-2.5 font-bold border rounded-xl">
                  Cancel
                </button>
                <button type="submit" className="flex-1 py-2.5 font-bold bg-red-600 text-white rounded-xl">
                  Post Emergency Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Donor Registration Modal */}
      {showDonorModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-[#CBD5E1] shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <UserCheck className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-xl text-[#0F172A]">Register as Emergency Donor</h3>
            <p className="text-xs text-[#64748B]">
              This demo stores no contact details and sends no donor alerts or messages.
            </p>
            <button
              onClick={() => setShowDonorModal(false)}
              className="w-full py-3 bg-[#087E8B] text-white font-bold text-xs rounded-xl"
            >
              Confirm Donor Registration
            </button>
          </div>
        </div>
      )}

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
