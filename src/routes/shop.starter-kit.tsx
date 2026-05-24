import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { products } from "@/lib/vytal-products";
import { useCart, formatPrice } from "@/contexts/cart-context";
import shopStarterKit from "@/assets/shop-starter-kit.png";
import shopRitualDesk from "@/assets/shop-ritual-desk.jpg";
import shopHeroBottle from "@/assets/shop-hero-bottle.png";
import aluHero from "@/assets/alu-hero.jpg";
import aluDispense from "@/assets/alu-dispense.jpg";

export const Route = createFileRoute("/shop/starter-kit")({
  head: () => ({
    meta: [
      { title: "The VYTAL Starter Kit — Begin the refill ritual." },
      { name: "description", content: "The complete entry into the VYTAL refill ecosystem: glass bottle, reusable aluminum cylinder, all six functional flavors, linen sleeve and ritual card. Deposit included." },
      { property: "og:title", content: "The VYTAL Starter Kit — Begin the refill ritual." },
      { property: "og:description", content: "Start the refill ritual. All six flavors, the reusable cylinder, the loop — one calm box." },
      { property: "og:image", content: shopStarterKit },
    ],
  }),
  component: StarterKitPage,
});

const KIT_PRICE = 68;

const includedItems = [
  { t: "Glass refill bottle", d: "Borosilicate, soft-touch sleeve, hand-balanced.", img: "" },
  { t: "Aluminum refill cylinder", d: "Matte anodized, airtight, 12 tablets per fill.", img: aluHero },
  { t: "All six refill flavors", d: "Focus · Flow · Refresh · Boost · Balance · Recharge.", img: "" },
  { t: "Linen sleeve & pouch", d: "Carry the bottle and cylinder quietly. Washable.", img: "" },
  { t: "Onboarding ritual card", d: "A small printed guide for the first calm morning.", img: "" },
  { t: "Access to the refill loop", d: "Deposit included. Return five empties, refunded.", img: aluDispense },
];

const flavors = [
  { slug: "focus",    name: "Focus",    mood: "Matcha Lime",      hex: "#A8C49D", line: "For long days and full to-do lists." },
  { slug: "flow",     name: "Flow",     mood: "Peach Green Tea",  hex: "#E8C6A4", line: "Steady energy, morning to evening." },
  { slug: "refresh",  name: "Refresh",  mood: "Berry Mint",       hex: "#C8D9E4", line: "Reset between meetings and screens." },
  { slug: "boost",    name: "Boost",    mood: "Citrus Ginger",    hex: "#E8A86A", line: "For the days that ask more of you." },
  { slug: "balance",  name: "Balance",  mood: "Pear Sage",        hex: "#BCC8AE", line: "Energy that knows when to be quiet." },
  { slug: "recharge", name: "Recharge", mood: "Cherry Black Tea", hex: "#A88494", line: "Late sessions, without overdoing it." },
];

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

function StarterKitPage() {
  useReveal();
  const { add } = useCart();
  const [active, setActive] = useState("focus");
  const heroRef = useRef<HTMLImageElement>(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const el = heroRef.current;
      if (!el) return;
      const y = window.scrollY;
      el.style.transform = `translate3d(0, ${y * 0.1}px, 0) scale(1.05)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeFlavor = flavors.find((f) => f.slug === active) ?? flavors[0];
  const flavorProducts = products.filter((p) => p.category === "refill");

  const handleAdd = () => {
    add({
      id: "starter-kit-v2",
      name: "VYTAL Starter Kit",
      variant: "Bottle · Cylinder · 6 flavors · Deposit included",
      image: shopStarterKit,
      unitPrice: KIT_PRICE,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SiteHeader />

      {/* HERO */}
      <section className="relative min-h-[100svh] flex items-end overflow-hidden bg-[#f3ede2]">
        <img
          ref={heroRef}
          src={shopStarterKit}
          alt="The VYTAL Starter Kit laid out on warm stone — bottle, aluminum cylinder, six flavors, linen sleeve"
          width={1600}
          height={1920}
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f3ede2] via-[#f3ede2]/10 to-transparent" />
        <div className="absolute inset-0 grain opacity-40" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 pb-16 md:pb-24 pt-32 grid md:grid-cols-12 gap-8">
          <div className="md:col-span-8">
            <Link to="/shop" className="font-mono text-[11px] uppercase tracking-[0.32em] text-foreground/60 hover:text-foreground transition-colors">
              ← Back to shop
            </Link>
            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.32em] text-primary reveal">
              The Starter Kit · Volume 01
            </p>
            <h1 className="mt-5 font-display text-[clamp(3rem,9vw,8.5rem)] font-extrabold leading-[0.92] tracking-tighter text-balance reveal">
              Begin the<br/>
              <em className="not-italic font-light italic text-foreground/70">refill ritual.</em>
            </h1>
            <p className="mt-8 max-w-lg text-lg text-foreground/75 leading-relaxed reveal">
              Everything you need to enter the system. One bottle. The reusable
              cylinder. All six flavors — because the ritual begins with exploring
              every one of them.
            </p>
          </div>
          <div className="md:col-span-4 self-end font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/55 max-w-xs ml-auto text-right reveal">
            <p>€68 · giftable · deposit included</p>
            <p className="mt-2">Ships in recycled board · plastic-free</p>
          </div>
        </div>
      </section>

      {/* STICKY ADD-TO-CART */}
      <section className="sticky top-16 z-30 bg-background/90 backdrop-blur-xl border-y border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-5 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">The complete kit</p>
              <p className="mt-0.5 font-display text-base font-semibold">Bottle · Cylinder · 6 flavors</p>
            </div>
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <div className="text-right">
              <p className="font-display text-2xl leading-none">{formatPrice(KIT_PRICE)}</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-1">
                Deposit included · returns refunded
              </p>
            </div>
            <button
              onClick={handleAdd}
              className="relative overflow-hidden bg-foreground text-background rounded-full px-7 py-3.5 text-sm font-medium hover:bg-primary transition-colors"
            >
              <span className={`block transition-all duration-500 ${added ? "-translate-y-8 opacity-0" : ""}`}>
                Begin the ritual →
              </span>
              <span className={`absolute inset-0 grid place-items-center transition-all duration-500 ${added ? "" : "translate-y-8 opacity-0"}`}>
                Added ✓
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* QUIET STATEMENT */}
      <section className="px-6 md:px-10 max-w-4xl mx-auto py-28 md:py-40 text-center">
        <p className="reveal font-display text-3xl md:text-5xl leading-[1.15] tracking-tight text-balance">
          Not tablets in a box.<br/>
          <span className="text-muted-foreground">A system in a box.</span>
        </p>
        <p className="reveal mt-8 max-w-xl mx-auto text-muted-foreground leading-relaxed">
          Open it once. Use the bottle for years. Refill the cylinder for a
          lifetime. The kit is the doorway — not the destination.
        </p>
      </section>

      {/* WHAT'S INSIDE */}
      <section className="px-6 md:px-10 max-w-7xl mx-auto pb-28 md:pb-40 grid lg:grid-cols-12 gap-12 lg:gap-20">
        <div className="lg:col-span-5 reveal lg:sticky lg:top-32 self-start">
          <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-primary">01 · Inside the box</span>
          <h2 className="mt-5 font-display text-4xl md:text-6xl font-extrabold leading-[0.98] tracking-tight">
            Six things.<br/>
            <span className="italic font-light text-muted-foreground">One ritual.</span>
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed max-w-md">
            Each piece earns its place. Nothing decorative. The cylinder isn't a
            standalone product — it's the vessel that brings every refill home.
          </p>
        </div>
        <ol className="lg:col-span-7 space-y-3">
          {includedItems.map((it, i) => (
            <li key={it.t} className="reveal group rounded-3xl border border-border bg-secondary/40 p-6 md:p-7 hover:bg-secondary transition-colors duration-500">
              <div className="flex items-start gap-5">
                <span className="font-mono text-xs tracking-widest text-primary mt-1 w-8">0{i + 1}</span>
                <div className="flex-1">
                  <p className="font-display text-xl font-semibold">{it.t}</p>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{it.d}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* SIX FLAVORS — interactive */}
      <section className="relative bg-secondary/40 border-y border-border/60 py-28 md:py-40 overflow-hidden">
        <div
          className="absolute inset-0 -z-10 transition-all duration-[1800ms] ease-[cubic-bezier(0.32,0.72,0,1)] opacity-50"
          style={{ background: `radial-gradient(60% 80% at 50% 30%, ${activeFlavor.hex}55, transparent 70%)` }}
        />
        <div className="px-6 md:px-10 max-w-7xl mx-auto">
          <div className="max-w-3xl mb-14 reveal">
            <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-primary">02 · The six flavors</span>
            <h2 className="mt-5 font-display text-4xl md:text-6xl font-extrabold leading-[0.98] tracking-tight">
              Every flavor.<br/>
              <span className="italic font-light text-muted-foreground">Inside every kit.</span>
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed max-w-xl">
              You don't have to commit before you've tried them. The kit ships with
              all six — explore each one, find the two or three you'll reorder.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-10 items-start">
            {/* tablet preview */}
            <div className="lg:col-span-5 lg:sticky lg:top-32 self-start reveal">
              <div
                className="relative aspect-[4/5] overflow-hidden rounded-md transition-all duration-[1500ms] ease-[cubic-bezier(0.32,0.72,0,1)] bg-secondary/80"
              >
                {/* Product Float Shot */}
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <img
                    src={shopHeroBottle}
                    alt="VYTAL Bottle Float"
                    className="w-full h-auto max-h-full object-contain animate-float drop-shadow-2xl"
                  />
                </div>
                
                <div className="absolute top-5 left-5 font-mono text-[10px] uppercase tracking-[0.3em] bg-background/85 backdrop-blur px-3 py-1.5 rounded-full">
                  {activeFlavor.mood}
                </div>
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="font-display text-2xl">{activeFlavor.name}</p>
                  <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-foreground/70 mt-1">
                    Included · in the cylinder
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-3">
              {flavors.map((f) => {
                const on = active === f.slug;
                return (
                  <button
                    key={f.slug}
                    onMouseEnter={() => setActive(f.slug)}
                    onFocus={() => setActive(f.slug)}
                    onClick={() => setActive(f.slug)}
                    className={`text-left p-6 rounded-2xl border transition-all duration-700 ${on ? "border-foreground bg-background shadow-lg -translate-y-1" : "border-border bg-background/40 hover:bg-background/80"}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`size-9 rounded-full transition-transform duration-700 ${on ? "scale-110" : ""}`} style={{ background: f.hex }} />
                      <div className="flex-1">
                        <p className="font-display text-lg font-semibold">{f.name}</p>
                        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground mt-0.5">{f.mood}</p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{f.line}</p>
                    <Link
                      to="/shop/$slug"
                      params={{ slug: f.slug }}
                      onClick={(e) => e.stopPropagation()}
                      className="mt-4 inline-flex font-mono text-[10px] uppercase tracking-[0.25em] text-primary hover:text-foreground transition-colors"
                    >
                      Full ritual →
                    </Link>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CYLINDER NOTE */}
      <section className="relative px-6 md:px-10 max-w-7xl mx-auto py-28 md:py-40 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 reveal">
          <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-[#f1ece1]">
            <img src={aluHero} alt="The aluminum refill cylinder included in every starter kit" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
            <span className="absolute top-5 left-5 font-mono text-[10px] uppercase tracking-[0.3em] bg-background/85 backdrop-blur px-3 py-1.5 rounded-full">
              Included · part of the loop
            </span>
          </div>
        </div>
        <div className="lg:col-span-6 reveal">
          <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-primary">03 · The cylinder</span>
          <h2 className="mt-5 font-display text-4xl md:text-6xl font-extrabold leading-[0.98] tracking-tight">
            Reusable.<br/>
            <span className="italic font-light text-muted-foreground">Returnable. Refined.</span>
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed max-w-md">
            The matte aluminum cylinder is included with the kit — but it belongs to
            the system. Return it with four others, get your deposit back, and the
            cylinder begins another life.
          </p>
          <ul className="mt-8 space-y-3 max-w-md text-sm">
            {[
              "Air- and moisture-tight — tablets stay clean and dry",
              "108 mm · 38 g · 12 tablets per cylinder",
              "Deposit refunded on 5-cylinder return",
              "Sterilized and refilled — not recycled away",
            ].map((b) => (
              <li key={b} className="flex gap-3 text-muted-foreground border-b border-border pb-2">
                <span className="text-primary mt-0.5">—</span>{b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* RITUAL CARD */}
      <section className="relative overflow-hidden">
        <div className="relative h-[80svh] min-h-[560px] w-full">
          <img src={shopRitualDesk} alt="A calm morning desk with the VYTAL bottle, cylinder, and the printed ritual card" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/20" />
        </div>
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto w-full px-6 md:px-10 pb-16 md:pb-24">
            <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-background reveal">04 · The first morning</span>
            <h2 className="reveal mt-5 font-display text-4xl md:text-6xl font-extrabold leading-[0.98] tracking-tight max-w-2xl text-background drop-shadow">
              The printed<br/>
              <span className="italic font-light">ritual card.</span>
            </h2>
            <p className="reveal mt-6 max-w-md text-background/85 leading-relaxed">
              A small folded card lives inside the kit. Three steps for the first
              morning. After that, it lives on your shelf — quiet, unbranded, yours.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative px-6 md:px-10 py-32 md:py-44 text-center overflow-hidden bg-secondary/40">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 size-[60vmax] rounded-full bg-primary/15 blur-3xl animate-drift" />
          <div className="absolute bottom-0 right-0 size-[40vmax] rounded-full bg-accent/15 blur-3xl animate-float" />
        </div>
        <div className="max-w-3xl mx-auto reveal">
          <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-primary">A box that opens once</span>
          <h2 className="mt-8 font-display text-5xl md:text-7xl font-extrabold leading-[0.95] tracking-tighter text-balance">
            Open it once.<br/>
            <span className="italic font-light text-muted-foreground">Refill it forever.</span>
          </h2>
          <div className="mt-12 flex flex-wrap gap-3 justify-center">
            <button
              onClick={handleAdd}
              className="inline-flex bg-foreground text-background px-8 py-4 rounded-full font-medium hover:bg-primary transition-colors"
            >
              Add Starter Kit — €68
            </button>
            <Link to="/refill" className="inline-flex border border-foreground/20 text-foreground px-8 py-4 rounded-full font-medium hover:bg-foreground hover:text-background transition-all">
              How the system works
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