import type { ReactNode } from "react";

type PanelCardProps = {
  title?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function PanelCard({ title, actions, children, className = "" }: PanelCardProps) {
  return (
    <section className={`bg-surface-container-lowest border border-outline-variant rounded-lg p-md ${className}`}>
      {title ? (
        <div className="flex justify-between items-center border-b border-outline-variant pb-sm mb-md">
          <h2 className="text-title-md text-on-surface">{title}</h2>
          {actions}
        </div>
      ) : null}
      {children}
    </section>
  );
}

export function GlassCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <article className={`glass-card rounded-lg ${className}`}>{children}</article>;
}

type MetricCardProps = {
  label: string;
  value: string;
  delta: {
    text: string;
    trend: "up" | "down" | "flat";
  };
};

const trendConfig = {
  up: { icon: "trending_up", classes: "text-primary" },
  down: { icon: "trending_down", classes: "text-error" },
  flat: { icon: "remove", classes: "text-on-surface-variant" },
} as const;

export function MetricCard({ label, value, delta }: MetricCardProps) {
  const trend = trendConfig[delta.trend];
  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-md shadow-sm">
      <div className="text-on-surface-variant text-label-md uppercase tracking-wider mb-xs">{label}</div>
      <div className="text-on-surface text-headline-md mb-xs">{value}</div>
      <div className={`flex items-center text-label-sm ${trend.classes}`}>
        <span className="material-symbols-outlined text-[14px] mr-xs" aria-hidden="true">
          {trend.icon}
        </span>
        {delta.text}
      </div>
    </div>
  );
}
