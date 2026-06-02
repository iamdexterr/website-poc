import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";

type NavChild = {
  label: string;
  href: string;
  desc: string;
};

type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
};

const nav: NavItem[] = [
  { label: "Platform", href: "/playground#platform" },
  {
    label: "Solutions",
    href: "/playground#verticals",
    children: [
      {
        label: "Climate control",
        href: "/solutions/climate-control",
        desc: "Cold chain, data center, greenhouse",
      },
      {
        label: "Asset tracking",
        href: "/solutions/asset-tracking",
        desc: "Fleet, construction, manufacturing",
      },
      {
        label: "Smart city",
        href: "/solutions/smart-city",
        desc: "Energy, public safety, environment",
      },
    ],
  },
  { label: "Use cases", href: "/playground#use-cases" },
  { label: "Library", href: "/library" },
  { label: "FAQ", href: "/playground#faq" },
];

function NavLink({ item }: { item: NavItem }) {
  if (!item.children) {
    return (
      <a href={item.href} className="hover:text-foreground">
        {item.label}
      </a>
    );
  }

  return (
    <div className="group relative">
      <a
        href={item.href}
        className="inline-flex items-center gap-1 hover:text-foreground group-focus-within:text-foreground"
        aria-haspopup="true"
      >
        {item.label}
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
          className="transition-transform group-hover:rotate-180 group-focus-within:rotate-180"
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>

      {/* Hover bridge — keeps the menu open while crossing the gap */}
      <div className="pointer-events-none absolute left-0 top-full h-3 w-full" />

      <div
        className={cn(
          "invisible absolute left-0 top-full z-50 mt-3 w-80 origin-top-left",
          "translate-y-1 opacity-0 transition-all duration-150",
          "group-hover:visible group-hover:translate-y-0 group-hover:opacity-100",
          "group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100",
        )}
      >
        <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-2xl backdrop-blur">
          <ul className="p-2">
            {item.children.map((c) => (
              <li key={c.href}>
                <a
                  href={c.href}
                  className="flex flex-col gap-0.5 rounded-md px-3 py-2.5 text-left hover:bg-surface-elevated focus-visible:bg-surface-elevated focus-visible:outline-none"
                >
                  <span className="text-sm font-medium text-foreground">
                    {c.label}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {c.desc}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <div className="border-t border-border bg-background/40 px-4 py-2">
            <a
              href={item.href}
              className="flex items-center justify-between text-xs text-muted-foreground hover:text-foreground"
            >
              <span>See all solutions on the landing page</span>
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <ScrollProgress />
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8">
        <Link href="/">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          {nav.map((n) => (
            <NavLink key={n.label} item={n} />
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="/playground#contact"
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
          >
            Contact
          </a>
          <a
            href="/playground#contact"
            className={cn(
              buttonVariants({ size: "sm" }),
              "bg-cta text-cta-foreground hover:bg-cta/90",
            )}
          >
            Book a demo
          </a>
        </div>
      </div>
    </header>
  );
}
