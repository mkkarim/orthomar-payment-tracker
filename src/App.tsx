import { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";
import PaymentList from "./components/PaymentList";
import AddPayment from "./components/AddPayment";
import Milestones from "./components/Milestones";

import { db } from "./services/firebase";
import {
  collection,
  onSnapshot,
  addDoc,
} from "firebase/firestore";

type Payment = {
  id: string;
  amount: number;
  date: string;
};

export default function App() {
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "payments"), (snap) => {
      setPayments(
        snap.docs.map((d) => ({
          id: d.id,
          ...(d.data() as any),
        }))
      );
    });

    return () => unsub();
  }, []);

  const addPayment = async (amount: number) => {
    await addDoc(collection(db, "payments"), {
      amount,
      date: new Date().toISOString(),
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">
        Freelance Payment Tracker
      </h1>

      <Dashboard payments={payments} />
      <AddPayment onAdd={addPayment} />
      <Milestones payments={payments} />
      <PaymentList payments={payments} />
    </div>
  );
}