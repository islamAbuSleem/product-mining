import type { ReactNode } from "react";

type PageShellProps = {
  children: ReactNode;
  className?: string;
};

export function PageShell({ children, className = "" }: PageShellProps) {
  return (
    <main
      className={`flex-1 w-full max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop py-lg ${className}`}
    >
      {children}
    </main>
  );
}
