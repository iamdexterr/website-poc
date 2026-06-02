import { FadeUp, Stagger, StaggerItem } from "@/components/motion/fade-up";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { Footprints, Bot, Workflow } from "lucide-react";

type Problem = {
  icon: React.ReactNode;
  highlight: string;
  rest: string;
};

const problems: Problem[] = [
  {
    icon: <Footprints className="size-5" strokeWidth={1.5} />,
    highlight: "Legacy SCADA",
    rest: "locks you into vendor-specific protocols built before the cloud existed.",
  },
  {
    icon: <Bot className="size-5" strokeWidth={1.5} />,
    highlight: "Hyperscaler IoT clouds",
    rest: "give you raw services and a six-month bill for the integration work.",
  },
  {
    icon: <Workflow className="size-5" strokeWidth={1.5} />,
    highlight: "Point tools",
    rest: "solve one workload and silo every other system you already deployed.",
  },
];

export function ProblemFraming() {
  return (
    <section className="section-divide relative overflow-hidden bg-background">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-8 md:py-28">
        <div className="bg-dot-grid-strong relative overflow-hidden rounded-3xl border border-border p-8 md:p-16">
          <FadeUp>
            <h2 className="max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
              Most IoT platforms fail at the last mile.
            </h2>
          </FadeUp>

          <Stagger className="mt-12 grid grid-cols-1 gap-4 md:mt-16 md:grid-cols-3">
            {problems.map((p) => (
              <StaggerItem key={p.highlight}>
                <SpotlightCard
                  tone="amber"
                  className="h-full rounded-2xl border border-border bg-surface p-6"
                >
                  <div className="text-accent-orange">{p.icon}</div>
                  <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
                    <span className="font-semibold text-accent-orange">
                      {p.highlight}
                    </span>{" "}
                    {p.rest}
                  </p>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
