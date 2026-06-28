case "REVENUE_GENERATED":
  await db.ref(`empire/metrics/revenue`).transaction((current) => {
    return (current || 0) + event.amount;
  });
  
  await db.ref(`empire/agents/${event.agent}/earnings`).transaction((current) => {
    return (current || 0) + event.amount;
  });
  break;
