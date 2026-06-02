import { cn } from "@/lib/utils";

type Node = {
  /** grid x in isometric tile units */
  gx: number;
  /** grid y in isometric tile units */
  gy: number;
  label: string;
  state?: "ok" | "incident" | "warning";
};

// Service nodes laid out on an isometric grid
const nodes: Node[] = [
  { gx: 0, gy: 0, label: "accounting" },
  { gx: 2, gy: -0.5, label: "quote" },
  { gx: 4, gy: -1, label: "otel-collector" },
  { gx: -1, gy: 1.5, label: "shipping", state: "incident" },
  { gx: 1.5, gy: 1, label: "checkout" },
  { gx: 3, gy: 0.5, label: "flagd", state: "warning" },
  { gx: 0.5, gy: 2.5, label: "payment" },
  { gx: 2.5, gy: 2.2, label: "ad" },
  { gx: 1.8, gy: 3.5, label: "recommendation" },
  { gx: 3.5, gy: 3, label: "currency" },
  { gx: -1, gy: 4, label: "172.66.40.94:443" },
  { gx: -2, gy: 3, label: "172.66.43.62:443" },
  { gx: -1.5, gy: 5.5, label: "client12.google.com" },
  { gx: 4, gy: 4.5, label: "451" },
  { gx: 1, gy: 5.5, label: "frontend", state: "incident" },
];

// Edges connect by index pairs
const edges: Array<[number, number]> = [
  [0, 1],
  [1, 2],
  [3, 4],
  [4, 5],
  [5, 2],
  [4, 6],
  [4, 7],
  [6, 8],
  [7, 8],
  [7, 9],
  [8, 14],
  [6, 10],
  [10, 11],
  [10, 12],
  [9, 13],
  [14, 9],
];

// Isometric projection — each tile is TILE wide horizontally
const TILE = 50;
const ORIGIN_X = 320;
const ORIGIN_Y = 80;

function project(gx: number, gy: number): { x: number; y: number } {
  return {
    x: ORIGIN_X + (gx - gy) * TILE,
    y: ORIGIN_Y + (gx + gy) * TILE * 0.5,
  };
}

const stateStyle: Record<NonNullable<Node["state"]>, { fill: string; glow: string; text: string }> = {
  ok: {
    fill: "var(--surface-elevated)",
    glow: "var(--border-strong)",
    text: "var(--muted-foreground)",
  },
  incident: {
    fill: "var(--accent-red)",
    glow: "var(--accent-red)",
    text: "var(--foreground)",
  },
  warning: {
    fill: "var(--accent-amber)",
    glow: "var(--accent-amber)",
    text: "var(--foreground)",
  },
};

/**
 * Isometric service map — eBPF-style network graph with service nodes
 * connected by edges. Two nodes are mid-incident (red glow) to draw
 * the eye. Pure SVG, dark theme.
 */
export function IsometricServiceMap({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-2xl",
        className,
      )}
    >
      {/* the map */}
      <div className="relative -mx-2 mb-6 aspect-[5/4] flex-1 overflow-hidden">
        <svg
          viewBox="-50 0 750 540"
          className="size-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <radialGradient id="ism-glow-red" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--accent-red)" stopOpacity="0.65" />
              <stop offset="100%" stopColor="var(--accent-red)" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="ism-glow-amber" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--accent-amber)" stopOpacity="0.55" />
              <stop offset="100%" stopColor="var(--accent-amber)" stopOpacity="0" />
            </radialGradient>
            {/* faint isometric ground grid */}
            <pattern
              id="ism-grid"
              width={TILE * 2}
              height={TILE}
              patternUnits="userSpaceOnUse"
              patternTransform={`translate(${ORIGIN_X}, ${ORIGIN_Y})`}
            >
              <path
                d={`M 0 ${TILE * 0.5} L ${TILE} 0 L ${TILE * 2} ${TILE * 0.5} L ${TILE} ${TILE} Z`}
                fill="none"
                stroke="var(--border)"
                strokeOpacity="0.4"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>

          {/* background grid */}
          <rect width="750" height="540" fill="url(#ism-grid)" opacity="0.5" />

          {/* edges */}
          {edges.map(([a, b], i) => {
            const A = project(nodes[a].gx, nodes[a].gy);
            const B = project(nodes[b].gx, nodes[b].gy);
            return (
              <line
                key={i}
                x1={A.x}
                y1={A.y}
                x2={B.x}
                y2={B.y}
                stroke="var(--border-strong)"
                strokeWidth="1"
                strokeOpacity="0.6"
              />
            );
          })}

          {/* nodes */}
          {nodes.map((n) => {
            const p = project(n.gx, n.gy);
            const state = n.state ?? "ok";
            const style = stateStyle[state];
            const isAlerting = state === "incident" || state === "warning";
            return (
              <g key={n.label} transform={`translate(${p.x}, ${p.y})`}>
                {/* halo for alerting nodes */}
                {isAlerting && (
                  <circle
                    cx="0"
                    cy="0"
                    r="32"
                    fill={state === "incident" ? "url(#ism-glow-red)" : "url(#ism-glow-amber)"}
                  />
                )}
                {/* isometric diamond node */}
                <path
                  d={`M 0 -12 L 18 0 L 0 12 L -18 0 Z`}
                  fill={style.fill}
                  stroke={style.glow}
                  strokeWidth={isAlerting ? "1.5" : "0.8"}
                />
                {/* node icon */}
                {state === "incident" && (
                  <text
                    y="3"
                    textAnchor="middle"
                    fontSize="9"
                    fontFamily="monospace"
                    fill="white"
                  >
                    ✕
                  </text>
                )}
                {state === "warning" && (
                  <text
                    y="3"
                    textAnchor="middle"
                    fontSize="9"
                    fontFamily="monospace"
                    fill="white"
                  >
                    !
                  </text>
                )}
                {/* label */}
                <text
                  y="-18"
                  textAnchor="middle"
                  fontSize="9"
                  fontFamily="monospace"
                  fill={style.text}
                >
                  {n.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* title + body */}
      <div className="mt-auto">
        <h3 className="text-lg font-semibold tracking-tight text-foreground">
          eBPF-based service map
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          See network flows, auto-instrument databases, and track SLOs.
        </p>
      </div>
    </div>
  );
}
