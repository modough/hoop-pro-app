interface StatCardProps {
  current: number;
  total: number;
  label?: string;
}

const StatCard = ({ current, total, label }: StatCardProps) => {
  const pct = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className="text-center">
      {label && <div className="text-[10px] text-muted-foreground mb-1">{label}</div>}
      <div className="text-2xl font-black text-foreground">{pct}%</div>
      <div className="text-xs text-muted-foreground mb-2">{current}/{total}</div>
      <div className="h-1 rounded-full bg-secondary overflow-hidden mx-auto w-16">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};

export default StatCard;
