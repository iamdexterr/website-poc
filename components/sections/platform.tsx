import { Stagger, StaggerItem } from "@/components/motion/fade-up";
import { FadeUp } from "@/components/motion/fade-up";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { AgentGrid } from "./agent-grid";

type Capability = {
  eyebrow: string;
  tone: "teal" | "green" | "blue" | "purple" | "amber" | "orange";
  title: string;
  body: string;
  chips: string[];
};

const toneText: Record<Capability["tone"], string> = {
  teal: "text-accent-teal",
  green: "text-accent-green",
  blue: "text-accent-blue",
  purple: "text-accent-purple",
  amber: "text-accent-amber",
  orange: "text-accent-orange",
};

const capabilities: Capability[] = [
  {
    eyebrow: "01 · CONNECTIVITY",
    tone: "teal",
    title: "Universal device connectivity",
    body: "Bring any sensor, any protocol, any vendor. Six industrial-grade protocols out of the box.",
    chips: ["MQTT 5", "CoAP", "Modbus TCP", "OPC-UA", "LoRaWAN", "BLE"],
  },
  {
    eyebrow: "02 · MANAGEMENT",
    tone: "blue",
    title: "Centralized fleet management",
    body: "Provision once, control everywhere. OTA updates, remote config, fleet groups, full audit trail.",
    chips: ["Provisioning", "OTA", "Remote config", "Fleet groups", "Audit trail"],
  },
  {
    eyebrow: "03 · MONITORING",
    tone: "green",
    title: "Real-time monitoring",
    body: "Sub-second ingest. Streaming SQL. Live dashboards that don't refresh — they update.",
    chips: ["Sub-second ingest", "Live dashboards", "Streaming SQL"],
  },
  {
    eyebrow: "04 · ANALYTICS",
    tone: "purple",
    title: "AI-driven analytics",
    body: "Anomaly detection, forecasting, natural-language query, digital twins — built in, not bolted on.",
    chips: ["Anomaly detection", "Forecasting", "NL query", "Digital twins"],
  },
  {
    eyebrow: "05 · ALERTS",
    tone: "amber",
    title: "Predictive alerts",
    body: "Rule engine + ML alerts. Route to SMS, Slack, Email, or any webhook. No 'something happened' noise.",
    chips: ["Rule engine", "ML alerts", "SMS / Slack / Email / Webhook"],
  },
  {
    eyebrow: "06 · AUTOMATION",
    tone: "orange",
    title: "Automation & workflows",
    body: "Visual editor. Multi-device sequences. Actuator control. Close the loop without writing code.",
    chips: ["Visual editor", "Multi-device sequences", "Actuator control"],
  },
];

export function Platform() {
  return (
    <section id="platform" className="section-divide bg-background">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-8">
        <FadeUp>
          <span className="label-mono text-accent-teal">THE PLATFORM</span>
          <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
            Build and deploy — on one platform that already speaks IoT.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Four agents that take a device from network discovery to closed-loop
            response. Six modules that let you swap any piece without touching
            the rest.
          </p>
        </FadeUp>

        {/* Hero pattern: 2×2 agent grid with rich mockups */}
        <div className="mt-14">
          <AgentGrid />
        </div>

        {/* Six-module sub-header */}
        <FadeUp delay={0.05}>
          <div className="mt-20 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="label-mono text-muted-foreground">
                ALL SIX MODULES
              </span>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
                Everything in the platform, by capability.
              </h3>
            </div>
            <p className="max-w-md text-sm text-muted-foreground">
              Each module is independently composable. Use one, use all six,
              swap any of them out — no re-architecting.
            </p>
          </div>
        </FadeUp>

        <Stagger className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c) => (
            <StaggerItem key={c.eyebrow}>
              <SpotlightCard
                tone={c.tone === "orange" ? "amber" : c.tone}
                className="h-full bg-surface p-7"
              >
                <div className={`label-mono ${toneText[c.tone]}`}>
                  {c.eyebrow}
                </div>
                <h3 className="mt-4 text-xl font-semibold leading-tight tracking-tight">
                  {c.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {c.body}
                </p>
                <ul className="mt-6 flex flex-wrap gap-1.5">
                  {c.chips.map((chip) => (
                    <li
                      key={chip}
                      className="rounded-md border border-border bg-background/60 px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-muted-foreground"
                    >
                      {chip}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Lego architecture banner */}
        <FadeUp delay={0.1}>
          <div className="mt-10 overflow-hidden rounded-2xl border border-brand/30 bg-linear-to-br from-brand/10 via-background to-background p-8 md:p-10">
            <div className="grid gap-8 md:grid-cols-3 md:items-center">
              <div className="md:col-span-2">
                <span className="label-mono text-brand">
                  MODULAR · LEGO-STYLE ARCHITECTURE
                </span>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
                  Snap modules together. Ship 70% faster.
                </h3>
                <p className="mt-3 max-w-xl text-sm text-muted-foreground">
                  Every capability is a composable module with open APIs. Add a
                  new vertical without touching the core. Replace any piece
                  without re-architecting the system.
                </p>
              </div>
              <dl className="grid grid-cols-3 gap-4 md:grid-cols-1">
                {[
                  { v: "70%", l: "Faster development" },
                  { v: "∞", l: "Composable modules" },
                  { v: "Open", l: "APIs at every layer" },
                ].map((s) => (
                  <div key={s.l} className="text-center md:text-left">
                    <dt className="text-2xl font-semibold text-brand">
                      {s.v}
                    </dt>
                    <dd className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">
                      {s.l}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
