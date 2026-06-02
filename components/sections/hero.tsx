import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { FadeUp } from "@/components/motion/fade-up";
import { Aurora } from "@/components/motion/aurora";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="section-divide relative overflow-hidden bg-dot-grid">
      <Aurora />
      <div className="relative z-10 mx-auto grid max-w-7xl gap-8 px-6 py-24 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:items-center md:gap-8 md:px-8 md:py-36">
        <FadeUp>
          <a
            href="/playground#contact"
            className="group inline-flex items-center gap-3 rounded-full border border-border-strong bg-surface px-3 py-1.5 hover:border-accent-teal/50"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-teal/15 px-2 py-0.5">
              <span className="size-1.5 animate-pulse-dot rounded-full bg-accent-teal" />
              <span className="label-mono text-accent-teal">GITEX AI ASIA</span>
            </span>
            <span className="text-sm text-foreground">
              OneIoT shortlisted for Supernova Competition
            </span>
            <span className="text-sm text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-accent-teal">
              Learn more →
            </span>
          </a>
          <h1 className="mt-6 text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            Built exactly how{" "}
            <span className="text-brand">you need it.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
            IoT platforms engineered around your operations. Delivered in
            weeks.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="/playground#contact"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-11 rounded-md bg-cta px-5 font-mono text-sm uppercase tracking-[0.14em] text-cta-foreground hover:bg-cta/90",
              )}
            >
              Book a demo →
            </a>
            <a
              href="/playground#platform"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-11 rounded-md px-5",
              )}
            >
              See the platform
            </a>
          </div>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div className="pointer-events-none relative perspective-distant md:-mr-12 lg:-mr-24">
            <div
              className="origin-top-left rotate-x-25 skew-x-12"
              style={{
                maskImage:
                  "linear-gradient(to right, black 70%, transparent 100%), linear-gradient(to bottom, black 60%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to right, black 70%, transparent 100%), linear-gradient(to bottom, black 60%, transparent 100%)",
                maskComposite: "intersect",
                WebkitMaskComposite: "source-in",
              }}
            >
              <Image
                src="/dark-card.webp"
                alt="OneIoT dashboard preview"
                width={2880}
                height={2074}
                priority
                className="h-auto w-full rounded-2xl border border-border shadow-2xl"
              />
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
