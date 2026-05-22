import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { products, categories, type Product } from "@/lib/vytal-products";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import shopHero from "@/assets/shop-hero.jpg";
import shopStarterKit from "@/assets/shop-starter-kit.jpg";
import shopRitualDesk from "@/assets/shop-ritual-desk.jpg";
import shopHeroBottle from "@/assets/shop-hero-bottle.jpg";
import { useCart, parsePrice, formatPrice } from "@/contexts/cart-context";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — VYTAL · Built for calmer focus." },
      { name: "description", content: "A premium editorial shop for VYTAL refills, bottles and starter rituals. Energy without the aggression. Designed for real routines." },
      { property: "og:title", content: "Shop — VYTAL · Built for calmer focus." },
      { property: "og:description", content: "Premium hydration and focus rituals for modern overstimulation." },
      { property: "og:image", content: shopHero },
    ],
  }),
  component: ShopPage,
});

type FilterId = "all" | Product["category"];

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
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useParallax(ref: React.RefObject<HTMLElement | null>, intensity = 0.15) {
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
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [ref, intensity]);
}

function ShopPage() {
  const [filter, setFilter] = useState<FilterId>("all");
  const [active, setActive] = useState<Product | null>(null);
  const heroImgRef = useRef<HTMLImageElement>(null);
  useReveal();
  useParallax(heroImgRef as unknown as React.RefObject<HTMLElement | null>, 0.08);

  const filtered = useMemo(
    () => (filter === "all" ? products : products.filter((p) => p.category === filter)),
    [filter],
  );

  const refills = products.filter((p) => p.category === "refill");
  const bottles = products.filter((p) => p.category === "bottle");
  const scrollTo = (id: string) => () =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SiteHeader />

      {/* HERO ── cinematic opening */}
      <section className="relative min-h-[92vh] flex items-end overflow-hidden bg-gradient-to-b from-secondary/60 via-background to-background">
        <div className="absolute inset-0 -z-10">
          <img
            ref={heroImgRef}
            src={shopHero}
            alt="A single translucent VYTAL bottle catching morning light"
            width={1600}
            height={1024}
            className="absolute inset-0 h-[115%] w-full object-cover opacity-95"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto w-full px-6 md:px-10 pb-20 md:pb-28 pt-40 grid md:grid-cols-12 gap-8">
          <div className="md:col-span-7">
            <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-primary block mb-8 reveal">
              The shop · Volume 01
            </span>
            <h1 className="font-display text-[clamp(3rem,8vw,7.5rem)] font-extrabold leading-[0.95] tracking-tight text-balance reveal">
              Built for <em className="not-italic text-primary">calmer</em> focus.
            </h1>
            <p className="mt-8 max-w-lg text-lg md:text-xl text-muted-foreground leading-relaxed reveal">
              Premium hydration and focus rituals for modern overstimulation. Energy without the
              aggression. Designed for the routines you already live.
            </p>

            <div className="mt-12 flex flex-wrap gap-3 reveal">
              <button
                onClick={scrollTo("starter")}
                className="group inline-flex items-center gap-2 bg-foreground text-background px-7 py-4 rounded-full text-sm font-medium hover:bg-primary transition-colors"
              >
                Shop starter kits
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </button>
              <button
                onClick={scrollTo("refills")}
                className="inline-flex items-center gap-2 border border-foreground/15 px-7 py-4 rounded-full text-sm font-medium hover:bg-secondary transition-colors"
              >
                Explore flavours
              </button>
              <Link
                to="/shop/starter-kit"
                className="inline-flex items-center gap-2 px-5 py-4 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Build your ritual →
              </Link>
            </div>
          </div>

          <div className="md:col-span-5 relative hidden md:block">
            <div className="relative aspect-[3/4] reveal">
              <img
                src={shopHeroBottle}
                alt="A translucent sage VYTAL bottle with dissolving tablets floating in soft light"
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

      {/* INTRO QUOTE — slow editorial pause */}
      <section className="px-6 md:px-10 max-w-5xl mx-auto py-32 md:py-48 text-center">
        <p className="font-display text-3xl md:text-5xl leading-[1.15] tracking-tight text-balance reveal">
          Small rituals.<span className="text-muted-foreground"> </span>
          <span className="text-muted-foreground">Better days.</span>
        </p>
        <p className="mt-8 max-w-xl mx-auto text-muted-foreground reveal">
          Six functional refills. Five system bottles. One calm idea — energy that fits the life
          you already live.
        </p>
      </section>

      {/* FILTER STRIP */}
      <div id="refills" className="sticky top-16 z-30 bg-background/85 backdrop-blur-md border-y border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between gap-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground hidden md:block">
            The collection
          </span>
          <div className="flex flex-wrap gap-2 ml-auto">
            {(
              [{ id: "all", label: "All" }, ...categories] as { id: FilterId; label: string }[]
            ).map((c) => (
              <button
                key={c.id}
                onClick={() => setFilter(c.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-all ${
                  filter === c.id
                    ? "bg-foreground text-background border-foreground"
                    : "border-border bg-background hover:bg-secondary"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* EDITORIAL PRODUCT GRID */}
      <section className="px-6 md:px-10 py-20 md:py-28 max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-16">
          {filtered.map((p, i) => (
            <button
              key={p.slug}
              onClick={() => setActive(p)}
              className={`text-left group reveal flex flex-col ${
                i % 5 === 0 ? "lg:mt-12" : i % 5 === 3 ? "lg:-mt-8" : ""
              }`}
            >
              <div className="aspect-[4/5] relative overflow-hidden rounded-md bg-secondary/40">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  width={768}
                  height={960}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute top-5 left-5 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/80">
                  {String(i + 1).padStart(2, "0")} · {p.category}
                </div>
                <div className="absolute inset-x-5 bottom-5 flex items-end justify-between opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-background bg-foreground/85 backdrop-blur px-3 py-1.5 rounded-full">
                    View product →
                  </span>
                </div>
              </div>
              <div className="mt-6 flex items-baseline justify-between gap-3">
                <p className="font-display text-xl font-semibold tracking-tight">{p.name.replace("VYTAL ", "")}</p>
                <span className="font-mono text-xs text-muted-foreground">{p.price.split("/")[0].trim()}</span>
              </div>
              <p className="text-[13px] font-mono text-primary/80 mt-1">{p.flavor ?? p.color}</p>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed max-w-sm">{p.tagline}</p>
            </button>
          ))}
        </div>
      </section>

      {/* SYSTEM / RITUAL — cinematic split */}
      <section id="system" className="relative py-32 md:py-48 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5 md:col-start-1 reveal">
            <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-primary block mb-6">
              Inside the bottle
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-extrabold leading-[1.02] tracking-tight text-balance">
              Energy without the aggression.
            </h2>
            <p className="mt-8 text-muted-foreground text-lg leading-relaxed max-w-md">
              Slow-release caffeine from organic matcha and guarana, balanced with L-Theanine and
              adaptogens. Focus that doesn't make you flinch by 3pm.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-6 max-w-md">
              {[
                { k: "Matcha", v: "Steady, not spiky" },
                { k: "L-Theanine", v: "Calmer alertness" },
                { k: "Ashwagandha", v: "Adaptogen balance" },
                { k: "Electrolytes", v: "Hydration support" },
              ].map((i) => (
                <div key={i.k} className="border-t border-border pt-3">
                  <p className="font-display text-base font-semibold">{i.k}</p>
                  <p className="text-xs text-muted-foreground mt-1">{i.v}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="md:col-span-6 md:col-start-7 reveal">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
              <img
                src={shopRitualDesk}
                alt="A VYTAL bottle catching afternoon light on a quiet desk"
                loading="lazy"
                width={1400}
                height={1000}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 bg-gradient-to-t from-background/70 to-transparent">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/80">
                  Ritual · 16:42
                </p>
                <p className="font-display text-xl mt-2 text-foreground">The afternoon reset.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STARTER KIT — premium bundle moment */}
      <section id="starter" className="bg-foreground text-background py-32 md:py-48 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-6 reveal">
            <div className="relative aspect-[5/4] overflow-hidden rounded-sm">
              <img
                src={shopStarterKit}
                alt="The VYTAL starter kit: bottle, refills and linen sleeve"
                loading="lazy"
                width={1600}
                height={1100}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="md:col-span-5 md:col-start-8 reveal">
            <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-accent block mb-6">
              The Starter Ritual
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-extrabold leading-[1.02] tracking-tight text-balance">
              A slower system, in one box.
            </h2>
            <p className="mt-8 text-background/70 text-lg leading-relaxed max-w-md">
              One glass bottle, five refills across the full range, and a linen sleeve. Open it
              once. Use it for years.
            </p>
            <ul className="mt-10 space-y-3 text-sm">
              {[
                "1 × GO Bottle, borosilicate glass",
                "5 × Refills — Focus, Flow, Balance, Refresh, Recharge",
                "1 × Linen carry sleeve",
                "Lifetime access to VYTAL refill stations",
              ].map((i) => (
                <li key={i} className="flex gap-3 text-background/85 border-b border-background/10 pb-3">
                  <span className="text-accent">—</span>
                  {i}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex items-baseline justify-between">
              <div>
                <p className="font-mono text-xs text-background/60">Starter ritual</p>
                <p className="font-display text-2xl font-semibold">€48</p>
              </div>
              <button
                onClick={() => setActive(bottles[0] ?? refills[0])}
                className="bg-background text-foreground px-7 py-4 rounded-full text-sm font-medium hover:bg-accent transition-colors"
              >
                Add the kit →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* RITUAL / LIFESTYLE PULL QUOTE */}
      <section className="py-32 md:py-48 px-6 md:px-10 max-w-5xl mx-auto text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-primary mb-8 reveal">
          The everyday
        </p>
        <p className="font-display text-3xl md:text-5xl leading-[1.15] tracking-tight text-balance reveal">
          “First energy drink I drink for the <em className="not-italic text-primary">feeling</em>, not the kick.”
        </p>
        <p className="mt-8 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground reveal">
          Sophie B. · Product designer · Berlin
        </p>
      </section>

      {/* FINAL CTA */}
      <section className="relative min-h-[70vh] flex items-center justify-center px-6 md:px-10 overflow-hidden bg-secondary/40">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-primary/15 blur-3xl animate-drift" />
          <div className="absolute -bottom-40 -right-20 w-[520px] h-[520px] rounded-full bg-accent/25 blur-3xl animate-drift" style={{ animationDelay: "-8s" }} />
        </div>
        <div className="text-center max-w-3xl reveal py-32">
          <h2 className="font-display text-5xl md:text-7xl font-extrabold leading-[0.98] tracking-tight text-balance">
            Built calmly. <span className="text-muted-foreground">On purpose.</span>
          </h2>
          <p className="mt-8 text-lg text-muted-foreground max-w-xl mx-auto">
            A slower system for modern energy. Refill. Breathe. Continue.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            <button
              onClick={scrollTo("refills")}
              className="bg-foreground text-background px-8 py-4 rounded-full text-sm font-medium hover:bg-primary transition-colors"
            >
              Shop VYTAL →
            </button>
            <button
              onClick={scrollTo("starter")}
              className="border border-foreground/15 px-8 py-4 rounded-full text-sm font-medium hover:bg-background transition-colors"
            >
              Start your ritual
            </button>
          </div>
        </div>
      </section>

      <ProductSheet
        product={active}
        onClose={() => setActive(null)}
      />

      <SiteFooter />
    </main>
  );
}

function ProductSheet({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const [qty, setQty] = useState(1);
  const { add } = useCart();
  useEffect(() => { setQty(1); }, [product?.slug]);
  const unit = product ? parsePrice(product.price) : 0;
  const handleAdd = () => {
    if (!product) return;
    add({
      id: product.slug,
      name: product.name,
      variant: product.flavor ?? product.color,
      image: product.image,
      unitPrice: unit,
      qty,
    });
    onClose();
  };
  return (
    <Sheet open={!!product} onOpenChange={(o) => !o && onClose()}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-xl overflow-y-auto p-0"
      >
        {product && (
          <div className="flex flex-col">
            <div className="relative h-72 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
                width={768}
                height={960}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-background/85 to-transparent">
                <span className="font-mono text-[11px] uppercase tracking-widest text-foreground/80">
                  {product.category} · {product.color}
                </span>
                <p className="font-display text-2xl font-extrabold text-foreground">
                  {product.name.replace("VYTAL ", "")}
                </p>
              </div>
            </div>

            <div className="p-6 md:p-8 space-y-8">
              <SheetHeader className="space-y-2 text-left">
                <SheetTitle className="font-display text-2xl">{product.name}</SheetTitle>
                <SheetDescription className="text-base">{product.tagline}</SheetDescription>
              </SheetHeader>

              <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>

              {product.flavor && (
                <div className="rounded-2xl border border-border p-5 bg-secondary/40">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-primary mb-1">
                    Flavor
                  </p>
                  <p className="font-semibold">{product.flavor}</p>
                  <p className="text-sm text-muted-foreground">{product.flavorNote}</p>
                </div>
              )}

              <Block title="Ingredients & why">
                <ul className="space-y-2">
                  {product.ingredients.map((i) => (
                    <li key={i.name} className="flex justify-between gap-4 text-sm border-b border-border pb-2">
                      <span className="font-medium">{i.name}</span>
                      {i.why && <span className="text-muted-foreground text-right max-w-[60%]">{i.why}</span>}
                    </li>
                  ))}
                </ul>
              </Block>

              <Block title="Benefits">
                <ul className="grid grid-cols-1 gap-2 text-sm">
                  {product.benefits.map((b) => (
                    <li key={b} className="flex gap-2"><span className="text-primary">✓</span>{b}</li>
                  ))}
                </ul>
              </Block>

              {product.nutrition.length > 0 && (
                <Block title="Nutrition (per serving)">
                  <dl className="grid grid-cols-2 gap-3 text-sm">
                    {product.nutrition.map((n) => (
                      <div key={n.label} className="rounded-xl bg-secondary/50 px-3 py-2">
                        <dt className="text-xs text-muted-foreground">{n.label}</dt>
                        <dd className="font-mono">{n.value}</dd>
                      </div>
                    ))}
                  </dl>
                </Block>
              )}

              <Block title="Focus without crash">
                <p className="text-sm text-muted-foreground leading-relaxed">{product.crashExplainer}</p>
              </Block>

              <Block title="When to use it">
                <div className="flex flex-wrap gap-2">
                  {product.situations.map((s) => (
                    <span key={s} className="px-3 py-1 rounded-full bg-secondary text-xs">
                      {s}
                    </span>
                  ))}
                </div>
              </Block>

              {product.material && (
                <Block title="Material">
                  <p className="text-sm text-muted-foreground">{product.material}</p>
                </Block>
              )}

              <Block title="Refill compatibility">
                <p className="text-sm text-muted-foreground">{product.refillCompat}</p>
              </Block>

              <Block title="Sustainability">
                <p className="text-sm text-muted-foreground leading-relaxed">{product.sustainability}</p>
              </Block>

              <Block title="What people say">
                <div className="space-y-3">
                  {product.reviews.map((r) => (
                    <figure key={r.name} className="p-4 rounded-2xl bg-secondary/50">
                      <blockquote className="text-sm">“{r.quote}”</blockquote>
                      <figcaption className="mt-2 text-xs text-muted-foreground">
                        {r.name} — {r.role}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </Block>

              <div className="sticky bottom-0 -mx-6 md:-mx-8 px-6 md:px-8 py-5 bg-background/95 backdrop-blur border-t border-border">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-mono text-sm">{product.price}</p>
                    {product.bundle && (
                      <p className="text-xs text-muted-foreground">Bundle: {product.bundle}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 border border-border rounded-full px-2 py-1">
                    <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="size-7 grid place-items-center">−</button>
                    <span className="w-6 text-center text-sm font-mono">{qty}</span>
                    <button onClick={() => setQty((q) => q + 1)} className="size-7 grid place-items-center">+</button>
                  </div>
                </div>
                <button className="w-full bg-foreground text-background rounded-full py-3.5 text-sm font-semibold hover:bg-primary transition-colors">
                  <span onClick={handleAdd} className="block w-full">Add to cart · {formatPrice(qty * unit)}</span>
                </button>
                <Link
                  to="/shop/$slug"
                  params={{ slug: product.slug }}
                  onClick={onClose}
                  className="mt-2 block text-center text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground"
                >
                  View full ritual →
                </Link>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="font-mono text-[10px] uppercase tracking-widest text-primary mb-3">{title}</h4>
      {children}
    </div>
  );
}