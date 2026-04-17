import { useState, useCallback, useEffect } from "react";
import { addTrainingMinutes, getTrainingLog } from "@/lib/database";

export interface DailyLog {
  date: string; // YYYY-MM-DD
  minutes: number;
}

/* =========================
   TRAINING MINUTES (WRITE)
========================= */

export const useTrainingMinutes = () => {
  const addMinutes = useCallback(async (minutes: number) => {
    try {
      await addTrainingMinutes(minutes);
    } catch (error) {
      console.error("Error saving training minutes:", error);
    }
  }, []);

  return { addMinutes };
};

/* =========================
   TRAINING LOG (READ)
========================= */

export const useTrainingLog = () => {
  const [log, setLog] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  // 🔄 Load from SQLite
  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getTrainingLog();
      setLog(data);
    } catch (error) {
      console.error("Error loading training log:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  /* =========================
     HELPERS
  ========================= */

  const getDailyLogs = useCallback(
    (year: number, month: number): DailyLog[] => {
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const logs: DailyLog[] = [];

      for (let day = 1; day <= daysInMonth; day++) {
        const date = `${year}-${String(month + 1).padStart(2, "0")}-${String(
          day
        ).padStart(2, "0")}`;

        logs.push({
          date,
          minutes: log[date] || 0,
        });
      }

      return logs;
    },
    [log]
  );

  const getMonthTotal = useCallback(
    (year: number, month: number): number => {
      return getDailyLogs(year, month).reduce(
        (sum, d) => sum + d.minutes,
        0
      );
    },
    [getDailyLogs]
  );

  const getTodayMinutes = useCallback((): number => {
    const d = new Date();
    const today = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(d.getDate()).padStart(2, "0")}`;

    return log[today] || 0;
  }, [log]);

  return {
    log,
    loading,
    refresh,
    getDailyLogs,
    getMonthTotal,
    getTodayMinutes,
  };
};