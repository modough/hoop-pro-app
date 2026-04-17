import { trainingLevels } from "@/data/trainingData";
import ProgressBar from "@/components/ProgressBar";
import { Trophy, Target, Zap, Star } from "lucide-react";
import UserHeader from "@/components/UserHeader";
import { useMemo } from "react";
import SemiCircleProgress from "@/components/SemiCircleProgress";
import heroImage from "@/assets/hero-basketball.jpg";
import TrainingCalendar from "@/components/TrainingCalendar";

const levelIcons = [Target, Zap, Star, Trophy];

const Progress = () => {
  const completedDrills: Set<string> = useMemo(() => {
    const saved = localStorage.getItem("completedDrills");
    return saved ? new Set(JSON.parse(saved)) : new Set();
  }, []);

  const totalDrills = trainingLevels.reduce(
    (sum, lvl) => sum + lvl.drills.length,
    0,
  );
  const totalCompleted = trainingLevels.reduce(
    (sum, lvl) =>
      sum + lvl.drills.filter((d) => completedDrills.has(d.id)).length,
    0,
  );

  const categories = useMemo(() => {
    const catMap: Record<string, { total: number; completed: number }> = {};
    trainingLevels.forEach((lvl) =>
      lvl.drills.forEach((d) => {
        if (!catMap[d.category])
          catMap[d.category] = { total: 0, completed: 0 };
        catMap[d.category].total++;
        if (completedDrills.has(d.id)) catMap[d.category].completed++;
      }),
    );
    return catMap;
  }, [completedDrills]);

  const overallPct =
    totalDrills > 0 ? Math.round((totalCompleted / totalDrills) * 100) : 0;
  const radius = 55;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overallPct / 100) * circumference;
  // Alternate category visualization types
  const catVizTypes = ["radial", "semi", "stat", "segmented"] as const;

  return (
    <div>
      <UserHeader />
      <div className="px-4 py-6">
        {/* Overall Circular Progress */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-42 h-42">
            <img
                src={heroImage}
                alt="Trophy"
                className=" absolute w-full h-full overflow-hidden object-cover rounded-full opacity-50"
              />
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r={radius}
                fill="none"
                className="stroke-secondary"
                strokeWidth="10"
              />
              <circle
                cx="60"
                cy="60"
                r={radius}
                fill="none"
                className="stroke-primary"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                style={{ transition: "stroke-dashoffset 0.6s ease" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
             
              <span className="text-2xl font-black text-foreground">
                {overallPct}%
              </span>
              <span className="text-xs text-muted-foreground">
                {totalCompleted}/{totalDrills}
              </span>
            </div>
          </div>
          <span className="text-sm font-semibold text-muted-foreground mt-2">
            Overall Completion
          </span>
        </div>

        {/* Training Calendar */}
        <h2 className="text-lg font-bold mb-3">Daily Training</h2>
        <div className="mb-6">
          <TrainingCalendar />
        </div>

        {/* Level Progress */}
        <h2 className="text-lg font-bold mb-3">By Level</h2>
        <div className="space-y-3 mb-6">
          {trainingLevels.map((level, i) => {
            const Icon = levelIcons[i] || Target;
            const completed = level.drills.filter((d) =>
              completedDrills.has(d.id),
            ).length;
            return (
              <div
                key={level.id}
                className="bg-card rounded-xl p-4 shadow-card"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Icon className="h-4 w-4 text-primary" />
                  <span className="text-sm font-bold flex-1">
                    {level.title}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {completed}/{level.drills.length}
                  </span>
                </div>
                <ProgressBar current={completed} total={level.drills.length} />
              </div>
            );
          })}
        </div>

        {/* By Category - alternating styles */}
        <h2 className="text-lg font-bold mb-3">By Category</h2>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(categories).map(([cat, { total, completed }]) => {
            return (
              <div
                key={cat}
                className="bg-card rounded-xl p-4 shadow-card flex flex-col items-center border border-primary/30 bg-primary/5"
              >
                <div className="text-xs text-muted-foreground mb-2 font-medium">
                  {cat}
                </div>

                <SemiCircleProgress current={completed} total={total} label={cat} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Progress;
