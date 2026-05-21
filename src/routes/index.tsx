import { createFileRoute } from "@tanstack/react-router";
import heroBottle from "@/assets/hero-bottle.jpg";
import refillMotion from "@/assets/refill-motion.jpg";
import productLineup from "@/assets/product-lineup.jpg";
import dailyStudy from "@/assets/daily-study.jpg";
import dailyOffice from "@/assets/daily-office.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

function Nav() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-10 py-4 backdrop-blur-md bg-background/75 border-b border-border">
      <a href="#top" className="font-display text-xl font-extrabold tracking-tight uppercase">
        Vytal
      </a>
      <div className="hidden md:flex gap-8 text-sm font-medium text-muted-foreground">
        <a href="#struggles" className="hover:text-foreground transition-colors">Why Vytal</a>
        <a href="#ingredients" className="hover:text-foreground transition-colors">Ingredients</a>
        <a href="#products" className="hover:text-foreground transition-colors">Bottles</a>
        <a href="#sustainability" className="hover:text-foreground transition-colors">Sustainability</a>
      </div>
      <a
        href="#cta"
        className="bg-foreground text-background px-5 py-2 rounded-full text-sm font-medium hover:bg-primary transition-all duration-300"
      >
        Try Vytal
      </a>
    </nav>
  );
}

function Hero() {
  return (
    <section id="top" className="relative px-6 pt-16 md:pt-24 pb-24 md:pb-32 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        <span className="animate-reveal [animation-delay:100ms] text-[10px] font-medium tracking-[0.2em] uppercase text-primary mb-6">
          Sustainable Functional Energy
        </span>
        <h1 className="animate-reveal [animation-delay:200ms] font-display text-5xl md:text-7xl font-extrabold text-balance leading-[0.95] mb-8 max-w-4xl">
          Energy that actually <br />
          <span className="text-primary">fits real life.</span>
        </h1>
        <p className="animate-reveal [animation-delay:300ms] text-lg md:text-xl text-muted-foreground max-w-xl mb-10 text-pretty leading-relaxed">
          Refillable, plant-based focus for the overwhelmed. No jitters, no crashes —
          just a steady stream of mental clarity that fits the way you actually live.
        </p>
        <div className="animate-reveal [animation-delay:400ms] flex flex-col sm:flex-row gap-3">
          <a
            href="#products"
            className="bg-accent text-foreground px-8 py-4 rounded-full font-semibold hover:ring-4 ring-accent/30 transition-all"
          >
            Start your routine
          </a>
          <a
            href="#sustainability"
            className="px-8 py-4 rounded-full font-semibold border border-border hover:bg-secondary transition-all"
          >
            The Refill System
          </a>
        </div>
      </div>

      <div className="mt-16 md:mt-20 animate-reveal [animation-delay:600ms] flex justify-center px-2">
        <div className="relative w-full max-w-4xl aspect-[16/10] rounded-3xl overflow-hidden bg-secondary outline outline-1 -outline-offset-1 outline-foreground/5">
          <img
            src={heroBottle}
            alt="The VYTAL refillable bottle in warm morning light"
            width={1600}
            height={1024}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-md text-[10px] font-mono tracking-widest text-muted-foreground">
            THE VYTAL BOTTLE
          </div>
        </div>
      </div>
    </section>
  );
}

function Struggles() {
  const items = [
    { tag: "01 — Mental Load", body: "Constant pressure to perform leading to cognitive paralysis and decision fatigue." },
    { tag: "02 — The Crash", body: "Spiking your energy with sugar and caffeine, only to fall further behind two hours later." },
    { tag: "03 — Hustle Culture", body: "A productivity script that asks for 110% and leaves nothing for the actual life around it." },
    { tag: "04 — Waste Habits", body: "Plastic cans piling up at your desk. A habit that quietly hurts you and the planet." },
  ];
  return (
    <section id="struggles" className="bg-foreground text-background py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-end mb-16 md:mb-24">
          <h2 className="font-display text-4xl md:text-5xl font-bold leading-[1.05]">
            Productivity shouldn’t <br />feel like a battle.
          </h2>
          <p className="text-background/60 text-lg max-w-md">
            The cycle of caffeine dependency, mental overload and quiet burnout is exhausting.
            We made VYTAL for people who are tired of being tired — not for the next hustle quote.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((it) => (
            <div key={it.tag} className="p-7 bg-background/5 border border-background/10 rounded-2xl">
              <span className="font-mono text-xs text-accent mb-4 block underline underline-offset-4">
                {it.tag}
              </span>
              <p className="text-lg leading-snug">{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyDifferent() {
  const pillars = [
    {
      kicker: "Without the crash",
      title: "Slow-release focus, not a spike.",
      body: "Natural caffeine paired with L-Theanine and adaptogens — energy you can actually finish a workday on.",
    },
    {
      kicker: "Refill, don’t replace",
      title: "One bottle. Endless refills.",
      body: "A premium glass vessel you keep for years. Compostable concentrate sachets delivered to your door.",
    },
    {
      kicker: "Real life, not extreme life",
      title: "Designed around your actual day.",
      body: "Library sessions, commutes, slow afternoons. VYTAL is calm support — not another optimization demand.",
    },
  ];
  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-16">
          <span className="font-mono text-xs text-primary mb-4 block">Why Vytal is different</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold leading-[1.05]">
            A healthier kind of energy, built around real life.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {pillars.map((p) => (
            <article
              key={p.kicker}
              className="p-8 rounded-3xl bg-secondary border border-border flex flex-col gap-4"
            >
              <span className="font-mono text-[11px] uppercase tracking-widest text-primary">
                {p.kicker}
              </span>
              <h3 className="font-display text-2xl font-bold leading-tight">{p.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{p.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Ingredients() {
  const items = [
    { name: "Ashwagandha", dose: "300 mg", body: "An adaptogen that helps the body manage cortisol levels and emotional stress." },
    { name: "L-Theanine", dose: "200 mg", body: "Found in green tea, it provides focus without the jitters associated with coffee." },
    { name: "Magnesium", dose: "150 mg", body: "Essential for cellular energy production and muscle relaxation after a long day." },
    { name: "Green Tea Caffeine", dose: "80 mg", body: "Slow-release natural caffeine from green tea extract, for sustained cognitive flow." },
  ];
  return (
    <section id="ingredients" className="py-24 md:py-32 px-6 bg-secondary">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <span className="font-mono text-xs text-primary mb-4 block">Inside the bottle</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Transparent ingredients. Nothing hidden.
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Four clinically studied actives. No proprietary blends, no sweeteners,
            no marketing fog — just what the body actually responds to.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((i) => (
            <div
              key={i.name}
              className="group bg-background p-7 rounded-2xl border border-border hover:border-primary/40 transition-all flex flex-col"
            >
              <div className="size-12 bg-accent/30 rounded-full mb-6 grid place-items-center group-hover:bg-accent/60 transition-colors">
                <div className="size-2 bg-primary rounded-full" />
              </div>
              <h3 className="font-semibold mb-2">{i.name}</h3>
              <p className="text-sm text-muted-foreground mb-6">{i.body}</p>
              <div className="mt-auto pt-4 border-t border-border text-xs font-mono text-muted-foreground">
                {i.dose} per serving
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Products() {
  const flavors = [
    { name: "Sage Citrus", note: "Lemon · Yuzu · Sage", swatch: "bg-primary/70" },
    { name: "Warm Ginger", note: "Ginger · Honey · Cardamom", swatch: "bg-clay" },
    { name: "Wild Berry", note: "Blackcurrant · Hibiscus", swatch: "bg-accent" },
  ];
  return (
    <section id="products" className="py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-secondary order-2 lg:order-1">
          <img
            src={productLineup}
            alt="Three VYTAL refill bottles in sage, sand and yuzu colorways"
            loading="lazy"
            width={1600}
            height={1024}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="order-1 lg:order-2">
          <span className="font-mono text-xs text-primary mb-4 block">The bottles</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold leading-[1.05] mb-6">
            Premium refill bottles, made to live on your desk.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-md">
            Borosilicate glass, soft-touch sage lid, weighted base. Quietly beautiful enough to
            keep close — practical enough to actually use every day.
          </p>
          <div className="space-y-3">
            {flavors.map((f) => (
              <div
                key={f.name}
                className="flex items-center justify-between p-4 rounded-2xl border border-border bg-secondary/40 hover:bg-secondary transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className={`size-8 rounded-full ${f.swatch} ring-1 ring-foreground/10`} />
                  <div>
                    <p className="font-semibold">{f.name}</p>
                    <p className="text-xs text-muted-foreground">{f.note}</p>
                  </div>
                </div>
                <span className="font-mono text-xs text-muted-foreground">30 refills</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const quotes = [
    {
      body: "I stopped pretending I could survive on a fourth coffee. VYTAL feels like the first thing that actually understood my afternoons.",
      name: "Marie L.",
      role: "Law student · Munich",
    },
    {
      body: "I’m picky about ingredients and I hate marketing fluff. The transparency is what made me trust it — the calm focus is what kept me.",
      name: "Sophie B.",
      role: "Product designer · Berlin",
    },
    {
      body: "It’s the only thing on my desk I look forward to refilling. Quiet, steady energy without feeling wired by 5pm.",
      name: "Max R.",
      role: "Master’s student · Vienna",
    },
  ];
  return (
    <section className="py-24 md:py-32 px-6 bg-secondary">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-16">
          <span className="font-mono text-xs text-primary mb-4 block">Real experiences</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold leading-[1.05]">
            From people, not influencers.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {quotes.map((q) => (
            <figure
              key={q.name}
              className="p-8 rounded-3xl bg-background border border-border flex flex-col gap-6"
            >
              <blockquote className="text-lg leading-relaxed text-foreground">
                “{q.body}”
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-3 pt-6 border-t border-border">
                <span className="size-9 rounded-full bg-primary/15 grid place-items-center text-xs font-semibold text-primary">
                  {q.name.charAt(0)}
                </span>
                <div>
                  <p className="text-sm font-semibold">{q.name}</p>
                  <p className="text-xs text-muted-foreground">{q.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function DailyLife() {
  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-12">
          <span className="font-mono text-xs text-primary mb-4 block">Daily life integration</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold leading-[1.05]">
            Made for the moments that actually need it.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {[
            { src: dailyStudy, label: "Library sessions", caption: "Long reads, quiet focus, no 3pm crash." },
            { src: dailyOffice, label: "Office afternoons", caption: "Steady clarity through back-to-back meetings." },
          ].map((s) => (
            <div key={s.label} className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-secondary">
              <img
                src={s.src}
                alt={s.label}
                loading="lazy"
                width={1024}
                height={1280}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/0 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-background">
                <p className="font-mono text-[11px] uppercase tracking-widest text-background/80 mb-1">
                  {s.label}
                </p>
                <p className="font-display text-xl font-semibold">{s.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Sustainability() {
  return (
    <section id="sustainability" className="py-24 md:py-32 px-6 border-y border-border">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-16">
        <div className="w-full md:w-1/2 aspect-[4/5] rounded-3xl overflow-hidden bg-secondary relative">
          <img
            src={refillMotion}
            alt="A hand dropping a VYTAL concentrate tablet into a glass bottle of water"
            loading="lazy"
            width={1024}
            height={1280}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="w-full md:w-1/2">
          <span className="font-mono text-xs text-primary mb-4 block">Impact</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold leading-[1.05] mb-8">
            90% less waste than traditional energy drinks.
          </h2>
          <div className="space-y-6">
            {[
              { t: "Infinite glass", d: "Borosilicate bottles designed to last years, not weeks." },
              { t: "Compostable refills", d: "Concentrates arrive in 100% plastic-free, water-soluble packaging." },
              { t: "Honest sourcing", d: "Transparent supply chain. Certified organic actives, no hidden additives." },
            ].map((b) => (
              <div key={b.t} className="flex gap-4">
                <div className="size-5 rounded-full border border-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold">{b.t}</p>
                  <p className="text-sm text-muted-foreground">{b.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section id="cta" className="py-32 md:py-40 px-6 text-center">
      <div className="max-w-2xl mx-auto">
        <span className="font-mono text-xs text-primary mb-6 block">No pressure. Just better energy.</span>
        <h2 className="font-display text-5xl md:text-6xl font-extrabold leading-[1.05] mb-8">
          Ready to find <br />your flow?
        </h2>
        <p className="text-muted-foreground text-lg mb-12">
          Join the people who quietly swapped burnout for balance. Start with a single bottle — refill forever.
        </p>
        <a
          href="#products"
          className="inline-flex items-center gap-3 bg-foreground text-background px-10 py-5 rounded-full text-lg font-semibold hover:bg-primary transition-all"
        >
          Get the VYTAL starter kit
          <span aria-hidden>→</span>
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="px-6 pb-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-widest text-muted-foreground border-t border-border pt-8">
        <span>© {new Date().getFullYear()} VYTAL — Energy that fits real life.</span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
          <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          <a href="#sustainability" className="hover:text-foreground transition-colors">Sustainability</a>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Struggles />
      <WhyDifferent />
      <Ingredients />
      <Products />
      <Testimonials />
      <DailyLife />
      <Sustainability />
      <FinalCTA />
      <Footer />
    </main>
  );
}
