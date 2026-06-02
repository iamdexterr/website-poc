import { cn } from "@/lib/utils";

type Tier = {
  name: string;
  price: string;
  per: string;
  blurb: string;
  highlight?: boolean;
  features: { label: string; included: boolean | string }[];
  cta: string;
};

const tiers: Tier[] = [
  {
    name: "Starter",
    price: "$0",
    per: "/ mo",
    blurb: "Up to 100 devices · community support",
    features: [
      { label: "MQTT 5 / CoAP connectivity", included: true },
      { label: "Live dashboards", included: true },
      { label: "Streaming SQL", included: false },
      { label: "AI anomaly detection", included: false },
      { label: "Audit log retention", included: "7 days" },
    ],
    cta: "Start free",
  },
  {
    name: "Scale",
    price: "$0.04",
    per: "/ device / mo",
    blurb: "Up to 100K devices · 24×7 support",
    highlight: true,
    features: [
      { label: "MQTT 5 / CoAP / Modbus / OPC-UA", included: true },
      { label: "Live dashboards + streaming SQL", included: true },
      { label: "AI anomaly detection", included: true },
      { label: "OTA + audit-gated rollouts", included: true },
      { label: "Audit log retention", included: "90 days" },
    ],
    cta: "Book a demo",
  },
  {
    name: "Enterprise",
    price: "custom",
    per: "",
    blurb: "Unlimited devices · on-prem / air-gapped",
    features: [
      { label: "All Scale features", included: true },
      { label: "White-label deployment", included: true },
      { label: "Dedicated edge regions", included: true },
      { label: "SOC 2 + ISO 27001 attestation", included: true },
      { label: "Audit log retention", included: "unlimited" },
    ],
    cta: "Talk to sales",
  },
];

function Mark({ value }: { value: boolean | string }) {
  if (value === true) {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M5 12l5 5 9-11" stroke="var(--accent-teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (value === false) {
    return <span className="text-muted-foreground/40">—</span>;
  }
  return <span className="font-mono text-[10px] text-foreground">{value}</span>;
}

/**
 * Pricing table mockup — three-tier comparison with feature matrix,
 * highlighted middle tier, per-row checkmarks/dashes/values.
 */
export function PricingTable({ className }: { className?: string }) {
  return (
    <div className={cn("grid grid-cols-1 gap-3 md:grid-cols-3", className)}>
      {tiers.map((t) => (
        <div
          key={t.name}
          className={cn(
            "flex h-full flex-col rounded-2xl border bg-surface p-6 shadow-2xl",
            t.highlight ? "border-accent-teal/40 ring-1 ring-accent-teal/20" : "border-border",
          )}
        >
          {t.highlight && (
            <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-md border border-accent-teal/30 bg-accent-teal/10 px-2 py-0.5 font-mono text-[10px] tracking-wider text-accent-teal">
              <span className="size-1.5 animate-pulse-dot rounded-full bg-accent-teal" />
              MOST POPULAR
            </span>
          )}
          <div className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            {t.name}
          </div>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-3xl font-semibold tracking-tight text-foreground tabular-nums">
              {t.price}
            </span>
            {t.per && (
              <span className="text-xs text-muted-foreground">{t.per}</span>
            )}
          </div>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            {t.blurb}
          </p>

          <ul className="mt-5 space-y-2.5 border-t border-border pt-4">
            {t.features.map((f) => (
              <li
                key={f.label}
                className="flex items-start justify-between gap-3 text-xs"
              >
                <span className="text-muted-foreground">{f.label}</span>
                <span className="shrink-0">
                  <Mark value={f.included} />
                </span>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className={cn(
              "mt-6 w-full rounded-md px-3 py-2 font-mono text-xs uppercase tracking-wider transition-colors",
              t.highlight
                ? "bg-cta text-cta-foreground hover:bg-cta/90"
                : "border border-border bg-background/60 text-foreground hover:bg-surface-elevated",
            )}
          >
            {t.cta} →
          </button>
        </div>
      ))}
    </div>
  );
}
