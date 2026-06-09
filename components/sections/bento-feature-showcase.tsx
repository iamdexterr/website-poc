"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type CardLayout =
  | "image-only"
  | "image-overlay"
  | "image-text"
  | "text-image"
  | "text-only"
  | "metric"
  | "custom";

interface CardConfig {
  layout?: CardLayout;
  title?: string;
  description?: string;
  badge?: string;
  image?: string;
  video?: string;
  imageAlt?: string;
  imageOpacity?: number;
  accentColor?: string;
  metric?: string;
  unit?: string;
  metricLabel?: string;
  children?: ReactNode;
}

interface BentoCardProps extends CardConfig {
  gridPos?: string;
  className?: string;
  staggerDelay?: number;
}

const GRID_POSITIONS: string[] = [
  "lg:col-start-1 lg:row-start-1 lg:row-span-2",
  "lg:col-start-2 lg:col-span-2 lg:row-start-1",
  "lg:col-start-4 lg:row-start-1",
  "lg:col-start-5 lg:row-start-1",
  "lg:col-start-2 lg:row-start-2",
  "lg:col-start-3 lg:col-span-2 lg:row-start-2",
  "lg:col-start-5 lg:row-start-2",
];

function CardMedia({
  src,
  video,
  alt,
  opacity = 0.9,
  className,
}: {
  src?: string;
  video?: string;
  alt: string;
  opacity?: number;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {video ? (
        <video
          src={video}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out will-change-transform group-hover:scale-[1.05] group-hover:-translate-y-1"
          style={{ opacity }}
        />
      ) : src ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-all duration-700 ease-out will-change-transform group-hover:scale-[1.06] group-hover:-translate-y-1"
          style={{ opacity }}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-transparent" />
      )}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-surface to-transparent transition-opacity duration-500 group-hover:opacity-50" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-surface/50 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-surface/40 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-surface/40 to-transparent" />
    </div>
  );
}

function CardMediaOverlay({
  src,
  video,
  alt,
  opacity = 0.88,
  title,
  description,
  badge,
  accentColor,
}: {
  src?: string;
  video?: string;
  alt: string;
  opacity?: number;
  title?: string;
  description?: string;
  badge?: string;
  accentColor: string;
}) {
  return (
    <div className="relative flex-1 overflow-hidden">
      {video ? (
        <video
          src={video}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out will-change-transform group-hover:scale-[1.05] group-hover:-translate-y-1"
          style={{ opacity }}
        />
      ) : src ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-all duration-700 ease-out will-change-transform group-hover:scale-[1.07] group-hover:-translate-y-1"
          style={{ opacity }}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent" />
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent transition-opacity duration-500 group-hover:from-black/60" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-surface/70 to-transparent" />
      {(title || description || badge) && (
        <div className="absolute inset-x-0 bottom-0 p-5">
          {badge && (
            <span
              className="mb-2 block font-mono text-[9px] uppercase tracking-[0.18em]"
              style={{ color: `rgba(${accentColor},.8)` }}
            >
              {badge}
            </span>
          )}
          {title && (
            <h3 className="text-[15px] font-semibold leading-snug tracking-tight text-white drop-shadow-sm">
              {title}
            </h3>
          )}
          {description && (
            <p className="mt-1 text-[11px] leading-relaxed text-white/60">
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export function BentoCard({
  layout = "text-only",
  title,
  description,
  badge,
  image,
  video,
  imageAlt = "",
  imageOpacity = 0.88,
  accentColor = "2,161,147",
  metric,
  unit,
  metricLabel,
  children,
  gridPos,
  className,
  staggerDelay = 0,
}: BentoCardProps) {
  return (
    <motion.div
      className={cn(
        "group relative flex h-[240px] flex-col overflow-hidden rounded-[32px] border border-border bg-surface lg:h-auto",
        gridPos,
        className,
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.52, delay: staggerDelay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } }}
      style={{ boxShadow: `0 6px 36px -10px rgba(${accentColor},.1)` }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px"
        style={{ background: `linear-gradient(90deg, rgba(${accentColor},.65) 0%, rgba(${accentColor},0) 55%)` }}
      />

      {layout === "image-only" && (
        <CardMedia
          src={image}
          video={video}
          alt={imageAlt}
          opacity={imageOpacity}
          className="flex-1"
        />
      )}

      {layout === "image-overlay" && (
        <CardMediaOverlay
          src={image}
          video={video}
          alt={imageAlt}
          opacity={imageOpacity}
          title={title}
          description={description}
          badge={badge}
          accentColor={accentColor}
        />
      )}

      {layout === "image-text" && (
        <>
          <CardMedia
            src={image}
            video={video}
            alt={imageAlt}
            opacity={imageOpacity}
            className="flex-1"
          />
          <div className="shrink-0 p-5 pt-3">
            {badge && (
              <span
                className="mb-1.5 block font-mono text-[9px] uppercase tracking-[0.18em]"
                style={{ color: `rgba(${accentColor},.7)` }}
              >
                {badge}
              </span>
            )}
            {title && (
              <h3 className="text-[13.5px] font-semibold leading-snug tracking-tight text-foreground">
                {title}
              </h3>
            )}
            {description && (
              <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                {description}
              </p>
            )}
          </div>
        </>
      )}

      {layout === "text-image" && (
        <>
          <div className="shrink-0 p-5 pb-3">
            {badge && (
              <span
                className="mb-1.5 block font-mono text-[9px] uppercase tracking-[0.18em]"
                style={{ color: `rgba(${accentColor},.7)` }}
              >
                {badge}
              </span>
            )}
            {title && (
              <h3 className="text-[13.5px] font-semibold leading-snug tracking-tight text-foreground">
                {title}
              </h3>
            )}
            {description && (
              <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                {description}
              </p>
            )}
          </div>
          <CardMedia
            src={image}
            video={video}
            alt={imageAlt}
            opacity={imageOpacity}
            className="flex-1"
          />
        </>
      )}

      {layout === "text-only" && (
        <div className="flex flex-1 flex-col justify-between p-6">
          <div>
            {badge && (
              <span
                className="mb-3 block font-mono text-[9px] uppercase tracking-[0.18em]"
                style={{ color: `rgba(${accentColor},.7)` }}
              >
                {badge}
              </span>
            )}
            {title && (
              <h3 className="text-[14px] font-semibold leading-snug tracking-tight text-foreground">
                {title}
              </h3>
            )}
            {description && (
              <p className="mt-2 text-[11.5px] leading-relaxed text-muted-foreground">
                {description}
              </p>
            )}
          </div>
          <div className="h-px w-8 rounded-full" style={{ background: `rgba(${accentColor},.3)` }} />
        </div>
      )}

      {layout === "metric" && (
        <div className="flex flex-1 flex-col justify-center p-6">
          {badge && (
            <span
              className="mb-3 block font-mono text-[9px] uppercase tracking-[0.18em]"
              style={{ color: `rgba(${accentColor},.6)` }}
            >
              {badge}
            </span>
          )}
          <div className="flex items-baseline gap-1 leading-none">
            <span className="font-mono text-[2.6rem] font-bold tracking-tighter text-foreground">
              {metric}
            </span>
            {unit && (
              <span
                className="font-mono text-xl font-semibold"
                style={{ color: `rgba(${accentColor},.85)` }}
              >
                {unit}
              </span>
            )}
          </div>
          {metricLabel && (
            <p className="mt-2 text-[12px] text-muted-foreground">{metricLabel}</p>
          )}
          <div
            className="mt-4 h-[2px] w-10 rounded-full opacity-60"
            style={{ background: `rgba(${accentColor},1)` }}
          />
        </div>
      )}

      {layout === "custom" && <>{children}</>}
    </motion.div>
  );
}

export function BentoImageCard(props: Omit<BentoCardProps, "layout">) {
  return <BentoCard {...props} layout="image-only" />;
}

export function BentoMetricCard(props: Omit<BentoCardProps, "layout">) {
  return <BentoCard {...props} layout="metric" />;
}

export function BentoFeatureCard(props: Omit<BentoCardProps, "layout">) {
  return <BentoCard {...props} layout="image-overlay" />;
}

export function BentoTextCard(props: Omit<BentoCardProps, "layout">) {
  return <BentoCard {...props} layout="text-only" />;
}

const DEFAULT_CARDS: CardConfig[] = [
  {
    layout: "image-overlay",
    title: "Real-Time Monitoring",
    description: "Live visibility across every device, sensor, and asset in your network.",
    badge: "Core Platform",
    image: "/MonitoringDashboard.jpg",
    imageAlt: "Real-time IoT monitoring dashboard",
    accentColor: "2,161,147",
  },
  {
    layout: "text-image",
    title: "Unified Device Management",
    description: "Connect via MQTT, HTTP, CoAP, LoRaWAN, and NB-IoT. Provision, group, and OTA-update thousands of devices from one interface.",
    badge: "Device Layer",
    image: "/UnifiedDeviceManagement.jpeg",
    imageAlt: "Unified device management interface",
    accentColor: "59,130,246",
  },
  {
    layout: "metric",
    metric: "99.9",
    unit: "%",
    metricLabel: "Platform Uptime",
    badge: "Reliability",
    accentColor: "245,158,11",
  },
  {
    layout: "image-overlay",
    title: "Advanced Alerting",
    description: "SMS, email, Slack, Teams, and more.",
    badge: "Notifications",
    image: "/alerting.jpg",
    imageAlt: "Advanced alerting and notification system",
    accentColor: "245,158,11",
  },
  {
    layout: "image-overlay",
    title: "Incident Management",
    description: "Detect, escalate, and resolve incidents automatically.",
    badge: "Operations",
    video: "/IncidentsManagement.mp4",
    imageAlt: "Incident management workflow",
    accentColor: "139,92,246",
  },
  {
    layout: "image-text",
    title: "AI-Powered Insights",
    description: "Predictive maintenance, anomaly detection, and intelligent automation — built into every data stream.",
    badge: "Intelligence",
    image: "/PredictiveAI.jpg",
    imageAlt: "AI-powered IoT analytics",
    accentColor: "139,92,246",
  },
  {
    layout: "image-only",
    video: "/smartHome.mp4",
    imageAlt: "Smart home IoT automation",
    accentColor: "52,211,153",
  },
];

interface BentoFeatureShowcaseProps {
  cards?: CardConfig[];
  heading?: ReactNode;
  subheading?: string;
  eyebrow?: string;
}

export function BentoFeatureShowcase({
  cards = DEFAULT_CARDS,
  heading = (
    <>
      Transform Your IoT Experience{" "}
      <span className="text-brand">with OneIoT.</span>
    </>
  ),
  subheading = "From factory floors to smart buildings — OneIoT connects, monitors, and automates your entire operation.",
  eyebrow = "Platform Overview",
}: BentoFeatureShowcaseProps) {
  return (
    <section className="section-divide bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-24">
        <div className="mb-12 flex flex-col gap-4 md:mb-16">
          <span className="label-mono text-accent-teal">{eyebrow}</span>
          <h2 className="max-w-2xl text-4xl font-semibold leading-[1.06] tracking-tight md:text-5xl lg:text-[3.2rem]">
            {heading}
          </h2>
          <p className="max-w-[32rem] text-base leading-relaxed text-muted-foreground">
            {subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-5 lg:grid-rows-[320px_220px]">
          {cards.slice(0, 7).map((card, i) => (
            <BentoCard
              key={i}
              {...card}
              gridPos={GRID_POSITIONS[i]}
              staggerDelay={i * 0.055}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
