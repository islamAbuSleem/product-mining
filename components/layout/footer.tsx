import { Icon } from "../ui/icon";

const footerLinks = [
  "Documentation",
  "Analytics API",
  "Terms of Service",
  "Privacy Policy",
  "Support",
] as const;

export function Footer() {
  return (
    <footer className="bg-surface-container-low w-full mt-auto border-t border-outline-variant">
      <div className="flex flex-col md:flex-row justify-between items-center py-xl px-margin-desktop max-w-max-width mx-auto w-full gap-md md:gap-xl">
        <div className="text-title-md font-bold text-on-surface flex items-center gap-2">
          <Icon name="hub" />
          Product Mining
        </div>
        <div className="flex flex-wrap justify-center gap-md text-secondary text-label-md">
          {footerLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="hover:underline hover:text-primary transition-all duration-150"
            >
              {link}
            </a>
          ))}
        </div>
        <div className="text-secondary text-label-md text-center md:text-right">
          © 2024 Product Mining. Professional Grade Market Intelligence.
        </div>
      </div>
    </footer>
  );
}
