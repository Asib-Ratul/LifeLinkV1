import { Doctor } from "@/app/types";

export interface BookingPayload {
  doctorId: string;
  doctorName: string;
  patientName: string;
  patientPhone: string;
  reasonForVisit: string;
  bookingMode: "QUEUE" | "TIME_SLOT";
  shareRecords: boolean;
  paymentMethod: string;
}

export interface BookingResponse {
  appointmentId: string;
  serialNumber?: number;
  timeSlot?: string;
  status: "CONFIRMED";
  estimatedTurnTime: string;
  chamberRoom: string;
}

export class AppointmentService {
  static createBooking(payload: BookingPayload, doctor: Doctor): BookingResponse {
    const isQueue = payload.bookingMode === "QUEUE";
    const assignedSerial = isQueue ? (doctor.totalSerials ? doctor.totalSerials + 1 : 25) : undefined;
    const timeSlot = isQueue ? undefined : "6:30 PM";

    return {
      appointmentId: `apt-${Math.floor(10000 + Math.random() * 90000)}`,
      serialNumber: assignedSerial,
      timeSlot,
      status: "CONFIRMED",
      estimatedTurnTime: isQueue ? "6:20 PM Today" : "6:30 PM Today",
      chamberRoom: "Room 408, 4th Floor",
    };
  }
}
