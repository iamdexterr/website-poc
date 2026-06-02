import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FadeUp } from "@/components/motion/fade-up";

const useCases = [
  { value: "climate", label: "Climate control & monitoring" },
  { value: "tracking", label: "Asset tracking" },
  { value: "city", label: "Smart city" },
  { value: "datacenter", label: "Data center cooling" },
  { value: "cold-chain", label: "Cold chain" },
  { value: "other", label: "Something else" },
];

const facts = [
  {
    label: "HEADQUARTERS",
    value: "T-Hub, Knowledge City",
    detail: "Hyderabad, India",
  },
  {
    label: "EMAIL",
    value: "hello@oneiot.io",
    detail: "Replies within 1 business day",
    href: "mailto:hello@oneiot.io",
  },
  {
    label: "FOUNDED",
    value: "2022",
    detail: "Backed by T-Hub incubation",
  },
  {
    label: "LINKEDIN",
    value: "linkedin.com/company/oneiot",
    detail: "Follow for product updates",
    href: "#",
  },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="section-divide bg-dot-corner overflow-hidden bg-background"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-8">
        <FadeUp>
          <div className="max-w-3xl">
            <span className="label-mono text-accent-teal">CONTACT</span>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              Talk to an engineer, not a sales bot.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Tell us what you&apos;re building. We&apos;ll come back within one
              business day with a scoped plan.
            </p>
          </div>
        </FadeUp>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          {/* Facts */}
          <FadeUp>
            <dl className="space-y-6">
              {facts.map((f) => (
                <div
                  key={f.label}
                  className="border-l-2 border-brand pl-4"
                >
                  <dt className="label-mono text-muted-foreground">
                    {f.label}
                  </dt>
                  <dd className="mt-1">
                    {f.href ? (
                      <a
                        href={f.href}
                        className="text-base text-foreground hover:text-brand"
                      >
                        {f.value}
                      </a>
                    ) : (
                      <span className="text-base text-foreground">
                        {f.value}
                      </span>
                    )}
                    <span className="mt-0.5 block text-xs text-muted-foreground">
                      {f.detail}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </FadeUp>

          {/* Form */}
          <FadeUp delay={0.1}>
            <form
              action="mailto:hello@oneiot.io"
              method="post"
              encType="text/plain"
              className="space-y-5 rounded-2xl border border-border bg-surface p-6 md:p-8"
            >
              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" placeholder="Ada Lovelace" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="ada@company.com"
                    required
                  />
                </div>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" name="company" placeholder="Company name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="usecase">Use case</Label>
                  <Select name="usecase">
                    <SelectTrigger id="usecase" className="w-full">
                      <SelectValue placeholder="Pick a workload" />
                    </SelectTrigger>
                    <SelectContent>
                      {useCases.map((u) => (
                        <SelectItem key={u.value} value={u.value}>
                          {u.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Tell us about the devices, the scale, the timeline…"
                />
              </div>
              <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-muted-foreground">
                  By submitting you agree to our terms. We&apos;ll never share
                  your details.
                </p>
                <Button
                  type="submit"
                  size="lg"
                  className="h-11 rounded-md bg-cta px-6 font-mono text-sm uppercase tracking-[0.14em] text-cta-foreground hover:bg-cta/90"
                >
                  Send →
                </Button>
              </div>
            </form>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
