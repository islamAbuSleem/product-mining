import Link from "next/link";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { NavLinks } from "./nav-links";
import { Icon } from "../ui/icon";
import { Input } from "../ui/input";
import { StatusIndicator } from "../ui/status-indicator";

const defaultNavItems = [
  { label: "Search", href: "/" },
  { label: "Deals", href: "/deals" },
  { label: "History", href: "/my-searching" },
  { label: "Analytics", href: "/analytics" },
] as const;



type TopNavProps = {
  items?: ReadonlyArray<{ label: string; href: string }>;
  showInlineSearch?: boolean;
  searchValue?: string;
  searchPlaceholder?: string;
  statusTone?: "mining" | "synced";
};

export function TopNav({
  items = defaultNavItems,
  showInlineSearch = false,
  searchValue,
  searchPlaceholder = "Search products, brands, or SKUs...",
  statusTone = "synced",
}: TopNavProps) {
  return (
    <header className="bg-surface-container-lowest w-full z-50 sticky top-0 border-b border-outline-variant">
      <div className="flex justify-between items-center h-16 px-margin-desktop max-w-max-width mx-auto w-full">
        <div className="flex items-center gap-xl flex-1 min-w-0">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Icon name="hub" className="text-primary" />
            <span className="text-title-lg font-bold text-primary">Product Mining</span>
          </Link>
          {showInlineSearch ? (
            <div className="hidden md:flex flex-1 max-w-[28rem] relative group">
              <Input
                variant="well"
                leadingIcon="search"
                defaultValue={searchValue}
                placeholder={searchPlaceholder}
                aria-label="Site search"
                className="pr-24"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 z-10">
                <StatusIndicator tone={statusTone} />
              </div>
            </div>
          ) : null}
        </div>
        <nav className="hidden md:flex items-center gap-lg h-full">
          <NavLinks items={items} />
        </nav>
        <div className="flex items-center gap-md ml-xl">
          <button
            type="button"
            aria-label="Notifications"
            className="text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors p-1 rounded-sm"
          >
            <Icon name="notifications" />
          </button>
          <button
            type="button"
            aria-label="History"
            className="text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors p-1 rounded-sm"
          >
            <Icon name="history" />
          </button>
          <Show when="signed-out">
            <SignInButton>
              <button
                type="button"
                className="text-label-md text-on-surface-variant hover:text-primary hover:bg-surface-container-low px-3 py-1.5 rounded-sm transition-colors"
              >
                Sign in
              </button>
            </SignInButton>
            <SignUpButton>
              <button
                type="button"
                className="bg-primary text-on-primary text-label-md px-4 py-1.5 rounded-sm hover:bg-primary-container shadow-sm transition-colors"
              >
                Sign up
              </button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
        </div>
      </div>
    </header>
  );
}
