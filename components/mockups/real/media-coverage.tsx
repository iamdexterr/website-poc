import Image from "next/image";
import { cn } from "@/lib/utils";

type Coverage = {
  outlet: string;
  date: string;
  headline: string;
  href: string;
  thumbnail: string;
};

const defaultCoverage: Coverage[] = [
  {
    outlet: "TechCrunch",
    date: "12 Mar 2026",
    headline:
      "OneIoT raises Series A to bring audit-grade governance to industrial IoT",
    href: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80",
  },
  {
    outlet: "The Economic Times",
    date: "28 Feb 2026",
    headline:
      "Indian IoT platform OneIoT shortlisted for GITEX AI Asia Supernova",
    href: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=400&q=80",
  },
  {
    outlet: "MIT Technology Review",
    date: "08 Feb 2026",
    headline:
      "The closed-loop AI pattern that's finally bringing IoT projects to production",
    href: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=400&q=80",
  },
];

const outlets = [
  "TechCrunch",
  "MIT Technology Review",
  "The Economic Times",
  "Bloomberg",
  "WIRED",
  "Forbes",
];

/**
 * Media coverage — top "as seen in" outlet row + 3 featured articles
 * below, each with a thumbnail image, outlet, date, and headline.
 */
export function MediaCoverage({
  className,
  coverage = defaultCoverage,
}: {
  className?: string;
  coverage?: Coverage[];
}) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-border bg-surface p-6 shadow-2xl",
        className,
      )}
    >
      {/* outlet strip */}
      <div className="mb-6">
        <div className="label-mono mb-3 text-muted-foreground">
          AS SEEN IN
        </div>
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-border pb-5">
          {outlets.map((o) => (
            <li
              key={o}
              className="font-mono text-sm font-medium tracking-tight text-muted-foreground/80"
            >
              {o}
            </li>
          ))}
        </ul>
      </div>

      {/* featured articles */}
      <ul className="grid gap-3 md:grid-cols-3">
        {coverage.map((c) => (
          <li key={c.outlet + c.date}>
            <a
              href={c.href}
              className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-background/60 transition-colors hover:bg-surface-elevated"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface-elevated">
                <Image
                  src={c.thumbnail}
                  alt={c.headline}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col gap-2 p-4">
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  <span className="text-foreground">{c.outlet}</span>
                  <span>{c.date}</span>
                </div>
                <p className="flex-1 text-sm leading-snug text-foreground">
                  {c.headline}
                </p>
                <div className="mt-1 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-accent-teal group-hover:underline">
                  Read article <span aria-hidden>↗</span>
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
