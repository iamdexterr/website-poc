import { buttonVariants } from "@/components/ui/button";
import { FadeUp } from "@/components/motion/fade-up";
import { Aurora } from "@/components/motion/aurora";
import { cn } from "@/lib/utils";

export function BigCTA() {
  return (
    <section className="section-divide bg-background">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-8">
        <FadeUp>
          <div className="relative overflow-hidden rounded-3xl border border-brand/30 bg-linear-to-br from-brand/15 via-background to-background p-10 md:p-16">
            <Aurora />
            {/* decorative grid */}
            <div
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, oklch(0.82 0.14 180 / 8%) 1px, transparent 0)",
                backgroundSize: "32px 32px",
              }}
            />
            <div className="relative z-10">
              <span className="label-mono text-accent-teal">
                CONNECT · MONITOR · AUTOMATE
              </span>
              <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
                IoT connects. <span className="text-brand">OneIoT delivers.</span>
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
                Two-week proof-of-concept. Production in under a month. Talk to
                an engineer, not a sales bot.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <a
                  href="#contact"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "h-12 rounded-md bg-cta px-6 font-mono text-sm uppercase tracking-[0.14em] text-cta-foreground hover:bg-cta/90",
                  )}
                >
                  Book a demo →
                </a>
                <a
                  href="#contact"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "h-12 rounded-md border-border-strong px-6",
                  )}
                >
                  Contact sales
                </a>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
