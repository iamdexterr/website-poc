"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const R = {
  teal:   "2,161,147",
  amber:  "245,158,11",
  blue:   "59,130,246",
  green:  "52,211,153",
  purple: "139,92,246",
} as const;

type Accent = keyof typeof R;

const HUB = { x: 110, y: 82 };

const NET_NODES = [
  { x: 36,  y: 30,  tag: "SENSOR"   },
  { x: 110, y: 12,  tag: "GATEWAY"  },
  { x: 184, y: 30,  tag: "CAMERA"   },
  { x: 202, y: 82,  tag: "MODBUS"   },
  { x: 184, y: 134, tag: "ACTUATOR" },
  { x: 36,  y: 134, tag: "EDGE"     },
  { x: 18,  y: 82,  tag: "LoRa"     },
];

function MonitoringViz() {
  const a = R.teal;
  return (
    <svg viewBox="0 0 220 164" className="h-full w-full" preserveAspectRatio="xMidYMid meet" aria-hidden>
      {NET_NODES.map((n) => (
        <line
          key={n.tag}
          x1={HUB.x} y1={HUB.y}
          x2={n.x} y2={n.y}
          stroke={`rgba(${a},.13)`}
          strokeWidth="0.65"
          strokeDasharray="3 3"
        />
      ))}

      {[0, 1, 2].map((i) => (
        <motion.circle
          key={i}
          cx={HUB.x} cy={HUB.y}
          fill="none"
          stroke={`rgba(${a},.2)`}
          strokeWidth="0.6"
          initial={{ r: 14 }}
          animate={{ r: [14, 14 + i * 24], opacity: [0.55, 0] }}
          transition={{ duration: 3.2, delay: i * 1.05, repeat: Infinity, ease: "easeOut" }}
        />
      ))}

      {NET_NODES.map((n, ni) => (
        <motion.circle
          key={`pkt-${ni}`}
          r="2"
          fill={`rgba(${a},.85)`}
          animate={{ cx: [n.x, HUB.x], cy: [n.y, HUB.y], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2.4, delay: ni * 0.4, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {NET_NODES.map((n, ni) => (
        <g key={`nd-${ni}`}>
          <circle
            cx={n.x} cy={n.y} r="7"
            fill={`rgba(${a},.07)`}
            stroke={`rgba(${a},.32)`}
            strokeWidth="0.7"
          />
          <motion.circle
            cx={n.x} cy={n.y} r="2"
            fill={`rgba(${a},.9)`}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.8, delay: ni * 0.26, repeat: Infinity }}
          />
          <text
            x={n.x} y={n.y + 13}
            textAnchor="middle"
            fill={`rgba(${a},.38)`}
            fontSize="4"
            fontFamily="monospace"
          >
            {n.tag}
          </text>
        </g>
      ))}

      <motion.circle
        cx={HUB.x} cy={HUB.y} r="14"
        fill={`rgba(${a},.12)`}
        stroke={`rgba(${a},.55)`}
        strokeWidth="1.5"
        animate={{ r: [14, 15.5, 14] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <text
        x={HUB.x} y={HUB.y + 1.5}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={`rgba(${a},.92)`}
        fontSize="5.5"
        fontFamily="monospace"
        fontWeight="bold"
      >
        ONEIOT
      </text>

      <motion.g animate={{ opacity: [0.35, 0.75, 0.35] }} transition={{ duration: 2.5, repeat: Infinity }}>
        <text x="210" y="10" textAnchor="end" fill={`rgba(${a},.5)`} fontSize="4" fontFamily="monospace">
          7 DEVICES · LIVE
        </text>
      </motion.g>
    </svg>
  );
}

const SIGNAL_BARS = [0.35, 0.55, 0.75, 1.0];

const UPTIME_VALS = ["96.2 %", "98.4 %", "99.1 %", "99.9 %"];
const UPTIME_CYCLE = 8;
const UPTIME_SLOT  = UPTIME_CYCLE / UPTIME_VALS.length;

function AlertsViz() {
  const a = R.amber;
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 px-5 py-4">
      <div className="relative flex items-baseline gap-0.5">
        {UPTIME_VALS.map((val, vi) => {
          const t0 = vi * UPTIME_SLOT;
          const t1 = t0 + 0.2;
          const t2 = t0 + UPTIME_SLOT - 0.2;
          const t3 = t0 + UPTIME_SLOT;
          return (
            <motion.span
              key={val}
              className="absolute left-0 right-0 text-center font-mono text-4xl font-bold leading-none tracking-tighter"
              style={{ color: `rgba(${a},.95)` }}
              animate={{ opacity: [0, 0, 1, 1, 0, 0] }}
              transition={{
                duration: UPTIME_CYCLE,
                repeat: Infinity,
                times: [0, t0 / UPTIME_CYCLE, t1 / UPTIME_CYCLE, t2 / UPTIME_CYCLE, t3 / UPTIME_CYCLE, 1],
              }}
            >
              {val}
            </motion.span>
          );
        })}
        <span
          className="invisible font-mono text-4xl font-bold leading-none tracking-tighter"
          aria-hidden
        >
          99.9 %
        </span>
      </div>

      <div className="flex items-end gap-1.5">
        {SIGNAL_BARS.map((h, i) => (
          <motion.div
            key={i}
            className="w-2.5 rounded-sm"
            style={{ background: `rgba(${a},.88)` }}
            animate={{ height: [`${h * 22}px`, `${h * 26}px`, `${h * 22}px`] }}
            transition={{ duration: 1.6, delay: i * 0.14, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
        Platform Uptime
      </span>

      <motion.div
        className="rounded-full border px-3 py-1 font-mono text-[9px]"
        style={{ borderColor: `rgba(${a},.25)`, color: `rgba(${a},.7)` }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2.8, repeat: Infinity }}
      >
        847 anomalies prevented
      </motion.div>
    </div>
  );
}

const DEVICE_LAYERS = [
  { label: "CLOUD LAYER",   sub: "Dashboards · APIs · ML",  icon: "◈" },
  { label: "GATEWAY LAYER", sub: "Protocol bridge · Edge",   icon: "⬡" },
  { label: "DEVICE LAYER",  sub: "Sensors · Actuators · IoT",icon: "◎" },
];

function DeviceViz() {
  const a = R.blue;
  return (
    <div className="flex h-full w-full flex-col justify-center gap-2 px-5 py-4">
      {DEVICE_LAYERS.map((layer, i) => (
        <motion.div
          key={layer.label}
          className="flex items-center gap-3 rounded-2xl border px-4 py-3"
          style={{ borderColor: `rgba(${a},.22)`, background: `rgba(${a},.06)` }}
          animate={{ y: [0, i === 1 ? -3.5 : i === 0 ? -1.5 : 0, 0] }}
          transition={{ duration: 3.5, delay: i * 0.35, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="font-mono text-base" style={{ color: `rgba(${a},.65)` }}>
            {layer.icon}
          </span>
          <div className="flex flex-col gap-0.5">
            <span className="font-mono text-[9px] font-semibold tracking-wide" style={{ color: `rgba(${a},.88)` }}>
              {layer.label}
            </span>
            <span className="font-mono text-[7.5px] text-white/35">
              {layer.sub}
            </span>
          </div>
          <div className="ml-auto flex gap-1">
            {[0, 1, 2].map((dot) => (
              <motion.span
                key={dot}
                className="size-1.5 rounded-full"
                style={{ background: `rgba(${a},.7)` }}
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1.4, delay: dot * 0.3 + i * 0.45, repeat: Infinity }}
              />
            ))}
          </div>
        </motion.div>
      ))}
      <div className="mt-1 text-center font-mono text-[9px] text-white/30">
        2,847 devices managed
      </div>
    </div>
  );
}

const FLOW_NODES = [
  { label: "DETECT",    icon: "◎" },
  { label: "ANALYZE",   icon: "△" },
  { label: "DECIDE",    icon: "◆" },
  { label: "EXECUTE",   icon: "▶" },
];

function AutomationViz() {
  const a = R.green;
  return (
    <div className="relative flex h-full w-full items-center justify-between px-5 py-3">
      <div className="absolute left-5 right-5 top-1/2 h-px -translate-y-1/2" style={{ background: `rgba(${a},.1)` }} />

      <motion.div
        className="absolute top-1/2 size-3 -translate-y-1/2 rounded-full"
        style={{ background: `rgba(${a},.9)`, boxShadow: `0 0 8px rgba(${a},.6)` }}
        animate={{ left: ["calc(1.25rem + 2px)", "calc(100% - 1.25rem - 14px)"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.5 }}
      />

      {FLOW_NODES.map((node, i) => (
        <motion.div
          key={node.label}
          className="relative z-10 flex flex-col items-center gap-1.5"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3, delay: i * 0.75, repeat: Infinity }}
        >
          <motion.div
            className="flex size-10 items-center justify-center rounded-2xl border"
            style={{ borderColor: `rgba(${a},.28)`, background: `rgba(${a},.09)` }}
            whileHover={{ scale: 1.08, borderColor: `rgba(${a},.6)` }}
            transition={{ duration: 0.2 }}
          >
            <span className="font-mono text-[13px]" style={{ color: `rgba(${a},.75)` }}>
              {node.icon}
            </span>
          </motion.div>
          <span className="font-mono text-[7px] tracking-wider text-white/40">
            {node.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

const CHART_L1 = "M10,55 C22,50 34,46 46,42 C58,38 70,43 82,38 C94,33 106,29 118,26 C130,23 142,21 154,18";
const CHART_L2 = "M10,65 C22,63 34,59 46,57 C58,55 70,57 82,53 C94,49 106,47 118,44 C130,41 142,39 154,36";

function AnalyticsViz() {
  const a = R.purple;
  const gradId = "pcap-ana-fill";
  return (
    <div className="flex h-full w-full flex-col px-5 py-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="font-mono text-[8px] text-white/30">TELEMETRY OVERVIEW</span>
        <motion.span
          className="flex items-center gap-1.5 font-mono text-[8px]"
          style={{ color: `rgba(${a},.7)` }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          <span className="size-1.5 rounded-full" style={{ background: `rgba(${a},1)` }} />
          LIVE
        </motion.span>
      </div>

      <div className="relative flex-1 min-h-0">
        <svg viewBox="0 0 164 80" className="h-full w-full" aria-hidden>
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={`rgba(${a},.18)`} />
              <stop offset="100%" stopColor={`rgba(${a},0)`} />
            </linearGradient>
          </defs>

          <path d={`${CHART_L1} L154,80 L10,80 Z`} fill={`url(#${gradId})`} />

          <motion.path
            d={CHART_L1}
            fill="none"
            stroke={`rgba(${a},.88)`}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeDasharray="210"
            initial={{ strokeDashoffset: 210 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 2.2, ease: "easeOut", repeat: Infinity, repeatDelay: 2.8 }}
          />

          <motion.path
            d={CHART_L2}
            fill="none"
            stroke={`rgba(${a},.35)`}
            strokeWidth="1"
            strokeLinecap="round"
            strokeDasharray="5 4"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 3.5, repeat: Infinity }}
          />

          {([46, 82, 118, 154] as const).map((x, i) => {
            const ys = [42, 38, 26, 18] as const;
            return (
              <motion.circle
                key={x}
                cx={x} cy={ys[i]} r="2.5"
                fill={`rgba(${a},.9)`}
                animate={{ r: [2.5, 3.5, 2.5] }}
                transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}
              />
            );
          })}
        </svg>
      </div>

      <div className="flex items-center gap-4 pt-1">
        <div className="flex items-center gap-1.5">
          <div className="h-[2px] w-4 rounded" style={{ background: `rgba(${a},.8)` }} />
          <span className="font-mono text-[7px] text-white/35">TEMPERATURE</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-px w-4 rounded" style={{ borderTop: `1px dashed rgba(${a},.4)` }} />
          <span className="font-mono text-[7px] text-white/35">ENERGY</span>
        </div>
      </div>
    </div>
  );
}

const CLIMATE_CYCLE = 6;
const CLIMATE_SLOT  = CLIMATE_CYCLE / 3;

const ENV_METRICS = [
  { label: "TEMP",      vals: ["22.4 °C", "22.7 °C", "22.1 °C"], color: "2,161,147"   },
  { label: "HUMIDITY",  vals: ["58 %",    "61 %",    "57 %"    ], color: "59,130,246"  },
  { label: "CO₂",       vals: ["415 ppm", "422 ppm", "418 ppm" ], color: "52,211,153"  },
  { label: "NH₃",       vals: ["18 ppm",  "21 ppm",  "17 ppm"  ], color: "245,158,11"  },
];

function ClimateViz() {
  const a = R.teal;
  return (
    <div className="flex h-full w-full flex-col">
      <div className="grid flex-1 grid-cols-2 gap-px bg-border/20">
        {ENV_METRICS.map((m) => (
          <div key={m.label} className="flex flex-col justify-center gap-1 bg-surface px-4 py-3">
            <span className="font-mono text-[7px] uppercase tracking-widest text-white/30">
              {m.label}
            </span>
            <div className="relative h-5">
              {m.vals.map((val, vi) => {
                const t0 = vi * CLIMATE_SLOT;
                const t1 = t0 + 0.18;
                const t2 = t0 + CLIMATE_SLOT - 0.18;
                const t3 = t0 + CLIMATE_SLOT;
                return (
                  <motion.span
                    key={val}
                    className="absolute inset-0 font-mono text-[13px] font-bold leading-none"
                    style={{ color: `rgba(${m.color},.92)` }}
                    animate={{ opacity: [0, 0, 1, 1, 0, 0] }}
                    transition={{
                      duration: CLIMATE_CYCLE,
                      repeat: Infinity,
                      times: [0, t0 / CLIMATE_CYCLE, t1 / CLIMATE_CYCLE, t2 / CLIMATE_CYCLE, t3 / CLIMATE_CYCLE, 1],
                    }}
                  >
                    {val}
                  </motion.span>
                );
              })}
            </div>
            <motion.span
              className="size-1.5 rounded-full"
              style={{ background: `rgba(${m.color},1)` }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-border/25 px-5 py-2.5">
        <span className="font-mono text-[8px] text-white/30">8 ZONES MONITORED</span>
        <motion.span
          className="font-mono text-[8px] font-semibold"
          style={{ color: `rgba(${a},.75)` }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        >
          ALL NORMAL ✓
        </motion.span>
      </div>
    </div>
  );
}

function FeatureCardImage({
  src,
  alt,
  overlay = true,
  fadeEdges = true,
}: {
  src: string;
  alt: string;
  overlay?: boolean;
  fadeEdges?: boolean;
}) {
  return (
    <div className="relative h-full w-full">
      <div className="relative h-full w-full overflow-hidden rounded-2xl bg-white/[0.025]">
        {src && (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover w-full h-full opacity-90 transition-transform duration-700"
          />
        )}
        {overlay && (
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/25 to-transparent" />
        )}
        {fadeEdges && (
          <>
            <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-surface to-transparent" />
            <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-surface/50 to-transparent" />
            <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-surface/50 to-transparent" />
            <div className="absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-surface/40 to-transparent" />
          </>
        )}
      </div>
    </div>
  );
}

function FeatureCard({
  accent,
  title,
  description,
  animHeight,
  children,
  className,
}: {
  accent: Accent;
  title: string;
  description: string;
  animHeight: string;
  children: React.ReactNode;
  className?: string;
}) {
  const a = R[accent];
  return (
    <motion.div
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-border bg-surface",
        className,
      )}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, scale: 1.01, transition: { duration: 0.25, ease: "easeOut" } }}
      style={{ boxShadow: `0 8px 40px -10px rgba(${a},.15)` }}
    >
      <div
        className="absolute inset-x-0 top-0 h-[1.5px]"
        style={{ background: `linear-gradient(90deg, rgba(${a},.85) 0%, rgba(${a},0) 55%)` }}
      />

      <div className={cn("relative flex-1 overflow-hidden", animHeight)}>
        {children}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-10"
          style={{ background: "linear-gradient(to bottom, transparent, var(--color-surface))" }}
        />
      </div>

      <div className="flex flex-col gap-1 border-t border-border/20 p-4">
        <h3 className="text-[12px] font-semibold leading-snug tracking-tight text-foreground">
          {title}
        </h3>
        <p className="text-[10.5px] leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

function LeftContent() {
  return (
    <motion.div
      className="flex flex-col justify-center gap-7"
      initial={{ opacity: 0, x: -28 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex flex-col gap-4">
        <span className="label-mono text-accent-teal">WHY ONEIOT</span>
        <h2 className="text-4xl font-semibold leading-[1.06] tracking-tight md:text-5xl lg:text-[3.2rem]">
          One Platform.
          <br />
          <span className="text-brand">Infinite Connected</span>
          <br />
          Possibilities.
        </h2>
      </div>

      <p className="max-w-[22rem] text-base leading-relaxed text-muted-foreground">
        OneIoT provides a unified platform for device management, real-time monitoring, automation, advanced analytics, and industrial intelligence — built precisely around your infrastructure.
      </p>

      <motion.button
        className="flex w-fit items-center gap-2.5 rounded-2xl border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-foreground"
        whileHover={{
          borderColor: `rgba(${R.teal},.5)`,
          backgroundColor: `rgba(${R.teal},.06)`,
          scale: 1.02,
          transition: { duration: 0.2 },
        }}
        whileTap={{ scale: 0.97 }}
      >
        Explore Platform
        <svg
          width="14" height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </motion.button>

      <div className="flex flex-col gap-3">
        {[
          { label: "Devices connected", value: "10M+" },
          { label: "Avg. deploy time",   value: "4 wks" },
          { label: "Platform uptime",    value: "99.9%" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            className="flex items-center justify-between border-b border-border/25 pb-3"
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
          >
            <span className="text-[12px] text-muted-foreground">{stat.label}</span>
            <span className="font-mono text-[13px] font-semibold text-foreground">{stat.value}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export function PlatformCapabilities() {
  return (
    <section className="section-divide bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-24">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.65fr] lg:items-start lg:gap-16 xl:gap-20">

          <div className="lg:sticky lg:top-24">
            <LeftContent />
          </div>

          <div className="hidden lg:block relative h-[840px]">

            <svg
              viewBox="0 0 140 90"
              className="pointer-events-none absolute left-[-28px] top-[8px] w-[140px] opacity-[0.22]"
              fill="none"
              aria-hidden
            >
              <path
                d="M10,82 C16,58 34,30 72,14 C92,6 112,4 134,7"
                stroke={`rgba(${R.teal},1)`}
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M134,7 L123,3 M134,7 L130,17"
                stroke={`rgba(${R.teal},1)`}
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14,80 C20,56 37,27 74,12"
                stroke={`rgba(${R.teal},0.28)`}
                strokeWidth="0.8"
                strokeLinecap="round"
                strokeDasharray="2 5"
              />
            </svg>

            <svg
              viewBox="0 0 70 70"
              className="pointer-events-none absolute bottom-[-10px] right-[-14px] w-[72px] opacity-[0.19]"
              fill="none"
              aria-hidden
            >
              <path
                d="M35,35 m0,-7 a7,7 0 1,1 0.1,0"
                stroke={`rgba(${R.purple},1)`}
                strokeWidth="1.3"
                strokeLinecap="round"
              />
              <path
                d="M35,35 m0,-13 a13,13 0 1,1 0.1,0"
                stroke={`rgba(${R.purple},1)`}
                strokeWidth="1.1"
                strokeLinecap="round"
              />
              <path
                d="M35,35 m0,-20 a20,20 0 1,1 0.1,0"
                stroke={`rgba(${R.purple},0.6)`}
                strokeWidth="0.8"
                strokeLinecap="round"
              />
            </svg>

            <svg
              viewBox="0 0 80 36"
              className="pointer-events-none absolute left-[39%] top-[292px] w-[72px] opacity-[0.17]"
              fill="none"
              aria-hidden
            >
              <path
                d="M4,22 C14,8 34,6 52,16 C60,20 66,24 74,20"
                stroke={`rgba(${R.amber},1)`}
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <div className="absolute right-0 top-0 h-[280px] w-[59%] rotate-[0.6deg]">
              <FeatureCard
                accent="teal"
                title="Real-Time Monitoring"
                description="Monitor connected devices, sensors, and assets across your entire infrastructure in real time."
                animHeight="flex-1"
              >
                <FeatureCardImage src={"/MonitoringDashboard.jpg"} alt="Real-time device monitoring dashboard" overlay fadeEdges />
              </FeatureCard>
            </div>

            <div className="absolute left-0 top-[50px] h-[240px] w-[40%] rotate-[-1.3deg]">
              <FeatureCard
                accent="amber"
                title="Predictive Alerts"
                description="Detect anomalies before they become failures using intelligent alerting."
                animHeight="flex-1"
              >
                <FeatureCardImage src={"/PredictiveAI.jpg"} alt="Predictive alert intelligence" overlay fadeEdges />
              </FeatureCard>
            </div>

            <div className="absolute right-0  top-[308px] h-[240px] w-[45%] rotate-[1deg]">
              <FeatureCard
                accent="blue"
                title="Unified Device Management"
                description="Manage thousands of devices from a single centralized platform."
                animHeight="flex-1"
              >
                <FeatureCardImage src={"/UnifiedDeviceManagement.jpeg"} alt="Unified device management interface" overlay fadeEdges />
              </FeatureCard>
            </div>

            <div className="absolute left-0 top-[330px] h-[170px] w-[52%] rotate-[-0.7deg]">
              <FeatureCard
                accent="green"
                title="Automation Engine"
                description="Automate operational workflows and reduce manual intervention."
                animHeight="flex-1"
              >
                <FeatureCardImage src={"/automation.jpg"} alt="Automation workflow engine" overlay fadeEdges />
              </FeatureCard>
            </div>

            <div className="absolute right-[4%] top-[580px] h-[210px] w-[56%] rotate-[1.6deg]">
              <FeatureCard
                accent="purple"
                title="Advanced Analytics"
                description="Transform raw IoT data into actionable business intelligence and trend insights."
                animHeight="flex-1"
              >
                <FeatureCardImage src={"/AdvancedAnalytics.jpg"} alt="Advanced IoT analytics visualization" overlay fadeEdges />
              </FeatureCard>
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:hidden">
            <FeatureCard
              accent="teal"
              title="Real-Time Monitoring"
              description="Monitor connected devices, sensors, and assets across your entire infrastructure in real time."
              animHeight="h-[200px]"
            >
              <FeatureCardImage src={"/MonitoringDashboard.jpg"} alt="Real-time device monitoring dashboard" overlay fadeEdges />
            </FeatureCard>
            <FeatureCard
              accent="amber"
              title="Predictive Alerts"
              description="Detect anomalies before they become failures using intelligent alerting."
              animHeight="h-[180px]"
            >
              <FeatureCardImage src={"/PredictiveAI.jpg"} alt="Predictive alert intelligence" overlay fadeEdges />
            </FeatureCard>
            <FeatureCard
              accent="blue"
              title="Unified Device Management"
              description="Manage thousands of devices from a single centralized platform."
              animHeight="h-[180px]"
            >
              <FeatureCardImage src="" alt="Unified device management interface" overlay fadeEdges />
            </FeatureCard>
            <FeatureCard
              accent="green"
              title="Automation Engine"
              description="Automate operational workflows and reduce manual intervention."
              animHeight="h-[130px]"
            >
              <FeatureCardImage src="" alt="Automation workflow engine" overlay fadeEdges />
            </FeatureCard>
            <FeatureCard
              accent="purple"
              title="Advanced Analytics"
              description="Transform raw IoT data into actionable business intelligence and trend insights."
              animHeight="h-[130px]"
            >
              <FeatureCardImage src="" alt="Advanced IoT analytics visualization" overlay fadeEdges />
            </FeatureCard>
          </div>

        </div>
      </div>
    </section>
  );
}
