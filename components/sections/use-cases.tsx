import { FadeUp, Stagger, StaggerItem } from "@/components/motion/fade-up";
import { SpotlightCard } from "@/components/motion/spotlight-card";

type UseCase = {
  eyebrow: string;
  tone: "teal" | "green" | "blue" | "amber" | "purple" | "orange";
  title: string;
  body: string;
  metric: string;
};

const toneText: Record<UseCase["tone"], string> = {
  teal: "text-accent-teal",
  green: "text-accent-green",
  blue: "text-accent-blue",
  amber: "text-accent-amber",
  purple: "text-accent-purple",
  orange: "text-accent-orange",
};

const cases: UseCase[] = [
  {
    eyebrow: "PHARMA · FOOD",
    tone: "teal",
    title: "Cold chain monitoring",
    body: "Continuous temperature + humidity tracking from manufacture to last mile. Compliance-ready audit trail.",
    metric: "0 excursions undetected",
  },
  {
    eyebrow: "AGRICULTURE",
    tone: "green",
    title: "Greenhouse automation",
    body: "Soil moisture, CO₂, light, and climate — automated actuator control closes the loop.",
    metric: "↓ 35% water usage",
  },
  {
    eyebrow: "LOGISTICS",
    tone: "blue",
    title: "Fleet telematics",
    body: "GPS, telemetry, driver-behavior, and predictive maintenance — fleet-wide in one dashboard.",
    metric: "↑ 22% utilization",
  },
  {
    eyebrow: "SMART CITY",
    tone: "amber",
    title: "Smart street lighting",
    body: "Adaptive dimming, fault detection, and centralized control across thousands of luminaires.",
    metric: "↓ 60% energy cost",
  },
  {
    eyebrow: "DATA CENTER",
    tone: "purple",
    title: "Data center cooling",
    body: "Hot-aisle telemetry + AI-driven setpoint optimization for hyperscale and edge facilities.",
    metric: "↓ 30% energy savings",
  },
  {
    eyebrow: "CONSTRUCTION",
    tone: "orange",
    title: "Construction site safety",
    body: "Worker location, equipment status, environmental alerts — incident response in seconds.",
    metric: "↓ 80% time-to-alert",
  },
];

export function UseCases() {
  return (
    <section id="use-cases" className="section-divide bg-dot-fade bg-background">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-8">
        <FadeUp>
          <span className="label-mono text-accent-teal">USE CASES</span>
          <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
            Build your first IoT solution in weeks, not months.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Pre-wired templates for the workloads our customers ship most often.
            Start from one and customize, or compose your own with the same
            modules.
          </p>
        </FadeUp>

        <Stagger className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {cases.map((c) => (
            <StaggerItem key={c.title}>
              <SpotlightCard
                tone={c.tone === "orange" ? "amber" : c.tone}
                className="flex h-full flex-col bg-surface p-7"
              >
                <span className={`label-mono ${toneText[c.tone]}`}>
                  {c.eyebrow}
                </span>
                <h3 className="mt-4 text-xl font-semibold leading-tight tracking-tight">
                  {c.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {c.body}
                </p>
                <div className="mt-6 inline-flex w-fit items-center gap-2 rounded-md border border-border bg-background/60 px-2.5 py-1.5 font-mono text-xs text-foreground">
                  <span className={`size-1.5 rounded-full ${toneText[c.tone].replace("text-", "bg-")}`} />
                  {c.metric}
                </div>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
