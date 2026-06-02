"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useLogStream } from "@/components/motion/use-log-stream";
import { useChartStream } from "@/components/motion/use-chart-stream";

// ── Realtime logs data ──────────────────────────────────────────────────

type Method = "GET" | "POST";
type RealtimeRow = { time: string; method: Method; id: string };

const methodPool: Method[] = ["POST", "POST", "POST", "GET", "POST", "GET", "POST"];
const idPool = [
  "45c43918-32b6-4009-9942-21a596fd2…",
  "08c22956-78e6-4d41-8b2c-751cb12bc…",
  "40280d2e-fe71-4516-adcd-0a06e8f08…",
  "28c07cf2-a9e1-437e-bc4f-ba4e4bcc6…",
  "bdd4ae88-250f-4902-9a8a-91cb1a0db…",
  "04136c9b-f56a-4eb6-a302-8eb9b4a08…",
  "da670d0f-2867-4634-aefb-3536f854c…",
  "fb0c54bc-5da7-4bb9-bc1b-ffa7d37ac…",
  "8109b9ef-0bc6-476b-b4fb-21d9a94aa…",
];

const realtimeSeed: RealtimeRow[] = [
  { time: "19:49:11", method: "POST", id: idPool[0] },
  { time: "19:49:09", method: "POST", id: idPool[1] },
  { time: "19:49:09", method: "POST", id: idPool[2] },
  { time: "19:49:06", method: "GET", id: idPool[3] },
  { time: "19:49:05", method: "POST", id: idPool[4] },
  { time: "19:49:03", method: "POST", id: idPool[5] },
  { time: "19:48:52", method: "POST", id: idPool[6] },
  { time: "19:15:32", method: "GET", id: idPool[7] },
];

// ── Query logs data ─────────────────────────────────────────────────────

type Level = "LOG" | "INFO" | "ERROR";
type QueryRow = { time: string; level: Level; body: string };

const querySeed: QueryRow[] = [
  { time: "23:17:59", level: "INFO", body: "booted (time: 68ms)" },
  { time: "23:17:58", level: "INFO", body: "booted (time: 99ms)" },
  { time: "23:17:58", level: "INFO", body: "booted (time: 91ms)" },
  { time: "23:17:57", level: "LOG", body: '{ query: "cors" }' },
  { time: "23:17:56", level: "LOG", body: '{ query: "auth" }' },
  { time: "23:17:56", level: "INFO", body: "booted (time: 88ms)" },
  { time: "23:17:41", level: "INFO", body: "booted (time: 62ms)" },
  { time: "23:17:39", level: "INFO", body: "booted (time: 91ms)" },
];

const levelTone: Record<Level, string> = {
  LOG: "text-accent-blue",
  INFO: "text-accent-blue",
  ERROR: "text-accent-red",
};

const queryGenerators: Array<() => Pick<QueryRow, "level" | "body">> = [
  () => ({ level: "INFO", body: `booted (time: ${50 + Math.floor(Math.random() * 80)}ms)` }),
  () => ({ level: "LOG", body: '{ query: "context" }' }),
  () => ({ level: "LOG", body: '{ query: "cors" }' }),
  () => ({ level: "LOG", body: '{ query: "auth" }' }),
  () => ({ level: "LOG", body: '{ query: "telemetry" }' }),
  () => ({ level: "ERROR", body: "warning: Use of deprecated API." }),
];

// ── Metrics chart data ──────────────────────────────────────────────────

const W = 360;
const H = 110;
const CAP = 60;
const TARGET_MIN = 2.0;
const TARGET_MAX = 6.0;
const CHART_MIN = 0.5;
const CHART_MAX = 8.0;

const metricsSeed: number[] = [
  4.5, 4.7, 4.9, 5.1, 5.3, 5.4, 5.2, 4.9, 4.7, 4.5,
  4.4, 4.3, 4.5, 4.8, 5.2, 5.5, 5.6, 5.4, 5.0, 4.7,
  4.4, 4.2, 4.1, 4.2, 4.4, 4.5, 4.4, 4.2, 3.9, 3.7,
  3.5, 3.4, 3.3, 3.5, 3.8, 4.1, 4.3, 4.4, 4.5, 4.7,
  4.9, 5.0, 5.0, 4.9, 4.7, 4.5, 4.4, 4.3, 4.4, 4.5,
  4.6, 4.6, 4.5, 4.4, 4.5, 4.6, 4.7, 4.7, 4.6, 4.65,
];

function buildChartPaths(buffer: number[]): { area: string; line: string } {
  if (buffer.length === 0) return { area: "", line: "" };
  const padTop = 8;
  const padBottom = 8;
  const innerH = H - padTop - padBottom;
  const range = CHART_MAX - CHART_MIN;
  const dx = W / (CAP - 1);
  const points = buffer.map((v, i) => {
    const x = i * dx;
    const clamped = Math.max(CHART_MIN, Math.min(CHART_MAX, v));
    const y = padTop + innerH - ((clamped - CHART_MIN) / range) * innerH;
    return { x, y };
  });
  let line = `M ${points[0].x.toFixed(2)},${points[0].y.toFixed(2)}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    line += ` C ${cp1x.toFixed(2)},${cp1y.toFixed(2)} ${cp2x.toFixed(2)},${cp2y.toFixed(2)} ${p2.x.toFixed(2)},${p2.y.toFixed(2)}`;
  }
  const area = `${line} L ${W},${H} L 0,${H} Z`;
  return { area, line };
}

function valueToY(v: number): number {
  const padTop = 8;
  const padBottom = 8;
  const innerH = H - padTop - padBottom;
  const range = CHART_MAX - CHART_MIN;
  const clamped = Math.max(CHART_MIN, Math.min(CHART_MAX, v));
  return padTop + innerH - ((clamped - CHART_MIN) / range) * innerH;
}

function nowHMS(): string {
  const d = new Date();
  return [d.getHours(), d.getMinutes(), d.getSeconds()]
    .map((n) => String(n).padStart(2, "0"))
    .join(":");
}

// ── Panel wrappers — one per type ───────────────────────────────────────

type PanelKind = "realtime" | "query" | "metrics";

function PanelShell({
  title,
  description,
  focused,
  children,
}: {
  title: string;
  description: string;
  focused: boolean;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      layout
      transition={{
        layout: SMOOTH,
        opacity: SMOOTH,
        filter: SMOOTH,
      }}
      animate={{
        opacity: focused ? 1 : 0.35,
        filter: focused ? "saturate(1)" : "saturate(0.5)",
      }}
      className={cn(
        "flex h-full flex-col rounded-2xl border bg-surface p-5 transition-shadow duration-700",
        focused
          ? "border-border shadow-2xl"
          : "border-border/40",
      )}
    >
      <div className="label-mono text-muted-foreground">{title}</div>
      <div className="mt-4 min-h-0 flex-1 overflow-hidden">{children}</div>
      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
        {description}
      </p>
    </motion.div>
  );
}

function RealtimePanel({
  entries,
}: {
  entries: Array<{ id: string; data: RealtimeRow }>;
}) {
  return (
    <ul className="relative h-full overflow-hidden">
      <AnimatePresence initial={false}>
        {entries.map((entry) => (
          <motion.li
            key={entry.id}
            layout
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{
              layout: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 0.3 },
              y: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
            }}
            className="grid h-9 grid-cols-[150px_44px_60px_1fr] items-center gap-2 border-b border-border/40 font-mono text-[11px]"
          >
            <span className="text-muted-foreground">
              27 May {entry.data.time}
            </span>
            <span className="inline-flex h-4 w-9 items-center justify-center rounded-md border border-border bg-background/60 text-[9px] text-muted-foreground">
              200
            </span>
            <span className="text-foreground">{entry.data.method}</span>
            <span className="truncate text-muted-foreground">
              {entry.data.id}
            </span>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}

function QueryPanel({
  entries,
}: {
  entries: Array<{ id: string; data: QueryRow }>;
}) {
  return (
    <ul className="relative h-full overflow-hidden">
      <AnimatePresence initial={false}>
        {entries.map((entry) => (
          <motion.li
            key={entry.id}
            layout
            initial={{ opacity: 0, y: -28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{
              layout: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 0.3 },
              y: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
            }}
            className="grid h-9 grid-cols-[150px_80px_1fr] items-center gap-2 border-b border-border/40 font-mono text-[11px]"
          >
            <span className="text-muted-foreground">
              27 May {entry.data.time}
            </span>
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-md border border-border bg-background/60 px-1.5 py-0.5",
                levelTone[entry.data.level],
              )}
            >
              <span aria-hidden>◷</span>
              {entry.data.level}
            </span>
            <span
              className={cn(
                "truncate",
                entry.data.level === "ERROR"
                  ? "text-accent-red"
                  : "text-muted-foreground",
              )}
            >
              {entry.data.body}
            </span>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}

function MetricsPanel({
  buffer,
}: {
  buffer: number[];
}) {
  const { area, line } = useMemo(() => buildChartPaths(buffer), [buffer]);
  const present = buffer[buffer.length - 1] ?? 0;
  const drift = useMemo(() => {
    if (buffer.length === 0) return 0;
    const mean = buffer.reduce((s, v) => s + v, 0) / buffer.length;
    const variance =
      buffer.reduce((s, v) => s + (v - mean) ** 2, 0) / buffer.length;
    return Math.sqrt(variance);
  }, [buffer]);
  const inRange = present >= TARGET_MIN && present <= TARGET_MAX;
  const yUpper = valueToY(TARGET_MAX);
  const yLower = valueToY(TARGET_MIN);

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-background/60 p-5">
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        <span>TEMP · HYD-COLD-23</span>
        <span className="flex items-center gap-1.5">
          <span
            className={cn(
              "size-1.5 animate-pulse-dot rounded-full",
              inRange ? "bg-accent-teal" : "bg-accent-red",
            )}
          />
          <span className={inRange ? "text-accent-teal" : "text-accent-red"}>
            {inRange ? "IN RANGE" : "OUT OF RANGE"}
          </span>
          <span className="text-border">·</span>
          <span>2–6°C</span>
        </span>
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mt-3 w-full flex-1"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="ob-metrics-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent-teal)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--accent-teal)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {Array.from({ length: 12 }).map((_, i) => (
          <line
            key={i}
            x1={(W / 12) * (i + 1)}
            x2={(W / 12) * (i + 1)}
            y1="0"
            y2={H}
            stroke="var(--border)"
            strokeOpacity="0.4"
            strokeWidth="0.5"
          />
        ))}
        <line x1="0" x2={W} y1={yUpper} y2={yUpper} stroke="var(--accent-teal)" strokeOpacity="0.35" strokeDasharray="3 3" strokeWidth="0.7" />
        <line x1="0" x2={W} y1={yLower} y2={yLower} stroke="var(--accent-teal)" strokeOpacity="0.35" strokeDasharray="3 3" strokeWidth="0.7" />
        <motion.path
          d={area}
          fill="url(#ob-metrics-grad)"
          animate={{ d: area }}
          transition={{ duration: 1.5, ease: "linear" }}
        />
        <motion.path
          d={line}
          stroke="var(--accent-teal)"
          strokeWidth="1.5"
          fill="none"
          animate={{ d: line }}
          transition={{ duration: 1.5, ease: "linear" }}
        />
      </svg>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-semibold tabular-nums tracking-tight text-foreground">
              {present.toFixed(2)}
            </span>
            <span className="text-base text-muted-foreground">°C</span>
          </div>
          <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            PRESENT · ROLLING 32M
          </div>
        </div>
        <div className="text-right">
          <div className="font-mono text-base tabular-nums text-foreground">
            σ {drift.toFixed(2)}
          </div>
          <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            DRIFT
          </div>
        </div>
      </div>
    </div>
  );
}

// ── The composed bento ──────────────────────────────────────────────────

const PANEL_ORDER: PanelKind[] = ["realtime", "query", "metrics"];
const CYCLE_MS = 8000;

// Single shared transition spec so every animated element moves on the
// same curve and duration — orchestration over chaos.
const SMOOTH = {
  duration: 0.9,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};
// Pre-bake the class strings so Tailwind sees them at build time
const colSpanClass: Record<number, string> = {
  3: "md:col-span-3",
  4: "md:col-span-4",
  5: "md:col-span-5",
  6: "md:col-span-6",
};

const PANEL_META: Record<
  PanelKind,
  { title: string; description: string; focusedColSpan: number; fadedColSpan: number }
> = {
  realtime: {
    title: "REALTIME LOGS",
    description:
      "Stream logs to the dashboard in realtime. Logs are populated with rich metadata to help debugging.",
    focusedColSpan: 5,
    fadedColSpan: 3,
  },
  query: {
    title: "QUERY LOGS VIA LOG EXPLORER",
    description:
      "Get deeper insights into how your functions are behaving by writing SQL queries on function logs.",
    focusedColSpan: 6,
    fadedColSpan: 4,
  },
  metrics: {
    title: "METRICS",
    description: "Dashboards show the health of your functions at all times.",
    focusedColSpan: 5,
    fadedColSpan: 3,
  },
};

/**
 * Three-panel observability bento that auto-cycles which panel is focused.
 * Every CYCLE_MS, the focus moves: realtime → query → metrics → loop.
 * All three panels render their full live-streaming form at all times;
 * the focused/unfocused difference is conveyed by the shell's opacity and
 * saturation, and by the column-width animation via `motion.div layout`.
 */
export function ObservabilityBento({ className }: { className?: string }) {
  const [focusIndex, setFocusIndex] = useState(0);

  // Auto-cycle the focused panel
  useEffect(() => {
    const tick = setInterval(() => {
      setFocusIndex((i) => (i + 1) % PANEL_ORDER.length);
    }, CYCLE_MS);
    return () => clearInterval(tick);
  }, []);

  // All three data streams run continuously — that way each panel still
  // shows live motion even when it's faded.

  const realtimeNext = useCallback<() => RealtimeRow>(() => {
    const r = Math.floor(Math.random() * 100);
    return {
      time: nowHMS(),
      method: methodPool[r % methodPool.length],
      id: idPool[r % idPool.length],
    };
  }, []);
  const realtimeEntries = useLogStream<RealtimeRow>({
    seed: realtimeSeed,
    next: realtimeNext,
    cap: 8,
    intervalMs: 2000,
  });

  const queryNext = useCallback<() => QueryRow>(() => {
    const useError = Math.random() < 0.1;
    const gen = useError
      ? queryGenerators[5]
      : queryGenerators[Math.floor(Math.random() * 5)];
    return { time: nowHMS(), ...gen() };
  }, []);
  const queryEntries = useLogStream<QueryRow>({
    seed: querySeed,
    next: queryNext,
    cap: 8,
    intervalMs: 1800,
  });

  const metricsState = useRef({ value: metricsSeed[metricsSeed.length - 1], phase: 0 });
  const metricsNext = useCallback(() => {
    const s = metricsState.current;
    s.phase += 0.18;
    const sinusoid = Math.sin(s.phase) * 0.18 + Math.sin(s.phase * 0.37) * 0.12;
    const noise = (Math.random() - 0.5) * 0.35;
    const restore = (4.0 - s.value) * 0.06;
    let v = s.value + sinusoid * 0.3 + noise + restore;
    v = Math.max(CHART_MIN, Math.min(CHART_MAX, v));
    s.value = v;
    return v;
  }, []);
  const metricsBuffer = useChartStream({
    seed: metricsSeed,
    next: metricsNext,
    cap: CAP,
    intervalMs: 1500,
  });

  return (
    <div className={cn("flex h-full flex-col gap-4", className)}>
      {/* Focus indicator dots — show which panel is currently in focus */}
      <div className="flex items-center justify-center gap-2">
        {PANEL_ORDER.map((kind, i) => (
          <button
            key={kind}
            type="button"
            onClick={() => setFocusIndex(i)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
              i === focusIndex
                ? "w-8 bg-accent-teal"
                : "w-1.5 bg-border-strong hover:bg-muted-foreground",
            )}
            aria-label={`Focus ${kind}`}
          />
        ))}
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-12 gap-3">
        {PANEL_ORDER.map((kind, i) => {
          const focused = i === focusIndex;
          const meta = PANEL_META[kind];
          const colSpan = focused ? meta.focusedColSpan : meta.fadedColSpan;
          return (
            <motion.div
              key={kind}
              layout
              transition={{ layout: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
              className={cn("col-span-12 h-full min-h-0", colSpanClass[colSpan])}
            >
              <PanelShell
                title={meta.title}
                description={meta.description}
                focused={focused}
              >
                {kind === "realtime" && (
                  <RealtimePanel entries={realtimeEntries} />
                )}
                {kind === "query" && (
                  <QueryPanel entries={queryEntries} />
                )}
                {kind === "metrics" && (
                  <MetricsPanel buffer={metricsBuffer} />
                )}
              </PanelShell>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
