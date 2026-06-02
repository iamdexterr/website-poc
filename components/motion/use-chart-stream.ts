"use client";

import { useEffect, useRef, useState } from "react";

type Options = {
  /** Initial buffer of values — newest LAST. Stays the same on SSR. */
  seed: number[];
  /** Returns the next value (called every interval on the client). */
  next: () => number;
  /** Max number of points held in the buffer. */
  cap?: number;
  /** Milliseconds between additions. */
  intervalMs?: number;
};

/**
 * Drives a sliding chart buffer. Identical SSR/CSR initial paint via seed,
 * then on the client appends a new point every `intervalMs` and drops the
 * oldest. Pauses while the tab is hidden so it doesn't spin in background.
 */
export function useChartStream({
  seed,
  next,
  cap = 30,
  intervalMs = 800,
}: Options): number[] {
  const [buffer, setBuffer] = useState<number[]>(seed);
  const nextRef = useRef(next);

  useEffect(() => {
    nextRef.current = next;
  }, [next]);

  useEffect(() => {
    let visible = typeof document !== "undefined" ? !document.hidden : true;
    let tick: ReturnType<typeof setInterval> | null = null;

    const start = () => {
      if (tick) return;
      tick = setInterval(() => {
        setBuffer((prev) => {
          const nextPoint = nextRef.current();
          const merged = [...prev, nextPoint];
          return merged.length > cap ? merged.slice(merged.length - cap) : merged;
        });
      }, intervalMs);
    };

    const stop = () => {
      if (tick) {
        clearInterval(tick);
        tick = null;
      }
    };

    const onVisibility = () => {
      visible = !document.hidden;
      if (visible) start();
      else stop();
    };

    if (visible) start();
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [cap, intervalMs]);

  return buffer;
}
