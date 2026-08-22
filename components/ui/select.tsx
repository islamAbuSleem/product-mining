type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  options: string[];
};

export function Select({ options, className = "", ...props }: SelectProps) {
  return (
    <select
      className={`select-native bg-surface-container-lowest border border-outline-variant rounded-sm text-body-md text-on-surface py-1.5 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${className}`}
      {...props}
    >
      {options.map((option) => (
        <option key={option}>{option}</option>
      ))}
    </select>
  );
}
