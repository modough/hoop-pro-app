import { Clock, Flame, CheckCircle2 } from "lucide-react";
import { drillImages } from "@/data/drillImages";

interface Drill {
  id: string;
  title: string;
  duration: string;
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
  description: string;
}

interface DrillPreviewCardProps {
  drill: Drill;
  completed: boolean;
  onClick: () => void;
}

const difficultyColor = {
  Easy: "text-green-400",
  Medium: "text-yellow-400",
  Hard: "text-red-400",
};

const DrillPreviewCard = ({ drill, completed, onClick }: DrillPreviewCardProps) => {
  const imageUrl = drillImages[drill.id];

  return (
    <button
      onClick={onClick}
      className={`w-full text-left rounded-xl border overflow-hidden transition-all duration-300 ${
        completed
          ? "bg-primary/5 border-primary/30"
          : "bg-card border-border hover:border-primary/30"
      }`}
    >
      {imageUrl && (
        <div className="relative h-36 w-full overflow-hidden">
          <img
            src={imageUrl}
            alt={drill.title}
            loading="lazy"
            width={512}
            height={512}
            className={`w-full h-full object-cover transition-all duration-300 ${
              completed ? "opacity-60 grayscale" : ""
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
          {completed && (
            <div className="absolute top-2 right-2">
              <CheckCircle2 className="h-6 w-6 text-primary drop-shadow-lg" />
            </div>
          )}
        </div>
      )}

      <div className="p-4">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <h4
            className={`font-semibold flex-1 ${
              completed ? "line-through text-muted-foreground" : "text-foreground"
            }`}
          >
            {drill.title}
          </h4>
          <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground font-medium">
            {drill.category}
          </span>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {drill.duration}
          </span>
          <span className={`flex items-center gap-1 ${difficultyColor[drill.difficulty]}`}>
            <Flame className="h-3.5 w-3.5" /> {drill.difficulty}
          </span>
        </div>
      </div>
    </button>
  );
};

export default DrillPreviewCard;
