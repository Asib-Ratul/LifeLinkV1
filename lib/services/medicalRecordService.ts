export interface RecordGrant {
  grantId: string;
  appointmentId: string;
  patientId: string;
  doctorId: string;
  grantedAt: string;
  expiresAt: string;
  active: boolean;
}

export class MedicalRecordService {
  private static grants: RecordGrant[] = [
    {
      grantId: "grant-1",
      appointmentId: "apt-10492",
      patientId: "patient-1",
      doctorId: "d1111111-1111-1111-1111-111111111111",
      grantedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 86400000).toISOString(),
      active: true,
    },
  ];

  static isAccessGranted(patientId: string, doctorId: string): boolean {
    // Check if an active appointment grant exists and hasn't expired
    const grant = this.grants.find(
      (g) => g.patientId === patientId && g.doctorId === doctorId && g.active && new Date(g.expiresAt) > new Date()
    );
    return !!grant;
  }

  static toggleGrantAccess(appointmentId: string, active: boolean): void {
    const grant = this.grants.find((g) => g.appointmentId === appointmentId);
    if (grant) {
      grant.active = active;
    }
  }
}
