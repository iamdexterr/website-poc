import Image from "next/image";
import { cn } from "@/lib/utils";

export type IndustryPhotoCardProps = {
  className?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  metricValue?: string;
  metricLabel?: string;
  ctaLabel?: string;
  ctaHref?: string;
  image?: string;
  tone?: "teal" | "green" | "amber" | "purple" | "blue";
};

const toneClass: Record<NonNullable<IndustryPhotoCardProps["tone"]>, string> = {
  teal: "border-accent-teal/30 text-accent-teal bg-accent-teal/10",
  green: "border-accent-green/30 text-accent-green bg-accent-green/10",
  amber: "border-accent-amber/30 text-accent-amber bg-accent-amber/10",
  purple: "border-accent-purple/30 text-accent-purple bg-accent-purple/10",
  blue: "border-accent-blue/30 text-accent-blue bg-accent-blue/10",
};

/**
 * Industry photo card — full-bleed photo with eyebrow + title + description
 * sitting on a gradient overlay. A single metric chip pinned to the
 * bottom-right. Used to introduce a vertical (cold chain, greenhouse,
 * smart city) with a real photo from the field.
 */
export function IndustryPhotoCard({
  className,
  eyebrow = "COLD CHAIN · LIVE",
  title = "Every reefer in spec, every kilometre.",
  description = "From freezer to last-mile delivery — one sensor, one platform, one audit trail. Compliance teams stop asking for spreadsheets.",
  metricValue = "1,847",
  metricLabel = "trucks online · APAC",
  ctaLabel = "See the cold-chain solution",
  ctaHref = "#",
  image = "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
  tone = "teal",
}: IndustryPhotoCardProps) {
  return (
    <article
      className={cn(
        "relative h-96 overflow-hidden rounded-2xl border border-border shadow-2xl",
        className,
      )}
    >
      {/* hero photo */}
      <Image
        src={image}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, 800px"
        className="object-cover"
        priority={false}
      />

      {/* dual gradient: top for the eyebrow, bottom for the body copy */}
      <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-background/10" />
      <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-background/60 to-transparent" />

      {/* top eyebrow */}
      <div className="absolute left-6 top-6">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider",
            toneClass[tone],
          )}
        >
          <span className="size-1.5 animate-pulse-dot rounded-full bg-current" />
          {eyebrow}
        </span>
      </div>

      {/* bottom content */}
      <div className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-4">
        <div className="max-w-md">
          <h3 className="text-2xl font-semibold leading-tight tracking-tight text-foreground">
            {title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
          <a
            href={ctaHref}
            className="mt-4 inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider text-foreground hover:text-accent-teal"
          >
            {ctaLabel} <span aria-hidden>→</span>
          </a>
        </div>
        <div className="shrink-0 rounded-xl border border-border bg-surface/80 px-4 py-3 text-right backdrop-blur">
          <div className="font-mono text-2xl font-semibold tabular-nums tracking-tight text-foreground">
            {metricValue}
          </div>
          <div className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            {metricLabel}
          </div>
        </div>
      </div>
    </article>
  );
}
