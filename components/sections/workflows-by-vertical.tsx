import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FadeUp } from "@/components/motion/fade-up";
import {
  AgentGridShell,
  type AgentGridCell,
} from "./agent-grid";

import { Gauge } from "@/components/mockups/climate/gauge";
import { SetpointDiff } from "@/components/mockups/climate/setpoint-diff";
import { ValveActuator } from "@/components/mockups/climate/valve-actuator";
import { LearningChart } from "@/components/mockups/climate/learning-chart";

import { MapTrail } from "@/components/mockups/asset/map-trail";
import { RouteOptimizer } from "@/components/mockups/asset/route-optimizer";
import { UtilizationBar } from "@/components/mockups/asset/utilization-bar";
import { ServiceTicket } from "@/components/mockups/asset/service-ticket";

import { CameraGrid } from "@/components/mockups/city/camera-grid";
import { DecisionMatrix } from "@/components/mockups/city/decision-matrix";
import { CrewDispatch } from "@/components/mockups/city/crew-dispatch";
import { KpiSnapshot } from "@/components/mockups/city/kpi-snapshot";

const climateCells: AgentGridCell[] = [
  {
    eyebrow: "◆ SENSE",
    tone: "teal",
    title: "Sub-second telemetry, every device",
    body: "Continuous reads across temp, humidity, and CO₂ with target bands set per asset. The gauge is live — the threshold is policy.",
    mockup: <Gauge />,
  },
  {
    eyebrow: "◆ COMPARE",
    tone: "purple",
    title: "AI proposes setpoints, you approve",
    body: "Recommendations diff against current config. Confidence score, forecasted energy delta, and a clean rollback path — no black boxes.",
    mockup: <SetpointDiff />,
  },
  {
    eyebrow: "◆ ACTUATE",
    tone: "green",
    title: "Fan, valve, compressor — orchestrated",
    body: "Multi-device sequences with sub-second ack tracking. Failures roll back automatically; partial successes get retried.",
    mockup: <ValveActuator />,
  },
  {
    eyebrow: "◆ LEARN",
    tone: "blue",
    title: "Models improve with every cycle",
    body: "Per-building thermal models retrain weekly. Six weeks in, model error drops ~70% — and the system gets quieter, not louder.",
    mockup: <LearningChart />,
  },
];

const assetCells: AgentGridCell[] = [
  {
    eyebrow: "◆ LOCATE",
    tone: "teal",
    title: "Live position, cargo state, ETA",
    body: "GPS plus cellular plus LoRaWAN — unified to one breadcrumb trail. Cargo-temp and fuel ride on the same channel.",
    mockup: <MapTrail />,
  },
  {
    eyebrow: "◆ ROUTE",
    tone: "purple",
    title: "Optimized routing across the fleet",
    body: "AI re-solves routing as conditions change. Stops stay the same, kilometers go down — and the diff is auditable.",
    mockup: <RouteOptimizer />,
  },
  {
    eyebrow: "◆ UTILIZE",
    tone: "green",
    title: "Active vs idle vs off — by asset",
    body: "Stop wondering why utilization is 41%. See the split per asset, find the idle hours, redeploy what you're paying for.",
    mockup: <UtilizationBar />,
  },
  {
    eyebrow: "◆ MAINTAIN",
    tone: "blue",
    title: "Service tickets created before failure",
    body: "Predictive signals open the ticket, set severity, and route to the right crew. SLA timer starts when the forecast does.",
    mockup: <ServiceTicket />,
  },
];

const cityCells: AgentGridCell[] = [
  {
    eyebrow: "◆ OBSERVE",
    tone: "teal",
    title: "Every feed, every sensor, every zone",
    body: "Cameras, air-quality, water, traffic — one canvas. Anomalies surface as tiles, not pages of logs.",
    mockup: <CameraGrid />,
  },
  {
    eyebrow: "◆ DECIDE",
    tone: "purple",
    title: "Options, ranked by city policy",
    body: "The AI proposes — your policy decides. Each option carries speed, cost, and civic risk so the call is defensible.",
    mockup: <DecisionMatrix />,
  },
  {
    eyebrow: "◆ DISPATCH",
    tone: "green",
    title: "Route the right crew, instantly",
    body: "Field units, traffic patrol, maintenance — paged with destination, ETA, and incident context. Sub-second ack.",
    mockup: <CrewDispatch />,
  },
  {
    eyebrow: "◆ REPORT",
    tone: "blue",
    title: "Council-ready dashboards, automatic",
    body: "Weekly KPIs assembled and signed off without an analyst. Trends, deltas, and one-line narratives — every Monday.",
    mockup: <KpiSnapshot />,
  },
];

const tabs = [
  {
    id: "climate",
    label: "Climate control",
    sub: "SENSE · COMPARE · ACTUATE · LEARN",
    cells: climateCells,
  },
  {
    id: "asset",
    label: "Asset tracking",
    sub: "LOCATE · ROUTE · UTILIZE · MAINTAIN",
    cells: assetCells,
  },
  {
    id: "city",
    label: "Smart city",
    sub: "OBSERVE · DECIDE · DISPATCH · REPORT",
    cells: cityCells,
  },
];

export function WorkflowsByVertical() {
  return (
    <section
      id="workflows"
      className="section-divide bg-background"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-8">
        <FadeUp>
          <span className="label-mono text-accent-teal">
            WORKFLOWS · BY VERTICAL
          </span>
          <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
            Same platform. Four agents per vertical.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            The four-stage workflow stays constant — the mockups, models, and
            actuators change with the domain. Pick a vertical to see the live
            agents at work.
          </p>
        </FadeUp>

        <FadeUp delay={0.1}>
          <Tabs defaultValue="climate" className="mt-12">
            <TabsList variant="line" className="mb-6 gap-6">
              {tabs.map((t) => (
                <TabsTrigger key={t.id} value={t.id}>
                  {t.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {tabs.map((t) => (
              <TabsContent key={t.id} value={t.id}>
                <div className="mb-6 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  {t.sub}
                </div>
                <AgentGridShell cells={t.cells} />
              </TabsContent>
            ))}
          </Tabs>
        </FadeUp>
      </div>
    </section>
  );
}
