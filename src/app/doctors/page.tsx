"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { RoleSwitcher } from "@/components/ui/RoleSwitcher";
import { MOCK_DOCTORS, MOCK_SPECIALTIES } from "@/data/mockData";
import { Doctor } from "@/types";
import { BookingModal } from "@/components/modals/BookingModal";
import { Search, MapPin, Star, Activity, Filter, CheckCircle2, Stethoscope, ChevronRight, Building2, UserCheck } from "lucide-react";
import Link from "next/link";

const ALL_DEPARTMENTS_FULL = [
  { id: "dept-1", name: "Cardiology", description: "Heart health, hypertension, ECG, & cardiovascular care", doctorCount: 42, iconName: "HeartPulse" },
  { id: "dept-2", name: "Medicine", description: "Internal medicine, general health, diabetes, & fever clinic", doctorCount: 58, iconName: "Stethoscope" },
  { id: "dept-3", name: "Pediatrics", description: "Child healthcare, newborn care, vaccinations, & growth", doctorCount: 35, iconName: "Baby" },
  { id: "dept-4", name: "Dermatology", description: "Skin disease, laser therapy, allergy, & cosmetic care", doctorCount: 28, iconName: "Sparkles" },
  { id: "dept-5", name: "Orthopedics", description: "Bone fractures, joint replacement, spine & sports medicine", doctorCount: 31, iconName: "Bone" },
  { id: "dept-6", name: "ENT / Otolaryngology", description: "Ear, nose, throat, sinus & hearing disorders", doctorCount: 24, iconName: "Ear" },
  { id: "dept-7", name: "Neurology", description: "Brain, nerves, stroke management, & headache clinic", doctorCount: 19, iconName: "Brain" },
  { id: "dept-8", name: "Gynecology & Obstetrics", description: "Maternal health, pregnancy care, & women's wellness", doctorCount: 46, iconName: "UserCheck" },
  { id: "dept-9", name: "Gastroenterology", description: "Stomach, liver, endoscopy, & digestive health", doctorCount: 22, iconName: "Activity" },
  { id: "dept-10", name: "Nephrology", description: "Kidney health, dialysis, & hypertension management", doctorCount: 17, iconName: "Activity" },
  { id: "dept-11", name: "Ophthalmology", description: "Eye surgery, cataract, vision correction, & retina", doctorCount: 26, iconName: "Stethoscope" },
  { id: "dept-12", name: "Psychiatry", description: "Mental health, anxiety, depression, & counseling", doctorCount: 15, iconName: "Brain" },
];

function DoctorsContent() {
  const searchParams = useSearchParams();
  const initialView = searchParams.get("view") === "departments" ? "departments" : "doctors";
  const initialSpecialty = searchParams.get("specialty") || "All";

  const [activeTab, setActiveTab] = useState<"doctors" | "departments">(initialView);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState(initialSpecialty);
  const [selectedArea, setSelectedArea] = useState("All Areas");
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState<Doctor | null>(null);

  useEffect(() => {
    if (searchParams.get("view") === "departments") {
      setActiveTab("departments");
    }
  }, [searchParams]);

  const filteredDoctors = MOCK_DOCTORS.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.hospital.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSpecialty = selectedSpecialty === "All" || doc.specialty === selectedSpecialty;
    const matchesArea = selectedArea === "All Areas" || doc.hospitalArea.includes(selectedArea);

    return matchesSearch && matchesSpecialty && matchesArea;
  });

  return (
    <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-10 w-full">
      {/* Header */}
      <div className="mb-6 space-y-2">
        <span className="text-xs font-bold text-[#087E8B] uppercase tracking-wider">
          Dhaka Healthcare Directory
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A]">
          {activeTab === "doctors" ? "Find Doctors & Live Queue Serials" : "Medical Departments & Specialty Hubs"}
        </h1>
        <p className="text-sm text-[#64748B] max-w-2xl">
          {activeTab === "doctors"
            ? "Browse fictional Dhaka-area clinician profiles and preview a simulated booking flow."
            : "Explore sample specialties used in this interface demo."}
        </p>
      </div>

      {/* Main View Switcher Tabs */}
      <div className="flex items-center gap-3 border-b border-[#E2E8F0] mb-8 pb-3">
        <button
          onClick={() => setActiveTab("doctors")}
          className={`px-5 py-2.5 rounded-xl font-bold text-sm transition ${
            activeTab === "doctors"
              ? "bg-[#087E8B] text-white shadow-sm"
              : "bg-white text-[#64748B] hover:text-[#0F172A] border border-[#CBD5E1]"
          }`}
        >
          Specialist Doctors ({MOCK_DOCTORS.length})
        </button>

        <button
          onClick={() => setActiveTab("departments")}
          className={`px-5 py-2.5 rounded-xl font-bold text-sm transition ${
            activeTab === "departments"
              ? "bg-[#087E8B] text-white shadow-sm"
              : "bg-white text-[#64748B] hover:text-[#0F172A] border border-[#CBD5E1]"
          }`}
        >
          All Departments ({ALL_DEPARTMENTS_FULL.length})
        </button>
      </div>

      {/* VIEW 1: DEPARTMENTS DIRECTORY */}
      {activeTab === "departments" ? (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ALL_DEPARTMENTS_FULL.map((dept) => (
              <div
                key={dept.id}
                className="bg-white p-6 rounded-2xl border border-[#CBD5E1] shadow-sm hover:shadow-card transition flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-[#E8F6F7] text-[#087E8B] flex items-center justify-center font-bold text-lg border border-[#087E8B]/20">
                    <Stethoscope className="w-6 h-6 text-[#087E8B]" />
                  </div>
                  <h3 className="font-extrabold text-xl text-[#0F172A]">{dept.name}</h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">{dept.description}</p>
                </div>

                <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between">
                  <span className="text-xs font-bold text-[#087E8B]">{dept.doctorCount} Specialists</span>
                  <button
                    onClick={() => {
                      setSelectedSpecialty(dept.name);
                      setActiveTab("doctors");
                    }}
                    className="bg-[#E8F6F7] hover:bg-[#087E8B] text-[#075E66] hover:text-white font-bold text-xs px-4 py-2 rounded-xl transition flex items-center gap-1"
                  >
                    <span>View Doctors</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* VIEW 2: DOCTORS DIRECTORY */
        <div className="space-y-8">
          {/* Filter Bar */}
          <div className="bg-white p-5 rounded-2xl border border-[#CBD5E1] shadow-sm grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-5 relative">
              <label className="block text-xs font-bold text-[#64748B] mb-1">Search Specialist / Hospital</label>
              <div className="relative">
                <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="e.g. Dr. Sarah or Cardiology"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 text-sm bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#087E8B]"
                />
              </div>
            </div>

            <div className="md:col-span-4">
              <label className="block text-xs font-bold text-[#64748B] mb-1">Specialty Department</label>
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full px-3 py-2.5 text-sm bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#087E8B]"
              >
                <option value="All">All Medical Specialties</option>
                {MOCK_SPECIALTIES.map((spec) => (
                  <option key={spec.id} value={spec.name}>
                    {spec.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-3">
              <label className="block text-xs font-bold text-[#64748B] mb-1">Area / Zone</label>
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="w-full px-3 py-2.5 text-sm bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#087E8B]"
              >
                <option value="All Areas">All Dhaka Areas</option>
                <option value="Panthapath">Panthapath</option>
                <option value="Dhanmondi">Dhanmondi</option>
                <option value="Gulshan">Gulshan</option>
                <option value="Bashundhara">Bashundhara</option>
              </select>
            </div>
          </div>

          {/* Doctor Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredDoctors.map((doc) => (
              <div
                key={doc.id}
                className="bg-white p-6 rounded-2xl border border-[#CBD5E1] shadow-sm hover:shadow-card transition flex flex-col justify-between space-y-4"
              >
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
                      <span>Fee: <strong>৳{doc.fee}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Queue Status Box */}
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
                    <span className="font-semibold text-[#087E8B]">Scheduled Mode</span>
                  </div>
                )}

                {/* Action */}
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
      )}

      {/* Booking Modal */}
      {selectedDoctorForBooking && (
        <BookingModal
          doctor={selectedDoctorForBooking}
          isOpen={true}
          onClose={() => setSelectedDoctorForBooking(null)}
          onSuccess={(data) => {
            void data;
          }}
        />
      )}
    </main>
  );
}

export default function DoctorsDirectoryPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <RoleSwitcher />
      <Navbar />

      <Suspense fallback={<div className="p-10 text-center text-sm font-semibold text-slate-500">Loading Directory...</div>}>
        <DoctorsContent />
      </Suspense>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
