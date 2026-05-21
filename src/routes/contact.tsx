import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Mail, Instagram, Linkedin, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — VYTAL support, partnerships & community" },
      { name: "description", content: "Get in touch with the VYTAL team. Customer support, partnerships, press and community questions." },
      { property: "og:title", content: "Contact VYTAL" },
      { property: "og:description", content: "We answer. Real humans, calm tone." },
    ],
  }),
  component: ContactPage,
});

const faqs = [
  {
    q: "How does the refill system work?",
    a: "Choose flavor and intensity at a VYTAL station, place your bottle or pantry container, dispense and go. The dispenser auto-recognises your bottle size for precise dosing.",
  },
  {
    q: "Where can I find a VYTAL station?",
    a: "We're rolling out stations across universities, coworking spaces and selected cafés in Germany and Austria. A live map is coming to this site shortly.",
  },
  {
    q: "Are VYTAL drinks vegan?",
    a: "Yes. All refills are 100% plant-based, with no artificial sweeteners, dyes or hidden additives.",
  },
  {
    q: "Can I use any bottle?",
    a: "Technically yes for pantry mode, but VYTAL bottles are recognised by the dispenser for automatic intensity and dose adjustment — giving you a more consistent result.",
  },
  {
    q: "How is this more sustainable than cans?",
    a: "Compact refill capsules cut packaging and transport volume drastically, and reusable bottles replace hundreds of cans per user per year. We publish the math in our journal.",
  },
  {
    q: "Do you ship internationally?",
    a: "Currently we ship within the EU. International shipping is on the roadmap for late 2026.",
  },
];

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="px-6 md:px-10 pt-16 md:pt-24 pb-16 max-w-7xl mx-auto grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-2">
          <span className="font-mono text-xs text-primary mb-4 block">Contact</span>
          <h1 className="font-display text-4xl md:text-5xl font-extrabold leading-[1.05]">
            Tell us what you're working on.
          </h1>
          <p className="mt-6 text-muted-foreground text-lg">
            We're a small team and we read every message. Whether you have a support question, want to
            host a VYTAL station or just say hi — we'll get back to you.
          </p>

          <ul className="mt-10 space-y-3">
            {[
              { i: <Mail className="size-4" />, label: "hello@vytal.energy", href: "mailto:hello@vytal.energy" },
              { i: <Instagram className="size-4" />, label: "@vytal.energy", href: "#" },
              { i: <Linkedin className="size-4" />, label: "VYTAL on LinkedIn", href: "#" },
              { i: <MessageCircle className="size-4" />, label: "Live chat · Mon–Fri 09–18", href: "#" },
            ].map((x) => (
              <li key={x.label}>
                <a href={x.href} className="inline-flex items-center gap-3 px-4 py-3 rounded-full border border-border hover:bg-secondary text-sm">
                  <span className="text-primary">{x.i}</span>
                  {x.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="rounded-3xl border border-border bg-secondary/40 p-6 md:p-8 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Your name" name="name" required />
              <Field label="Email" name="email" type="email" required />
            </div>
            <div>
              <label className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                What's it about?
              </label>
              <select
                required
                className="mt-2 w-full bg-background border border-border rounded-2xl px-4 py-3 text-sm"
              >
                <option>Customer support</option>
                <option>Station partnership</option>
                <option>Press & media</option>
                <option>Community / event</option>
                <option>Just saying hi</option>
              </select>
            </div>
            <div>
              <label className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                Message
              </label>
              <textarea
                required
                rows={5}
                className="mt-2 w-full bg-background border border-border rounded-2xl px-4 py-3 text-sm"
                placeholder="Tell us more…"
              />
            </div>
            <label className="flex items-center gap-2 text-xs text-muted-foreground">
              <input type="checkbox" className="accent-foreground" />
              Send me the slow VYTAL newsletter (optional)
            </label>
            <button
              type="submit"
              className="w-full bg-foreground text-background rounded-full py-3.5 text-sm font-semibold hover:bg-primary"
            >
              {sent ? "Thanks — we'll be in touch." : "Send message"}
            </button>
          </form>
        </div>
      </section>

      <section className="px-6 md:px-10 py-24 max-w-4xl mx-auto">
        <span className="font-mono text-xs text-primary mb-4 block">FAQ</span>
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-10">
          Common questions.
        </h2>
        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((f, i) => (
            <AccordionItem
              key={f.q}
              value={`item-${i}`}
              className="border border-border rounded-2xl px-5"
            >
              <AccordionTrigger className="text-left text-base font-medium">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <SiteFooter />
    </main>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full bg-background border border-border rounded-2xl px-4 py-3 text-sm"
      />
    </div>
  );
}