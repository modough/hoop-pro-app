interface RadialProgressProps {
  current: number;
  total: number;
  label?: string;
  size?: number;
}

const RadialProgress = ({ current, total, label, size = 64 }: RadialProgressProps) => {
  const pct = total > 0 ? Math.round((current / total) * 100) : 0;
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="w-full h-full -rotate-90" viewBox={`0 0 ${size} ${size}`}>
          <circle
            cx={size / 2} cy={size / 2} r={radius}
            fill="none" className="stroke-secondary" strokeWidth="6"
          />
          <circle
            cx={size / 2} cy={size / 2} r={radius}
            fill="none" className="stroke-primary" strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.5s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold text-foreground">{pct}%</span>
        </div>
      </div>
      {label && <span className="text-[10px] text-muted-foreground text-center">{label}</span>}
    </div>
  );
};

export default RadialProgress;
