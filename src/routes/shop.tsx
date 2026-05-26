import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { products, type Product } from "@/lib/vytal-products";
import { useCart, parsePrice, formatPrice } from "@/contexts/cart-context";
import shopHero from "@/assets/shop-hero.jpg";
import shopStarterKit from "@/assets/shop-starter-kit-v2.png";
import shopHeroBottle from "@/assets/shop-hero-bottle-new.png";
import shopRitualDesk from "@/assets/shop-ritual-desk.jpg";
import aluHero from "@/assets/alu-hero.jpg";
import aluDispense from "@/assets/alu-dispense.jpg";
import aluLoop from "@/assets/alu-loop.jpg";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — VYTAL · The refill ecosystem." },
      { name: "description", content: "A premium refill-based energy ecosystem. Starter kit, six functional flavors, and the circular VYTAL loop. Designed for modern everyday life." },
      { property: "og:title", content: "Shop — VYTAL · The refill ecosystem." },
      { property: "og:description", content: "Start the ritual. All six flavors, the reusable cylinder, the return loop — one calm system." },
      { property: "og:image", content: shopStarterKit },
    ],
  }),
  component: ShopPage,
});

// ── Flavor identities — mood per refill ───────────────────────────────
const flavorIdentity: Record<string, { mood: string; emotion: string; hex: string; ring: string }> = {
  focus:    { mood: "Matcha Lime",      emotion: "Quiet, deep, focused mornings.",        hex: "#A8C49D", ring: "ring-[#A8C49D]" },
  flow:     { mood: "Peach Green Tea",  emotion: "Soft warmth that lasts all day.",       hex: "#E8C6A4", ring: "ring-[#E8C6A4]" },
  refresh:  { mood: "Berry Mint",       emotion: "Cool reset between two meetings.",      hex: "#C8D9E4", ring: "ring-[#C8D9E4]" },
  boost:    { mood: "Citrus Ginger",    emotion: "Alert, awake, never aggressive.",       hex: "#E8A86A", ring: "ring-[#E8A86A]" },
  balance:  { mood: "Pear Sage",        emotion: "Calm clarity for slower days.",         hex: "#BCC8AE", ring: "ring-[#BCC8AE]" },
  recharge: { mood: "Cherry Black Tea", emotion: "Late, soft, finally yours.",            hex: "#A88494", ring: "ring-[#A88494]" },
};

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
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function StarterKitQuickView({ onClose }: { onClose: () => void }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const unitPrice = 68;

  const handleAdd = () => {
  add({
    id: "starter-kit",
    name: "VYTAL Starter Kit",
    variant: "Complete ritual",
    image: shopStarterKit,
    unitPrice,
    qty,
    href: "/shop/starter-kit",
  });

  setAdded(true);

  setTimeout(() => {
    setAdded(false);
    onClose(); // <- schließt popup automatisch
  }, 900);
};
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center p-6"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-background rounded-3xl shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 z-10 size-10 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-secondary transition-colors"
        >
          ✕
        </button>

        <div className="grid md:grid-cols-2">
          <div className="relative h-full min-h-[350px] bg-secondary/40">
            <img
              src={shopStarterKit}
              alt="VYTAL Starter Kit"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          </div>

          <div className="p-6 md:p-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
              Starter Kit · Complete refill ritual
            </p>

            <h2 className="mt-4 font-display text-4xl font-extrabold leading-[0.95]">
              VYTAL Starter Kit
            </h2>

            <p className="mt-5 text-muted-foreground leading-relaxed">
              The complete entry into the VYTAL refill system: one reusable bottle,
              one refill cylinder, all six functional flavors, sleeve, pouch and
              onboarding ritual card.
            </p>

            <div className="mt-8 rounded-2xl border border-border p-5 bg-secondary/30">
              <p className="font-mono text-[10px] uppercase tracking-widest text-primary mb-3">
                What’s inside
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 1 × reusable glass bottle</li>
                <li>• 1 × matte aluminum refill cylinder</li>
                <li>• 6 × functional flavor tablets</li>
                <li>• 1 × linen sleeve & carry pouch</li>
                <li>• 1 × onboarding ritual card</li>
              </ul>
            </div>

            <div className="mt-8 rounded-2xl bg-secondary/40 p-5 text-xs text-muted-foreground leading-relaxed">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary mb-3">
                Required product information
              </p>
              <p>
                Food supplement. Not a substitute for a balanced and varied diet.
                Keep out of reach of children.
              </p>
              <p className="mt-2">
                Contains caffeine. Not recommended for children, pregnant or
                breastfeeding women.
              </p>
              <p className="mt-2">
                Bottle and cylinder are designed for cold still water and VYTAL
                tablets. Clean before first use. Do not use if damaged.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <div className="inline-flex items-center border border-border rounded-full">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="size-10 hover:bg-secondary rounded-full transition-colors"
                >
                  −
                </button>
                <span className="w-10 text-center font-mono">{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty((q) => q + 1)}
                  className="size-10 hover:bg-secondary rounded-full transition-colors"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className="flex-1 bg-foreground text-background px-6 py-3 rounded-full text-sm font-medium hover:bg-primary transition-colors"
              >
                {added ? "Added ✓" : `Add to cart · ${formatPrice(qty * unitPrice)}`}
              </button>
            </div>

            <p className="mt-3 text-[11px] text-muted-foreground">
              Deposit included. Return loop applies to refill cylinders.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function useParallax(ref: React.RefObject<HTMLElement | null>, intensity = 0.1) {
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * intensity;
        ref.current.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, [ref, intensity]);
}

function ShopPage() {
  useReveal();
  const heroImgRef = useRef<HTMLImageElement>(null);
  useParallax(heroImgRef as unknown as React.RefObject<HTMLElement | null>, 0.06);

  const refills = useMemo(() => products.filter((p) => p.category === "refill"), []);
  const bottles = useMemo(() => products.filter((p) => p.category === "bottle"), []);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [starterKitOpen, setStarterKitOpen] = useState(false);


  const scrollTo = (id: string) => () =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SiteHeader />

      {/* HERO — Starter Kit leads the entire shop */}
      <section className="relative min-h-[100svh] flex items-end overflow-hidden bg-gradient-to-b from-secondary/70 via-background to-background">
        <div className="absolute inset-0 -z-10">
          <img
            src={shopStarterKit}
            alt="The VYTAL Starter Kit — bottle, aluminum refill cylinder, linen sleeve and the full flavor set"
            loading="lazy"
            width={1600}
            height={1920}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/75 via-transparent to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto w-full px-6 md:px-10 pb-24 md:pb-32 pt-40 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-7">
            <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-primary block mb-8 reveal">
              The shop · Volume 02 · The ecosystem
            </span>
            <h1 className="font-display text-[clamp(3rem,8.5vw,8rem)] font-extrabold leading-[0.92] tracking-tighter text-balance reveal">
              Start your <em className="not-italic italic font-light text-primary">refill</em> ritual.
            </h1>
            <p className="mt-8 max-w-lg text-lg md:text-xl text-muted-foreground leading-relaxed reveal">
              One starter kit. Six functional flavors. A reusable aluminum cylinder that
              comes back to us — and to you — again and again.
            </p>

            <div className="mt-12 flex flex-wrap gap-3 reveal">
              <button
                onClick={scrollTo("starter")}
                className="group inline-flex items-center gap-2 bg-foreground text-background px-7 py-4 rounded-full text-sm font-medium hover:bg-primary transition-colors"
              >
                Begin with the Starter Kit
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </button>
              <button
                onClick={scrollTo("refills")}
                className="inline-flex items-center gap-2 border border-foreground/15 px-7 py-4 rounded-full text-sm font-medium hover:bg-secondary transition-colors"
              >
                Explore the flavors
              </button>
              <button
                onClick={scrollTo("loop")}
                className="inline-flex items-center gap-2 px-5 py-4 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                How the loop works →
              </button>
            </div>
          </div>

          <div className="md:col-span-5 relative hidden md:block">
            <div className="relative aspect-[3/4] reveal">
              <img
                src={shopHeroBottle}
                alt="A translucent sage VYTAL bottle with dissolving tablets"
                width={1200}
                height={1600}
                className="absolute inset-0 h-full w-full object-cover rounded-md shadow-2xl animate-float"
              />
              <div className="pointer-events-none absolute -inset-6 -z-10 rounded-full bg-primary/15 blur-3xl animate-drift" />
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground/70 reveal">
          scroll · slowly
        </div>
      </section>

      {/* QUIET STATEMENT */}
      <section className="px-6 md:px-10 max-w-5xl mx-auto py-28 md:py-44 text-center">
        <p className="font-display text-3xl md:text-5xl leading-[1.15] tracking-tight text-balance reveal">
          Not an energy drink shop.<br/>
          <span className="text-muted-foreground">A refill ecosystem.</span>
        </p>
        <p className="mt-8 max-w-xl mx-auto text-muted-foreground reveal">
          Six flavors. One reusable cylinder. A return loop that quietly closes
          behind every order. Designed for routines you already live.
        </p>
      </section>

 {/* STARTER KIT — THE HERO PRODUCT */}
<section id="starter" className="px-6 md:px-10 max-w-7xl mx-auto pb-28 md:pb-44">
  <button
    type="button"
    onClick={() => setStarterKitOpen(true)}
    className="group reveal block w-full text-left relative overflow-hidden rounded-md bg-[#f3ede2]"
  >
    <div className="grid md:grid-cols-12 gap-0 items-stretch">
      <div className="md:col-span-7 relative aspect-[4/5] md:aspect-auto md:min-h-[640px] overflow-hidden">
        <img
  src={shopStarterKit}
  alt="The VYTAL Starter Kit — bottle, aluminum refill cylinder, linen sleeve and the full flavor set"
  loading="lazy"
  width={1600}
  height={1920}
  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.03]"
/>
        <span className="absolute top-5 left-5 font-mono text-[10px] uppercase tracking-[0.3em] bg-background/85 backdrop-blur px-3 py-1.5 rounded-full">
          The Starter Kit · Hero product
        </span>

        <span className="absolute bottom-5 left-5 font-mono text-[10px] uppercase tracking-[0.3em] bg-foreground/85 text-background backdrop-blur px-3 py-1.5 rounded-full">
          All 6 flavors · cylinder included · deposit included
        </span>
      </div>

      <div className="md:col-span-5 p-8 md:p-14 flex flex-col justify-between gap-10">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-primary">
            Volume 01 · The complete ritual
          </span>

          <h2 className="mt-5 font-display text-4xl md:text-6xl font-extrabold leading-[0.95] tracking-tight">
            Begin the<br />
            <em className="not-italic italic font-light text-muted-foreground">
              refill ritual.
            </em>
          </h2>

          <p className="mt-6 text-muted-foreground leading-relaxed max-w-sm">
            Everything you need to enter the system — the glass bottle, the
            reusable aluminum cylinder, all six functional flavors, and a
            ritual card for the first morning.
          </p>

          <ul className="mt-8 space-y-2 text-sm">
            {[
              "1 × Borosilicate glass bottle",
              "1 × Matte aluminum refill cylinder",
              "6 × Refill flavors (Focus, Flow, Refresh, Boost, Balance, Recharge)",
              "1 × Linen sleeve & carry pouch",
              "1 × Onboarding ritual card",
            ].map((i) => (
              <li
                key={i}
                className="flex gap-3 text-muted-foreground border-b border-border/60 pb-2"
              >
                <span className="text-primary mt-1">—</span>
                {i}
              </li>
            ))}
          </ul>
          <br></br>
          <Link
  to="/shop/starter-kit"
  className="bg-foreground text-background px-8 py-4 rounded-full text-sm font-medium hover:bg-primary transition-colors"
>
  Begin the Starter Kit →
</Link>
        </div>
      </div>
    </div>
  </button>
</section>

      {/* RELOADS / REFILLS — cinematic cards */}
<section id="refills" className="px-6 md:px-10 max-w-7xl mx-auto pt-28 md:pt-40 pb-20">
  <div className="max-w-3xl mb-14 reveal">
    <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-primary">
      Reloads · Volume 02
    </span>

    <h2 className="mt-5 font-display text-4xl md:text-6xl font-extrabold leading-[0.98] tracking-tight">
      The refills.<br />
      <span className="italic font-light text-muted-foreground">
        Always inside the cylinder.
      </span>
    </h2>

    <p className="mt-6 text-muted-foreground leading-relaxed max-w-xl">
      Each refill arrives in a reusable matte aluminum cylinder. Every cylinder
      holds 8 functional tablets and includes a €4 refundable deposit. When five
      cylinders are empty, send them back, get your deposit credited, and we
      sterilize and refill them.
    </p>
  </div>

  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-14">
    {refills.map((p, i) => (
      <RefillCard
        key={p.slug}
        p={p}
        i={i}
        onOpen={() => setSelectedProduct(p)}
      />
    ))}
  </div>
</section>
      
      {/* RETURN LOOP — interactive, animated */}
      <ReturnLoop />

      {/* THE CYLINDER — system object, NOT standalone */}
      <section className="px-6 md:px-10 max-w-7xl mx-auto py-28 md:py-44 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 reveal relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-[#f1ece1]">
            <img src={aluHero} alt="The matte aluminum VYTAL refill cylinder" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
            <span className="absolute top-5 left-5 font-mono text-[10px] uppercase tracking-[0.3em] bg-background/85 backdrop-blur px-3 py-1.5 rounded-full">
              Part of every refill
            </span>
          </div>
        </div>
        <div className="lg:col-span-6 reveal">
          <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-primary">The system object</span>
          <h2 className="mt-5 font-display text-4xl md:text-6xl font-extrabold leading-[0.98] tracking-tight">
            Included in<br/>
            <span className="italic font-light text-muted-foreground">the refill loop.</span>
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed max-w-md">
            The matte aluminum cylinder is not a product you buy once. It's the
            vessel the refills travel inside — included with every order, returned
            for deposit, sterilized, refilled, re-released.
          </p>
          <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 max-w-md">
            {[
              ["Format", "108 mm · 38 g · holds 8 tablets"],
              ["Material", "Aerospace-grade aluminum, anodized"],
              ["Seal", "Air- and moisture-tight silicone"],
              ["Deposit", "Refunded on 5-cylinder return"],
            ].map(([k, v]) => (
              <div key={k} className="border-t border-border pt-3">
                <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{k}</dt>
                <dd className="mt-1.5 font-display text-sm">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ACCESSORIES — bottles */}
      <section id="accessories" className="px-6 md:px-10 max-w-7xl mx-auto pb-24 md:pb-32">
        <div className="flex items-end justify-between gap-6 mb-10 reveal">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-primary">Accessories · Volume 03</span>
            <h3 className="mt-3 font-display text-3xl md:text-5xl font-extrabold tracking-tight">
              Bottles & vessels.
            </h3>
          </div>
          <p className="hidden md:block max-w-xs text-sm text-muted-foreground">
            Optional extensions of the system. The refills fit them all.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          {bottles.map((b) => (
            <button key={b.slug} onClick={() => setSelectedProduct(b)} className="group reveal block text-left">
              <div className="aspect-[4/5] relative overflow-hidden rounded-md bg-secondary/40">
                <img src={b.image} alt={b.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]" />
                <div className="absolute top-5 left-5 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/80">
                  Bottle · {b.color}
                </div>
              </div>
              <div className="mt-5 flex items-baseline justify-between">
                <p className="font-display text-lg font-semibold">{b.name.replace("VYTAL ", "")}</p>
                <span className="font-mono text-xs text-muted-foreground">{b.price}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{b.tagline}</p>
            </button>
          ))}
        </div>
      </section>

      {/* SUSTAINABILITY — honest, transparent */}
      <section className="bg-foreground text-background py-28 md:py-44 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5 reveal">
            <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-accent">Transparency · 05</span>
            <h2 className="mt-5 font-display text-4xl md:text-6xl font-extrabold leading-[0.98] tracking-tight">
              Quietly honest.<br/>
              <span className="italic font-light text-background/70">Measurably better.</span>
            </h2>
            <p className="mt-8 text-background/70 leading-relaxed max-w-md">
              We're not pretending to be zero-waste. We're publishing the real
              numbers, the real loop, the real material trail — and asking less of
              the planet, one refill at a time.
            </p>
          </div>
          <div className="md:col-span-7 grid sm:grid-cols-2 gap-4 reveal">
            {[
              { k: "−85%", l: "Shipping volume vs. canned drinks" },
              { k: "0", l: "Single-use plastic wrappers per refill" },
              { k: "5×", l: "Cylinders per return cycle" },
              { k: "Q1", l: "Public sustainability report each quarter" },
              { k: "100%", l: "Traceable ingredient sourcing" },
              { k: "8", l: "Tablets per cylinder before return" },
            ].map((m) => (
              <div key={m.l} className="rounded-2xl border border-background/15 p-6 bg-background/5">
                <p className="font-display text-3xl">{m.k}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.22em] text-background/60 font-mono">{m.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section className="relative min-h-[70vh] flex items-center justify-center px-6 md:px-10 overflow-hidden bg-secondary/40">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-primary/15 blur-3xl animate-drift" />
          <div className="absolute -bottom-40 -right-20 w-[520px] h-[520px] rounded-full bg-accent/25 blur-3xl animate-drift" style={{ animationDelay: "-8s" }} />
        </div>
        <div className="text-center max-w-3xl reveal py-32">
          <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-primary">A slower system</span>
          <h2 className="mt-6 font-display text-5xl md:text-7xl font-extrabold leading-[0.98] tracking-tight text-balance">
            One ritual.<br/>
            <span className="italic font-light text-muted-foreground">Endlessly refilled.</span>
          </h2>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            <Link to="/shop/starter-kit" className="bg-foreground text-background px-8 py-4 rounded-full text-sm font-medium hover:bg-primary transition-colors">
              Begin the Starter Kit →
            </Link>
            <button onClick={scrollTo("refills")} className="border border-foreground/15 px-8 py-4 rounded-full text-sm font-medium hover:bg-background transition-colors">
              Explore the refills
            </button>
          </div>
        </div>
      </section>
  {selectedProduct && (
  <ProductQuickView
    product={selectedProduct}
    onClose={() => setSelectedProduct(null)}
  />
)}

{starterKitOpen && (
  <StarterKitQuickView
    onClose={() => setStarterKitOpen(false)}
  />
)}

<SiteFooter />
    </main>
  );
}
// ── Refill card ──────────────────────────────────────────────────────
function RefillCard({ p, i, onOpen }: { p: Product; i: number; onOpen: () => void }) {
  const id = flavorIdentity[p.slug];
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const handle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    add({
      id: `refill-${p.slug}`,
      name: `${p.name} Refill Cylinder`,
     variant: `${id?.mood ?? p.flavor} · 8 tablets · €4 deposit included`,
      image: p.image,
      unitPrice: parsePrice(p.price) + 4,
      href: `/shop/${p.slug}`,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <div
      id={`product-${p.slug}`}
      onClick={onOpen}
      role="button"
      tabIndex={0}

      className="text-left group reveal flex flex-col cursor-pointer"
    >
      <div className="aspect-[4/5] relative overflow-hidden rounded-md bg-secondary/40">
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          width={768}
          height={960}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.05]"
        />
        {/* mood gradient overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-60 transition-opacity duration-[1200ms] mix-blend-multiply"
          style={{ background: `linear-gradient(180deg, transparent 40%, ${id?.hex ?? "#A8C49D"} 130%)` }}
        />
        {/* loop badge */}
        <span className="absolute top-4 left-4 inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.25em] bg-background/85 backdrop-blur px-2.5 py-1.5 rounded-full">
          <span className="size-1.5 rounded-full" style={{ background: id?.hex ?? "var(--primary)" }} />
          In refill loop
        </span>
        <span className="absolute top-4 right-4 font-mono text-[9px] uppercase tracking-[0.25em] bg-foreground/85 text-background backdrop-blur px-2.5 py-1.5 rounded-full">
          {String(i + 1).padStart(2, "0")}
        </span>
        {/* quick add */}
        <button
          onClick={handle}
          className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 bg-foreground text-background backdrop-blur px-4 py-2.5 rounded-full text-xs font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 hover:bg-primary"
          aria-label={`Add ${p.name} refill cylinder to cart`}
        >
          {added ? "Added ✓" : "Quick add →"}
        </button>
      </div>
      <div className="mt-6 flex items-baseline justify-between gap-3">
        <p className="font-display text-xl font-semibold tracking-tight">{p.name.replace("VYTAL ", "")}</p>
        <span className="font-mono text-xs text-muted-foreground">{formatPrice(parsePrice(p.price) + 4)} <span className="text-muted-foreground/60">/ cylinder</span></span>
      </div>
      <p className="text-[13px] font-mono text-primary/80 mt-1">{id?.mood ?? p.flavor}</p>
      <p className="text-sm text-muted-foreground mt-3 leading-relaxed max-w-sm">{id?.emotion ?? p.tagline}</p>
    </div>
  );
}

// ── Return loop — interactive 5-step ─────────────────────────────────
function ReturnLoop() {
  const [active, setActive] = useState(0);
  const steps = [
    { t: "Receive", d: "Refill cylinder arrives with your order. Deposit included.", img: aluHero },
    { t: "Use", d: "One press. One tablet. Eight tablets per cylinder.", img: aluDispense }, 
    { t: "Collect 5", d: "Slip empty cylinders into the return pouch as they're used.", img: aluLoop },
    { t: "Return", d: "Drop the pouch unfranked in any postbox. Pre-paid. No app.", img: aluLoop },
    { t: "Reused", d: "We sterilize, inspect, refill. Your deposit returns. The loop closes.", img: shopRitualDesk },
  ];

  // Cycle automatically
  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % steps.length), 3600);
    return () => clearInterval(t);
  }, [steps.length]);

  return (
    <section id="loop" className="relative bg-[#f3ede2] text-foreground overflow-hidden">
      <div className="px-6 md:px-10 max-w-7xl mx-auto py-32 md:py-44 grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-28 reveal">
          <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-primary">Volume 04 · The loop</span>
          <h2 className="mt-5 font-display text-4xl md:text-6xl font-extrabold leading-[0.98] tracking-tight">
            How the VYTAL<br/>
            <span className="italic font-light text-muted-foreground">loop works.</span>
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed max-w-md">
            Five cylinders. One postbox. Deposit refunded. No subscription tricks,
            no app, no greenwashing. The whole system is built around one quiet motion.
          </p>

          <div className="mt-10 aspect-[4/5] relative overflow-hidden rounded-md bg-background">
            {steps.map((s, i) => (
              <img
                key={s.t}
                src={s.img}
                alt={s.t}
                loading="lazy"
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1400ms] ease-[cubic-bezier(0.32,0.72,0,1)] ${active === i ? "opacity-100 scale-100" : "opacity-0 scale-105"}`}
              />
            ))}
            <div className="absolute bottom-5 left-5 font-mono text-[10px] uppercase tracking-[0.3em] bg-background/85 backdrop-blur px-3 py-1.5 rounded-full">
              0{active + 1} · {steps[active].t}
            </div>
          </div>
        </div>

        <ol className="lg:col-span-7 space-y-4">
          {steps.map((s, i) => {
            const on = active === i;
            return (
              <li
                key={s.t}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                tabIndex={0}
                className={`group cursor-pointer rounded-3xl border p-6 md:p-8 transition-all duration-700 ${on ? "border-foreground bg-background shadow-lg" : "border-border bg-background/40 hover:bg-background/80"}`}
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <span className={`grid place-items-center size-12 rounded-full font-mono text-xs tracking-widest transition-all duration-700 ${on ? "bg-foreground text-background scale-110" : "bg-secondary text-muted-foreground"}`}>
                      0{i + 1}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-tight">{s.t}</h3>
                    <p className="mt-2 text-muted-foreground leading-relaxed max-w-lg">{s.d}</p>
                  </div>
                  {/* animated arrow connector */}
                  {i < 4 && (
                    <div className="hidden md:flex items-center pt-3">
                      <span className={`block h-px transition-all duration-700 ${on ? "w-12 bg-foreground" : "w-6 bg-border"}`} />
                    </div>
                  )}
                </div>
              </li>
            );
          })}

          <div className="mt-10 grid sm:grid-cols-3 gap-3 text-xs text-muted-foreground">
            <div className="rounded-2xl border border-border p-4 bg-background/60">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">Deposit</p>
              <p className="mt-2">€4 per cylinder. Fully refunded when you return five together.</p>
            </div>
            <div className="rounded-2xl border border-border p-4 bg-background/60">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">Hygiene</p>
              <p className="mt-2">Returned cylinders are sterilized to medical-grade standards before refilling.</p>
            </div>
            <div className="rounded-2xl border border-border p-4 bg-background/60">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">Reality check</p>
              <p className="mt-2">Significantly more conscious than canned drinks. We publish the numbers quarterly.</p>
            </div>
          </div>
        </ol>
      </div>
    </section>
  );
}
function ProductQuickView({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const unitPrice =
    product.category === "refill" ? parsePrice(product.price) + 4 : parsePrice(product.price);
  const basePrice = parsePrice(product.price);
  const deposit = product.category === "refill" ? 4 : 0;  
  const [added, setAdded] = useState(false);
      useEffect(() => {
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = "";
      };
    }, []);
    useEffect(() => {
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  };

  window.addEventListener("keydown", onKey);

  return () => window.removeEventListener("keydown", onKey);
}, [onClose]);

  const handleAdd = () => {
  add({
    id: product.slug,
    name: product.name,
    variant: product.flavor ?? product.color,
    image: product.image,
    unitPrice,
    qty,
    href: `/shop/${product.slug}`,
  });

  setAdded(true);

  setTimeout(() => {
    setAdded(false);
    onClose();
  }, 900);
};

  return (
  <div
    onClick={onClose}
    className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center p-6"
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-background rounded-3xl shadow-2xl animate-in fade-in zoom-in-95 duration-300"
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-10 size-10 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-secondary transition-colors"
      >
        ✕
      </button>

        <div className="grid md:grid-cols-2">
          <div className="relative aspect-[4/5] bg-secondary/40">
            <img
              src={product.image}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          <div className="p-8 md:p-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
              {product.function}
            </p>

            <h2 className="mt-4 font-display text-4xl font-extrabold leading-[0.95]">
              {product.name}
            </h2>

            <p className="mt-5 text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {product.flavor && (
              <div className="mt-6 rounded-2xl border border-border p-5 bg-secondary/30">
                <p className="font-mono text-[10px] uppercase tracking-widest text-primary">
                  Flavor
                </p>
                <p className="mt-1 font-semibold">{product.flavor}</p>
                <p className="text-sm text-muted-foreground">
                  {product.flavorNote}
                </p>
              </div>
            )}

            <div className="mt-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary mb-3">
                Ingredients
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {product.ingredients?.map((i) => (
                  <li key={i.name} className="flex justify-between gap-4 border-b border-border pb-2">
                    <span>{i.name}</span>
                    {i.why && <span className="text-right">{i.why}</span>}
                  </li>
                ))}
              </ul>
            </div>

            {product.nutrition?.length > 0 && (
              <div className="mt-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary mb-3">
                  Nutrition per serving
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {product.nutrition.map((n) => (
                    <div key={n.label} className="border border-border rounded-xl p-3">
                      <p className="font-mono text-[10px] uppercase text-muted-foreground">
                        {n.label}
                      </p>
                      <p className="font-display text-lg">{n.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {product.category === "refill" && (
              <div className="mt-8 rounded-2xl bg-secondary/40 p-5 text-xs text-muted-foreground leading-relaxed">
                <p>
                  Food supplement. Not a substitute for a balanced and varied diet.
                  Keep out of reach of children.
                </p>
                <p className="mt-2">
                  Contains caffeine. Not recommended for children, pregnant or
                  breastfeeding women.
                </p>
              </div>
            )}

            {product.category === "bottle" && (
  <div className="mt-8 rounded-2xl bg-secondary/40 p-5 text-xs text-muted-foreground leading-relaxed">
    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary mb-3">
      Bottle details & care
    </p>

    {product.slug === "office-bottle" && (
      <>
        <p>
          Brushed stainless steel bottle designed for desk work, commuting and longer office sessions.
        </p>
        <ul className="mt-4 space-y-2">
          <li>• Stainless steel exterior with professional office look.</li>
          <li>• Designed for daily hydration and VYTAL refill rituals.</li>
          <li>• Suitable for cold still water and VYTAL tablets.</li>
          <li>• Hand-wash recommended to protect lid and finish.</li>
          <li>• Do not use if dented, leaking or visibly damaged.</li>
        </ul>
      </>
    )}

    {product.slug === "go-bottle" && (
      <>
        <p>
          Lightweight everyday bottle designed for movement, campus days and routines outside the home.
        </p>
        <ul className="mt-4 space-y-2">
          <li>• Soft everyday carry feel.</li>
          <li>• Designed for cold still water and VYTAL tablets.</li>
          <li>• Easy to carry in bags and daily setups.</li>
          <li>• Hand-wash recommended.</li>
          <li>• Do not use if cracked, leaking or visibly damaged.</li>
        </ul>
      </>
    )}

    {product.slug === "flow-bottle" && (
      <>
        <p>
          Minimal hydration bottle designed for calmer daily routines and slow refill rituals.
        </p>
        <ul className="mt-4 space-y-2">
          <li>• Clean minimal design for everyday hydration.</li>
          <li>• Suitable for cold still water and VYTAL tablets.</li>
          <li>• Designed for repeated daily use.</li>
          <li>• Hand-wash recommended to protect the finish.</li>
          <li>• Do not use with boiling liquids.</li>
        </ul>
      </>
    )}

    {product.slug === "home-container" && (
      <>
        <p>
          Home storage vessel designed for keeping refill routines visible, organized and easy to share.
        </p>
        <ul className="mt-4 space-y-2">
          <li>• Intended for home storage and shared routines.</li>
          <li>• Store in a dry, cool place away from direct sunlight.</li>
          <li>• Keep closed when not in use.</li>
          <li>• Clean before first use.</li>
          <li>• Do not use if cracked or visibly damaged.</li>
        </ul>
      </>
    )}

    {product.slug === "unity-bottle" && (
      <>
        <p>
          Limited visual edition with translucent collector character, designed as a seasonal extension of the refill ritual.
        </p>
        <ul className="mt-4 space-y-2">
          <li>• Limited-edition visual finish.</li>
          <li>• Designed for cold still water and VYTAL tablets.</li>
          <li>• Refills are sold separately unless included in a bundle.</li>
          <li>• Hand-wash recommended to protect the surface finish.</li>
          <li>• Do not use if cracked, leaking or visibly damaged.</li>
        </ul>
      </>
    )}

    <p className="mt-4">
      Product must be used as intended. Always clean before first use.
    </p>
  </div>
)}

            <div className="mt-8 flex items-center gap-4">
              <div className="inline-flex items-center border border-border rounded-full">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className={`flex-1 bg-foreground text-background px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:bg-primary ${
                      added ? "scale-[1.03] animate-pulse" : ""
                  }`}
                >
                  −
                </button>
                <span className="w-10 text-center font-mono">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className={`flex-1 bg-foreground text-background px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:bg-primary ${
                      added ? "scale-[1.03] animate-pulse" : ""
                  }`}
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAdd}
                className={`flex-1 bg-foreground text-background px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:bg-primary ${
                    added ? "scale-[1.03] animate-pulse" : ""
                }`} 
              >
                {added ? "Added ✓" : `Add to cart · ${formatPrice(qty * unitPrice)}`}
              </button>
              {product.category === "refill" && (
                <p className="mt-3 text-[11px] text-muted-foreground">
                  {formatPrice(basePrice)} refill + {formatPrice(deposit)} refundable cylinder deposit.
                </p>
              )}
            </div>

            <Link
              to="/shop/$slug"
              params={{ slug: product.slug }}
              className="mt-5 inline-flex font-mono text-[10px] uppercase tracking-[0.25em] text-primary hover:text-foreground"
            >
              Full product page →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}