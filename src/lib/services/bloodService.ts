import type { BloodRequest } from "@/types";
import { MOCK_BLOOD_REQUESTS } from "@/data/mockData";
import { readDemoValue, writeDemoValue } from "@/lib/demo/storage";

const REQUESTS_KEY = "lifelink-demo:blood-requests";
const RESPONSES_KEY = "lifelink-demo:blood-responses";
type DemoResponse = { requestId: string; consented: boolean; createdAt: string };

export class BloodService {
  static getBloodRequests(bloodGroupFilter?: string): BloodRequest[] {
    const requests = readDemoValue<BloodRequest[]>(REQUESTS_KEY, MOCK_BLOOD_REQUESTS).map((request) => ({ ...request }));
    if (!bloodGroupFilter || bloodGroupFilter === "ALL") return requests;
    return requests.filter((request) => request.bloodGroup === bloodGroupFilter);
  }

  static getBloodRequest(requestId: string): BloodRequest | undefined {
    return this.getBloodRequests().find((request) => request.id === requestId);
  }

  static createBloodRequest(newReq: Omit<BloodRequest, "id" | "status" | "matchedDonorsCount">): BloodRequest {
    const created: BloodRequest = {
      ...newReq,
      id: typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `demo-${Date.now()}`,
      status: "ACTIVE",
      matchedDonorsCount: 0,
    };
    writeDemoValue(REQUESTS_KEY, [created, ...this.getBloodRequests()]);
    return created;
  }

  static respondAsDonor(requestId: string, consentSharePhone: boolean): { success: boolean; message: string } {
    if (!consentSharePhone) return { success: false, message: "Please select the consent option to record your demo response." };
    const requests = this.getBloodRequests();
    const request = requests.find((item) => item.id === requestId);
    if (!request) return { success: false, message: "This blood request could not be found." };

    request.matchedDonorsCount += 1;
    request.status = "DONORS_RESPONDED";
    writeDemoValue(REQUESTS_KEY, requests);
    const responses = readDemoValue<DemoResponse[]>(RESPONSES_KEY, []);
    responses.push({ requestId, consented: true, createdAt: new Date().toISOString() });
    writeDemoValue(RESPONSES_KEY, responses);
    return { success: true, message: "Demo response saved in this browser. No contact details were collected or shared." };
  }
}
