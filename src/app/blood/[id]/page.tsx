"use client";

import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { RoleSwitcher } from "@/components/ui/RoleSwitcher";
import { BloodService } from "@/lib/services/bloodService";
import type { BloodRequest } from "@/types";
import { Droplet, MapPin, ShieldCheck, CheckCircle2, PhoneCall, ChevronLeft, Lock } from "lucide-react";
import Link from "next/link";

export default function BloodRequestDetailPage({ params }: { params: { id: string } }) {
  const [request, setRequest] = useState<BloodRequest | undefined>();
  const [donorResponded, setDonorResponded] = useState(false);
  const [consentSharePhone, setConsentSharePhone] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => setRequest(BloodService.getBloodRequest(params.id)), [params.id]);

  const handleRespondDonor = () => {
    const result = BloodService.respondAsDonor(params.id, consentSharePhone);
    setResponseMessage(result.message);
    if (result.success) setDonorResponded(true);
  };

  if (!request) return <main className="min-h-screen p-10 text-center">Request not found. <Link href="/blood" className="text-[#087E8B] underline">Return to the blood network</Link></main>;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <RoleSwitcher />
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-10 w-full space-y-8">
        <Link href="/blood" className="inline-flex items-center gap-1 text-xs font-bold text-[#087E8B] hover:underline">
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Blood Requests Directory</span>
        </Link>

        {/* Request Card Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#CBD5E1] shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b border-[#E2E8F0] pb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-red-600 font-extrabold text-3xl text-white flex items-center justify-center shadow-md">
                {request.bloodGroup}
              </div>
              <div>
                <span className="bg-red-50 text-red-700 border border-red-200 text-xs font-bold px-2.5 py-0.5 rounded-full">
                  {request.urgency} EMERGENCY
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mt-1">
                  {request.unitsNeeded} Bag(s) {request.bloodGroup} Blood Needed
                </h1>
                <p className="text-xs text-[#64748B] mt-0.5">{request.hospitalName} • {request.hospitalArea}</p>
              </div>
            </div>
          </div>

          {/* Privacy Rules Reminder Box (PRD Section 5) */}
          <div className="bg-[#E8F6F7] p-5 rounded-2xl border border-[#087E8B]/20 flex items-start gap-4">
            <div className="p-2 bg-white rounded-xl text-[#087E8B] shadow-subtle">
              <Lock className="w-5 h-5" />
            </div>
            <div className="text-xs space-y-1">
              <h4 className="font-extrabold text-[#075E66] text-sm">Donor Contact Privacy Protocol</h4>
              <p className="text-[#64748B]">
                This demo stores no real phone numbers. Your consent selection is simulated locally; no contact details are collected or shared.
              </p>
            </div>
          </div>

          {!donorResponded ? (
            <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-[#E2E8F0] space-y-4 text-xs">
              <h3 className="font-extrabold text-base text-[#0F172A]">Respond as Blood Donor</h3>
              <p className="text-[#64748B]">
                If you are willing to donate {request.bloodGroup} blood at {request.hospitalName} on {request.requiredDate}, please confirm below.
              </p>

              <label className="flex items-center gap-2 cursor-pointer pt-2">
                <input
                  type="checkbox"
                  checked={consentSharePhone}
                  onChange={(e) => setConsentSharePhone(e.target.checked)}
                  className="w-4 h-4 text-red-600 rounded border-slate-300 focus:ring-red-500"
                />
                <span className="font-bold text-[#0F172A]">
                  Record my demo donor response with the consent option selected.
                </span>
              </label>

              <button
                onClick={handleRespondDonor}
                disabled={!consentSharePhone}
                className={`w-full py-3 font-bold text-xs rounded-xl shadow-sm transition ${
                  consentSharePhone
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                }`}
              >
                I Am Ready to Donate {request.bloodGroup} Blood
              </button>
            </div>
          ) : (
            <div className="bg-[#F0FDF4] p-6 rounded-2xl border border-emerald-200 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="font-extrabold text-xl text-emerald-900">Thank You for Offering to Donate!</h3>
              <p className="text-xs text-emerald-800">
                {responseMessage}
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
