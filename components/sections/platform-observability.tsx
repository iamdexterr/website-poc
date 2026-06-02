import { FadeUp, Stagger, StaggerItem } from "@/components/motion/fade-up";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { SandboxTerminal } from "@/components/mockups/observability/sandbox-terminal";
import { AnomalyChart } from "@/components/mockups/observability/anomaly-chart";
import { ErrorRateSpike } from "@/components/mockups/observability/error-rate-spike";
import { OtaRolloutCards } from "@/components/mockups/observability/ota-rollout-cards";
import { FleetActivityTable } from "@/components/mockups/observability/fleet-activity-table";

export function PlatformObservability() {
  return (
    <section className="section-divide bg-background">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-8">
        <FadeUp>
          <span className="label-mono text-accent-teal">
            PLATFORM OBSERVABILITY
          </span>
          <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
            The same control plane your SRE team already trusts.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Production-grade isolation, anomaly tracking, rollout safety, and
            fleet-wide telemetry — surfaced where you already work.
          </p>
        </FadeUp>

        <Stagger className="mt-14 grid grid-cols-12 gap-4 lg:gap-6">
          {/* Sandbox terminal — tall left column */}
          <StaggerItem className="col-span-12 lg:col-span-7 lg:row-span-2">
            <SpotlightCard tone="amber" className="h-full rounded-2xl">
              <SandboxTerminal />
            </SpotlightCard>
          </StaggerItem>

          {/* Error rate spike — top-right */}
          <StaggerItem className="col-span-12 md:col-span-7 lg:col-span-5">
            <SpotlightCard tone="amber" className="h-full rounded-2xl">
              <ErrorRateSpike />
            </SpotlightCard>
          </StaggerItem>

          {/* Anomaly chart — middle-right */}
          <StaggerItem className="col-span-12 md:col-span-5 lg:col-span-5">
            <SpotlightCard tone="blue" className="h-full rounded-2xl">
              <AnomalyChart />
            </SpotlightCard>
          </StaggerItem>

          {/* Fleet activity table — wide bottom */}
          <StaggerItem className="col-span-12 lg:col-span-7">
            <SpotlightCard tone="teal" className="h-full rounded-2xl">
              <FleetActivityTable />
            </SpotlightCard>
          </StaggerItem>

          {/* OTA rollout cards — bottom-right */}
          <StaggerItem className="col-span-12 lg:col-span-5">
            <SpotlightCard tone="green" className="h-full rounded-2xl">
              <div className="h-full rounded-2xl border border-border bg-surface p-6 shadow-2xl">
                <div className="mb-4 text-base font-semibold text-foreground">
                  OTA rollout — cold-chain fleet
                </div>
                <OtaRolloutCards />
              </div>
            </SpotlightCard>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}
