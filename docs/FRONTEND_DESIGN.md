# LifeLink Frontend Design Specification

**Version:** 1.1  
**Instruction Set Revision:** V2 — synchronized with LifeLink PRD V2  
**Purpose:** Visual reference for the selected frontend direction and target screens
**Project Type:** University demonstration project  
**Target Platform:** Responsive Web Application / PWA  
**Primary Stack:** Next.js + React + TypeScript + Tailwind CSS + shadcn/ui + Lucide Icons  
**Target Market Context:** Bangladesh  
**Design Goal:** Produce a polished, modern, trustworthy healthcare SaaS interface that can later be connected to the LifeLink backend and Supabase architecture.

---

# 1. Instructions for the AI

Use this document as the visual and interaction reference for the LifeLink frontend.

## Authority Boundary and Current State

- `docs/DEVELOPMENT.md` controls the **current implementation status and handoff**.
- `docs/PRODUCT_REQUIREMENTS.md` controls **business logic, roles, state transitions, authorization, data behavior, and functional acceptance criteria**.
- This file controls **visual design, component appearance, layout, responsive behavior, and frontend interaction presentation**.
- The latest explicit user instruction overrides all project documents.

Do not invent business logic in this file when the PRD already defines it.

The selected direction is **Direction B — Modern Health SaaS**. The three directions are kept below as design history. The repository currently implements a fictional browser-local prototype and has no connected authentication or backend.

The screen specifications below are target UX guidance. They do not imply that every described backend behavior currently exists.

The generated frontend must be structured so that a development AI can later connect it to real backend functionality without redesigning the application.

Keep components modular and reusable.

Do not generate one giant page or one giant React component.

---

# 2. Product Summary

LifeLink is a healthcare web platform that combines:

1. Hospital discovery
2. Doctor discovery
3. Medical specialty search
4. Appointment booking
5. Time-slot booking
6. Queue/serial booking
7. Live doctor queue tracking
8. Estimated waiting time
9. Patient notifications
10. Demonstration medical-record management
11. Emergency blood requests
12. Nearby donor matching
13. Patient dashboard
14. Doctor dashboard
15. Hospital staff queue dashboard
16. Hospital admin dashboard
17. Platform admin dashboard

The two most important visual features are:

### Primary differentiator
**Live Queue + Estimated Waiting Time**

### Secondary differentiator
**Emergency Blood Request + Donor Network**

The visual hierarchy of the application should reflect this.

---

# 3. Design Philosophy

The design should feel:

- trustworthy,
- calm,
- modern,
- clean,
- professional,
- premium but restrained,
- highly readable,
- mobile-friendly,
- appropriate for healthcare,
- suitable for a university project presentation,
- visually polished enough to resemble a real startup prototype.

Avoid the appearance of:

- a generic hospital website,
- a generic AI-generated landing page,
- an enterprise ERP,
- an overly playful consumer app,
- a crypto/Web3 product.

---

# 4. Things to Avoid

Do not use:

- excessive gradients,
- heavy glassmorphism,
- excessive blur,
- oversized rounded cards everywhere,
- neon colors,
- random decorative illustrations,
- excessive animations,
- giant hero typography,
- unnecessary 3D graphics,
- excessive drop shadows,
- cluttered dashboards,
- unnecessary charts,
- too many different accent colors,
- flashing emergency elements,
- red as a general brand color,
- inconsistent spacing,
- inconsistent card styles.

Animations should be subtle and functional.

---

# 5. Brand Identity

## Product Name

**LifeLink**

## Optional Tagline

**Healthcare without the unnecessary wait.**

Alternative:

**Find care. Book smarter. Wait less.**

Use the product name consistently.

---

# 6. Color System

Use design tokens instead of hard-coded colors scattered throughout components.

## Primary Brand

```css
--primary: #087E8B;
--primary-dark: #075E66;
--primary-light: #E8F6F7;
```

Primary usage:

- main buttons,
- active navigation,
- links,
- important icons,
- queue progress,
- selected controls.

---

## Background

```css
--background: #F8FAFC;
--surface: #FFFFFF;
--surface-secondary: #F1F5F9;
```

---

## Text

```css
--text-primary: #0F172A;
--text-secondary: #64748B;
--text-muted: #94A3B8;
```

---

## Border

```css
--border: #E2E8F0;
--border-strong: #CBD5E1;
```

---

## Status Colors

### Success

```css
--success: #16A34A;
--success-bg: #F0FDF4;
```

Use for:

- completed appointment,
- payment success,
- donor response,
- queue running,
- successful confirmation.

### Warning

```css
--warning: #D97706;
--warning-bg: #FFFBEB;
```

Use for:

- queue paused,
- appointment pending,
- near-turn warnings,
- moderation pending.

### Error / Destructive

```css
--danger: #DC2626;
--danger-bg: #FEF2F2;
```

Use carefully for:

- blood requests,
- urgent status,
- cancellations,
- destructive actions,
- rejected items.

Red should **not** become the primary interface color.

---

# 7. Typography

Use:

**Inter**

Fallback:

```css
font-family: Inter, ui-sans-serif, system-ui, sans-serif;
```

Recommended hierarchy:

| Element | Desktop | Mobile |
|---|---:|---:|
| Hero title | 52px | 36px |
| Page title | 34px | 28px |
| Section title | 24px | 22px |
| Card title | 17px | 16px |
| Body | 15–16px | 15px |
| Metadata | 13–14px | 13px |
| Tiny label | 12px | 12px |

Use approximately:

- `font-semibold` for section headings,
- `font-medium` for card headings,
- `font-normal` for body content.

Do not overuse bold text.

---

# 8. Spacing System

Follow a consistent spacing system based on approximately:

```text
4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64 / 80
```

Typical usage:

- Card padding: 20–24px
- Form field spacing: 16px
- Section spacing: 64–96px desktop
- Section spacing: 48–64px mobile
- Dashboard grid gap: 16–24px

---

# 9. Radius System

Use moderate rounding.

```text
Small controls: 8px
Buttons: 9–10px
Inputs: 10px
Cards: 12px
Large containers: 14px
Modal: 14px
```

Avoid making every element pill-shaped.

Pills should mainly be used for:

- tags,
- specialties,
- statuses,
- small filters.

---

# 10. Shadow System

Use subtle shadows only.

Cards should primarily rely on:

- border,
- surface contrast,
- spacing.

Recommended:

```css
box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
```

Larger floating elements may use a slightly stronger shadow.

Avoid dramatic shadows.

---

# 11. Iconography

Use:

**Lucide Icons**

Maintain consistent icon sizing.

Typical:

- 16px inside small controls,
- 18–20px inside buttons,
- 20–24px in navigation,
- 24px feature icons.

Do not mix multiple icon libraries.

---

# 12. Core Layout System

Desktop maximum content width:

```text
1200–1280px
```

Use centered containers.

Dashboard interfaces may use full-width layouts with sidebars.

---

# 13. Responsive Breakpoints

Design explicitly for:

### Mobile
320–767px

### Tablet
768–1023px

### Desktop
1024px+

Mobile must not simply be a compressed desktop design.

---

# 14. Navigation — Public Website

Desktop navbar:

```text
[LifeLink]

Home
Find Doctors
Hospitals
Blood Requests
About

                      Login
                      Get Started
```

Behavior:

- sticky or semi-sticky,
- subtle bottom border,
- white or lightly translucent surface,
- no dramatic floating navigation.

Primary CTA:

**Get Started**

---

# 15. Navigation — Authenticated Patient

Desktop:

```text
[LifeLink]

Home
Find Doctors
Hospitals
Blood

                    Notifications
                    Dashboard
                    Avatar
```

Notification icon displays unread badge.

---

# 16. Mobile Navigation

For authenticated patient users, use bottom navigation:

```text
Home
Doctors
Appointments
Blood
Profile
```

Icons + short labels.

Keep notification access through the header.

---

# 17. Dashboard Navigation

For:

- Doctor
- Hospital Staff
- Hospital Admin
- Platform Admin

Use a left sidebar on desktop.

On mobile/tablet:

- collapsible drawer,
- compact top bar.

Sidebar should be functional and restrained.

---

# 18. Reusable Components

Create reusable components for:

- `Navbar`
- `MobileBottomNav`
- `DashboardSidebar`
- `PageHeader`
- `SearchBar`
- `FilterBar`
- `FilterDrawer`
- `DoctorCard`
- `HospitalCard`
- `SpecialtyChip`
- `AppointmentCard`
- `QueueStatusCard`
- `QueueProgress`
- `QueueStatusBadge`
- `BloodRequestCard`
- `BloodGroupBadge`
- `NotificationBell`
- `NotificationItem`
- `StatCard`
- `DataTable`
- `EmptyState`
- `ErrorState`
- `LoadingSkeleton`
- `ConfirmationDialog`
- `PaymentSimulationModal`
- `MedicalRecordCard`
- `FileUploadZone`
- `RatingStars`
- `MapPanel`
- `StatusBadge`
- `SectionHeader`
- `MobileSheet`

All screens should use these shared components where practical.

---

# 19. Button System

## Primary

Teal filled.

Example:

**Book Appointment**

## Secondary

White or subtle surface with border.

Example:

**View Profile**

## Ghost

Minimal.

Example:

**Cancel**

## Destructive

Red.

Example:

**Cancel Session**

## Sizes

- small,
- medium,
- large.

Do not use more button variants than necessary.

---

# 20. Input System

Inputs should be:

- clear,
- moderately rounded,
- 44px+ height for touch,
- visible focus state,
- label above field,
- optional helper/error text.

Include:

- text inputs,
- search,
- select,
- date selector,
- radio group,
- checkbox,
- textarea,
- file upload.

---

# 21. Status Badge System

Create consistent badges.

Examples:

### Appointment

Canonical human-facing labels corresponding to PRD states:

- Confirmed
- Waiting
- Serving
- Completed
- Skipped
- Cancelled by Patient
- Cancelled by Hospital
- No Show

Do not invent `Checked In` or `In Progress` states for V2.

### Queue

- Scheduled
- Running
- Paused
- Completed
- Cancelled

### Blood

- Pending Approval
- Active
- Donors Responded
- Fulfilled
- Expired
- Rejected

Use color meaning consistently.

---

# 22. Homepage

Route:

```text
/
```

The homepage must communicate the product value immediately.

---

# 23. Homepage — Hero

Desktop:

Two-column layout.

### Left

Eyebrow:

**Smarter healthcare access**

Headline:

**Healthcare without the unnecessary wait.**

Supporting text:

**Find doctors, book appointments, follow live queues and connect with nearby blood donors — all from one platform.**

Primary button:

**Find a Doctor**

Secondary button:

**Explore Hospitals**

Small trust/support line:

**University demonstration project • Fictional data**

---

## Hero Right — Product Preview

Do not use a generic stock image as the main hero visual.

Create a polished UI preview showing the live queue.

Example:

```text
LIVE QUEUE

Dr. Sarah Rahman
Cardiology

Now Serving
#18

Your Serial
#25

6 patients ahead

Estimated wait
~48 min

Estimated turn
6:20 PM

Queue running normally
```

Use the hero preview to visually explain LifeLink's key feature.

---

# 24. Homepage — Search Section

Large search module directly below or overlapping the hero.

Search placeholder:

**Search doctors, specialties or hospitals**

Filters:

- Location
- Specialty
- Available Date

Button:

**Search**

Mobile:

filters should become a compact filter sheet/drawer.

---

# 25. Homepage — Specialty Shortcuts

Show approximately 6–8 specialties.

Examples:

- Cardiology
- Medicine
- Pediatrics
- Dermatology
- Orthopedics
- Gynecology
- ENT
- Neurology

Use compact icon/card/chip design.

Do not make these visually overpower the page.

---

# 26. Homepage — Nearby Hospitals

Section title:

**Hospitals near you**

Show 3–4 hospital cards.

Each card:

- image,
- hospital name,
- area,
- distance,
- specialties,
- doctor count,
- view button.

Include:

**View all hospitals**

---

# 27. Homepage — Live Queue Explanation

This is one of the most important homepage sections.

Title:

**Know when it's actually your turn**

Show a four-step process:

```text
1. Find Doctor
2. Book Appointment
3. Follow Live Queue
4. Arrive Near Your Turn
```

Include a small queue visualization.

This section should clearly communicate the project's innovation.

---

# 28. Homepage — Blood Network

Give this section a separate but controlled visual identity.

Use a subtle warm/red-tinted background or border.

Headline:

**Need blood urgently?**

Supporting copy:

**Create a request and notify nearby registered donors with the matching blood group.**

Buttons:

**Request Blood**

**Become a Donor**

Include academic disclaimer in small text.

Do not use flashing red graphics.

---

# 29. Homepage — Trust / Product Features

Optional compact section with 3 features:

### Live Queue
Track your position without repeatedly refreshing.

### Easy Booking
Choose a queue serial or available time slot.

### Blood Network
Connect nearby matching donors with urgent requests.

---

# 30. Homepage — Footer

Columns:

### LifeLink
Short description.

### Explore
- Doctors
- Hospitals
- Blood Requests

### Project
- About
- Academic Disclaimer

### Demo Notice

Display clearly:

**LifeLink is an academic demonstration project. Data shown in this system is fictional and the platform must not be used for actual medical emergencies or clinical decision-making.**

---

# 31. Doctor Directory

Route:

```text
/doctors
```

Header:

**Find the right doctor**

Supporting text:

**Search by specialty, hospital, location or availability.**

---

# 32. Doctor Directory — Filters

Desktop:

left sidebar or horizontal filter bar.

Filters:

- Search
- Specialty
- Hospital
- Area
- Available Date
- Booking Type

Mobile:

use:

**Filters**

button opening bottom sheet/drawer.

---

# 33. Doctor Card

Desktop/card concept:

```text
[Photo]

Dr. Sarah Rahman                  ★ 4.8

Cardiologist

Green Valley Demo Hospital
Dhanmondi

Next available
Today • 5:00 PM

Queue booking
৳800

[View Profile]      [Book]
```

Include:

- optional **Demo Doctor** badge if useful; never label a doctor as medically or institutionally **Verified** in this university prototype,
- rating,
- hospital,
- location,
- next availability,
- fee,
- booking type.

Keep cards easy to scan.

---

# 34. Doctor Profile

Route:

```text
/doctors/[id]
```

Desktop:

two-column layout.

Left:

doctor information.

Right:

sticky booking card.

---

# 35. Doctor Profile Header

Show:

- large doctor photo,
- name,
- specialty,
- qualifications,
- rating,
- hospital,
- area,
- short biography.

Example:

```text
Dr. Sarah Rahman
Cardiology

MBBS, FCPS (Cardiology)

★ 4.8 • 124 reviews

Green Valley Demo Hospital
Dhanmondi
```

---

# 36. Doctor Profile Tabs

Use tabs:

- Overview
- Schedule
- Reviews

Do not overcomplicate.

---

# 37. Doctor Booking Card

Desktop sticky card.

Show:

### Select Date

Horizontal day selector:

```text
Mon 11
Tue 12
Wed 13
Thu 14
```

### Available Session

Example:

```text
5:00 PM – 8:00 PM

Queue booking

Estimated consultation
8 minutes

Consultation fee
৳800
```

CTA:

**Book Appointment**

---

# 38. Hospital Directory

Route:

```text
/hospitals
```

Page header:

**Find hospitals**

Search/filter:

- hospital name,
- area,
- specialty.

Desktop may display:

- list/cards,
- optional map panel.

Mobile should prioritize cards.

---

# 39. Hospital Card

Show:

- image,
- hospital name,
- area,
- approximate distance,
- specialties,
- doctor count.

CTA:

**View Hospital**

---

# 40. Hospital Detail

Route:

```text
/hospitals/[id]
```

Header:

- cover image,
- hospital name,
- address,
- contact,
- small map.

Then:

### Available Doctors

Show doctor cards.

### Upcoming Sessions

Optional concise schedule view.

---

# 41. Appointment Booking Flow

Keep booking as a focused multi-step flow.

Suggested steps:

```text
Doctor
→ Session
→ Booking Details
→ Demo Payment
→ Confirmation
```

Use progress indicator on desktop.

On mobile:

simple numbered steps.

---


# 41.1 Queue-Mode vs Time-Slot Visual Rule

The frontend must visually preserve the PRD's booking-mode distinction.

### Queue / Serial Appointment

May show:

- serial number,
- Track Live Queue,
- Now Serving,
- patients ahead,
- estimated wait,
- estimated turn,
- near-turn alert.

### Time-Slot Appointment

Show:

- scheduled appointment time,
- doctor/hospital/date,
- confirmation/payment status.

Do **not** show:

- serial number,
- Track Live Queue,
- Now Serving,
- patients ahead,
- queue ETA,
- near-turn queue alert.

Do not invent a hybrid mode.

---

# 42. Booking Confirmation

After successful booking show a clear success card. The example below is specifically for a **queue-mode** appointment.

Example:

```text
Appointment confirmed

Dr. Sarah Rahman
Green Valley Demo Hospital

Today
5:00 PM

Your Serial
#25

[Track Live Queue]

[View Appointment]
```

Use restrained success animation if desired.

---

# 43. Mock Payment Modal

Title:

**Demo Payment**

Display:

```text
Consultation Fee
৳800
```

Options:

- bKash Demo
- Nagad Demo
- Card Demo

Buttons:

**Simulate Successful Payment**

**Simulate Failed Payment**

Visible disclaimer:

**Simulation only — no real transaction will occur.**

Do not try to visually clone the actual payment providers too closely.

---

# 44. Patient Dashboard

Route:

```text
/dashboard
```

Header:

```text
Good morning, Rahim
Here's what's happening with your healthcare activity.
```

Top grid:

- Upcoming Appointment
- Current Queue
- Active Blood Requests
- Unread Notifications

---

# 45. Dashboard Main Appointment Card

This should receive high visual priority for a **queue-mode** upcoming appointment. For time-slot appointments, replace queue metrics with the scheduled appointment time.

Example:

```text
Upcoming Appointment

Dr. Sarah Rahman
Cardiology

Today • 5:00 PM
Serial #25

NOW SERVING #18

Estimated wait
~48 min

[Track Live Queue]
```

---

# 46. Dashboard Secondary Sections

Show:

### Upcoming Appointments

### Recent Medical Records

### Blood Activity

### Recent Notifications

Use clear section hierarchy.

Do not overcrowd the dashboard.

---

# 47. Live Queue Screen

Route:

```text
/appointments/[id]/queue
```

This is the **visual centerpiece of the application**.

It must look exceptional.

---

# 48. Live Queue — Main Layout

Desktop:

Centered primary card plus secondary information.

Mobile:

main queue information should fit above the fold where possible.

Header:

```text
LIVE
Dr. Sarah Rahman
Cardiology
Green Valley Demo Hospital
```

---

# 49. Live Queue — Core Numbers

Use large typography.

Example:

```text
NOW SERVING

#18


YOUR SERIAL

#25
```

Do not make both numbers visually identical.

“Now Serving” should be the primary queue state.

“Your Serial” should be clearly visible but secondary.

---

# 50. Live Queue — Supporting Metrics

Show three compact metrics:

```text
Patients Ahead
6

Estimated Wait
~48 min

Estimated Turn
6:20 PM
```

---

# 51. Queue Progress Visualization

Create a subtle progress visualization.

Example concept:

```text
18    19    20    21    ...    25
●─────●─────●─────●────────────◎
Now                              You
```

Use this as visual support.

Do not imply exact linear time progression.

---

# 52. Queue Status

Status panel:

### Running normally

Small status dot.

Last updated:

**10 seconds ago**

Possible states:

- Scheduled
- Running
- Paused
- Completed
- Cancelled

Paused status should use amber.

Cancelled should use red.

---

# 53. Near-Turn Setting

Card:

```text
Queue Alert

Notify me when:

[ 3 ] patients remain
```

Allow simple selector.

Show:

**You will receive an in-app notification.**

---

# 54. Live Queue Mobile Design

Priority order:

1. Doctor name
2. Now serving
3. Your serial
4. Patients ahead
5. ETA
6. Queue status
7. Alert control

Avoid large unnecessary navigation on this screen.

---

# 55. Notifications

Use notification bell.

Panel/drawer:

### Today

Appointment confirmed

Queue started

Your turn is approaching

### Earlier

Blood request approved

Use unread indicators.

Notification cards should be compact.

---

# 56. Blood Requests Directory

Route:

```text
/blood-requests
```

Header:

**Blood requests**

Supporting text:

**Academic demonstration of connecting nearby registered donors.**

Primary CTA:

**Create Blood Request**

---

# 57. Blood Request Card

Example:

```text
URGENT BLOOD REQUEST

B+

Green Valley Demo Hospital
Dhanmondi

Needed by
Today • 8:00 PM

2 units requested

Approx. 4.2 km away

[View Request]
```

Use a restrained red accent:

- blood group badge,
- thin border,
- small urgency label.

Avoid huge red backgrounds.

---

# 58. Blood Request Detail

Show:

- blood group prominently,
- destination,
- distance,
- requested units,
- needed-by time,
- short message,
- academic disclaimer.

Donor action:

**I may be available to help**

Secondary:

**Not available**

Before positive response show:

**Final donor eligibility must be determined by an appropriate healthcare or blood-service professional.**

When choosing the positive response, also show an optional checkbox:

**Share my contact number with the requester**

Default: unchecked.

Do not display requester phone numbers or donor phone numbers on public blood-request pages.

If **Not available** is selected in the functional phase, the donor should not be alerted again for that same request.

---

# 59. Donor Registration

Route:

```text
/donor-profile
```

Use a friendly form.

Sections:

### Blood Information

- Blood group
- Last donation date optional

### Location

- Area
- Use current location
- Alert radius

### Availability

Toggle:

**Available for blood requests**

### Contact

Phone number

---

# 60. Medical Records Page

Route:

```text
/medical-records
```

Header:

**Medical Records**

Disclaimer:

**Demo environment — upload only fictional/sample documents.**

Primary CTA:

**Upload Record**

---

# 61. Medical Record Card

Show:

- file icon/thumbnail,
- title,
- type,
- record date,
- uploaded date.

Actions:

- View
- Delete

If shared:

show small badge:

**Shared with Dr. Sarah Rahman**

---

# 62. File Upload UI

Use drag-and-drop area.

Supported:

- PDF
- JPG
- JPEG
- PNG

Show:

**Maximum 5 MB**

Include upload progress visual.

---

# 63. Doctor Dashboard

Route:

```text
/doctor
```

Sidebar:

- Overview
- Sessions
- Appointments

Dashboard top:

- Today's Patients
- Upcoming Sessions
- Current Queue

Main section:

### Today's Appointments

Table/cards.

Doctor should not see unrelated hospital management features.

---

# 64. Doctor Patient Detail

Route:

```text
/doctor/appointments/[id]
```

Show:

- patient display name,
- appointment details,
- queue status.

Medical records area:

If access granted:

show records.

If not:

```text
Patient has not shared medical records for this appointment.
```

---

# 65. Hospital Staff Dashboard

Route:

```text
/staff
```

This is an operational interface.

Desktop sidebar:

- Overview
- Today's Sessions
- Appointments
- Queue Management
- Walk-ins

---

# 66. Hospital Staff Queue Dashboard

This is another major presentation screen.

Example:

```text
Dr. Sarah Rahman
Cardiology

Session
5:00 PM – 8:00 PM

Current        Waiting        Completed
#18            12             17

CURRENT PATIENT

#18
Ahmed Hasan

[Complete & Call Next]

[Skip & Call Next]
[Pause Queue]
[Complete Session]
[Add Walk-In]
```

Make:

**Complete & Call Next**

the primary action.

Canonical queue-action labels must match the PRD:

- Start Session
- Complete & Call Next
- Skip & Call Next
- Recall Skipped
- Pause
- Resume
- Complete Session
- Cancel Session
- Add Walk-In

Do not introduce alternative labels such as separate “Call Next” and “Complete Current” controls.

Avoid accidental destructive controls.

---

# 67. Queue List

Below queue controls show:

```text
#18  Ahmed Hasan       Serving
#19  Nusrat Jahan      Waiting
#20  Farhan Rahman     Waiting
#21  Samira Ahmed      Waiting
#22  Walk-In Patient   Waiting
```

Use status badges.

---

# 68. Hospital Admin Dashboard

Route:

```text
/hospital-admin
```

Sidebar:

- Overview
- Hospital Profile
- Doctors
- Sessions
- Appointments
- Queue Management
- Staff
- Blood Requests

Use standard SaaS dashboard patterns.

Do not spend excessive visual complexity here.

---

# 69. Platform Admin Dashboard

Route:

```text
/admin
```

Sidebar:

- Overview
- Hospitals
- Users
- Blood Requests
- Reviews

Top stats:

- Users
- Hospitals
- Doctors
- Appointments
- Donors
- Active Blood Requests

---

# 70. Admin Blood Moderation

Table columns:

- Requester
- Blood Group
- Destination
- Needed By
- Created
- Status
- Actions

Actions:

**Approve**

**Reject**

Use confirmation dialog.

---

# 71. Analytics Charts

Only use simple charts.

Possible:

- Appointments by status
- Appointments by specialty
- Blood requests by status

Do not turn the dashboard into an analytics product.

Charts should match the design system.

---

# 72. Map Design

Use Leaflet-compatible visual structure.

Map markers should be clean.

Hospital map popup:

```text
Green Valley Demo Hospital

Dhanmondi

12 doctors

[View Hospital]
```

Map UI should visually integrate with the rest of the design.

---

# 73. Empty States

Create polished empty states.

Examples:

## No Appointments

**No upcoming appointments**

Your next booking will appear here.

**Find a Doctor**

---

## No Medical Records

**No records yet**

Upload a fictional sample medical record for the demo.

**Upload Record**

---

## No Blood Matches

**No matching requests nearby**

We'll show matching requests here when they become available.

---

# 74. Error States

Examples:

## Booking Error

**This appointment is no longer available.**

Someone may have booked the slot moments before you.

**Choose Another Time**

---

## Location Error

**We couldn't access your location.**

Choose your area manually instead.

**Select Area**

---

# 75. Loading States

Use skeletons rather than blank pages.

Create:

- doctor card skeleton,
- hospital card skeleton,
- appointment skeleton,
- dashboard skeleton,
- table skeleton.

---

# 76. Confirmation Dialogs

Use dialogs for:

- appointment cancellation,
- queue cancellation,
- blood request fulfillment,
- record deletion,
- review rejection/hiding.

Destructive button should never be the visually default action.

---

# 77. Responsive Rules

Desktop:

- full navigation,
- multi-column grids,
- sidebars,
- sticky booking panel.

Tablet:

- reduced columns,
- sidebar collapses where appropriate.

Mobile:

- single column,
- bottom patient navigation,
- filter drawer,
- full-width primary actions,
- no cramped tables.

Tables may transform into cards on mobile.

---


# 77.1 Basic PWA Presentation Requirement

The final frontend implementation must include basic PWA presentation assets:

- web app manifest,
- LifeLink app name,
- app icon,
- theme color aligned with the approved design system.

Advanced offline healthcare behavior is not required and must not be implied.

---

# 78. Accessibility

Frontend must include:

- semantic HTML,
- form labels,
- alt text,
- keyboard navigation,
- visible focus states,
- meaningful button labels,
- color contrast,
- status meaning not communicated by color alone.

Avoid:

```text
Click here
```

Prefer:

```text
View Appointment
```

---

# 79. Microinteractions

Use subtle interactions.

Examples:

- button press feedback,
- dropdown transitions,
- card hover on desktop,
- unread notification animation,
- queue status pulse when live,
- progress updates.

Do not use excessive motion.

Respect reduced-motion preferences when practical.

---

# 80. Live Queue Motion

The word:

**LIVE**

may include a small pulsing status dot.

Do not animate:

- serial numbers constantly,
- the entire queue card,
- backgrounds.

When queue changes:

use a subtle number transition.

---

# 81. Blood Urgency Visual Rule

Urgent blood requests should be noticeable without creating panic.

Use:

- red status badge,
- thin red border,
- small blood-drop icon,
- strong blood-group label.

Do not use:

- flashing elements,
- full-page red,
- emergency siren animations.

---

# 82. Demo Disclaimer Components

Create reusable:

`DemoDisclaimer`

Variants:

### Small

For cards/forms.

### Full

For About / Medical Records / Blood pages.

Text:

**LifeLink is an academic demonstration project using fictional data. It must not be used for real medical emergencies or clinical decision-making.**

---

# 83. Mock Data Requirements

Use realistic fictional data.

Never use real confidential patient information.

Recommended demo hospitals:

- Green Valley Demo Hospital — Dhanmondi
- Metro Care Demo Hospital — Mirpur
- North City Demo Hospital — Uttara

Recommended doctors:

- Dr. Sarah Rahman — Cardiology
- Dr. Farhan Ahmed — Internal Medicine
- Dr. Nusrat Jahan — Pediatrics
- Dr. Mahin Chowdhury — Orthopedics
- Dr. Samira Islam — Dermatology
- Dr. Arif Hossain — ENT
- Dr. Tanvir Hasan — Neurology
- Dr. Sadia Karim — Gynecology

---

# 84. Mock Queue Data

Example:

```ts
{
  doctor: "Dr. Sarah Rahman",
  specialty: "Cardiology",
  hospital: "Green Valley Demo Hospital",
  currentSerial: 18,
  patientSerial: 25,
  patientsAhead: 6,
  estimatedWaitMinutes: 48,
  estimatedTurn: "6:20 PM",
  status: "running"
}
```

---

# 85. Mock Appointment Data

Use different states:

- confirmed,
- waiting,
- completed,
- cancelled.

Include:

- queue appointment,
- time-slot appointment.

---

# 86. Mock Blood Request Data

Include:

- pending approval,
- active,
- fulfilled.

Blood groups:

- B+
- A+
- O-
- AB+

Use fictional destinations.

---

# 87. Component Organization

Suggested conceptual frontend structure:

```text
components/
  layout/
  navigation/
  doctors/
  hospitals/
  appointments/
  queue/
  blood/
  medical-records/
  notifications/
  dashboard/
  admin/
  common/
```

Avoid domain mixing.

---

# 88. Page Organization

Suggested routes/pages:

```text
/
 /doctors
 /doctors/[id]
 /hospitals
 /hospitals/[id]
 /blood-requests
 /blood-requests/[id]
 /blood-requests/new
 /login
 /register

 /dashboard
 /appointments
 /appointments/[id]
 /appointments/[id]/queue
 /medical-records
 /donor-profile
 /my-blood-requests
 /notifications
 /settings

 /doctor
 /doctor/sessions
 /doctor/appointments
 /doctor/appointments/[id]

 /staff
 /staff/sessions/[id]/queue

 /hospital-admin
 /hospital-admin/doctors
 /hospital-admin/sessions
 /hospital-admin/appointments
 /hospital-admin/staff
 /hospital-admin/blood-requests

 /admin
 /admin/hospitals
 /admin/users
 /admin/blood-requests
 /admin/reviews

 /about
```

---

# 89. Design Token Requirement

Create global tokens for:

- colors,
- typography,
- spacing,
- radius,
- shadows,
- border colors,
- status colors.

Do not redefine visual values separately on each page.

---

# 90. Component Reuse Requirement

The same:

- DoctorCard
- HospitalCard
- StatusBadge
- Button
- Input
- EmptyState

must look consistent wherever they appear.

Do not create slightly different copies unless a variant is justified.

---

# 91. Desktop Presentation Priority

The most impressive desktop screens should be:

1. Homepage
2. Doctor directory
3. Doctor profile
4. Patient dashboard
5. Live queue
6. Hospital staff queue dashboard
7. Blood request detail

Spend the most visual polish on these.

---

# 92. Mobile Presentation Priority

The most important mobile screens:

1. Home
2. Find Doctor
3. Appointment booking
4. Live Queue
5. Patient Dashboard
6. Blood Request
7. Notifications

---

# 93. Design Generation Order

Do not generate the entire frontend in a single uncontrolled pass.

Follow this order.

---

## Phase 1 — Design System

Generate:

- typography,
- colors,
- buttons,
- inputs,
- cards,
- badges,
- navigation,
- spacing,
- shadows,
- basic components.

---

## Phase 2 — Public Experience

Generate:

- homepage,
- doctor directory,
- doctor profile,
- hospital directory,
- hospital profile.

---

## Phase 3 — Appointment Experience

Generate:

- booking flow,
- demo payment modal,
- booking confirmation,
- appointment card.

---

## Phase 4 — Patient Experience

Generate:

- patient dashboard,
- appointment detail,
- live queue,
- medical records,
- notifications.

---

## Phase 5 — Blood Network

Generate:

- blood directory,
- blood request detail,
- donor registration,
- create blood request.

---

## Phase 6 — Operational Dashboards

Generate:

- doctor dashboard,
- staff dashboard,
- queue management,
- hospital admin,
- platform admin.

---

## Phase 7 — Responsive Polish

Review all screens at:

- 375px,
- 768px,
- 1280px+.

Fix:

- overflow,
- cramped text,
- oversized sections,
- broken grids,
- inaccessible controls.

---

# 94. AI Design Instructions

When generating screens:

1. Follow this specification exactly.
2. Prefer reusable components.
3. Keep the design visually consistent.
4. Do not introduce new brand colors without reason.
5. Do not redesign previously approved components.
6. Use realistic fictional data.
7. Maintain mobile responsiveness.
8. Maintain accessibility.
9. Do not implement backend logic yet.
10. Simulate interactions locally where necessary.

---

# 95. First AI Task

The first generation should NOT create every page.

**Selection recorded:** the user selected Direction B — Modern Health SaaS. The three directions below are retained as design history; future UI work should follow Direction B tokens unless the user changes the selection.

Create **three clearly different but brand-compatible visual directions for the homepage and core design system**.

Each direction must include:

- navbar,
- hero,
- queue preview,
- search,
- specialty shortcuts,
- nearby hospitals,
- live queue explanation,
- blood network section,
- footer.

Each direction must follow the same product requirements but vary in:

- visual density,
- card style,
- layout rhythm,
- hero composition,
- navigation treatment,
- section composition.

Do not mix the three directions.

Label them:

### Direction A — Clinical Minimal
Clean, restrained, information-first.

### Direction B — Modern Health SaaS
Polished, startup-style, balanced visual richness.

### Direction C — Compact Digital Health
More data-dense, efficient, app-oriented.

After generating the three directions, provide a short comparison of:

- readability,
- visual appeal,
- healthcare trust,
- suitability for mobile,
- suitability for university presentation.

Do not continue to the other application screens until one direction is selected.

---

# 96. Recommended Direction

Unless another direction is clearly stronger after visual comparison, prefer:

**Direction B — Modern Health SaaS**

It should balance:

- academic presentation impact,
- professionalism,
- modern appearance,
- readability,
- ease of implementation.

---

# 97. After Design Selection

Once the user selects a direction:

1. Lock the design language.
2. Extract reusable design tokens.
3. Create reusable components.
4. Do not change the visual identity without explicit instruction.
5. Generate remaining screens in the phases defined above.

---


# 97.1 Frontend No-Hallucination Guardrails

Unless the user explicitly changes the requirement:

1. Use **LifeLink** everywhere.
2. Use **LifeLink** consistently across every screen, label, demo artifact, and generated asset.
3. Do not label demo doctors as verified.
4. Queue metrics are shown only for queue/serial appointments.
5. Time-slot appointments never show serial/live-queue UI.
6. Use the exact queue-action wording defined in the PRD.
7. Do not expose requester/donor phone numbers publicly.
8. Blood matching language must say **matching blood group** or **exact requested blood group**; do not present compatibility advice.
9. Use fictional people, hospitals, records, reviews, and coordinates.
10. Do not invent backend behaviors during the frontend-only phase.
11. Do not redesign approved components after the user selects a visual direction.
12. When a visual detail is unspecified, choose the simplest option consistent with the approved design tokens and record significant decisions in `docs/DEVELOPMENT.md`.

---

# 98. Quality Checklist

Before considering the frontend design complete, confirm:

- [ ] Homepage clearly communicates LifeLink
- [ ] Live Queue is visually prominent
- [ ] Blood system has distinct but controlled visual treatment
- [ ] Doctor search feels easy
- [ ] Doctor profile has clear booking CTA
- [ ] Patient dashboard is not cluttered
- [ ] Live queue works visually on mobile
- [ ] Staff queue controls are easy to understand
- [ ] Admin pages use consistent components
- [ ] Responsive navigation works
- [ ] Mobile filters are usable
- [ ] Typography is consistent
- [ ] Status colors are consistent
- [ ] Buttons are consistent
- [ ] Cards are consistent
- [ ] Loading states exist
- [ ] Empty states exist
- [ ] Error states exist
- [ ] Accessibility basics are included
- [ ] Fictional data is clearly used
- [ ] Demo disclaimer is present
- [ ] No paid or production integration is required
- [ ] Frontend can later be connected to backend logic without redesign

---

# 99. Final Frontend Goal

The completed frontend should look like a believable healthcare startup prototype rather than a classroom mockup.

During a university presentation, the interface should make it immediately understandable that LifeLink solves two key problems:

```text
Find doctor
→ Book appointment
→ Track queue
→ Arrive near your turn
```

and:

```text
Create blood request
→ Notify matching nearby donors
→ Donor responds
→ Request is fulfilled
```

The strongest visual emphasis should remain on:

**Live Queue + Waiting-Time Estimation**

because this is the clearest product differentiator.

---

# END OF FRONTEND DESIGN SPECIFICATION

**LifeLink — Frontend Design Specification v1.0**
