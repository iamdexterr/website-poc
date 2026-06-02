import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FadeUp } from "@/components/motion/fade-up";

const faqs = [
  {
    q: "What is OneIoT?",
    a: "OneIoT is an AI-ready IoT platform that lets enterprises, governments, and startups connect devices, monitor telemetry in real time, and automate workflows — across cloud, on-prem, hybrid, or edge deployments.",
  },
  {
    q: "Which industries do you serve?",
    a: "Climate-controlled environments (agriculture, cold chain, food processing, data centers, warehousing, smart buildings), asset-heavy operations (logistics, construction, utilities, fleet, manufacturing), and smart-city programs (water, waste, energy, environment, infrastructure, public safety).",
  },
  {
    q: "What is the Lego-style architecture?",
    a: "Every capability — connectivity, management, monitoring, analytics, alerts, automation — is a composable module with open APIs. Snap together the modules you need today, add the rest when you're ready. 70% faster development with no lock-in.",
  },
  {
    q: "Which IoT protocols do you support?",
    a: "Out of the box: MQTT 5, CoAP, Modbus TCP, OPC-UA, LoRaWAN, and BLE. Custom protocols can be added via the open device-layer SDK.",
  },
  {
    q: "How does the AI engine work?",
    a: "The AI layer runs anomaly detection, forecasting, natural-language query, and digital-twin modeling on top of the streaming pipeline. Models are pre-trained for common telemetry patterns and fine-tune on your historical data.",
  },
  {
    q: "What are the deployment options?",
    a: "Cloud (multi-region), on-prem (air-gapped supported), hybrid, and edge. White-label deployments available for system integrators and OEM partners.",
  },
  {
    q: "How fast can we deploy?",
    a: "Most production deployments go live in two to four weeks. A proof-of-concept typically takes one week from kickoff.",
  },
  {
    q: "What recognition has OneIoT received?",
    a: "Shortlisted for the GITEX AI ASIA Supernova Competition, featured at Convergence India Expo 2026, and incubated at T-Hub, India's flagship innovation hub.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="section-divide bg-dot-fade bg-background">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-[1fr_2fr] md:px-8">
        <FadeUp>
          <span className="label-mono text-accent-teal">FAQ</span>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
            Answers, before you have to ask.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            Still curious?{" "}
            <a
              href="mailto:hello@oneiot.io"
              className="text-foreground underline underline-offset-4 hover:text-brand"
            >
              hello@oneiot.io
            </a>
          </p>
        </FadeUp>

        <FadeUp delay={0.1}>
          <Accordion className="divide-y divide-border *:border-border">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`faq-${i}`}>
                <AccordionTrigger className="py-5 text-base font-medium text-foreground">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  <p>{f.a}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeUp>
      </div>
    </section>
  );
}
