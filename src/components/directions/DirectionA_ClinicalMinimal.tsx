"use client";

import React, { useState } from "react";
import {
  Search,
  MapPin,
  Calendar,
  Clock,
  HeartPulse,
  Stethoscope,
  Baby,
  Sparkles,
  Bone,
  UserCheck,
  Ear,
  Brain,
  ShieldCheck,
  ChevronRight,
  PhoneCall,
  Activity,
  Droplet,
  Users,
} from "lucide-react";
import { MOCK_DOCTORS, MOCK_HOSPITALS, MOCK_SPECIALTIES, MOCK_LIVE_QUEUE, MOCK_BLOOD_REQUESTS } from "@/data/mockData";

export const DirectionA_ClinicalMinimal: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArea, setSelectedArea] = useState("All Dhaka");

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* 1. Academic Disclaimer Banner */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 text-center border-b border-slate-800">
        <span className="font-semibold text-slate-100">Academic Demonstration Project:</span> Data shown is fictional for Dhaka demonstration purposes only.
      </div>

      {/* 2. Public Navbar (Minimalist Bordered) */}
      <nav className="bg-white border-b border-slate-200 sticky top-[57px] z-40">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-slate-900 text-white font-bold flex items-center justify-center text-sm">
                LL
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">LifeLink</span>
            </div>
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
              <a href="#home" className="text-slate-900 font-semibold border-b-2 border-slate-900 py-4">Home</a>
              <a href="#doctors" className="hover:text-slate-900">Find Doctors</a>
              <a href="#hospitals" className="hover:text-slate-900">Hospitals</a>
              <a href="#blood" className="hover:text-slate-900 flex items-center gap-1.5">
                <Droplet className="w-4 h-4 text-red-600" />
                <span>Blood Network</span>
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="text-sm font-medium text-slate-700 px-4 py-2 hover:bg-slate-100 rounded">
              Log In
            </button>
            <button className="text-sm font-semibold bg-slate-900 text-white px-4 py-2 rounded hover:bg-slate-800 transition">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* 3. Hero Section (Clinical Minimal Two-Column) */}
      <section className="py-14 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded border border-slate-200">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-600" />
              <span>Clinical Access System</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
              Healthcare access without the unnecessary wait.
            </h1>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl">
              Browse fictional clinician profiles, preview a simulated queue, and explore the sample blood request screens.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a href="#doctors" className="bg-slate-900 text-white font-semibold text-sm px-5 py-3 rounded hover:bg-slate-800 transition">
                Find a Doctor
              </a>
              <a href="#hospitals" className="bg-slate-100 text-slate-800 border border-slate-300 font-medium text-sm px-5 py-3 rounded hover:bg-slate-200 transition">
                Explore Hospitals
              </a>
            </div>

            <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 flex items-center gap-4">
              <span>✓ Real-time serial tracking</span>
              <span>•</span>
              <span>✓ Zero registration fees</span>
              <span>•</span>
              <span>✓ Verified Dhaka medical centers</span>
            </div>
          </div>

          {/* Hero Right — Live Queue Preview Card (Clinical Minimal Style) */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900 text-white rounded-lg p-6 border border-slate-800 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Live Consultation Queue</span>
                </div>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs px-2.5 py-0.5 rounded font-mono font-medium">
                  RUNNING
                </span>
              </div>

              <div>
                <h4 className="font-bold text-lg text-white">{MOCK_LIVE_QUEUE.doctorName}</h4>
                <p className="text-xs text-slate-400">{MOCK_LIVE_QUEUE.doctorSpecialty} • {MOCK_LIVE_QUEUE.hospitalName}</p>
                <p className="text-xs text-slate-400 mt-0.5">{MOCK_LIVE_QUEUE.chamberRoom}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-slate-800/80 p-4 rounded border border-slate-700">
                <div>
                  <span className="text-[11px] text-slate-400 uppercase font-semibold">Now Serving</span>
                  <div className="text-3xl font-mono font-bold text-emerald-400 mt-1">
                    #{MOCK_LIVE_QUEUE.nowServingSerial}
                  </div>
                </div>

                <div>
                  <span className="text-[11px] text-slate-400 uppercase font-semibold">Your Serial</span>
                  <div className="text-3xl font-mono font-bold text-white mt-1">
                    #{MOCK_LIVE_QUEUE.userSerial}
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-300 bg-slate-800/40 p-3 rounded border border-slate-800">
                <div className="flex justify-between">
                  <span className="text-slate-400">Patients Ahead:</span>
                  <span className="font-semibold text-white">{MOCK_LIVE_QUEUE.patientsAhead} patients</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Estimated Wait:</span>
                  <span className="font-semibold text-emerald-400">~{MOCK_LIVE_QUEUE.estimatedWaitMinutes} minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Estimated Turn:</span>
                  <span className="font-semibold text-white">{MOCK_LIVE_QUEUE.estimatedTurnTime}</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 text-center border-t border-slate-800 pt-3">
                {MOCK_LIVE_QUEUE.statusMessage}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Search Section (Clinical Crisp Bar) */}
      <section className="py-8 bg-slate-100 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white p-4 rounded-lg border border-slate-300 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="text"
                placeholder="Search doctors, specialties, or hospitals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded focus:outline-none focus:border-slate-800"
              />
            </div>

            <div className="md:col-span-3 relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded focus:outline-none focus:border-slate-800 appearance-none"
              >
                <option>All Dhaka</option>
                <option>Panthapath</option>
                <option>Dhanmondi</option>
                <option>Gulshan</option>
                <option>Uttara</option>
              </select>
            </div>

            <div className="md:col-span-4 flex items-center gap-2">
              <button className="w-full bg-slate-900 text-white text-sm font-semibold py-2.5 rounded hover:bg-slate-800 transition">
                Search Directory
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Specialty Grid */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Medical Specialties</h2>
              <p className="text-xs text-slate-500">Select a department to view available Dhaka specialists</p>
            </div>
            <a href="#specialties" className="text-xs font-semibold text-slate-800 hover:underline flex items-center gap-1">
              View All <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {MOCK_SPECIALTIES.map((spec) => (
              <div
                key={spec.id}
                className="p-4 bg-slate-50 border border-slate-200 rounded hover:border-slate-400 transition cursor-pointer"
              >
                <div className="w-8 h-8 rounded bg-slate-200 text-slate-800 flex items-center justify-center font-bold text-xs mb-2">
                  {spec.name.substring(0, 2).toUpperCase()}
                </div>
                <h4 className="font-bold text-sm text-slate-900">{spec.name}</h4>
                <p className="text-xs text-slate-500 mt-0.5">{spec.doctorCount} Doctors available</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Nearby Hospitals */}
      <section className="py-12 bg-slate-50 border-b border-slate-200" id="hospitals">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Registered Medical Centers</h2>
              <p className="text-xs text-slate-500">Fictional hospital listings for the interface demo</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MOCK_HOSPITALS.map((hosp) => (
              <div key={hosp.id} className="bg-white p-5 border border-slate-200 rounded flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{hosp.type}</span>
                      <h3 className="font-bold text-base text-slate-900">{hosp.name}</h3>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {hosp.address} ({hosp.distanceKm} km)
                      </p>
                    </div>
                    {hosp.hasEmergencyBloodBank && (
                      <span className="bg-red-50 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded border border-red-200">
                        Blood Bank
                      </span>
                    )}
                  </div>

                  <div className="mt-4 flex items-center gap-4 text-xs text-slate-600 border-t border-slate-100 pt-3">
                    <span><strong>{hosp.doctorsCount}</strong> Doctors</span>
                    <span>•</span>
                    <span><strong>{hosp.specialtiesCount}</strong> Specialties</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-500">{hosp.emergencyPhone}</span>
                  <button className="text-xs font-semibold text-slate-900 border border-slate-300 px-3 py-1.5 rounded hover:bg-slate-100">
                    View Chamber Schedule
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Blood Request Network */}
      <section className="py-12 bg-white border-b border-slate-200" id="blood">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-red-950 text-white rounded-lg p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-900/60 border border-red-700 text-red-200 text-xs font-bold rounded">
                <Droplet className="w-3.5 h-3.5 text-red-400 fill-red-400" />
                <span>Emergency Blood Network</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold">Exact-Group Emergency Blood Donor Matching</h2>
              <p className="text-red-200 text-sm leading-relaxed">
                Create sample requests by exact blood group. Donors are not contacted and no alerts are sent.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <button className="bg-red-600 hover:bg-red-700 text-white font-semibold text-xs px-4 py-2.5 rounded transition">
                  Create Emergency Request
                </button>
                <button className="bg-red-900/40 hover:bg-red-900/80 border border-red-700 text-white font-semibold text-xs px-4 py-2.5 rounded transition">
                  Register as Donor
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-red-300">Active Dhaka Requests</h4>
              {MOCK_BLOOD_REQUESTS.map((req) => (
                <div key={req.id} className="bg-red-900/40 border border-red-800 p-3 rounded text-xs flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-red-600 font-bold text-white flex items-center justify-center text-sm">
                      {req.bloodGroup}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{req.unitsNeeded} Bag(s) • {req.hospitalName}</div>
                      <div className="text-red-300 text-[11px]">{req.hospitalArea} • Needed: {req.requiredTime}</div>
                    </div>
                  </div>
                  <span className="text-[10px] bg-red-800 text-red-200 px-2 py-1 rounded font-mono font-bold">
                    {req.matchedDonorsCount} Donors
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. Minimalist Footer */}
      <footer className="bg-slate-900 text-slate-400 py-10 text-xs">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-2 text-white font-bold text-lg">
            <span>LifeLink</span>
          </div>
          <p className="text-center md:text-left text-slate-400 max-w-xl">
            LifeLink is an academic demonstration project. Data shown in this system is fictional and the platform must not be used for actual medical emergencies or clinical decision-making.
          </p>
        </div>
        <div className="max-w-6xl mx-auto px-4 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-slate-500">
          <div>© 2026 LifeLink University Project. Dhaka, Bangladesh.</div>
          <div>Direction A: Clinical Minimal</div>
        </div>
      </footer>
    </div>
  );
};
