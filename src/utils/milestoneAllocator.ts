import { milestones, TOTAL } from "../data/milestones";

export function allocatePayments(payments: number[]) {
  let remaining = payments.reduce((a, b) => a + b, 0);

  return milestones.map((m) => {
    const target = (TOTAL * m.percent) / 100;

    const allocated = Math.min(target, remaining);
    remaining -= allocated;

    return {
      ...m,
      target,
      paid: allocated,
      remaining: target - allocated,
      progress: (allocated / target) * 100
    };
  });
}

export function totalPaid(payments: number[]) {
  return payments.reduce((a, b) => a + b, 0);
}