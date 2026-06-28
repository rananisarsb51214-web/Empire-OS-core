import { MultiModelRouter } from "./router";

static async dispatch(input: string, agent: AgentType) {
  const taskId = crypto.randomUUID();
  
  // Model arbitration
  const selectedModel = await MultiModelRouter.route(taskId, agent, input);
  
  await db.ref(`empire/tasks/${taskId}`).set({
    taskId,
    input,
    agent,
    model: selectedModel, // Audit trailing the model used
    status: "queued",
    ts: Date.now()
  });

  return { taskId, selectedModel };
}
