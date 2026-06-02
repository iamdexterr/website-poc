import type { Metadata } from "next";
import { Eye, Building2, Newspaper } from "lucide-react";

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

import { CameraGrid } from "@/components/mockups/city/camera-grid";
import { DecisionMatrix } from "@/components/mockups/city/decision-matrix";
import { CrewDispatch } from "@/components/mockups/city/crew-dispatch";
import { KpiSnapshot } from "@/components/mockups/city/kpi-snapshot";
import { StatusPage } from "@/components/mockups/observability/status-page";
import { ActivityFeed } from "@/components/mockups/observability/activity-feed";

import type { AgentGridCell } from "@/components/sections/agent-grid";

export const metadata: Metadata = {
  title: "Smart city solutions — OneIoT",
  description:
    "City-scale telemetry that residents actually feel. Water, waste, energy, environment, infrastructure, public safety — one platform, one console, white-label ready.",
};

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

export default function SmartCityPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <SolutionHero
          eyebrow="SMART CITY · INFRASTRUCTURE"
          headline={
            <>
              City-scale telemetry residents{" "}
              <span className="text-brand">actually feel</span>.
            </>
          }
          body="Water, waste, energy, environment, infrastructure, public safety — one platform for every municipal workload. White-label ready for system integrators and OEM partners."
          stats={[
            { kind: "count", to: 12, label: "city modules" },
            { kind: "count", to: 38, suffix: "%", label: "faster response" },
            { kind: "count", to: 60, suffix: "%", label: "lower energy cost" },
            { kind: "word", value: "white-label", label: "OEM ready" },
          ]}
          mockup={<KpiSnapshot />}
        />

        <LogoMarquee />
        <LiveTelemetryStrip />

        <SolutionProblems
          headline="Most smart-city projects stop at the pilot."
          problems={[
            {
              icon: <Eye className="size-5" strokeWidth={1.5} />,
              highlight: "Dashboards no one watches",
              rest: "produce screensavers, not response. Visibility without action is the same as no visibility.",
            },
            {
              icon: <Building2 className="size-5" strokeWidth={1.5} />,
              highlight: "Department-by-department silos",
              rest: "make the simplest cross-cutting question take a week and three meetings.",
            },
            {
              icon: <Newspaper className="size-5" strokeWidth={1.5} />,
              highlight: "Quarterly PDFs",
              rest: "tell the council what already happened — never what&apos;s about to happen.",
            },
          ]}
        />

        <SolutionWorkflow
          eyebrow="THE FOUR-STAGE WORKFLOW"
          headline="Observe, decide, dispatch, report — at city scale."
          sub="OBSERVE · DECIDE · DISPATCH · REPORT"
          cells={cityCells}
        />

        <SolutionDashboard
          eyebrow="LIVE OPERATIONS"
          headline="One console for every department, every district."
          body="The control room your operations center already imagined. Multi-tenant isolation so departments stay in their lanes, single sign-on so the mayor doesn't need three logins."
          primary={<StatusPage className="border-0 bg-transparent p-0 shadow-none" />}
          secondary={<ActivityFeed className="border-0 bg-transparent p-0 shadow-none" />}
        />

        <SolutionUseCases
          eyebrow="DEPLOYED ACROSS"
          headline="Where smart-city programs land."
          body="Three production-tested templates that residents notice within a quarter."
          cases={[
            {
              eyebrow: "ENERGY · LIGHTING",
              tone: "amber",
              title: "Smart street lighting",
              body: "Adaptive dimming, fault detection, and centralized control across thousands of luminaires. Lower bill, fewer dark blocks.",
              metric: "↓ 60% energy cost",
            },
            {
              eyebrow: "PUBLIC SAFETY",
              tone: "blue",
              title: "Crowd & traffic intelligence",
              body: "Multi-camera anomaly detection with policy-ranked response options. Decision in seconds, not minutes.",
              metric: "↓ 38% response time",
            },
            {
              eyebrow: "ENVIRONMENT",
              tone: "green",
              title: "Air quality + water network",
              body: "Distributed sensors with real-time alerting and automated council reporting. Compliance evidence on a button press.",
              metric: "12 city modules live",
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
