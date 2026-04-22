import { useState, useMemo, useRef, useEffect } from "react";
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

const containerRef = useRef<HTMLDivElement | null>(null);
const todayRef = useRef<HTMLDivElement | null>(null);

useEffect(() => {
  if (containerRef.current && todayRef.current) {
    const container = containerRef.current;
    const el = todayRef.current;

    const offset =
      el.offsetLeft - container.clientWidth / 2 + el.clientWidth / 2;

    container.scrollTo({
      left: offset,
      behavior: "smooth",
    });
  }
}, [dailyLogs]);

const points = dailyLogs
  .map((d, i) => {
    const x = (i / (dailyLogs.length - 1)) * 100;
    const y = 100 - (d.minutes / maxMinutes) * 100;
    return `${x},${y}`;
  })
  .join(" ");
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
console.log('dailyLogs', dailyLogs)
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
     <div className="overflow-x-auto" ref={containerRef}>
  <div className="relative">

    {/* Bars */}
    <div className="relative flex items-end gap-2 h-32">
      {dailyLogs.map(({ date, minutes }) => {
        const barHeight =
          minutes > 0 ? Math.max((minutes / maxMinutes) * 100, 8) : 0;
        const isToday = date === todayStr;

        return (
          <div
            key={date}
            ref={isToday ? todayRef : null}
            className="flex-1 flex flex-col items-center justify-end h-full relative"
            style={{ minWidth: "15px" }}
          >
            <span
              className="absolute text-xs"
              style={{ bottom: `${barHeight * 0.5}px` }}
            >
              {minutes >= 1 ? minutes : null}
            </span>

            <div
              className={`w-full rounded-t-full transition-all duration-300 ${
                isToday
                  ? "bg-primary"
                  : minutes > 0
                  ? "bg-primary/60"
                  : "bg-secondary"
              }`}
              style={{ height: minutes > 0 ? `${barHeight}%` : "2px" }}
            />
          </div>
        );
      })}
    </div>

    {/* Days */}
    <div className="flex gap-2 mt-1">
      {dailyLogs.map(({ date }) => {
        const day = parseInt(date.split("-")[2]);
        return (
          <div key={date} className="flex-1 text-center" style={{ minWidth: "15px" }}>
            <span className="text-[9px] text-muted-foreground">{day}</span>
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
