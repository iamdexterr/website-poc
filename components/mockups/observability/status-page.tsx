import { cn } from "@/lib/utils";

type Tone = "green" | "amber" | "red";

// Per-service uptime seeds — each service has its own incident pattern, so
// the 4 bars look distinct (real status pages aren't perfectly uniform).
// Cell values: 0 = up, 1 = partial, 2 = down. 90 cells = 90 days.
function makeSeed(spec: Array<{ at: number; v: 1 | 2 }>): number[] {
  const arr = Array<number>(90).fill(0);
  for (const s of spec) arr[s.at] = s.v;
  return arr;
}

type Service = {
  name: string;
  description: string;
  uptime: string;
  incidents: number;
  tone: Tone;
  seed: number[];
};

const services: Service[] = [
  {
    name: "Ingest API",
    description: "MQTT 5 · CoAP · Modbus ingestion endpoints",
    uptime: "99.99%",
    incidents: 1,
    tone: "green",
    seed: makeSeed([{ at: 18, v: 1 }]),
  },
  {
    name: "Streaming SQL",
    description: "Real-time queries over the telemetry stream",
    uptime: "99.98%",
    incidents: 2,
    tone: "green",
    seed: makeSeed([
      { at: 6, v: 1 },
      { at: 47, v: 1 },
    ]),
  },
  {
    name: "Device shell",
    description: "Audit-gated SSH for production devices",
    uptime: "99.91%",
    incidents: 4,
    tone: "amber",
    seed: makeSeed([
      { at: 12, v: 1 },
      { at: 34, v: 2 },
      { at: 35, v: 2 },
      { at: 68, v: 1 },
    ]),
  },
  {
    name: "Edge gateways",
    description: "Regional gateway control plane",
    uptime: "100%",
    incidents: 0,
    tone: "green",
    seed: makeSeed([]),
  },
];

const cellTone: Record<number, string> = {
  0: "bg-accent-green/70 hover:bg-accent-green",
  1: "bg-accent-amber/70 hover:bg-accent-amber",
  2: "bg-accent-red/80 hover:bg-accent-red",
};

const toneText: Record<Tone, string> = {
  green: "text-accent-green",
  amber: "text-accent-amber",
  red: "text-accent-red",
};

const toneDot: Record<Tone, string> = {
  green: "bg-accent-green",
  amber: "bg-accent-amber",
  red: "bg-accent-red",
};

type Stage = "investigating" | "identified" | "monitoring" | "resolved";

type Step = {
  stage: Stage;
  time: string;
  delta?: string; // duration since previous step
  author: string;
  body: string;
};

const incident: {
  title: string;
  start: string;
  duration: string;
  steps: Step[];
} = {
  title: "Elevated latency in device shell · IAD",
  start: "26 May · 14:18 UTC",
  duration: "11m 04s",
  steps: [
    {
      stage: "investigating",
      time: "14:18",
      author: "OneIoT bot",
      body: "Increased p95 on device-shell endpoints in IAD.",
    },
    {
      stage: "identified",
      time: "14:22",
      delta: "+4m",
      author: "Sam L.",
      body: "Upstream DNS regression at the IAD POP.",
    },
    {
      stage: "monitoring",
      time: "14:26",
      delta: "+4m",
      author: "OneIoT bot",
      body: "Failed over to secondary resolver. Latency dropping.",
    },
    {
      stage: "resolved",
      time: "14:29",
      delta: "+3m",
      author: "Priya N.",
      body: "p95 returned to baseline. Postmortem opened.",
    },
  ],
};

const stageStyle: Record<
  Stage,
  { label: string; text: string; dot: string; ring: string; chip: string }
> = {
  investigating: {
    label: "Investigating",
    text: "text-accent-amber",
    dot: "bg-accent-amber",
    ring: "ring-accent-amber/20",
    chip: "border-accent-amber/30 bg-accent-amber/10 text-accent-amber",
  },
  identified: {
    label: "Identified",
    text: "text-accent-orange",
    dot: "bg-accent-orange",
    ring: "ring-accent-orange/20",
    chip: "border-accent-orange/30 bg-accent-orange/10 text-accent-orange",
  },
  monitoring: {
    label: "Monitoring",
    text: "text-accent-blue",
    dot: "bg-accent-blue",
    ring: "ring-accent-blue/20",
    chip: "border-accent-blue/30 bg-accent-blue/10 text-accent-blue",
  },
  resolved: {
    label: "Resolved",
    text: "text-accent-green",
    dot: "bg-accent-green",
    ring: "ring-accent-green/25",
    chip: "border-accent-green/30 bg-accent-green/10 text-accent-green",
  },
};

function ServiceRow({ svc }: { svc: Service }) {
  return (
    <li className="space-y-2 border-b border-border pb-4 last:border-b-0 last:pb-0">
      {/* row header */}
      <div className="flex items-baseline justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-sm">
            <span className={cn("size-1.5 rounded-full", toneDot[svc.tone])} />
            <span className="font-medium text-foreground">{svc.name}</span>
          </div>
          <div className="ml-3.5 mt-0.5 font-mono text-[10px] text-muted-foreground">
            {svc.description}
          </div>
        </div>
        <div className="shrink-0 text-right">
          <div className={cn("font-mono text-xs", toneText[svc.tone])}>
            {svc.uptime}
          </div>
          <div className="mt-0.5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
            {svc.incidents === 0
              ? "no incidents"
              : `${svc.incidents} incident${svc.incidents !== 1 ? "s" : ""}`}
          </div>
        </div>
      </div>

      {/* the 90-day bar grid */}
      <div className="flex gap-0.5">
        {svc.seed.map((v, j) => (
          <div
            key={j}
            className={cn(
              "h-6 flex-1 cursor-pointer rounded-xs transition-colors",
              cellTone[v],
            )}
            title={`${90 - j} days ago · ${
              v === 0 ? "operational" : v === 1 ? "partial outage" : "major outage"
            }`}
          />
        ))}
      </div>
    </li>
  );
}

/**
 * Status page — confident "all systems operational" hero, four service rows
 * with per-service uptime bars showing distinct incident patterns, date
 * axis, and a full incident timeline with investigation/identification/
 * monitoring/resolved steps. Mirrors statuspage.io / Vercel status.
 */
export function StatusPage({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl",
        className,
      )}
    >
      {/* HERO STATUS BANNER */}
      <div className="border-b border-border bg-accent-green/4 px-6 py-5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <span className="absolute inset-0 animate-pulse-dot rounded-full bg-accent-green/40 blur-md" />
              <span className="relative flex size-3 items-center justify-center rounded-full bg-accent-green">
                <span className="size-1 rounded-full bg-background" />
              </span>
            </div>
            <div>
              <div className="text-lg font-semibold tracking-tight text-foreground">
                All systems operational
              </div>
              <div className="mt-0.5 font-mono text-[11px] text-muted-foreground">
                Last checked just now · refreshes every 30s
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-mono text-2xl font-semibold tabular-nums text-accent-green">
              99.98%
            </div>
            <div className="mt-0.5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
              90-day uptime
            </div>
          </div>
        </div>
      </div>

      {/* SERVICE ROWS */}
      <div className="px-6 py-5">
        <ul className="space-y-4">
          {services.map((svc) => (
            <ServiceRow key={svc.name} svc={svc} />
          ))}
        </ul>

        {/* axis + legend */}
        <div className="mt-4 flex items-center justify-between font-mono text-[10px] text-muted-foreground">
          <span>90 days ago</span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-xs bg-accent-green/70" />
              Operational
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-xs bg-accent-amber/70" />
              Partial
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-xs bg-accent-red/80" />
              Outage
            </span>
          </div>
          <span>today</span>
        </div>
      </div>

      {/* INCIDENT TIMELINE */}
      <div className="border-t border-border bg-background/40 px-6 py-5">
        <div className="mb-3 flex items-center justify-between">
          <div className="label-mono text-muted-foreground">
            MOST RECENT INCIDENT
          </div>
          <span className="rounded-md border border-accent-green/30 bg-accent-green/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-accent-green">
            ✓ Resolved · {incident.duration}
          </span>
        </div>

        <div className="mb-4 flex items-baseline justify-between gap-3">
          <div className="text-sm font-medium text-foreground">
            {incident.title}
          </div>
          <div className="font-mono text-[10px] text-muted-foreground">
            {incident.start}
          </div>
        </div>

        <ol className="relative space-y-4 pl-7">
          {/* Brighter thread running through the dots */}
          <span
            className="pointer-events-none absolute bottom-3 left-2.25 top-3 w-px bg-border-strong"
            aria-hidden
          />
          {incident.steps.map((step, i) => {
            const style = stageStyle[step.stage];
            const isLast = i === incident.steps.length - 1;
            return (
              <li key={step.stage} className="relative">
                {/* stage dot — color-coded per stage, ring glow on all */}
                <span
                  className={cn(
                    "absolute -left-7 top-1.5 size-3.5 rounded-full ring-4",
                    style.dot,
                    style.ring,
                  )}
                  aria-hidden
                />

                {/* header row: stage chip + author · time (delta) */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider",
                      style.chip,
                    )}
                  >
                    {isLast ? "✓" : "◆"} {style.label}
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    by{" "}
                    <span className="text-foreground">{step.author}</span>
                  </span>
                  <span className="ml-auto flex items-baseline gap-1.5 font-mono text-[10px] text-muted-foreground">
                    {step.delta && (
                      <span className="rounded border border-border bg-background/60 px-1 py-px text-[9px]">
                        {step.delta}
                      </span>
                    )}
                    <span className="text-foreground">{step.time}</span>
                  </span>
                </div>

                {/* body — slightly indented under the header for breathing room */}
                <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </li>
            );
          })}
        </ol>
      </div>

      {/* FOOTER ACTIONS */}
      <div className="flex items-center justify-between border-t border-border bg-background/40 px-6 py-3 font-mono text-[10px] text-muted-foreground">
        <a className="inline-flex items-center gap-1.5 hover:text-foreground" href="#">
          <span aria-hidden>◇</span>
          Incident history
        </a>
        <a className="inline-flex items-center gap-1.5 hover:text-foreground" href="#">
          <span aria-hidden>✉</span>
          Subscribe to updates
          <span aria-hidden>↗</span>
        </a>
      </div>
    </div>
  );
}
