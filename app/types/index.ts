export interface Doctor {
  id: string;
  name: string;
  title: string;
  specialty: string;
  hospital: string;
  hospitalArea: string;
  rating: number;
  reviewsCount: number;
  experienceYears: number;
  fee: number;
  availableToday: boolean;
  nextAvailableTime?: string;
  avatarUrl: string;
  currentSerial?: number;
  totalSerials?: number;
  avgWaitTimePerPatientMin?: number;
}

export interface Hospital {
  id: string;
  name: string;
  type: string;
  area: string;
  city: string;
  distanceKm: number;
  doctorsCount: number;
  specialtiesCount: number;
  imageUrl: string;
  address: string;
  emergencyPhone: string;
  hasEmergencyBloodBank: boolean;
}

export interface Specialty {
  id: string;
  name: string;
  iconName: string;
  doctorCount: number;
  description: string;
}

export interface LiveQueueData {
  appointmentId: string;
  doctorName: string;
  doctorSpecialty: string;
  hospitalName: string;
  chamberRoom: string;
  nowServingSerial: number;
  userSerial: number;
  patientsAhead: number;
  estimatedWaitMinutes: number;
  estimatedTurnTime: string;
  queueStatus: 'NORMAL' | 'PAUSED' | 'DELAYED';
  statusMessage: string;
}

export interface BloodRequest {
  id: string;
  patientNameInitials: string;
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';
  unitsNeeded: number;
  hospitalName: string;
  hospitalArea: string;
  urgency: 'CRITICAL' | 'URGENT' | 'STANDARD';
  requiredDate: string;
  requiredTime: string;
  matchedDonorsCount: number;
  status: 'ACTIVE' | 'DONORS_RESPONDED' | 'FULFILLED';
  verifiedHospitalRequest: boolean;
}
