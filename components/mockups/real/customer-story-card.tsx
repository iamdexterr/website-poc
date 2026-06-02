import Image from "next/image";
import { cn } from "@/lib/utils";

export type CustomerStoryCardProps = {
  className?: string;
  customerName?: string;
  vertical?: string;
  storyTitle?: string;
  storyBody?: string;
  metricValue?: string;
  metricLabel?: string;
  heroImage?: string;
};

/**
 * Customer story card — large hero image at top with vertical chip
 * overlay, then customer name + headline + body + a single hero metric
 * pinned to the bottom-right corner.
 */
export function CustomerStoryCard({
  className,
  customerName = "Coldhaul Logistics",
  vertical = "COLD CHAIN",
  storyTitle = "Zero excursions across 1,800 reefer trucks",
  storyBody = "Replaced two legacy SCADA stacks with OneIoT in six weeks. Every shipment now writes to the same audit log — pharma compliance team approved IoT in production for the first time.",
  metricValue = "0",
  metricLabel = "excursions in 9 months",
  heroImage = "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80",
}: CustomerStoryCardProps) {
  return (
    <article
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl",
        className,
      )}
    >
      {/* hero image with overlay */}
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <Image
          src={heroImage}
          alt={`${customerName} — ${vertical}`}
          fill
          sizes="(max-width: 768px) 100vw, 600px"
          className="object-cover"
        />
        {/* gradient overlay so the chip stays readable on any photo */}
        <div className="absolute inset-0 bg-linear-to-t from-background/80 via-background/10 to-transparent" />
        <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-md border border-border-strong bg-surface/80 px-2.5 py-1 backdrop-blur">
          <span className="size-1.5 rounded-full bg-accent-teal" />
          <span className="label-mono text-accent-teal">{vertical}</span>
        </div>
        <div className="absolute bottom-4 left-4">
          <div className="text-sm font-semibold text-foreground">
            {customerName}
          </div>
        </div>
      </div>

      {/* body */}
      <div className="flex flex-1 flex-col gap-4 p-6">
        <h3 className="text-lg font-semibold leading-snug text-foreground">
          {storyTitle}
        </h3>
        <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
          {storyBody}
        </p>
        <div className="flex items-end justify-between border-t border-border pt-4">
          <a
            href="#"
            className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider text-accent-teal hover:underline"
          >
            Read the full story
            <span aria-hidden>↗</span>
          </a>
          <div className="text-right">
            <div className="font-mono text-2xl font-semibold tabular-nums tracking-tight text-foreground">
              {metricValue}
            </div>
            <div className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              {metricLabel}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
