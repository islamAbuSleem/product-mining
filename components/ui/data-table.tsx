import type { ReactNode } from "react";

export type TableColumn<T> = {
  key: keyof T & string;
  label: string;
  align?: "left" | "right";
  accent?: boolean;
};

type DataTableProps<T extends Record<string, ReactNode>> = {
  columns: ReadonlyArray<TableColumn<T>>;
  rows: readonly T[];
  maxHeight?: string;
};

export function DataTable<T extends Record<string, ReactNode>>({
  columns,
  rows,
  maxHeight = "200px",
}: DataTableProps<T>) {
  return (
    <div
      className="bg-surface-bright border border-outline-variant rounded p-sm overflow-y-auto"
      style={{ maxHeight }}
    >
      <table className="w-full text-left">
        <thead className="bg-surface-container sticky top-0 text-label-sm text-on-surface-variant">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={`py-xs px-xs font-semibold ${
                  column.align === "right" ? "text-right" : "text-left"
                }`}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-body-md text-on-surface divide-y divide-outline-variant">
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={`py-xs px-xs truncate max-w-[140px] ${
                    column.align === "right" ? "text-right" : ""
                  } ${column.accent ? "font-medium text-primary" : ""}`}
                >
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
