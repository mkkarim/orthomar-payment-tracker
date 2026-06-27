import { milestones, TOTAL } from "../data/milestones";
import type { MilestoneData } from "../types";

export function allocatePayments(payments: number[]): MilestoneData[] {
  let remaining = payments.reduce((a, b) => a + b, 0);
  let foundActive = false;

  return milestones.map((m) => {
    const target = (TOTAL * m.percent) / 100;
    const allocated = Math.min(target, remaining);
    remaining -= allocated;

    const progress = target > 0 ? (allocated / target) * 100 : 0;
    const isComplete = allocated >= target;
    let status: MilestoneData["status"] = "pending";

    if (isComplete) {
      status = "complete";
    } else if (!foundActive && allocated > 0) {
      status = "active";
      foundActive = true;
    } else if (!foundActive && allocated === 0) {
      // first pending becomes active if nothing started yet
      if (!foundActive) {
        status = "active";
        foundActive = true;
      }
    }

    return { ...m, target, paid: allocated, remaining: target - allocated, progress, status };
  });
}

export function totalPaid(payments: number[]): number {
  return payments.reduce((a, b) => a + b, 0);
}

export function formatDT(amount: number): string {
  return new Intl.NumberFormat("fr-TN", {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  }).format(amount) + " DT";
}
