"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { RoleSwitcher } from "@/components/ui/RoleSwitcher";
import { FileText, Upload, ShieldCheck, Lock, Eye, Trash2, Plus, CheckCircle2, AlertCircle } from "lucide-react";

interface DemoRecord {
  id: string;
  title: string;
  type: string;
  doctorSource: string;
  facility: string;
  date: string;
  fileSize: string;
  sharedWithActiveDoctor: boolean;
}

export default function MedicalRecordsPage() {
  const [records, setRecords] = useState<DemoRecord[]>([
    {
      id: "rec-1",
      title: "Comprehensive Lipid Profile & Blood Sugar",
      type: "Lab Report",
      doctorSource: "Dr. Arman Hossain",
      facility: "Popular Diagnostic Center",
      date: "Aug 02, 2026",
      fileSize: "1.4 MB (PDF)",
      sharedWithActiveDoctor: true,
    },
    {
      id: "rec-2",
      title: "12-Lead Electrocardiogram (ECG)",
      type: "ECG Test",
      doctorSource: "Dr. Sarah Rahman",
      facility: "Square Hospital",
      date: "Jul 28, 2026",
      fileSize: "2.1 MB (PDF)",
      sharedWithActiveDoctor: true,
    },
    {
      id: "rec-3",
      title: "Cardiology Prescription & Follow-up Plan",
      type: "Prescription",
      doctorSource: "Dr. Sarah Rahman",
      facility: "Square Hospital",
      date: "Jul 15, 2026",
      fileSize: "680 KB (PDF)",
      sharedWithActiveDoctor: false,
    },
  ]);

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newType, setNewType] = useState("Lab Report");

  const toggleShare = (id: string) => {
    setRecords(records.map(r => r.id === id ? { ...r, sharedWithActiveDoctor: !r.sharedWithActiveDoctor } : r));
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;
    const newRecord: DemoRecord = {
      id: `rec-${Date.now()}`,
      title: newTitle,
      type: newType,
      doctorSource: "Uploaded by Patient",
      facility: "Patient Upload",
      date: "Today",
      fileSize: "850 KB (PDF)",
      sharedWithActiveDoctor: true,
    };
    setRecords([newRecord, ...records]);
    setNewTitle("");
    setShowUploadModal(false);
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
                Medical Records Vault
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">My Demo Medical Records</h1>
              <p className="text-xs sm:text-sm text-[#64748B] mt-1">
                Private, patient-controlled document repository for consultation sharing.
              </p>
            </div>

            <button
              onClick={() => setShowUploadModal(true)}
              className="bg-[#087E8B] hover:bg-[#075E66] text-white font-bold text-xs px-5 py-3 rounded-xl shadow-sm transition flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              <span>Upload Document</span>
            </button>
          </div>

          {/* Privacy Rules Banner (PRD V2) */}
          <div className="bg-[#E8F6F7] p-5 rounded-2xl border border-[#087E8B]/20 flex items-start gap-4">
            <div className="p-2 bg-white rounded-xl text-[#087E8B] shadow-subtle">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="text-xs space-y-1">
              <h4 className="font-extrabold text-[#075E66] text-sm">Appointment-Scoped Record Authorization</h4>
              <p className="text-[#64748B]">
                Hospital staff do NOT have access to medical records. Authenticated doctors receive read-only access strictly during active appointment sessions when authorized by the patient. Access can be revoked anytime below.
              </p>
            </div>
          </div>

          {/* Records List */}
          <div className="space-y-4">
            <h3 className="font-extrabold text-lg text-[#0F172A]">Uploaded Medical Documents ({records.length})</h3>

            <div className="space-y-3">
              {records.map((rec) => (
                <div key={rec.id} className="bg-white p-5 rounded-2xl border border-[#CBD5E1] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#E8F6F7] text-[#087E8B] flex items-center justify-center font-bold">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded">
                          {rec.type}
                        </span>
                        <span className="text-xs text-[#64748B]">{rec.date}</span>
                      </div>
                      <h4 className="font-extrabold text-base text-[#0F172A] mt-1">{rec.title}</h4>
                      <p className="text-xs text-[#64748B]">{rec.facility} • Source: {rec.doctorSource} • {rec.fileSize}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto border-t sm:border-t-0 border-[#E2E8F0] pt-3 sm:pt-0">
                    <button
                      onClick={() => toggleShare(rec.id)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                        rec.sharedWithActiveDoctor
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-300"
                          : "bg-slate-100 text-slate-700 border border-slate-300"
                      }`}
                    >
                      {rec.sharedWithActiveDoctor ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Shared with Dr. Sarah</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-3.5 h-3.5" />
                          <span>Access Revoked</span>
                        </>
                      )}
                    </button>

                    <button className="p-2 text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] rounded-xl">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Upload Modal Simulator */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-[#CBD5E1] shadow-2xl space-y-5">
            <h3 className="font-extrabold text-lg text-[#0F172A]">Upload Demo Document</h3>

            <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#64748B] mb-1">Document Title</label>
                <input
                  type="text"
                  placeholder="e.g. Complete Blood Count (CBC) Report"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#087E8B]"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-[#64748B] mb-1">Document Category</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#087E8B]"
                >
                  <option value="Lab Report">Lab Report</option>
                  <option value="Prescription">Prescription</option>
                  <option value="ECG Test">ECG Test</option>
                  <option value="Radiology X-Ray">Radiology X-Ray</option>
                </select>
              </div>

              <div className="border-2 border-dashed border-[#CBD5E1] p-6 rounded-2xl text-center space-y-2 bg-[#F8FAFC]">
                <Upload className="w-8 h-8 text-[#087E8B] mx-auto" />
                <span className="font-bold text-[#0F172A] block">Click to select demo PDF / Image</span>
                <span className="text-[10px] text-[#64748B] block">Maximum size 10MB</span>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 py-2.5 font-bold text-[#64748B] border border-[#CBD5E1] rounded-xl hover:bg-[#F1F5F9]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 font-bold bg-[#087E8B] text-white rounded-xl shadow-sm hover:bg-[#075E66]"
                >
                  Upload File
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
