"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinksProps = {
  items: ReadonlyArray<{ label: string; href: string }>;
};

export function NavLinks({ items }: NavLinksProps) {
  const pathname = usePathname();
  return (
    <>
      {items.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`h-full flex items-center font-body-md transition-all duration-200 ${
              active
                ? "text-primary border-b-2 border-primary opacity-80"
                : "text-on-surface-variant hover:text-primary transition-colors"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </>
  );
}
