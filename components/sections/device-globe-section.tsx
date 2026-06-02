import { DeviceGlobe } from "./device-globe";
import { FadeUp } from "@/components/motion/fade-up";
import { AnimatedCounter } from "@/components/motion/animated-counter";

type Fact =
  | { kind: "count"; to: number; suffix?: string; label: string }
  | { kind: "word"; value: string; label: string };

const facts: Fact[] = [
  { kind: "count", to: 6, label: "Countries served" },
  { kind: "count", to: 100, suffix: "K+", label: "Devices connected" },
  { kind: "word", value: "24/7", label: "Edge ingest" },
];

export function DeviceGlobeSection() {
  return (
    <section className="section-divide bg-background">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-2 md:items-center md:px-8">
        <FadeUp>
          <span className="label-mono text-accent-teal">GLOBAL FOOTPRINT</span>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
            One platform, fleets on every continent.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            From cold-chain trucks in Hyderabad to data-center hot aisles in
            Singapore, OneIoT keeps every device, every region, every workload
            in one pane of glass.
          </p>
          <dl className="mt-10 grid grid-cols-3 gap-6 md:max-w-md">
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="text-3xl font-semibold tracking-tight text-foreground tabular-nums">
                  {f.kind === "count" ? (
                    <AnimatedCounter to={f.to} suffix={f.suffix} />
                  ) : (
                    f.value
                  )}
                </dt>
                <dd className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">
                  {f.label}
                </dd>
              </div>
            ))}
          </dl>
        </FadeUp>
        <FadeUp delay={0.15}>
          <DeviceGlobe />
        </FadeUp>
      </div>
    </section>
  );
}
