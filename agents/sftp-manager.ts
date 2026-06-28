import SftpClient from 'ssh2-sftp-client';
import { EventBus } from '../core/eventBus';
import { v4 as uuidv4 } from 'uuid';

export class SftpManager {
  private client = new SftpClient();

  async uploadAsset(taskId: string, agent: string, localPath: string, remotePath: string) {
    const eventId = uuidv4();
    
    try {
      await this.client.connect({
        host: process.env.SFTP_HOST,
        username: process.env.SFTP_USER,
        password: process.env.SFTP_PASSWORD
      });

      await this.client.put(localPath, remotePath);
      await this.client.end();

      // Upload Success -> Emit Revenue Event
      EventBus.emit({
        type: "REVENUE_GENERATED",
        eventId,
        timestamp: Date.now(),
        taskId,
        agent,
        platform: "Shutterstock",
        assetId: taskId,
        currency: "USD",
        amount: 0.25, // Base commission per asset
        status: "confirmed"
      });

      return { success: true, eventId };

    } catch (error) {
      console.error(`❌ SFTP Upload Failed: ${error}`);
      // Handle via Dead-letter queue logic here
      return { success: false, error };
    }
  }
}
