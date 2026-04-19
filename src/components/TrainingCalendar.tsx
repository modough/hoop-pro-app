import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTrainingLog } from "@/hooks/useTrainingLog";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const TrainingCalendar = () => {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const { getDailyLogs, getMonthTotal } = useTrainingLog();

  const dailyLogs = useMemo(() => getDailyLogs(year, month), [getDailyLogs, year, month]);
  const monthTotal = useMemo(() => getMonthTotal(year, month), [getMonthTotal, year, month]);
  const maxMinutes = useMemo(() => Math.max(...dailyLogs.map((d) => d.minutes), 1), [dailyLogs]);
console.log("dailyLogs", dailyLogs)
  const prev = () => {
    if (month === 0) { setMonth(11); setYear(year - 1); }
    else setMonth(month - 1);
  };
  const next = () => {
    if (month === 11) { setMonth(0); setYear(year + 1); }
    else setMonth(month + 1);
  };

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  return (
    <div className="bg-card rounded-xl p-4 shadow-card border border-primary/30">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={prev} className="p-1 rounded-lg hover:bg-secondary transition-colors">
          <ChevronLeft className="h-5 w-5 text-muted-foreground" />
        </button>
        <div className="text-center">
          <h3 className="text-sm font-bold">{MONTH_NAMES[month]} {year}</h3>
          <p className="text-xs text-muted-foreground">{(Math.floor(monthTotal))} min total</p>
        </div>
        <button onClick={next} className="p-1 rounded-lg hover:bg-secondary transition-colors">
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </button>
      </div>

      {/* Bar chart + Day labels in single scroll container */}
      <div className="overflow-x-auto">
        <div style={{ minWidth: `${dailyLogs.length * 14}px` }}>
          <div className="flex items-end gap-2 h-32">
            {dailyLogs.map(({ date, minutes }) => {
              const barHeight = minutes > 0 ? Math.max((minutes / maxMinutes) * 100, 8) : 0;
              const isToday = date === todayStr;
              return (
                <div
                  key={date}
                  className="flex-1 flex flex-col items-center justify-end h-full group relative"
                  style={{ minWidth: "10px" }}
                >
                  {minutes > 0 && (
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-foreground text-background text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                      {Math.floor(minutes)} min
                    </div>
                  )}
                  <div
                    className={`w-full rounded-t transition-all duration-300 ${
                      isToday ? "bg-primary" : minutes > 0 ? "bg-primary/60" : "bg-secondary"
                    }`}
                    style={{ height: minutes > 0 ? `${barHeight}%` : "2px" }}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex gap-1 mt-1">
            {dailyLogs.map(({ date }) => {
              const day = parseInt(date.split("-")[2]);
              const show = day === 1 || day % 5 === 0;
              return (
                <div key={date} className="flex-1 text-center" style={{ minWidth: "10px" }}>
                  {show && <span className="text-[9px] text-muted-foreground">{day}</span>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingCalendar;
