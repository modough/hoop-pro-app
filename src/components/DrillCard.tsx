import { useState, useEffect, useRef } from "react";
import {
  Clock,
  Flame,
  CheckCircle2,
  Circle,
  PlayCircle,
  Pause,
  RotateCcw,
  X,
  Video,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { drillVideos } from "@/data/drillVideos";
import { drillImages } from "@/data/drillImages";
import { useTrainingMinutes } from "@/hooks/useTrainingLog";

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

/* =========================
   HELPERS
========================= */

const parseDuration = (duration: string): number => {
  const match = duration.match(/(\d+)/);
  return match ? parseInt(match[1]) * 60 : 300;
};

const formatTime = (seconds: number): string => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
};

/* =========================
   COMPONENT
========================= */

const DrillCard = ({
  id,
  title,
  description,
  duration,
  difficulty,
  category,
  completed,
  onToggle,
}: DrillCardProps) => {
  const { addMinutes } = useTrainingMinutes(); // ✅ correct usage

  const [expanded, setExpanded] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const totalTime = parseDuration(duration);
  const [timeLeft, setTimeLeft] = useState(totalTime);
  console.log("timeLeft", timeLeft);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const videoUrl = drillVideos[id];
  const imageUrl = drillImages[id];

  const progress = ((totalTime - timeLeft) / totalTime) * 100;
  console.log("progress", progress);
  const elapsedRef = useRef(0);

  /* =========================
     TIMER LOGIC
  ========================= */

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

        // ✅ track elapsed time
        elapsedRef.current += 1;
      }, 1000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, timeLeft]);

  /* =========================
     SAVE MINUTES ON COMPLETE
  ========================= */

  useEffect(() => {
    
    if (elapsedRef.current >= 60) {
      const minutes = Math.floor(elapsedRef.current / 60);

      addMinutes(minutes);

      // keep remainder seconds
      elapsedRef.current = elapsedRef.current % 60;
    }
  }, [timeLeft, addMinutes]);

  useEffect(() => {
  if (!isRunning && elapsedRef.current > 0) {
    const minutes = elapsedRef.current / 60;

    if (minutes > 0) {
      addMinutes(minutes);
    }

    elapsedRef.current = 0;
  }
}, [isRunning, addMinutes]);

  /* =========================
     ACTIONS
  ========================= */

  const handlePlay = () => {
    setTimerActive(true);
    setTimeLeft(totalTime);
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleResume = () => {
    setIsRunning(true);
  };

  const handleReset = () => {
    setTimeLeft(totalTime);
    setIsRunning(false);
  };

  const handleClose = () => {
    setTimerActive(false);
    setIsRunning(false);
    setTimeLeft(totalTime);
  };


  return (
    <div
      className={`rounded-xl border overflow-hidden transition-all duration-300 ${
        completed
          ? "bg-primary/5 border-primary/30"
          : "bg-card border-border hover:border-primary/30"
      }`}
    >
      {/* IMAGE */}
      {imageUrl && (
        <div className="relative h-36 w-full overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className={`w-full h-full object-cover ${
              completed ? "opacity-60 grayscale" : ""
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
        </div>
      )}

      <div className="p-5">
        <div className="flex items-start gap-4">
          {/* TOGGLE */}
          <button onClick={onToggle}>
            {completed ? (
              <CheckCircle2 className="h-6 w-6 text-primary" />
            ) : (
              <Circle className="h-6 w-6 text-muted-foreground hover:text-primary" />
            )}
          </button>

          {/* CONTENT */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1 flex-wrap">
              <h4
                className={`font-semibold ${
                  completed ? "line-through text-muted-foreground" : ""
                }`}
              >
                {title}
              </h4>

              <span className="text-xs px-2 py-0.5 rounded-full bg-secondary">
                {category}
              </span>
            </div>

            <div className="flex gap-4 text-sm text-muted-foreground mb-2">
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> {duration}
              </span>
              <span
                className={`flex items-center gap-1 ${difficultyColor[difficulty]}`}
              >
                <Flame className="h-3.5 w-3.5" /> {difficulty}
              </span>
            </div>

            {/* TIMER */}
            {timerActive && (
              <div className="mt-3 p-4 border rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-xs uppercase">Timer</span>
                  <button onClick={handleClose}>
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="text-3xl font-mono text-center mb-2">
                  {formatTime(timeLeft)}
                </div>

                <div className="w-full h-2 bg-muted rounded mb-3">
                  <div
                    className="h-full bg-primary"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {timeLeft === 0 && (
                  <p className="text-center text-primary">🏀 Drill Complete!</p>
                )}

                <div className="flex justify-center gap-3 mt-3">
                  {isRunning ? (
                    <button onClick={handlePause}>
                      <Pause />
                    </button>
                  ) : (
                    <button onClick={handleResume} disabled={timeLeft === 0}>
                      <PlayCircle />
                    </button>
                  )}

                  <button onClick={handleReset}>
                    <RotateCcw />
                  </button>
                </div>
              </div>
            )}

            {/* DETAILS */}
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-xs text-primary mt-2"
            >
              {expanded ? "Hide details" : "Show details"}
            </button>

            {expanded && (
              <div className="mt-2 space-y-3">
                <p className="text-sm text-muted-foreground">{description}</p>

                <button
                  onClick={() => setVideoOpen(true)}
                  className="flex items-center gap-2 text-sm text-primary"
                >
                  <Video className="h-4 w-4" /> Watch Video
                </button>
              </div>
            )}
          </div>

          {/* PLAY BUTTON */}
          <button onClick={handlePlay}>
            <PlayCircle className="h-8 w-8" />
          </button>
        </div>

        {/* VIDEO MODAL */}
        <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
            </DialogHeader>

            <div className="aspect-video">
              {videoUrl ? (
                <iframe
                  src={videoUrl}
                  className="w-full h-full"
                  allowFullScreen
                />
              ) : (
                <p>No video available</p>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default DrillCard;
