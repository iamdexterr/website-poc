"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { IndustryPhotoCard } from "@/components/mockups/real/industry-photo-card";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { cn } from "@/lib/utils";

function ClimateSensorReadingsWidget() {
  const readings = [
    { label: "TEMP", value: "22.4°C", ok: true, color: "text-[var(--accent-teal)]" },
    { label: "HUMIDITY", value: "55%", ok: true, color: "text-[var(--accent-blue)]" },
    { label: "CO₂", value: "420 ppm", ok: true, color: "text-[var(--accent-green)]" },
    { label: "NH₃", value: "18 ppm", ok: false, color: "text-[var(--accent-amber)]" },
  ];
  return (
    <div className="space-y-1.5">
      <div className="mb-2 font-mono text-[8px] uppercase tracking-widest text-white/50">LIVE SENSORS</div>
      {readings.map((r) => (
        <div key={r.label} className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className={cn("size-1 rounded-full", r.ok ? "bg-[var(--accent-teal)]" : "animate-pulse bg-[var(--accent-amber)]")} />
            <span className="font-mono text-[8px] text-white/55">{r.label}</span>
          </div>
          <span className={cn("font-mono text-[10px] font-semibold", r.color)}>{r.value}</span>
        </div>
      ))}
    </div>
  );
}

function ClimateTrendGraphsWidget() {
  const tempPts = "M 0,20 L 16,18 L 32,17 L 48,14 L 64,15 L 80,12 L 96,10 L 112,11 L 128,9";
  const humidPts = "M 0,16 L 16,17 L 32,15 L 48,16 L 64,14 L 80,15 L 96,13 L 112,14 L 128,12";
  return (
    <div className="space-y-2.5">
      <div>
        <div className="mb-1 flex items-baseline justify-between">
          <span className="font-mono text-[8px] uppercase tracking-widest text-white/50">TEMP TREND</span>
          <span className="font-mono text-[9px] font-semibold text-[var(--accent-teal)]">↓ 0.8°C</span>
        </div>
        <svg viewBox="0 0 128 24" preserveAspectRatio="none" className="h-5 w-full" aria-hidden>
          <defs>
            <linearGradient id="tg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent-teal)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="var(--accent-teal)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={`${tempPts} L 128,24 L 0,24 Z`} fill="url(#tg)" />
          <path d={tempPts} fill="none" stroke="var(--accent-teal)" strokeWidth="1.5" />
          <circle cx="128" cy="9" r="2" fill="var(--accent-teal)" />
        </svg>
      </div>
      <div>
        <div className="mb-1 flex items-baseline justify-between">
          <span className="font-mono text-[8px] uppercase tracking-widest text-white/50">HUMIDITY TREND</span>
          <span className="font-mono text-[9px] font-semibold text-[var(--accent-blue)]">stable</span>
        </div>
        <svg viewBox="0 0 128 22" preserveAspectRatio="none" className="h-5 w-full" aria-hidden>
          <defs>
            <linearGradient id="hg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent-blue)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="var(--accent-blue)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={`${humidPts} L 128,22 L 0,22 Z`} fill="url(#hg)" />
          <path d={humidPts} fill="none" stroke="var(--accent-blue)" strokeWidth="1.5" />
          <circle cx="128" cy="12" r="2" fill="var(--accent-blue)" />
        </svg>
      </div>
    </div>
  );
}

function ClimateSystemStatusWidget() {
  const systems = [
    { label: "FAN UNIT", status: "RUNNING", ok: true },
    { label: "COMPRESSOR", status: "RUNNING", ok: true },
    { label: "FILTER", status: "DEGRADED", ok: false },
  ];
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <span className="font-mono text-[8px] uppercase tracking-widest text-white/50">SYSTEM STATUS</span>
        <span className="font-mono text-[9px] font-semibold text-[var(--accent-teal)]">91% eff.</span>
      </div>
      <div className="space-y-1.5">
        {systems.map((s) => (
          <div key={s.label} className="flex items-center justify-between">
            <span className="font-mono text-[8px] text-white/55">{s.label}</span>
            <div className="flex items-center gap-1">
              <span className={cn("size-1 rounded-full", s.ok ? "bg-[var(--accent-green)]" : "animate-pulse bg-[var(--accent-amber)]")} />
              <span className={cn("font-mono text-[8px]", s.ok ? "text-[var(--accent-green)]" : "text-[var(--accent-amber)]")}>{s.status}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2.5 h-1 w-full overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-[var(--accent-teal)]" style={{ width: "91%" }} />
      </div>
    </div>
  );
}

function AssetLocationWidget() {
  const vehicles = [
    { id: "TRK-04", status: "MOVING", color: "text-[var(--accent-amber)]", dot: "bg-[var(--accent-amber)]", moving: true },
    { id: "TRK-11", status: "IDLE", color: "text-white/50", dot: "bg-white/30", moving: false },
    { id: "EXC-02", status: "ACTIVE", color: "text-[var(--accent-green)]", dot: "bg-[var(--accent-green)]", moving: true },
  ];
  return (
    <div className="space-y-1.5">
      <div className="mb-2 font-mono text-[8px] uppercase tracking-widest text-white/50">VEHICLE LOCATIONS</div>
      {vehicles.map((v) => (
        <div key={v.id} className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className={cn("size-1.5 rounded-full", v.moving ? "animate-pulse" : "", v.dot)} />
            <span className="font-mono text-[9px] text-white/60">{v.id}</span>
          </div>
          <span className={cn("font-mono text-[9px] font-semibold", v.color)}>{v.status}</span>
        </div>
      ))}
    </div>
  );
}

function AssetUsageWidget() {
  const bars = [
    { label: "ACTIVE HRS", pct: 72, color: "bg-[var(--accent-amber)]" },
    { label: "IDLE TIME", pct: 18, color: "bg-white/25" },
    { label: "UTILISATION", pct: 80, color: "bg-[var(--accent-green)]" },
  ];
  return (
    <div className="space-y-2">
      <div className="mb-1 font-mono text-[8px] uppercase tracking-widest text-white/50">USAGE TRENDS</div>
      {bars.map((b) => (
        <div key={b.label}>
          <div className="mb-1 flex items-baseline justify-between">
            <span className="font-mono text-[8px] text-white/50">{b.label}</span>
            <span className="font-mono text-[9px] font-semibold text-white">{b.pct}%</span>
          </div>
          <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
            <div className={cn("h-full rounded-full", b.color)} style={{ width: `${b.pct}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function AssetRouteWidget() {
  const pts = "M 0,22 L 20,18 L 44,20 L 68,14 L 92,16 L 112,10 L 128,8";
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <span className="font-mono text-[8px] uppercase tracking-widest text-white/50">ROUTE EFF.</span>
        <span className="font-mono text-[10px] font-semibold text-[var(--accent-amber)]">↑ 12%</span>
      </div>
      <svg viewBox="0 0 128 28" preserveAspectRatio="none" className="h-7 w-full" aria-hidden>
        <defs>
          <linearGradient id="rg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent-amber)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--accent-amber)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`${pts} L 128,28 L 0,28 Z`} fill="url(#rg)" />
        <path d={pts} fill="none" stroke="var(--accent-amber)" strokeWidth="1.5" />
        <circle cx="128" cy="8" r="2.5" fill="var(--accent-amber)" />
      </svg>
      <div className="mt-1.5 flex justify-between">
        <span className="font-mono text-[8px] text-white/50">AVG 38 km/trip</span>
        <span className="font-mono text-[8px] text-white/50">2h 14m avg</span>
      </div>
    </div>
  );
}

function CityAssetsWidget() {
  const assets = [
    { label: "STREETLIGHTS", v: "2,841", ok: true },
    { label: "UTILITIES", v: "614", ok: true },
    { label: "GATEWAYS", v: "128", ok: false },
  ];
  return (
    <div className="space-y-1.5">
      <div className="mb-2 font-mono text-[8px] uppercase tracking-widest text-white/50">CONNECTED ASSETS</div>
      {assets.map((a) => (
        <div key={a.label} className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className={cn("size-1.5 rounded-full", a.ok ? "bg-[var(--accent-green)]" : "animate-pulse bg-[var(--accent-amber)]")} />
            <span className="font-mono text-[8px] text-white/55">{a.label}</span>
          </div>
          <span className="font-mono text-[10px] font-semibold text-white">{a.v}</span>
        </div>
      ))}
    </div>
  );
}

function CityEnergyWidget() {
  const zones = [
    { id: "NORTH", energy: 68, water: 52 },
    { id: "SOUTH", energy: 81, water: 74 },
    { id: "EAST", energy: 44, water: 38 },
  ];
  return (
    <div className="space-y-2">
      <div className="mb-1 font-mono text-[8px] uppercase tracking-widest text-white/50">CONSUMPTION</div>
      {zones.map((z) => (
        <div key={z.id}>
          <div className="mb-1 flex items-baseline justify-between">
            <span className="font-mono text-[8px] text-white/50">{z.id}</span>
            <div className="flex gap-2">
              <span className="font-mono text-[8px] text-[var(--accent-amber)]">⚡{z.energy}%</span>
              <span className="font-mono text-[8px] text-[var(--accent-blue)]">💧{z.water}%</span>
            </div>
          </div>
          <div className="flex h-1 w-full gap-px overflow-hidden rounded-full">
            <div className="bg-[var(--accent-amber)]/60" style={{ width: `${z.energy}%` }} />
            <div className="flex-1 bg-white/8" />
          </div>
        </div>
      ))}
    </div>
  );
}

function CityAlertsWidget() {
  const items = [
    { id: "ALT-091", type: "POWER OUTAGE", sev: "high", color: "text-[var(--accent-red)]", dot: "bg-[var(--accent-red)]" },
    { id: "ALT-087", type: "SENSOR OFFLINE", sev: "mid", color: "text-[var(--accent-amber)]", dot: "bg-[var(--accent-amber)]" },
    { id: "ALT-082", type: "FLOW NOMINAL", sev: "ok", color: "text-[var(--accent-green)]", dot: "bg-[var(--accent-green)]" },
  ];
  return (
    <div className="space-y-1.5">
      <div className="mb-2 font-mono text-[8px] uppercase tracking-widest text-white/50">ALERTS</div>
      {items.map((a) => (
        <div key={a.id} className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className={cn("size-1.5 rounded-full", a.sev === "high" ? "animate-pulse" : "", a.dot)} />
            <span className="font-mono text-[8px] text-white/55">{a.type}</span>
          </div>
          <span className={cn("font-mono text-[8px] font-semibold", a.color)}>{a.id}</span>
        </div>
      ))}
    </div>
  );
}

type Slide = {
  href: string;
  eyebrow: string;
  title: string;
  description: string;
  metricValue: string;
  metricLabel: string;
  ctaLabel: string;
  image: string;
  tone: "teal" | "green" | "amber" | "purple" | "blue";
  navLabel: string;
  cutouts: React.ReactNode[];
};

const slides: Slide[] = [
  {
    href: "/solutions/climate-control",
    eyebrow: "CLIMATE CONTROL · LIVE",
    title: "Precision where it matters.",
    description:
      "Monitor and control temperature, humidity, air quality, and environmental conditions in real time — for industries where deviation means loss.",
    metricValue: "1,847",
    metricLabel: "sensors online",
    ctaLabel: "Explore climate solutions",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80",
    tone: "teal",
    navLabel: "Climate",
    cutouts: [
      <ClimateSensorReadingsWidget key="sensors" />,
      <ClimateTrendGraphsWidget key="trends" />,
      <ClimateSystemStatusWidget key="system" />,
    ],
  },
  {
    href: "/solutions/asset-tracking",
    eyebrow: "ASSET TRACKING · LIVE",
    title: "Complete visibility. Total control.",
    description:
      "Know where every asset is and how it's performing. Real-time tracking, predictive maintenance, and full lifecycle intelligence.",
    metricValue: "23,400",
    metricLabel: "assets tracked",
    ctaLabel: "Explore asset tracking",
    image:
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1600&q=80",
    tone: "amber",
    navLabel: "Asset",
    cutouts: [<AssetLocationWidget key="loc" />, <AssetUsageWidget key="usage" />, <AssetRouteWidget key="route" />],
  },
  {
    href: "/solutions/smart-city",
    eyebrow: "SMART CITY · LIVE",
    title: "Cities that actually work.",
    description:
      "Unified platforms for water, waste, energy, environment, and infrastructure — giving municipalities real-time intelligence and citizen transparency.",
    metricValue: "12",
    metricLabel: "cities deployed",
    ctaLabel: "Explore smart city solutions",
    image:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1600&q=80",
    tone: "blue",
    navLabel: "Smart city",
    cutouts: [<CityAssetsWidget key="assets" />, <CityEnergyWidget key="energy" />, <CityAlertsWidget key="alerts" />],
  },
];

const CYCLE_MS = 6000;

type Tone = "teal" | "green" | "blue" | "amber" | "purple";

const toneText: Record<Tone, string> = {
  teal: "text-accent-teal",
  green: "text-accent-green",
  blue: "text-accent-blue",
  amber: "text-accent-amber",
  purple: "text-accent-purple",
};

const toneBg: Record<Tone, string> = {
  teal: "bg-accent-teal",
  green: "bg-accent-green",
  blue: "bg-accent-blue",
  amber: "bg-accent-amber",
  purple: "bg-accent-purple",
};

const toneVar: Record<Tone, string> = {
  teal: "var(--accent-teal)",
  green: "var(--accent-green)",
  blue: "var(--accent-blue)",
  amber: "var(--accent-amber)",
  purple: "var(--accent-purple)",
};

const toneBorder: Record<Tone, string> = {
  teal: "border-accent-teal/30",
  green: "border-accent-green/30",
  blue: "border-accent-blue/30",
  amber: "border-accent-amber/30",
  purple: "border-accent-purple/30",
};

const toneRgb: Record<Tone, string> = {
  teal:   "2,161,147",
  purple: "139,92,246",
  blue:   "59,130,246",
  amber:  "245,158,11",
  green:  "52,211,153",
};

function CardGraphic({ tone }: { tone: Tone }) {
  const rgb = toneRgb[tone];
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div
        className="animate-card-strips absolute inset-0"
        style={{
          background: `repeating-linear-gradient(90deg, rgba(${rgb},.02) 0px, rgba(${rgb},.12) 2px, transparent 12px, transparent 24px)`,
        }}
      />
      <div
        className="animate-card-wave1 absolute inset-0"
        style={{
          filter: "blur(38px)",
          background: `radial-gradient(circle at 30% 20%, rgba(${rgb},.75), transparent 40%)`,
        }}
      />
      <div
        className="animate-card-wave2 absolute inset-0"
        style={{
          filter: "blur(32px)",
          background: `radial-gradient(circle at 70% 30%, rgba(${rgb},.45), transparent 35%)`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, transparent 0%, rgba(5,10,10,.18) 60%, rgba(5,10,10,.72) 100%)",
        }}
      />
    </div>
  );
}

const strengthMeta: { graphic: (tone: Tone) => React.ReactNode; icon: React.ReactNode }[] = [
  {
    graphic: (tone) => <CardGraphic tone={tone} />,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
  },
  {
    graphic: (tone) => <CardGraphic tone={tone} />,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M12 3l1.5 3.5L17 8l-3.5 1.5L12 13l-1.5-3.5L7 8l3.5-1.5z"/>
        <path d="M19 15l.75 1.75L21.5 17.5l-1.75.75L19 21l-.75-1.75L16.5 18.5l1.75-.75z"/>
      </svg>
    ),
  },
  {
    graphic: (tone) => <CardGraphic tone={tone} />,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    graphic: (tone) => <CardGraphic tone={tone} />,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/>
        <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
      </svg>
    ),
  },
];

type Strength = {
  eyebrow: string;
  tone: Tone;
  title: string;
  body: string;
  metric: string;
};

const strengths: Strength[] = [
  {
    eyebrow: "MODULARITY",
    tone: "teal",
    title: "Custom assembly",
    body: "Same platform, reconfigured for your stack — sensors, gateways, protocols, and dashboards composed to your exact requirements.",
    metric: "Built to your spec",
  },
  {
    eyebrow: "AI · AUTOMATION",
    tone: "purple",
    title: "AI intelligence",
    body: "Predictive analytics, anomaly detection, and automated remediation — so the platform acts before your team has to react.",
    metric: "Predict · automate",
  },
  {
    eyebrow: "SECURITY",
    tone: "blue",
    title: "Enterprise security",
    body: "End-to-end encryption, RBAC, SSO, and a full audit trail. SOC 2-ready surfaces from device to dashboard.",
    metric: "End-to-end encrypted",
  },
  {
    eyebrow: "DEPLOYMENT",
    tone: "amber",
    title: "Flexible deployment",
    body: "Cloud, on-premise, hybrid, or edge — pick where your data lives without giving up the same operator experience.",
    metric: "Cloud · on-prem · edge",
  },
];

export function SolutionsOverview() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (paused) return;
    const startedAt = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const pct = Math.min(1, (now - startedAt) / CYCLE_MS);
      setProgress(pct);
      if (pct >= 1) {
        setIndex((i) => (i + 1) % slides.length);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paused, index]);

  const go = (next: number) => {
    setProgress(0);
    setIndex(((next % slides.length) + slides.length) % slides.length);
  };

  const active = slides[index];

  return (
    <section
      id="solutions"
      className="section-divide relative overflow-hidden bg-dot-grid"
    >
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-20">
        <div className="max-w-3xl">
          <span className="label-mono text-accent-teal">SOLUTIONS</span>
          <h2 className="mt-3 text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
            Three domains. One platform.{" "}
            <span className="text-brand">Your solution.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Same modular platform. Different assembly for every challenge.
          </p>
        </div>

        <div
          className="relative mt-8"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative h-[480px] overflow-hidden md:h-[540px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.href}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <IndustryPhotoCard
                  className="h-full"
                  eyebrow={active.eyebrow}
                  title={active.title}
                  description={active.description}
                  metricValue={active.metricValue}
                  metricLabel={active.metricLabel}
                  ctaLabel={active.ctaLabel}
                  ctaHref={active.href}
                  image={active.image}
                  tone={active.tone}
                  cutouts={active.cutouts}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              {slides.map((s, i) => (
                <button
                  key={s.href}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Show ${s.navLabel}`}
                  aria-current={i === index}
                  className={cn(
                    "group flex items-center gap-2 rounded-md border px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-colors",
                    i === index
                      ? "border-border-strong bg-surface-elevated text-foreground"
                      : "border-border bg-surface text-muted-foreground hover:text-foreground",
                  )}
                >
                  {i === index ? (
                    <span
                      className="relative h-1 w-6 overflow-hidden rounded-full bg-border-strong"
                      aria-hidden
                    >
                      <span
                        className="absolute inset-y-0 left-0 bg-foreground"
                        style={{ width: `${progress * 100}%` }}
                      />
                    </span>
                  ) : (
                    <span
                      className="h-1 w-1.5 rounded-full bg-border-strong transition-all duration-500"
                      aria-hidden
                    />
                  )}
                  {s.navLabel}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label="Previous solution"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface text-muted-foreground hover:text-foreground"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label="Next solution"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface text-muted-foreground hover:text-foreground"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <span className="label-mono text-accent-teal">
            EVERY SOLUTION INCLUDES
          </span>
          <h3 className="mt-3 max-w-3xl text-2xl font-semibold tracking-tight md:text-3xl">
            The four strengths that ship with every deployment.
          </h3>

          <div className="mt-8 rounded-2xl border border-border bg-surface p-3 shadow-sm">
            <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
              {strengths.map((s, idx) => (
                <li key={s.title}>
                  <SpotlightCard
                    tone={s.tone}
                    className="relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-background"
                  >
                    <div
                      className="relative h-36 w-full overflow-hidden"
                      style={{ background: `radial-gradient(ellipse 100% 120% at 50% 110%, ${toneVar[s.tone]}14, transparent 65%)` }}
                    >
                      <div
                        className="absolute inset-x-0 top-0 h-[2px]"
                        style={{ background: `linear-gradient(90deg, ${toneVar[s.tone]}cc 0%, ${toneVar[s.tone]}00 80%)` }}
                      />
                      {strengthMeta[idx].graphic(s.tone)}
                    </div>

                    <div className="flex flex-1 flex-col px-5 pb-5">
                      <div className="mb-3 flex items-center gap-3">
                        <div
                          className={cn(
                            "inline-flex shrink-0 items-center justify-center rounded-lg border p-2",
                            toneBorder[s.tone],
                            toneText[s.tone],
                          )}
                          style={{ background: `${toneVar[s.tone]}12` }}
                        >
                          {strengthMeta[idx].icon}
                        </div>
                        <h4 className="text-base font-semibold leading-tight tracking-tight">
                          {s.title}
                        </h4>
                      </div>

                      <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                        {s.body}
                      </p>
                      <div className="mt-5 inline-flex w-fit items-center gap-2 rounded-md border border-border bg-surface px-2.5 py-1.5 font-mono text-xs text-foreground">
                        <span className={cn("size-1.5 rounded-full", toneBg[s.tone])} />
                        {s.metric}
                      </div>
                    </div>
                  </SpotlightCard>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
