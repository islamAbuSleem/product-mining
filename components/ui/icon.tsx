type IconProps = {
  name: string;
  size?: number;
  fill?: boolean;
  className?: string;
};

export function Icon({ name, size, fill = false, className = "" }: IconProps) {
  return (
    <span
      aria-hidden="true"
      className={`material-symbols-outlined ${fill ? "icon-fill" : ""} ${className}`}
      style={size ? { fontSize: size } : undefined}
    >
      {name}
    </span>
  );
}
