"use client";

import React, { useState } from "react";
import Link from "next/link";
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
  CheckCircle2,
  Bell,
  ArrowRight,
  Building2,
  Star,
  Hospital as HospitalIcon,
} from "lucide-react";
import { MOCK_DOCTORS, MOCK_HOSPITALS, MOCK_SPECIALTIES, MOCK_LIVE_QUEUE, MOCK_BLOOD_REQUESTS } from "@/app/data/mockData";
import { BookingModal } from "@/components/modals/BookingModal";
import { Doctor } from "@/app/types";

export const DirectionB_ModernHealthSaaS: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArea, setSelectedArea] = useState("Dhanmondi, Dhaka");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties");
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState<Doctor | null>(null);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-[#0F172A]">
      {/* 1. Academic Disclaimer Bar */}
      <div className="bg-[#087E8B] text-white text-xs py-2 px-4 text-center font-medium shadow-inner">
        <span className="font-bold">Academic Demonstration Project:</span> LifeLink data shown is fictional for Bangladesh university presentation purposes.
      </div>

      {/* 2. Public Header Navbar */}
      <header className="bg-white border-b border-[#E2E8F0] sticky top-[37px] z-40 shadow-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-10">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#075E66] to-[#087E8B] text-white font-extrabold flex items-center justify-center text-lg shadow-md">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-extrabold text-2xl tracking-tight text-[#0F172A]">Life<span className="text-[#087E8B]">Link</span></span>
                <span className="block text-[10px] text-[#64748B] font-semibold tracking-wider uppercase">Dhaka Healthcare</span>
              </div>
            </Link>

            {/* Navigation links */}
            <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-[#64748B]">
              <Link href="/" className="text-[#087E8B] font-bold border-b-2 border-[#087E8B] py-6">Home</Link>
              <Link href="/doctors" className="hover:text-[#0F172A] transition py-6">Find Doctors</Link>
              <Link href="/hospitals" className="hover:text-[#0F172A] transition py-6">Hospitals</Link>
              <Link href="/queue/apt-10492" className="hover:text-[#0F172A] transition py-6">Live Queue Tracker</Link>
              <Link href="/blood" className="hover:text-[#0F172A] transition flex items-center gap-1.5 text-red-600 py-6">
                <Droplet className="w-4 h-4 fill-red-500 text-red-500" />
                <span>Blood Network</span>
              </Link>
            </nav>
          </div>

          {/* Right Action buttons */}
          <div className="flex items-center gap-3">
            <Link href="/patient" className="text-sm font-semibold text-[#0F172A] hover:bg-[#F1F5F9] px-4 py-2.5 rounded-lg transition">
              Log In
            </Link>
            <Link href="/patient" className="text-sm font-semibold bg-[#087E8B] hover:bg-[#075E66] text-white px-5 py-2.5 rounded-lg shadow-sm transition flex items-center gap-2">
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* 3. Hero Section (Modern Health SaaS Style) */}
      <section className="relative py-16 lg:py-20 bg-gradient-to-b from-white via-[#F8FAFC] to-[#F1F5F9] border-b border-[#E2E8F0] overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#E8F6F7] rounded-full blur-3xl opacity-60 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#E8F6F7] text-[#075E66] border border-[#087E8B]/20 text-xs font-bold rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-[#087E8B]" />
              <span>Smart Hospital Queue & Blood Network</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0F172A] leading-[1.15]">
              Healthcare without the <span className="text-[#087E8B] underline decoration-[#087E8B]/30 decoration-wavy">unnecessary wait</span>.
            </h1>

            <p className="text-[#64748B] text-base sm:text-lg leading-relaxed max-w-2xl">
              Find Dhaka doctors, book appointments, track live consultation queues from home, and connect with nearby verified blood donors when emergencies strike.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link href="/doctors" className="bg-[#087E8B] hover:bg-[#075E66] text-white font-bold text-base px-6 py-3.5 rounded-xl shadow-md transition flex items-center gap-2">
                <span>Find a Doctor</span>
                <Search className="w-4 h-4" />
              </Link>
              <Link href="/hospitals" className="bg-white hover:bg-[#F1F5F9] text-[#0F172A] border border-[#CBD5E1] font-semibold text-base px-6 py-3.5 rounded-xl shadow-subtle transition">
                Explore Hospitals
              </Link>
            </div>

            {/* Micro stats */}
            <div className="pt-6 border-t border-[#E2E8F0] grid grid-cols-3 gap-4 max-w-lg">
              <div>
                <div className="text-2xl font-extrabold text-[#0F172A]">200+</div>
                <div className="text-xs text-[#64748B]">Dhaka Specialists</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-[#087E8B]">Live</div>
                <div className="text-xs text-[#64748B]">Queue Updates</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-red-600">Exact</div>
                <div className="text-xs text-[#64748B]">Blood Group Match</div>
              </div>
            </div>
          </div>

          {/* Hero Right — Interactive Live Queue Preview Widget */}
          <div className="lg:col-span-5">
            <Link href="/queue/apt-10492" className="block group">
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#CBD5E1] shadow-floating relative space-y-6 group-hover:border-[#087E8B] transition">
                {/* Card Badge Header */}
                <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#087E8B]">Live Consultation Queue</span>
                  </div>
                  <span className="bg-emerald-50 text-emerald-700 text-xs px-3 py-1 rounded-full font-bold border border-emerald-200">
                    Active Now
                  </span>
                </div>

                {/* Doctor Details */}
                <div className="flex items-center gap-4">
                  <img
                    src={MOCK_LIVE_QUEUE.doctorName === "Dr. Sarah Rahman" ? MOCK_DOCTORS[0].avatarUrl : MOCK_DOCTORS[1].avatarUrl}
                    alt="Doctor Avatar"
                    className="w-14 h-14 rounded-xl object-cover border-2 border-[#E8F6F7]"
                  />
                  <div>
                    <h4 className="font-extrabold text-lg text-[#0F172A] group-hover:text-[#087E8B] transition">{MOCK_LIVE_QUEUE.doctorName}</h4>
                    <p className="text-xs font-semibold text-[#087E8B]">{MOCK_LIVE_QUEUE.doctorSpecialty}</p>
                    <p className="text-xs text-[#64748B]">{MOCK_LIVE_QUEUE.hospitalName} • {MOCK_LIVE_QUEUE.chamberRoom}</p>
                  </div>
                </div>

                {/* Queue Serials Big Box */}
                <div className="grid grid-cols-2 gap-4 bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0]">
                  <div className="text-center p-2 bg-white rounded-lg border border-[#E2E8F0]">
                    <span className="text-[11px] font-bold text-[#64748B] uppercase">Now Serving</span>
                    <div className="text-4xl font-extrabold text-[#16A34A] mt-1 font-mono">
                      #{MOCK_LIVE_QUEUE.nowServingSerial}
                    </div>
                  </div>

                  <div className="text-center p-2 bg-[#E8F6F7] rounded-lg border border-[#087E8B]/30">
                    <span className="text-[11px] font-bold text-[#075E66] uppercase">Your Serial</span>
                    <div className="text-4xl font-extrabold text-[#087E8B] mt-1 font-mono">
                      #{MOCK_LIVE_QUEUE.userSerial}
                    </div>
                  </div>
                </div>

                {/* ETA metrics */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="bg-[#F1F5F9] p-2.5 rounded-lg">
                    <span className="block text-[#64748B] text-[10px]">Ahead of You</span>
                    <span className="font-extrabold text-[#0F172A] text-sm">{MOCK_LIVE_QUEUE.patientsAhead} Patients</span>
                  </div>
                  <div className="bg-[#FFFBEB] p-2.5 rounded-lg border border-[#D97706]/20">
                    <span className="block text-[#D97706] text-[10px]">Est. Waiting</span>
                    <span className="font-extrabold text-[#D97706] text-sm">~{MOCK_LIVE_QUEUE.estimatedWaitMinutes} mins</span>
                  </div>
                  <div className="bg-[#F0FDF4] p-2.5 rounded-lg border border-emerald-200">
                    <span className="block text-[#16A34A] text-[10px]">Est. Turn</span>
                    <span className="font-extrabold text-[#16A34A] text-sm">{MOCK_LIVE_QUEUE.estimatedTurnTime}</span>
                  </div>
                </div>

                <div className="pt-2 text-center text-xs font-medium text-[#64748B] flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{MOCK_LIVE_QUEUE.statusMessage}</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Search Filter Card */}
      <section className="py-8 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-[#F8FAFC] p-4 sm:p-6 rounded-2xl border border-[#CBD5E1] shadow-sm grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Input Search */}
            <div className="md:col-span-4 relative">
              <label className="block text-xs font-bold text-[#64748B] mb-1">Doctor / Specialty</label>
              <div className="relative">
                <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="e.g. Dr. Sarah or Cardiology"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 text-sm bg-white border border-[#CBD5E1] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#087E8B]"
                />
              </div>
            </div>

            {/* Area Filter */}
            <div className="md:col-span-3">
              <label className="block text-xs font-bold text-[#64748B] mb-1">Area / Location</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-3" />
                <select
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 text-sm bg-white border border-[#CBD5E1] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#087E8B] appearance-none"
                >
                  <option>Dhanmondi, Dhaka</option>
                  <option>Panthapath, Dhaka</option>
                  <option>Gulshan, Dhaka</option>
                  <option>Uttara, Dhaka</option>
                  <option>Mirpur, Dhaka</option>
                </select>
              </div>
            </div>

            {/* Specialty Selector */}
            <div className="md:col-span-3">
              <label className="block text-xs font-bold text-[#64748B] mb-1">Department</label>
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full px-3 py-2.5 text-sm bg-white border border-[#CBD5E1] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#087E8B]"
              >
                <option>All Specialties</option>
                <option>Cardiology</option>
                <option>Medicine</option>
                <option>Pediatrics</option>
                <option>Dermatology</option>
                <option>Orthopedics</option>
              </select>
            </div>

            {/* Search Button */}
            <div className="md:col-span-2 flex items-end">
              <Link
                href="/doctors"
                className="w-full mt-5 md:mt-0 bg-[#087E8B] hover:bg-[#075E66] text-white text-sm font-bold py-2.5 rounded-xl shadow-sm transition block text-center"
              >
                Search
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Specialty Shortcuts */}
      <section className="py-14 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-[#0F172A]">Popular Specialties</h2>
              <p className="text-xs text-[#64748B] mt-1">Quick access to Dhaka's top medical departments</p>
            </div>
            <Link href="/doctors?view=departments" className="text-sm font-bold text-[#087E8B] hover:underline flex items-center gap-1">
              View All Departments <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {MOCK_SPECIALTIES.map((spec) => (
              <Link
                key={spec.id}
                href={`/doctors?specialty=${encodeURIComponent(spec.name)}`}
                className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0] hover:border-[#087E8B] hover:bg-[#E8F6F7] transition text-center group block"
              >
                <div className="w-12 h-12 rounded-xl bg-white border border-[#E2E8F0] text-[#087E8B] flex items-center justify-center font-bold text-lg mx-auto mb-3 shadow-subtle group-hover:scale-105 transition-transform">
                  <Stethoscope className="w-6 h-6 text-[#087E8B]" />
                </div>
                <h4 className="font-bold text-sm text-[#0F172A] group-hover:text-[#075E66]">{spec.name}</h4>
                <p className="text-[11px] text-[#64748B] mt-0.5">{spec.doctorCount} Doctors</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Featured Doctors & Live Queue Doctors */}
      <section className="py-16 bg-[#F8FAFC] border-b border-[#E2E8F0]" id="doctors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-extrabold text-[#0F172A]">Available Doctors & Live Serials</h2>
              <p className="text-xs text-[#64748B] mt-1">Book a live queue serial or scheduled chamber time slot</p>
            </div>
            <Link href="/doctors" className="text-sm font-bold text-[#087E8B] hover:underline flex items-center gap-1">
              View All Specialists <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MOCK_DOCTORS.map((doc) => (
              <div key={doc.id} className="bg-white p-6 rounded-2xl border border-[#CBD5E1] shadow-sm hover:shadow-card transition flex flex-col justify-between space-y-4">
                <div className="flex items-start gap-4">
                  <img
                    src={doc.avatarUrl}
                    alt={doc.name}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300";
                    }}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-[#E8F6F7]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="bg-[#E8F6F7] text-[#075E66] text-xs font-bold px-2.5 py-0.5 rounded-full">
                        {doc.specialty}
                      </span>
                      <div className="flex items-center gap-1 text-xs font-bold text-[#0F172A]">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        <span>{doc.rating}</span>
                        <span className="text-[#64748B] font-normal">({doc.reviewsCount})</span>
                      </div>
                    </div>

                    <h3 className="font-extrabold text-base text-[#0F172A] mt-1">{doc.title}</h3>
                    <p className="text-xs text-[#64748B] mt-0.5">{doc.hospital} • {doc.hospitalArea}</p>

                    <div className="flex items-center gap-4 mt-2 text-xs text-[#64748B]">
                      <span>Experience: <strong>{doc.experienceYears} yrs</strong></span>
                      <span>Consultation Fee: <strong>৳{doc.fee}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Queue status banner on doctor card */}
                {doc.currentSerial && doc.currentSerial > 0 ? (
                  <div className="bg-[#F0FDF4] p-3 rounded-xl border border-emerald-200 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-emerald-800">
                      <Activity className="w-4 h-4 text-emerald-600 animate-pulse" />
                      <span>Live Queue: Now serving <strong>#{doc.currentSerial}</strong> of {doc.totalSerials}</span>
                    </div>
                    <span className="font-bold text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-200">
                      ~{doc.avgWaitTimePerPatientMin}m / patient
                    </span>
                  </div>
                ) : (
                  <div className="bg-[#F1F5F9] p-3 rounded-xl text-xs text-[#64748B] flex items-center justify-between">
                    <span>Next Chamber Session: <strong>{doc.nextAvailableTime}</strong></span>
                    <span className="font-semibold text-[#087E8B]">Time-slot mode</span>
                  </div>
                )}

                <div className="flex items-center gap-3 pt-2 border-t border-[#E2E8F0]">
                  <button
                    onClick={() => setSelectedDoctorForBooking(doc)}
                    className="flex-1 bg-[#087E8B] hover:bg-[#075E66] text-white font-bold text-xs py-2.5 rounded-xl shadow-sm transition"
                  >
                    Book Live Queue Serial
                  </button>
                  <Link
                    href={`/doctors/${doc.id}`}
                    className="bg-white hover:bg-[#F1F5F9] border border-[#CBD5E1] text-[#0F172A] font-semibold text-xs px-4 py-2.5 rounded-xl transition text-center"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Nearby Hospitals */}
      <section className="py-16 bg-white border-b border-[#E2E8F0]" id="hospitals">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-extrabold text-[#0F172A]">Hospitals & Medical Centers</h2>
              <p className="text-xs text-[#64748B] mt-1">Leading tertiary hospitals offering integrated queue services</p>
            </div>
            <Link href="/hospitals" className="text-sm font-bold text-[#087E8B] hover:underline flex items-center gap-1">
              View All Medical Hubs <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOCK_HOSPITALS.map((hosp) => (
              <div key={hosp.id} className="bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] overflow-hidden hover:shadow-card transition flex flex-col justify-between">
                <div className="relative h-40">
                  <img src={hosp.imageUrl} alt={hosp.name} className="w-full h-full object-cover" />
                  <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-[#0F172A] text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                    {hosp.distanceKm} km away
                  </span>
                </div>

                <div className="p-5 flex-1 space-y-3">
                  <div>
                    <span className="text-[10px] font-bold text-[#087E8B] uppercase tracking-wider">{hosp.type}</span>
                    <h3 className="font-extrabold text-base text-[#0F172A]">{hosp.name}</h3>
                    <p className="text-xs text-[#64748B] mt-1 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#94A3B8]" />
                      {hosp.area}, Dhaka
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-[#64748B] pt-2 border-t border-[#E2E8F0]">
                    <span><strong>{hosp.doctorsCount}</strong> Doctors</span>
                    <span><strong>{hosp.specialtiesCount}</strong> Specialties</span>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <Link
                    href={`/hospitals/${hosp.id}`}
                    className="w-full bg-white hover:bg-[#E8F6F7] border border-[#CBD5E1] text-[#075E66] font-bold text-xs py-2 rounded-xl transition block text-center"
                  >
                    Explore Hospital Doctors
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Blood Request Network */}
      <section className="py-16 bg-gradient-to-br from-red-900 via-red-950 to-slate-950 text-white" id="blood">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-red-500/20 text-red-300 border border-red-500/30 text-xs font-bold rounded-full">
                <Droplet className="w-4 h-4 text-red-400 fill-red-400" />
                <span>Emergency Blood Donor Matching</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
                Connect directly with nearby verified donors in real-time.
              </h2>

              <p className="text-red-200 text-sm sm:text-base leading-relaxed">
                When emergency blood is needed at any Dhaka hospital, post a request specifying the exact blood group required. Registered donors within radius receive immediate alerts.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/blood"
                  className="bg-red-600 hover:bg-red-700 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-lg transition block"
                >
                  Create Emergency Blood Request
                </Link>
                <Link
                  href="/blood"
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm px-6 py-3 rounded-xl transition block"
                >
                  Register as Blood Donor
                </Link>
              </div>
            </div>

            {/* Right Live Blood Requests Showcase */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-red-300">Live Dhaka Emergency Demands</h4>
                <Link href="/blood" className="text-xs text-red-400 hover:underline font-semibold">View All Demands</Link>
              </div>

              {MOCK_BLOOD_REQUESTS.map((req) => (
                <Link key={req.id} href={`/blood/${req.id}`} className="block group">
                  <div className="bg-red-900/40 backdrop-blur-sm border border-red-700/50 p-4 rounded-xl flex items-center justify-between gap-4 group-hover:border-red-500 transition">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-red-600 font-extrabold text-xl text-white flex items-center justify-center shadow-md">
                        {req.bloodGroup}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-sm text-white">{req.unitsNeeded} Bag(s) Required</span>
                          <span className="bg-red-500/30 text-red-200 text-[10px] px-2 py-0.5 rounded font-bold uppercase">
                            {req.urgency}
                          </span>
                        </div>
                        <p className="text-xs text-red-200 mt-0.5">{req.hospitalName} • {req.hospitalArea}</p>
                        <p className="text-[11px] text-red-300 mt-0.5">Required: {req.requiredDate} ({req.requiredTime})</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-800">
                        {req.matchedDonorsCount} Donors Responded
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      {selectedDoctorForBooking && (
        <BookingModal
          doctor={selectedDoctorForBooking}
          isOpen={true}
          onClose={() => setSelectedDoctorForBooking(null)}
          onSuccess={(data) => {
            console.log("Booked:", data);
          }}
        />
      )}

      {/* 9. Modern Health SaaS Footer */}
      <footer className="bg-[#0F172A] text-[#94A3B8] py-12 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2 text-white font-extrabold text-xl">
              <Activity className="w-5 h-5 text-[#087E8B]" />
              <span>Life<span className="text-[#087E8B]">Link</span></span>
            </div>
            <p className="text-[#94A3B8] text-xs leading-relaxed max-w-md">
              LifeLink is an academic demonstration project for Bangladesh healthcare access. Data shown in this system is fictional and the platform must not be used for actual medical emergencies or clinical decision-making.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm mb-3">Platform Navigation</h4>
            <ul className="space-y-2">
              <li><Link href="/doctors" className="hover:text-white">Find Doctors</Link></li>
              <li><Link href="/hospitals" className="hover:text-white">Hospital Directory</Link></li>
              <li><Link href="/queue/apt-10492" className="hover:text-white">Live Queue System</Link></li>
              <li><Link href="/blood" className="hover:text-white">Emergency Blood Network</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm mb-3">Demo Details</h4>
            <ul className="space-y-2">
              <li><span>Market: Dhaka, Bangladesh</span></li>
              <li><span>Stack: Next.js + Tailwind CSS</span></li>
              <li><span>Phase: Backend & Database Integrated</span></li>
              <li className="text-teal-400 font-semibold"><span>Direction B — Modern Health SaaS</span></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 flex flex-col sm:flex-row items-center justify-between text-[#64748B]">
          <div>© 2026 LifeLink Academic Demonstration Project.</div>
          <div>All data fictional • Non-commercial</div>
        </div>
      </footer>
    </div>
  );
};
