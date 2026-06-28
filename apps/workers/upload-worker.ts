import { LockManager } from "../../core/lock-manager";
import { StorageFactory } from "../../packages/uploads/adapter-factory";
import { EventBus } from "../../core/eventBus";
import { db } from "../../lib/firebase-admin";

export class UploadWorker {
  static async run(taskId: string, workerId: string) {
    console.log(`🚀 Worker ${workerId} started processing task: ${taskId}`);

    // 1. Acquire Distributed Lock
    const isLocked = await LockManager.acquire(taskId, workerId);
    if (!isLocked) {
      console.warn(`🔒 Task ${taskId} is already being processed by another worker.`);
      return;
    }

    try {
      const taskRef = db.ref(`empire/upload-queue/${taskId}`);
      const taskSnapshot = await taskRef.get();
      const task = taskSnapshot.val();

      // 2. Initialize Adapter
      const adapter = StorageFactory.getAdapter(task.provider || 'sftp');
      
      // 3. Upload & Verify
      console.log(`📤 Uploading task ${taskId}...`);
      const upload = await adapter.upload(task.localPath, task.remotePath);
      
      if (!upload.success) throw new Error("Upload failed");

      const isVerified = await adapter.verify(task.remotePath);
      if (!isVerified) throw new Error("Verification failed: Checksum mismatch");

      // 4. Finalize & Emit Revenue
      await taskRef.update({ status: 'completed', completedAt: Date.now() });

      EventBus.emit({
        type: "REVENUE_GENERATED",
        eventId: taskId, // Simplified for brevity
        timestamp: Date.now(),
        taskId,
        agent: task.agent,
        platform: "Shutterstock",
        amount: 0.25,
        status: "confirmed"
      });

      console.log(`✅ Task ${taskId} processed and revenue emitted.`);

    } catch (error) {
      console.error(`❌ Task ${taskId} failed:`, error);
      await db.ref(`empire/upload-queue/${taskId}`).update({ status: 'failed', error: String(error) });
      
    } finally {
      // 5. Always Release Lock
      await LockManager.release(taskId);
    }
  }
}
