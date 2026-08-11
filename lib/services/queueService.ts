import { MOCK_LIVE_QUEUE } from "@/app/data/mockData";
import { LiveQueueData } from "@/app/types";

export class QueueService {
  private static queueState: LiveQueueData = { ...MOCK_LIVE_QUEUE };
  private static skippedSerials: number[] = [14, 16];

  static getLiveQueueStatus(appointmentId?: string): LiveQueueData {
    return { ...this.queueState };
  }

  static completeAndCallNext(): LiveQueueData {
    this.queueState.nowServingSerial += 1;
    this.queueState.patientsAhead = Math.max(0, this.queueState.userSerial - this.queueState.nowServingSerial);
    this.queueState.estimatedWaitMinutes = this.queueState.patientsAhead * 8;
    this.queueState.statusMessage = `Queue running normally • Serial #${this.queueState.nowServingSerial} calling`;
    return { ...this.queueState };
  }

  static skipAndCallNext(): LiveQueueData {
    if (!this.skippedSerials.includes(this.queueState.nowServingSerial)) {
      this.skippedSerials.push(this.queueState.nowServingSerial);
    }
    this.queueState.nowServingSerial += 1;
    this.queueState.patientsAhead = Math.max(0, this.queueState.userSerial - this.queueState.nowServingSerial);
    this.queueState.estimatedWaitMinutes = this.queueState.patientsAhead * 8;
    this.queueState.statusMessage = `Serial #${this.queueState.nowServingSerial - 1} skipped. Now calling #${this.queueState.nowServingSerial}`;
    return { ...this.queueState };
  }

  static recallSkipped(serialNumber: number): LiveQueueData {
    this.skippedSerials = this.skippedSerials.filter((s) => s !== serialNumber);
    this.queueState.nowServingSerial = serialNumber;
    this.queueState.statusMessage = `Recalled skipped Serial #${serialNumber} to chamber`;
    return { ...this.queueState };
  }

  static pauseQueue(): LiveQueueData {
    this.queueState.queueStatus = "PAUSED";
    this.queueState.statusMessage = "Queue temporarily paused by doctor/staff";
    return { ...this.queueState };
  }

  static resumeQueue(): LiveQueueData {
    this.queueState.queueStatus = "NORMAL";
    this.queueState.statusMessage = "Queue resumed. Chamber consultation active";
    return { ...this.queueState };
  }

  static addWalkInSerial(patientName: string): number {
    this.queueState.userSerial += 1;
    return this.queueState.userSerial;
  }
}
