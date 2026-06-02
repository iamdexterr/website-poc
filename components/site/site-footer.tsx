import { Logo } from "./logo";

const groups = [
  {
    title: "Platform",
    links: [
      { label: "Connectivity", href: "/playground#platform" },
      { label: "Monitoring", href: "/playground#monitoring" },
      { label: "Predictive AI", href: "/playground#predictive" },
      { label: "Library", href: "/library" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Climate control", href: "/solutions/climate-control" },
      { label: "Asset tracking", href: "/solutions/asset-tracking" },
      { label: "Smart city", href: "/solutions/smart-city" },
      { label: "Use cases", href: "/playground#use-cases" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Contact", href: "/playground#contact" },
      { label: "hello@oneiot.io", href: "mailto:hello@oneiot.io" },
      { label: "LinkedIn", href: "#" },
      { label: "T-Hub, Hyderabad", href: "/playground#contact" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-background">
      {/* Decorative dotted band — concentrated at the top, fades into the
          footer body. Brings the page to a calm landing. */}
      <div
        className="bg-dot-grid pointer-events-none absolute inset-x-0 top-0 h-48 opacity-60"
        style={{
          maskImage:
            "linear-gradient(to bottom, black 0%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, transparent 100%)",
        }}
        aria-hidden
      />
      <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-12 px-6 py-16 md:grid-cols-5 md:px-8">
        <div className="col-span-2 space-y-4">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            The AI-ready IoT platform built around how you actually work.
          </p>
          <div className="inline-flex items-center gap-2 rounded-md border border-accent-teal/30 bg-accent-teal/10 px-3 py-1.5">
            <span className="size-1.5 animate-pulse-dot rounded-full bg-accent-teal" />
            <span className="label-mono text-accent-teal">
              GITEX AI ASIA · SUPERNOVA
            </span>
          </div>
        </div>
        {groups.map((g) => (
          <div key={g.title} className="space-y-3">
            <div className="label-mono text-muted-foreground">{g.title}</div>
            <ul className="space-y-2 text-sm">
              {g.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-6 text-xs text-muted-foreground md:flex-row md:px-8">
          <span>© {new Date().getFullYear()} OneIoT. Founded 2022 · Hyderabad, India.</span>
          <span className="font-mono">CONNECT · MONITOR · AUTOMATE</span>
        </div>
      </div>
    </footer>
  );
}
