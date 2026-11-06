"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { RoleSwitcher } from "@/components/ui/RoleSwitcher";
import { MOCK_HOSPITALS } from "@/data/mockData";
import { MapPin, Search, PhoneCall, Building2, Droplet, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HospitalsDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArea, setSelectedArea] = useState("All");

  const filteredHospitals = MOCK_HOSPITALS.filter((h) => {
    const matchesSearch = h.name.toLowerCase().includes(searchQuery.toLowerCase()) || h.area.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesArea = selectedArea === "All" || h.area.includes(selectedArea);
    return matchesSearch && matchesArea;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <RoleSwitcher />
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-10 w-full">
        {/* Header */}
        <div className="mb-8 space-y-2">
          <span className="text-xs font-bold text-[#087E8B] uppercase tracking-wider">
            Dhaka Medical Centers
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A]">Hospitals & Medical Hubs</h1>
          <p className="text-sm text-[#64748B] max-w-2xl">
            Browse fictional Dhaka-area hospital listings for the LifeLink interface demo.
          </p>
        </div>

        {/* Filter bar */}
        <div className="bg-white p-5 rounded-2xl border border-[#CBD5E1] shadow-sm mb-8 grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-8 relative">
            <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search hospital name or area..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 text-sm bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#087E8B]"
            />
          </div>

          <div className="md:col-span-4">
            <select
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className="w-full px-3 py-2.5 text-sm bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#087E8B]"
            >
              <option value="All">All Dhaka Locations</option>
              <option value="Panthapath">Panthapath</option>
              <option value="Dhanmondi">Dhanmondi</option>
              <option value="Bashundhara">Bashundhara R/A</option>
            </select>
          </div>
        </div>

        {/* Hospital Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredHospitals.map((hosp) => (
            <div key={hosp.id} className="bg-white rounded-2xl border border-[#CBD5E1] overflow-hidden shadow-sm hover:shadow-card transition flex flex-col justify-between">
              <div className="relative h-44">
                <img src={hosp.imageUrl} alt={hosp.name} className="w-full h-full object-cover" />
                <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-[#0F172A] text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                  {hosp.distanceKm} km away
                </span>
                {hosp.hasEmergencyBloodBank && (
                  <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                    <Droplet className="w-3 h-3 fill-white" />
                    Blood Bank
                  </span>
                )}
              </div>

              <div className="p-5 flex-1 space-y-3">
                <div>
                  <span className="text-[10px] font-bold text-[#087E8B] uppercase tracking-wider">{hosp.type}</span>
                  <h3 className="font-extrabold text-base text-[#0F172A]">{hosp.name}</h3>
                  <p className="text-xs text-[#64748B] mt-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#94A3B8]" />
                    {hosp.address}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs text-[#64748B] pt-2 border-t border-[#E2E8F0]">
                  <span><strong>{hosp.doctorsCount}</strong> Doctors</span>
                  <span><strong>{hosp.specialtiesCount}</strong> Departments</span>
                </div>
              </div>

              <div className="p-5 pt-0">
                <Link
                  href={`/hospitals/${hosp.id}`}
                  className="w-full bg-[#F8FAFC] hover:bg-[#E8F6F7] border border-[#CBD5E1] text-[#075E66] font-bold text-xs py-2.5 rounded-xl transition flex items-center justify-center gap-2"
                >
                  <span>View Hospital Chamber List</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
