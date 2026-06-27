export type Payment = {
  id: string;
  amount: number;
  date: string;
  note?: string;
};

export type MilestoneData = {
  id: number;
  name: string;
  percent: number;
  target: number;
  paid: number;
  remaining: number;
  progress: number;
  status: "complete" | "active" | "pending";
};
