type StatusIndicatorProps = {
  tone: "mining" | "synced";
  label?: string;
};

export function StatusIndicator({ tone, label }: StatusIndicatorProps) {
  const resolvedLabel = label ?? (tone === "mining" ? "Mining..." : "Results Synced");
  return (
    <div className="flex items-center gap-2 whitespace-nowrap">
      <div
        className={`w-2 h-2 rounded-full animate-pulse ${tone === "mining" ? "bg-primary" : "bg-green-500"}`}
      ></div>
      <span className="text-label-md text-secondary">{resolvedLabel}</span>
    </div>
  );
}
