"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef } from "react";

// OneIoT content from the provided markdown
const bentoItems = [
  {
    title: "Built Exactly for You",
    description: "We understand your challenge first. Then we build — no templates, no compromises.",
    className: "md:col-span-2",
    icon: "🎯",
    type: "git-flow"
  },
  {
    title: "Modular Architecture",
    description: "Independent, proven modules. Plug together what you need.",
    className: "md:col-span-1",
    icon: "🧩",
    type: "workflow"
  },
  {
    title: "AI Built In",
    description: "Predictive analytics, automated alerts, intelligent workflows — available as modules.",
    className: "md:col-span-1",
    icon: "🤖",
    type: "analytics"
  },
  {
    title: "Weeks, Not Months",
    description: "Fully customized platforms — deployed fast without cutting corners.",
    className: "md:col-span-1",
    icon: "⚡",
    type: "globe"
  },
  {
    title: "True Partnership",
    description: "We co-create with your team. Your success is how we measure ours.",
    className: "md:col-span-2",
    icon: "🤝",
    type: "dashboard"
  }
];

const BentoGrid = ({
  className,
  children
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[21rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

const BentoGridItem = ({
  className,
  title,
  description,
  icon,
  type
}: {
  className?: string;
  title?: string;
  description?: string;
  icon?: string;
  type?: string;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
  };

  const backgroundX = useSpring(useTransform(mouseX, [0, 400], [-50, 50]), {
    stiffness: 300,
    damping: 30
  });
  const backgroundY = useSpring(useTransform(mouseY, [0, 400], [-50, 50]), {
    stiffness: 300,
    damping: 30
  });

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cn(
        "group/bento relative row-span-1 rounded-3xl overflow-hidden transition-all duration-300",
        "bg-[--surface] hover:bg-[--surface-elevated]",
        "border border-[--border-strong]/50 hover:border-[--border-strong]",
        className
      )}
    >
      {/* Animated gradient background on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover/bento:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(59, 130, 246, 0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative flex flex-col h-full p-6">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center gap-3 mb-3">
            {icon && (
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-2xl shadow-lg">
                {icon}
              </div>
            )}
            <h3 className="text-xl font-semibold text-[--foreground]">
              {title}
            </h3>
          </div>
          <p className="text-sm text-[--muted-foreground] leading-relaxed">
            {description}
          </p>
        </div>

        {/* Type-specific content */}
        {type === "git-flow" && (
          <div className="mt-auto">
            <div className="bg-[--surface-elevated] rounded-2xl p-4 space-y-3 border border-[--border-strong]/30">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[--background] border border-[--border-strong]/30 flex items-center justify-center">
                  <code className="text-xs font-mono text-[--foreground]">git add.</code>
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-[--border-strong] to-transparent" />
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[--background] border border-[--border-strong]/30 flex items-center justify-center">
                  <code className="text-xs font-mono text-[--foreground]">commit</code>
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-[--border-strong] to-transparent" />
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                  <span className="text-xs font-bold text-white">push</span>
                </div>
                <div className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-medium border border-green-500/20">
                  your site is live ✨
                </div>
              </div>
            </div>
          </div>
        )}

        {type === "globe" && (
          <div className="mt-auto">
            <div className="relative w-full aspect-video bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900 rounded-2xl overflow-hidden shadow-lg border border-[--border-strong]/30">
              {/* Animated dots */}
              <div className="absolute inset-0">
                {[...Array(16)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-blue-300 rounded-full"
                    style={{
                      left: `${15 + Math.random() * 70}%`,
                      top: `${15 + Math.random() * 70}%`,
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </div>
              {/* Center text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">100K+</div>
                  <div className="text-sm text-blue-200">Devices</div>
                </div>
              </div>
              {/* Grid overlay */}
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <defs>
                    <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100" height="100" fill="url(#smallGrid)" />
                </svg>
              </div>
            </div>
          </div>
        )}

        {type === "workflow" && (
          <div className="mt-auto">
            <div className="flex gap-2">
              <div className="flex-1 h-24 bg-[--surface-elevated] rounded-xl p-3 flex flex-col justify-between border border-[--border-strong]/30">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <span className="text-blue-400 text-lg">📊</span>
                </div>
                <div className="space-y-1">
                  <div className="h-1.5 bg-[--background] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: "75%" }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                  <div className="h-1.5 bg-[--background] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: "50%" }}
                      transition={{ duration: 1, delay: 0.2 }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex-1 h-24 bg-[--surface-elevated] rounded-xl p-3 flex flex-col justify-between border border-[--border-strong]/30">
                <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <span className="text-green-400 text-lg">📈</span>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[--foreground]">40%</div>
                  <div className="text-xs text-[--muted-foreground]">Less Downtime</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {type === "analytics" && (
          <div className="mt-auto">
            <div className="bg-[--surface-elevated] rounded-2xl p-4 border border-[--border-strong]/30">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-[--muted-foreground]">Analytics</span>
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                  <div className="w-2 h-2 rounded-full bg-pink-500" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[--muted-foreground]">Predictive</span>
                  <span className="text-xs font-semibold text-[--foreground]">60%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[--muted-foreground]">Automated</span>
                  <span className="text-xs font-semibold text-[--foreground]">60%</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {type === "dashboard" && (
          <div className="mt-auto">
            <div className="bg-[--surface-elevated] rounded-2xl p-4 border border-[--border-strong]/30">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-full bg-[--background] flex items-center justify-center border border-[--border-strong]/30">
                  <span className="text-[--foreground] text-xs font-bold">n</span>
                </div>
                <span className="text-xs font-medium text-[--muted-foreground]">Dashboard</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-xl font-bold text-[--foreground]">99.99%</span>
                  <span className="text-xs text-[--muted-foreground]">Uptime</span>
                </div>
                <div className="h-16 bg-gradient-to-t from-blue-500/10 to-transparent rounded-lg relative overflow-hidden border border-[--border-strong]/20">
                  <svg className="absolute bottom-0 left-0 right-0" viewBox="0 0 100 50" preserveAspectRatio="none">
                    <path
                      d="M0 50 L10 45 L20 48 L30 35 L40 40 L50 30 L60 35 L70 25 L80 30 L90 20 L100 25 L100 50 Z"
                      fill="rgba(59, 130, 246, 0.3)"
                      stroke="rgba(59, 130, 246, 0.8)"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Border gradient on hover */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover/bento:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10" />
      </div>
    </div>
  );
};

export function BentoShowcase() {
  return (
    <section className="py-24 px-4 bg-[--background]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[--foreground] mb-4">
            Deployments Made Easy
          </h2>
          <p className="text-lg text-[--muted-foreground] max-w-2xl mx-auto">
            Deploy with ease, leave complexities to us.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <BentoGrid>
          {bentoItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1
              }}
            >
              <BentoGridItem
                title={item.title}
                description={item.description}
                className={item.className}
                icon={item.icon}
                type={item.type}
              />
            </motion.div>
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
