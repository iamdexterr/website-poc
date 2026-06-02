"use client";

import { useEffect, useRef, useState } from "react";

export type StreamEntry<T> = { id: string; data: T };

type Options<T> = {
  /** Initial entries — newest first. Stay rendered on SSR. */
  seed: T[];
  /** Generator for the next entry (called every interval on the client). */
  next: () => T;
  /** Max number of entries to keep. Older ones drop off. */
  cap?: number;
  /** Milliseconds between additions. */
  intervalMs?: number;
};

/**
 * Drives a live-tail style log stream: starts with the SSR seed, then on
 * the client adds a new entry every `intervalMs`, keeping at most `cap`
 * entries. Each entry has a stable id so AnimatePresence can animate
 * adds + removes. Pauses while the tab is hidden.
 */
export function useLogStream<T>({
  seed,
  next,
  cap = 8,
  intervalMs = 1800,
}: Options<T>): StreamEntry<T>[] {
  // Seed entries get stable ids based on their index so server and client
  // render the same first paint.
  const seedEntries: StreamEntry<T>[] = seed.map((data, i) => ({
    id: `seed-${i}`,
    data,
  }));

  const [entries, setEntries] = useState<StreamEntry<T>[]>(seedEntries);
  const counterRef = useRef(0);
  const nextRef = useRef(next);

  // Keep latest `next` callback without re-triggering the interval
  useEffect(() => {
    nextRef.current = next;
  }, [next]);

  useEffect(() => {
    let visible =
      typeof document !== "undefined" ? !document.hidden : true;
    let tick: ReturnType<typeof setInterval> | null = null;

    const start = () => {
      if (tick) return;
      tick = setInterval(() => {
        counterRef.current += 1;
        const id = `live-${counterRef.current}`;
        setEntries((prev) =>
          [{ id, data: nextRef.current() }, ...prev].slice(0, cap),
        );
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

  return entries;
}
