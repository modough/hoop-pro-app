import { Flame } from "lucide-react";
import { useStreak } from "@/hooks/useStreak";
import { useLanguage } from "@/contexts/LanguageContext";

const StreakCard = () => {
  const { t } = useLanguage();
  const { current, longest, trainedToday } = useStreak();

  return (
    <div className="card-3d rounded-xl p-4 flex items-center gap-4">
      <div
        className={`flex items-center justify-center h-14 w-14 rounded-full shadow-md ${
          current > 0 ? "bg-gradient-fire" : "bg-secondary"
        }`}
      >
        <Flame
          className={`h-7 w-7 ${current > 0 ? "text-primary-foreground" : "text-muted-foreground"}`}
        />
      </div>
      <div className="flex-1">
        <div className="text-2xl font-black leading-none">
          {current} <span className="text-sm font-semibold text-muted-foreground">{t("streak.dayStreak")}</span>
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          {t("streak.longest")} <span className="font-bold text-foreground">{longest}</span> {t("streak.days")}
          {!trainedToday && current > 0 && (
            <span className="ml-2 text-primary font-semibold">{t("streak.trainToday")}</span>
          )}
          {trainedToday && current > 0 && (
            <span className="ml-2 text-primary font-semibold">{t("streak.lockedIn")}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default StreakCard;
