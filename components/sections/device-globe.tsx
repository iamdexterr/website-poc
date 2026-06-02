"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { geoOrthographic, geoPath, geoGraticule } from "d3-geo";
import { feature } from "topojson-client";
import type { FeatureCollection, Geometry } from "geojson";
import type { Topology } from "topojson-specification";

// Approx device hotspots — [lon, lat, label]
const sites: Array<{ coords: [number, number]; label: string }> = [
  { coords: [78.4867, 17.385], label: "Hyderabad" }, // HQ
  { coords: [55.2708, 25.2048], label: "Dubai" },
  { coords: [-0.1276, 51.5074], label: "London" },
  { coords: [-74.006, 40.7128], label: "New York" },
  { coords: [103.8198, 1.3521], label: "Singapore" },
  { coords: [139.6917, 35.6895], label: "Tokyo" },
  { coords: [151.2093, -33.8688], label: "Sydney" },
];

type WorldTopology = Topology<{
  countries: { type: "GeometryCollection"; geometries: Geometry[] };
}>;

export function DeviceGlobe({ size = 480 }: { size?: number }) {
  const [world, setWorld] = useState<FeatureCollection | null>(null);
  const [mounted, setMounted] = useState(false);
  const [rotation, setRotation] = useState<[number, number, number]>([
    -78, -20, 0,
  ]);
  const rafRef = useRef<number | null>(null);

  // Mark mounted on client — ensures SSR/CSR initial render matches
  useEffect(() => {
    setMounted(true);
  }, []);

  // Load world atlas once on mount
  useEffect(() => {
    let cancelled = false;
    fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
      .then((r) => r.json() as Promise<WorldTopology>)
      .then((topo) => {
        if (cancelled) return;
        const fc = feature(
          topo,
          topo.objects.countries,
        ) as unknown as FeatureCollection;
        setWorld(fc);
      })
      .catch(() => {
        // network failure — globe will just show graticule + dots
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Slow auto-rotate — only after mount so SSR HTML stays deterministic
  useEffect(() => {
    if (!mounted) return;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      setRotation(([lon, lat, roll]) => [lon + dt * 8, lat, roll]);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [mounted]);

  const projection = useMemo(() => {
    return geoOrthographic()
      .scale(size / 2 - 10)
      .translate([size / 2, size / 2])
      .rotate(rotation)
      .clipAngle(90);
  }, [size, rotation]);

  const path = useMemo(() => geoPath(projection), [projection]);
  const graticule = useMemo(() => geoGraticule().step([20, 20])(), []);
  const graticulePath = path(graticule) ?? "";

  // Project sites — null if on far side. Round to 2dp so SSR + CSR produce
  // identical attribute strings (otherwise float precision differs).
  const sitePoints = sites.map((s) => {
    const projected = projection(s.coords);
    return {
      ...s,
      projected: projected
        ? ([+projected[0].toFixed(2), +projected[1].toFixed(2)] as [
            number,
            number,
          ])
        : null,
    };
  });

  // Render only after mount — SVG attribute precision differs between
  // Node and browser floating-point; client-only render sidesteps it.
  if (!mounted) {
    return (
      <div
        className="relative mx-auto rounded-full border border-border bg-surface"
        style={{ width: size, height: size }}
        aria-hidden
      />
    );
  }

  return (
    <div className="relative mx-auto" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="overflow-visible"
      >
        {/* Globe sphere */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - 10}
          fill="var(--surface)"
          stroke="var(--border-strong)"
          strokeWidth="1"
        />
        {/* Graticule */}
        <path
          d={graticulePath}
          fill="none"
          stroke="var(--border)"
          strokeWidth="0.5"
        />
        {/* Countries */}
        {world?.features.map((f, i) => {
          const d = path(f);
          if (!d) return null;
          return (
            <path
              key={i}
              d={d}
              fill="oklch(0.22 0 0)"
              stroke="var(--border-strong)"
              strokeWidth="0.4"
            />
          );
        })}
        {/* Device dots */}
        {sitePoints.map(
          (s) =>
            s.projected && (
              <g key={s.label}>
                <circle
                  cx={s.projected[0]}
                  cy={s.projected[1]}
                  r="6"
                  fill="var(--brand)"
                  opacity="0.25"
                >
                  <animate
                    attributeName="r"
                    values="3;10;3"
                    dur="2.4s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.6;0;0.6"
                    dur="2.4s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle
                  cx={s.projected[0]}
                  cy={s.projected[1]}
                  r="2.5"
                  fill="var(--brand)"
                />
              </g>
            ),
        )}
      </svg>
      {/* HQ pin label */}
      <div className="absolute bottom-2 right-2 flex items-center gap-2 rounded-md border border-border-strong bg-surface/90 px-2.5 py-1.5 backdrop-blur">
        <span className="size-1.5 animate-pulse-dot rounded-full bg-brand" />
        <span className="label-mono text-brand">HQ · HYDERABAD</span>
      </div>
    </div>
  );
}
