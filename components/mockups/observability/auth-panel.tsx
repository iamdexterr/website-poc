import { cn } from "@/lib/utils";

type User = { initials: string; name: string; email: string; tone: string };

const users: User[] = [
  { initials: "JC", name: "Jane Cooper", email: "jane.cooper@oneiot.io", tone: "bg-accent-teal/15 text-accent-teal" },
  { initials: "CF", name: "Cody Fisher", email: "cody.fisher@oneiot.io", tone: "bg-accent-purple/15 text-accent-purple" },
  { initials: "EH", name: "Esther Howard", email: "esther.howard@oneiot.io", tone: "bg-accent-amber/15 text-accent-amber" },
  { initials: "JW", name: "Jenny Wilson", email: "jenny.wilson@oneiot.io", tone: "bg-accent-green/15 text-accent-green" },
  { initials: "KW", name: "Kristin Watson", email: "kristin.watson@oneiot.io", tone: "bg-accent-blue/15 text-accent-blue" },
];

/**
 * Auth panel — user list on the left layered behind a sign-in panel on
 * the right, with a small code-snippet card peeking from the bottom-left
 * to show the create-user API call. Inspired by Supabase auth hero.
 */
export function AuthPanel({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-2xl",
        className,
      )}
    >
      <div className="relative">
        {/* user list — back-left */}
        <div className="w-[68%] rounded-xl border border-border bg-background/60 p-1.5">
          <ul className="divide-y divide-border">
            {users.map((u) => (
              <li key={u.email} className="flex items-center gap-3 px-2.5 py-2">
                <div
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-full font-mono text-xs",
                    u.tone,
                  )}
                >
                  {u.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-foreground">
                    {u.name}
                  </div>
                  <div className="truncate font-mono text-[10px] text-muted-foreground">
                    {u.email}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* sign-in form — front-right, overlapping the list */}
        <div className="absolute -right-2 top-4 w-[60%] rounded-xl border border-border-strong bg-surface px-5 py-5 shadow-2xl">
          {/* brand mark */}
          <div className="flex flex-col items-center text-center">
            <div className="flex size-9 items-center justify-center rounded-full border border-border-strong">
              <span className="size-3 rounded-full border-2 border-foreground" />
            </div>
            <div className="mt-2 text-sm font-semibold text-foreground">
              Acme industries
            </div>
          </div>

          {/* google sign-in */}
          <button
            type="button"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-md border border-border bg-background/60 px-3 py-2 text-xs text-foreground hover:bg-surface-elevated"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden>
              <path
                fill="#EA4335"
                d="M12 5c1.6 0 3.1.6 4.3 1.6l3.1-3C17.5 1.7 14.9.7 12 .7 7.3.7 3.3 3.4 1.4 7.2l3.6 2.8C5.9 7 8.7 5 12 5z"
              />
              <path
                fill="#4285F4"
                d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.6h6.5c-.3 1.4-1.1 2.6-2.4 3.4l3.5 2.8c2.1-1.9 3.4-4.8 3.4-8.5z"
              />
              <path
                fill="#FBBC05"
                d="M5 14c-.2-.6-.4-1.3-.4-2s.1-1.4.4-2L1.4 7.2C.5 8.8 0 10.6 0 12s.5 3.2 1.4 4.8L5 14z"
              />
              <path
                fill="#34A853"
                d="M12 23.3c3 0 5.4-1 7.3-2.7l-3.5-2.8c-1 .7-2.3 1.1-3.8 1.1-3.3 0-6.1-2-7-4.9l-3.6 2.8C3.3 20.6 7.3 23.3 12 23.3z"
              />
            </svg>
            Sign in with Google
          </button>

          {/* divider */}
          <div className="my-3 flex items-center gap-2 font-mono text-[10px] text-muted-foreground">
            <div className="h-px flex-1 bg-border" />
            or
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* email + password */}
          <div className="space-y-2">
            <div>
              <div className="text-[10px] text-muted-foreground">Email</div>
              <div className="mt-1 rounded-md border border-border bg-background/60 px-2.5 py-1.5 text-xs text-foreground">
                john@oneiot.io
              </div>
            </div>
            <div>
              <div className="text-[10px] text-muted-foreground">Password</div>
              <div className="mt-1 rounded-md border border-border bg-background/60 px-2.5 py-1.5 font-mono text-xs tracking-widest text-foreground">
                ••••••••••
              </div>
            </div>
          </div>

          <button
            type="button"
            className="mt-3 w-full rounded-md bg-foreground px-3 py-2 text-xs font-semibold text-background hover:bg-foreground/90"
          >
            Sign in
          </button>
          <div className="mt-2 text-center text-[10px] text-muted-foreground">
            No account?{" "}
            <a href="#" className="text-foreground hover:underline">
              Sign up
            </a>
          </div>
        </div>

        {/* code snippet — peeks out bottom-left */}
        <div className="mt-3 w-[55%] overflow-hidden rounded-xl border border-border bg-background shadow-xl">
          <pre className="grid grid-cols-[28px_1fr] font-mono text-[10px] leading-relaxed">
            {[
              { n: 10, text: "" },
              { n: 11, text: "" },
              { n: 12, text: "// Create a new user" },
              {
                n: 13,
                text: (
                  <>
                    <span className="text-accent-purple">const</span>{" "}
                    <span className="text-foreground">{`{ user, error }`}</span>{" "}
                    ={" "}
                    <span className="text-accent-purple">await</span>{" "}
                    <span className="text-foreground">oneiot.auth.signUp</span>(
                    <span className="text-muted-foreground">{"{"}</span>
                  </>
                ),
              },
              {
                n: 14,
                text: (
                  <>
                    {"  "}
                    email:{" "}
                    <span className="text-accent-green">
                      &apos;ops@oneiot.io&apos;
                    </span>
                    ,
                  </>
                ),
              },
              {
                n: 15,
                text: (
                  <>
                    {"  "}
                    password:{" "}
                    <span className="text-accent-green">
                      &apos;***************&apos;
                    </span>
                    ,
                  </>
                ),
              },
              {
                n: 16,
                text: (
                  <>
                    <span className="text-muted-foreground">{"})"}</span>
                  </>
                ),
              },
            ].map((line, i) => (
              <div
                key={i}
                className={cn(
                  "contents",
                  i === 3 ? "text-foreground" : "text-muted-foreground",
                )}
              >
                <span className="bg-surface-elevated px-2 py-1 text-right text-[9px] text-muted-foreground">
                  {line.n}
                </span>
                <span className="px-3 py-1">{line.text}</span>
              </div>
            ))}
          </pre>
        </div>
      </div>
    </div>
  );
}
