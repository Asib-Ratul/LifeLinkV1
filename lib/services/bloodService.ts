import { BloodRequest } from "@/app/types";
import { MOCK_BLOOD_REQUESTS } from "@/app/data/mockData";

export class BloodService {
  private static requests: BloodRequest[] = [...MOCK_BLOOD_REQUESTS];

  static getBloodRequests(bloodGroupFilter?: string): BloodRequest[] {
    if (!bloodGroupFilter || bloodGroupFilter === "ALL") {
      return this.requests;
    }
    // PRD V2 Rule: Match EXACT blood group only
    return this.requests.filter((r) => r.bloodGroup === bloodGroupFilter);
  }

  static createBloodRequest(newReq: Omit<BloodRequest, "id" | "status" | "matchedDonorsCount">): BloodRequest {
    const created: BloodRequest = {
      ...newReq,
      id: `blood-${Date.now()}`,
      status: "ACTIVE",
      matchedDonorsCount: 4,
    };
    this.requests = [created, ...this.requests];
    return created;
  }

  static respondAsDonor(requestId: string, consentSharePhone: boolean): { success: boolean; message: string } {
    // PRD V2 Rule: Donor contact shared strictly upon explicit donor consent
    if (!consentSharePhone) {
      return {
        success: false,
        message: "Consent to share phone number is required before donor response can be recorded.",
      };
    }

    const req = this.requests.find((r) => r.id === requestId);
    if (req) {
      req.matchedDonorsCount += 1;
      req.status = "DONORS_RESPONDED";
    }

    return {
      success: true,
      message: "Response recorded. Phone number shared with requester family.",
    };
  }
}
