-- Security hardening for the initial demo schema. Apply after 001_initial_schema.sql.
-- RLS is defense in depth; the frontend demo does not authenticate or call these tables.

CREATE SCHEMA IF NOT EXISTS lifelink_private;
REVOKE ALL ON SCHEMA lifelink_private FROM PUBLIC, anon, authenticated;
GRANT USAGE ON SCHEMA lifelink_private TO anon, authenticated;

CREATE OR REPLACE FUNCTION lifelink_private.is_assigned_doctor(p_doctor_id uuid)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.doctors d
    WHERE d.id = p_doctor_id AND d.user_id = (SELECT auth.uid())
  );
$$;

CREATE OR REPLACE FUNCTION lifelink_private.can_read_patient_records(p_patient_id uuid)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.record_access_grants g
    JOIN public.appointments a ON a.id = g.appointment_id
    JOIN public.doctors d ON d.id = g.doctor_id
    WHERE g.patient_id = p_patient_id
      AND d.user_id = (SELECT auth.uid())
      AND a.patient_id = g.patient_id
      AND a.doctor_id = g.doctor_id
      AND a.share_records IS TRUE
      AND a.status NOT IN ('CANCELLED_BY_PATIENT', 'CANCELLED_BY_HOSPITAL')
      AND g.expires_at > now()
  );
$$;

CREATE OR REPLACE FUNCTION lifelink_private.owns_blood_request(p_request_id uuid)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.blood_requests r
    WHERE r.id = p_request_id AND r.requester_id = (SELECT auth.uid())
  );
$$;

REVOKE ALL ON FUNCTION lifelink_private.is_assigned_doctor(uuid) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION lifelink_private.can_read_patient_records(uuid) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION lifelink_private.owns_blood_request(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION lifelink_private.is_assigned_doctor(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION lifelink_private.can_read_patient_records(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION lifelink_private.owns_blood_request(uuid) TO anon, authenticated;

-- Profiles contain private contact fields and must never be publicly enumerable.
DROP POLICY IF EXISTS "Read own profile or public doc profiles" ON public.profiles;
DROP POLICY IF EXISTS "Update own profile" ON public.profiles;
CREATE POLICY "Read own profile" ON public.profiles
  FOR SELECT TO authenticated USING (id = (SELECT auth.uid()));
CREATE POLICY "Update own safe profile fields" ON public.profiles
  FOR UPDATE TO authenticated
  USING (id = (SELECT auth.uid()))
  WITH CHECK (id = (SELECT auth.uid()));
REVOKE UPDATE ON public.profiles FROM anon, authenticated;
GRANT UPDATE (full_name, phone, updated_at) ON public.profiles TO authenticated;

-- Patient and assigned doctor reads only. Status changes must use trusted server logic.
DROP POLICY IF EXISTS "Read own or assigned doctor appointments" ON public.appointments;
DROP POLICY IF EXISTS "Patient create appointments" ON public.appointments;
DROP POLICY IF EXISTS "Update appointments" ON public.appointments;
CREATE POLICY "Read own or assigned appointments" ON public.appointments
  FOR SELECT TO authenticated
  USING (patient_id = (SELECT auth.uid()) OR lifelink_private.is_assigned_doctor(doctor_id));
CREATE POLICY "Patients create their own appointments" ON public.appointments
  FOR INSERT TO authenticated
  WITH CHECK (
    patient_id = (SELECT auth.uid())
    AND status = 'CONFIRMED'
    AND share_records IS NOT NULL
    AND EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = (SELECT auth.uid()) AND p.role = 'PATIENT')
    AND EXISTS (SELECT 1 FROM public.doctors d WHERE d.id = appointments.doctor_id AND d.hospital_id = appointments.hospital_id)
  );
REVOKE UPDATE, DELETE ON public.appointments FROM anon, authenticated;
REVOKE INSERT ON public.appointments FROM anon, authenticated;
GRANT INSERT (patient_id, doctor_id, hospital_id, booking_mode, reason_for_visit, share_records, appointment_date)
  ON public.appointments TO authenticated;

-- A doctor sees a patient's records only while a matching appointment grant is active.
DROP POLICY IF EXISTS "Read own medical records" ON public.medical_records;
DROP POLICY IF EXISTS "Patient insert medical records" ON public.medical_records;
CREATE POLICY "Patient and authorized doctor read records" ON public.medical_records
  FOR SELECT TO authenticated
  USING (patient_id = (SELECT auth.uid()) OR lifelink_private.can_read_patient_records(patient_id));
CREATE POLICY "Patients create own record metadata" ON public.medical_records
  FOR INSERT TO authenticated
  WITH CHECK (patient_id = (SELECT auth.uid()));
CREATE POLICY "Patients delete own record metadata" ON public.medical_records
  FOR DELETE TO authenticated USING (patient_id = (SELECT auth.uid()));
-- Keep record writes disabled until private Storage and server-side file validation are implemented.
REVOKE INSERT, UPDATE ON public.medical_records FROM anon, authenticated;

DROP POLICY IF EXISTS "Public read active blood requests" ON public.blood_requests;
DROP POLICY IF EXISTS "Authenticated user create blood request" ON public.blood_requests;
CREATE POLICY "Public read open blood requests" ON public.blood_requests
  FOR SELECT TO anon, authenticated
  USING (status IN ('ACTIVE', 'DONORS_RESPONDED') OR lifelink_private.owns_blood_request(id));
CREATE POLICY "Authenticated patients create own blood requests" ON public.blood_requests
  FOR INSERT TO authenticated
  WITH CHECK (
    requester_id = (SELECT auth.uid())
    AND status = 'ACTIVE'
    AND matched_donors_count = 0
    AND EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = (SELECT auth.uid()) AND p.role = 'PATIENT')
  );
REVOKE UPDATE, DELETE ON public.blood_requests FROM anon, authenticated;
REVOKE INSERT ON public.blood_requests FROM anon, authenticated;
GRANT INSERT (requester_id, patient_initials, blood_group, units_needed, hospital_id, urgency, required_date, required_time)
  ON public.blood_requests TO authenticated;
-- Keep requester identity private even from authenticated users browsing public requests.
REVOKE SELECT ON public.blood_requests FROM anon, authenticated;
GRANT SELECT (id, patient_initials, blood_group, units_needed, hospital_id, urgency, required_date, required_time, status, matched_donors_count, created_at)
  ON public.blood_requests TO anon, authenticated;

DROP POLICY IF EXISTS "Donor or Requester read donor response" ON public.blood_donor_responses;
DROP POLICY IF EXISTS "Donor insert response" ON public.blood_donor_responses;
CREATE POLICY "Donor or requester read response" ON public.blood_donor_responses
  FOR SELECT TO authenticated
  USING (
    donor_user_id = (SELECT auth.uid()) OR EXISTS (
      SELECT 1 WHERE lifelink_private.owns_blood_request(request_id)
    )
  );
CREATE POLICY "Donors create own response with explicit consent" ON public.blood_donor_responses
  FOR INSERT TO authenticated
  WITH CHECK (donor_user_id = (SELECT auth.uid()) AND consent_share_phone IS TRUE);
REVOKE UPDATE, DELETE ON public.blood_donor_responses FROM anon, authenticated;
REVOKE INSERT ON public.blood_donor_responses FROM anon, authenticated;
GRANT INSERT (request_id, donor_user_id, consent_share_phone) ON public.blood_donor_responses TO authenticated;

-- Grants can only be made or revoked by the patient who owns the referenced appointment.
CREATE POLICY "Patients and assigned doctors read grants" ON public.record_access_grants
  FOR SELECT TO authenticated
  USING (patient_id = (SELECT auth.uid()) OR lifelink_private.is_assigned_doctor(doctor_id));
CREATE POLICY "Patients grant access for their appointment" ON public.record_access_grants
  FOR INSERT TO authenticated
  WITH CHECK (
    patient_id = (SELECT auth.uid())
    AND granted_at <= now()
    AND expires_at > now()
    AND expires_at <= now() + interval '24 hours'
    AND EXISTS (
      SELECT 1 FROM public.appointments a
      WHERE a.id = record_access_grants.appointment_id
        AND a.patient_id = (SELECT auth.uid())
        AND a.patient_id = record_access_grants.patient_id
        AND a.doctor_id = record_access_grants.doctor_id
        AND a.share_records IS TRUE
        AND a.status NOT IN ('CANCELLED_BY_PATIENT', 'CANCELLED_BY_HOSPITAL')
    )
  );
REVOKE INSERT, UPDATE ON public.record_access_grants FROM anon, authenticated;
GRANT INSERT (appointment_id, patient_id, doctor_id, granted_at, expires_at)
  ON public.record_access_grants TO authenticated;
CREATE POLICY "Patients revoke their grants" ON public.record_access_grants
  FOR DELETE TO authenticated USING (patient_id = (SELECT auth.uid()));
REVOKE UPDATE ON public.record_access_grants FROM anon, authenticated;

-- Users can read and mark their own notifications read; they cannot forge them.
CREATE POLICY "Users read own notifications" ON public.notifications
  FOR SELECT TO authenticated USING (user_id = (SELECT auth.uid()));
CREATE POLICY "Users update own notification read state" ON public.notifications
  FOR UPDATE TO authenticated USING (user_id = (SELECT auth.uid()))
  WITH CHECK (user_id = (SELECT auth.uid()));
REVOKE UPDATE ON public.notifications FROM anon, authenticated;
GRANT UPDATE (read) ON public.notifications TO authenticated;
REVOKE INSERT, DELETE ON public.notifications FROM anon, authenticated;
