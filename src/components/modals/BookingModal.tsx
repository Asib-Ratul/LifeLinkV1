"use client";

import React, { useState } from "react";
import { X, CheckCircle2, Clock, Activity, FileText, CreditCard, AlertCircle, ShieldCheck } from "lucide-react";
import { Doctor } from "@/types";
import { AppointmentService, type BookingResponse } from "@/lib/services/appointmentService";

interface BookingModalProps {
  doctor: Doctor;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (bookingData: BookingResponse) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  doctor,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [bookingMode, setBookingMode] = useState<"QUEUE" | "TIME_SLOT">(
    doctor.currentSerial && doctor.currentSerial > 0 ? "QUEUE" : "TIME_SLOT"
  );
  const [shareRecords, setShareRecords] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"bkash" | "nagad" | "card" | "chamber">("bkash");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [generatedSerial, setGeneratedSerial] = useState(25);

  if (!isOpen) return null;

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const response = AppointmentService.createBooking(
        {
          doctorId: doctor.id,
          doctorName: doctor.name,
          bookingMode,
          shareRecords,
          paymentMethod,
        },
        doctor
      );
      if (response.serialNumber) {
        setGeneratedSerial(response.serialNumber);
      }
      setIsProcessing(false);
      setIsConfirmed(true);
      if (onSuccess) {
        onSuccess(response);
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-[#CBD5E1] shadow-2xl space-y-6 relative my-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
          <div>
            <span className="text-[10px] font-bold text-[#087E8B] uppercase tracking-wider block">
              Appointment Booking
            </span>
            <h3 className="font-extrabold text-xl text-[#0F172A]">{doctor.name}</h3>
            <p className="text-xs text-[#64748B]">{doctor.specialty} • {doctor.hospital}</p>
            <p className="text-[11px] text-amber-700 mt-1">Use fictional details only. This form is not submitted to a provider.</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-[#64748B] hover:bg-[#F1F5F9]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isConfirmed ? (
          <div className="space-y-5">
            {/* Mode selector */}
            <div>
              <label className="block text-xs font-bold text-[#0F172A] mb-2">
                Booking Mode (Mutually Exclusive per Session)
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setBookingMode("QUEUE")}
                  className={`p-3 rounded-xl text-left border transition ${
                    bookingMode === "QUEUE"
                      ? "bg-[#E8F6F7] border-[#087E8B] text-[#075E66] font-bold shadow-sm"
                      : "bg-[#F8FAFC] border-[#E2E8F0] text-[#64748B] hover:border-[#CBD5E1]"
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-xs">
                    <Activity className="w-4 h-4 text-[#087E8B]" />
                    <span>Live Queue Serial</span>
                  </div>
                  <span className="text-[10px] text-[#64748B] font-normal block mt-1">
                    Receive serial #{generatedSerial} with live ETA tracking.
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setBookingMode("TIME_SLOT")}
                  className={`p-3 rounded-xl text-left border transition ${
                    bookingMode === "TIME_SLOT"
                      ? "bg-[#E8F6F7] border-[#087E8B] text-[#075E66] font-bold shadow-sm"
                      : "bg-[#F8FAFC] border-[#E2E8F0] text-[#64748B] hover:border-[#CBD5E1]"
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-xs">
                    <Clock className="w-4 h-4 text-[#087E8B]" />
                    <span>Scheduled Time Slot</span>
                  </div>
                  <span className="text-[10px] text-[#64748B] font-normal block mt-1">
                    Fixed appointment time (no serial or queue page).
                  </span>
                </button>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-3 text-xs">
              {/* Record Sharing Checkbox (PRD V2 determinism) */}
              <div className="bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0] space-y-1.5">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={shareRecords}
                    onChange={(e) => setShareRecords(e.target.checked)}
                    className="w-4 h-4 text-[#087E8B] rounded border-[#CBD5E1] focus:ring-[#087E8B]"
                  />
                  <span className="font-bold text-[#0F172A] flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-[#087E8B]" />
                    Grant Read-Only Access to Demo Medical Records
                  </span>
                </label>
                <p className="text-[11px] text-[#64748B] pl-6">
                  This is a local demo preference only. It does not create an access grant or share any records with {doctor.name}.
                </p>
              </div>
            </div>

            {/* Fee & Payment Simulation choice */}
            <div className="bg-[#E8F6F7] p-4 rounded-xl border border-[#087E8B]/20 space-y-3">
              <div className="flex justify-between items-center text-sm font-bold text-[#0F172A]">
                <span>Consultation Fee:</span>
                <span className="text-[#087E8B] text-lg">৳{doctor.fee}</span>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-[#075E66] block">Select Demo Payment Method:</span>
                <div className="grid grid-cols-4 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("bkash")}
                    className={`p-2 rounded-lg border text-center font-bold transition ${
                      paymentMethod === "bkash" ? "bg-pink-600 text-white border-pink-700" : "bg-white text-slate-700 border-slate-300"
                    }`}
                  >
                    bKash
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("nagad")}
                    className={`p-2 rounded-lg border text-center font-bold transition ${
                      paymentMethod === "nagad" ? "bg-orange-600 text-white border-orange-700" : "bg-white text-slate-700 border-slate-300"
                    }`}
                  >
                    Nagad
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`p-2 rounded-lg border text-center font-bold transition ${
                      paymentMethod === "card" ? "bg-[#087E8B] text-white border-teal-700" : "bg-white text-slate-700 border-slate-300"
                    }`}
                  >
                    Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("chamber")}
                    className={`p-2 rounded-lg border text-center font-bold transition ${
                      paymentMethod === "chamber" ? "bg-slate-800 text-white border-slate-900" : "bg-white text-slate-700 border-slate-300"
                    }`}
                  >
                    Chamber
                  </button>
                </div>
              </div>

              <p className="text-[10px] text-[#64748B] text-center">
                Academic simulation mode: no real money is deducted.
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 text-xs font-bold text-[#64748B] hover:bg-[#F1F5F9] border border-[#CBD5E1] rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSimulatePayment}
                disabled={isProcessing}
                className="flex-1 py-3 text-xs font-bold bg-[#087E8B] hover:bg-[#075E66] text-white rounded-xl shadow-md transition flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <span>Simulating Payment...</span>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    <span>Pay ৳{doctor.fee} & Confirm</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          /* Confirmation State */
          <div className="text-center py-4 space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Booking Confirmed (Demo)
              </span>
             <h3 className="font-extrabold text-2xl text-[#0F172A] mt-2">{bookingMode === "QUEUE" ? "Demo queue serial assigned" : "Demo time slot reserved"}</h3>
              <p className="text-xs text-[#64748B] mt-1">
                This simulated booking is saved in this browser only. It has not been sent to {doctor.name} or the hospital.
              </p>
            </div>

            <div className="bg-[#F8FAFC] p-5 rounded-2xl border border-[#CBD5E1] text-left space-y-3 font-sans">
              {bookingMode === "QUEUE" ? (
                <div className="flex justify-between items-center border-b border-[#E2E8F0] pb-3">
                  <span className="text-xs text-[#64748B]">Demo queue serial:</span>
                  <span className="text-3xl font-extrabold font-mono text-[#087E8B]">#{generatedSerial}</span>
                </div>
              ) : (
                <div className="flex justify-between items-center border-b border-[#E2E8F0] pb-3">
                  <span className="text-xs text-[#64748B]">Demo time slot:</span>
                  <span className="text-lg font-extrabold text-[#087E8B]">{doctor.nextAvailableTime ?? "Next available slot"}</span>
                </div>
              )}
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#64748B]">Chamber Room:</span>
                <span className="font-bold text-[#0F172A]">Room 408 (4th Floor)</span>
              </div>
              {bookingMode === "QUEUE" && <div className="flex justify-between items-center text-xs">
                <span className="text-[#64748B]">Estimated wait:</span>
                <span className="font-bold text-emerald-600">{Math.max(0, (generatedSerial - (doctor.currentSerial ?? 0)) * (doctor.avgWaitTimePerPatientMin ?? 8))} minutes (demo estimate)</span>
              </div>}
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#64748B]">Record sharing preference:</span>
                <span className="font-bold text-[#087E8B]">{shareRecords ? "Selected (not sent)" : "Off"}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-3 text-xs font-bold bg-[#087E8B] text-white rounded-xl shadow-md hover:bg-[#075E66]"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
