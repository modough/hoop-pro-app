import { supabase } from "@/integrations/supabase/client";


export const drillImages: Record<string, string> = {
  "1-1": "drill-1-1.jpg",
  "1-2": "drill-1-2.jpg",
  "1-3": "drill-1-3.jpg",
  "1-4": "drill-1-4.jpg",
  "1-5": "drill-1-5.jpg",
  "1-6": "drill-1-6.jpg",
  "1-7": "drill-1-7.jpg",
  "1-8": "drill-1-8.jpg",
  "1-9": "drill-1-9.jpg",
  "1-10": "drill-1-10.jpg",
  "2-1": "drill-2-1.jpg",
  "2-2": "drill-2-2.jpg",
  "2-3": "drill-2-3.jpg",
  "2-4": "drill-2-4.jpg",
  "2-5": "drill-2-5.jpg",
  "2-6": "drill-2-6.jpg",
  "2-7": "drill-2-7.jpg",
  "2-8": "drill-2-8.jpg",
  "2-9": "drill-2-9.jpg",
  "2-10": "drill-2-10.jpg",
  "3-1": "drill-3-1.jpg",
  "3-2": "drill-3-2.jpg",
  "3-3": "drill-3-3.jpg",
  "3-4": "drill-3-4.jpg",
  "3-5": "drill-3-5.jpg",
  "3-6": "drill-3-6.jpg",
  "3-7": "drill-3-7.jpg",
  "3-8": "drill-3-8.jpg",
  "3-9": "drill-3-9.jpg",
  "3-10": "drill-3-10.jpg",
  "4-1": "drill-4-1.jpg",
  "4-2": "drill-4-2.jpg",
  "4-3": "drill-4-3.jpg",
  "4-4": "drill-4-4.jpg",
  "4-5": "drill-4-5.jpg",
  "4-6": "drill-4-6.jpg",
  "4-7": "drill-4-7.jpg",
  "4-8": "drill-4-8.jpg",
  "4-9": "drill-4-9.jpg",
  "4-10": "drill-4-10.jpg",
};

export const getDrillImageUrl = (drillId: string): string | null => {
  const filename = drillImages[drillId];
  if (!filename) return null;
  const { data } = supabase.storage.from("drill-images").getPublicUrl(filename);
  return data.publicUrl;
};