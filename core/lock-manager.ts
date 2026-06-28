import { db } from "../lib/firebase-admin";

export class LockManager {
  private static readonly LOCK_DURATION = 60000; // 60 seconds

  static async acquire(taskId: string, workerId: string): Promise<boolean> {
    const lockRef = db.ref(`locks/${taskId}`);
    
    const result = await lockRef.transaction((current) => {
      if (current === null || current.expiresAt < Date.now()) {
        return {
          owner: workerId,
          acquiredAt: Date.now(),
          expiresAt: Date.now() + this.LOCK_DURATION,
          heartbeatAt: Date.now()
        };
      }
      return; // Already locked and valid
    });

    return !!result.committed;
  }

  static async release(taskId: string) {
    await db.ref(`locks/${taskId}`).remove();
  }
}
