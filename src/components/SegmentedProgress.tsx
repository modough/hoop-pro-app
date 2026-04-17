interface SegmentedProgressProps {
  current: number;
  total: number;
  label?: string;
}

const SegmentedProgress = ({ current, total, label }: SegmentedProgressProps) => {
  const segments = Array.from({ length: total }, (_, i) => i < current);

  return (
    <div>
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-foreground">{label}</span>
          <span className="text-sm text-muted-foreground">{current}/{total}</span>
        </div>
      )}
      <div className="flex gap-1">
        {segments.map((filled, i) => (
          <div
            key={i}
            className={`h-2.5 flex-1 rounded-sm transition-colors duration-300 ${
              filled ? "bg-primary" : "bg-secondary"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default SegmentedProgress;
