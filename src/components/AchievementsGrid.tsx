import { useLanguage } from "@/contexts/LanguageContext";
import { achievements, type AchievementContext } from "@/data/achievements";
import { Lock, ShieldCheck } from "lucide-react";

interface Props {
  ctx: AchievementContext;
}

const AchievementsGrid = ({ ctx }: Props) => {
  const { t } = useLanguage();
  const evaluated = achievements.map((a) => ({ ...a, ...a.evaluate(ctx) }));
  const unlockedCount = evaluated.filter((a) => a.unlocked).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold">{t("achievements.title")}</h2>
        <span className="text-xs font-semibold text-muted-foreground">
          {unlockedCount}/{achievements.length} {t("achievements.unlocked")}
        </span>
      </div>
      <div className="flex gap-2 overflow-x-auto py-3 mb-4 scrollbar-hide">
        {evaluated.map((a) => {
          return (
            <div
              key={a.id}
              className={`min-w-[50%] rounded-xl p-4 shadow-card flex flex-col items-center border border-primary/30  ${
                a.unlocked ? "bg-gradient-fire" : "opacity-60"
              }`}
            >
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center mb-2 shadow-md ${
                  a.unlocked ? "" : "bg-secondary"
                }`}
              >
                {a.unlocked ? (
                  <ShieldCheck className="h-full w-full text-green-700" />
                ) : (
                  <Lock className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
              <div className="text-xs font-bold leading-tight">{t(`ach.${a.id}.title`)}</div>
              <div className="text-[10px] mt-1 leading-tight">
                {t(`ach.${a.id}.desc`)}
              </div>
              <div className="mt-2 w-full">
                <div className="h-1 w-full rounded-full bg-secondary overflow-hidden">
                  <div
                    className="h-full bg-primary  transition-all"
                    style={{ width: `${a.progress * 100}%` }}
                  />
                </div>

                <div className="text-[10px] mt-1">{a.valueLabel === "Done"
                    ? t("achievements.done")
                    : a.valueLabel.replace(" days", ` ${t("achievements.days")}`)}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AchievementsGrid;
