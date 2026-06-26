import { allocatePayments } from "../utils/milestoneAllocator";


export default function Milestones({ payments }: any) {
  const amounts = payments.map((p: any) => p.amount);
  const data = allocatePayments(amounts);

  return (
    <div className="bg-white p-4 rounded-xl shadow mt-4">
      <h2 className="font-bold mb-3">Avancement Modules</h2>

      {data.map((m) => (
        <div key={m.id} className="mb-3">
          <p>{m.name}</p>

          <div className="w-full bg-gray-200 h-3 rounded">
            <div
              className="bg-blue-500 h-3 rounded"
              style={{ width: `${m.progress}%` }}
            />
          </div>

          <small>
            {m.paid} / {m.target} DT
          </small>
        </div>
      ))}
    </div>
  );
}