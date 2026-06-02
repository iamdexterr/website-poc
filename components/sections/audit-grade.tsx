import { FadeUp, Stagger, StaggerItem } from "@/components/motion/fade-up";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { DiffViewer } from "@/components/mockups/observability/diff-viewer";
import { SettingsToggle } from "@/components/mockups/observability/settings-toggle";
import { ActivityFeed } from "@/components/mockups/observability/activity-feed";
import { DeploymentTimeline } from "@/components/mockups/observability/deployment-timeline";
import { MetricsRing } from "@/components/mockups/observability/metrics-ring";

export function AuditGrade() {
  return (
    <section className="section-divide bg-background">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-8">
        <FadeUp>
          <span className="label-mono text-accent-teal">
            AUDIT-GRADE BY DEFAULT
          </span>
          <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
            Every change reviewed. Every event logged. Every rollout gated.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            OneIoT treats fleet changes the way you treat code changes —
            diffable, approvable, observable, reversible. Compliance isn&apos;t
            a feature; it&apos;s the substrate.
          </p>
        </FadeUp>

        <Stagger className="mt-14 grid grid-cols-12 gap-4 lg:gap-6">
          {/* Row 1 — wide diff + governance settings */}
          <StaggerItem className="col-span-12 lg:col-span-7">
            <SpotlightCard tone="purple" className="h-full rounded-2xl">
              <DiffViewer />
            </SpotlightCard>
          </StaggerItem>
          <StaggerItem className="col-span-12 lg:col-span-5">
            <SpotlightCard tone="amber" className="h-full rounded-2xl">
              <SettingsToggle />
            </SpotlightCard>
          </StaggerItem>

          {/* Row 2 — three equal columns */}
          <StaggerItem className="col-span-12 md:col-span-6 lg:col-span-4">
            <SpotlightCard tone="teal" className="h-full rounded-2xl">
              <ActivityFeed />
            </SpotlightCard>
          </StaggerItem>
          <StaggerItem className="col-span-12 md:col-span-6 lg:col-span-4">
            <SpotlightCard tone="blue" className="h-full rounded-2xl">
              <DeploymentTimeline />
            </SpotlightCard>
          </StaggerItem>
          <StaggerItem className="col-span-12 lg:col-span-4">
            <SpotlightCard tone="green" className="h-full rounded-2xl">
              <MetricsRing />
            </SpotlightCard>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}
