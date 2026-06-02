import { buttonVariants } from "@/components/ui/button";
import { FadeUp } from "@/components/motion/fade-up";
import { Aurora } from "@/components/motion/aurora";
import { AnimatedCounter } from "@/components/motion/animated-counter";
import { cn } from "@/lib/utils";

export type SolutionHeroStat =
  | { kind: "count"; to: number; suffix?: string; decimals?: number; label: string }
  | { kind: "word"; value: string; label: string };

export type SolutionHeroProps = {
  eyebrow: string;
  headline: React.ReactNode;
  body: string;
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
  stats: SolutionHeroStat[];
  mockup: React.ReactNode;
};

export function SolutionHero({
  eyebrow,
  headline,
  body,
  primaryCta = { href: "#contact", label: "Book a demo →" },
  secondaryCta = { href: "#workflow", label: "See the workflow" },
  stats,
  mockup,
}: SolutionHeroProps) {
  return (
    <section className="section-divide relative overflow-hidden bg-dot-grid">
      <Aurora />
      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2 md:items-center md:gap-8 md:px-8 md:py-28">
        <FadeUp>
          <div className="inline-flex items-center gap-2 rounded-md border border-border-strong bg-surface px-3 py-1.5">
            <span className="size-1.5 animate-pulse-dot rounded-full bg-accent-teal" />
            <span className="label-mono text-accent-teal">{eyebrow}</span>
          </div>
          <h1 className="mt-6 text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            {headline}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
            {body}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href={primaryCta.href}
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-11 rounded-md bg-cta px-5 font-mono text-sm uppercase tracking-[0.14em] text-cta-foreground hover:bg-cta/90",
              )}
            >
              {primaryCta.label}
            </a>
            <a
              href={secondaryCta.href}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-11 rounded-md px-5",
              )}
            >
              {secondaryCta.label}
            </a>
          </div>
          <dl className="mt-12 grid max-w-lg grid-cols-2 gap-x-8 gap-y-5 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="text-2xl font-semibold tracking-tight text-foreground tabular-nums">
                  {s.kind === "count" ? (
                    <AnimatedCounter
                      to={s.to}
                      suffix={s.suffix}
                      decimals={s.decimals}
                    />
                  ) : (
                    s.value
                  )}
                </dt>
                <dd className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div className="mx-auto w-full max-w-md">{mockup}</div>
        </FadeUp>
      </div>
    </section>
  );
}
