import { Reconciler } from "./core/reconciler";

// Start background self-healing every 1 minute
Reconciler.startLoop(60000);
