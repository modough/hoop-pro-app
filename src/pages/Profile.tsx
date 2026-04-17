import { trainingLevels } from "@/data/trainingData";
import { User, Award, Calendar, RotateCcw, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMemo } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const completedDrills: Set<string> = useMemo(() => {
    const saved = localStorage.getItem("completedDrills");
    return saved ? new Set(JSON.parse(saved)) : new Set();
  }, []);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const totalDrills = trainingLevels.reduce(
    (sum, lvl) => sum + lvl.drills.length,
    0,
  );
  const totalCompleted = trainingLevels.reduce(
    (sum, lvl) =>
      sum + lvl.drills.filter((d) => completedDrills.has(d.id)).length,
    0,
  );

  const currentLevelIndex = trainingLevels.findIndex(
    (lvl) => !lvl.drills.every((d) => completedDrills.has(d.id)),
  );
  const currentLevel =
    currentLevelIndex >= 0
      ? trainingLevels[currentLevelIndex]
      : trainingLevels[trainingLevels.length - 1];

  const rank =
    totalCompleted === totalDrills
      ? "🏆 Pro Elite"
      : totalCompleted >= 30
        ? "⭐ Advanced"
        : totalCompleted >= 20
          ? "⚡ Intermediate"
          : totalCompleted >= 10
            ? "🎯 Beginner+"
            : "🏀 Rookie";

  const handleReset = () => {
    if (window.confirm("Reset all progress? This cannot be undone.")) {
      localStorage.removeItem("completedDrills");
      window.location.reload();
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth", { replace: true });
  };

  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-black mb-6">Profile</h1>

      {/* Avatar */}
      <div className="flex flex-col items-center mb-8">
        <div className="h-20 w-20 rounded-full bg-gradient-fire flex items-center justify-center mb-3 shadow-glow">
          <User className="h-10 w-10 text-primary-foreground" />
        </div>
        <div className="text-xl font-bold">Basketball Trainee</div>
        <div className="text-sm text-muted-foreground mt-1">{rank}</div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        <div className="bg-card rounded-xl p-4 text-center shadow-card">
          <Award className="h-5 w-5 text-primary mx-auto mb-1" />
          <div className="text-lg font-bold">{totalCompleted}</div>
          <div className="text-[10px] text-muted-foreground uppercase">
            Drills Done
          </div>
        </div>
        <div className="bg-card rounded-xl p-4 text-center shadow-card">
          <Calendar className="h-5 w-5 text-primary mx-auto mb-1" />
          <div className="text-lg font-bold">{trainingLevels.length}</div>
          <div className="text-[10px] text-muted-foreground uppercase">
            Levels
          </div>
        </div>
        <div className="bg-card rounded-xl p-4 text-center shadow-card">
          <div className="text-primary text-lg mb-1">🔥</div>
          <div className="text-lg font-bold">
            {Math.round((totalCompleted / totalDrills) * 100)}%
          </div>
          <div className="text-[10px] text-muted-foreground uppercase">
            Complete
          </div>
        </div>
      </div>

      {/* Current Level */}
      <div className="bg-card rounded-xl p-5 shadow-card mb-6">
        <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
          Current Level
        </div>
        <div className="text-lg font-bold text-gradient-fire">
          {currentLevel.title}
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          {currentLevel.description}
        </p>
      </div>

      <div className="space-y-3">
        <Button
          variant="outline"
          className="w-full border-destructive/30 text-destructive hover:bg-destructive/10"
          onClick={handleReset}
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset All Progress
        </Button>
        <Button variant="secondary" className="w-full" onClick={handleSignOut}>
          <LogOut className="h-4 w-4 mr-2" />
          Sign out
        </Button>
      </div>
    </div>
  );
};

export default Profile;
