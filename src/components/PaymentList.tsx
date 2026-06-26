export default function PaymentList({ payments }: any) {
  return (
    <div className="bg-white p-4 rounded-xl shadow mt-4">
      <h2 className="font-bold mb-2">Historique</h2>

      {payments.map((p: any) => (
        <div key={p.id} className="border-b py-2">
          {p.amount} DT — {new Date(p.date).toLocaleDateString()}
        </div>
      ))}
    </div>
  );
}