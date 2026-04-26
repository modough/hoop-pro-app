import { useMemo } from "react";
import { useTrainingLog } from "./useTrainingLog";

const toKey = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export interface StreakInfo {
  current: number;
  longest: number;
  trainedToday: boolean;
  totalActiveDays: number;
}

export const useStreak = (): StreakInfo => {
  const { log } = useTrainingLog();

  return useMemo(() => {
    const activeDays = Object.keys(log).filter((d) => (log[d] ?? 0) > 0);
    if (activeDays.length === 0) {
      return { current: 0, longest: 0, trainedToday: false, totalActiveDays: 0 };
    }

    const sorted = [...activeDays].sort();
    const set = new Set(activeDays);

    // Longest streak
    let longest = 0;
    let run = 0;
    let prev: Date | null = null;
    for (const key of sorted) {
      const d = new Date(key + "T00:00:00");
      if (prev) {
        const diff = Math.round((d.getTime() - prev.getTime()) / 86400000);
        run = diff === 1 ? run + 1 : 1;
      } else {
        run = 1;
      }
      if (run > longest) longest = run;
      prev = d;
    }

    // Current streak: count back from today (or yesterday if not trained today)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const trainedToday = set.has(toKey(today));

    let current = 0;
    const cursor = new Date(today);
    if (!trainedToday) cursor.setDate(cursor.getDate() - 1);
    while (set.has(toKey(cursor))) {
      current++;
      cursor.setDate(cursor.getDate() - 1);
    }

    return { current, longest, trainedToday, totalActiveDays: activeDays.length };
  }, [log]);
};
