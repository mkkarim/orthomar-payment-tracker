
import { TOTAL } from "../data/milestones";
import { totalPaid } from "../utils/milestoneAllocator";

export default function Dashboard({ payments }: any) {
  const amounts = payments.map((p: any) => p.amount);

  const total = totalPaid(amounts);
  const progress = (total / TOTAL) * 100;

  return (
    <div className="bg-white p-4 rounded-xl shadow mb-4">
      <h2 className="text-xl font-bold">Dashboard</h2>

      <p>Total Projet: {TOTAL} DT</p>
      <p>Total Reçu: {total} DT</p>
      <p>Reste: {TOTAL - total} DT</p>

      <div className="w-full bg-gray-200 h-4 rounded mt-2">
        <div
          className="bg-green-500 h-4 rounded"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="mt-2">{progress.toFixed(2)}%</p>
    </div>
  );
}