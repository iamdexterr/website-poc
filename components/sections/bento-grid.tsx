"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const toneRgb = {
  teal:   "2,161,147",
  blue:   "59,130,246",
  purple: "139,92,246",
  green:  "52,211,153",
};

type Tone = keyof typeof toneRgb;

const REQ_ITEMS = [
  { label: "Real-time monitoring",    tag: "MONITORING" },
  { label: "Multi-protocol support",  tag: "PROTOCOL"   },
  { label: "Custom dashboards",       tag: "UI/UX"      },
  { label: "Predictive alerting",     tag: "AI/ML"      },
  { label: "Historical reports",      tag: "ANALYTICS"  },
  { label: "Mobile access",           tag: "ACCESS"     },
  { label: "REST API integration",    tag: "API"        },
  { label: "Multi-site support",      tag: "SCALE"      },
];

const REQ_ALL = [...REQ_ITEMS, ...REQ_ITEMS];

const TILE_CYCLE = 8;
const TILE_SLOT  = TILE_CYCLE / 4;

const METRIC_TILES = [
  { label: "TEMPERATURE",  values: ["71.2 °C",  "73.8 °C",  "70.4 °C",  "74.1 °C" ], delta: ["+1.2", "+2.6", "-0.8", "+3.7"] },
  { label: "PRESSURE",     values: ["4.1 bar",  "4.3 bar",  "3.9 bar",  "4.2 bar" ], delta: ["+0.1", "+0.3", "-0.2", "+0.2"] },
  { label: "UPTIME",       values: ["99.8 %",   "99.9 %",   "99.7 %",   "99.8 %"  ], delta: ["+0.1", "+0.2",  "–",   "+0.1"] },
];

const DEVICE_ROWS = [
  { id: "SENSOR-01",  protocol: "MQTT",    status: "LIVE"    },
  { id: "GATEWAY-02", protocol: "OPC-UA",  status: "LIVE"    },
  { id: "MODBUS-03",  protocol: "MODBUS",  status: "SYNCING" },
  { id: "EDGE-04",    protocol: "REST",    status: "LIVE"    },
];

function BuiltForYouAnimation({ tone }: { tone: Tone }) {
  const rgb = toneRgb[tone];

  return (
    <div className="flex h-full w-full overflow-hidden">
      <div className="flex w-[38%] flex-col overflow-hidden border-r border-border/30">
        <div className="flex items-center justify-between border-b border-border/25 px-4 py-2">
          <span className="font-mono text-[8px] font-semibold uppercase tracking-widest text-white/40">
            Your Requirements
          </span>
          <motion.span
            className="font-mono text-[7px]"
            style={{ color: `rgba(${rgb},.7)` }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          >
            {REQ_ITEMS.length} items
          </motion.span>
        </div>

        <div className="relative flex-1 overflow-hidden">
          <motion.div
            className="flex flex-col gap-0"
            animate={{ y: ["0%", "-50%"] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          >
            {REQ_ALL.map((item, i) => (
              <div
                key={`req-${i}`}
                className="flex items-center gap-2 border-b border-border/15 px-4 py-2.5"
              >
                <motion.span
                  className="size-1.5 shrink-0 rounded-full"
                  style={{ background: `rgba(${rgb},1)` }}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.8, delay: (i % REQ_ITEMS.length) * 0.22, repeat: Infinity }}
                />
                <span className="truncate font-mono text-[9px] text-white/65">{item.label}</span>
                <span
                  className="ml-auto shrink-0 rounded px-1.5 py-0.5 font-mono text-[7px]"
                  style={{ background: `rgba(${rgb},.1)`, color: `rgba(${rgb},.7)` }}
                >
                  {item.tag}
                </span>
              </div>
            ))}
          </motion.div>
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-12"
            style={{ background: "linear-gradient(to bottom, transparent, var(--color-surface))" }}
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-6"
            style={{ background: "linear-gradient(to top, transparent, var(--color-surface))" }}
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-0">
        <div className="flex items-center justify-between border-b border-border/25 px-4 py-2">
          <span className="font-mono text-[8px] font-semibold uppercase tracking-widest text-white/40">
            Platform Built For You
          </span>
          <motion.div
            className="flex items-center gap-1.5"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          >
            <span className="size-1.5 rounded-full" style={{ background: `rgba(${rgb},1)` }} />
            <span className="font-mono text-[7px]" style={{ color: `rgba(${rgb},.8)` }}>LIVE</span>
          </motion.div>
        </div>

        <div className="grid grid-cols-3 gap-px border-b border-border/20 bg-border/20">
          {METRIC_TILES.map((tile) => (
            <div
              key={tile.label}
              className="flex flex-col gap-1 bg-surface px-3 py-3"
            >
              <span className="font-mono text-[7px] uppercase tracking-widest text-white/35">
                {tile.label}
              </span>
              <div className="relative h-6">
                {tile.values.map((val, vi) => {
                  const t0 = vi * TILE_SLOT;
                  const t1 = t0 + 0.18;
                  const t2 = t0 + TILE_SLOT - 0.18;
                  const t3 = t0 + TILE_SLOT;
                  return (
                    <motion.span
                      key={val}
                      className="absolute inset-0 font-mono text-[13px] font-bold leading-none"
                      style={{ color: `rgba(${rgb},.95)` }}
                      animate={{ opacity: [0, 0, 1, 1, 0, 0] }}
                      transition={{
                        duration: TILE_CYCLE,
                        repeat: Infinity,
                        times: [0, t0 / TILE_CYCLE, t1 / TILE_CYCLE, t2 / TILE_CYCLE, t3 / TILE_CYCLE, 1],
                      }}
                    >
                      {val}
                    </motion.span>
                  );
                })}
              </div>
              <div className="relative h-3">
                {tile.delta.map((d, vi) => {
                  const t0 = vi * TILE_SLOT;
                  const t1 = t0 + 0.18;
                  const t2 = t0 + TILE_SLOT - 0.18;
                  const t3 = t0 + TILE_SLOT;
                  return (
                    <motion.span
                      key={`d-${vi}`}
                      className="absolute inset-0 font-mono text-[8px]"
                      style={{ color: d.startsWith("+") ? `rgba(${rgb},.6)` : "rgba(255,255,255,.3)" }}
                      animate={{ opacity: [0, 0, 1, 1, 0, 0] }}
                      transition={{
                        duration: TILE_CYCLE,
                        repeat: Infinity,
                        times: [0, t0 / TILE_CYCLE, t1 / TILE_CYCLE, t2 / TILE_CYCLE, t3 / TILE_CYCLE, 1],
                      }}
                    >
                      {d}
                    </motion.span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="border-b border-border/20 px-4 py-1.5">
            <span className="font-mono text-[7px] uppercase tracking-widest text-white/30">
              Connected Devices
            </span>
          </div>
          {DEVICE_ROWS.map((row, ri) => (
            <motion.div
              key={row.id}
              className="flex items-center gap-3 border-b border-border/10 px-4 py-1.5"
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: ri * 0.15 }}
            >
              <motion.span
                className="size-1.5 shrink-0 rounded-full"
                style={{
                  background: row.status === "LIVE" ? `rgba(${rgb},1)` : "rgba(245,158,11,1)",
                }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.2, delay: ri * 0.3, repeat: Infinity }}
              />
              <span className="font-mono text-[9px] text-white/65">{row.id}</span>
              <span
                className="rounded px-1.5 py-0.5 font-mono text-[7px]"
                style={{ background: `rgba(${rgb},.08)`, color: `rgba(${rgb},.6)` }}
              >
                {row.protocol}
              </span>
              <span
                className="ml-auto font-mono text-[7px]"
                style={{
                  color: row.status === "LIVE" ? `rgba(${rgb},.75)` : "rgba(245,158,11,.75)",
                }}
              >
                {row.status}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

const INNER_ITEMS = ["MQTT", "REST", "MODBUS", "OPC-UA"];
const OUTER_ITEMS = ["ZIGBEE", "LoRaWAN", "BLE", "CAN Bus"];

function OrbitAnimation({ tone }: { tone: Tone }) {
  const rgb = toneRgb[tone];
  const cx = 100;
  const cy = 85;
  const r1 = 44;
  const r2 = 72;

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <svg viewBox="0 0 200 170" className="h-full w-full" preserveAspectRatio="xMidYMid meet" aria-hidden>
        <circle cx={cx} cy={cy} r={r1} fill="none" stroke={`rgba(${rgb},.1)`} strokeWidth="0.6" strokeDasharray="3 3" />
        <circle cx={cx} cy={cy} r={r2} fill="none" stroke={`rgba(${rgb},.07)`} strokeWidth="0.6" strokeDasharray="4 4" />

        {[0, 1, 2].map((i) => (
          <motion.circle
            key={i}
            cx={cx}
            cy={cy}
            fill="none"
            stroke={`rgba(${rgb},.25)`}
            strokeWidth="0.6"
            initial={{ r: 18, opacity: 0.5 }}
            animate={{ r: [18, 38], opacity: [0.4, 0] }}
            transition={{ duration: 2.4, delay: i * 0.8, repeat: Infinity, ease: "easeOut" }}
          />
        ))}

        <motion.circle
          cx={cx} cy={cy} r={18}
          fill={`rgba(${rgb},.12)`}
          stroke={`rgba(${rgb},.55)`}
          strokeWidth="1"
          animate={{ r: [18, 19.5, 18] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <text x={cx} y={cy - 1} textAnchor="middle" dominantBaseline="middle"
          fill={`rgba(${rgb},.9)`} fontSize="5.5" fontFamily="monospace" fontWeight="bold">
          PLATFORM
        </text>
        <text x={cx} y={cy + 7} textAnchor="middle" dominantBaseline="middle"
          fill={`rgba(${rgb},.45)`} fontSize="3.5" fontFamily="monospace">
          HUB
        </text>

        <motion.g
          style={{ transformOrigin: `${cx}px ${cy}px` }}
          animate={{ rotate: 360 }}
          transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
        >
          {INNER_ITEMS.map((label, i) => {
            const a = (i / INNER_ITEMS.length) * 2 * Math.PI - Math.PI / 2;
            const x = cx + r1 * Math.cos(a);
            const y = cy + r1 * Math.sin(a);
            return (
              <motion.g
                key={label}
                style={{ transformOrigin: `${x}px ${y}px` }}
                animate={{ rotate: -360 }}
                transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
              >
                <rect x={x - 14} y={y - 6} width={28} height={12} rx="3"
                  fill={`rgba(${rgb},.14)`} stroke={`rgba(${rgb},.45)`} strokeWidth="0.6" />
                <text x={x} y={y + 0.5} textAnchor="middle" dominantBaseline="middle"
                  fill={`rgba(${rgb},.9)`} fontSize="4.5" fontFamily="monospace" fontWeight="600">
                  {label}
                </text>
              </motion.g>
            );
          })}
        </motion.g>

        <motion.g
          style={{ transformOrigin: `${cx}px ${cy}px` }}
          animate={{ rotate: -360 }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        >
          {OUTER_ITEMS.map((label, i) => {
            const a = (i / OUTER_ITEMS.length) * 2 * Math.PI;
            const x = cx + r2 * Math.cos(a);
            const y = cy + r2 * Math.sin(a);
            return (
              <motion.g
                key={label}
                style={{ transformOrigin: `${x}px ${y}px` }}
                animate={{ rotate: 360 }}
                transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
              >
                <rect x={x - 14} y={y - 6} width={28} height={12} rx="3"
                  fill={`rgba(${rgb},.08)`} stroke={`rgba(${rgb},.28)`} strokeWidth="0.5" />
                <text x={x} y={y + 0.5} textAnchor="middle" dominantBaseline="middle"
                  fill={`rgba(${rgb},.7)`} fontSize="4" fontFamily="monospace">
                  {label}
                </text>
              </motion.g>
            );
          })}
        </motion.g>
      </svg>
    </div>
  );
}

const HIST_D = "M8,58 C20,54 28,50 40,48 C52,46 58,50 68,45 C78,40 84,43 96,40 C108,37 114,42 124,38";
const PRED_D = "M124,38 C136,35 144,33 158,30 C168,28 178,26 192,24";

function ForecastAnimation({ tone }: { tone: Tone }) {
  const rgb = toneRgb[tone];
  return (
    <div className="relative flex h-full w-full flex-col">
      <div className="flex items-center justify-between px-4 pt-3 pb-1">
        <span className="font-mono text-[8px] text-white/35">PREDICTIVE ANALYTICS</span>
        <motion.div
          className="flex items-center gap-1.5"
          animate={{ opacity: [0.45, 1, 0.45] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          <motion.span
            className="size-1.5 rounded-full"
            style={{ background: `rgba(${rgb},1)` }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 0.9, repeat: Infinity }}
          />
          <span className="font-mono text-[8px]" style={{ color: `rgba(${rgb},.85)` }}>LIVE</span>
        </motion.div>
      </div>

      <div className="relative flex-1 px-2">
        <svg viewBox="0 0 200 80" className="h-full w-full" aria-hidden>
          <defs>
            <linearGradient id={`fg-area-${tone}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={`rgba(${rgb},.2)`} />
              <stop offset="100%" stopColor={`rgba(${rgb},0)`} />
            </linearGradient>
            <linearGradient id={`fg-pred-${tone}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={`rgba(${rgb},.08)`} />
              <stop offset="100%" stopColor={`rgba(${rgb},0)`} />
            </linearGradient>
          </defs>

          <path d={`${HIST_D} L124,80 L8,80 Z`} fill={`url(#fg-area-${tone})`} />
          <path d={`${PRED_D} L192,80 L124,80 Z`} fill={`url(#fg-pred-${tone})`} />

          <line x1="124" y1="8" x2="124" y2="72"
            stroke={`rgba(${rgb},.2)`} strokeWidth="0.6" strokeDasharray="3 2" />

          <text x="126" y="13" fill={`rgba(${rgb},.5)`} fontSize="4" fontFamily="monospace">NOW</text>
          <text x="150" y="13" fill="rgba(255,255,255,.2)" fontSize="4" fontFamily="monospace">PREDICTED →</text>

          <motion.path
            d={HIST_D}
            fill="none"
            stroke={`rgba(${rgb},.9)`}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeDasharray="220"
            initial={{ strokeDashoffset: 220 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 2.2, ease: "easeOut", repeat: Infinity, repeatDelay: 3.5 }}
          />

          <motion.path
            d={PRED_D}
            fill="none"
            stroke={`rgba(${rgb},.45)`}
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeDasharray="5 4"
            animate={{ opacity: [0, 0, 1, 1, 0] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              times: [0, 0.36, 0.5, 0.85, 1],
            }}
          />

          <motion.circle cx="124" cy="38" r="3"
            fill={`rgba(${rgb},.95)`}
            animate={{ r: [3, 4, 3] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
          <motion.circle cx="124" cy="38"
            fill="none"
            stroke={`rgba(${rgb},.4)`}
            strokeWidth="0.8"
            initial={{ r: 3 }}
            animate={{ r: [3, 14], opacity: [0.6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
          />

          <motion.g
            animate={{ opacity: [0, 0, 1, 1, 0] }}
            transition={{ duration: 6, repeat: Infinity, times: [0, 0.5, 0.6, 0.85, 1] }}
          >
            <rect x="140" y="32" width="48" height="12" rx="3"
              fill={`rgba(${rgb},.15)`} stroke={`rgba(${rgb},.45)`} strokeWidth="0.6" />
            <text x="164" y="38.5" textAnchor="middle" dominantBaseline="middle"
              fill={`rgba(${rgb},.9)`} fontSize="4.2" fontFamily="monospace" fontWeight="bold">
              PREDICTED: OK
            </text>
          </motion.g>
        </svg>
      </div>

      <div className="flex items-center gap-3 px-4 pb-3">
        <div className="flex items-center gap-1.5">
          <div className="h-[2px] w-4 rounded" style={{ background: `rgba(${rgb},.8)` }} />
          <span className="font-mono text-[7px] text-white/45">ACTUAL</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-[1px] w-4 rounded" style={{ background: `rgba(${rgb},.4)`, borderTop: `1px dashed rgba(${rgb},.4)` }} />
          <span className="font-mono text-[7px] text-white/45">PREDICTED</span>
        </div>
        <motion.span
          className="ml-auto font-mono text-[7px] font-semibold"
          style={{ color: `rgba(${rgb},.75)` }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        >
          94% ACCURACY
        </motion.span>
      </div>
    </div>
  );
}

const ROW1_ITEMS = ["KICKOFF", "REQUIREMENTS", "INTEGRATION", "DASHBOARD", "ALERTS CONFIG", "TESTING", "STAGING", "GO-LIVE"];
const ROW2_ITEMS = ["CONFIGURE", "DATA SCHEMA", "ML MODELS", "REPORTS", "SECURITY AUDIT", "USER TRAINING", "DOCS", "HANDOVER"];

const ROW1_ALL = [...ROW1_ITEMS, ...ROW1_ITEMS];
const ROW2_ALL = [...ROW2_ITEMS, ...ROW2_ITEMS];

function MarqueeAnimation({ tone }: { tone: Tone }) {
  const rgb = toneRgb[tone];
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 overflow-hidden px-0 py-4">
      <div className="w-full overflow-hidden">
        <motion.div
          className="flex gap-2"
          style={{ width: "max-content" }}
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {ROW1_ALL.map((label, i) => (
            <div
              key={`r1-${i}`}
              className="flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1"
              style={{ borderColor: `rgba(${rgb},.3)`, background: `rgba(${rgb},.08)` }}
            >
              <span className="font-mono text-[8px] font-bold" style={{ color: `rgba(${rgb},.75)` }}>✓</span>
              <span className="font-mono text-[8px] whitespace-nowrap" style={{ color: "rgba(255,255,255,.65)" }}>
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="w-full overflow-hidden">
        <motion.div
          className="flex gap-2"
          style={{ width: "max-content" }}
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
        >
          {ROW2_ALL.map((label, i) => (
            <div
              key={`r2-${i}`}
              className="flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1"
              style={{ borderColor: `rgba(${rgb},.2)`, background: `rgba(${rgb},.05)` }}
            >
              <span className="font-mono text-[8px]" style={{ color: `rgba(${rgb},.5)` }}>→</span>
              <span className="font-mono text-[8px] whitespace-nowrap" style={{ color: "rgba(255,255,255,.45)" }}>
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="flex items-center gap-2 rounded-full border px-4 py-1.5"
        style={{ borderColor: `rgba(${rgb},.4)`, background: `rgba(${rgb},.12)` }}
        animate={{ opacity: [0.55, 1, 0.55] }}
        transition={{ duration: 2.4, repeat: Infinity }}
      >
        <motion.span
          className="size-1.5 rounded-full"
          style={{ background: `rgba(${rgb},1)` }}
          animate={{ opacity: [0.35, 1, 0.35] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <span className="font-mono text-[8px] font-semibold" style={{ color: `rgba(${rgb},.9)` }}>
          DEPLOYED IN 4 WEEKS
        </span>
      </motion.div>
    </div>
  );
}

function BentoCard({
  title,
  description,
  tone,
  animationHeight = "h-48",
  children,
}: {
  title: string;
  description: string;
  tone: Tone;
  animationHeight?: string;
  children: React.ReactNode;
}) {
  const rgb = toneRgb[tone];
  return (
    <motion.div
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      style={{ boxShadow: `0 4px 24px -4px rgba(${rgb},.1)` }}
    >
      <div
        className="absolute inset-x-0 top-0 h-[2px]"
        style={{ background: `linear-gradient(90deg, rgba(${rgb},.7) 0%, rgba(${rgb},0) 70%)` }}
      />

      <div className="flex flex-col gap-2 p-5 pb-4">
        <h3 className="text-base font-semibold leading-snug tracking-tight text-foreground">
          {title}
        </h3>
        <p className="text-[12px] leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>

      <div className={cn("relative min-h-0 flex-1 overflow-hidden border-t border-border/40", animationHeight)}>
        {children}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-10"
          style={{ background: "linear-gradient(to bottom, transparent, var(--color-surface))" }}
        />
      </div>
    </motion.div>
  );
}

export function BentoGrid() {
  return (
    <section className="section-divide bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-20">
        <div className="mb-12">
          <span className="label-mono text-accent-teal">PLATFORM</span>
          <h2 className="mt-3 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
            Built For Scale.{" "}
            <span className="text-brand">Designed for You.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Advanced IoT infrastructure that grows with your business.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <div className="md:col-span-2 md:h-[380px]">
            <BentoCard
              title="Built Exactly for You"
              description="We understand your challenge first. Then we build — no templates, no compromises."
              tone="teal"
              animationHeight="h-56"
            >
              <BuiltForYouAnimation tone="teal" />
            </BentoCard>
          </div>

          <div className="md:col-span-1 md:h-[380px]">
            <BentoCard
              title="Modular Architecture"
              description="Independent, proven modules. Plug together what you need."
              tone="blue"
              animationHeight="h-56"
            >
              <OrbitAnimation tone="blue" />
            </BentoCard>
          </div>

          <div className="md:col-span-1 md:h-[380px]">
            <BentoCard
              title="AI Built In"
              description="Predictive analytics, automated alerts, intelligent workflows."
              tone="purple"
              animationHeight="h-56"
            >
              <ForecastAnimation tone="purple" />
            </BentoCard>
          </div>

          <div className="md:col-span-2 md:h-[380px]">
            <BentoCard
              title="Weeks, Not Months"
              description="Fully customized platforms — deployed fast without cutting corners."
              tone="green"
              animationHeight="h-56"
            >
              <MarqueeAnimation tone="green" />
            </BentoCard>
          </div>
        </div>
      </div>
    </section>
  );
}
