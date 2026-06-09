"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { FadeUp, Stagger, StaggerItem } from "@/components/motion/fade-up";
import { SpotlightCard } from "@/components/motion/spotlight-card";

type Tone = "teal" | "blue" | "purple" | "green" | "amber";

const toneVar: Record<Tone, string> = {
  teal:   "var(--accent-teal)",
  blue:   "var(--accent-blue)",
  purple: "var(--accent-purple)",
  green:  "var(--accent-green)",
  amber:  "var(--accent-amber)",
};

const toneText: Record<Tone, string> = {
  teal:   "text-accent-teal",
  blue:   "text-accent-blue",
  purple: "text-accent-purple",
  green:  "text-accent-green",
  amber:  "text-accent-amber",
};

const toneBg: Record<Tone, string> = {
  teal:   "bg-accent-teal",
  blue:   "bg-accent-blue",
  purple: "bg-accent-purple",
  green:  "bg-accent-green",
  amber:  "bg-accent-amber",
};

const toneBorder: Record<Tone, string> = {
  teal:   "border-accent-teal/30",
  blue:   "border-accent-blue/30",
  purple: "border-accent-purple/30",
  green:  "border-accent-green/30",
  amber:  "border-accent-amber/30",
};

const toneRgb: Record<Tone, string> = {
  teal:   "2,161,147",
  blue:   "59,130,246",
  purple: "139,92,246",
  green:  "52,211,153",
  amber:  "245,158,11",
};

function BuiltForYouGraphic({ tone }: { tone: Tone }) {
  const rgb = toneRgb[tone];
  const items = [
    { label: "Problem scope defined" },
    { label: "Success criteria set" },
    { label: "Constraints captured" },
  ];
  return (
    <div className="flex h-full w-full flex-col justify-center gap-2 px-4">
      <span className="font-mono text-[8px] text-white/40">REQUIREMENTS</span>
      {items.map((item, i) => (
        <div key={item.label} className="flex items-center gap-2">
          <motion.div
            className="flex size-4 shrink-0 items-center justify-center rounded border"
            style={{ borderColor: `rgba(${rgb},.35)`, background: `rgba(${rgb},.08)` }}
            initial={{ borderColor: "rgba(255,255,255,.12)", background: "rgba(255,255,255,.04)" }}
            animate={{
              borderColor: [`rgba(255,255,255,.12)`, `rgba(${rgb},.6)`, `rgba(${rgb},.35)`],
              background: [`rgba(255,255,255,.04)`, `rgba(${rgb},.2)`, `rgba(${rgb},.08)`],
            }}
            transition={{ delay: 0.6 + i * 0.55, duration: 0.4, repeat: Infinity, repeatDelay: items.length * 0.55 + 1.8 }}
          >
            <motion.svg
              width="8" height="8" viewBox="0 0 10 10" fill="none" aria-hidden
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.85 + i * 0.55, duration: 0.25, repeat: Infinity, repeatDelay: items.length * 0.55 + 1.55 }}
            >
              <path d="M2 5l2.5 2.5L8 3" stroke={`rgba(${rgb},.95)`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </motion.svg>
          </motion.div>
          <motion.span
            className="font-mono text-[8px]"
            initial={{ color: "rgba(255,255,255,.3)" }}
            animate={{ color: [`rgba(255,255,255,.3)`, `rgba(${rgb},.85)`, `rgba(255,255,255,.55)`] }}
            transition={{ delay: 0.85 + i * 0.55, duration: 0.4, repeat: Infinity, repeatDelay: items.length * 0.55 + 1.55 }}
          >
            {item.label}
          </motion.span>
        </div>
      ))}
      <motion.div
        className="mt-0.5 inline-flex w-fit items-center gap-1.5 rounded-md border px-2 py-1"
        style={{ borderColor: `rgba(${rgb},.35)`, background: `rgba(${rgb},.08)` }}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: [0, 1, 1, 0], y: [4, 0, 0, 0] }}
        transition={{ delay: 0.6 + items.length * 0.55, duration: 0.4, repeat: Infinity, repeatDelay: 1.2 }}
      >
        <motion.span
          className="size-1.5 rounded-full"
          style={{ background: `rgba(${rgb},.9)` }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <span className="font-mono text-[8px] font-semibold" style={{ color: `rgba(${rgb},.9)` }}>
          SOLUTION READY
        </span>
      </motion.div>
    </div>
  );
}

function ModularGraphic({ tone }: { tone: Tone }) {
  const rgb = toneRgb[tone];
  const blocks = [
    { label: "SENSORS", x: 0, y: 0 },
    { label: "GATEWAY", x: 1, y: 0 },
    { label: "ANALYTICS", x: 0, y: 1 },
    { label: "DASHBOARD", x: 1, y: 1 },
  ];
  return (
    <div className="flex h-full w-full items-center justify-center p-5">
      <div className="grid grid-cols-2 gap-2 w-full">
        {blocks.map((b, i) => (
          <motion.div
            key={b.label}
            className="flex items-center justify-center rounded-lg border py-2.5"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.2, duration: 0.4, repeat: Infinity, repeatDelay: blocks.length * 0.2 + 2 }}
            style={{
              borderColor: `rgba(${rgb},.3)`,
              background: `rgba(${rgb},.07)`,
            }}
          >
            <span
              className="font-mono text-[8px] font-semibold tracking-wider"
              style={{ color: `rgba(${rgb},.8)` }}
            >
              {b.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function AiGraphic({ tone }: { tone: Tone }) {
  const rgb = toneRgb[tone];
  const pts = "M 8,28 L 24,26 L 40,24 L 56,22 L 68,32 L 76,38 L 84,24 L 96,18 L 112,16";
  const totalLen = 120;
  return (
    <div className="flex h-full w-full flex-col justify-center gap-1.5 px-5">
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-[8px] text-white/40">ANOMALY DETECTION</span>
        <motion.span
          className="font-mono text-[8px] font-semibold"
          style={{ color: `rgba(${rgb},.9)` }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, times: [0, 0.3, 0.85, 1], delay: 2 }}
        >
          ⚠ ANOMALY DETECTED
        </motion.span>
      </div>
      <svg viewBox="0 0 120 48" className="w-full" style={{ height: 48 }} aria-hidden>
        <defs>
          <linearGradient id="ai-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={`rgba(${rgb},.2)`} />
            <stop offset="100%" stopColor={`rgba(${rgb},0)`} />
          </linearGradient>
        </defs>
        <path d={`${pts} L 112,48 L 8,48 Z`} fill="url(#ai-fill)" />
        <motion.path
          d={pts}
          fill="none"
          stroke={`rgba(${rgb},.75)`}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray={totalLen}
          initial={{ strokeDashoffset: totalLen }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.5, ease: "easeOut" }}
        />
        <motion.circle
          cx="76"
          cy="38"
          r="4"
          fill="none"
          stroke={`rgba(${rgb},.85)`}
          strokeWidth="1.5"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 1, 0], scale: [0, 1.2, 1, 1] }}
          transition={{ duration: 1, delay: 1.8, repeat: Infinity, repeatDelay: 2.5 }}
        />
      </svg>
    </div>
  );
}

function SpeedGraphic({ tone }: { tone: Tone }) {
  const rgb = toneRgb[tone];
  const milestones = [
    { label: "W1", note: "POC" },
    { label: "W2", note: "" },
    { label: "W3", note: "" },
    { label: "W4", note: "PROD" },
  ];
  return (
    <div className="flex h-full w-full flex-col justify-center gap-3 px-6">
      <span className="font-mono text-[8px] text-white/40">DELIVERY TIMELINE</span>
      <div className="relative flex items-center justify-between">
        <div className="absolute left-0 right-0 h-[2px] bg-white/8" />
        <motion.div
          className="absolute left-0 h-[2px] rounded-full"
          style={{ background: `rgba(${rgb},.8)` }}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.5, ease: "easeOut" }}
        />
        {milestones.map((m, i) => (
          <motion.div
            key={m.label}
            className="relative flex flex-col items-center gap-1 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: (i / (milestones.length - 1)) * 2, duration: 0.3, repeat: Infinity, repeatDelay: 1.5 + 2 - (i / (milestones.length - 1)) * 2 }}
          >
            <div
              className="size-2.5 rounded-full"
              style={{ background: `rgba(${rgb},.9)` }}
            />
            <span className="font-mono text-[7px] text-white/55">{m.label}</span>
            {m.note && (
              <span
                className="font-mono text-[7px] font-bold"
                style={{ color: `rgba(${rgb},.85)` }}
              >
                {m.note}
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function PartnershipGraphic({ tone }: { tone: Tone }) {
  const rgb = toneRgb[tone];
  return (
    <div className="flex h-full w-full items-center justify-center px-6">
      <div className="relative flex w-full items-center justify-between">
        <motion.div
          className="flex flex-col items-center gap-1.5"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div
            className="flex size-10 items-center justify-center rounded-full border"
            style={{ borderColor: `rgba(${rgb},.4)`, background: `rgba(${rgb},.1)` }}
          >
            <span style={{ color: `rgba(${rgb},.9)`, fontSize: 16 }}>🏢</span>
          </div>
          <span className="font-mono text-[7px] text-white/45">YOU</span>
        </motion.div>

        <div className="relative flex-1 mx-3">
          <div className="h-[1px] w-full bg-white/10" />
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 -mt-1 size-2 rounded-full"
              style={{ background: `rgba(${rgb},.7)` }}
              initial={{ left: "0%", opacity: 0 }}
              animate={{ left: "100%", opacity: [0, 1, 1, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.55, ease: "easeInOut" }}
            />
          ))}
        </div>

        <motion.div
          className="flex flex-col items-center gap-1.5"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        >
          <div
            className="flex size-10 items-center justify-center rounded-full border"
            style={{ borderColor: `rgba(${rgb},.4)`, background: `rgba(${rgb},.1)` }}
          >
            <span style={{ color: `rgba(${rgb},.9)`, fontSize: 16 }}>⚙️</span>
          </div>
          <span className="font-mono text-[7px] text-white/45">ONEIOT</span>
        </motion.div>
      </div>
    </div>
  );
}

function DeployGraphic({ tone }: { tone: Tone }) {
  const rgb = toneRgb[tone];
  const options = ["CLOUD", "ON-PREM", "EDGE"];
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 px-5">
      <div className="flex w-full justify-between gap-2">
        {options.map((o, i) => (
          <motion.div
            key={o}
            className="flex flex-1 flex-col items-center justify-center gap-1 rounded-xl border py-3"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.25, duration: 0.4 }}
            style={{
              borderColor: `rgba(${rgb},.3)`,
              background: `rgba(${rgb},.07)`,
            }}
          >
            <motion.span
              className="size-1.5 rounded-full"
              style={{ background: `rgba(${rgb},.9)` }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.4 }}
            />
            <span
              className="font-mono text-[8px] font-semibold tracking-wider"
              style={{ color: `rgba(${rgb},.8)` }}
            >
              {o}
            </span>
          </motion.div>
        ))}
      </div>
      <motion.div
        className="font-mono text-[8px] text-white/35"
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        your infrastructure · your terms
      </motion.div>
    </div>
  );
}

type Pillar = {
  eyebrow: string;
  tone: Tone;
  title: string;
  body: string;
  metric: string;
  icon: React.ReactNode;
  graphic: React.ReactNode;
};

const pillars: Pillar[] = [
  {
    eyebrow: "BUILT FOR YOU",
    tone: "teal",
    title: "We understand your challenge first. Then we build.",
    body: "We don't lead with demos or feature lists. We lead with questions — what problem are you solving, what does success look like, what constraints are you working within. Only then do we design your solution.",
    metric: "Understand first · build second",
    graphic: <BuiltForYouGraphic tone="teal" />,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <circle cx="5" cy="12" r="2"/><circle cx="19" cy="5" r="2"/><circle cx="19" cy="19" r="2"/>
        <path d="M7 12l10-5M7 12l10 5"/>
      </svg>
    ),
  },
  {
    eyebrow: "MODULAR ARCHITECTURE",
    tone: "blue",
    title: "Assemble exactly what you need. Leave out what you don't.",
    body: "Independent, proven modules that snap together in any configuration. No forced features. No unnecessary complexity. No paying for capabilities that don't serve your operations.",
    metric: "70% faster development",
    graphic: <ModularGraphic tone="blue" />,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="3" y="3" width="7" height="5" rx="1"/><rect x="14" y="3" width="7" height="9" rx="1"/>
        <rect x="3" y="11" width="7" height="9" rx="1"/><rect x="14" y="16" width="7" height="4" rx="1"/>
      </svg>
    ),
  },
  {
    eyebrow: "AI BUILT IN",
    tone: "purple",
    title: "Predictive intelligence — available as a module, not a premium add-on.",
    body: "Anomaly detection, demand forecasting, and intelligent automation are built into the platform from day one. Configured for your use case, trained on your data, improving with every cycle.",
    metric: "↓ 40% unplanned downtime",
    graphic: <AiGraphic tone="purple" />,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M12 3l1.5 3.5L17 8l-3.5 1.5L12 13l-1.5-3.5L7 8l3.5-1.5z"/>
        <path d="M19 15l.75 1.75L21.5 17.5l-1.75.75L19 21l-.75-1.75L16.5 18.5l1.75-.75z"/>
      </svg>
    ),
  },
  {
    eyebrow: "WEEKS, NOT MONTHS",
    tone: "green",
    title: "Production-ready platforms, delivered fast — without cutting corners.",
    body: "Pre-wired templates for every vertical mean you're not starting from zero. A proof of concept is typically running in one week. Full production in under a month, with enterprise-grade quality from day one.",
    metric: "POC in 1 week",
    graphic: <SpeedGraphic tone="green" />,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
  },
  {
    eyebrow: "TRUE PARTNERSHIP",
    tone: "amber",
    title: "We co-create with your team. Your success is how we measure ours.",
    body: "We don't view engagements as transactions. We are partners invested in your outcomes — present through implementation, available as you scale, and accountable to the results you achieve.",
    metric: "Co-create · co-succeed",
    graphic: <PartnershipGraphic tone="amber" />,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    eyebrow: "DEPLOY YOUR WAY",
    tone: "teal",
    title: "Cloud, on-premise, hybrid, or edge — your infrastructure, your terms.",
    body: "Your data stays where it needs to be. We configure the platform around your deployment model — not the other way around — whether that means a fully managed cloud or an air-gapped on-premise environment.",
    metric: "Cloud · on-prem · edge",
    graphic: <DeployGraphic tone="teal" />,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
      </svg>
    ),
  },
];

export function WhyOneIoT() {
  return (
    <section className="section-divide relative overflow-hidden bg-dot-grid">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-20">
        <FadeUp>
          <span className="label-mono text-accent-teal">WHY ONEIOT</span>
          <h2 className="mt-3 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
            Technology that solves your challenges —{" "}
            <span className="text-brand">not creates new ones.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Other vendors push prebuilt products and ask you to adapt. We start by understanding your specific challenge, then assemble exactly what you need — and nothing more. No templates, no compromises, no paying for features you'll never use.
          </p>
        </FadeUp>

        <div className="mt-12 rounded-2xl border border-border bg-surface p-3 shadow-sm">
          <Stagger className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p) => (
              <StaggerItem key={p.eyebrow}>
                <SpotlightCard
                  tone={p.tone}
                  className="relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-background"
                >
                  <div
                    className="relative h-28 w-full overflow-hidden"
                    style={{
                      background: `radial-gradient(ellipse 100% 120% at 50% 110%, rgba(${toneRgb[p.tone]},.08), transparent 65%)`,
                    }}
                  >
                    <div
                      className="absolute inset-x-0 top-0 h-[2px]"
                      style={{
                        background: `linear-gradient(90deg, rgba(${toneRgb[p.tone]},.8) 0%, rgba(${toneRgb[p.tone]},0) 80%)`,
                      }}
                    />
                    {p.graphic}
                  </div>

                  <div className="flex flex-1 flex-col px-4 pb-4">
                    <div className="mb-2 flex items-center gap-2">
                      <div
                        className={cn(
                          "inline-flex shrink-0 items-center justify-center rounded-lg border p-1.5",
                          toneBorder[p.tone],
                          toneText[p.tone],
                        )}
                        style={{ background: `rgba(${toneRgb[p.tone]},.1)` }}
                      >
                        {p.icon}
                      </div>
                      <h4 className="text-sm font-semibold leading-tight tracking-tight">
                        {p.title}
                      </h4>
                    </div>

                    <span className={cn("mb-1 font-mono text-[9px] uppercase tracking-widest", toneText[p.tone])}>
                      {p.eyebrow}
                    </span>

                    <p className="flex-1 text-[11px] leading-relaxed text-muted-foreground">
                      {p.body}
                    </p>

                    <div className="mt-3 inline-flex w-fit items-center gap-2 rounded-md border border-border bg-surface px-2 py-1 font-mono text-[10px] text-foreground">
                      <span className={cn("size-1.5 rounded-full", toneBg[p.tone])} />
                      {p.metric}
                    </div>
                  </div>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
