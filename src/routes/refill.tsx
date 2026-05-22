import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import refillHero from "@/assets/refill-hero.jpg";
import refillTabletDrop from "@/assets/refill-tablet-drop.jpg";
import refillBubbles from "@/assets/refill-bubbles.jpg";
import refillWaste from "@/assets/refill-waste.jpg";
import refillLifestyle from "@/assets/refill-lifestyle.jpg";
import refillDispenser from "@/assets/refill-dispenser.jpg";
import { useEffect, useRef } from "react";

export const Route = createFileRoute("/refill")({
  head: () => ({
    meta: [
      { title: "Refill, not repeat — VYTAL" },
      { name: "description", content: "A calmer system for modern energy. Small rituals. Less waste. More intention." },
      { property: "og:title", content: "Refill, not repeat — VYTAL" },
      { property: "og:description", content: "A calming refill ritual designed for slower routines and less disposable habits." },
    ],
  }),
  component: RefillPage,
});

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useParallax(ref: React.RefObject<HTMLElement | null>, speed = 0.2) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * speed;
        el.style.transform = `translate3d(0, ${-offset}px, 0)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [ref, speed]);
}

function RefillPage() {
  useReveal();
  const heroImgRef = useRef<HTMLImageElement | null>(null);
  const bubblesRef = useRef<HTMLDivElement | null>(null);
  useParallax(heroImgRef as React.RefObject<HTMLElement | null>, 0.12);
  useParallax(bubblesRef as React.RefObject<HTMLElement | null>, 0.18);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SiteHeader />

      {/* HERO — cinematic fullscreen */}
      <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-foreground text-background">
        <img
          ref={heroImgRef}
          src={refillHero}
          alt="Glass bottle filled with clear water, soft warm light"
          className="absolute inset-0 w-full h-full object-cover scale-110 opacity-90 will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-foreground/10 to-foreground/80" />
        <div className="absolute inset-0 grain" />

        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-10 flex flex-col justify-between py-24">
          <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] uppercase text-background/70">
            <span className="size-1.5 rounded-full bg-accent animate-float" />
            The refill system — Chapter 01
          </div>

          <div className="max-w-4xl">
            <h1 className="font-display text-[14vw] md:text-[8.5vw] leading-[0.92] font-extrabold tracking-tighter">
              Refill,<br/>
              <span className="italic font-light text-background/85">not repeat.</span>
            </h1>
            <p className="mt-8 max-w-md text-background/75 text-base md:text-lg leading-relaxed">
              A calmer system for modern energy. Designed for slower routines and
              less disposable habits.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#ritual" className="inline-flex bg-background text-foreground px-7 py-3.5 rounded-full font-medium hover:bg-accent transition-all">
                Explore the ritual
              </a>
              <Link to="/shop" className="inline-flex border border-background/40 text-background px-7 py-3.5 rounded-full font-medium hover:bg-background/10 transition-all">
                Shop the system
              </Link>
            </div>
          </div>

          <div className="flex items-end justify-between text-background/60 text-xs font-mono">
            <span>Scroll to begin</span>
            <span className="hidden md:block max-w-xs text-right text-background/55 italic">
              "A small object. A quieter loop."
            </span>
          </div>
        </div>
      </section>

      {/* THE PROBLEM — compressed, tense */}
      <section className="relative bg-foreground text-background px-6 md:px-10 py-32 md:py-44 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img src={refillWaste} alt="" aria-hidden className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/60 to-foreground/20" />
        </div>
        <div className="relative max-w-5xl mx-auto">
          <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-background/60 reveal">Chapter 02 — the cycle</span>
          <h2 className="reveal mt-6 font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] text-balance">
            Energy<br/>shouldn't<br/>feel <span className="italic font-light">disposable.</span>
          </h2>
          <div className="reveal mt-16 grid md:grid-cols-3 gap-6 max-w-4xl text-background/70">
            <p className="text-sm leading-relaxed">
              <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-background/40 mb-3">Single use</span>
              Most energy drinks are mostly water — sold once, drunk once, thrown out once.
            </p>
            <p className="text-sm leading-relaxed">
              <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-background/40 mb-3">Overstimulation</span>
              The packaging is loud. The marketing is louder. The routine is the loudest.
            </p>
            <p className="text-sm leading-relaxed">
              <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-background/40 mb-3">Quiet alternative</span>
              Maybe energy shouldn't shout. Maybe it should ask less of you, and of the planet.
            </p>
          </div>
        </div>
      </section>

      {/* THE RITUAL — signature cinematic sequence */}
      <section id="ritual" className="relative bg-background overflow-hidden">
        <div className="px-6 md:px-10 pt-32 md:pt-44 pb-12 max-w-7xl mx-auto">
          <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-primary reveal">Chapter 03 — the ritual</span>
          <h2 className="reveal mt-6 font-display text-5xl md:text-7xl font-bold leading-[0.95] max-w-3xl text-balance">
            Small rituals. <span className="italic font-light text-muted-foreground">Less waste. More intention.</span>
          </h2>
        </div>

        {/* Step strip */}
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-12 items-center pb-24">
          <div ref={bubblesRef} className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-secondary will-change-transform">
            <img src={refillTabletDrop} alt="Tablet dropping into water with bubbles" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />
          </div>
          <ol className="space-y-12">
            {[
              { n: "01", t: "Open", d: "A slow unscrew. A pause before the day begins." },
              { n: "02", t: "Drop", d: "One compact tablet meets still, clear water." },
              { n: "03", t: "Dissolve", d: "Bubbles rise. Color softens. The bottle exhales." },
              { n: "04", t: "Drink", d: "Calm focus, carried with you. No can. No waste." },
            ].map((s) => (
              <li key={s.n} className="reveal grid grid-cols-[auto_1fr] gap-6 items-start border-t border-border pt-6">
                <span className="font-mono text-xs text-primary tracking-[0.2em]">{s.n}</span>
                <div>
                  <h3 className="font-display text-3xl md:text-4xl font-semibold mb-2">{s.t}</h3>
                  <p className="text-muted-foreground max-w-sm">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Fullscreen bubble moment */}
        <div className="relative h-[80svh] min-h-[520px] w-full overflow-hidden">
          <img src={refillBubbles} alt="Bubbles rising through calm water" className="absolute inset-0 w-full h-full object-cover scroll-rise" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
          <div className="relative h-full flex items-center justify-center px-6 text-center">
            <p className="reveal font-display text-4xl md:text-7xl font-light italic text-background drop-shadow-lg max-w-3xl leading-[1.05]">
              "Designed to slow the cycle down."
            </p>
          </div>
        </div>
      </section>

      {/* SYSTEM EXPLANATION — editorial */}
      <section className="px-6 md:px-10 py-32 md:py-44 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 reveal lg:sticky lg:top-24">
            <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-primary">Chapter 04 — the system</span>
            <h2 className="mt-6 font-display text-4xl md:text-5xl font-bold leading-[1]">
              One bottle.<br/>Many quiet refills.
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              The VYTAL system replaces the can with a ritual you actually want to repeat.
              Tablets, water, glass. Nothing more.
            </p>
          </div>
          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-5">
            {[
              { t: "Compact tablets", d: "85% less volume than a canned drink. No water shipped around the country." },
              { t: "Reusable vessel", d: "Glass, steel, soft-touch silicone. Built to be opened thousands of times." },
              { t: "Calibrated dosing", d: "One tablet per fill. No measuring spoons, no guesswork, no overstimulation." },
              { t: "Refill anywhere", d: "Tap water, sparkling water, your favourite café. The ritual travels with you." },
              { t: "Traceable sourcing", d: "L-Theanine, Ashwagandha, Lion's Mane. Every batch documented." },
              { t: "Quietly designed", d: "No loud branding. The object stays beautiful on the desk you live at." },
            ].map((c) => (
              <article key={c.t} className="reveal rounded-3xl border border-border bg-secondary/40 p-7 hover:bg-secondary transition-colors duration-500">
                <h3 className="font-display text-xl font-semibold mb-2">{c.t}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* MATERIALS & DESIGN — luxury object */}
      <section className="relative bg-secondary/60 overflow-hidden">
        <div className="px-6 md:px-10 py-32 md:py-44 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-background order-2 lg:order-1">
            <img src={refillDispenser} alt="Refilling a frosted glass bottle" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 ring-1 ring-inset ring-foreground/5 rounded-[2rem]" />
          </div>
          <div className="order-1 lg:order-2 reveal">
            <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-primary">Chapter 05 — materials</span>
            <h2 className="mt-6 font-display text-4xl md:text-6xl font-bold leading-[1] text-balance">
              An object you<br/>want to keep.
            </h2>
            <p className="mt-6 text-muted-foreground text-lg leading-relaxed max-w-md">
              Borosilicate glass. Brushed stainless. Cork. Soft silicone. Materials chosen
              the way you'd choose a notebook you write in every day.
            </p>
            <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 max-w-md">
              {[
                ["Glass", "Borosilicate, taste-neutral"],
                ["Cap", "Brushed 304 stainless"],
                ["Grip", "Soft-touch silicone"],
                ["Weight", "318 g · balanced"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{k}</dt>
                  <dd className="mt-2 font-display text-lg">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* REAL LIFE INTEGRATION */}
      <section className="px-6 md:px-10 py-32 md:py-44 max-w-7xl mx-auto">
        <div className="max-w-3xl mb-16 reveal">
          <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-primary">Chapter 06 — everyday</span>
          <h2 className="mt-6 font-display text-4xl md:text-6xl font-bold leading-[1]">
            Small rituals,<br/><span className="italic font-light text-muted-foreground">in real rooms.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-12 gap-6">
          <figure className="reveal md:col-span-8 relative aspect-[16/10] rounded-3xl overflow-hidden bg-secondary">
            <img src={refillLifestyle} alt="Frosted bottle on a stone surface beside an open notebook" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            <figcaption className="absolute bottom-6 left-6 right-6 text-background drop-shadow font-display text-2xl md:text-3xl italic font-light max-w-sm">
              "It just lives on my desk now."
            </figcaption>
          </figure>
          <div className="md:col-span-4 grid gap-6">
            {[
              { t: "The morning desk", d: "Before the laptop opens. One fill, one quiet minute." },
              { t: "The library carry", d: "Refilled at the fountain. No queue, no can." },
              { t: "The late evening", d: "Half a tablet. Wind down without crashing out." },
            ].map((m) => (
              <article key={m.t} className="reveal rounded-3xl border border-border p-6 bg-background">
                <h3 className="font-display text-lg font-semibold">{m.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{m.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TRANSPARENCY — quiet, not preachy */}
      <section className="bg-foreground text-background px-6 md:px-10 py-28 md:py-36">
        <div className="max-w-5xl mx-auto reveal">
          <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-accent">Chapter 07 — what we mean by less</span>
          <h2 className="mt-6 font-display text-3xl md:text-5xl font-light leading-[1.1] max-w-3xl">
            We measure what we change.<br/>
            <span className="italic">We don't decorate the rest.</span>
          </h2>
          <div className="mt-16 grid sm:grid-cols-3 gap-6">
            {[
              { n: "−85%", l: "Less shipping volume per drink vs. canned energy." },
              { n: "1×", l: "One bottle, used thousands of times. Built for that." },
              { n: "100%", l: "Ingredient lots traceable to source and harvest." },
            ].map((s) => (
              <div key={s.n} className="border-t border-background/15 pt-6">
                <div className="font-display text-5xl md:text-6xl font-light tracking-tighter">{s.n}</div>
                <p className="mt-3 text-sm text-background/65 max-w-xs">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA — reflective */}
      <section className="relative px-6 md:px-10 py-40 md:py-56 text-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 size-[60vmax] rounded-full bg-accent/30 blur-3xl animate-drift" />
          <div className="absolute bottom-0 right-0 size-[40vmax] rounded-full bg-primary/20 blur-3xl animate-float" />
        </div>
        <div className="max-w-3xl mx-auto reveal">
          <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-primary">Built calmly. On purpose.</span>
          <h2 className="mt-8 font-display text-5xl md:text-7xl font-extrabold leading-[0.95] tracking-tighter text-balance">
            A refill system<br/>for modern <span className="italic font-light">overstimulation.</span>
          </h2>
          <p className="mt-10 text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
            (Re)Fuel your day. Not the planet. Start with one bottle and one tablet —
            the rest is just repetition you'll come to enjoy.
          </p>
          <div className="mt-12 flex flex-wrap gap-3 justify-center">
            <Link to="/shop" className="inline-flex bg-foreground text-background px-8 py-4 rounded-full font-medium hover:bg-primary transition-all">
              Shop the system
            </Link>
            <Link to="/journal" className="inline-flex border border-foreground/20 text-foreground px-8 py-4 rounded-full font-medium hover:bg-foreground hover:text-background transition-all">
              Start your ritual
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
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