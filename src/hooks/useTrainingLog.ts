import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface DailyLog {
  date: string;
  minutes: number;
}

const getToday = (): string => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

/**
 * Add training minutes for a user (today).
 * Uses upsert with merge logic: existing minutes + new minutes.
 */
export const addTrainingMinutes = async (minutes: number, userId?: string) => {
  if (!minutes || minutes <= 0) return;
  const safe = Math.floor(minutes);
  if (safe === 0) return;

  const resolvedUserId = userId ?? (await supabase.auth.getUser()).data.user?.id;
  if (!resolvedUserId) return;

  const today = getToday();

  // Read current row, then upsert with summed minutes
  const { data: existing, error: existingError } = await supabase
    .from("training_log")
    .select("minutes")
    .eq("user_id", resolvedUserId)
    .eq("log_date", today)
    .maybeSingle();

  if (existingError) {
    console.error("Failed to read existing training minutes", existingError);
    return;
  }

  const newMinutes = (existing?.minutes ?? 0) + safe;

  const { error } = await supabase
    .from("training_log")
    .upsert(
      { user_id: resolvedUserId, log_date: today, minutes: newMinutes },
      { onConflict: "user_id,log_date" }
    );

  if (error) {
    console.error("Failed to save training minutes", error);
  }
};

export const useTrainingLog = () => {
  const { user } = useAuth();
  const [log, setLog] = useState<Record<string, number>>({});

  const refresh = useCallback(async () => {
    if (!user) {
      setLog({});
      return;
    }
    const { data } = await supabase
      .from("training_log")
      .select("log_date, minutes")
      .eq("user_id", user.id);
    const next: Record<string, number> = {};
    data?.forEach((row) => {
      next[row.log_date] = row.minutes;
    });
    setLog(next);
  }, [user]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const getDailyLogs = useCallback(
    (year: number, month: number): DailyLog[] => {
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const logs: DailyLog[] = [];
      for (let day = 1; day <= daysInMonth; day++) {
        const date = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        logs.push({ date, minutes: log[date] || 0 });
      }
      return logs;
    },
    [log]
  );

  const getMonthTotal = useCallback(
    (year: number, month: number): number =>
      getDailyLogs(year, month).reduce((s, d) => s + d.minutes, 0),
    [getDailyLogs]
  );

  return { log, refresh, getDailyLogs, getMonthTotal };
};
