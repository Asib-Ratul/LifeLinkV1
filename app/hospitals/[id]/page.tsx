"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { RoleSwitcher } from "@/components/ui/RoleSwitcher";
import { MOCK_HOSPITALS, MOCK_DOCTORS } from "@/app/data/mockData";
import { MapPin, PhoneCall, Droplet, ChevronLeft, Building2, Stethoscope, Star } from "lucide-react";
import Link from "next/link";

export default function HospitalDetailPage({ params }: { params: { id: string } }) {
  const hospital = MOCK_HOSPITALS.find((h) => h.id === params.id) || MOCK_HOSPITALS[0];
  const hospitalDoctors = MOCK_DOCTORS.filter((d) => d.hospital.includes(hospital.name.split(" ")[0]));

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <RoleSwitcher />
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-10 w-full">
        <Link href="/hospitals" className="inline-flex items-center gap-1 text-xs font-bold text-[#087E8B] mb-6 hover:underline">
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Hospital Directory</span>
        </Link>

        {/* Hero banner */}
        <div className="bg-white rounded-2xl border border-[#CBD5E1] overflow-hidden shadow-sm mb-8">
          <div className="relative h-56 sm:h-72">
            <img src={hospital.imageUrl} alt={hospital.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6 sm:p-8">
              <div className="text-white space-y-1">
                <span className="bg-[#087E8B] text-white text-xs font-bold px-3 py-1 rounded-full">
                  {hospital.type}
                </span>
                <h1 className="text-2xl sm:text-4xl font-extrabold">{hospital.name}</h1>
                <p className="text-xs sm:text-sm text-slate-200 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-teal-400" />
                  {hospital.address} ({hospital.distanceKm} km away)
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-[#E2E8F0] text-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#E8F6F7] text-[#087E8B] flex items-center justify-center font-bold">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[#64748B] block">Emergency Hotline</span>
                <span className="font-extrabold text-[#0F172A] font-mono text-sm">{hospital.emergencyPhone}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
                <Droplet className="w-5 h-5 fill-red-600" />
              </div>
              <div>
                <span className="text-[#64748B] block">Emergency Blood Bank</span>
                <span className="font-bold text-[#0F172A]">
                  {hospital.hasEmergencyBloodBank ? "24/7 Blood Bank Active" : "On-call donor network"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-[#0F172A] flex items-center justify-center font-bold">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[#64748B] block">Consultation Chambers</span>
                <span className="font-bold text-[#0F172A]">{hospital.doctorsCount}+ Registered Specialists</span>
              </div>
            </div>
          </div>
        </div>

        {/* Associated Doctors Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-[#0F172A]">Chamber Doctors at {hospital.name}</h2>
            <Link href="/doctors" className="text-xs font-bold text-[#087E8B] hover:underline">
              View All Doctors
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hospitalDoctors.map((doc) => (
              <div key={doc.id} className="bg-white p-5 rounded-2xl border border-[#CBD5E1] shadow-sm flex items-start gap-4">
                <img src={doc.avatarUrl} alt={doc.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-[#E8F6F7]" />
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="bg-[#E8F6F7] text-[#075E66] text-xs font-bold px-2.5 py-0.5 rounded-full">
                      {doc.specialty}
                    </span>
                    <span className="text-xs font-bold text-[#0F172A]">★ {doc.rating}</span>
                  </div>
                  <h4 className="font-extrabold text-sm text-[#0F172A]">{doc.title}</h4>
                  <p className="text-xs text-[#64748B]">Fee: ৳{doc.fee} | Exp: {doc.experienceYears} yrs</p>

                  <div className="pt-2">
                    <Link
                      href={`/doctors/${doc.id}`}
                      className="inline-block bg-[#087E8B] text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-[#075E66]"
                    >
                      Book Chamber Serial
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
