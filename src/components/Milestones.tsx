import { allocatePayments } from "../utils/milestoneAllocator";
import type { Payment, MilestoneData } from "../types";

type Props = { payments: Payment[] };

export default function Milestones({ payments }: Props) {
  const amounts = payments.map((p) => p.amount);
  const data = allocatePayments(amounts);

  return (
    <div className="rounded-2xl border border-white/8 bg-white/4 backdrop-blur-sm p-6 mb-5">
      <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mb-1">Décomposition</p>
      <h2 className="text-lg font-semibold text-white mb-5">Modules du projet</h2>

      <div className="space-y-4">
        {data.map((m, idx) => (
          <MilestoneRow key={m.id} milestone={m} index={idx} />
        ))}
      </div>
    </div>
  );
}

function MilestoneRow({ milestone: m, index }: { milestone: MilestoneData; index: number }) {
  const isComplete = m.status === "complete";
  const isActive   = m.status === "active";

  const barColor = isComplete
    ? "from-emerald-500 to-emerald-400"
    : isActive
    ? "from-indigo-500 to-violet-500"
    : "from-slate-600 to-slate-500";

  const badge = isComplete
    ? <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-medium">Complété</span>
    : isActive
    ? <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-400 font-medium">En cours</span>
    : <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-slate-500 font-medium">En attente</span>;

  return (
    <div className={`rounded-xl p-4 border transition-all ${
      isActive
        ? "border-indigo-500/30 bg-indigo-500/5 milestone-active"
        : isComplete
        ? "border-emerald-500/20 bg-emerald-500/5"
        : "border-white/5 bg-white/2"
    }`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-xl">{(m as any).icon}</span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-500">0{index + 1}</span>
              <p className="text-sm font-medium text-white">{m.name}</p>
            </div>
            <p className="text-xs text-slate-500">{m.percent}% du total</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {badge}
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative h-2 bg-white/8 rounded-full overflow-hidden mb-2">
        <div
          className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r ${barColor} bar-animated`}
          style={{ "--bar-width": `${m.progress}%` } as React.CSSProperties}
        />
      </div>

      {/* Numbers */}
      <div className="flex justify-between items-center">
        <p className="font-mono text-xs text-slate-400">
          <span className={isComplete ? "text-emerald-400" : isActive ? "text-indigo-400" : "text-slate-500"}>
            {m.paid.toLocaleString("fr-TN")}
          </span>
          <span className="text-slate-600"> / {m.target.toLocaleString("fr-TN")} DT</span>
        </p>
        <p className={`font-mono text-xs font-semibold ${
          isComplete ? "text-emerald-400" : isActive ? "text-indigo-400" : "text-slate-500"
        }`}>
          {m.progress.toFixed(0)}%
        </p>
      </div>
    </div>
  );
}
