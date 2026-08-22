import type { ReactNode } from "react";

type FilterGroupProps = {
  title: string;
  children: ReactNode;
};

export function FilterGroup({ title, children }: FilterGroupProps) {
  return (
    <div className="filter-section">
      <h3 className="text-label-md text-secondary mb-sm uppercase">{title}</h3>
      <div className="space-y-sm">{children}</div>
    </div>
  );
}
