interface SemiCircleProgressProps {
  current: number;
  total: number;
  label?: string;
}

const SemiCircleProgress = ({
  current,
  total,
  label,
}: SemiCircleProgressProps) => {
  const pct = total > 0 ? Math.round((current / total) * 100) : 0;
  const radius = 40;
  const circumference = Math.PI * radius; // half circle
  const offset = circumference - (pct / 100) * circumference;
  
  let value: number;

  switch (label) {
    case "Finishing":
      value = 80;
      break;
    case "Defense":
      value = 60;
      break;
    case "Shooting":
      value = 90;
      break;
    case "Passing":
      value = 90;
      break;
    case "Dribbling":
      value = 70;
      break;
    case "Footwork":
      value = 90;
      break;
    default:
      value = 100;
  }
  const centerX = 50;
  const centerY = 50;

  const angle = (value / 100) * Math.PI;

  const x = centerX + radius * Math.cos(Math.PI - angle);
  const y = centerY - radius * Math.sin(Math.PI - angle);

  const d = `M 10 50 A 40 40 0 0 1 ${x} ${y}`;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: 100, height: 56 }}>
        <svg className="w-full h-full" viewBox="0 0 100 56">
          <path
            d={d}
            fill="none"
            className="stroke-secondary"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <path
            d={d}
            fill="none"
            className="stroke-primary"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.5s ease" }}
          />
        </svg>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
          <span className="text-sm font-bold text-foreground">{pct}%</span>
        </div>
      </div>
    </div>
  );
};

export default SemiCircleProgress;
