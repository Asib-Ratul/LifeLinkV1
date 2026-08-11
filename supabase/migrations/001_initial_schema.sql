-- LifeLink Supabase PostgreSQL Initial Migration v1.0
-- Synchronized with PRD V2 & Agent V2 specifications

-- 1. Create Enums & Types
CREATE TYPE user_role AS ENUM ('PATIENT', 'DOCTOR', 'STAFF', 'HOSPITAL_ADMIN', 'PLATFORM_ADMIN');
CREATE TYPE booking_mode AS ENUM ('QUEUE', 'TIME_SLOT');
CREATE TYPE appointment_status AS ENUM ('CONFIRMED', 'WAITING', 'SERVING', 'COMPLETED', 'SKIPPED', 'CANCELLED_BY_PATIENT', 'CANCELLED_BY_HOSPITAL', 'NO_SHOW');
CREATE TYPE blood_group AS ENUM ('A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-');
CREATE TYPE blood_urgency AS ENUM ('CRITICAL', 'URGENT', 'STANDARD');
CREATE TYPE blood_request_status AS ENUM ('ACTIVE', 'DONORS_RESPONDED', 'FULFILLED', 'EXPIRED', 'REJECTED');
CREATE TYPE blood_donor_response_status AS ENUM ('INTERESTED', 'CONFIRMED', 'CANCELLED');

-- 2. Profiles Table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    phone TEXT,
    role user_role NOT NULL DEFAULT 'PATIENT',
    nid_number TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Hospitals Table
CREATE TABLE IF NOT EXISTS public.hospitals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    area TEXT NOT NULL,
    city TEXT NOT NULL DEFAULT 'Dhaka',
    address TEXT NOT NULL,
    emergency_phone TEXT NOT NULL,
    has_emergency_blood_bank BOOLEAN DEFAULT TRUE,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Doctors Table
-- Note per PRD/Agent V2: user_id can be NULL for public-listing-only doctors
CREATE TABLE IF NOT EXISTS public.doctors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    specialty TEXT NOT NULL,
    hospital_id UUID REFERENCES public.hospitals(id) ON DELETE CASCADE,
    fee NUMERIC(10, 2) NOT NULL DEFAULT 1000.00,
    experience_years INTEGER NOT NULL DEFAULT 10,
    avatar_url TEXT,
    avg_wait_time_min INTEGER DEFAULT 8,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Doctor Schedules Table
CREATE TABLE IF NOT EXISTS public.doctor_schedules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    doctor_id UUID NOT NULL REFERENCES public.doctors(id) ON DELETE CASCADE,
    day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    slot_duration_minutes INTEGER DEFAULT 15,
    max_serials INTEGER DEFAULT 40,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Appointments Table (Canonical queue/appointment model per Decision V2-004)
CREATE TABLE IF NOT EXISTS public.appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    doctor_id UUID NOT NULL REFERENCES public.doctors(id) ON DELETE CASCADE,
    hospital_id UUID NOT NULL REFERENCES public.hospitals(id) ON DELETE CASCADE,
    booking_mode booking_mode NOT NULL DEFAULT 'QUEUE',
    serial_number INTEGER,
    status appointment_status NOT NULL DEFAULT 'CONFIRMED',
    chamber_room TEXT DEFAULT 'Room 408',
    estimated_turn_time TEXT,
    reason_for_visit TEXT,
    share_records BOOLEAN DEFAULT TRUE,
    appointment_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Medical Records Table
CREATE TABLE IF NOT EXISTS public.medical_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    type TEXT NOT NULL,
    facility TEXT,
    file_url TEXT NOT NULL,
    file_size TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Record Access Grants Table (Appointment-scoped access per Decision V2-008)
CREATE TABLE IF NOT EXISTS public.record_access_grants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    appointment_id UUID NOT NULL REFERENCES public.appointments(id) ON DELETE CASCADE,
    patient_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    doctor_id UUID NOT NULL REFERENCES public.doctors(id) ON DELETE CASCADE,
    granted_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL
);

-- 9. Blood Requests Table
CREATE TABLE IF NOT EXISTS public.blood_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    requester_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    patient_initials TEXT NOT NULL,
    blood_group blood_group NOT NULL,
    units_needed INTEGER NOT NULL DEFAULT 1,
    hospital_id UUID NOT NULL REFERENCES public.hospitals(id) ON DELETE CASCADE,
    urgency blood_urgency NOT NULL DEFAULT 'URGENT',
    required_date TEXT NOT NULL,
    required_time TEXT NOT NULL,
    status blood_request_status NOT NULL DEFAULT 'ACTIVE',
    matched_donors_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Blood Donor Responses Table (Privacy consent boundary per Decision V2-009)
CREATE TABLE IF NOT EXISTS public.blood_donor_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    request_id UUID NOT NULL REFERENCES public.blood_requests(id) ON DELETE CASCADE,
    donor_user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    consent_share_phone BOOLEAN NOT NULL DEFAULT FALSE,
    status blood_donor_response_status NOT NULL DEFAULT 'INTERESTED',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. Notifications Table
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hospitals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doctor_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medical_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.record_access_grants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blood_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blood_donor_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Basic Public Read Policies for Discovery
CREATE POLICY "Public Read Hospitals" ON public.hospitals FOR SELECT USING (true);
CREATE POLICY "Public Read Doctors" ON public.doctors FOR SELECT USING (true);
CREATE POLICY "Public Read Doctor Schedules" ON public.doctor_schedules FOR SELECT USING (true);

-- User Profile RLS
CREATE POLICY "Read own profile or public doc profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Appointments RLS
CREATE POLICY "Read own or assigned doctor appointments" ON public.appointments 
    FOR SELECT USING (auth.uid() = patient_id OR auth.uid() IN (SELECT user_id FROM public.doctors WHERE id = doctor_id));

CREATE POLICY "Patient create appointments" ON public.appointments 
    FOR INSERT WITH CHECK (auth.uid() = patient_id);

CREATE POLICY "Update appointments" ON public.appointments 
    FOR UPDATE USING (auth.uid() = patient_id OR auth.uid() IN (SELECT user_id FROM public.doctors WHERE id = doctor_id));

-- Medical Records RLS (PRD V2: Doctors read only via active grant)
CREATE POLICY "Read own medical records" ON public.medical_records 
    FOR SELECT USING (auth.uid() = patient_id OR id IN (
        SELECT mr.id FROM public.medical_records mr
        JOIN public.record_access_grants rag ON mr.patient_id = rag.patient_id
        WHERE rag.doctor_id IN (SELECT id FROM public.doctors WHERE user_id = auth.uid())
        AND rag.expires_at > NOW()
    ));

CREATE POLICY "Patient insert medical records" ON public.medical_records 
    FOR INSERT WITH CHECK (auth.uid() = patient_id);

-- Blood Requests RLS
CREATE POLICY "Public read active blood requests" ON public.blood_requests FOR SELECT USING (true);
CREATE POLICY "Authenticated user create blood request" ON public.blood_requests 
    FOR INSERT WITH CHECK (auth.uid() = requester_id);

-- Blood Donor Responses RLS (Privacy consent boundary)
CREATE POLICY "Donor or Requester read donor response" ON public.blood_donor_responses
    FOR SELECT USING (
        auth.uid() = donor_user_id OR 
        auth.uid() IN (SELECT requester_id FROM public.blood_requests WHERE id = request_id)
    );

CREATE POLICY "Donor insert response" ON public.blood_donor_responses 
    FOR INSERT WITH CHECK (auth.uid() = donor_user_id);
