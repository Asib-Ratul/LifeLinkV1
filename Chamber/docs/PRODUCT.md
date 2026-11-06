# Product scope

## The problem

Patients often have to remain physically present because they do not know how far their turn is away. Chamber gives them a private queue page and gives clinic staff a shared, simple workflow.

## First release

A clinic owner registers the clinic and doctor, opens the queue, and creates staff accounts. Reception adds walk-ins or checks in online patients. The doctor calls the first checked-in patient, then explicitly finishes the consultation. Patients who have not arrived are not called. Reception can mark a patient absent or restore them to their original serial position.

The public patient page displays only the user's serial, consultation status, number ahead, estimated wait and clinic notice. It never displays other patient names. Possession of the unguessable link grants access to that visit; treat it as a private credential.

The daily limit includes completed visits and excludes cancelled places. Cancelled serials are not reused. The clinic timezone controls the queue's date. Closing a queue prevents joining and calling next; the current consultation can still be finished. Pausing suspends estimates and joining until reopened.

Estimates are advisory ranges. Initially they use the clinic's configured consultation duration. Once at least three consultations are completed, the median of the latest ten durations is used. Clinical urgency is managed by clinic staff outside this first version. This application does not provide triage or medical advice.

## Design

Plain labels, muted forest green actions, warm neutral backgrounds, visible table structure, and a short path to the next action. No gradients, conversational AI, ornamental dashboards or unnecessary charts. Patient pages work without an account or app download.

## Before a real clinic pilot

- Validate accessibility and workflows with reception staff and patients on real phones.
- Establish retention and deletion policies; add automated deletion and an audit trail.
- Add owner verification, password recovery and secure staff onboarding.
- Confirm estimated arrival behavior with clinic staff; handle emergencies explicitly.
- Configure HTTPS, backups, monitoring and incident response.
- Replace in-process IP throttling with deployment-aware limits; validate trusted proxy configuration.
- Add durable consented messaging, delivery tracking and retries if arrival alerts are offered.
- Decide how account and clinic deletion will work.
- Complete independent security review before handling real patient information.

## Commercial expansion

Multiple doctor sessions, scheduled visit windows, subscription billing, usage limits and clinic billing history can be added after the single-queue workflow is proven. They are not represented by fake payment buttons in this release.

Measure minutes spent waiting physically at the clinic, missed turns, receptionist effort and estimate accuracy. Compare actual outcomes before and after a pilot.
