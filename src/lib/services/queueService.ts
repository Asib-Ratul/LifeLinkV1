import { MOCK_LIVE_QUEUE } from "@/data/mockData";
import type { LiveQueueData } from "@/types";
import { readDemoValue, writeDemoValue } from "@/lib/demo/storage";

export interface DemoQueueSnapshot {
  queue: LiveQueueData;
  totalSerials: number;
  skippedSerials: number[];
}

const QUEUE_KEY = "lifelink-demo:queue";
const INITIAL_QUEUE: DemoQueueSnapshot = {
  queue: { ...MOCK_LIVE_QUEUE },
  totalSerials: 35,
  skippedSerials: [14, 16],
};

export class QueueService {
  static getSnapshot(): DemoQueueSnapshot {
    const snapshot = readDemoValue<DemoQueueSnapshot>(QUEUE_KEY, INITIAL_QUEUE);
    return { ...snapshot, queue: { ...snapshot.queue }, skippedSerials: [...snapshot.skippedSerials] };
  }

  private static save(snapshot: DemoQueueSnapshot): LiveQueueData {
    writeDemoValue(QUEUE_KEY, snapshot);
    return { ...snapshot.queue };
  }

  static getLiveQueueStatus(appointmentId?: string): LiveQueueData {
    const queue = this.getSnapshot().queue;
    return appointmentId && appointmentId !== queue.appointmentId ? { ...queue, statusMessage: "No matching demo queue was found." } : queue;
  }

  static completeAndCallNext(): LiveQueueData {
    const snapshot = this.getSnapshot();
    const { queue } = snapshot;
    if (queue.queueStatus === "PAUSED" || queue.nowServingSerial >= snapshot.totalSerials) return queue;
    queue.nowServingSerial += 1;
    queue.patientsAhead = Math.max(0, queue.userSerial - queue.nowServingSerial);
    queue.estimatedWaitMinutes = queue.patientsAhead * 8;
    queue.statusMessage = `Demo queue: now calling serial #${queue.nowServingSerial}`;
    return this.save(snapshot);
  }

  static skipAndCallNext(): LiveQueueData {
    const snapshot = this.getSnapshot();
    const { queue } = snapshot;
    if (queue.queueStatus === "PAUSED" || queue.nowServingSerial >= snapshot.totalSerials) return queue;
    if (!snapshot.skippedSerials.includes(queue.nowServingSerial)) snapshot.skippedSerials.push(queue.nowServingSerial);
    queue.nowServingSerial += 1;
    queue.patientsAhead = Math.max(0, queue.userSerial - queue.nowServingSerial);
    queue.estimatedWaitMinutes = queue.patientsAhead * 8;
    queue.statusMessage = `Demo serial #${queue.nowServingSerial - 1} skipped; now calling #${queue.nowServingSerial}`;
    return this.save(snapshot);
  }

  static recallSkipped(serialNumber: number): LiveQueueData {
    const snapshot = this.getSnapshot();
    if (!snapshot.skippedSerials.includes(serialNumber)) return snapshot.queue;
    snapshot.skippedSerials = snapshot.skippedSerials.filter((serial) => serial !== serialNumber);
    snapshot.queue.nowServingSerial = serialNumber;
    snapshot.queue.queueStatus = "NORMAL";
    snapshot.queue.statusMessage = `Demo queue recalled skipped serial #${serialNumber}`;
    return this.save(snapshot);
  }

  static pauseQueue(): LiveQueueData {
    const snapshot = this.getSnapshot();
    snapshot.queue.queueStatus = "PAUSED";
    snapshot.queue.statusMessage = "Demo queue paused";
    return this.save(snapshot);
  }

  static resumeQueue(): LiveQueueData {
    const snapshot = this.getSnapshot();
    snapshot.queue.queueStatus = "NORMAL";
    snapshot.queue.statusMessage = "Demo queue resumed";
    return this.save(snapshot);
  }

  static addWalkInSerial(patientName: string): number | null {
    if (!patientName.trim()) return null;
    const snapshot = this.getSnapshot();
    snapshot.totalSerials += 1;
    this.save(snapshot);
    return snapshot.totalSerials;
  }
}
