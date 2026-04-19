import { useState, useEffect, useRef, useCallback } from "react";
import { Clock, Flame, CheckCircle2, Circle, PlayCircle, Pause, RotateCcw, X, Video } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { drillVideos } from "@/data/drillVideos";
import { drillImages } from "@/data/drillImages";
import { addTrainingMinutes } from "@/hooks/useTrainingLog";
import { useAuth } from "@/contexts/AuthContext";


interface DrillCardProps {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
  completed: boolean;
  onToggle: () => void;
}

const difficultyColor = {
  Easy: "text-green-400",
  Medium: "text-yellow-400",
  Hard: "text-red-400",
};

const parseDuration = (duration: string): number => {
  const match = duration.match(/(\d+)/);
  return match ? parseInt(match[1]) * 60 : 300;
};

const formatTime = (seconds: number): string => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
};

const DrillCard = ({ id, title, description, duration, difficulty, category, completed, onToggle }: DrillCardProps) => {
  const { user } = useAuth();
 
  const [expanded, setExpanded] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(() => parseDuration(duration));
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const loggedSecondsRef = useRef(0); // seconds already saved to DB this session
  const totalTime = parseDuration(duration);

  const videoUrl = drillVideos[id];
  const imageUrl = drillImages[id];

  // Flush elapsed (unsaved) seconds to training_log as whole minutes.
  // Keeps a leftover-seconds remainder for the next flush so nothing is lost.
  const flushProgress = useCallback(() => {
    const elapsedSeconds = totalTime - timeLeft;
    const unsavedSeconds = elapsedSeconds - loggedSecondsRef.current;
    if (unsavedSeconds <= 0) return;
    const minutesToLog = Math.floor(unsavedSeconds / 60);
    if (minutesToLog <= 0) return;
    loggedSecondsRef.current += minutesToLog * 60;
    void addTrainingMinutes(minutesToLog, user?.id);
  }, [totalTime, timeLeft, user?.id]);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, timeLeft]);

  // Periodically flush every minute while running
  useEffect(() => {
    if (!timerActive) return;
    const elapsed = totalTime - timeLeft;
    if (elapsed > 0 && elapsed % 60 === 0) {
      flushProgress();
    }
  }, [timeLeft, timerActive, totalTime, flushProgress]);

  const handlePlay = () => {
    setTimerActive(true);
    setTimeLeft(parseDuration(duration));
    setIsRunning(true);
    loggedSecondsRef.current = 0;
  };

  // When timer hits 0: flush remainder (round up partial minute) + auto-complete
  useEffect(() => {
    if (timerActive && timeLeft === 0) {
      const unsavedSeconds = totalTime - loggedSecondsRef.current;
      if (unsavedSeconds > 0) {
        const minutes = Math.max(1, Math.round(unsavedSeconds / 60));
        loggedSecondsRef.current = totalTime;
        void addTrainingMinutes(minutes, user?.id);
      }
      if (!completed) onToggle();
    }
  }, [timeLeft, timerActive, totalTime, completed, onToggle, user?.id]);

  const handleReset = () => {
    flushProgress();
    setTimeLeft(totalTime);
    setIsRunning(false);
    loggedSecondsRef.current = 0;
  };

  const handleClose = () => {
    flushProgress();
    setTimerActive(false);
    setIsRunning(false);
    setTimeLeft(totalTime);
    loggedSecondsRef.current = 0;
  };

  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  return (
    <div className={`rounded-xl border overflow-hidden transition-all duration-300 ${
      completed ? "bg-primary/5 border-primary/30" : "bg-card border-border hover:border-primary/30"
    }`}>
      {imageUrl && (
        <div className="relative h-36 w-full overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            loading="lazy"
            width={512}
            height={512}
            className={`w-full h-full object-cover transition-all duration-300 ${completed ? "opacity-60 grayscale" : ""}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
        </div>
      )}
      <div className="p-5">
      <div className="flex items-start gap-4">
        <button onClick={onToggle} className="mt-0.5 shrink-0">
          {completed ? (
            <CheckCircle2 className="h-6 w-6 text-primary" />
          ) : (
            <Circle className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
          )}
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1 flex-wrap">
            <h4 className={`font-semibold ${completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
              {title}
            </h4>
            <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground font-medium">
              {category}
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {duration}
            </span>
            <span className={`flex items-center gap-1 ${difficultyColor[difficulty]}`}>
              <Flame className="h-3.5 w-3.5" /> {difficulty}
            </span>
          </div>

          {timerActive && (
            <div className="mt-3 rounded-lg bg-secondary/50 border border-border p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Drill Timer</span>
                <button onClick={handleClose} className="text-muted-foreground hover:text-foreground transition-colors">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className={`text-4xl font-mono font-bold text-center mb-3 ${timeLeft === 0 ? "text-primary animate-pulse" : "text-foreground"}`}>
                {formatTime(timeLeft)}
              </div>
              <div className="w-full h-2 rounded-full bg-muted mb-3 overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-1000"
                  style={{ width: `${progress}%` }}
                />
              </div>
              {timeLeft === 0 && (
                <p className="text-center text-sm text-primary font-semibold mb-3">🏀 Drill Complete!</p>
              )}
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => setIsRunning(!isRunning)}
                  disabled={timeLeft === 0}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {isRunning ? <Pause className="h-4 w-4" /> : <PlayCircle className="h-4 w-4" />}
                  {isRunning ? "Pause" : "Resume"}
                </button>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted text-muted-foreground font-medium text-sm hover:text-foreground transition-colors"
                >
                  <RotateCcw className="h-4 w-4" /> Reset
                </button>
              </div>
            </div>
          )}

          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs text-primary hover:underline mt-2"
          >
            {expanded ? "Hide details" : "Show details"}
          </button>
          {expanded && (
            <div className="mt-2 space-y-3">
              <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
              <button
                onClick={() => setVideoOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary font-medium text-sm hover:bg-primary/20 transition-colors"
              >
                <Video className="h-5 w-5" /> Watch Drill Video
              </button>
            </div>
          )}
        </div>
        <button
          onClick={handlePlay}
          className="shrink-0 text-muted-foreground hover:text-primary transition-colors"
        >
          <PlayCircle className="h-8 w-8" />
        </button>
      </div>

      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogContent className="sm:max-w-lg" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <div className="aspect-video rounded-lg bg-muted overflow-hidden">
            {videoUrl ? (
              <iframe
                src={videoUrl}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center space-y-3">
                  <Video className="h-12 w-12 text-muted-foreground mx-auto" />
                  <p className="text-sm text-muted-foreground">Video not available</p>
                </div>
              </div>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
        </DialogContent>
      </Dialog>
      </div>
    </div>
  );
};

export default DrillCard;
