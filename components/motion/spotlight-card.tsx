"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Wraps any block in a card that paints a soft radial gradient
 * following the cursor on hover. Used by Linear, Resend, Vercel.
 *
 * Props are kept minimal — pass `as` to render a different element
 * (e.g. `as="article"`), and `tone` to swap the spotlight color.
 */
export function SpotlightCard({
  children,
  className,
  tone = "brand",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "brand" | "teal" | "purple" | "green" | "blue" | "amber";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [active, setActive] = useState(false);

  const toneVar: Record<NonNullable<typeof tone>, string> = {
    brand: "var(--brand)",
    teal: "var(--accent-teal)",
    purple: "var(--accent-purple)",
    green: "var(--accent-green)",
    blue: "var(--accent-blue)",
    amber: "var(--accent-amber)",
  };

  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className={cn("group relative overflow-hidden", className)}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(420px circle at ${pos.x}px ${pos.y}px, ${toneVar[tone]}1c, transparent 60%)`,
          opacity: active ? 1 : 0,
        }}
      />
      {children}
    </div>
  );
}
