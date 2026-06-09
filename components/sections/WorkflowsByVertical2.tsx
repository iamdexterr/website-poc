"use client";

import { motion } from "motion/react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FadeUp } from "@/components/motion/fade-up";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { cn } from "@/lib/utils";

type Tone = "teal" | "purple" | "green" | "blue" | "amber";

const toneText: Record<Tone, string> = {
  teal: "text-accent-teal",
  purple: "text-accent-purple",
  green: "text-accent-green",
  blue: "text-accent-blue",
  amber: "text-accent-amber",
};

const toneBg: Record<Tone, string> = {
  teal: "bg-accent-teal",
  purple: "bg-accent-purple",
  green: "bg-accent-green",
  blue: "bg-accent-blue",
  amber: "bg-accent-amber",
};

const toneBorder: Record<Tone, string> = {
  teal: "border-accent-teal/30",
  purple: "border-accent-purple/30",
  green: "border-accent-green/30",
  blue: "border-accent-blue/30",
  amber: "border-accent-amber/30",
};

const toneVar: Record<Tone, string> = {
  teal: "var(--accent-teal)",
  purple: "var(--accent-purple)",
  green: "var(--accent-green)",
  blue: "var(--accent-blue)",
  amber: "var(--accent-amber)",
};

const toneRgb: Record<Tone, string> = {
  teal: "2,161,147",
  purple: "139,92,246",
  green: "52,211,153",
  blue: "59,130,246",
  amber: "245,158,11",
};

function SenseGraphic({ tone }: { tone: Tone }) {
  const rgb = toneRgb[tone];
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border"
          style={{ borderColor: `rgba(${rgb}, 0.5)` }}
          initial={{ width: 12, height: 12, opacity: 0.9 }}
          animate={{ width: 12 + i * 32, height: 12 + i * 32, opacity: 0 }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            delay: i * 0.7,
            ease: "easeOut",
          }}
        />
      ))}
      {}
      <motion.div
        className="relative z-10 rounded-full"
        style={{ width: 12, height: 12, background: `rgba(${rgb}, 0.9)` }}
        animate={{ scale: [1, 1.25, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      {}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
        {[
          { label: "TEMP", val: "22.4°C" },
          { label: "CO₂", val: "420ppm" },
          { label: "RH", val: "55%" },
        ].map((r, i) => (
          <motion.div
            key={r.label}
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.2, duration: 0.5 }}
          >
            <span className="font-mono text-[8px] text-white/40">{r.label}</span>
            <span
              className="font-mono text-[10px] font-semibold"
              style={{ color: `rgba(${rgb}, 0.9)` }}
            >
              {r.val}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function CompareGraphic({ tone }: { tone: Tone }) {
  const rgb = toneRgb[tone];
  return (
    <div className="flex h-full w-full items-center justify-center gap-3 px-6">
      {}
      <div className="flex flex-col items-center gap-1">
        <span className="font-mono text-[8px] text-white/40">CURRENT</span>
        <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
          <span className="font-mono text-lg font-bold text-white/60">21°C</span>
        </div>
      </div>

      {}
      <div className="flex flex-col items-center gap-1">
        <motion.div
          animate={{ x: [-3, 3, -3] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="28" height="14" viewBox="0 0 28 14" fill="none" aria-hidden>
            <path
              d="M0 7h22M16 2l6 5-6 5"
              stroke={`rgba(${rgb}, 0.85)`}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
        <motion.span
          className="font-mono text-[8px] font-semibold"
          style={{ color: `rgba(${rgb}, 0.8)` }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          94% conf.
        </motion.span>
      </div>

      {}
      <div className="flex flex-col items-center gap-1">
        <span className="font-mono text-[8px] text-white/40">PROPOSED</span>
        <div
          className="rounded-lg border px-3 py-2"
          style={{
            borderColor: `rgba(${rgb}, 0.4)`,
            background: `rgba(${rgb}, 0.1)`,
          }}
        >
          <span
            className="font-mono text-lg font-bold"
            style={{ color: `rgba(${rgb}, 0.95)` }}
          >
            19°C
          </span>
        </div>
        <motion.span
          className="font-mono text-[8px]"
          style={{ color: `rgba(${rgb}, 0.7)` }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity, times: [0, 0.2, 0.8, 1] }}
        >
          ↓ 8% energy
        </motion.span>
      </div>
    </div>
  );
}

function ActuateGraphic({ tone }: { tone: Tone }) {
  const rgb = toneRgb[tone];
  const devices = ["FAN", "VALVE", "COMP"];
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2.5 px-6">
      {devices.map((d, i) => (
        <motion.div
          key={d}
          className="flex w-full items-center justify-between rounded-md border px-3 py-1.5"
          initial={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}
          animate={{
            borderColor: [
              "rgba(255,255,255,0.08)",
              `rgba(${rgb}, 0.45)`,
              "rgba(255,255,255,0.08)",
            ],
            background: [
              "rgba(255,255,255,0.03)",
              `rgba(${rgb}, 0.1)`,
              "rgba(255,255,255,0.03)",
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.9,
            ease: "easeInOut",
          }}
        >
          <span className="font-mono text-[9px] text-white/55">{d}</span>
          <motion.div
            className="flex items-center gap-1.5"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.9 }}
          >
            <motion.span
              className="size-1.5 rounded-full"
              style={{ background: `rgba(${rgb}, 0.9)` }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.9 }}
            />
            <span
              className="font-mono text-[8px] font-semibold"
              style={{ color: `rgba(${rgb}, 0.85)` }}
            >
              ACK
            </span>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

function LearnGraphic({ tone }: { tone: Tone }) {
  const rgb = toneRgb[tone];

  const d = "M 8,8 C 24,8 32,14 48,18 C 64,22 72,28 88,32 C 96,34 104,36 120,36";
  const totalLen = 130;
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center gap-2 px-5">
      <div className="flex w-full items-baseline justify-between">
        <span className="font-mono text-[8px] text-white/40">MODEL ERROR</span>
        <motion.span
          className="font-mono text-[9px] font-semibold"
          style={{ color: `rgba(${rgb}, 0.9)` }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          ↓ 70%
        </motion.span>
      </div>
      <svg viewBox="0 0 128 44" className="w-full" style={{ height: 44 }} aria-hidden>
        <defs>
          <linearGradient id={`lg-learn-${tone}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={`rgba(${rgb},.25)`} />
            <stop offset="100%" stopColor={`rgba(${rgb},0)`} />
          </linearGradient>
        </defs>
        {}
        <motion.path
          d={`${d} L 120,44 L 8,44 Z`}
          fill={`url(#lg-learn-${tone})`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        {}
        <motion.path
          d={d}
          fill="none"
          stroke={`rgba(${rgb}, 0.85)`}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray={totalLen}
          initial={{ strokeDashoffset: totalLen }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.5, ease: "easeOut" }}
        />
        <motion.circle
          cx="120"
          cy="36"
          r="2.5"
          fill={`rgba(${rgb}, 0.9)`}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1] }}
          transition={{ duration: 0.4, delay: 1.9, repeat: Infinity, repeatDelay: 3.1 }}
        />
      </svg>
      {}
      <div className="flex w-full justify-between">
        {["W1", "W2", "W3", "W4", "W5", "W6"].map((w) => (
          <span key={w} className="font-mono text-[7px] text-white/30">{w}</span>
        ))}
      </div>
    </div>
  );
}

function LocateGraphic({ tone }: { tone: Tone }) {
  const rgb = toneRgb[tone];

  const crumbs = [
    { x: 18, y: 60 },
    { x: 34, y: 48 },
    { x: 52, y: 54 },
    { x: 70, y: 38 },
    { x: 88, y: 44 },
    { x: 104, y: 28 },
  ];
  return (
    <div className="relative flex h-full w-full items-center justify-center px-4">
      <svg viewBox="0 0 122 80" className="h-full w-full" aria-hidden>
        {}
        <polyline
          points={crumbs.map((p) => `${p.x},${p.y}`).join(" ")}
          fill="none"
          stroke={`rgba(${rgb}, 0.25)`}
          strokeWidth="1"
          strokeDasharray="3 3"
        />
        {}
        {crumbs.map((c, i) => (
          <motion.circle
            key={i}
            cx={c.x}
            cy={c.y}
            r={i === crumbs.length - 1 ? 4 : 2.5}
            fill={
              i === crumbs.length - 1
                ? `rgba(${rgb}, 0.95)`
                : `rgba(${rgb}, 0.45)`
            }
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.25, duration: 0.4, repeat: Infinity, repeatDelay: crumbs.length * 0.25 + 1 }}
          />
        ))}
        {}
        <motion.circle
          cx={crumbs[crumbs.length - 1].x}
          cy={crumbs[crumbs.length - 1].y}
          r={4}
          fill="none"
          stroke={`rgba(${rgb}, 0.6)`}
          strokeWidth="1"
          initial={{ r: 4, opacity: 0.8 }}
          animate={{ r: 14, opacity: 0 }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 1.5, ease: "easeOut" }}
        />
      </svg>
      {}
      <div className="absolute bottom-3 left-4">
        <span
          className="font-mono text-[8px] font-semibold"
          style={{ color: `rgba(${rgb}, 0.75)` }}
        >
          TRK-04 · LIVE
        </span>
      </div>
    </div>
  );
}

function RouteGraphic({ tone }: { tone: Tone }) {
  const rgb = toneRgb[tone];
  const oldRoute = "M 12,56 C 30,20 60,60 90,24 L 112,24";
  const newRoute = "M 12,56 C 35,42 65,38 112,24";
  const newLen = 110;
  return (
    <div className="relative flex h-full w-full items-center justify-center px-4">
      <div className="flex w-full flex-col gap-1 pb-2">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[8px] text-white/40">ROUTE COMPARE</span>
          <motion.span
            className="font-mono text-[8px] font-semibold"
            style={{ color: `rgba(${rgb}, 0.85)` }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ↓ 12% km
          </motion.span>
        </div>
        <svg viewBox="0 0 124 64" className="h-14 w-full" aria-hidden>
          {}
          <path
            d={oldRoute}
            fill="none"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          {}
          <motion.path
            d={newRoute}
            fill="none"
            stroke={`rgba(${rgb}, 0.85)`}
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={newLen}
            initial={{ strokeDashoffset: newLen }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 1.5, ease: "easeOut" }}
          />
          {}
          <circle cx="12" cy="56" r="3" fill={`rgba(${rgb}, 0.7)`} />
          <motion.circle
            cx="112"
            cy="24"
            r="3"
            fill={`rgba(${rgb}, 0.9)`}
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </svg>
      </div>
    </div>
  );
}

function UtilizeGraphic({ tone }: { tone: Tone }) {
  const rgb = toneRgb[tone];
  const bars = [
    { label: "ACTIVE", pct: 72 },
    { label: "IDLE", pct: 18 },
    { label: "OFF", pct: 10 },
  ];
  return (
    <div className="flex h-full w-full flex-col justify-center gap-2.5 px-6">
      {bars.map((b, i) => (
        <div key={b.label}>
          <div className="mb-1 flex items-baseline justify-between">
            <span className="font-mono text-[8px] text-white/45">{b.label}</span>
            <span
              className="font-mono text-[9px] font-semibold"
              style={{ color: i === 0 ? `rgba(${rgb}, 0.9)` : "rgba(255,255,255,0.5)" }}
            >
              {b.pct}%
            </span>
          </div>
          <div className="h-1 w-full overflow-hidden rounded-full bg-white/8">
            <motion.div
              className="h-full rounded-full"
              style={{ background: i === 0 ? `rgba(${rgb}, 0.85)` : "rgba(255,255,255,0.2)" }}
              initial={{ width: 0 }}
              animate={{ width: `${b.pct}%` }}
              transition={{ duration: 1, delay: 0.3 + i * 0.2, ease: "easeOut", repeat: Infinity, repeatDelay: 2 }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function MaintainGraphic({ tone }: { tone: Tone }) {
  const rgb = toneRgb[tone];
  return (
    <div className="flex h-full w-full items-center justify-center px-5">
      <motion.div
        className="w-full rounded-xl border p-3"
        style={{
          borderColor: `rgba(${rgb}, 0.35)`,
          background: `rgba(${rgb}, 0.06)`,
        }}
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, repeat: Infinity, repeatDelay: 2.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mb-2 flex items-center justify-between">
          <span className="font-mono text-[8px] text-white/45">TICKET · AUTO</span>
          <div className="flex items-center gap-1">
            <motion.span
              className="size-1.5 rounded-full"
              style={{ background: `rgba(${rgb}, 0.9)` }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span
              className="font-mono text-[8px] font-semibold"
              style={{ color: `rgba(${rgb}, 0.85)` }}
            >
              HIGH
            </span>
          </div>
        </div>
        <div className="mb-1">
          <span className="font-mono text-[9px] font-semibold text-white/80">
            Bearing temp +18°C
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-mono text-[8px] text-white/40">Assigned → FIELD-3</span>
          <span className="font-mono text-[8px]" style={{ color: `rgba(${rgb}, 0.7)` }}>
            SLA 4h
          </span>
        </div>
      </motion.div>
    </div>
  );
}

function ObserveGraphic({ tone }: { tone: Tone }) {
  const rgb = toneRgb[tone];
  const cells = [
    { id: "CAM-01", alert: false },
    { id: "CAM-07", alert: true },
    { id: "CAM-12", alert: false },
    { id: "CAM-19", alert: false },
  ];
  return (
    <div className="flex h-full w-full items-center justify-center p-4">
      <div className="grid w-full grid-cols-2 gap-1.5">
        {cells.map((c) => (
          <motion.div
            key={c.id}
            className="flex flex-col items-center justify-center rounded-md border py-2"
            style={{
              borderColor: c.alert ? `rgba(${rgb}, 0.5)` : "rgba(255,255,255,0.08)",
              background: c.alert ? `rgba(${rgb}, 0.1)` : "rgba(255,255,255,0.03)",
            }}
            animate={
              c.alert
                ? {
                    borderColor: [
                      `rgba(${rgb}, 0.5)`,
                      `rgba(${rgb}, 0.9)`,
                      `rgba(${rgb}, 0.5)`,
                    ],
                    background: [
                      `rgba(${rgb}, 0.08)`,
                      `rgba(${rgb}, 0.18)`,
                      `rgba(${rgb}, 0.08)`,
                    ],
                  }
                : {}
            }
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="font-mono text-[7px] text-white/40">{c.id}</span>
            {c.alert && (
              <span
                className="mt-0.5 font-mono text-[7px] font-semibold"
                style={{ color: `rgba(${rgb}, 0.9)` }}
              >
                ANOMALY
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function DecideGraphic({ tone }: { tone: Tone }) {
  const rgb = toneRgb[tone];
  const options = [
    { label: "Reroute traffic", score: 91 },
    { label: "Deploy patrol", score: 67 },
    { label: "Notify residents", score: 44 },
  ];
  return (
    <div className="flex h-full w-full flex-col justify-center gap-2 px-5">
      <span className="font-mono text-[8px] text-white/40">OPTIONS · RANKED</span>
      {options.map((o, i) => (
        <div key={o.label}>
          <div className="mb-0.5 flex items-baseline justify-between">
            <span className="font-mono text-[8px] text-white/55">{o.label}</span>
            <span
              className="font-mono text-[8px] font-semibold"
              style={{ color: i === 0 ? `rgba(${rgb}, 0.9)` : "rgba(255,255,255,0.4)" }}
            >
              {o.score}%
            </span>
          </div>
          <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/8">
            <motion.div
              className="h-full rounded-full"
              style={{
                background:
                  i === 0 ? `rgba(${rgb}, 0.85)` : "rgba(255,255,255,0.18)",
              }}
              initial={{ width: 0 }}
              animate={{ width: `${o.score}%` }}
              transition={{
                duration: 1,
                delay: 0.3 + i * 0.18,
                ease: "easeOut",
                repeat: Infinity,
                repeatDelay: 2.5,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function DispatchGraphic({ tone }: { tone: Tone }) {
  const rgb = toneRgb[tone];
  return (
    <div className="relative flex h-full w-full items-center justify-center px-5">
      <div className="w-full">
        <div className="mb-2 flex items-baseline justify-between">
          <span className="font-mono text-[8px] text-white/40">CREW DISPATCH</span>
          <motion.span
            className="font-mono text-[8px] font-semibold"
            style={{ color: `rgba(${rgb}, 0.85)` }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ETA 4 min
          </motion.span>
        </div>
        {}
        <div className="relative flex items-center">
          <div className="h-[2px] w-full rounded-full bg-white/10" />
          {}
          <div
            className="absolute right-0 flex h-4 w-4 items-center justify-center rounded-full"
            style={{ background: `rgba(${rgb}, 0.2)`, border: `1px solid rgba(${rgb}, 0.5)` }}
          >
            <span style={{ color: `rgba(${rgb}, 0.9)`, fontSize: 8 }}>◎</span>
          </div>
          {}
          <motion.div
            className="absolute flex h-5 w-5 items-center justify-center rounded-full text-[10px]"
            style={{ background: `rgba(${rgb}, 0.9)` }}
            initial={{ left: "0%" }}
            animate={{ left: "75%" }}
            transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }}
          >
            🚐
          </motion.div>
        </div>
        {}
        <div className="mt-3 flex items-center gap-2">
          <motion.span
            className="size-1.5 rounded-full"
            style={{ background: `rgba(${rgb}, 0.9)` }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <span className="font-mono text-[8px] text-white/55">UNIT-7 · ACK confirmed</span>
        </div>
      </div>
    </div>
  );
}

function ReportGraphic({ tone }: { tone: Tone }) {
  const rgb = toneRgb[tone];
  const kpis = [
    { label: "INCIDENTS", value: "142", delta: "↓ 18%" },
    { label: "RESPONSE", value: "4.2m", delta: "↑ 12%" },
  ];
  return (
    <div className="flex h-full w-full items-center justify-center gap-4 px-5">
      {kpis.map((k, i) => (
        <motion.div
          key={k.label}
          className="flex flex-1 flex-col items-center rounded-xl border py-3"
          style={{
            borderColor: `rgba(${rgb}, 0.2)`,
            background: `rgba(${rgb}, 0.06)`,
          }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + i * 0.25, duration: 0.5 }}
        >
          <span className="font-mono text-[7px] text-white/40">{k.label}</span>
          <motion.span
            className="font-mono text-xl font-bold text-white/85"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2.5 + i * 0.5, repeat: Infinity }}
          >
            {k.value}
          </motion.span>
          <span
            className="font-mono text-[8px] font-semibold"
            style={{ color: `rgba(${rgb}, 0.85)` }}
          >
            {k.delta}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

type WorkflowCard = {
  eyebrow: string;
  tone: Tone;
  title: string;
  body: string;
  metric: string;
  graphic: React.ReactNode;
  icon: React.ReactNode;
};

const climateCards: WorkflowCard[] = [
  {
    eyebrow: "◆ SENSE",
    tone: "teal",
    title: "Sub-second telemetry, every device",
    body: "Continuous reads across temp, humidity, and CO₂ with target bands set per asset. The gauge is live — the threshold is policy.",
    metric: "1,847 sensors online",
    graphic: <SenseGraphic tone="teal" />,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
      </svg>
    ),
  },
  {
    eyebrow: "◆ COMPARE",
    tone: "purple",
    title: "AI proposes setpoints, you approve",
    body: "Recommendations diff against current config. Confidence score, forecasted energy delta, and a clean rollback path — no black boxes.",
    metric: "Conf. 94% · auditable",
    graphic: <CompareGraphic tone="purple" />,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M8 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3M12 8v8M9 11l3-3 3 3"/>
      </svg>
    ),
  },
  {
    eyebrow: "◆ ACTUATE",
    tone: "green",
    title: "Fan, valve, compressor — orchestrated",
    body: "Multi-device sequences with sub-second ack tracking. Failures roll back automatically; partial successes get retried.",
    metric: "3 devices · sub-second ack",
    graphic: <ActuateGraphic tone="green" />,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 6v6l4 2"/>
      </svg>
    ),
  },
  {
    eyebrow: "◆ LEARN",
    tone: "blue",
    title: "Models improve with every cycle",
    body: "Per-building thermal models retrain weekly. Six weeks in, model error drops ~70% — and the system gets quieter, not louder.",
    metric: "↓ 70% model error · 6 wk",
    graphic: <LearnGraphic tone="blue" />,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
];

const assetCards: WorkflowCard[] = [
  {
    eyebrow: "◆ LOCATE",
    tone: "teal",
    title: "Live position, cargo state, ETA",
    body: "GPS plus cellular plus LoRaWAN — unified to one breadcrumb trail. Cargo-temp and fuel ride on the same channel.",
    metric: "23,400 assets tracked",
    graphic: <LocateGraphic tone="teal" />,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
  },
  {
    eyebrow: "◆ ROUTE",
    tone: "purple",
    title: "Optimized routing across the fleet",
    body: "AI re-solves routing as conditions change. Stops stay the same, kilometers go down — and the diff is auditable.",
    metric: "↓ 12% km · real-time",
    graphic: <RouteGraphic tone="purple" />,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <polyline points="3 17 9 11 13 15 21 7"/><polyline points="14 7 21 7 21 14"/>
      </svg>
    ),
  },
  {
    eyebrow: "◆ UTILIZE",
    tone: "green",
    title: "Active vs idle vs off — by asset",
    body: "Stop wondering why utilization is 41%. See the split per asset, find the idle hours, redeploy what you're paying for.",
    metric: "72% active utilization",
    graphic: <UtilizeGraphic tone="green" />,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
      </svg>
    ),
  },
  {
    eyebrow: "◆ MAINTAIN",
    tone: "blue",
    title: "Service tickets created before failure",
    body: "Predictive signals open the ticket, set severity, and route to the right crew. SLA timer starts when the forecast does.",
    metric: "SLA set on prediction",
    graphic: <MaintainGraphic tone="blue" />,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
  },
];

const cityCards: WorkflowCard[] = [
  {
    eyebrow: "◆ OBSERVE",
    tone: "teal",
    title: "Every feed, every sensor, every zone",
    body: "Cameras, air-quality, water, traffic — one canvas. Anomalies surface as tiles, not pages of logs.",
    metric: "2,841+ feeds unified",
    graphic: <ObserveGraphic tone="teal" />,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
      </svg>
    ),
  },
  {
    eyebrow: "◆ DECIDE",
    tone: "purple",
    title: "Options, ranked by city policy",
    body: "The AI proposes — your policy decides. Each option carries speed, cost, and civic risk so the call is defensible.",
    metric: "Policy-weighted ranking",
    graphic: <DecideGraphic tone="purple" />,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M12 3l1.5 3.5L17 8l-3.5 1.5L12 13l-1.5-3.5L7 8l3.5-1.5z"/><path d="M19 15l.75 1.75L21.5 17.5l-1.75.75L19 21l-.75-1.75L16.5 18.5l1.75-.75z"/>
      </svg>
    ),
  },
  {
    eyebrow: "◆ DISPATCH",
    tone: "green",
    title: "Route the right crew, instantly",
    body: "Field units, traffic patrol, maintenance — paged with destination, ETA, and incident context. Sub-second ack.",
    metric: "< 1s ack · GPS routed",
    graphic: <DispatchGraphic tone="green" />,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <polygon points="3 11 22 2 13 21 11 13 3 11"/>
      </svg>
    ),
  },
  {
    eyebrow: "◆ REPORT",
    tone: "blue",
    title: "Council-ready dashboards, automatic",
    body: "Weekly KPIs assembled and signed off without an analyst. Trends, deltas, and one-line narratives — every Monday.",
    metric: "Auto-generated · weekly",
    graphic: <ReportGraphic tone="blue" />,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
  },
];

const tabs = [
  {
    id: "climate",
    label: "Climate control",
    sub: "SENSE · COMPARE · ACTUATE · LEARN",
    cards: climateCards,
  },
  {
    id: "asset",
    label: "Asset tracking",
    sub: "LOCATE · ROUTE · UTILIZE · MAINTAIN",
    cards: assetCards,
  },
  {
    id: "city",
    label: "Smart city",
    sub: "OBSERVE · DECIDE · DISPATCH · REPORT",
    cards: cityCards,
  },
];

function WorkflowCard({ card, idx }: { card: WorkflowCard; idx: number }) {
  const rgb = toneRgb[card.tone];
  return (
    <SpotlightCard
      tone={card.tone}
      className="relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-background"
    >
      {}
      <div
        className="relative h-36 w-full overflow-hidden"
        style={{
          background: `radial-gradient(ellipse 100% 120% at 50% 110%, rgba(${rgb},.08), transparent 65%)`,
        }}
      >
        {}
        <div
          className="absolute inset-x-0 top-0 h-[2px]"
          style={{
            background: `linear-gradient(90deg, rgba(${rgb},.8) 0%, rgba(${rgb},0) 80%)`,
          }}
        />
        {card.graphic}
      </div>

      {}
      <div className="flex flex-1 flex-col px-5 pb-5">
        {}
        <div className="mb-3 flex items-center gap-3">
          <div
            className={cn(
              "inline-flex shrink-0 items-center justify-center rounded-lg border p-2",
              toneBorder[card.tone],
              toneText[card.tone],
            )}
            style={{ background: `rgba(${rgb},.1)` }}
          >
            {card.icon}
          </div>
          <h4 className="text-sm font-semibold leading-tight tracking-tight">
            {card.title}
          </h4>
        </div>

        {}
        <span className={cn("mb-1 font-mono text-[9px] uppercase tracking-widest", toneText[card.tone])}>
          {card.eyebrow}
        </span>

        {}
        <p className="flex-1 text-[11px] leading-relaxed text-muted-foreground">
          {card.body}
        </p>

        {}
        <div className="mt-4 inline-flex w-fit items-center gap-2 rounded-md border border-border bg-surface px-2.5 py-1.5 font-mono text-[10px] text-foreground">
          <span className={cn("size-1.5 rounded-full", toneBg[card.tone])} />
          {card.metric}
        </div>
      </div>
    </SpotlightCard>
  );
}

export function WorkflowsByVertical2() {
  return (
    <section id="workflows" className="section-divide bg-background">
      <div className="mx-auto max-w-7xl px-6 py-8 md:px-8">
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
          <Tabs defaultValue="climate" className="mt-6">
            <TabsList variant="line" className="mb-4 gap-6">
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

                <div className="rounded-2xl border border-border bg-surface p-3 shadow-sm">
                  <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {t.cards.map((card, idx) => (
                      <li key={card.eyebrow}>
                        <WorkflowCard card={card} idx={idx} />
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </FadeUp>
      </div>
    </section>
  );
}
