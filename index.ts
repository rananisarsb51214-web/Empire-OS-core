// Signal Handling for Graceful Shutdown
process.on('SIGTERM', async () => {
  console.log('🛑 Received SIGTERM. Shutting down gracefully...');
  // Logic: SFTP upload finish hone ka wait karein ya lock release karein
  process.exit(0);
});
import { Reconciler } from "./core/reconciler";

// Start background self-healing every 1 minute
Reconciler.startLoop(60000);
