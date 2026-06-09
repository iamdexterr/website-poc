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
  cutouts?: React.ReactNode[];
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
  cutouts,
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
      <div className="absolute inset-y-0 right-0 w-64 bg-linear-to-l from-black/40 to-transparent" />
      <div className="absolute inset-y-0 right-0 w-80" style={{ background: "radial-gradient(ellipse 80% 90% at 100% 50%, rgba(0,0,0,0.38) 0%, transparent 75%)" }} />

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
      <div className="absolute inset-x-6 bottom-6">
        <div className="max-w-md">
          <h3 className="text-2xl font-semibold leading-tight tracking-tight text-foreground">
            {title}
          </h3>
          <p className="mt-2 hidden text-sm leading-relaxed text-muted-foreground md:block">
            {description}
          </p>
          <a
            href={ctaHref}
            className="mt-4 inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider text-foreground hover:text-accent-teal"
          >
            {ctaLabel} <span aria-hidden>→</span>
          </a>
        </div>
      </div>

      {cutouts && cutouts.length > 0 && (
        <>
          <div className="pointer-events-none absolute right-3 top-12 flex w-[163px] flex-col gap-2 md:hidden">
            {cutouts.slice(0, 2).map((c, i) => (
              <div key={i} className="rounded-xl border border-white/20 bg-black/50 p-2.5 backdrop-blur-md">
                {c}
              </div>
            ))}
          </div>

          {cutouts[0] && (
            <div className="pointer-events-none absolute right-4 top-4 hidden w-[210px] md:block">
              <div className="rounded-xl border border-white/20 bg-black/50 p-3 shadow-xl backdrop-blur-md">
                {cutouts[0]}
              </div>
            </div>
          )}

          {cutouts[1] && (
            <div className="pointer-events-none absolute right-16 top-[33%] hidden w-[203px] md:block">
              <div className="rounded-xl border border-white/20 bg-black/50 p-3 shadow-xl backdrop-blur-md">
                {cutouts[1]}
              </div>
            </div>
          )}

          {cutouts[2] && (
            <div className="pointer-events-none absolute bottom-[5.5rem] right-5 hidden w-[210px] md:block">
              <div className="rounded-xl border border-white/20 bg-black/50 p-3 shadow-xl backdrop-blur-md">
                {cutouts[2]}
              </div>
            </div>
          )}
        </>
      )}
    </article>
  );
}
