"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { IndustryPhotoCard } from "@/components/mockups/real/industry-photo-card";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { cn } from "@/lib/utils";

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
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-28">
        <div className="max-w-3xl">
          <span className="label-mono text-accent-teal">SOLUTIONS</span>
          <h2 className="mt-4 text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
            Three domains. One platform.{" "}
            <span className="text-brand">Your solution.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Same modular platform. Different assembly for every challenge.
          </p>
        </div>

        <div
          className="relative mt-12"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative h-96 overflow-hidden">
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

        <div className="mt-20">
          <span className="label-mono text-accent-teal">
            EVERY SOLUTION INCLUDES
          </span>
          <h3 className="mt-4 max-w-3xl text-2xl font-semibold tracking-tight md:text-3xl">
            The four strengths that ship with every deployment.
          </h3>

          <ul className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
            {strengths.map((s) => (
              <li key={s.title}>
                <SpotlightCard
                  tone={s.tone}
                  className="flex h-full flex-col bg-surface p-7"
                >
                  <span className={cn("label-mono", toneText[s.tone])}>
                    {s.eyebrow}
                  </span>
                  <h4 className="mt-4 text-lg font-semibold leading-tight tracking-tight">
                    {s.title}
                  </h4>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {s.body}
                  </p>
                  <div className="mt-6 inline-flex w-fit items-center gap-2 rounded-md border border-border bg-background/60 px-2.5 py-1.5 font-mono text-xs text-foreground">
                    <span className={cn("size-1.5 rounded-full", toneBg[s.tone])} />
                    {s.metric}
                  </div>
                </SpotlightCard>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
