"use client";

import { motion } from "motion/react";

type Node = { label: string; tone?: string };

const innerNodes: Node[] = [
  { label: "Sensors" },
  { label: "Gateway" },
  { label: "Climate" },
  { label: "Tracking" },
];

const outerNodes: Node[] = [
  { label: "Cities" },
  { label: "Analytics" },
  { label: "Alerts" },
  { label: "Automation" },
];

function nodeStyle(i: number, count: number, radius: number) {
  const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
  return {
    left: `calc(50% + ${Math.cos(angle) * radius}px)`,
    top: `calc(50% + ${Math.sin(angle) * radius}px)`,
  };
}

function OrbitRing({
  radius,
  duration,
  reverse = false,
  nodes,
  size = 110,
}: {
  radius: number;
  duration: number;
  reverse?: boolean;
  nodes: Node[];
  size?: number;
}) {
  return (
    <>
      {/* the ring itself */}
      <div
        className="pointer-events-none absolute rounded-full border border-dashed border-border"
        style={{
          width: radius * 2,
          height: radius * 2,
          left: `calc(50% - ${radius}px)`,
          top: `calc(50% - ${radius}px)`,
        }}
      />
      {/* rotating container — nodes counter-rotate to stay upright */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{ rotate: reverse ? -360 : 360 }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        {nodes.map((n, i) => (
          <motion.div
            key={n.label}
            className="absolute"
            style={{
              ...nodeStyle(i, nodes.length, radius),
              transform: "translate(-50%, -50%)",
            }}
            animate={{ rotate: reverse ? 360 : -360 }}
            transition={{ duration, repeat: Infinity, ease: "linear" }}
          >
            <div
              className="flex items-center justify-center rounded-xl border border-border-strong bg-surface px-3 py-2 text-xs font-medium text-foreground shadow-[0_8px_24px_-12px_rgba(0,0,0,0.6)] backdrop-blur"
              style={{ minWidth: size }}
            >
              <span className="mr-1.5 size-1.5 rounded-full bg-brand" />
              {n.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}

export function OrbitMesh() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px]">
      {/* subtle radial glow behind core */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, oklch(0.82 0.14 180 / 0.18) 0%, transparent 55%)",
        }}
      />

      <OrbitRing radius={120} duration={28} nodes={innerNodes} />
      <OrbitRing radius={220} duration={48} reverse nodes={outerNodes} />

      {/* central core */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          <div className="absolute inset-0 animate-pulse-dot rounded-full bg-brand/30 blur-2xl" />
          <div className="relative flex size-32 flex-col items-center justify-center rounded-full border border-brand/40 bg-surface text-center">
            <div className="label-mono text-[10px] text-brand">ONEIOT</div>
            <div className="text-xs font-semibold text-foreground">AI CORE</div>
            <div className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground">
              <span className="size-1 animate-pulse-dot rounded-full bg-accent-green" />
              live
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
