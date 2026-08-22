type CheckboxProps = {
  label: string;
  name?: string;
  count?: number;
  defaultChecked?: boolean;
};

export function Checkbox({ label, name, count, defaultChecked = false }: CheckboxProps) {
  return (
    <label className="flex items-center gap-2 cursor-pointer group">
      <input className="checkbox-native focus-visible:ring-2 focus-visible:ring-primary" type="checkbox" name={name} defaultChecked={defaultChecked} />
      <span className="text-body-md text-on-surface-variant group-hover:text-primary transition-colors">{label}</span>
      {typeof count === "number" ? (
        <span className="ml-auto text-label-sm text-secondary bg-surface-container-low px-1.5 py-0.5 rounded-sm">
          {count}
        </span>
      ) : null}
    </label>
  );
}
