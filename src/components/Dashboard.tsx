import { TOTAL } from "../data/milestones";
import { totalPaid } from "../utils/milestoneAllocator";
import type { Payment } from "../types";

type Props = { payments: Payment[] };

// Format court : "36 000 DT" sans les décimales pour les grands montants
function formatDT(amount: number): string {
  return new Intl.NumberFormat("fr-TN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 3,
  }).format(amount);
}

export default function Dashboard({ payments }: Props) {
  const amounts = payments.map((p) => p.amount);
  const total = totalPaid(amounts);
  const remaining = TOTAL - total;
  const progress = Math.min((total / TOTAL) * 100, 100);

  const getBarColor = (pct: number) => {
    if (pct >= 100) return "from-emerald-500 to-emerald-400";
    if (pct >= 60)  return "from-indigo-500 to-violet-500";
    if (pct >= 30)  return "from-indigo-600 to-indigo-400";
    return "from-slate-500 to-indigo-500";
  };

  return (
    <div className="rounded-2xl border border-white/8 bg-white/4 backdrop-blur-sm p-6 mb-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mb-1">Projet ERP Orthomar</p>
          <h2 className="text-2xl font-semibold text-white">Suivi des paiements</h2>
        </div>
        <div className="text-right">
          <p className="font-mono text-3xl font-bold text-white">
            {progress.toFixed(1)}<span className="text-slate-400 text-xl">%</span>
          </p>
          <p className="text-xs text-slate-500 mt-0.5">avancement global</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative h-3 bg-white/6 rounded-full overflow-hidden mb-6">
        <div
          className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r ${getBarColor(progress)} bar-animated transition-all`}
          style={{ "--bar-width": `${progress}%` } as React.CSSProperties}
        />
      </div>

      {/* Stats — colonne sur mobile, 3 colonnes sur sm+ */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Stat
          label="Montant total"
          value={formatDT(TOTAL)}
          sub="budget projet"
          color="text-slate-300"
        />
        <Stat
          label="Reçu"
          value={formatDT(total)}
          sub={`${payments.length} versement${payments.length > 1 ? "s" : ""}`}
          color="text-emerald-400"
        />
        <Stat
          label="Restant"
          value={formatDT(remaining)}
          sub="à recevoir"
          color="text-indigo-400"
        />
      </div>
    </div>
  );
}

function Stat({ label, value, sub, color }: {
  label: string;
  value: string;
  sub: string;
  color: string;
}) {
  return (
    <div className="bg-white/4 rounded-xl p-4 border border-white/6 min-w-0">
      <p className="text-xs text-slate-500 uppercase tracking-wider mb-1 truncate">{label}</p>
      <p className={`font-mono font-semibold ${color} leading-tight break-all text-base`}>
        {value}
        <span className="text-slate-500 font-normal text-xs ml-1">DT</span>
      </p>
      <p className="text-xs text-slate-600 mt-0.5">{sub}</p>
    </div>
  );
}