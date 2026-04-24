import { useState } from "react";
import UserHeader from "@/components/UserHeader";
import DrillCard from "@/components/DrillCard";
import DrillPreviewCard from "@/components/DrillPreviewCard";
import ProgressBar from "@/components/ProgressBar";
import { trainingLevels, type Drill } from "@/data/trainingData";
import { useCompletedDrills } from "@/hooks/useCompletedDrills";
import { Trophy, Target, Zap, Star, ArrowLeft, Flame } from "lucide-react";
import PageWrapper from "@/components/PageWrapper";

const levelIcons = [Target, Zap, Star, Trophy];
const difficultyColor = {
  Easy: "text-green-400",
  Medium: "text-yellow-400",
  Hard: "text-red-400",
};
const Training = () => {
  const [activeLevel, setActiveLevel] = useState(0);
  const [selectedDrill, setSelectedDrill] = useState<Drill | null>(null);
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

  if (selectedDrill) {
    return (
      <PageWrapper>
        <div className="relative w-full h-[86vh] flex flex-1 fixed">
          <button
            onClick={() => setSelectedDrill(null)}
            className="absolute z-10 top-4 left-4 flex items-center gap-2 px-4 py-1 rounded-full bg-background border border-border shadow-md transition-all group-hover:bg-secondary  text-sm font-bold text-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4 " /> Back
          </button>
          <span
            className={`flex items-center gap-1 absolute z-10 top-4 right-4 ${difficultyColor[selectedDrill.difficulty]}`}
          >
            <Flame className="h-3.5 w-3.5" /> {selectedDrill.difficulty}
          </span>
          <DrillCard
            id={selectedDrill.id}
            title={selectedDrill.title}
            description={selectedDrill.description}
            duration={selectedDrill.duration}
            difficulty={selectedDrill.difficulty}
            category={selectedDrill.category}
            completed={completedDrills.has(selectedDrill.id)}
            onToggle={() => toggle(selectedDrill.id)}
          />
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="px-4 py-6">
        <div className=" text-start mb-6">
          <h1 className="text-2xl font-black mb-1">Training Program</h1>
          <p className="text-sm text-muted-foreground">
            Complete each level to unlock the next
          </p>
        </div>

        <div className="flex gap-2 overflow-x-auto py-3 mb-4 scrollbar-hide">
          {trainingLevels.map((level, i) => {
            const unlocked = isLevelUnlocked(i);
            const completed = isLevelCompleted(i);
            return (
              <button
                key={level.id}
                onClick={() => unlocked && setActiveLevel(i)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  activeLevel === i
                    ? "bg-gradient-fire text-primary-foreground shadow-glow"
                    : unlocked
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-muted text-muted-foreground opacity-50"
                } ${completed ? "ring-2 ring-green-500/50" : ""}`}
                disabled={!unlocked}
              >
                <span className="text-green-500/50">{completed ? "✓ " : ""}</span>
                {level.title}
              </button>
            );
          })}
        </div>

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
        <div className="mb-4">
          <ProgressBar
            current={completedInLevel}
            total={currentLevel.drills.length}
          />
        </div>

        <div className="space-y-3">
          {currentLevel.drills.map((drill) => (
            <DrillPreviewCard
              key={drill.id}
              drill={drill}
              completed={completedDrills.has(drill.id)}
              onClick={() => setSelectedDrill(drill)}
            />
          ))}
        </div>
      </div>
    </PageWrapper>
  );
};

export default Training;
