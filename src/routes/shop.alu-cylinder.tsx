import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useCart } from "@/contexts/cart-context";
import aluHero from "@/assets/alu-hero.jpg";
import aluMacro from "@/assets/alu-macro.jpg";
import aluDispense from "@/assets/alu-dispense.jpg";
import aluDesk from "@/assets/alu-desk.jpg";
import aluLoop from "@/assets/alu-loop.jpg";

export const Route = createFileRoute("/shop/alu-cylinder")({
  head: () => ({
    meta: [
      { title: "Alu Refill Cylinder — VYTAL · Energy, refined." },
      { name: "description", content: "A reusable matte aluminum refill cylinder for VYTAL. One press, one tablet. Hygienic, portable, designed for everyday calm." },
      { property: "og:title", content: "Alu Refill Cylinder — VYTAL · Energy, refined." },
      { property: "og:description", content: "A reusable refill system designed for everyday life. One press. No wasteful routines." },
      { property: "og:image", content: aluHero },
      { name: "twitter:image", content: aluHero },
    ],
  }),
  component: AluCylinderPage,
});

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.14 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const colorways = [
  { id: "silver", label: "Brushed silver", swatch: "bg-[#c8c6c1]", ring: "ring-[#c8c6c1]" },
  { id: "sage", label: "Anodized sage", swatch: "bg-primary/70", ring: "ring-primary/70" },
  { id: "graphite", label: "Soft graphite", swatch: "bg-foreground/80", ring: "ring-foreground/80" },
  { id: "sand", label: "Warm sand", swatch: "bg-clay", ring: "ring-clay" },
];

function AluCylinderPage() {
  useReveal();
  const { add } = useCart();
  const [color, setColor] = useState("silver");
  const heroRef = useRef<HTMLImageElement>(null);
  const [pressed, setPressed] = useState(false);

  // gentle parallax on hero
  useEffect(() => {
    const onScroll = () => {
      const el = heroRef.current;
      if (!el) return;
      const y = window.scrollY;
      el.style.transform = `translate3d(0, ${y * 0.12}px, 0) scale(1.05)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleAdd = () => {
    add({
      id: `alu-cylinder-${color}`,
      name: "VYTAL Alu Refill Cylinder",
      variant: colorways.find((c) => c.id === color)?.label ?? color,
      image: aluHero,
      unitPrice: 24,
      href: "/shop/alu-cylinder",
    });
  };

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SiteHeader />

      {/* HERO — cinematic, slow */}
      <section className="relative min-h-[100svh] flex items-end overflow-hidden bg-[#f3ede2]">
        <img
          ref={heroRef}
          src={aluHero}
          alt="Matte aluminum VYTAL refill cylinder on a warm stone surface in soft natural light"
          width={1600}
          height={1920}
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f3ede2] via-[#f3ede2]/10 to-transparent" />
        <div className="absolute inset-0 grain opacity-40" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 pb-16 md:pb-24 pt-32 grid md:grid-cols-12 gap-8">
          <div className="md:col-span-7">
            <Link to="/shop" className="font-mono text-[11px] uppercase tracking-[0.32em] text-foreground/60 hover:text-foreground transition-colors">
              ← Back to shop
            </Link>
            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.32em] text-primary reveal">
              The system object · Volume 04
            </p>
            <h1 className="mt-5 font-display text-[clamp(3rem,9vw,8rem)] font-extrabold leading-[0.92] tracking-tighter text-balance reveal">
              Energy,<br/><em className="not-italic font-light italic text-foreground/70">refined.</em>
            </h1>
            <p className="mt-8 max-w-lg text-lg text-foreground/75 leading-relaxed reveal">
              A reusable matte aluminum refill cylinder. One press. One tablet.
              A small, satisfying object designed for everyday life — not for the bin.
            </p>
          </div>
          <div className="md:col-span-5 self-end font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/55 max-w-xs ml-auto text-right reveal">
            <p>108 mm · 38 g · holds 12 refills</p>
            <p className="mt-2">Aerospace-grade aluminum · airtight</p>
          </div>
        </div>
      </section>

      {/* CONFIGURE + PRICE STRIP */}
      <section className="sticky top-16 z-30 bg-background/90 backdrop-blur-xl border-y border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-5 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground hidden sm:block">Finish</span>
            <div className="flex gap-2">
              {colorways.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setColor(c.id)}
                  aria-label={c.label}
                  className={`relative size-9 rounded-full ${c.swatch} transition-all ring-offset-2 ring-offset-background ${color === c.id ? `ring-2 ${c.ring}` : "ring-0 hover:scale-110"}`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground hidden md:inline">
              {colorways.find((c) => c.id === color)?.label}
            </span>
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <div className="text-right">
              <p className="font-display text-2xl leading-none">€24</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-1">
                or 5×€20 with subscription
              </p>
            </div>
            <button
              onClick={handleAdd}
              className="bg-foreground text-background rounded-full px-6 py-3 text-sm font-medium hover:bg-primary transition-colors"
            >
              Add to cart
            </button>
          </div>
        </div>
      </section>

      {/* QUIET STATEMENT */}
      <section className="px-6 md:px-10 max-w-4xl mx-auto py-32 md:py-44 text-center">
        <p className="reveal font-display text-3xl md:text-5xl leading-[1.15] tracking-tight text-balance">
          A refill system <span className="text-muted-foreground">designed for</span>
          <br className="hidden md:block" /> everyday life.
        </p>
        <p className="reveal mt-8 max-w-xl mx-auto text-muted-foreground leading-relaxed">
          We're not pretending to be zero-waste. We are quietly trying to ask less of the planet —
          and more of the object you already carry every day.
        </p>
      </section>

      {/* INTERACTIVE MECHANISM */}
      <section className="px-6 md:px-10 max-w-7xl mx-auto pb-32 md:pb-44 grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        <div className="lg:col-span-6 order-2 lg:order-1 reveal">
          <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-primary">01 · The press</span>
          <h2 className="mt-5 font-display text-4xl md:text-6xl font-bold leading-[0.98] tracking-tight">
            One press.<br/>
            <span className="italic font-light text-muted-foreground">One tablet. No mess.</span>
          </h2>
          <p className="mt-8 text-muted-foreground leading-relaxed max-w-md">
            Hold the cylinder over the opening of your VYTAL bottle. Press once.
            A single tablet drops in — hygienically, never touched, never crumbled.
          </p>
          <ol className="mt-10 space-y-5 max-w-md">
            {[
              ["Align", "Sits flush on every VYTAL bottle neck."],
              ["Press", "A precise click. One tablet released."],
              ["Lift", "Cylinder reseals airtight. Tablets stay dry."],
            ].map(([t, d], i) => (
              <li key={t} className="flex gap-5 items-start border-t border-border pt-5">
                <span className="font-mono text-xs text-primary tracking-[0.2em] mt-1">0{i + 1}</span>
                <div>
                  <p className="font-display text-lg font-semibold">{t}</p>
                  <p className="text-sm text-muted-foreground mt-1">{d}</p>
                </div>
              </li>
            ))}
          </ol>

          <button
            onClick={() => {
              setPressed(true);
              setTimeout(() => setPressed(false), 1400);
            }}
            className="group mt-12 inline-flex items-center gap-3 border border-foreground/15 px-6 py-3 rounded-full text-sm font-medium hover:bg-secondary transition-colors"
          >
            <span className={`size-2 rounded-full bg-primary transition-transform duration-500 ${pressed ? "scale-150" : ""}`} />
            Feel the click
          </button>
        </div>

        <div className="lg:col-span-6 order-1 lg:order-2 reveal">
          <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-[#f1ece1]">
            <img
              src={aluDispense}
              alt="A tablet falling from the matte aluminum cylinder into a sage VYTAL glass bottle"
              loading="lazy"
              width={1080}
              height={1350}
              className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.32,0.72,0,1)] ${pressed ? "scale-[1.04]" : "scale-100"}`}
            />
            <div className={`absolute inset-0 bg-foreground/0 transition-colors duration-700 ${pressed ? "bg-foreground/5" : ""}`} />
          </div>
        </div>
      </section>

      {/* MATERIAL — full bleed */}
      <section className="relative bg-foreground text-background overflow-hidden">
        <div className="grid lg:grid-cols-2">
          <div className="relative aspect-[16/12] lg:aspect-auto lg:min-h-[680px] overflow-hidden">
            <img src={aluMacro} alt="Macro detail of the brushed aluminum surface and circular press button" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <div className="px-6 md:px-12 lg:px-16 py-24 md:py-32 lg:py-44 flex flex-col justify-center">
            <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-accent reveal">02 · Material</span>
            <h2 className="reveal mt-5 font-display text-4xl md:text-6xl font-bold leading-[0.98] tracking-tight">
              Hygienic by<br/><span className="italic font-light text-background/70">design.</span>
            </h2>
            <p className="reveal mt-8 text-background/70 leading-relaxed max-w-md">
              The shell is air- and moisture-tight. No fingerprints on tablets, no
              crumbling, no humidity creeping in. Aluminum, because it's light, it's
              recyclable, and it lasts.
            </p>
            <dl className="reveal mt-14 grid grid-cols-2 gap-x-8 gap-y-8 max-w-md">
              {[
                ["Shell", "6061 aluminum · matte anodized"],
                ["Seal", "Food-grade silicone gasket"],
                ["Mechanism", "Precision stainless click"],
                ["Capacity", "12 tablets per cylinder"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-background/45">{k}</dt>
                  <dd className="mt-2 font-display text-base">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* CIRCULAR SYSTEM */}
      <section className="relative px-6 md:px-10 py-32 md:py-44 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 reveal lg:sticky lg:top-28">
            <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-primary">03 · The loop</span>
            <h2 className="mt-5 font-display text-4xl md:text-6xl font-bold leading-[0.98] tracking-tight">
              Five empty.<br/>
              <span className="italic font-light text-muted-foreground">Send them back.</span>
            </h2>
            <p className="mt-8 text-muted-foreground leading-relaxed max-w-md">
              When you've collected five empty cylinders, drop them unfranked into any
              postbox. They return to us, get sterilized, refilled and re-released into
              the loop. Significantly less waste — without pretending to be perfect.
            </p>
            <p className="mt-6 text-sm text-muted-foreground/80 max-w-md">
              Roughly 85% less shipping volume vs. canned drinks. Roughly zero plastic
              wrappers. Honest numbers — published every quarter.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="relative aspect-[16/10] overflow-hidden rounded-md mb-6 reveal">
              <img src={aluLoop} alt="Five empty matte aluminum cylinders arranged in a row" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <ol className="grid sm:grid-cols-2 gap-4">
              {[
                { n: "01", t: "Carry & use", d: "Use the cylinder daily. Refill your bottle anywhere." },
                { n: "02", t: "Collect five", d: "When five are empty, slip them into the return pouch." },
                { n: "03", t: "Send back", d: "Drop into any postbox. Pre-paid, unfranked. No app." },
                { n: "04", t: "Re-released", d: "We sterilize, inspect, refill. Back into the system." },
              ].map((s) => (
                <li key={s.n} className="reveal rounded-2xl border border-border bg-secondary/40 p-6 hover:bg-secondary transition-colors duration-500">
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">{s.n}</span>
                  <p className="mt-3 font-display text-lg font-semibold">{s.t}</p>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* DESK / LIFESTYLE */}
      <section className="relative overflow-hidden">
        <div className="relative h-[80svh] min-h-[560px] w-full">
          <img src={aluDesk} alt="A calm desk with notebook, ceramic cup, the aluminum cylinder and a small sage bottle in warm morning light" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/20" />
        </div>
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto w-full px-6 md:px-10 pb-16 md:pb-24">
            <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-background reveal">04 · A desk object</span>
            <h2 className="reveal mt-5 font-display text-4xl md:text-6xl font-bold leading-[0.98] tracking-tight max-w-2xl text-background drop-shadow">
              An object that stays<br/>
              <span className="italic font-light">on the desk.</span>
            </h2>
            <p className="reveal mt-6 max-w-md text-background/85 leading-relaxed">
              Quiet enough to live next to your notebook. Considered enough to
              feel like the things you'd bring on the move.
            </p>
          </div>
        </div>
      </section>

      {/* ONLINE × STATIONS — honest positioning */}
      <section className="px-6 md:px-10 py-32 md:py-44 max-w-7xl mx-auto">
        <div className="max-w-3xl mb-16 reveal">
          <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-primary">05 · Honest about it</span>
          <h2 className="mt-5 font-display text-4xl md:text-6xl font-bold leading-[1] text-balance">
            Stations long-term.<br/>
            <span className="italic font-light text-muted-foreground">Online for real life.</span>
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed max-w-xl">
            Local refill stations are the long arc — what we're building toward.
            Online refills exist because real life moves, and a system you can't actually
            use is just decoration. Both routes feed the same cylinder.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <article className="reveal rounded-3xl border border-border bg-secondary/40 p-8 md:p-10">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">Stations</span>
            <h3 className="mt-4 font-display text-2xl font-semibold">The long-term ecosystem</h3>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Walk in, refill the cylinder directly, walk out. Zero shipping.
              Rolling out city by city — slowly, on purpose.
            </p>
          </article>
          <article className="reveal rounded-3xl border border-border bg-background p-8 md:p-10">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">Online refills</span>
            <h3 className="mt-4 font-display text-2xl font-semibold">For wherever you actually are</h3>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Compact refill packs shipped in concentrated form — no water trucked
              around the country. Subscription pauses any time.
            </p>
          </article>
        </div>
      </section>

      {/* FINAL — calm CTA */}
      <section className="relative px-6 md:px-10 py-40 md:py-56 text-center overflow-hidden bg-secondary/40">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 size-[60vmax] rounded-full bg-primary/15 blur-3xl animate-drift" />
          <div className="absolute bottom-0 right-0 size-[40vmax] rounded-full bg-accent/15 blur-3xl animate-float" />
        </div>
        <div className="max-w-3xl mx-auto reveal">
          <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-primary">A small object. A quieter loop.</span>
          <h2 className="mt-8 font-display text-5xl md:text-7xl font-extrabold leading-[0.95] tracking-tighter text-balance">
            One press.<br/>
            <span className="italic font-light text-muted-foreground">No wasteful routines.</span>
          </h2>
          <div className="mt-12 flex flex-wrap gap-3 justify-center">
            <button
              onClick={handleAdd}
              className="inline-flex bg-foreground text-background px-8 py-4 rounded-full font-medium hover:bg-primary transition-all"
            >
              Add cylinder — €24
            </button>
            <Link to="/refill" className="inline-flex border border-foreground/20 text-foreground px-8 py-4 rounded-full font-medium hover:bg-foreground hover:text-background transition-all">
              Explore the system
            </Link>
            <Link to="/shop" className="inline-flex px-8 py-4 rounded-full font-medium text-muted-foreground hover:text-foreground transition-colors">
              Back to shop →
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
