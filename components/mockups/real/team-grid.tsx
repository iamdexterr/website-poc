import Image from "next/image";
import { cn } from "@/lib/utils";

type TeamMember = {
  name: string;
  role: string;
  location: string;
  photo: string;
};

const defaultTeam: TeamMember[] = [
  {
    name: "Priya Narayanan",
    role: "Co-founder · CEO",
    location: "Hyderabad",
    photo:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=facearea&facepad=2&w=320&q=80",
  },
  {
    name: "Arjun Kapoor",
    role: "Co-founder · CTO",
    location: "Hyderabad",
    photo:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=320&q=80",
  },
  {
    name: "Sam Liu",
    role: "Head of Platform",
    location: "Singapore",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=320&q=80",
  },
  {
    name: "Esther Howard",
    role: "Staff Engineer · Edge",
    location: "Bangalore",
    photo:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=320&q=80",
  },
  {
    name: "Cody Fisher",
    role: "Head of Customer Success",
    location: "Dubai",
    photo:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=320&q=80",
  },
  {
    name: "Jenny Wilson",
    role: "Design Engineer",
    location: "Hyderabad",
    photo:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=facearea&facepad=2&w=320&q=80",
  },
  {
    name: "Kristin Watson",
    role: "Solutions Architect",
    location: "London",
    photo:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=320&q=80",
  },
  {
    name: "Daniel Brooks",
    role: "Field Reliability",
    location: "New York",
    photo:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=facearea&facepad=2&w=320&q=80",
  },
];

/**
 * Team grid — 4×2 of portrait cards with name, role, and location.
 * Hover lifts the photo subtly so it feels interactive.
 */
export function TeamGrid({
  className,
  members = defaultTeam,
}: {
  className?: string;
  members?: TeamMember[];
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-surface p-6 shadow-2xl",
        className,
      )}
    >
      <div className="mb-5 flex items-baseline justify-between">
        <div>
          <div className="text-base font-semibold text-foreground">
            Meet the team
          </div>
          <div className="mt-0.5 font-mono text-[11px] text-muted-foreground">
            {members.length} humans · {new Set(members.map((m) => m.location)).size}{" "}
            cities
          </div>
        </div>
        <a
          href="#"
          className="font-mono text-[10px] uppercase tracking-wider text-accent-teal hover:underline"
        >
          We&apos;re hiring ↗
        </a>
      </div>

      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {members.map((m) => (
          <li
            key={m.name}
            className="group rounded-xl border border-border bg-background/60 p-3 transition-colors hover:bg-surface-elevated"
          >
            <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-surface-elevated">
              <Image
                src={m.photo}
                alt={m.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
            <div className="mt-3">
              <div className="text-xs font-semibold text-foreground">
                {m.name}
              </div>
              <div className="mt-0.5 text-[11px] leading-snug text-muted-foreground">
                {m.role}
              </div>
              <div className="mt-1 inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                <span className="size-1 rounded-full bg-accent-teal" />
                {m.location}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
