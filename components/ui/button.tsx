import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-primary text-on-primary hover:bg-primary-container shadow-sm px-md py-sm rounded-sm",
  secondary:
    "bg-surface-container-lowest border border-outline-variant text-on-surface hover:bg-surface-container-low shadow-sm px-md py-sm gap-xs rounded-sm",
  ghost:
    "text-on-surface-variant hover:text-primary hover:bg-surface-container-low p-1 rounded-sm transition-colors",
};

export function Button({ variant = "primary", className = "", type, children, ...props }: ButtonProps) {
  return (
    <button
      type={type ?? "button"}
      className={`inline-flex items-center justify-center font-label-md text-label-md transition-colors ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
