import { User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { trainingLevels } from "@/data/trainingData";

import ProgressBar from "./ProgressBar";


const UserHeader = ({ completedDrills }: { completedDrills: Set<string> }) => {
  

  const totalDrills = trainingLevels.reduce((sum, lvl) => sum + lvl.drills.length, 0);
  const totalCompleted = trainingLevels.reduce(
    (sum, lvl) => sum + lvl.drills.filter((d) => completedDrills.has(d.id)).length, 0
  );

  const rank = totalCompleted === totalDrills
    ? "Pro Elite"
    : totalCompleted >= 30
    ? "Advanced"
    : totalCompleted >= 20
    ? "Intermediate"
    : totalCompleted >= 10
    ? "Beginner+"
    : "Rookie";

  const pct = Math.round((totalCompleted / totalDrills) * 100);

  return (
    <header className="sticky top-0 z-50">
        <div className="flex items-center gap-3 px-4 py-3 bg-card border-b border-border">
          <Avatar className="h-10 w-10 shadow-md">
            <AvatarFallback className="bg-gradient-fire text-primary-foreground font-bold">
              <User className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-bold truncate">Basketball Trainee</div>
            <div className="text-xs text-muted-foreground">{rank}</div>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold text-primary">{pct}%</div>
            <div className="text-[10px] text-muted-foreground">{totalCompleted}/{totalDrills} drills</div>
            <ProgressBar current={totalCompleted} total={totalDrills} />
          </div>
        </div>
    </header>
  );
};

export default UserHeader;
