import { Flame, Trophy, Target, Zap, Star, Award, Calendar, Medal } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  /** Returns [unlocked, progress 0-1] */
  evaluate: (ctx: AchievementContext) => { unlocked: boolean; progress: number; valueLabel: string };
}

export interface AchievementContext {
  totalCompleted: number;
  totalDrills: number;
  currentStreak: number;
  longestStreak: number;
  totalActiveDays: number;
  levelsCompleted: number;
}

const drillCount = (n: number, id: string, title: string, desc: string, icon: LucideIcon): Achievement => ({
  id,
  title,
  description: desc,
  icon,
  evaluate: ({ totalCompleted }) => ({
    unlocked: totalCompleted >= n,
    progress: Math.min(1, totalCompleted / n),
    valueLabel: `${Math.min(totalCompleted, n)}/${n}`,
  }),
});

const streakCount = (n: number, id: string, title: string, desc: string, icon: LucideIcon): Achievement => ({
  id,
  title,
  description: desc,
  icon,
  evaluate: ({ longestStreak }) => ({
    unlocked: longestStreak >= n,
    progress: Math.min(1, longestStreak / n),
    valueLabel: `${Math.min(longestStreak, n)}/${n} days`,
  }),
});

export const achievements: Achievement[] = [
  drillCount(1, "first-drill", "First Bucket", "Complete your first drill", Target),
  drillCount(10, "ten-drills", "Getting Warm", "Complete 10 drills", Zap),
  drillCount(25, "twentyfive-drills", "Locked In", "Complete 25 drills", Star),
  drillCount(40, "all-drills", "Pro Elite", "Complete every drill", Trophy),
  streakCount(3, "streak-3", "On Fire", "Train 3 days in a row", Flame),
  streakCount(7, "streak-7", "Week Warrior", "Train 7 days in a row", Flame),
  streakCount(30, "streak-30", "Unstoppable", "Train 30 days in a row", Award),
  {
    id: "level-1",
    title: "Fundamentals Master",
    description: "Complete every Beginner drill",
    icon: Medal,
    evaluate: ({ levelsCompleted }) => ({
      unlocked: levelsCompleted >= 1,
      progress: Math.min(1, levelsCompleted),
      valueLabel: levelsCompleted >= 1 ? "Done" : "0/1",
    }),
  },
  {
    id: "active-days-20",
    title: "Dedicated",
    description: "Train on 20 different days",
    icon: Calendar,
    evaluate: ({ totalActiveDays }) => ({
      unlocked: totalActiveDays >= 20,
      progress: Math.min(1, totalActiveDays / 20),
      valueLabel: `${Math.min(totalActiveDays, 20)}/20`,
    }),
  },
];
