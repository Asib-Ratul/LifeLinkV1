"use client";

import React, { useState } from "react";
import {
  Search,
  MapPin,
  Clock,
  HeartPulse,
  Stethoscope,
  Activity,
  Droplet,
  Users,
  ChevronRight,
  ShieldCheck,
  Star,
  CheckCircle2,
  Building2,
  ListFilter,
  Zap,
} from "lucide-react";
import { MOCK_DOCTORS, MOCK_HOSPITALS, MOCK_SPECIALTIES, MOCK_LIVE_QUEUE, MOCK_BLOOD_REQUESTS } from "../../app/data/mockData";

export const DirectionC_CompactDigitalHealth: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900">
      {/* Top Demo Notification Strip */}
      <div className="bg-slate-800 text-slate-200 text-[11px] py-1.5 px-4 flex items-center justify-between border-b border-slate-700 font-mono">
        <div>LIFE-LINK // DHAKA DIGITAL HEALTH MATRIX</div>
        <div className="hidden sm:block">Academic Demo Data Only • Non-Clinical</div>
      </div>

      {/* Navbar Compact */}
      <header className="bg-white border-b border-slate-300 sticky top-[57px] z-40">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-teal-600 text-white font-black flex items-center justify-center text-xs">
                LL
              </div>
              <span className="font-bold text-lg tracking-tight">LifeLink <span className="text-xs bg-teal-100 text-teal-800 px-1.5 py-0.5 rounded font-mono">Compact v1</span></span>
            </div>

            {/* Quick stats pills */}
            <div className="hidden md:flex items-center gap-2 text-xs font-mono">
              <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded border border-slate-200">
                Docs: <strong>240+</strong>
              </span>
              <span className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded border border-emerald-200">
                Queues Active: <strong>18</strong>
              </span>
              <span className="bg-red-50 text-red-700 px-2 py-1 rounded border border-red-200">
                Blood Donors: <strong>142</strong>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white px-3 py-1.5 rounded transition">
              Quick Book
            </button>
          </div>
        </div>
      </header>

      {/* Hero Compact Data Bar */}
      <section className="bg-slate-900 text-white py-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-mono rounded">
              <Zap className="w-3.5 h-3.5 text-teal-400" />
              <span>Compact High-Efficiency UI</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Dhaka Medical Directory & Live Queue Tracker
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm max-w-xl">
              Instant filtering for doctors, chamber schedules, estimated turn times, and direct exact-group emergency blood requests across Dhanmondi, Panthapath & Gulshan.
            </p>

            {/* Compact search inline */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Filter doctor name or specialty..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-800 border border-slate-700 text-white rounded focus:outline-none focus:border-teal-500"
                />
              </div>
              <button className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs px-4 py-2 rounded transition">
                Find Fast
              </button>
            </div>
          </div>

          {/* Hero Right Compact Queue Box */}
          <div className="lg:col-span-5 bg-slate-800 p-4 rounded border border-slate-700 font-mono">
            <div className="flex items-center justify-between text-xs border-b border-slate-700 pb-2 mb-3">
              <span className="text-teal-400 font-bold flex items-center gap-1">
                <Activity className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
                ACTIVE QUEUE #10492
              </span>
              <span className="text-slate-400 text-[10px]">Square Hospital</span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center my-2">
              <div className="bg-slate-900 p-2 rounded">
                <span className="text-[10px] text-slate-400 block">SERVING</span>
                <span className="text-2xl font-bold text-emerald-400">#{MOCK_LIVE_QUEUE.nowServingSerial}</span>
              </div>
              <div className="bg-slate-900 p-2 rounded border border-teal-500/40">
                <span className="text-[10px] text-teal-300 block">YOUR SERIAL</span>
                <span className="text-2xl font-bold text-teal-300">#{MOCK_LIVE_QUEUE.userSerial}</span>
              </div>
              <div className="bg-slate-900 p-2 rounded">
                <span className="text-[10px] text-slate-400 block">EST WAIT</span>
                <span className="text-2xl font-bold text-amber-400">~{MOCK_LIVE_QUEUE.estimatedWaitMinutes}m</span>
              </div>
            </div>

            <div className="text-[11px] text-slate-300 mt-2 text-center bg-slate-900/60 p-1.5 rounded">
              Turn expected at <strong>{MOCK_LIVE_QUEUE.estimatedTurnTime}</strong> ({MOCK_LIVE_QUEUE.patientsAhead} patients ahead)
            </div>
          </div>
        </div>
      </section>

      {/* Main Dense Grid Layout */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar Filter Column */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white p-4 rounded border border-slate-300 shadow-sm space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
              <ListFilter className="w-4 h-4 text-teal-600" />
              Specialty Filter
            </h3>
            <div className="space-y-1">
              {["All", "Cardiology", "Medicine", "Pediatrics", "Dermatology", "Orthopedics"].map((spec) => (
                <button
                  key={spec}
                  onClick={() => setSelectedSpecialty(spec)}
                  className={`w-full text-left text-xs font-semibold px-2.5 py-1.5 rounded transition flex items-center justify-between ${
                    selectedSpecialty === spec
                      ? "bg-teal-600 text-white font-bold"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <span>{spec}</span>
                  <span className="text-[10px] opacity-80">
                    {spec === "All" ? MOCK_DOCTORS.length : MOCK_DOCTORS.filter(d => d.specialty === spec).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Blood donor summary card */}
          <div className="bg-red-900 text-white p-4 rounded border border-red-800 space-y-2 text-xs">
            <div className="flex items-center justify-between font-bold">
              <span className="flex items-center gap-1">
                <Droplet className="w-3.5 h-3.5 text-red-400 fill-red-400" />
                Emergency Blood
              </span>
              <span className="bg-red-700 px-1.5 py-0.5 rounded text-[10px] font-mono">3 Active</span>
            </div>
            <p className="text-red-200 text-[11px]">
              O+, B-, AB+ blood needed at Square & Labaid Hospitals today.
            </p>
            <button className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-1.5 rounded text-xs transition">
              View Blood Demands
            </button>
          </div>
        </div>

        {/* Center Doctor Dense Listing */}
        <div className="lg:col-span-9 space-y-4">
          <div className="flex items-center justify-between bg-white p-3 rounded border border-slate-300">
            <span className="text-xs font-bold text-slate-700">Showing {MOCK_DOCTORS.length} Available Doctors</span>
            <span className="text-xs text-slate-500 font-mono">Sort by: Next Available</span>
          </div>

          <div className="space-y-3">
            {MOCK_DOCTORS.map((doc) => (
              <div key={doc.id} className="bg-white p-4 rounded border border-slate-300 hover:border-teal-500 transition grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                <div className="sm:col-span-7 flex items-center gap-3">
                  <img src={doc.avatarUrl} alt={doc.name} className="w-12 h-12 rounded object-cover border border-slate-200" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-slate-900">{doc.name}</h4>
                      <span className="text-[10px] font-mono bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded border border-slate-200">
                        {doc.specialty}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{doc.hospital} • {doc.hospitalArea}</p>
                    <div className="text-[11px] text-slate-600 mt-1">
                      Fee: ৳{doc.fee} | Exp: {doc.experienceYears} yrs | Rating: ★ {doc.rating}
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-5 flex flex-col sm:items-end justify-center space-y-2">
                  {doc.currentSerial && doc.currentSerial > 0 ? (
                    <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-mono font-bold">
                      Queue Live: #{doc.currentSerial} serving
                    </span>
                  ) : (
                    <span className="text-xs text-slate-600 font-mono">
                      Slot: {doc.nextAvailableTime}
                    </span>
                  )}
                  <button className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs px-4 py-2 rounded transition w-full sm:w-auto">
                    Book Serial
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Compact Hospital Row */}
          <div className="bg-white p-4 rounded border border-slate-300 mt-6 space-y-3">
            <h3 className="font-bold text-sm text-slate-900">Dhaka Hospital Network</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {MOCK_HOSPITALS.map((h) => (
                <div key={h.id} className="p-3 bg-slate-50 border border-slate-200 rounded text-xs flex justify-between items-center">
                  <div>
                    <div className="font-bold text-slate-900">{h.name}</div>
                    <div className="text-slate-500">{h.area} ({h.distanceKm} km away)</div>
                  </div>
                  <span className="font-mono text-teal-700 font-bold bg-teal-50 px-2 py-1 rounded">
                    {h.doctorsCount} Docs
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Compact Footer */}
      <footer className="bg-slate-900 text-slate-400 py-6 text-xs border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <div>LifeLink Academic Demo • Dhaka, Bangladesh</div>
          <div>Direction C: Compact Digital Health</div>
        </div>
      </footer>
    </div>
  );
};
