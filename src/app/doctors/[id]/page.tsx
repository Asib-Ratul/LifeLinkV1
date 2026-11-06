"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { RoleSwitcher } from "@/components/ui/RoleSwitcher";
import { MOCK_DOCTORS } from "@/data/mockData";
import { BookingModal } from "@/components/modals/BookingModal";
import { Doctor } from "@/types";
import { Star, MapPin, Clock, ShieldCheck, Activity, Award, Calendar, CheckCircle2, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function DoctorDetailPage({ params }: { params: { id: string } }) {
  const doctor: Doctor | undefined = MOCK_DOCTORS.find((d) => d.id === params.id);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  if (!doctor) return <main className="min-h-screen p-10 text-center">Clinician not found. <Link href="/doctors" className="text-[#087E8B] underline">Return to the directory</Link></main>;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <RoleSwitcher />
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-10 w-full">
        {/* Back Link */}
        <Link href="/doctors" className="inline-flex items-center gap-1 text-xs font-bold text-[#087E8B] mb-6 hover:underline">
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Specialists Directory</span>
        </Link>

        {/* Doctor Main Header Box */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#CBD5E1] shadow-sm mb-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <img
              src={doctor.avatarUrl}
              alt={doctor.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-4 border-[#E8F6F7] shadow-sm"
            />
            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-[#E8F6F7] text-[#075E66] text-xs font-bold px-3 py-1 rounded-full">
                  {doctor.specialty}
                </span>
                <span className="bg-slate-100 text-slate-700 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#087E8B]" />
                  <span>Public Listing Profile</span>
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">{doctor.title}</h1>
              <p className="text-xs sm:text-sm text-[#64748B] flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#087E8B]" />
                <span>{doctor.hospital} • {doctor.hospitalArea}</span>
              </p>

              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-[#64748B]">
                <div className="flex items-center gap-1 font-bold text-[#0F172A]">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span>{doctor.rating}</span>
                  <span className="text-[#64748B] font-normal">({doctor.reviewsCount} reviews)</span>
                </div>
                <div>Experience: <strong>{doctor.experienceYears} Years</strong></div>
                <div>Consultation Fee: <strong className="text-[#087E8B] text-sm">৳{doctor.fee}</strong></div>
              </div>
            </div>

            <div className="w-full sm:w-auto pt-4 sm:pt-0">
              <button
                onClick={() => setIsBookingOpen(true)}
                className="w-full sm:w-auto bg-[#087E8B] hover:bg-[#075E66] text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-md transition flex items-center justify-center gap-2"
              >
                <Activity className="w-4 h-4" />
                <span>Book Live Serial</span>
              </button>
            </div>
          </div>
        </div>

        {/* Live Queue Status Banner */}
        {doctor.currentSerial && doctor.currentSerial > 0 && (
          <div className="bg-[#F0FDF4] p-5 rounded-2xl border border-emerald-200 shadow-sm mb-8 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                <Activity className="w-5 h-5 text-emerald-600 animate-pulse" />
                <span>Today&apos;s Consultation Queue is RUNNING</span>
              </div>
              <span className="bg-emerald-600 text-white text-xs px-2.5 py-0.5 rounded-full font-bold">
                Live Chamber
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <div className="bg-white p-3 rounded-xl border border-emerald-200">
                <span className="block text-[#64748B] text-[11px]">Now Serving</span>
                <span className="text-2xl font-extrabold text-emerald-600 font-mono">#{doctor.currentSerial}</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-emerald-200">
                <span className="block text-[#64748B] text-[11px]">Total Registered</span>
                <span className="text-2xl font-extrabold text-[#0F172A] font-mono">#{doctor.totalSerials}</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-emerald-200">
                <span className="block text-[#64748B] text-[11px]">Avg Time/Patient</span>
                <span className="text-2xl font-extrabold text-[#087E8B] font-mono">~{doctor.avgWaitTimePerPatientMin}m</span>
              </div>
            </div>
          </div>
        )}

        {/* Chamber & Schedule Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-8 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-[#CBD5E1] shadow-sm space-y-4">
              <h3 className="font-extrabold text-lg text-[#0F172A]">Chamber Schedule & Location</h3>
              <div className="space-y-3 text-xs text-[#64748B]">
                <div className="flex justify-between border-b border-[#E2E8F0] pb-2">
                  <span className="font-bold text-[#0F172A]">Chamber Address:</span>
                  <span>{doctor.hospital}, Room 408, 4th Floor</span>
                </div>
                <div className="flex justify-between border-b border-[#E2E8F0] pb-2">
                  <span className="font-bold text-[#0F172A]">Visiting Days:</span>
                  <span>Saturday to Thursday (5:00 PM – 9:00 PM)</span>
                </div>
                <div className="flex justify-between border-b border-[#E2E8F0] pb-2">
                  <span className="font-bold text-[#0F172A]">Serial Distribution:</span>
                  <span>Starts 4:00 PM (In-person & LifeLink Online)</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#CBD5E1] shadow-sm space-y-3">
              <h3 className="font-extrabold text-lg text-[#0F172A]">About & Qualifications</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Senior consultant physician with extensive clinical experience in Dhaka hospitals. Specialized in comprehensive cardiology diagnostics, preventive heart care, and post-operative monitoring.
              </p>
            </div>
          </div>

          <div className="md:col-span-4 space-y-6">
            <div className="bg-[#E8F6F7] p-6 rounded-2xl border border-[#087E8B]/20 space-y-4">
              <h4 className="font-bold text-sm text-[#075E66]">Need Assistance?</h4>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Preview a simulated booking. Nothing is reserved with a real clinician and queue progress is not live.
              </p>
              <button
                onClick={() => setIsBookingOpen(true)}
                className="w-full bg-[#087E8B] hover:bg-[#075E66] text-white font-bold text-xs py-3 rounded-xl shadow-sm transition"
              >
                Preview Demo Booking
              </button>
            </div>
          </div>
        </div>
      </main>

      {isBookingOpen && (
        <BookingModal
          doctor={doctor}
          isOpen={true}
          onClose={() => setIsBookingOpen(false)}
          onSuccess={(data) => {
            void data;
          }}
        />
      )}

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
