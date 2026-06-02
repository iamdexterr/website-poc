"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts from 0 to `to` once the element enters the viewport.
 * Pass a suffix (e.g. "+", "%", "K+") and the formatter handles
 * thousands separators. SSR-safe — initial render shows the final
 * value to avoid hydration mismatch + layout shift.
 */
export function AnimatedCounter({
  to,
  suffix = "",
  duration = 1.2,
  decimals = 0,
  className,
}: {
  to: number;
  suffix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
}) {
  const [mounted, setMounted] = useState(false);
  const [value, setValue] = useState(to);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    setMounted(true);
    setValue(0);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const t = Math.min((now - start) / (duration * 1000), 1);
              // ease-out cubic
              const eased = 1 - Math.pow(1 - t, 3);
              setValue(eased * to);
              if (t < 1) requestAnimationFrame(tick);
              else setValue(to);
            };
            requestAnimationFrame(tick);
          }
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [mounted, to, duration]);

  const formatted =
    decimals > 0
      ? value.toFixed(decimals)
      : Math.round(value).toLocaleString("en-US");

  return (
    <span ref={ref} className={className}>
      {formatted}
      {suffix}
    </span>
  );
}
