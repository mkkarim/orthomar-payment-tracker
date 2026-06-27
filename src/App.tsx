import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { db } from "./services/firebase";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";

import Dashboard    from "./components/Dashboard";
import Milestones   from "./components/Milestones";
import AddPayment   from "./components/AddPayment";
import PaymentList  from "./components/PaymentList";
import type { Payment } from "./types";

export default function App() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    const q = query(collection(db, "payments"), orderBy("date", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setPayments(
        snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Payment, "id">) }))
      );
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const addPayment = async (amount: number, note: string, date: string) => {
    await addDoc(collection(db, "payments"), {
      amount,
      note,
      date,
    });
  };

  const deletePayment = async (id: string) => {
    await deleteDoc(doc(db, "payments", id));
  };

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1e2130",
            color: "#e8eaf0",
            border: "1px solid rgba(255,255,255,0.08)",
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: "14px",
          },
        }}
      />

      <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #0f1117 0%, #141824 50%, #0f1117 100%)" }}>
        {/* Subtle top accent */}
        <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, #6366f1 50%, transparent)" }} />

        <div className="max-w-2xl mx-auto px-4 py-8 pb-16">
          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center">
                <span className="text-xs">💎</span>
              </div>
              <span className="text-xs font-medium text-slate-500 uppercase tracking-widest">Orthomar ERP</span>
            </div>
            <h1 className="text-3xl font-bold text-white">Payment Tracker</h1>
          </header>

          {loading ? (
            <div className="flex items-center justify-center py-24">
              <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="space-y-0">
              <Dashboard payments={payments} />
              <Milestones payments={payments} />
              <AddPayment onAdd={addPayment} />
              <PaymentList payments={payments} onDelete={deletePayment} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}