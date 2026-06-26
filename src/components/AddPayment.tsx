import { useState } from "react";

export default function AddPayment({ onAdd }: any) {
  const [amount, setAmount] = useState("");

  return (
    <div className="bg-white p-4 rounded-xl shadow mb-4">
      <input
        type="number"
        placeholder="Montant"
        className="border p-2 mr-2"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => {
          onAdd(Number(amount));
          setAmount("");
        }}
      >
        Ajouter
      </button>
    </div>
  );
}