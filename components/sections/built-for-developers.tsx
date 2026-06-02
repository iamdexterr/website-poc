import { FadeUp, Stagger, StaggerItem } from "@/components/motion/fade-up";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { ApiSnippet } from "@/components/mockups/observability/api-snippet";
import { CommandPalette } from "@/components/mockups/observability/command-palette";
import { AgentThread } from "@/components/mockups/observability/agent-thread";
import { WorldLatencyMap } from "@/components/mockups/observability/world-latency-map";
import { DeviceHeatmap } from "@/components/mockups/observability/device-heatmap";

export function BuiltForDevelopers() {
  return (
    <section className="section-divide bg-dot-fade bg-background">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-8">
        <FadeUp>
          <span className="label-mono text-accent-teal">
            BUILT FOR DEVELOPERS
          </span>
          <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
            APIs you&apos;d ship to prod on a Friday.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            A typed SDK, a global edge, a command-K palette, an AI that knows
            your fleet, and a heatmap that shows the whole quarter at a glance.
          </p>
        </FadeUp>

        <Stagger className="mt-14 grid grid-cols-12 gap-4 lg:gap-6">
          {/* Row 1 — code on the left, command palette on the right */}
          <StaggerItem className="col-span-12 lg:col-span-7">
            <SpotlightCard tone="purple" className="h-full rounded-2xl">
              <ApiSnippet />
            </SpotlightCard>
          </StaggerItem>
          <StaggerItem className="col-span-12 lg:col-span-5">
            <SpotlightCard tone="teal" className="h-full rounded-2xl">
              <CommandPalette />
            </SpotlightCard>
          </StaggerItem>

          {/* Row 2 — AI conversation left, world latency right */}
          <StaggerItem className="col-span-12 lg:col-span-5">
            <SpotlightCard tone="purple" className="h-full rounded-2xl">
              <AgentThread />
            </SpotlightCard>
          </StaggerItem>
          <StaggerItem className="col-span-12 lg:col-span-7">
            <SpotlightCard tone="teal" className="h-full rounded-2xl">
              <WorldLatencyMap />
            </SpotlightCard>
          </StaggerItem>

          {/* Row 3 — full-width heatmap closes the section */}
          <StaggerItem className="col-span-12">
            <SpotlightCard tone="teal" className="h-full rounded-2xl">
              <DeviceHeatmap />
            </SpotlightCard>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}
