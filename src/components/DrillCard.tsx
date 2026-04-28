import { useState, useEffect, useRef, useCallback } from "react";
import {
  Clock,
  Flame,
  CheckCircle2,
  Circle,
  PlayCircle,
  Pause,
  RotateCcw,
  Video,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { drillVideos } from "@/data/drillVideos";
import { drillImages } from "@/data/drillImages";
import { addTrainingMinutes } from "@/hooks/useTrainingLog";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

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

const DrillCard = ({
 id, title, description: rawDescription, duration, difficulty: rawDifficulty, category: rawCategory, completed, onToggle
}: DrillCardProps) => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const description = t(`drill.${id}.desc`) || rawDescription;
  const category = t(`category.${rawCategory}`) || rawCategory;
  const difficulty = t(`difficulty.${rawDifficulty}`) || rawDifficulty;
  const [expanded, setExpanded] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const totalTime = parseDuration(duration);
  const [timeLeft, setTimeLeft] = useState(totalTime);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const loggedSecondsRef = useRef(0);

  const videoUrl = drillVideos[id];
  const imageUrl = drillImages[id];

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

  useEffect(() => {
    const elapsed = totalTime - timeLeft;
    if (elapsed > 0 && elapsed % 60 === 0) {
      flushProgress();
    }
  }, [timeLeft, totalTime, flushProgress]);

  useEffect(() => {
    if (timeLeft === 0 && loggedSecondsRef.current < totalTime) {
      const unsavedSeconds = totalTime - loggedSecondsRef.current;
      if (unsavedSeconds > 0) {
        const minutes = Math.max(1, Math.round(unsavedSeconds / 60));
        loggedSecondsRef.current = totalTime;
        void addTrainingMinutes(minutes, user?.id);
      }
      if (!completed) onToggle();
    }
  }, [timeLeft, totalTime, completed, onToggle, user?.id]);

  const handleReset = () => {
    flushProgress();
    setTimeLeft(totalTime);
    setIsRunning(false);
    loggedSecondsRef.current = 0;
  };

  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  return (
    <div
      className={`flex flex-col h-full transition-all duration-300 ${
        completed ? "bg-primary/5 " : "bg-card "
      }`}
    >
      {/* Image — grows to fill all space above the panel */}
      <div className="relative flex-1 min-h-0 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          loading="lazy"
          className={`w-full h-full object-cover transition-all duration-300 ${
            completed ? "opacity-60 grayscale" : ""
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
      </div>

      {/*
        Bottom panel — always anchored at the bottom, no translate tricks needed.
        The image above simply shrinks/grows to fill the remaining space.
        The rounded top + shadow give it the "sheet" feel.
        The collapsible section expands downward, pushing the card taller,
        while the image flexes to absorb the change.
      */}
      <div className="relative rounded-t-2xl bg-card border-t border-border shadow-lg">
        {/* Drag handle / toggle button */}
        <button
          onClick={() => setExpanded((v) => !v)}
          className="absolute -top-[15px] left-1/2 -translate-x-1/2 flex items-center justify-center group"
          aria-expanded={expanded}
        >
          <div className="flex items-center gap-2 px-4 py-1 rounded-full bg-background border border-border shadow-md transition-all group-hover:bg-secondary">
            {/* left line */}
            <span className="h-[2px] w-6 bg-muted-foreground/50 rounded-full" />

            {/* chevron */}
            {expanded ? (
              <ChevronDown className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition" />
            ) : (
              <ChevronUp className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition" />
            )}

            {/* right line */}
            <span className="h-[2px] w-6 bg-muted-foreground/50 rounded-full" />
          </div>
        </button>

        <div className="p-5 pt-8">
          {/* Collapsible details */}
          <div
            className={`
              overflow-hidden transition-all duration-500 ease-in-out
              ${expanded ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}
            `}
          >
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <h4
                className={`font-semibold text-lg flex-1 ${
                  completed
                    ? "line-through text-muted-foreground"
                    : "text-foreground"
                }`}
              >
                {title}
              </h4>
              <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground font-medium">
                {category}
              </span>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> {duration}
              </span>
              <span
                className={`flex items-center gap-1 ${difficultyColor[rawDifficulty]}`}
              >
                <Flame className="h-3.5 w-3.5" /> {difficulty}
              </span>
            </div>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-3 top-0 bottom-0 w-[2px] bg-primary" />

              {description
                .split(".")
                .filter((step) => step.trim() !== "")
                .map((step, index) => (
                  <div key={index} className="relative flex gap-4 mb-4">
                    {/* Number circle */}
                    <div className="relative z-10 flex items-center justify-center h-6 min-w-6 rounded-full bg-primary text-white text-xs font-bold">
                      {index + 1}
                    </div>

                    {/* Text */}
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.trim()}.
                    </p>
                  </div>
                ))}
            </div>

            <div className="flex items-center gap-3 flex-wrap mb-4">
              <button
                onClick={() => setVideoOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary font-medium text-sm hover:bg-primary/20 transition-colors"
              >
                <Video className="h-5 w-5" /> {t("drill.watchVideo")}
              </button>
              <button
                onClick={onToggle}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground font-medium text-sm hover:bg-secondary/80 transition-colors"
              >
                {completed ? (
                  <>
                    <CheckCircle2 className="h-5 w-5 text-primary" /> {t("drill.completed")}
                  </>
                ) : (
                  <>
                    <Circle className="h-5 w-5" /> {t("drill.markComplete")}
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Timer — always visible */}
          <div className="rounded-lg bg-secondary/50 border border-border p-4">
            <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-3">
              {t("drill.timer")}
            </div>
            <div
              className={`text-4xl font-mono font-bold text-center mb-3 ${
                timeLeft === 0
                  ? "text-primary animate-pulse"
                  : "text-foreground"
              }`}
            >
              {formatTime(timeLeft)}
            </div>
            <div className="w-full h-2 rounded-full bg-muted mb-3 overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all duration-1000"
                style={{ width: `${progress}%` }}
              />
            </div>
            {timeLeft === 0 && (
              <p className="text-center text-sm text-primary font-semibold mb-3">
                {t("drill.complete")}
              </p>
            )}
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <button
                onClick={() => setIsRunning(!isRunning)}
                disabled={timeLeft === 0}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {isRunning ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <PlayCircle className="h-4 w-4" />
                )}
                {isRunning
                  ? t("drill.pause")
                  : timeLeft === totalTime
                    ? t("drill.play")
                    : t("drill.resume")}
              </button>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 bg-muted border border-border shadow-md transition-all group-hover:bg-background px-4 py-2 rounded-lg text-muted-foreground font-medium text-sm hover:text-foreground transition-colors"
              >
                <RotateCcw className="h-4 w-4" /> {t("drill.reset")}
              </button>
            </div>
          </div>
        </div>
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
                  <p className="text-sm text-muted-foreground">
                    {t("drill.videoUnavailable")}
                  </p>
                </div>
              </div>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DrillCard;
