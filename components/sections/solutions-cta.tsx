import { buttonVariants } from "@/components/ui/button";
import { FadeUp } from "@/components/motion/fade-up";
import { cn } from "@/lib/utils";

export function SolutionsCTA() {
  return (
    <section className="section-divide relative overflow-hidden bg-background">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-8 md:py-28">
        <div className="bg-dot-grid-strong relative overflow-hidden rounded-3xl border border-border p-8 md:p-16">
          <FadeUp>
            <span className="label-mono text-accent-teal">
              READY WHEN YOU ARE
            </span>
            <h2 className="mt-4 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
              Ready to deploy{" "}
              <span className="text-brand">your solution?</span>
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Same modular platform. Built to your spec, deployed where your
              data lives — cloud, on-premise, hybrid, or edge.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="/playground#contact"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-12 rounded-md bg-cta px-6 font-mono text-sm uppercase tracking-[0.14em] text-cta-foreground hover:bg-cta/90",
                )}
              >
                Book a demo →
              </a>
              <a
                href="/playground#contact"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-12 rounded-md border-border-strong px-6",
                )}
              >
                Talk to solutions
              </a>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
