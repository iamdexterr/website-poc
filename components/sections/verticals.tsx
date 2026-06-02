import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FadeUp } from "@/components/motion/fade-up";
import { AgentLabel } from "@/components/motion/agent-label";

type Vertical = {
  id: string;
  label: string;
  eyebrow: string;
  title: string;
  body: string;
  industries: string[];
  demoCount: string;
  demoUnit: string;
  demoLabel: string;
};

const verticals: Vertical[] = [
  {
    id: "climate",
    label: "Climate Control",
    eyebrow: "CLIMATE · MONITORING",
    title: "Keep every cold chain, server room, and greenhouse in spec.",
    body: "Real-time temperature, humidity, and CO₂ telemetry with automatic alerts and actuator control. From a single warehouse to a thousand-site cold-chain network.",
    industries: [
      "Agriculture",
      "Cold chain",
      "Food processing",
      "Data centers",
      "Warehousing",
      "Smart buildings",
    ],
    demoCount: "247",
    demoUnit: "devices",
    demoLabel: "ONLINE NOW",
  },
  {
    id: "tracking",
    label: "Asset Tracking",
    eyebrow: "TRACKING · TELEMETRY",
    title: "Know where every asset is — and how it's behaving.",
    body: "GPS + cellular + LoRaWAN unified tracking with predictive maintenance signals. Tighten utilization, cut shrinkage, never lose a unit again.",
    industries: [
      "Logistics",
      "Construction",
      "Utilities",
      "Fleet",
      "Manufacturing",
    ],
    demoCount: "1.2K",
    demoUnit: "assets",
    demoLabel: "TRACKED LIVE",
  },
  {
    id: "city",
    label: "Smart City",
    eyebrow: "SMART CITY · INFRASTRUCTURE",
    title: "City-scale telemetry that residents actually feel.",
    body: "Water, waste, energy, environment, infrastructure, public safety — one platform for every municipal workload. White-label ready for system integrators.",
    industries: [
      "Water & waste",
      "Energy",
      "Environment",
      "Infrastructure",
      "Public safety",
    ],
    demoCount: "12",
    demoUnit: "modules",
    demoLabel: "CITY-SCALE",
  },
];

function VerticalPanel({ v }: { v: Vertical }) {
  return (
    <div className="grid gap-10 rounded-2xl border border-border bg-surface p-8 md:grid-cols-2 md:gap-12 md:p-10">
      <div>
        <span className="label-mono text-accent-teal">{v.eyebrow}</span>
        <h3 className="mt-3 text-3xl font-semibold leading-tight tracking-tight">
          {v.title}
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          {v.body}
        </p>
        <div className="mt-6">
          <div className="label-mono mb-2 text-muted-foreground">
            INDUSTRIES
          </div>
          <ul className="flex flex-wrap gap-1.5">
            {v.industries.map((ind) => (
              <li
                key={ind}
                className="rounded-md border border-border bg-background/60 px-2.5 py-1 text-xs text-foreground"
              >
                {ind}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Demo card */}
      <div className="relative overflow-hidden rounded-xl border border-border bg-background/60 p-6">
        <div className="mb-6 flex items-center justify-between">
          <AgentLabel tone="green" loading>
            {v.demoLabel}
          </AgentLabel>
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            REGION · APAC
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-6xl font-semibold tracking-tight text-foreground tabular-nums">
            {v.demoCount}
          </span>
          <span className="text-lg text-muted-foreground">{v.demoUnit}</span>
        </div>
        <div className="mt-8 grid grid-cols-12 gap-1">
          {Array.from({ length: 36 }).map((_, i) => (
            <div
              key={i}
              className="h-8 rounded-sm"
              style={{
                background: `oklch(0.82 0.14 180 / ${
                  0.08 + ((i * 13) % 60) / 100
                })`,
              }}
            />
          ))}
        </div>
        <div className="mt-6 grid grid-cols-3 gap-3 text-center">
          {[
            { l: "P95", v: "84ms" },
            { l: "ANOMALIES", v: "0" },
            { l: "UPTIME", v: "99.99%" },
          ].map((m) => (
            <div
              key={m.l}
              className="rounded-md border border-border bg-surface px-2 py-2"
            >
              <div className="font-mono text-xs text-foreground">{m.v}</div>
              <div className="mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                {m.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Verticals() {
  return (
    <section id="verticals" className="section-divide bg-background">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-8">
        <FadeUp>
          <span className="label-mono text-accent-teal">SOLUTIONS</span>
          <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
            Productionize and scale — three verticals, one platform.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Each solution is pre-wired with the right protocols, dashboards, and
            alert templates for its domain. Live in two-to-four weeks.
          </p>
        </FadeUp>

        <FadeUp delay={0.1}>
          <Tabs defaultValue="climate" className="mt-12">
            <TabsList variant="line" className="mb-8 gap-6">
              {verticals.map((v) => (
                <TabsTrigger key={v.id} value={v.id}>
                  {v.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {verticals.map((v) => (
              <TabsContent key={v.id} value={v.id}>
                <VerticalPanel v={v} />
              </TabsContent>
            ))}
          </Tabs>
        </FadeUp>
      </div>
    </section>
  );
}
