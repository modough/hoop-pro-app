import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export const useCompletedDrills = () => {
  const { user } = useAuth();
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!user) {
      setCompleted(new Set());
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data, error } = await supabase
      .from("completed_drills")
      .select("drill_id")
      .eq("user_id", user.id);
    if (!error && data) {
      setCompleted(new Set(data.map((d) => d.drill_id)));
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const toggle = useCallback(
    async (drillId: string) => {
      if (!user) return;
      const has = completed.has(drillId);
      // Optimistic
      setCompleted((prev) => {
        const next = new Set(prev);
        if (has) next.delete(drillId);
        else next.add(drillId);
        return next;
      });
      if (has) {
        await supabase
          .from("completed_drills")
          .delete()
          .eq("user_id", user.id)
          .eq("drill_id", drillId);
      } else {
        await supabase.from("completed_drills").insert({
          user_id: user.id,
          drill_id: drillId,
        });
      }
    },
    [user, completed]
  );

  const reset = useCallback(async () => {
    if (!user) return;
    await supabase.from("completed_drills").delete().eq("user_id", user.id);
    await supabase.from("training_log").delete().eq("user_id", user.id);
    setCompleted(new Set());
  }, [user]);

  return { completed, loading, toggle, refresh, reset };
};
