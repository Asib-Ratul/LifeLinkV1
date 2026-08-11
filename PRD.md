# PRODUCT REQUIREMENTS DOCUMENT

## LifeLink

### Medical Appointment, Live Queue & Blood Donor Platform

**Version:** 2.0 — University Project / Demonstration MVP\
**Instruction Set Revision:** V2 — consistency-hardened for AI implementation\
**Platform:** Responsive Web Application / PWA\
**Target Demo Market:** Bangladesh\
**Initial Demo Location:** Dhaka\
**Development Type:** Academic demonstration project\
**Commercial Status:** Non-commercial prototype

---

# 1. DOCUMENT PURPOSE

This document is the complete implementation specification for an AI coding agent or development team.

The application must be built as a working university-project demonstration.

The objective is NOT to create a production-certified healthcare platform.

The objective is to demonstrate how a modern web platform could combine:

1. hospital discovery,
2. doctor discovery,
3. appointment booking,
4. live hospital queue tracking,
5. estimated waiting times,
6. patient-controlled medical-record sharing,
7. emergency blood requests,
8. nearby blood-donor discovery,
9. real-time notifications,
10. role-based dashboards.

The development agent must follow this PRD and must not invent expensive third-party dependencies when a free or locally simulated solution is sufficient.

---


## 1.1 DOCUMENT AUTHORITY & PHASE CONTROL

This PRD is the **functional and business-logic source of truth** for LifeLink.

Use the three project instruction files by domain:

- `AGENT(1) V2.md` — controls the **current development phase, immediate task, project state, decisions, validation status, and agent handoff**.
- `PRODUCT REQUIREMENTS DOCUMENT V2.md` — controls **features, business rules, roles, authorization, data behavior, state transitions, database requirements, acceptance criteria, and eventual functional implementation**.
- `LifeLink_Frontend_Design_Specification(1) V2.md` — controls **visual design, component appearance, layout, responsive behavior, interaction presentation, and frontend UX**.

The latest explicit user instruction overrides all three.

Do not treat the documents as a single global priority list. Resolve conflicts according to the domain above.

**Important phase rule:** if `AGENT(1) V2.md` says the current phase is frontend-only design, do not begin Supabase/database/authentication/backend implementation merely because later sections of this PRD describe the final functional application. The build order near the end of this PRD applies only after the current agent state authorizes functionality implementation.

---

# 2. IMPORTANT ACADEMIC-DEMO RESTRICTIONS

This application is a university prototype.

Therefore:

- Do not use real patient medical data.
- Do not require a real National ID.
- Do not connect to a government NID database.
- Do not use a real payment gateway.
- Do not charge real money.
- Do not require SMS OTP.
- Do not require WhatsApp API.
- Do not require paid Google Maps APIs.
- Do not require paid notification APIs.
- Do not claim that the system determines whether a person is medically eligible to donate blood.
- Do not implement real-world blood-group compatibility recommendations beyond matching the exact requested blood group.
- Do not integrate with real hospital information systems.
- Do not require native Android or iOS applications.
- Do not require production healthcare certification.
- Do not use actual confidential healthcare data during demonstration.

All seed data used in the project must be fictional.

A visible footer or About page should state:

**“LifeLink is an academic demonstration project. Data shown in this system is fictional and the platform must not be used for actual medical emergencies or clinical decision-making.”**

---

# 3. PRODUCT VISION

LifeLink provides one website where a user can:

- find hospitals,
- find doctors,
- search by medical specialty,
- view doctor schedules,
- book appointments,
- receive an appointment serial or time slot,
- monitor the doctor's queue,
- estimate when their turn will arrive,
- receive real-time queue notifications,
- optionally share demonstration medical records with the booked doctor,
- register as a demonstration blood donor,
- create a blood request,
- and respond to nearby blood requests.

The primary innovation demonstrated by the project is the combination of:

**Doctor Booking + Live Queue + Estimated Waiting Time + Blood Donor Network**

inside one platform.

---

# 4. PRIMARY PROJECT GOALS

The completed system should demonstrate the following user experience.

## Goal A — Reduce unnecessary hospital waiting

Instead of arriving several hours before a doctor's turn, a patient can see:

- their serial,
- the current serial,
- the number of patients ahead,
- estimated remaining waiting time,
- estimated turn time,
- current queue status.

Example:

**Doctor:** Dr. Sarah Rahman\
**Your Serial:** #25\
**Now Serving:** #18\
**Patients Ahead:** 6\
**Estimated Wait:** 48 minutes\
**Estimated Turn:** approximately 6:20 PM\
**Queue Status:** Running normally

---

## Goal B — Centralize doctor discovery

Users should be able to search doctors by:

- name,
- hospital,
- specialty,
- area,
- available date,
- booking type.

---

## Goal C — Demonstrate blood-donor coordination

A registered user can create a demonstration blood request.

Matching nearby registered donors can receive the request in their notification centre.

A donor can respond:

**“I may be available to help.”**

The requester can then see the response.

This is a matching/communication demonstration only.

The website must NOT claim that responding donors are medically eligible to donate.

---

# 5. TARGET USERS

The system has five authenticated system roles.

## 5.1 Patient / General User

A normal registered account.

Can:

- browse hospitals,
- browse doctors,
- search,
- use map discovery,
- book appointments,
- cancel eligible appointments,
- view appointment history,
- follow queues,
- receive notifications,
- upload demonstration medical records,
- choose whether records are shared,
- submit doctor ratings,
- register as a donor,
- create blood requests,
- respond to their own blood-request activity.

---

## 5.2 Doctor

A **doctor profile** and a **doctor login account** are separate concepts.

A doctor profile may exist for public listing/scheduling without an authentication account.

Only a doctor profile linked to an authenticated user through `doctors.user_id` may:

- log in as a doctor,
- access the doctor dashboard,
- view assigned appointments,
- access patient-shared demonstration medical records.

For the university demo, at least one doctor must have a pre-seeded authenticated account. Other seeded doctor profiles may be listing-only.

Doctors with authenticated accounts can:

- see their profile,
- see their assigned hospital,
- see upcoming sessions,
- see their appointment list,
- see current queue,
- see patient records only when explicit permission exists,
- see limited patient details related to their own appointments.

Doctors cannot:

- manage unrelated doctors,
- access unrelated patients,
- change hospital administration,
- view medical records without permission,
- create platform administrators.

---

## 5.3 Hospital Staff / Queue Operator

A hospital employee responsible primarily for appointment and queue operations.

Can:

- view sessions for their hospital,
- view appointments,
- add walk-in patients,
- start queue sessions,
- advance the queue,
- skip a patient,
- recall a skipped patient,
- pause queue,
- resume queue,
- complete queue,
- cancel a session,
- mark patients as completed/no-show.

Cannot:

- access patient medical-record files,
- modify platform-wide settings,
- manage other hospitals.

---

## 5.4 Hospital Admin

Hospital-level administrator.

Can:

- manage hospital information,
- manage doctor profiles,
- manage doctor schedules,
- configure booking mode,
- configure consultation fee for demonstration purposes,
- configure payment mode,
- manage hospital staff,
- operate queues if needed,
- create hospital-generated blood requests,
- moderate activity within their hospital.

Hospital administrators do not automatically receive access to patient medical records.

---

## 5.5 Platform Admin

System owner/academic administrator.

Can:

- create/edit hospitals,
- manage hospital status,
- manage doctor profiles,
- manage demonstration role assignments,
- view users,
- moderate reviews,
- review user-created blood requests,
- approve/reject blood requests,
- view system statistics,
- disable inappropriate demonstration accounts/content.

The Platform Admin must NOT be given automatic UI access to medical-record file contents.

---

# 6. DEMO ACCOUNT STRATEGY

Normal users may register themselves.

For the university demo, privileged accounts should be pre-created through seed data:

- Platform Admin
- Hospital Admin
- Hospital Staff
- Doctor
- Patient

This avoids building complicated production invitation systems.

Example demo credentials may be shown on the login screen when:

`NEXT_PUBLIC_DEMO_MODE=true`

Example:

Patient\
`patient@lifelink.demo`

Doctor\
`doctor@lifelink.demo`

Hospital Staff\
`staff@lifelink.demo`

Hospital Admin\
`hospitaladmin@lifelink.demo`

Platform Admin\
`admin@lifelink.demo`

Use a clearly documented development-only password.

The password must be easy to change from the seed script.

---

# 7. AUTHENTICATION

## 7.1 Authentication Method

Use:

**Email + Password**

Do NOT use SMS OTP for this academic MVP.

Reason:

SMS verification introduces cost and third-party dependencies that provide little academic value for this project.

A phone number may still be stored as an optional profile/contact field.

---

## 7.2 Registration

Public registration creates only:

**Patient / General User**

accounts.

A user must never be allowed to select:

- Doctor,
- Hospital Staff,
- Hospital Admin,
- Platform Admin

during public registration.

Those roles come from seeded/admin-controlled accounts.

---

# 8. ROLE-BASED ACCESS CONTROL

Authorization must be enforced in the backend/database, not only by hiding buttons.

A user manually entering another role's URL must still be denied.

Examples:

A patient visiting:

`/hospital-admin`

must receive:

**403 / Access Denied**

A hospital staff member requesting another hospital's appointment data must receive no data.

A doctor must only receive appointments assigned to that doctor.

---

# 9. PUBLIC WEBSITE

The public-facing website should contain:

## Home

Includes:

- hero section,
- doctor search,
- hospital search,
- quick specialty categories,
- “Find Hospitals Near Me” action,
- blood-request section,
- explanation of live queue,
- project/demo disclaimer.

---

## Hospitals

Route:

`/hospitals`

Display hospitals in cards/list.

Each card includes:

- hospital name,
- image,
- area,
- address,
- number of doctors,
- specialties,
- View Hospital button.

Filters:

- hospital name,
- area,
- specialty.

---

## Hospital Details

Route:

`/hospitals/[id]`

Display:

- hospital name,
- cover image,
- description,
- address,
- phone,
- map location,
- specialties,
- doctors,
- upcoming doctor sessions.

---

# 10. DOCTOR DIRECTORY

Route:

`/doctors`

Users can filter doctors by:

- doctor name,
- specialty,
- hospital,
- area,
- available date,
- booking mode.

---

# 11. DOCTOR PROFILE

Route:

`/doctors/[id]`

Display:

- profile image,
- name,
- specialty,
- qualifications,
- short biography,
- affiliated hospital,
- consultation schedule,
- consultation fee,
- booking mode,
- average rating,
- number of ratings.

Display upcoming available sessions.

Each session should have a:

**Book Appointment**

button when booking is available.

---

# 12. SPECIALTIES

Seed common demonstration specialties such as:

- Cardiology
- Internal Medicine
- Gynecology
- Pediatrics
- Orthopedics
- Dermatology
- ENT
- Neurology
- General Medicine

Specialties should be stored in the database rather than hard-coded throughout the UI.

---

# 13. MAP DISCOVERY

Use a free map solution.

Recommended:

**Leaflet / React Leaflet + OpenStreetMap**

The map must display proper OpenStreetMap attribution.

The map should display demonstration hospital markers.

Initial demonstration hospitals may be located around areas such as:

- Dhanmondi
- Mirpur
- Uttara
- Mohammadpur

using fictional hospital names.

Do not pretend fictional hospitals are real institutions.

---

## 13.1 Location Modes

Users have two choices:

### Use My Location

Use the browser Geolocation API.

If permission is granted:

- obtain latitude/longitude,
- calculate distance to hospitals,
- sort nearby hospitals.

### Manual Area

If geolocation is denied:

allow selection from preset areas.

Example:

- Dhanmondi
- Mirpur
- Uttara
- Mohammadpur

No paid geocoding API is required.

---

## 13.2 Radius Filter

Options:

- 5 km
- 10 km
- 20 km
- 30 km

Default:

**10 km**

Calculate distance using latitude/longitude and the Haversine formula.

---

# 14. DOCTOR SESSIONS

Hospital administrators create doctor sessions.

A session contains:

- doctor,
- hospital,
- date,
- starting time,
- estimated ending time,
- booking mode,
- maximum patients,
- default consultation duration,
- fee,
- payment mode,
- queue status.

---

# 15. BOOKING MODES

Each doctor session uses exactly one booking mode.

## Mode A — Queue / Serial Booking

The patient receives the next available serial.

Example:

Patient books.

Existing serials:

1–14

Patient receives:

**Serial #15**

Serial assignment must occur atomically to prevent duplicate serials.

---

## Mode B — Time-Slot Booking

The administrator configures slot duration.

Example:

10 minutes.

Available slots:

4:00 PM\
4:10 PM\
4:20 PM\
4:30 PM

Once booked, a slot must become unavailable.

Two users must never successfully reserve the same slot.

---


## 15.1 QUEUE MODE VS TIME-SLOT MODE — CANONICAL RULE

A doctor session uses exactly one booking mode, and the two modes must not be mixed.

### Queue / Serial Session

A queue-mode appointment:

- receives a `serial_number`,
- does not require a `slot_start`,
- participates in live queue state,
- can become `waiting`, `serving`, `skipped`, `completed`, or `no_show`,
- receives patients-ahead calculation,
- receives estimated waiting time,
- may receive a near-turn alert,
- may open `/appointments/[id]/queue`.

### Time-Slot Session

A time-slot appointment:

- receives a `slot_start`,
- does not receive a serial number,
- does not participate in the live serial queue,
- does not receive patients-ahead calculation,
- does not receive queue ETA,
- does not receive a near-turn queue alert,
- must not show a live-queue link.

Time-slot appointments may be `confirmed`, `completed`, `cancelled_by_patient`, `cancelled_by_hospital`, or `no_show`.

---

# 16. CANONICAL APPOINTMENT STATUS

LifeLink uses **one appointment status model**. Do not create a second queue-entry status model or a separate `queue_entries` table for this MVP.

The canonical `appointments.status` values are:

`confirmed`

`waiting`

`serving`

`completed`

`skipped`

`cancelled_by_patient`

`cancelled_by_hospital`

`no_show`

Meaning:

- `confirmed` — valid booked appointment; for queue mode, the session has not yet placed it into the active waiting queue.
- `waiting` — queue-mode appointment waiting to be called.
- `serving` — queue-mode appointment currently being served.
- `completed` — consultation/appointment finished.
- `skipped` — queue-mode appointment skipped by staff and eligible for recall.
- `cancelled_by_patient` — patient cancelled before the allowed cutoff.
- `cancelled_by_hospital` — hospital/session cancelled the appointment.
- `no_show` — patient did not attend.

Queue-only states are `waiting`, `serving`, and `skipped`.

Time-slot appointments must not use queue-only states unless the user later explicitly expands the model.

The system must display human-friendly labels.

---

# 17. APPOINTMENT BOOKING FLOW

Patient selects:

Hospital\
→ Doctor\
→ Session\
→ Booking method/session\
→ Appointment details\
→ Payment method if applicable\
→ Confirm booking

After successful booking, show:

- appointment ID,
- hospital,
- doctor,
- date,
- session,
- serial number for queue mode OR scheduled time for time-slot mode,
- payment status.

For **queue-mode** appointments, also show the live queue link:

`/appointments/[id]/queue`

For **time-slot** appointments, do not show a live queue link, patients-ahead value, or queue ETA.

---

# 18. APPOINTMENT CANCELLATION

Patients may cancel appointments before the session begins.

Cancellation must:

- update appointment status,
- preserve appointment history,
- release the time slot when appropriate,
- generate an in-app notification.

A queue serial does NOT need to be renumbered after a cancellation.

Example:

\#11 cancels.

Patients:

\#10, #12, #13

retain their serial numbers.

---

# 19. WALK-IN PATIENTS

Hospital staff must be able to add walk-in patients.

From the queue dashboard:

**Add Walk-In**

Fields:

- patient/display name,
- optional phone,
- appointment/session,
- booking type.

For queue sessions, assign the next available serial.

Walk-in entries do not need registered user accounts.

---

# 20. DEMONSTRATION PAYMENT SYSTEM

There is NO real payment integration.

Do not integrate:

- bKash API,
- Nagad API,
- Stripe,
- SSLCommerz,
- cards,
- banking APIs.

Instead implement:

## Payment Options

Session configuration:

`free`

`pay_at_hospital`

`demo_online_payment`

---

## 20.1 Mock Online Payment

If `demo_online_payment` is selected, open a modal.

Example:

### Demo Payment

Amount: ৳800

Select:

- bKash Demo
- Nagad Demo
- Card Demo

Buttons:

**Simulate Successful Payment**

**Simulate Failed Payment**

Successful result:

`payment_status = demo_paid`

Failed result:

`payment_status = failed`

Display clearly:

**“Simulation only — no real transaction occurred.”**

---

# 21. LIVE QUEUE SYSTEM

This is one of the main features of the project.

Queue information must update in real time without requiring page refresh.

Use Supabase Realtime/database subscriptions.

---

# 22. QUEUE SESSION STATES

A queue session uses:

`scheduled`

`started`

`paused`

`completed`

`cancelled`

---

# 23. QUEUE CONTROLS — CANONICAL ACTION CONTRACT

Hospital Staff and Hospital Admin should see these canonical controls for queue-mode sessions:

**Start Session**

- changes session `scheduled → started`,
- changes eligible queue-mode appointments `confirmed → waiting`,
- if no appointment is currently `serving`, calls the first valid `waiting` appointment and marks it `serving`.

**Complete & Call Next**

- requires one current `serving` appointment,
- marks the current appointment `completed`,
- records `completed_at`,
- selects the next valid `waiting` appointment by serial order,
- marks that appointment `serving`,
- records `serving_started_at`,
- updates realtime clients and relevant notifications.

**Skip & Call Next**

- marks the current `serving` appointment `skipped`,
- selects the next valid `waiting` appointment,
- marks it `serving`.

**Recall Skipped**

- staff selects a `skipped` appointment,
- the recalled appointment returns to `waiting`,
- it is not allowed to create a duplicate serial.

**Pause**

- changes session `started → paused`,
- does not alter appointment serials.

**Resume**

- changes session `paused → started`.

**Complete Session**

- changes session to `completed`,
- should normally be used after no patient is currently `serving`,
- if waiting appointments remain, require a confirmation dialog.

**Cancel Session**

- changes session to `cancelled`,
- changes remaining `confirmed`, `waiting`, `serving`, or `skipped` appointments to `cancelled_by_hospital`,
- creates relevant notifications.

**Add Walk-In**

- creates an appointment row with `is_walk_in = true`,
- assigns the next valid serial atomically,
- uses `waiting` if the session has started, otherwise `confirmed`.

Do not create additional queue-control meanings unless the user explicitly requests them.

---

# 24. QUEUE ENTRY MODEL

For this university MVP, the **appointment row itself is the queue entry**.

Do not create a separate `queue_entries` table.

Use:

- `appointments.serial_number` for queue position,
- `appointments.status` for queue/appointment state,
- `appointments.serving_started_at` and `appointments.completed_at` for timing,
- `doctor_sessions.session_status` for overall queue-session state.

The canonical appointment statuses are defined in Section 16.

---

# 25. COMPLETE & CALL NEXT LOGIC

Example:

Current patient:

\#18

Staff clicks:

**Complete & Call Next**

System:

1. marks #18 completed,
2. records completion timestamp,
3. finds next valid waiting entry,
4. marks that entry serving,
5. updates current queue display,
6. creates relevant user notifications.

Cancelled/no-show patients must be ignored.

---

# 26. QUEUE ESTIMATED WAITING TIME

The original concept requires more than displaying the current serial.

The application must calculate an estimated waiting time.

For an initial session:

`estimated_wait = patients_ahead × default_consultation_minutes`

Example:

Patients ahead: 6\
Default duration: 8 minutes

Estimated wait:

48 minutes

---

## 26.1 Dynamic Improvement

If at least three patients have completed their consultations during the current session:

calculate the average consultation time from up to the latest five completed patients.

Use:

`estimated_wait = patients_ahead × recent_average_consultation_duration`

This causes the estimate to improve as the session progresses.

---

# 27. PATIENT LIVE QUEUE SCREEN

Route:

`/appointments/[id]/queue`

Display prominently:

**Dr. Sarah Rahman**

**Now Serving:** #18

**Your Serial:** #25

**Patients Ahead:** 6

**Estimated Wait:** \~48 minutes

**Estimated Turn:** \~6:20 PM

**Queue Status:** Running

Also show:

- session starting time,
- hospital,
- current status,
- last updated time.

If paused:

**Queue temporarily paused**

If cancelled:

**This session has been cancelled by the hospital.**

---

# 28. NEAR-TURN ALERT

Each patient may choose a threshold.

Default:

**3 patients**

Allowed range:

1–10.

When the number of waiting patients ahead becomes less than or equal to the threshold, generate:

**“Your turn is approaching. There are approximately 3 patients before you.”**

Only generate this notification once per appointment unless the queue is reset.

---

# 29. NOTIFICATION SYSTEM

Do not require SMS or paid push-notification infrastructure.

Implement an internal real-time notification centre.

Database table:

`notifications`

Each authenticated user gets a bell icon.

Display unread count.

---

# 30. NOTIFICATION EVENTS

Create notifications for:

### Appointments

- appointment confirmed,
- appointment cancelled,
- session cancelled,
- session started.

### Queue

- doctor/session started,
- near-turn alert,
- queue paused,
- queue resumed.

### Blood

- matching blood request available,
- donor responded,
- request approved,
- request rejected,
- request fulfilled.

---

# 31. OPTIONAL BROWSER NOTIFICATIONS

Browser Notification API may be used as an optional enhancement.

If permission is granted and the application is open, a real-time event may trigger a browser notification.

However:

The application must work completely without browser notification permission.

The in-app notification centre is the required feature.

---

# 32. PATIENT DASHBOARD

Route:

`/dashboard`

Sections:

## Upcoming Appointments

Shows:

- doctor,
- hospital,
- date,
- serial/slot,
- queue status.

## Appointment History

## Medical Records

## Blood Donor Profile

## My Blood Requests

## Notifications

## Account Settings

---

# 33. DEMONSTRATION MEDICAL RECORDS

This is not a real electronic health-record system.

It demonstrates access-control principles.

Users may upload fictional sample records.

Allowed file types:

- PDF
- JPG
- JPEG
- PNG

Maximum:

**5 MB per file**

Store files in a private storage bucket.

---

# 34. MEDICAL RECORD FIELDS

Each record contains:

- title,
- record type,
- optional description,
- file,
- record date,
- uploaded timestamp.

Example types:

- Prescription
- Laboratory Report
- Imaging Report
- Discharge Summary
- Other

---

# 35. MEDICAL RECORD SECURITY

A medical record is visible by default ONLY to its owner.

A doctor must never automatically gain access simply because they exist on the platform.

---

# 36. RECORD SHARING DURING BOOKING

During booking, display:

### Share medical records with this doctor?

Checkbox:

**Allow this doctor to view my uploaded demonstration medical records for this appointment.**

Default:

Unchecked.

If checked:

create a `record_share` authorization.

---

# 37. RECORD SHARE ACCESS PERIOD

Doctor access begins when the appointment becomes confirmed.

Doctor access ends:

24 hours after the appointment becomes completed,

OR immediately if:

- appointment is cancelled before beginning,
- patient revokes permission.

The patient can see which doctor currently has access.

---

# 38. DOCTOR PATIENT VIEW

Doctor dashboard:

`/doctor/appointments/[id]`

Display:

- patient display name,
- appointment details,
- queue status.

If record access exists:

show shared medical records.

Otherwise:

show:

**“Patient has not shared medical records for this appointment.”**

---

# 39. DONOR REGISTRATION

A normal user may optionally become a demonstration donor.

No NID is required.

This removes unnecessary sensitive-data collection.

Fields:

- blood group,
- phone/contact number,
- current area,
- latitude/longitude if location permission granted,
- notification radius,
- available/unavailable toggle,
- optional last donation date.

The last-donation date is informational only.

The software must NOT declare the donor medically eligible based on this value.

---

# 40. BLOOD GROUPS

Supported self-reported groups:

- A+
- A-
- B+
- B-
- AB+
- AB-
- O+
- O-

For this university MVP:

**Match only the exact requested blood group.**

Do not implement medical compatibility suggestions between different blood groups.

---

# 41. DONOR AVAILABILITY

Donors have:

`available = true/false`

If false:

do not include them in new matches.

The donor can toggle availability from their dashboard.

---

# 42. BLOOD REQUEST CREATION

Registered users and hospital administrators may create blood requests.

Fields:

- requested blood group,
- number of units — demonstration information,
- hospital/destination,
- area,
- latitude,
- longitude,
- required-by date/time,
- short message,
- contact number,
- matching radius.

Do not request detailed diagnosis information.

---

# 43. BLOOD REQUEST TYPES

Two origins:

`user_created`

`hospital_created`

---

# 44. USER-CREATED REQUEST MODERATION

User-created requests do not broadcast immediately.

Status:

`pending_approval`

Platform Admin can:

**Approve**

or

**Reject**

This prevents arbitrary users from immediately broadcasting fake requests during the demonstration.

---

# 45. HOSPITAL-CREATED BLOOD REQUESTS

Hospital Admin requests may become:

`active`

immediately.

This demonstrates trusted organization behaviour.

---

# 46. BLOOD REQUEST STATUS

Statuses:

`pending_approval`

`active`

`donor_responses_received`

`fulfilled`

`cancelled`

`rejected`

`expired`

---

# 47. BLOOD REQUEST MATCHING

When a request becomes active:

find donors where:

1. donor is available,
2. donor blood group exactly matches,
3. donor is within the blood request radius,
4. request is within donor's preferred alert radius.

Calculate geographic distance using stored coordinates.

Create notification entries for matching donors.

Do NOT expose all donors publicly.

---

# 48. DONOR ALERT

Example notification:

### Blood Request Nearby

Blood group: B+

Destination: Green Valley Demo Hospital

Distance: approximately 4.2 km

Needed by: Today, 8:00 PM

Button:

**View Request**

---

# 49. DONOR RESPONSE

A donor viewing the request may select:

**I may be available to help**

or

**Not available**

Before accepting, display:

**“This website does not determine medical eligibility. Final donor screening must be performed by an appropriate healthcare/blood-service professional.”**

If donor selects available:

create or update the unique `blood_request_response`.

Status:

`interested`

If the blood request is currently `active`, the first interested donor changes the request status to:

`donor_responses_received`

Additional interested responses keep the request in `donor_responses_received`.

Notify the requester.

If donor selects **Not available**:

create or update the unique response with:

`response_status = declined`

Do not notify the requester for a declined response.

Do not send that donor another notification for the same blood request.

---

# 50. CONTACT PRIVACY

Phone numbers must never appear on public donor lists or public blood-request pages.

The `blood_requests.contact_phone` field may be stored for the requester/hospital's own private record and admin moderation, but it is **not displayed publicly and is not automatically disclosed to donors** in this MVP.

When a donor responds positively, allow the donor to explicitly choose:

**Share my contact number with the requester**

If checked:

the requester may see that donor's contact number on the authenticated response view.

Otherwise:

only show that the donor responded.

Do not create any additional automatic phone-number exchange.

---

# 51. BLOOD REQUEST COMPLETION

The requester or relevant hospital administrator can press:

**Mark Request Fulfilled**

After fulfillment:

- request status becomes fulfilled,
- stop new matching,
- create notifications telling existing responders the request has been fulfilled.

---

# 52. BLOOD REQUEST EXPIRATION

If the required-by time passes and the request was not manually completed:

mark it:

`expired`

Expired requests should not appear as active.

---

# 53. RATE LIMIT FOR DEMO BLOOD REQUESTS

A normal user may have a maximum of:

**3 active or pending blood requests**

at one time.

This is an application-level anti-spam demonstration.

---

# 54. DOCTOR RATINGS

Only users with a:

`completed`

appointment may rate that doctor.

Each appointment allows one review.

Fields:

- rating 1–5,
- optional comment,
- created date.

Doctor profile displays:

- average rating,
- number of reviews.

---

# 55. REVIEW MODERATION

Platform Admin may:

- hide review,
- restore review.

The review should remain stored when hidden.

---

# 56. HOSPITAL STAFF DASHBOARD

Route:

`/staff`

Display:

- today's sessions,
- upcoming sessions,
- queue counts,
- current serving patient,
- appointment list.

Primary screen:

**Queue Control**

---

# 57. HOSPITAL ADMIN DASHBOARD

Route:

`/hospital-admin`

Sections:

- Overview
- Hospital Profile
- Doctors
- Doctor Sessions
- Appointments
- Queue Management
- Staff
- Blood Requests

---

# 58. DOCTOR MANAGEMENT

For the university MVP, **Staff management does not create invitation/email onboarding infrastructure**.

Hospital Admin may assign, activate, or deactivate **existing seeded/demo user accounts** as hospital staff/admin members. New authentication-account invitation flows are out of scope unless the user explicitly adds them later.

Hospital Admin can:

- add/edit doctor profile information,
- assign specialties,
- update biography,
- update qualifications,
- upload image,
- activate/deactivate doctor.

For the university demonstration, authenticated doctor login accounts are pre-seeded/admin-controlled.

Adding a new doctor profile does not need to automatically create an authentication account.

A doctor profile with `user_id = NULL` is **listing-only** and cannot access `/doctor` routes or patient records.

A doctor profile with `user_id` linked to an authenticated user may use the doctor dashboard subject to authorization rules.

---

# 59. SESSION MANAGEMENT

Hospital Admin can create sessions specifying:

Doctor\
Hospital\
Date\
Start Time\
End Time\
Booking Mode\
Maximum Patients\
Default Consultation Duration\
Fee\
Payment Mode

---

# 60. PLATFORM ADMIN DASHBOARD

Route:

`/admin`

Sections:

## Overview

Cards:

- users,
- hospitals,
- doctors,
- appointments,
- active queues,
- registered donors,
- active blood requests.

## Hospitals

Create/edit/deactivate.

## Users

View and deactivate.

## Blood Request Moderation

Approve/reject.

## Reviews

Hide/unhide.

## Demo Statistics

Display simple charts.

---

# 61. ANALYTICS FOR UNIVERSITY PRESENTATION

Dashboard should display demonstration metrics such as:

- total users,
- appointments booked,
- appointments completed,
- active queue sessions,
- average estimated wait,
- donors registered,
- blood requests created,
- donor responses,
- fulfilled blood requests.

These do not require external analytics software.

Calculate them directly from the database.

---

# 62. DATABASE DESIGN

Recommended database:

**PostgreSQL through Supabase**

Create proper SQL migrations.

Do not rely only on manually creating tables through a dashboard.

---

# 63. CORE DATABASE TABLES

The implementation should contain approximately these entities.

---

## `profiles`

Fields:

- id
- email
- full\_name
- phone
- avatar\_url
- role
- created\_at
- updated\_at
- is\_active

Role enum:

- patient
- doctor
- hospital\_staff
- hospital\_admin
- platform\_admin

---

## `specialties`

- id
- name
- slug

---

## `hospitals`

- id
- name
- slug
- description
- address
- area
- phone
- email
- latitude
- longitude
- image\_url
- is\_active
- created\_at

---

## `doctors`

- id
- user\_id nullable
- full\_name
- specialty\_id
- biography
- qualifications
- phone
- avatar\_url
- is\_active
- created\_at

---

## `doctor_hospitals`

- id
- doctor\_id
- hospital\_id

---

## `hospital_members`

- id
- user\_id
- hospital\_id
- member\_role
- is\_active

`member_role`:

- staff
- admin

---

## `doctor_sessions`

- id
- doctor\_id
- hospital\_id
- session\_date
- start\_time
- end\_time
- booking\_mode
- slot\_duration\_minutes
- max\_patients
- default\_consultation\_minutes
- consultation\_fee
- payment\_mode
- session\_status
- started\_at
- paused\_at
- completed\_at
- created\_at

---

## `appointments`

- id
- patient\_id nullable
- walk\_in\_name nullable
- walk\_in\_phone nullable
- doctor\_session\_id
- serial\_number nullable
- slot\_start nullable
- status
- payment\_status
- payment\_method nullable
- is\_walk\_in
- booked\_at
- serving\_started\_at nullable
- completed\_at nullable
- cancelled\_at nullable

---

## `notifications`

- id
- user\_id
- type
- title
- message
- related\_entity\_type
- related\_entity\_id
- dedupe\_key
- is\_read
- created\_at

Use unique/dedupe logic to prevent duplicate near-turn notifications.

---

## `medical_records`

- id
- patient\_id
- title
- record\_type
- description
- record\_date
- storage\_path
- mime\_type
- file\_size
- created\_at

---

## `record_shares`

- id
- medical\_record\_owner\_id
- doctor\_id
- appointment\_id
- granted\_at
- expires\_at
- revoked\_at

One active `record_share` for an appointment grants that appointment's authenticated doctor **read-only access to all demonstration medical records owned by that patient while the share remains active**.

Records uploaded by the patient after permission was granted are also visible while the authorization remains active.

The share expires 24 hours after the appointment becomes `completed`, or immediately when the appointment is cancelled or the patient revokes permission.

This rule is deterministic; do not create per-file sharing for this MVP unless the user explicitly changes the requirement.

---

## `ratings`

- id
- appointment\_id
- patient\_id
- doctor\_id
- rating
- comment
- is\_hidden
- created\_at

Appointment ID should be unique.

---

## `donor_profiles`

- id
- user\_id
- blood\_group
- contact\_phone
- area
- latitude
- longitude
- alert\_radius\_km
- available
- last\_donation\_date nullable
- created\_at
- updated\_at

---

## `blood_requests`

- id
- requester\_user\_id nullable
- requester\_hospital\_id nullable
- origin\_type
- blood\_group
- units\_requested
- destination\_name
- area
- latitude
- longitude
- needed\_by
- message
- contact\_phone
- radius\_km
- status
- approved\_by nullable
- approved\_at nullable
- created\_at
- fulfilled\_at nullable

---

## `blood_request_responses`

- id
- blood\_request\_id
- donor\_user\_id
- response\_status
- share\_contact
- created\_at

`response_status` values:

- `interested`
- `declined`

Unique:

`blood_request_id + donor_user_id`

---

## `audit_logs`

Use a lightweight audit table for academically interesting actions.

Fields:

- id
- actor\_user\_id
- action
- entity\_type
- entity\_id
- metadata
- created\_at

Record actions such as:

- queue started,
- queue paused,
- session cancelled,
- blood request approved,
- blood request rejected,
- review hidden.

Do NOT place uploaded medical-record content inside audit logs.

---

# 64. DATABASE CONSTRAINTS

The database must enforce important rules.

Examples:

- one rating per appointment,
- one donor profile per user,
- unique email through authentication,
- valid blood-group enum,
- radius greater than zero,
- rating between 1 and 5,
- no duplicate donor response to same request,
- no duplicate time-slot booking,
- no duplicate queue serial within one session.

Do not rely exclusively on frontend validation.

---

# 65. ROW LEVEL SECURITY

Enable database-level Row Level Security where supported.

Important policies:

## Patients

Can view/update their own profile.

Can view their own appointments.

Can view their own records.

Can view their own donor profile.

---

## Doctors

Can view appointments for themselves.

Can view records only through valid, non-expired, non-revoked record-sharing authorization.

---

## Hospital Staff

Can view/manage appointments belonging only to their hospital.

Cannot view uploaded patient medical-record files.

---

## Hospital Admin

Can manage hospital-related operational data only for their hospital.

---

## Platform Admin

Can manage platform metadata and moderation functionality.

Medical-record storage should not automatically become accessible simply because a user is platform admin through the normal interface.

---

# 66. STORAGE

Use private storage for:

- medical records.

Public or public-read storage may be used for:

- doctor profile pictures,
- hospital images,
- generic avatars.

Medical-record URLs must not be permanently public URLs.

Generate authorized access only when permission allows it.

---

# 67. SEARCH

Search should support partial text matching.

Doctor search:

- name,
- specialty,
- hospital.

Hospital search:

- hospital name,
- area.

Results should show useful empty states.

Example:

**“No cardiologists were found for the selected filters.”**

---

# 68. PAGINATION

For the university demo, normal pagination or a simple:

**Load More**

approach is sufficient.

Do not overengineer infinite scrolling.

---

# 69. RESPONSIVE DESIGN

The website must work on:

- desktop,
- laptop,
- tablet,
- mobile.

Mobile is important because the conceptual target users would commonly access the service from phones.

---

# 70. VISUAL DESIGN DIRECTION

Use a clean modern healthcare-style interface.

Suggested character:

- professional,
- calm,
- modern,
- minimal,
- trustworthy.

Use:

- white/light backgrounds,
- blue/teal medical accents,
- clear cards,
- soft borders,
- subtle shadows,
- clear status badges,
- accessible typography.

Avoid excessive animations.

---

# 71. UI COMPONENTS

Create reusable components.

Examples:

- Navbar
- Footer
- SearchBar
- HospitalCard
- DoctorCard
- SpecialtyBadge
- AppointmentCard
- QueueCard
- QueueStatusBadge
- BloodRequestCard
- NotificationBell
- NotificationPanel
- EmptyState
- ConfirmationDialog
- LoadingSkeleton
- DataTable
- StatCard

---

# 72. LOADING STATES

Every asynchronous screen should have appropriate loading feedback.

Do not leave blank screens while fetching data.

Use:

- skeletons,
- spinners where appropriate,
- disabled button states.

---

# 73. ERROR STATES

Handle:

- network failure,
- failed booking,
- booking already taken,
- session full,
- unauthorized access,
- failed file upload,
- deleted/deactivated doctor,
- cancelled session,
- expired blood request,
- unavailable donor,
- geolocation denied.

Display human-readable messages.

---

# 74. EMPTY STATES

Examples:

### No Appointments

“You have no upcoming appointments.”

### No Notifications

“You're all caught up.”

### No Blood Requests

“No active matching requests are available.”

### No Records

“You haven't uploaded any demonstration medical records.”

---

# 75. FORM VALIDATION

Use both frontend and backend validation.

Recommended:

- Zod or equivalent schema validation.

Validate:

- email,
- phone when provided,
- required fields,
- dates,
- file type,
- file size,
- latitude/longitude,
- radius,
- ratings,
- session times.

---

# 76. DATE AND TIME

Store database timestamps consistently.

Display date/time in Bangladesh-friendly formatting.

Example:

**11 Aug 2026, 5:30 PM**

The application should use timezone-aware handling.

---

# 77. REAL-TIME EVENTS

Use real-time subscriptions for:

- current queue state,
- patient appointment queue entry,
- user notifications,
- blood-request response changes.

Do not refresh the entire page every few seconds.

---

# 78. PWA

The final demo application **must include basic PWA installability/metadata**.

Include:

- web app manifest,
- app name,
- icon,
- theme configuration.

Advanced offline healthcare functionality is not required. Service-worker/offline behavior should remain minimal and must not imply offline clinical reliability.

---

# 79. ACCESSIBILITY

Aim for practical WCAG-style accessibility.

Important requirements:

- semantic HTML,
- keyboard-accessible buttons,
- visible focus states,
- labels for form inputs,
- adequate contrast,
- descriptive button text,
- alt text for meaningful images.

---

# 80. PERFORMANCE

For the university demo:

- avoid loading huge images,
- use image optimization,
- lazy-load suitable content,
- avoid unnecessary database requests,
- unsubscribe from realtime listeners when components unmount.

No enterprise-scale performance guarantee is required.

---

# 81. SECURITY REQUIREMENTS

Even though this is a demonstration:

- never expose database service-role secrets in client code,
- never commit secrets to Git,
- use `.env.local`,
- provide `.env.example`,
- enforce role authorization server/database side,
- validate uploads,
- validate API inputs,
- use private medical-record storage,
- prevent users from selecting privileged roles.

---

# 82. NO REAL HEALTH DATA POLICY

Place a warning inside Medical Records:

**“University demonstration environment. Upload only fictional/sample documents. Do not upload real confidential medical information.”**

The included seed medical records must be fabricated sample documents.

---

# 83. NO REAL EMERGENCY USE

Blood pages must include:

**“Academic demonstration only. This feature must not be relied upon for real medical emergencies.”**

---

# 84. FREE / DEMO TECHNOLOGY STACK

Recommended architecture:

## Frontend / Full Stack

**Next.js + TypeScript**

Use:

- App Router
- server components where useful
- client components only where interactivity requires them

## Styling

**Tailwind CSS**

## Component Library

**shadcn/ui**

or similar free component primitives.

## Icons

**Lucide Icons**

## Backend / Database / Auth

**Supabase**

Use:

- PostgreSQL
- Authentication
- Storage
- Realtime
- Row Level Security

## Maps

**Leaflet / React Leaflet**

with an appropriate OpenStreetMap tile layer and attribution.

## Hosting

**Vercel free/personal tier**

or equivalent free academic hosting.

No custom paid domain is required.

The generated Vercel URL is sufficient for the university demonstration.

---

# 85. SERVICES THAT MUST NOT BE REQUIRED

The application must remain functional without:

- Google Maps paid APIs
- Twilio
- WhatsApp Business API
- SMS gateways
- bKash merchant API
- Nagad merchant API
- Stripe
- SSLCommerz
- Firebase paid services
- paid email services
- paid cloud storage
- government NID API
- OpenAI API
- Anthropic API
- paid AI inference APIs.

The application itself does NOT need generative AI functionality.

---

# 86. DEMONSTRATION SEED DATA

Provide a database seed script.

Seed at least:

### Hospitals

3 fictional hospitals.

Example:

**Green Valley Demo Hospital — Dhanmondi**

**Metro Care Demo Hospital — Mirpur**

**North City Demo Hospital — Uttara**

---

### Doctors

At least:

8 fictional doctors.

Across several specialties.

---

### Sessions

At least:

10 upcoming doctor sessions.

Include both:

- queue-based sessions,
- time-slot sessions.

---

### Users

At least:

- 1 patient,
- 1 doctor,
- 1 hospital staff,
- 1 hospital admin,
- 1 platform admin.

---

### Appointments

Include:

- upcoming,
- completed,
- cancelled,
- active queue.

---

### Donors

At least:

10 fictional donor profiles.

Use several blood groups and Dhaka-area coordinates.

---

### Blood Requests

At least:

- one pending request,
- one active request,
- one fulfilled request.

---

### Ratings

At least:

10 sample reviews.

---

# 87. UNIVERSITY DEMO SCENARIO

The application must support the following live demonstration.

## Scenario 1 — Patient Books Doctor

Login as patient.

Search:

Cardiology.

Open doctor.

Select upcoming queue session.

Book appointment.

Simulate payment if applicable.

Receive serial.

Open patient dashboard.

---

## Scenario 2 — Hospital Starts Queue

Login as hospital staff in another browser/private window.

Open today's queue.

Click:

Start Session.

Patient browser updates.

---

## Scenario 3 — Queue Advances

Staff advances several patients.

Patient sees:

current number update automatically.

Estimated waiting time decreases.

Near-turn notification appears.

This is the main real-time demonstration.

---

## Scenario 4 — Medical Records

Patient uploads a fictional PDF.

Patient books doctor and grants access.

Login as doctor.

Doctor sees shared record.

Revoke access.

Doctor can no longer open it.

---

## Scenario 5 — Blood Request

Login as patient.

Create B+ blood request.

Platform Admin approves request.

Matching B+ donors receive notifications.

---

## Scenario 6 — Donor Response

Login as matching donor.

Open notification.

Select:

“I may be available to help.”

Choose to share contact information.

Requester sees donor response.

Requester marks request fulfilled.

Donor receives fulfilled notification.

---

# 88. ACCEPTANCE CRITERIA — AUTHENTICATION

Authentication is complete when:

1. Patient can register.
2. Patient can log in.
3. Demo accounts can log in.
4. Each account reaches correct dashboard.
5. Patient cannot access admin routes.
6. Doctor cannot access platform admin routes.
7. Unauthenticated users are redirected to login for protected pages.

---

# 89. ACCEPTANCE CRITERIA — HOSPITALS & DOCTORS

Complete when:

1. Hospital list loads from database.
2. Hospital detail shows doctors.
3. Doctor directory loads.
4. Specialty filtering works.
5. Doctor search works.
6. Doctor profile shows upcoming sessions.
7. Sessions can be booked.

---

# 90. ACCEPTANCE CRITERIA — BOOKING

Queue mode is complete when:

1. Patient books session.
2. Serial is automatically generated.
3. Duplicate serials cannot occur.
4. Maximum capacity is enforced.
5. Appointment appears in dashboard.

Slot mode is complete when:

1. Available slots are shown.
2. Patient selects slot.
3. Booked slot disappears/becomes unavailable.
4. Second patient cannot book same slot.

---

# 91. ACCEPTANCE CRITERIA — MOCK PAYMENT

Complete when:

1. Demo payment modal appears when configured.
2. User can simulate success.
3. Successful payment records `demo_paid`.
4. User can simulate failure.
5. No external payment API is called.
6. UI states clearly that the transaction is simulated.

---

# 92. ACCEPTANCE CRITERIA — LIVE QUEUE

Complete when:

1. Staff starts queue.
2. Patient UI updates without refresh.
3. Staff calls next patient.
4. Patient UI updates again.
5. Pause displays immediately.
6. Resume displays immediately.
7. Cancel displays immediately.
8. Waiting count is correct.
9. Estimated time updates.
10. Near-turn notification occurs once.

---

# 93. ACCEPTANCE CRITERIA — MEDICAL RECORDS

Complete when:

1. Patient uploads allowed sample file.
2. Other patients cannot access it.
3. Unrelated doctor cannot access it.
4. Authorized doctor can access it.
5. Patient can revoke access.
6. Revoked doctor loses access.
7. Oversized/invalid files are rejected.

---

# 94. ACCEPTANCE CRITERIA — DONOR SYSTEM

Complete when:

1. User can create donor profile.
2. User can toggle availability.
3. User can configure radius.
4. Exact-group matching works.
5. Distance filtering works.
6. Unavailable donor is excluded.
7. Donor receives notification for approved matching request.
8. Donor can respond.
9. Requester can see response.
10. Contact number appears only if donor chooses to share it.
11. Fulfilled request stops new matching.

---

# 95. ACCEPTANCE CRITERIA — MODERATION

Complete when:

1. User blood request begins pending.
2. Platform Admin sees pending request.
3. Admin can approve.
4. Approval activates matching.
5. Admin can reject.
6. Rejected request does not broadcast.

---

# 96. EDGE CASES TO IMPLEMENT

The coding agent must account for at least these conditions:

### Appointment

- session fully booked,
- patient books same session twice,
- session cancelled,
- doctor deactivated,
- slot already booked during checkout,
- patient cancels.

### Queue

- skipped patient,
- walk-in patient,
- cancelled patient,
- no-show patient,
- paused queue,
- session cancelled,
- no remaining patients.

### Records

- unauthorized user,
- expired authorization,
- revoked authorization,
- invalid file,
- file too large.

### Blood Request

- no matching donor,
- donor outside radius,
- donor unavailable,
- request expired,
- request rejected,
- request already fulfilled,
- donor already responded.

### Location

- location permission denied,
- browser does not support geolocation.

---

# 97. ROUTE STRUCTURE

Recommended routes:

### Public

`/`

`/hospitals`

`/hospitals/[id]`

`/doctors`

`/doctors/[id]`

`/blood-requests`

`/blood-requests/[id]`

`/about`

---

### Authentication

`/login`

`/register`

---

### Patient

`/dashboard`

`/appointments`

`/appointments/[id]`

`/appointments/[id]/queue`

`/medical-records`

`/donor-profile`

`/my-blood-requests`

`/blood-requests/new`

`/notifications`

`/settings`

---

### Doctor

`/doctor`

`/doctor/sessions`

`/doctor/appointments`

`/doctor/appointments/[id]`

---

### Hospital Staff

`/staff`

`/staff/sessions/[id]/queue`

---

### Hospital Admin

`/hospital-admin`

`/hospital-admin/doctors`

`/hospital-admin/sessions`

`/hospital-admin/appointments`

`/hospital-admin/staff`

`/hospital-admin/blood-requests`

---

### Platform Admin

`/admin`

`/admin/hospitals`

`/admin/users`

`/admin/blood-requests`

`/admin/reviews`

---

# 98. NAVIGATION

Public navbar:

- Home
- Hospitals
- Doctors
- Blood Requests
- About
- Login

Authenticated patient navbar:

- Home
- Find Doctor
- Hospitals
- Blood
- Notifications
- Dashboard

Privileged roles should see role-appropriate navigation.

---

# 99. DEVELOPMENT STRUCTURE

Keep code modular.

Suggested conceptual structure:

`app/`

`components/`

`features/`

`lib/`

`types/`

`hooks/`

`supabase/`

`public/`

Separate domain logic for:

- appointments,
- queues,
- hospitals,
- medical records,
- blood requests,
- notifications.

Avoid creating one giant component or one giant utility file.

---

# 100. DATABASE MIGRATIONS

Provide SQL migration files for:

- schema,
- enums,
- constraints,
- indexes,
- Row Level Security,
- storage policies,
- realtime configuration where needed.

Also provide:

`seed.sql`

or equivalent seed script.

---

# 101. INDEXING

Add useful indexes for:

- doctor specialty,
- hospital area,
- doctor sessions by date,
- appointments by patient,
- appointments by session,
- notifications by user/read status,
- donor blood group,
- blood request status,
- record shares by appointment.

---

# 102. ENVIRONMENT VARIABLES

Provide:

`.env.example`

Example variable categories:

Supabase URL

Supabase public key

Supabase server/service key if required for secure server-side demo administration

Demo mode flag

Never hard-code real secrets.

---

# 103. README

The completed repository must contain a detailed `README.md`.

README must explain:

1. project purpose,
2. technology stack,
3. prerequisites,
4. installation,
5. environment configuration,
6. database setup,
7. migrations,
8. seed data,
9. development server command,
10. build command,
11. deployment,
12. demo credentials,
13. key user flows,
14. known demo limitations.

A university examiner should be able to understand how the project runs by reading the README.

---

# 104. FREE DEPLOYMENT TARGET

Primary recommended deployment:

Frontend/full-stack application:

**Vercel**

Database/auth/realtime/storage:

**Supabase**

Use only free/project-appropriate usage.

A custom domain is not required.

Example deployment:

`lifelink-demo.vercel.app`

is sufficient.

---

# 105. IMPORTANT FREE-TIER FALLBACK

The implementation must not depend conceptually on a particular provider's paid features.

If any recommended free tier changes, the project architecture should remain conventional enough to migrate.

The university demonstration should remain small:

- limited seed data,
- limited images,
- small sample files,
- limited users,
- limited realtime traffic.

---

# 106. PROJECT PRESENTATION FEATURES

For demonstration quality, include:

## Landing page statistics

Example:

“8 Doctors”

“3 Demo Hospitals”

“24 Registered Donors”

“120 Demo Appointments”

Use database values where practical.

---

## Dashboard charts

Simple charts such as:

- appointments by status,
- appointments by specialty,
- blood requests by status.

Do not make analytics a large separate subsystem.

---

# 107. DEMO RESET

It would be useful to include a developer-only seed/reset procedure.

For example:

re-run database seed script.

Do NOT expose a public “Reset Database” button.

---

# 108. TESTING

At minimum, test the core logic.

Priority tests:

- authorization,
- booking conflict,
- serial assignment,
- queue advancement,
- queue waiting-count calculation,
- ETA calculation,
- medical-record authorization,
- blood-group matching,
- radius matching,
- donor-response duplication.

Use an appropriate modern JavaScript/TypeScript test framework.

---

# 109. MANUAL TEST CHECKLIST

Before the project is considered complete, test with separate browser sessions:

Patient browser

Doctor browser

Hospital Staff browser

Hospital Admin browser

Platform Admin browser

This is important for demonstrating role isolation and realtime updates.

---

# 110. DEFINITION OF DONE

The project is complete only when:

- application runs locally,
- database migrations run successfully,
- seed data works,
- all five roles can log in,
- role protection works,
- doctor search works,
- hospital search works,
- map works,
- queue booking works,
- time-slot booking works,
- mock payment works,
- live queue works,
- ETA changes dynamically,
- realtime notifications work,
- medical-record sharing works,
- blood-request moderation works,
- donor matching works,
- donor response works,
- admin dashboards work,
- mobile layout works,
- README exists,
- project can be deployed using free-tier services.

---

# 111. OUT OF SCOPE

Do NOT implement the following in this university version:

### Identity

- NID verification
- passport verification
- government APIs
- biometric identification

### Payments

- real bKash
- real Nagad
- real card processing
- refunds involving actual money

### Messaging

- real SMS
- WhatsApp Business API
- telephone automation

### Medical Integrations

- electronic hospital records
- diagnostic systems
- laboratory APIs
- prescription systems
- insurance systems
- ambulance dispatch

### Blood Donation

- automated medical eligibility determination
- blood compatibility recommendations
- blood inventory management
- clinical donor screening
- transfusion management

### Infrastructure

- enterprise monitoring
- enterprise backups
- multi-region deployment
- Kubernetes
- microservices
- native mobile applications

### Commercial Features

- subscriptions
- advertisements
- commission collection
- paid hospital onboarding
- billing system.

---

# 112. POSSIBLE FUTURE WORK

These may be mentioned in the university presentation but should NOT be required for the project.

Future possibilities:

- SMS notifications
- verified phone login
- verified doctor registration
- hospital self-registration
- real payment gateway
- government-approved identity verification
- verified blood-service integration
- native mobile application
- Bangla language support
- nationwide expansion
- telemedicine
- prescription integration
- advanced queue prediction
- machine-learning waiting-time forecasting
- verified hospital information systems.

---


# 112.1 CANONICAL IMPLEMENTATION DECISIONS — DO NOT INVENT ALTERNATIVES

Unless the user explicitly changes them, the following decisions are fixed for V2:

1. Product name is **LifeLink**.
2. `appointments` is also the queue-entry record for queue-mode sessions; do not invent a separate queue-entry table.
3. Canonical appointment states are defined in Section 16.
4. Live queue, patients-ahead, queue ETA, and near-turn alerts apply only to queue/serial sessions.
5. Time-slot sessions do not receive serials or live queue pages.
6. Start Session calls the first queue patient; subsequent progression uses **Complete & Call Next**.
7. Doctor profiles may be listing-only; only profiles linked to an authenticated `user_id` can use doctor routes.
8. Blood matching is exact-group only.
9. `blood_request_responses.response_status` is `interested` or `declined`.
10. Requester phone numbers are not public; donor phone numbers are shared only by explicit donor consent.
11. Record sharing is appointment-scoped and grants read-only access to all of that patient's demonstration records while the share is active.
12. Paid external services are not required.
13. Basic PWA metadata/installability is required for the final demo; advanced offline healthcare behavior is not.
14. When a detail is truly unspecified, choose the simplest maintainable solution compatible with the selected stack and document the decision in `AGENT(1) V2.md`.

---

# 113. AI CODING AGENT IMPLEMENTATION CONTRACT

The AI coding agent receiving this PRD must treat the following as mandatory.

**Phase gate:** before implementing this contract, read `AGENT(1) V2.md`. If the current phase is frontend-only design, follow the frontend-design phase and do not begin the functional build yet.

## Rule 1

Build a functional application rather than only static UI mockups.

Core workflows must use the database.

---

## Rule 2

Do not replace important functionality with placeholder buttons.

Example:

“Complete & Call Next” must actually complete the current patient and advance the queue.

“Book Appointment” must actually create an appointment.

“Approve Request” must actually activate a blood request.

---

## Rule 3

Do not add paid external services unless explicitly requested later.

---

## Rule 4

If a commercial integration is mentioned conceptually, implement its specified simulation instead.

Example:

Payment → Mock Payment.

SMS → In-app notification.

OTP → Email/password authentication.

Google Maps → Leaflet/OpenStreetMap.

---

## Rule 5

Use database security rules, not frontend hiding alone.

---

## Rule 6

Use fictional seed data.

Never populate the demo with real private patient information.

---

## Rule 7

Do not silently change the core business rules in this PRD.

---

## Rule 8

If an implementation decision is not explicitly specified, choose the simplest maintainable solution compatible with the selected stack.

Do not introduce unnecessary infrastructure.

---

## Rule 9

Keep code readable enough for a university student to explain during project defense.

Avoid unnecessary architectural complexity.

---

## Rule 10

Do not leave core functionality marked:

`TODO`

`Coming Soon`

`Not Implemented`

unless that feature is explicitly listed as out of scope.

---

# 114. FUNCTIONAL BUILD ORDER FOR THE CODING AI

Use this sequence **only after `AGENT(1) V2.md` moves the project into functionality implementation**. It does not override a frontend-only current phase.

### Stage 1 — Project Foundation

- Next.js/TypeScript project
- Tailwind
- component system
- Supabase configuration
- schema/migrations
- authentication
- role protection
- seed data

### Stage 2 — Discovery

- landing page
- hospitals
- doctors
- specialties
- search
- map

### Stage 3 — Booking

- doctor sessions
- queue booking
- time-slot booking
- appointment dashboard
- mock payment

### Stage 4 — Live Queue

- hospital staff queue screen
- queue state machine
- realtime updates
- waiting count
- ETA
- queue notifications
- walk-ins

### Stage 5 — Medical Records

- upload
- private storage
- sharing permission
- doctor access
- revocation

### Stage 6 — Blood Network

- donor profile
- blood request
- admin approval
- geographic matching
- notification
- donor response
- fulfillment

### Stage 7 — Administration

- hospital admin
- platform admin
- review moderation
- statistics

### Stage 8 — Polish

- responsive design
- accessibility
- loading states
- error states
- empty states
- PWA metadata

### Stage 9 — Quality Assurance

- automated tests
- manual multi-role testing
- README
- production build check
- free-tier deployment

---

# 115. FINAL PRODUCT EXPECTATION

The finished project should feel like a genuine startup prototype even though the integrations are simulated.

During a university demonstration, an examiner should be able to observe:

Patient books doctor\
→ appointment enters database\
→ hospital staff starts session\
→ patient's screen changes in real time\
→ queue advances\
→ ETA decreases\
→ notification appears

and:

User creates blood request\
→ administrator approves it\
→ nearby exact-group donor receives alert\
→ donor responds\
→ requester receives response\
→ request becomes fulfilled

Those complete interactive workflows are more important than having dozens of unfinished commercial integrations.

---

# END OF PRD

**LifeLink — University Demonstration MVP**
