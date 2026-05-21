import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About VYTAL — energy that respects you and the planet" },
      { name: "description", content: "VYTAL is a sustainable functional energy brand for people tired of the spike-and-crash. The story, the mission and the philosophy." },
      { property: "og:title", content: "About VYTAL" },
      { property: "og:description", content: "A healthier kind of energy — built around real life." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="px-6 md:px-10 pt-16 md:pt-24 pb-16 max-w-4xl mx-auto">
        <span className="font-mono text-xs text-primary mb-4 block">About VYTAL</span>
        <h1 className="font-display text-4xl md:text-6xl font-extrabold leading-[1.02]">
          We're tired of being tired. <span className="text-primary">And of pretending it's normal.</span>
        </h1>
        <p className="mt-8 text-lg text-muted-foreground leading-relaxed">
          VYTAL started in a shared flat in Munich — two students, four exam weeks, far too many
          energy cans in the recycling bin. We weren't looking to start a brand. We were looking for
          something that respected our heads and our planet at the same time. It didn't exist. So we
          built it.
        </p>
      </section>

      <section className="px-6 md:px-10 py-20 bg-secondary/50">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="font-mono text-xs text-primary uppercase tracking-widest">Our mission</h2>
            <p className="mt-3 font-display text-3xl font-bold leading-tight">
              Make functional energy honest, calm and refillable.
            </p>
          </div>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Energy culture today is loud. It promises spikes, edges and 200mg of personality.
              The cost is paid later — by your nervous system and by a planet drowning in cans.
            </p>
            <p>
              We believe energy should support the life you already have, not demand a new one.
              That means transparent ingredients, sustainable systems and a tone that treats you
              like an adult.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-10 py-24 max-w-5xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 max-w-2xl">
          The problem with current energy culture.
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { t: "Crash, not calm", d: "Sugar + isolated caffeine spikes were never designed for an 8-hour workday." },
            { t: "Waste by default", d: "A 200ml drink shipped in 30g of aluminium. Used once. Recycled, maybe." },
            { t: "Toxic productivity", d: "Marketing built on adrenaline, hustle and 'edges'. Not on actual lives." },
          ].map((x) => (
            <div key={x.t} className="rounded-2xl border border-border p-6">
              <h3 className="font-semibold">{x.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{x.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-foreground text-background px-6 md:px-10 py-24 md:py-32">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-3xl md:text-5xl font-bold leading-[1.05] max-w-3xl">
            Our philosophy in five lines.
          </h2>
          <ul className="mt-12 grid md:grid-cols-2 gap-5">
            {[
              "Energy should serve your day — not require recovery from it.",
              "Sustainability has to be systemic, not symbolic.",
              "Transparency beats marketing.",
              "Long-lasting tools beat disposable ones.",
              "Emotionally honest brands age better.",
            ].map((p, i) => (
              <li key={p} className="flex gap-4 items-start p-5 rounded-2xl border border-background/15">
                <span className="font-mono text-xs text-accent">0{i + 1}</span>
                <span className="text-lg leading-snug">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-6 md:px-10 py-24 max-w-5xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-12">Our sustainability goals.</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { n: "−90%", t: "Single-use cans avoided", d: "vs. equivalent energy drink consumption per user, per year." },
            { n: "100%", t: "Reusable bottles", d: "Built to last years. Modular parts replaced, not the whole bottle." },
            { n: "By 2027", t: "Climate-neutral supply", d: "Local production hubs and traceable supply chain." },
          ].map((x) => (
            <div key={x.t} className="rounded-3xl border border-border p-7 bg-secondary/40">
              <p className="font-display text-4xl font-extrabold text-primary">{x.n}</p>
              <h3 className="mt-3 font-semibold">{x.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{x.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-10 py-28 text-center">
        <p className="italic text-muted-foreground">(Re)Fuel your day. Not the planet.</p>
        <h2 className="mt-4 font-display text-3xl md:text-5xl font-extrabold">
          Built calmly. On purpose.
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/shop" className="bg-foreground text-background px-7 py-3.5 rounded-full font-semibold hover:bg-primary">
            Try the system
          </Link>
          <Link to="/contact" className="border border-border px-7 py-3.5 rounded-full font-semibold hover:bg-secondary">
            Talk to us
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}