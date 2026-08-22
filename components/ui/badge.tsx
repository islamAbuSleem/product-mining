import { Icon } from "./icon";

type BadgeProps = {
  variant: "rank" | "active" | "paused" | "count";
  rank?: number;
  count?: number;
  label?: string;
};

export function Badge({ variant, rank, count, label }: BadgeProps) {
  if (variant === "rank") {
    return (
      <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full border border-yellow-200 flex items-center gap-1 shadow-sm">
        <Icon name="trophy" size={14} />
        <span className="text-label-sm font-bold uppercase tracking-wider">
          #{rank ?? 1} {label ?? "Best Value"}
        </span>
      </div>
    );
  }
  if (variant === "active") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-sm text-label-sm bg-tertiary-fixed text-on-tertiary-fixed">
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
        {label ?? "Active"}
      </span>
    );
  }
  if (variant === "paused") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-sm text-label-sm bg-surface-container-high text-on-surface">
        <span className="w-2 h-2 rounded-full bg-outline"></span>
        {label ?? "Paused"}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-1.5 py-0.5 rounded-sm bg-surface-container-low text-secondary text-label-sm">
      {count}
    </span>
  );
}
