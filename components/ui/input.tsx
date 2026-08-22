import { Icon } from "./icon";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  variant?: "hero" | "well";
  leadingIcon?: string;
};

const variantClasses = {
  hero:
    "pl-[48px] pr-md py-md text-body-lg text-on-surface bg-surface-bright rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all",
  well:
    "pl-10 pr-4 py-2 text-body-md text-on-surface bg-surface-container-low rounded-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-inner",
};

export function Input({
  variant = "hero",
  leadingIcon,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="relative w-full flex items-center">
      {leadingIcon ? (
        <Icon
          name={leadingIcon}
          className={`absolute top-1/2 -translate-y-1/2 z-10 ${
            variant === "hero" ? "left-md text-outline" : "left-3 text-on-surface-variant"
          }`}
        />
      ) : null}
      <input className={`w-full border border-outline-variant ${variantClasses[variant]} ${className}`} {...props} />
    </div>
  );
}
