export type RevenueEvent = {
  type: "REVENUE_GENERATED";
  taskId: string;
  agent: string;
  amount: number; // USD
  platform: string; // e.g., "Shutterstock"
};
