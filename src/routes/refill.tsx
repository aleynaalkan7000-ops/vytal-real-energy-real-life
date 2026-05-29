import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import refillHero from "@/assets/refill-hero.jpg";
import refillTabletDrop from "@/assets/refill-tablet-drop.jpg";
import refillBubbles from "@/assets/refill-bubbles.jpg";
import refillWaste from "@/assets/refill-waste.jpg";
import refillLifestyle from "@/assets/refill-lifestyle.jpg";
import refillDispenser from "@/assets/refill-dispenser.jpg";
import aluHeroImg from "@/assets/alu-hero.jpg";
import aluDispenseImg from "@/assets/alu-dispense.jpg";
import aluLoopImg from "@/assets/alu-loop.jpg";
import { useEffect, useRef } from "react";
import {
  PackageOpen,
  FlaskConical,
  Recycle,
} from "lucide-react";

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
                A refill-based alternative to disposable energy drinks — concentrated tablets,
                a reusable bottle, and a return loop designed to waste less from the start.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#ritual" className="inline-flex bg-background text-foreground px-7 py-3.5 rounded-full font-medium hover:bg-accent transition-all">
                Explore the ritual
              </a>
              <Link to="/shop" hash="starter" className="inline-flex border border-background/40 text-background px-7 py-3.5 rounded-full font-medium hover:bg-background/10 transition-all">
                Build your ritual
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
              Most ready-to-drink energy products ship mostly water in single-use cans — bought once, consumed once, discarded once.
            </p>
            <p className="text-sm leading-relaxed">
              <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-background/40 mb-3">Overstimulation</span>
              Classic energy culture often sells intensity: high sugar, loud branding, fast consumption and a crash built into the routine.
            </p>
            <p className="text-sm leading-relaxed">
              <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-background/40 mb-3">Quiet alternative</span>
              VYTAL changes the format: one reusable bottle, compact refills, and a calmer way to build energy into everyday life.
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
              We built the system around refill stations first: fill your home container with tablets,
              or get one tablet and water directly into your bottle for a ready-to-go drink.
              For days without station access, online refills arrive in reusable deposit cylinders.
            </p>
            <div className="mt-16 flex justify-center">
            <Link 
              to="/shop" 
              hash="starter" 
              className="inline-flex bg-foreground text-background px-8 py-4 rounded-full font-medium hover:bg-primary transition-all shadow-lg"
            >
              Try our Starter-Kit now →
            </Link>
          </div>
          </div>

          <div className="lg:col-span-8">
  <div className="grid md:grid-cols-3 gap-5">
    {[
      {
        n: "01",
        title: "Stock at home",
        text: "Refill your home container with tablets at the station. Store them safely, use them whenever you need one.",
        icon: "station",
      },
      {
        n: "02",
        title: "Drink on the go",
        text: "Place your bottle in the station. Choose a flavour, still or sparkling water, and leave with a ready drink.",
        icon: "bottle",
      },
      {
        n: "03",
        title: "Order when busy",
        text: "If no station is nearby, order refill cylinders online. Send empties back so we can clean and reuse them.",
        icon: "loop",
      },
    ].map((step) => (
      <article
        key={step.n}
        className="group relative overflow-hidden rounded-3xl border border-border bg-secondary/40 p-7 min-h-[340px] transition-all duration-700 hover:-translate-y-1 hover:bg-secondary"
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />

        <div className="relative z-10 h-full flex flex-col justify-between">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
              {step.n}
            </span>

              <div className="mt-8 h-28 flex items-center justify-center">
                {step.icon === "station" && (
                  <PackageOpen className="size-16 text-primary/70 stroke-[1.5]" />
                )}

                {step.icon === "bottle" && (
                  <FlaskConical className="size-16 text-primary/70 stroke-[1.5]" />
                )}

                {step.icon === "loop" && (
                  <Recycle className="size-16 text-primary/70 stroke-[1.5]" />
                )}
              </div>
              
            <h3 className="mt-6 font-display text-2xl font-semibold">
              {step.title}
            </h3>

            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              {step.text}
            </p>
          </div>

          <div className="mt-8 flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            <span className="h-px flex-1 bg-border" />
            <span>Refill · Reuse</span>
          </div>
        </div>
      </article>
    ))}
  </div>
</div>
        </div>
      </section>

      {/* MATERIALS & DESIGN — luxury object */}
      <section id="cylinder-details" className="relative bg-secondary/60 overflow-hidden">
        {/* THE ALU CYLINDER — system object */}
        <div className="px-6 md:px-10 pt-32 md:pt-44 pb-8 max-w-7xl mx-auto reveal">
          <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-primary">
            Interlude — the cylinder
          </span>
          <h2 className="mt-6 font-display text-4xl md:text-6xl font-bold leading-[1] text-balance max-w-3xl">
            The cylinder that<br/>
            <span className="italic font-light text-muted-foreground">closes the loop.</span>
          </h2>
        </div>

        <div className="px-6 md:px-10 pb-24 md:pb-32 max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 items-stretch">
          <a
            href="/shop#cylinder"
            className="group lg:col-span-7 relative aspect-[4/5] lg:aspect-auto lg:min-h-[560px] overflow-hidden rounded-3xl bg-[#f3ede2] reveal"
          >
            <img
              src={aluHeroImg}
              alt="Matte aluminum VYTAL refill cylinder in warm natural light"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]"
            />
            {/* Das rote Label ist weg! */}
            <span className="absolute bottom-6 right-6 inline-flex items-center gap-2 bg-foreground text-background px-5 py-3 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
              Why it's included →
            </span>
          </a>

          <div className="lg:col-span-5 flex flex-col justify-between gap-10 reveal">
            <div>
              <p className="font-display text-2xl md:text-3xl leading-snug">
                One press. One tablet. <span className="text-muted-foreground">Hygienic, airtight, and built to come back to us — not the bin.</span>
              </p>
              <ul className="mt-10 space-y-5">
                {[
                  ["Format", "108 mm · 38 g. Holds exactly 8 functional tablets. Built for pockets, bags, or desks."],
                  ["Material", "Aerospace-grade aluminum, anodized for a matte, tactile finish."],
                  ["Seal", "Air- and moisture-tight silicone. Tablets stay clean, dry, and untouched."],
                  ["Returnable", "Return empty cylinders to us. We clean, check and reuse them in the next cycle."],
                ].map(([t, d]) => (
                  <li key={t} className="grid grid-cols-[120px_1fr] gap-4 border-t border-foreground/10 pt-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary mt-1">{t}</span>
                    <p className="text-sm text-muted-foreground leading-relaxed">{d}</p>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <a 
                href="/shop#loop" 
                className="inline-flex bg-foreground text-background px-6 py-3 rounded-full text-sm font-medium hover:bg-primary transition-colors"
              >
                How the loop works →
              </a>
              <a 
                href="/shop#refills" 
                className="inline-flex border border-foreground/15 px-6 py-3 rounded-full text-sm font-medium hover:bg-background transition-colors"
              >
                See refill packs
              </a>
            </div>
          </div>
        </div>

        {/* WHY TABLETS — useful sustainability logic */}
<div className="px-6 md:px-10 pb-24 md:pb-32 max-w-7xl mx-auto">
  <div className="grid lg:grid-cols-12 gap-12 items-start">
    <div className="lg:col-span-5 reveal">
      <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-primary">
        Chapter 05 — why tablets
      </span>

      <h3 className="mt-5 font-display text-4xl md:text-6xl font-bold leading-[0.98] text-balance">
        Why ship water<br />
        <span className="italic font-light text-muted-foreground">
          across the country?
        </span>
      </h3>

      <p className="mt-6 text-muted-foreground leading-relaxed max-w-xl">
        Most ready-to-drink energy products are mostly water. We separate the drink
        from the transport: you add local water, we only move the functional part.
      </p>
    </div>

    <div className="lg:col-span-7 grid md:grid-cols-3 gap-4">
      {[
        {
          tag: "01",
          title: "Less transport volume",
          body: "Compact tablets take up far less space than ready-made drinks in cans or bottles.",
        },
        {
          tag: "02",
          title: "Less disposable material",
          body: "One bottle stays with you instead of buying a new single-use container for every drink.",
        },
        {
          tag: "03",
          title: "Water already exists nearby",
          body: "At home, on campus, at work or at a station — water does not need to be shipped again and again.",
        },
      ].map((c) => (
        <article
          key={c.tag}
          className="rounded-3xl border border-foreground/10 bg-background p-7 hover:bg-secondary/40 transition-colors duration-500"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
            {c.tag}
          </span>

          <h4 className="mt-4 font-display text-lg font-semibold">
            {c.title}
          </h4>

          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            {c.body}
          </p>
        </article>
      ))}
    </div>
  </div>
</div>

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
              The bottle is designed as a long-term object instead of disposable packaging.
              Borosilicate glass keeps the flavor clean and neutral, while stainless steel
              and aluminum were chosen for durability, repeated daily use and long material lifecycles.
            </p>
            <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 max-w-md">
              {[
                ["Glass", "Borosilicate · taste-neutral · durable daily use"],
                ["Steel", "304 stainless steel · corrosion-resistant"],
                ["Cylinder", "Anodized aluminum · reused through the deposit loop"],
                ["Weight", "318 g · balanced for everyday carry"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {k}
                  </dt>

                  <dd className="mt-2 font-display text-lg">
                    {v}
                  </dd>
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
              { t: "Home refill", d: "Open the container, press one tablet, add water." },
              { t: "Station stop", d: "Refill on campus, at the supermarket or on the way home." },
              { t: "Online backup", d: "When life gets busy, cylinders arrive at home and return later." },
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
            A calmer way <br></br> <span className="italic font-light">to refill energy.</span>
          </h2>
          <p className="mt-10 text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
            (Re)Fuel your day. Not the planet. Start with one bottle and one tablet —
            the rest is just repetition you'll come to enjoy.
          </p>
          <div className="mt-12 flex flex-wrap gap-3 justify-center">
            <Link to="/shop" hash="starter" id="bottle"  className="inline-flex bg-foreground text-background px-8 py-4 rounded-full font-medium hover:bg-primary transition-all">
              Explore the bottle
            </Link>
            <Link to="/journal" id="packs" className="inline-flex border border-foreground/20 text-foreground px-8 py-4 rounded-full font-medium hover:bg-foreground hover:text-background transition-all">
             Dive into the flavours
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
