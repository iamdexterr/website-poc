"use client";

import { useEffect, useState } from "react";

/**
 * Thin teal bar that fills horizontally as the user scrolls the page.
 * Anchored to the bottom of whatever parent contains it (typically the
 * sticky header).
 */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="absolute inset-x-0 -bottom-px h-0.5 bg-transparent">
      <div
        className="h-full bg-linear-to-r from-accent-teal via-brand to-accent-purple transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
