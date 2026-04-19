import { useState, useCallback } from "react";
import DrillCard from "@/components/DrillCard";
import { trainingLevels } from "@/data/trainingData";
import { Trophy, Target, Zap, Star } from "lucide-react";
import UserHeader from "@/components/UserHeader";
import { useCompletedDrills } from "@/hooks/useCompletedDrills";
import PageWrapper from "@/components/PageWrapper";

const levelIcons = [Target, Zap, Star, Trophy];

const Training = () => {
  const [activeLevel, setActiveLevel] = useState(0);
  const { completed: completedDrills, toggle } = useCompletedDrills();

 

  const isLevelUnlocked = (index: number) => {
    if (index === 0) return true;
    const prevLevel = trainingLevels[index - 1];
    return prevLevel.drills.every((d) => completedDrills.has(d.id));
  };

  const isLevelCompleted = (index: number) =>
    trainingLevels[index].drills.every((d) => completedDrills.has(d.id));

  const currentLevel = trainingLevels[activeLevel];
  const completedInLevel = currentLevel.drills.filter((d) =>
    completedDrills.has(d.id),
  ).length;

  return (
    <PageWrapper>
      <div>
      
        <div className="px-4 py-6">
          {/* Header */}
          <div className=" mb-4">
            <h1 className="text-2xl font-black mb-1">Training Program</h1>
            <p className="text-sm text-muted-foreground">
              Complete each level to unlock the next
            </p>
          </div>
          {/* Level Tabs */}
          <div className="flex gap-2 overflow-x-auto px-1 py-3 mb-10 mt-4 scrollbar-hide">
            {trainingLevels.map((level, i) => {
              const unlocked = isLevelUnlocked(i);
              const completed = isLevelCompleted(i);
              return (
                <button
                  key={level.id}
                  onClick={() => unlocked && setActiveLevel(i)}
                  className={`flex-shrink-0 p-3 rounded-full text-sm font-bold transition-all ${
                    activeLevel === i
                      ? "bg-gradient-fire text-primary-foreground shadow-glow"
                      : unlocked
                        ? "bg-secondary text-secondary-foreground"
                        : "bg-muted text-muted-foreground opacity-50"
                  } ${completed ? "ring-2 ring-green-500/50" : ""}`}
                  disabled={!unlocked}
                >
                  {completed ? "✓ " : ""}
                  {level.title}
                </button>
              );
            })}
          </div>
          {/* Level Progress */}
          <div className="flex items-center gap-3 mb-4">
            {(() => {
              const Icon = levelIcons[activeLevel] || Target;
              return <Icon className="h-5 w-5 text-primary" />;
            })()}
            <h2 className="text-lg font-bold flex-1">{currentLevel.title}</h2>
            <span className="text-xs text-muted-foreground">
              {completedInLevel}/{currentLevel.drills.length}
            </span>
          </div>
          {/* Drills */}
          <div className="space-y-3">
            {currentLevel.drills.map((drill) => (
              <DrillCard
                key={drill.id}
                id={drill.id}
                title={drill.title}
                description={drill.description}
                duration={drill.duration}
                difficulty={drill.difficulty}
                category={drill.category}
                completed={completedDrills.has(drill.id)}
                onToggle={() => toggle(drill.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Training;
