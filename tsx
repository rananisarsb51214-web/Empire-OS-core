// apps/dashboard/components/RevenueWidget.tsx
export default function RevenueWidget({ totalEarnings }) {
  return (
    <div className="bg-gradient-to-br from-purple-900/50 to-black border border-purple-500/30 p-6 rounded-2xl shadow-2xl backdrop-blur-md">
      <h2 className="text-purple-400 font-bold uppercase tracking-widest text-sm">Total Empire Revenue</h2>
      <div className="text-4xl font-mono text-white mt-2">
        ${totalEarnings.toFixed(2)}
      </div>
      <div className="text-green-400 text-xs mt-1">▲ 12% from last cycle</div>
    </div>
  );
}
