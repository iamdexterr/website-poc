import type { Metadata } from "next";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";

// Platform agents
import { DeviceDiscover } from "@/components/mockups/device-discover";
import { ConfigPush } from "@/components/mockups/config-push";
import { WorkflowTree } from "@/components/mockups/workflow-tree";
import { AnomalyResponse } from "@/components/mockups/anomaly-response";

// Climate
import { Gauge } from "@/components/mockups/climate/gauge";
import { SetpointDiff } from "@/components/mockups/climate/setpoint-diff";
import { ValveActuator } from "@/components/mockups/climate/valve-actuator";
import { LearningChart } from "@/components/mockups/climate/learning-chart";

// Asset
import { MapTrail } from "@/components/mockups/asset/map-trail";
import { RouteOptimizer } from "@/components/mockups/asset/route-optimizer";
import { UtilizationBar } from "@/components/mockups/asset/utilization-bar";
import { ServiceTicket } from "@/components/mockups/asset/service-ticket";

// City
import { CameraGrid } from "@/components/mockups/city/camera-grid";
import { DecisionMatrix } from "@/components/mockups/city/decision-matrix";
import { CrewDispatch } from "@/components/mockups/city/crew-dispatch";
import { KpiSnapshot } from "@/components/mockups/city/kpi-snapshot";

// SRE / observability
import { SandboxTerminal } from "@/components/mockups/observability/sandbox-terminal";
import { AnomalyChart } from "@/components/mockups/observability/anomaly-chart";
import { ErrorRateSpike } from "@/components/mockups/observability/error-rate-spike";
import { OtaRolloutCards } from "@/components/mockups/observability/ota-rollout-cards";
import { FleetActivityTable } from "@/components/mockups/observability/fleet-activity-table";

// Developer / AI
import { CommandPalette } from "@/components/mockups/observability/command-palette";
import { DeviceHeatmap } from "@/components/mockups/observability/device-heatmap";
import { ApiSnippet } from "@/components/mockups/observability/api-snippet";
import { WorldLatencyMap } from "@/components/mockups/observability/world-latency-map";
import { AgentThread } from "@/components/mockups/observability/agent-thread";

// Audit / governance
import { DiffViewer } from "@/components/mockups/observability/diff-viewer";
import { DeploymentTimeline } from "@/components/mockups/observability/deployment-timeline";
import { SettingsToggle } from "@/components/mockups/observability/settings-toggle";
import { ActivityFeed } from "@/components/mockups/observability/activity-feed";
import { MetricsRing } from "@/components/mockups/observability/metrics-ring";

// Product / marketing
import { KanbanBoard } from "@/components/mockups/observability/kanban-board";
import { GitGraph } from "@/components/mockups/observability/git-graph";
import { ChangelogTimeline } from "@/components/mockups/observability/changelog-timeline";
import { StatusPage } from "@/components/mockups/observability/status-page";
import { PricingTable } from "@/components/mockups/observability/pricing-table";

// Comparison & flow
import { BeforeAfterChart } from "@/components/mockups/observability/before-after-chart";
import { BranchTimeline } from "@/components/mockups/observability/branch-timeline";
import { StackedConsoles } from "@/components/mockups/observability/stacked-consoles";
import { VerticalAgentFlow } from "@/components/mockups/observability/vertical-agent-flow";
import { ParallelAgentPipeline } from "@/components/mockups/observability/parallel-agent-pipeline";
import { FunnelToSlack } from "@/components/mockups/observability/funnel-to-slack";

// Pages & dashboards
import { CronDashboard } from "@/components/mockups/observability/cron-dashboard";
import { ObservabilityBento } from "@/components/mockups/observability/observability-bento";
import { DeployGlobe } from "@/components/mockups/observability/deploy-globe";
import { AuthPanel } from "@/components/mockups/observability/auth-panel";

// Photo & real content
import { TestimonialCard } from "@/components/mockups/real/testimonial-card";
import { CustomerStoryCard } from "@/components/mockups/real/customer-story-card";
import { TeamGrid } from "@/components/mockups/real/team-grid";
import { IndustryPhotoCard } from "@/components/mockups/real/industry-photo-card";
import { MediaCoverage } from "@/components/mockups/real/media-coverage";
import { IsometricServiceMap } from "@/components/mockups/real/isometric-service-map";
import { ProductShowcaseCard } from "@/components/mockups/real/product-showcase-card";
import { ProductShowcaseCardDark } from "@/components/mockups/real/product-showcase-card-dark";
import { LifestylePhotoCard } from "@/components/mockups/real/lifestyle-photo-card";

// Legacy (sales agent)
import { ContactCard } from "@/components/mockups/contact-card";
import { EmailPreview } from "@/components/mockups/email-preview";
import { SequenceTree } from "@/components/mockups/sequence-tree";

// Primitives — shown as small demo strips
import { AgentLabel } from "@/components/motion/agent-label";
import { GradientLine } from "@/components/motion/gradient-line";
import { Spinner } from "@/components/motion/spinner";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { AnimatedCounter } from "@/components/motion/animated-counter";

export const metadata: Metadata = {
  title: "Library — OneIoT",
  description:
    "Every mockup component used to build the OneIoT site, in one gallery.",
};

type Entry = {
  name: string;
  blurb: string;
  span?: "full" | "half"; // grid spans on the right column
  node: React.ReactNode;
};

type Category = {
  id: string;
  label: string;
  description: string;
  entries: Entry[];
};

const categories: Category[] = [
  {
    id: "platform-agents",
    label: "Platform agents",
    description: "The four-stage workflow that defines the OneIoT platform.",
    entries: [
      { name: "DeviceDiscover", blurb: "Network-scan sidebar + auto-registered device card with vendor and protocol metadata.", node: <DeviceDiscover /> },
      { name: "ConfigPush", blurb: "Staged config template with tabs, color-highlighted thresholds, and rollout preview.", node: <ConfigPush /> },
      { name: "WorkflowTree", blurb: "Trigger node branching into parallel alert and actuator actions.", node: <WorkflowTree /> },
      { name: "AnomalyResponse", blurb: "Incoming anomaly + AI-suggested remediation with apply/dismiss controls.", node: <AnomalyResponse /> },
    ],
  },
  {
    id: "climate",
    label: "Climate workflow",
    description: "Sense → Compare → Actuate → Learn for cold chain, greenhouse, and data center.",
    entries: [
      { name: "Gauge", blurb: "Radial dial with target band and live value.", node: <Gauge /> },
      { name: "SetpointDiff", blurb: "Current vs proposed config table with AI confidence and energy delta.", node: <SetpointDiff /> },
      { name: "ValveActuator", blurb: "Streaming actuator commands with done / live / queued ack states.", node: <ValveActuator /> },
      { name: "LearningChart", blurb: "Model-error decay line chart, baseline vs learned model.", node: <LearningChart /> },
    ],
  },
  {
    id: "asset",
    label: "Asset workflow",
    description: "Locate → Route → Utilize → Maintain for fleet and construction.",
    entries: [
      { name: "MapTrail", blurb: "Map tile with GPS breadcrumb trail and pulsing live position.", node: <MapTrail /> },
      { name: "RouteOptimizer", blurb: "Current vs optimized route comparison with savings callout.", node: <RouteOptimizer /> },
      { name: "UtilizationBar", blurb: "Stacked active / idle / off bars per asset.", node: <UtilizationBar /> },
      { name: "ServiceTicket", blurb: "Auto-created maintenance ticket with severity, routing, and forecast source.", node: <ServiceTicket /> },
    ],
  },
  {
    id: "city",
    label: "Smart city workflow",
    description: "Observe → Decide → Dispatch → Report for municipal programs.",
    entries: [
      { name: "CameraGrid", blurb: "4×2 CCTV tiles with status dots and one mid-alert feed.", node: <CameraGrid /> },
      { name: "DecisionMatrix", blurb: "AI option matrix with chosen row highlighted and policy rationale.", node: <DecisionMatrix /> },
      { name: "CrewDispatch", blurb: "Field unit dispatch list with destinations, ETAs, and ack states.", node: <CrewDispatch /> },
      { name: "KpiSnapshot", blurb: "Council-ready KPI tiles plus a 12-week trend sparkline.", node: <KpiSnapshot /> },
    ],
  },
  {
    id: "observability",
    label: "SRE / observability",
    description: "The control plane your engineering team expects.",
    entries: [
      { name: "SandboxTerminal", blurb: "macOS-window terminal showing protected production shell with blocked escalations.", span: "full", node: <SandboxTerminal /> },
      { name: "AnomalyChart", blurb: "Stepped area chart of detections over a 24h window.", node: <AnomalyChart /> },
      { name: "ErrorRateSpike", blurb: "Flat blue baseline with red incident spike framed by dashed window markers.", node: <ErrorRateSpike /> },
      { name: "OtaRolloutCards", blurb: "Stacked PR-style rollout cards with success and partial-failure progress bars.", node: <OtaRolloutCards /> },
      { name: "FleetActivityTable", blurb: "4-row activity table with colored dot indicators and chip-style metric values.", node: <FleetActivityTable /> },
    ],
  },
  {
    id: "developer",
    label: "Developer / AI",
    description: "APIs, command palette, AI threads — surfaces engineers actually use.",
    entries: [
      { name: "ApiSnippet", blurb: "Language-tabbed code block with syntax highlights, copy button, and 200 OK footer.", node: <ApiSnippet /> },
      { name: "CommandPalette", blurb: "⌘K modal with searchable grouped commands and keyboard hints.", node: <CommandPalette /> },
      { name: "AgentThread", blurb: "AI conversation: user query → tool call → assistant answer with highlighted reasoning.", node: <AgentThread /> },
      { name: "WorldLatencyMap", blurb: "Flat dotted-continent world projection with edge region pins and p95 badges.", node: <WorldLatencyMap /> },
      { name: "DeviceHeatmap", blurb: "GitHub-style 7×26 calendar grid showing telemetry density over 6 months.", span: "full", node: <DeviceHeatmap /> },
    ],
  },
  {
    id: "audit",
    label: "Audit / governance",
    description: "Diffable, approvable, observable, reversible — the substrate of compliance.",
    entries: [
      { name: "DiffViewer", blurb: "Unified diff with line numbers, +/− gutters, syntax highlights, and approval footer.", node: <DiffViewer /> },
      { name: "SettingsToggle", blurb: "Sectioned governance toggles with descriptive hints and required-flag dots.", node: <SettingsToggle /> },
      { name: "ActivityFeed", blurb: "Vertical event stream with color-coded avatars and inline syntax highlights.", node: <ActivityFeed /> },
      { name: "DeploymentTimeline", blurb: "Vertical timeline of rollout events with status pills and commit hashes.", node: <DeploymentTimeline /> },
      { name: "MetricsRing", blurb: "Three circular progress rings showing SLA-grade reliability KPIs.", node: <MetricsRing /> },
    ],
  },
  {
    id: "product",
    label: "Product / marketing",
    description: "Pages of the product you'd actually link to in a tweet.",
    entries: [
      { name: "KanbanBoard", blurb: "Three-column rollout pipeline with category-tagged cards.", node: <KanbanBoard /> },
      { name: "GitGraph", blurb: "Three-lane commit history showing main, canary, and experiment branches.", node: <GitGraph /> },
      { name: "ChangelogTimeline", blurb: "Public-facing changelog grouped by date with category-coded entries.", node: <ChangelogTimeline /> },
      { name: "StatusPage", blurb: "90-day uptime grid per service plus the most recent resolved incident.", node: <StatusPage /> },
      { name: "PricingTable", blurb: "Three-tier feature comparison with highlighted middle tier.", span: "full", node: <PricingTable /> },
    ],
  },
  {
    id: "comparison-flow",
    label: "Comparison & flow",
    description: "Side-by-side comparisons, branching environments, and labeled-node workflow diagrams — the visuals that make a deck deck.",
    entries: [
      {
        name: "BeforeAfterChart",
        blurb: "Split-screen area-chart comparison with floating callout cards. The Neon-style \"avoid incidents\" framing.",
        span: "full",
        node: <BeforeAfterChart />,
      },
      {
        name: "BranchTimeline",
        blurb: "Branching environment timeline with database-pill swimlanes and dashed branch lines.",
        span: "full",
        node: <BranchTimeline />,
      },
      {
        name: "StackedConsoles",
        blurb: "Stacked floating macOS windows with named-agent chips and hovering cursors. The Daytona look.",
        span: "full",
        node: <StackedConsoles />,
      },
      {
        name: "VerticalAgentFlow",
        blurb: "Circular label nodes on the left, expanded mockup cards on the right, connected with teal arrows.",
        node: <VerticalAgentFlow />,
      },
      {
        name: "ParallelAgentPipeline",
        blurb: "Two device cards in a top row feeding two color-coded agent status cards below.",
        node: <ParallelAgentPipeline />,
      },
      {
        name: "FunnelToSlack",
        blurb: "Vertical pipeline ending in a Slack notification card — the way an alert actually surfaces.",
        span: "full",
        node: <FunnelToSlack />,
      },
    ],
  },
  {
    id: "pages-dashboards",
    label: "Pages & dashboards",
    description: "Full page-shaped mockups — breadcrumbs, tabs, focused-panel bento triplets, auth, deploys.",
    entries: [
      {
        name: "CronDashboard",
        blurb: "Page-within-a-page with breadcrumb, header, tab nav, scheduled-run table, and footer with Schedule / Command / Explore.",
        span: "full",
        node: <CronDashboard />,
      },
      {
        name: "ObservabilityBento",
        blurb: "Three-panel bento that auto-cycles focus every 6s — realtime logs → query logs → metrics → loop. All three data streams stay live throughout.",
        span: "full",
        node: <ObservabilityBento />,
      },
      {
        name: "DeployGlobe",
        blurb: "Wireframe globe with a floating deploy command tethered to a target region and runtime icons below.",
        node: <DeployGlobe />,
      },
      {
        name: "AuthPanel",
        blurb: "User list layered behind a sign-in form, plus a code-snippet card showing the signUp API call.",
        node: <AuthPanel />,
      },
    ],
  },
  {
    id: "photo-real",
    label: "Photo & real content",
    description:
      "Mockups that mix real Unsplash photography with the design system — testimonials, customer stories, team grids, industry photos, and media coverage.",
    entries: [
      {
        name: "TestimonialCard",
        blurb: "Large quote on top, customer headshot + identity + company accent at the bottom.",
        node: <TestimonialCard />,
      },
      {
        name: "CustomerStoryCard",
        blurb: "Hero industry photo with vertical chip overlay, story body, and a single hero metric.",
        node: <CustomerStoryCard />,
      },
      {
        name: "IndustryPhotoCard",
        blurb: "Full-bleed industry photo with eyebrow + title + description on a gradient overlay, plus a pinned metric chip.",
        span: "full",
        node: <IndustryPhotoCard />,
      },
      {
        name: "TeamGrid",
        blurb: "4×2 grid of team portraits with name, role, and city — hover-lifts the photo.",
        span: "full",
        node: <TeamGrid />,
      },
      {
        name: "MediaCoverage",
        blurb: "\"As seen in\" outlet strip + three featured article cards with thumbnails, outlet, date, and headline.",
        span: "full",
        node: <MediaCoverage />,
      },
      {
        name: "IsometricServiceMap",
        blurb: "Drawn isometric service graph with connected nodes, two mid-incident (red glow) and one warning (amber glow). eBPF service-map vibe.",
        node: <IsometricServiceMap />,
      },
      {
        name: "ProductShowcaseCardDark",
        blurb: "Dark card with embedded UI panel (Auto-instrument resources) + title and body underneath.",
        node: <ProductShowcaseCardDark />,
      },
      {
        name: "ProductShowcaseCard",
        blurb: "Light gray card with title/body top-left, tilted device photo bottom-right, neon-yellow Explore CTA. Akenza product-card style.",
        node: <ProductShowcaseCard />,
      },
      {
        name: "LifestylePhotoCard",
        blurb: "Over-the-shoulder lifestyle photo with overlay copy and a circular CTA. Pairs well with ProductShowcaseCard in a two-up grid.",
        node: <LifestylePhotoCard />,
      },
    ],
  },
  {
    id: "sales-legacy",
    label: "Sales (legacy)",
    description: "Pre-OneIoT mockups from the original CallSine design exploration.",
    entries: [
      { name: "ContactCard", blurb: "Prospect card with source-discovery sidebar and gradient sweep.", node: <ContactCard /> },
      { name: "EmailPreview", blurb: "Email composition with SALES ASSET / CASE STUDY toggle tabs.", node: <EmailPreview /> },
      { name: "SequenceTree", blurb: "Sending label branching into EMAIL and LINKEDIN channel cards.", span: "full", node: <SequenceTree /> },
    ],
  },
];

// Primitives — rendered with custom inline demo composition
const primitives = [
  {
    name: "AgentLabel",
    blurb: "Live-state chips: SENDING…, ANALYZING, RESEARCHING. Six semantic tones.",
    node: (
      <div className="flex flex-wrap gap-2">
        <AgentLabel tone="teal" loading>STREAMING</AgentLabel>
        <AgentLabel tone="green" loading>SENDING…</AgentLabel>
        <AgentLabel tone="amber" loading>WARNING</AgentLabel>
        <AgentLabel tone="red">FAILED</AgentLabel>
        <AgentLabel tone="purple" loading>ANALYZING</AgentLabel>
        <AgentLabel tone="blue" loading>SCHEDULING</AgentLabel>
        <AgentLabel tone="muted">DISMISSED</AgentLabel>
      </div>
    ),
  },
  {
    name: "GradientLine",
    blurb: "Purple→orange sweep beam used under mockup cards for liveness.",
    node: (
      <div className="space-y-3">
        <GradientLine />
        <GradientLine />
      </div>
    ),
  },
  {
    name: "Spinner",
    blurb: "Inline SVG spinner — sized for any context.",
    node: (
      <div className="flex items-center gap-6 text-foreground">
        <Spinner size={12} />
        <Spinner size={18} />
        <Spinner size={24} />
        <Spinner size={36} />
      </div>
    ),
  },
  {
    name: "AnimatedCounter",
    blurb: "Counts up from 0 when scrolled into view. Three concurrent examples.",
    node: (
      <div className="grid grid-cols-3 gap-6">
        <div>
          <div className="text-2xl font-semibold tabular-nums text-foreground">
            <AnimatedCounter to={100} suffix="K+" />
          </div>
          <div className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">
            Devices
          </div>
        </div>
        <div>
          <div className="text-2xl font-semibold tabular-nums text-foreground">
            <AnimatedCounter to={99.9} decimals={1} suffix="%" />
          </div>
          <div className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">
            Uptime
          </div>
        </div>
        <div>
          <div className="text-2xl font-semibold tabular-nums text-foreground">
            <AnimatedCounter to={6} />
          </div>
          <div className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">
            Countries
          </div>
        </div>
      </div>
    ),
  },
  {
    name: "SpotlightCard",
    blurb: "Hover-following radial gradient. Move your cursor across the cards below.",
    node: (
      <div className="grid grid-cols-3 gap-3">
        {(["teal", "purple", "amber"] as const).map((tone) => (
          <SpotlightCard
            key={tone}
            tone={tone}
            className="rounded-lg border border-border bg-surface p-4 text-center text-xs text-foreground"
          >
            tone=&quot;{tone}&quot;
          </SpotlightCard>
        ))}
      </div>
    ),
  },
];

function EntryCard({ entry }: { entry: Entry }) {
  return (
    <article className="flex h-full flex-col">
      <div className="mb-3">
        <h3 className="font-mono text-sm text-foreground">{entry.name}</h3>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          {entry.blurb}
        </p>
      </div>
      <div className="flex flex-1 items-center rounded-2xl border border-border bg-background p-6">
        <div className="w-full">{entry.node}</div>
      </div>
    </article>
  );
}

export default function LibraryPage() {
  const tocItems = [
    { id: "intro", label: "Overview" },
    ...categories.map((c) => ({ id: c.id, label: c.label })),
    { id: "primitives", label: "Primitives" },
  ];

  const totalEntries =
    categories.reduce((acc, c) => acc + c.entries.length, 0) +
    primitives.length;

  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-background">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-8">
          <div className="grid gap-12 md:grid-cols-[180px_1fr] md:gap-16">
            {/* Sticky sidebar nav */}
            <aside className="md:sticky md:top-24 md:self-start">
              <div className="label-mono mb-3 text-muted-foreground">
                LIBRARY
              </div>
              <nav>
                <ul className="space-y-1.5 text-sm">
                  {tocItems.map((t) => (
                    <li key={t.id}>
                      <a
                        href={`#${t.id}`}
                        className="block rounded-md border border-transparent px-2 py-1 text-muted-foreground transition-colors hover:border-border hover:bg-surface hover:text-foreground"
                      >
                        {t.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="mt-6 rounded-md border border-border bg-surface px-3 py-2 font-mono text-[10px] text-muted-foreground">
                {totalEntries} components
              </div>
            </aside>

            {/* Main column */}
            <div className="min-w-0 space-y-20">
              <section id="intro" className="scroll-mt-24">
                <span className="label-mono text-accent-teal">
                  INTERNAL · DESIGN-SYSTEM GALLERY
                </span>
                <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
                  Every mockup. One page.
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
                  Every dashboard, terminal, chart, table, and timeline used to
                  build the OneIoT site — composed from the same design tokens,
                  ready to drop into a new section or page.
                </p>
              </section>

              {categories.map((cat) => (
                <section key={cat.id} id={cat.id} className="scroll-mt-24">
                  <header className="mb-8 border-b border-border pb-5">
                    <div className="flex items-baseline justify-between gap-4">
                      <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                        {cat.label}
                      </h2>
                      <span className="font-mono text-[10px] text-muted-foreground">
                        {cat.entries.length} component
                        {cat.entries.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                    <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                      {cat.description}
                    </p>
                  </header>
                  <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {cat.entries.map((entry) => (
                      <div
                        key={entry.name}
                        className={
                          entry.span === "full" ? "lg:col-span-2" : undefined
                        }
                      >
                        <EntryCard entry={entry} />
                      </div>
                    ))}
                  </div>
                </section>
              ))}

              {/* Primitives section */}
              <section id="primitives" className="scroll-mt-24">
                <header className="mb-8 border-b border-border pb-5">
                  <div className="flex items-baseline justify-between gap-4">
                    <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                      Primitives
                    </h2>
                    <span className="font-mono text-[10px] text-muted-foreground">
                      {primitives.length} components
                    </span>
                  </div>
                  <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                    The low-level building blocks every mockup is composed
                    from.
                  </p>
                </header>
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                  {primitives.map((p) => (
                    <EntryCard key={p.name} entry={p} />
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
