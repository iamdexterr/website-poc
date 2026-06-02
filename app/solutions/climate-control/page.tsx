import type { Metadata } from "next";
import { Snowflake, FileText, Wifi } from "lucide-react";

import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { LogoMarquee } from "@/components/sections/logo-marquee";
import { LiveTelemetryStrip } from "@/components/sections/live-telemetry-strip";
import { BigCTA } from "@/components/sections/big-cta";
import { FAQ } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";

import { SolutionHero } from "@/components/sections/solutions/solution-hero";
import { SolutionProblems } from "@/components/sections/solutions/solution-problems";
import { SolutionWorkflow } from "@/components/sections/solutions/solution-workflow";
import { SolutionDashboard } from "@/components/sections/solutions/solution-dashboard";
import { SolutionUseCases } from "@/components/sections/solutions/solution-use-cases";

import { Gauge } from "@/components/mockups/climate/gauge";
import { SetpointDiff } from "@/components/mockups/climate/setpoint-diff";
import { ValveActuator } from "@/components/mockups/climate/valve-actuator";
import { LearningChart } from "@/components/mockups/climate/learning-chart";
import { ErrorRateSpike } from "@/components/mockups/observability/error-rate-spike";
import { MetricsRing } from "@/components/mockups/observability/metrics-ring";

import type { AgentGridCell } from "@/components/sections/agent-grid";

export const metadata: Metadata = {
  title: "Climate control monitoring — OneIoT",
  description:
    "Sub-second temperature, humidity, and CO₂ telemetry with AI-suggested setpoints and orchestrated actuator control. From a single warehouse to a global cold-chain network.",
};

const climateCells: AgentGridCell[] = [
  {
    eyebrow: "◆ SENSE",
    tone: "teal",
    title: "Sub-second telemetry, every device",
    body: "Continuous reads across temp, humidity, and CO₂ with target bands per asset. The gauge is live — the threshold is policy.",
    mockup: <Gauge />,
  },
  {
    eyebrow: "◆ COMPARE",
    tone: "purple",
    title: "AI proposes setpoints, you approve",
    body: "Recommendations diff against current config. Confidence score, forecast energy delta, and a clean rollback path — no black boxes.",
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

export default function ClimateControlPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <SolutionHero
          eyebrow="CLIMATE CONTROL · MONITORING"
          headline={
            <>
              Keep every cold chain, server room, and{" "}
              <span className="text-brand">greenhouse</span> in spec.
            </>
          }
          body="Sub-second temperature, humidity, and CO₂ telemetry. AI-suggested setpoints. Automatic actuator control. From one warehouse to a thousand-site cold-chain network — same platform."
          stats={[
            { kind: "count", to: 247, label: "devices online" },
            { kind: "count", to: 99.99, suffix: "%", decimals: 2, label: "delivery" },
            { kind: "count", to: 84, suffix: "ms", label: "p95 latency" },
            { kind: "word", value: "0", label: "excursions undetected" },
          ]}
          mockup={<Gauge />}
        />

        <LogoMarquee />
        <LiveTelemetryStrip />

        <SolutionProblems
          headline="Most climate monitoring is a glorified spreadsheet."
          problems={[
            {
              icon: <FileText className="size-5" strokeWidth={1.5} />,
              highlight: "Manual logbooks",
              rest: "miss the 3am excursion you only discover when a customer rejects the shipment.",
            },
            {
              icon: <Snowflake className="size-5" strokeWidth={1.5} />,
              highlight: "Standalone chillers",
              rest: "alarm locally, page no-one, and have no audit trail when regulators ask.",
            },
            {
              icon: <Wifi className="size-5" strokeWidth={1.5} />,
              highlight: "BMS-only systems",
              rest: "see the building but not the trucks, the lockers, or the last-mile reefer.",
            },
          ]}
        />

        <SolutionWorkflow
          eyebrow="THE FOUR-STAGE WORKFLOW"
          headline="Sense, compare, actuate, learn — every device, every cycle."
          sub="SENSE · COMPARE · ACTUATE · LEARN"
          cells={climateCells}
        />

        <SolutionDashboard
          eyebrow="LIVE OPERATIONS"
          headline="One screen for every chiller, every truck, every aisle."
          body="Streaming SQL across the entire climate fleet. The same dashboard your overnight ops team watches is the one your auditor can replay 90 days from now."
          primary={<ErrorRateSpike className="border-0 bg-transparent p-0 shadow-none" />}
          secondary={<MetricsRing className="border-0 bg-transparent p-0 shadow-none" />}
        />

        <SolutionUseCases
          eyebrow="DEPLOYED ACROSS"
          headline="Where climate control gets real."
          body="Three production-tested templates that customers ship in two weeks or less."
          cases={[
            {
              eyebrow: "PHARMA · FOOD",
              tone: "teal",
              title: "Cold chain monitoring",
              body: "Continuous temperature and humidity tracking from manufacture through last-mile delivery. Audit-ready logs for FDA, GDP, and HACCP compliance.",
              metric: "0 excursions undetected",
            },
            {
              eyebrow: "DATA CENTER",
              tone: "purple",
              title: "Hot-aisle setpoint optimization",
              body: "Per-rack inlet telemetry feeds an AI that tunes CRAC setpoints in real time. Lower PUE without risking thermal events.",
              metric: "↓ 30% energy savings",
            },
            {
              eyebrow: "AGRICULTURE",
              tone: "green",
              title: "Greenhouse automation",
              body: "Soil moisture, CO₂, light, and climate sensors with closed-loop actuator control. Water and energy go down; yield goes up.",
              metric: "↓ 35% water usage",
            },
          ]}
        />

        <BigCTA />
        <FAQ />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
