type ToggleProps = {
  label: string;
  name?: string;
  defaultChecked?: boolean;
};

export function Toggle({ label, name, defaultChecked = false }: ToggleProps) {
  return (
    <label className="flex items-center gap-sm cursor-pointer group">
      <div className="relative">
        <input className="sr-only peer" type="checkbox" name={name} defaultChecked={defaultChecked} />
        <div className="w-10 h-6 bg-surface-container-highest rounded-full peer peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-checked:after:translate-x-4 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
      </div>
      <span className="text-label-md text-on-surface-variant group-hover:text-on-surface transition-colors">
        {label}
      </span>
    </label>
  );
}
