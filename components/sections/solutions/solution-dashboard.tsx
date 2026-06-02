import { FadeUp } from "@/components/motion/fade-up";
import { SpotlightCard } from "@/components/motion/spotlight-card";

export type SolutionDashboardProps = {
  eyebrow: string;
  headline: React.ReactNode;
  body: string;
  primary: React.ReactNode;
  secondary: React.ReactNode;
};

/**
 * Two-up dashboard section — a wide "primary" mockup paired with
 * a narrower "secondary" mockup. Used to show the live telemetry
 * surface for a given vertical.
 */
export function SolutionDashboard({
  eyebrow,
  headline,
  body,
  primary,
  secondary,
}: SolutionDashboardProps) {
  return (
    <section className="section-divide bg-background">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-8">
        <FadeUp>
          <span className="label-mono text-accent-teal">{eyebrow}</span>
          <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
            {headline}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {body}
          </p>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="mt-12 grid grid-cols-12 gap-4 lg:gap-6">
            <SpotlightCard
              tone="teal"
              className="col-span-12 h-full rounded-2xl lg:col-span-7"
            >
              {primary}
            </SpotlightCard>
            <SpotlightCard
              tone="purple"
              className="col-span-12 h-full rounded-2xl lg:col-span-5"
            >
              {secondary}
            </SpotlightCard>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
