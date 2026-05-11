import { supabase } from "@/integrations/supabase/client";



export const drillVideos: Record<string, string> = {
  "1-1": "drill-1-1.mp4",
  "1-2": "drill-1-2.mp4",
  "1-3": "drill-1-3.mp4",
  "1-4": "drill-1-4.mp4",
  "1-5": "drill-1-5.mp4",
  "1-6": "drill-1-6.mp4",
  "1-7": "drill-1-7.mp4",
  "1-8": "drill-1-8.mp4",
  "1-9": "drill-1-9.mp4",
  "1-10": "drill-1-10.mp4",
  "2-1": "drill-2-1.mp4",
  "2-2": "drill-2-2.mp4",
  "2-3": "drill-2-3.mp4",
  "2-4": "drill-2-4.mp4",
  "2-5": "drill-2-5.mp4",
  "2-6": "drill-2-6.mp4",
  "2-7": "drill-2-7.mp4",
  "2-8": "drill-2-8.mp4",
  "2-9": "drill-2-9.mp4",
  "2-10": "drill-2-10.mp4",
  "3-1": "drill-3-1.mp4",
  "3-2": "drill-3-2.mp4",
  "3-3": "drill-3-3.mp4",
  "3-4": "drill-3-4.mp4",
  "3-5": "drill-3-5.mp4",
  "3-6": "drill-3-6.mp4",
  "3-7": "drill-3-7.mp4",
  "3-8": "drill-3-8.mp4",
  "3-9": "drill-3-9.mp4",
  "3-10": "drill-3-10.mp4",
  "4-1": "drill-4-1.mp4",
  "4-2": "drill-4-2.mp4",
  "4-3": "drill-4-3.mp4",
  "4-4": "drill-4-4.mp4",
  "4-5": "drill-4-5.mp4",
  "4-6": "drill-4-6.mp4",
  "4-7": "drill-4-7.mp4",
  "4-8": "drill-4-8.mp4",
  "4-9": "drill-4-9.mp4",
  "4-10": "drill-4-10.mp4",
};

/**
 * Returns the public URL for a drill's MP4 in the `drill-videos` Supabase bucket.
 * Returns null if the drill has no mapped filename.
 */
export const getDrillVideoUrl = (drillId: string): string | null => {
  const filename = drillVideos[drillId];
  if (!filename) return null;
  const { data } = supabase.storage.from("drill-videos").getPublicUrl(filename);
  return data.publicUrl;
};