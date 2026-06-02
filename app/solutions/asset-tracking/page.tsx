import type { Metadata } from "next";
import { MapPin, ClipboardList, ShieldOff } from "lucide-react";

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

import { MapTrail } from "@/components/mockups/asset/map-trail";
import { RouteOptimizer } from "@/components/mockups/asset/route-optimizer";
import { UtilizationBar } from "@/components/mockups/asset/utilization-bar";
import { ServiceTicket } from "@/components/mockups/asset/service-ticket";
import { FleetActivityTable } from "@/components/mockups/observability/fleet-activity-table";
import { DeploymentTimeline } from "@/components/mockups/observability/deployment-timeline";

import type { AgentGridCell } from "@/components/sections/agent-grid";

export const metadata: Metadata = {
  title: "Asset tracking & monitoring — OneIoT",
  description:
    "Live position, cargo state, ETA, and predictive maintenance — across every fleet, fleet, and yard. Unified GPS + cellular + LoRaWAN tracking with closed-loop service workflows.",
};

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

export default function AssetTrackingPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <SolutionHero
          eyebrow="ASSET TRACKING · TELEMETRY"
          headline={
            <>
              Know where every asset is — and how it&apos;s{" "}
              <span className="text-brand">behaving</span>.
            </>
          }
          body="Unified GPS, cellular, and LoRaWAN tracking with predictive maintenance signals on the same channel. Tighten utilization, cut shrinkage, never lose a unit again."
          stats={[
            { kind: "count", to: 1.2, suffix: "K", decimals: 1, label: "assets tracked" },
            { kind: "count", to: 22, suffix: "%", label: "utilization lift" },
            { kind: "count", to: 45, suffix: " km", label: "saved / week" },
            { kind: "word", value: "0", label: "units unaccounted" },
          ]}
          mockup={<MapTrail />}
        />

        <LogoMarquee />
        <LiveTelemetryStrip />

        <SolutionProblems
          headline="Most fleet tracking ends where the dashboard begins."
          problems={[
            {
              icon: <MapPin className="size-5" strokeWidth={1.5} />,
              highlight: "GPS-only trackers",
              rest: "show you a dot on a map and nothing about fuel, cargo temp, or driver behavior.",
            },
            {
              icon: <ClipboardList className="size-5" strokeWidth={1.5} />,
              highlight: "Paper service logs",
              rest: "fail open — you find out about the failed hydraulic pump after it stops the job.",
            },
            {
              icon: <ShieldOff className="size-5" strokeWidth={1.5} />,
              highlight: "Vendor-locked telematics",
              rest: "trap your data in their portal and charge per export, per integration, per quarter.",
            },
          ]}
        />

        <SolutionWorkflow
          eyebrow="THE FOUR-STAGE WORKFLOW"
          headline="Locate, route, utilize, maintain — for every asset class."
          sub="LOCATE · ROUTE · UTILIZE · MAINTAIN"
          cells={assetCells}
        />

        <SolutionDashboard
          eyebrow="LIVE OPERATIONS"
          headline="The fleet console your ops team actually uses."
          body="Every truck, every loader, every reefer in one place. Streaming SQL queries answer questions before the spreadsheet would have opened."
          primary={<FleetActivityTable className="border-0 bg-transparent p-0 shadow-none" />}
          secondary={<DeploymentTimeline className="border-0 bg-transparent p-0 shadow-none" />}
        />

        <SolutionUseCases
          eyebrow="DEPLOYED ACROSS"
          headline="Where asset tracking pays back."
          body="Three production-tested templates spanning the asset-heavy verticals."
          cases={[
            {
              eyebrow: "LOGISTICS",
              tone: "teal",
              title: "Fleet telematics",
              body: "GPS plus telemetry plus driver-behavior plus predictive maintenance — one dashboard for the entire fleet.",
              metric: "↑ 22% utilization",
            },
            {
              eyebrow: "CONSTRUCTION",
              tone: "amber",
              title: "Site safety + equipment",
              body: "Worker location, equipment status, environmental sensors. Incident response measured in seconds.",
              metric: "↓ 80% time-to-alert",
            },
            {
              eyebrow: "MANUFACTURING",
              tone: "green",
              title: "Material handling fleet",
              body: "Forklift utilization, route optimization across the warehouse, predictive maintenance for hydraulics.",
              metric: "↓ 45 km / week",
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
