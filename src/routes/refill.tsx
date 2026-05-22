import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import refillMotion from "@/assets/refill-motion.jpg";

export const Route = createFileRoute("/refill")({
  head: () => ({
    meta: [
      { title: "The VYTAL Refill System — energy, reconsidered" },
      { name: "description", content: "How the VYTAL refill system works: pick, place, refill, go. Less waste, more flexibility, transparent sustainability." },
      { property: "og:title", content: "The VYTAL Refill System" },
      { property: "og:description", content: "Functional energy without single-use cans. A guided look at how it works." },
    ],
  }),
  component: RefillPage,
});

function RefillPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* Hero */}
      <section className="px-6 md:px-10 pt-16 md:pt-24 pb-16 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="font-mono text-xs text-primary mb-4 block">The refill system</span>
          <h1 className="font-display text-4xl md:text-6xl font-extrabold leading-[1.05] mb-6">
            Energy, reconsidered.
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-md">
            You decide how you consume your energy — without single-use cans, unnecessary waste or
            complicated routines. With the VYTAL refill system we combine functional energy drinks
            with a more sustainable usage system for everyday life.
          </p>
          <a
            href="#how"
            className="inline-flex bg-foreground text-background px-7 py-3.5 rounded-full font-semibold hover:bg-primary transition-all"
          >
            See how it works
          </a>
        </div>
        <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-secondary">
          <img src={refillMotion} alt="Refilling a VYTAL bottle at a station" className="absolute inset-0 w-full h-full object-cover" />
        </div>
      </section>

      {/* Problem */}
      <section className="bg-foreground text-background px-6 md:px-10 py-24 md:py-32">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          <h2 className="font-display text-3xl md:text-5xl font-bold leading-[1.05]">
            Why we wanted to rethink drink consumption.
          </h2>
          <div className="space-y-5 text-background/75 text-lg">
            <p>
              Most energy drinks are mostly water, sold in single-use packaging and discarded after
              one use.
            </p>
            <p>
              We wanted to develop a system that fits a modern, conscious everyday better —
              functional, flexible and thoughtful with resources.
            </p>
            <div className="grid grid-cols-3 gap-3 pt-4">
              {["Single-use cans", "Packaging waste", "Heavy transport"].map((x) => (
                <div key={x} className="rounded-2xl border border-background/15 p-4 text-sm">
                  {x}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="px-6 md:px-10 py-24 md:py-32 max-w-7xl mx-auto">
        <div className="max-w-2xl mb-16">
          <span className="font-mono text-xs text-primary mb-4 block">How the refill system works</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold leading-[1.05]">
            Four steps. No fuss.
          </h2>
        </div>
        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { n: "1", t: "Choose your flavor", d: "Pick flavor, function and intensity on the dispenser display." },
            { n: "2", t: "Place your container", d: "Use your VYTAL bottle or a pantry container." },
            { n: "3", t: "Dispense refill", d: "Compact capsules are precisely dosed into your bottle." },
            { n: "4", t: "Drink or take with you", d: "Optionally with still or sparkling water for the go." },
          ].map((s) => (
            <li key={s.n} className="p-7 rounded-3xl border border-border bg-secondary/40">
              <span className="font-mono text-xs text-primary mb-6 block">Step {s.n}</span>
              <h3 className="font-display text-2xl font-bold mb-2">{s.t}</h3>
              <p className="text-sm text-muted-foreground">{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Why our bottles */}
      <section className="bg-secondary/60 px-6 md:px-10 py-24 md:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-16">
            <span className="font-mono text-xs text-primary mb-4 block">Bottles & containers</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold leading-[1.05]">
              Why our bottles are part of the system.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { i: "♻️", t: "Built to last", d: "Robust materials instead of short-lived single-use packaging." },
              { i: "📏", t: "Optimised dosing", d: "Markings and sizes help with the right mix ratio." },
              { i: "🧃", t: "Everyday & pantry", d: "To-go bottles and pantry containers for different situations." },
              { i: "🔄", t: "Refill-compatible", d: "Designed for easy, hygienic, fast use at the dispenser." },
            ].map((b) => (
              <div key={b.t} className="bg-background rounded-2xl p-6 border border-border">
                <span className="text-2xl">{b.i}</span>
                <h3 className="mt-4 font-semibold">{b.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supply chain / cycle */}
      <section className="px-6 md:px-10 py-24 md:py-32 max-w-6xl mx-auto">
        <div className="max-w-2xl mb-16">
          <span className="font-mono text-xs text-primary mb-4 block">The VYTAL system</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold leading-[1.05]">
            From ingredient to flask, in a quieter loop.
          </h2>
        </div>
        <ol className="relative border-l border-border ml-3 space-y-8">
          {[
            { i: "🌱", t: "Functional ingredients", d: "Consciously selected recipes with traceable sourcing." },
            { i: "📦", t: "Compact refill capsules", d: "Less volume and packaging than classic drinks." },
            { i: "🚚", t: "Efficient transport", d: "Reduced storage and transport effort thanks to compact form." },
            { i: "♻️", t: "Reusable systems", d: "Bottles and containers built for long-term use." },
            { i: "⚡", t: "Flexible everyday use", d: "Individual dosing instead of standardised single-use products." },
            { i: "🌍", t: "Less packaging waste", d: "Step-by-step reduction of unnecessary single-use packaging." },
          ].map((s, i) => (
            <li key={s.t} className="pl-8 relative">
              <span className="absolute -left-[15px] top-0 size-7 grid place-items-center rounded-full bg-background border border-border text-sm">
                {s.i}
              </span>
              <p className="font-mono text-xs text-muted-foreground">0{i + 1}</p>
              <h3 className="font-display text-xl font-bold">{s.t}</h3>
              <p className="text-muted-foreground">{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Transparency */}
      <section className="bg-foreground text-background px-6 md:px-10 py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <span className="font-mono text-xs text-accent mb-4 block">Transparency</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold leading-[1.05] mb-8">
            Transparent — not greenwashed.
          </h2>
          <p className="text-background/75 text-lg mb-12 max-w-2xl mx-auto">
            Sustainability should be verifiable. That's why we rely on checkable standards and
            transparent processes — not vague claims.
          </p>
          <ul className="grid sm:grid-cols-2 gap-3 text-left max-w-2xl mx-auto">
            {[
              "Traceable ingredients",
              "Independent quality checks",
              "Long-lasting reusable systems",
              "Recyclable packaging components",
              "Transparent production & supply",
            ].map((x) => (
              <li key={x} className="rounded-2xl border border-background/15 p-4 text-sm">✓ {x}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-10 py-28 text-center max-w-3xl mx-auto">
        <h2 className="font-display text-4xl md:text-5xl font-extrabold leading-[1.05] mb-6">
          Energy that fits your day better.
        </h2>
        <p className="text-muted-foreground text-lg mb-3">
          VYTAL combines functional energy drinks with a system that makes conscious consumption
          easier.
        </p>
        <p className="italic text-muted-foreground mb-10">(Re)Fuel your day. Not the planet.</p>
        <Link to="/shop" className="inline-flex bg-foreground text-background px-8 py-4 rounded-full font-semibold hover:bg-primary">
          Explore the products
        </Link>
      </section>

      <SiteFooter />
    </main>
  );
}