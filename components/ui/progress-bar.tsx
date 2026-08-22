type ProgressBarProps = {
  value: number;
  max?: number;
};

export function ProgressBar({ value, max = 100 }: ProgressBarProps) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className="w-full bg-surface-container-high rounded-full h-2">
      <div className="bg-primary h-2 rounded-full" style={{ width: `${percent}%` }}></div>
    </div>
  );
}
