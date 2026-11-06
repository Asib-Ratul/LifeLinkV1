import type { Doctor } from "@/types";
import { readDemoValue, writeDemoValue } from "@/lib/demo/storage";

export interface BookingPayload {
  doctorId: string;
  doctorName: string;
  bookingMode: "QUEUE" | "TIME_SLOT";
  shareRecords: boolean;
  paymentMethod: "bkash" | "nagad" | "card" | "chamber";
}

export interface BookingResponse {
  appointmentId: string;
  doctorId: string;
  bookingMode: "QUEUE" | "TIME_SLOT";
  serialNumber?: number;
  timeSlot?: string;
  status: "CONFIRMED";
  estimatedTurnTime: string;
  chamberRoom: string;
  recordsShared: boolean;
}

const BOOKINGS_KEY = "lifelink-demo:appointments";

export class AppointmentService {
  static getBookings(): BookingResponse[] {
    return readDemoValue<BookingResponse[]>(BOOKINGS_KEY, []);
  }

  static createBooking(payload: BookingPayload, doctor: Doctor): BookingResponse {
    const bookings = this.getBookings();
    const isQueue = payload.bookingMode === "QUEUE";
    const serialsForDoctor = bookings
      .filter((booking) => booking.doctorId === doctor.id && booking.bookingMode === "QUEUE")
      .map((booking) => booking.serialNumber ?? 0);
    const serialNumber = isQueue
      ? Math.max(doctor.totalSerials ?? 0, ...serialsForDoctor) + 1
      : undefined;
    const timeSlot = isQueue ? undefined : doctor.nextAvailableTime ?? "Next available demo slot";
    const booking: BookingResponse = {
      appointmentId: typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `demo-${Date.now()}`,
      doctorId: doctor.id,
      bookingMode: payload.bookingMode,
      serialNumber,
      timeSlot,
      status: "CONFIRMED",
      estimatedTurnTime: isQueue ? `Approx. ${Math.max(0, (serialNumber ?? 1) - (doctor.currentSerial ?? 0)) * (doctor.avgWaitTimePerPatientMin ?? 8)} minutes` : timeSlot ?? "",
      chamberRoom: "Demo chamber",
      recordsShared: payload.shareRecords,
    };
    writeDemoValue(BOOKINGS_KEY, [...bookings, booking]);
    return booking;
  }
}
