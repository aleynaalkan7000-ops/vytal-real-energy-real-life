import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
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

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — VYTAL refills, bottles & bundles" },
      { name: "description", content: "Browse VYTAL refills, premium reusable bottles and starter bundles. Slide-in product details for every item." },
      { property: "og:title", content: "Shop — VYTAL refills, bottles & bundles" },
      { property: "og:description", content: "Calm focus, no crash, no waste. Find your refill, bottle or bundle." },
    ],
  }),
  component: ShopPage,
});

type FilterId = "all" | Product["category"];

function ShopPage() {
  const [filter, setFilter] = useState<FilterId>("all");
  const [active, setActive] = useState<Product | null>(null);

  const filtered = useMemo(
    () => (filter === "all" ? products : products.filter((p) => p.category === filter)),
    [filter],
  );

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="px-6 md:px-10 pt-16 md:pt-24 pb-12 max-w-7xl mx-auto">
        <span className="font-mono text-xs text-primary mb-4 block">Online shop</span>
        <h1 className="font-display text-4xl md:text-6xl font-extrabold leading-[1.05] max-w-3xl">
          Build your refill ritual.
        </h1>
        <p className="mt-6 max-w-xl text-muted-foreground text-lg">
          Six functional refills, five system bottles, one calm idea. Tap any product to slide in
          the full breakdown — ingredients, nutrition, sustainability and pairing.
        </p>

        <div className="mt-10 flex flex-wrap gap-2">
          {(
            [{ id: "all", label: "All" }, ...categories] as { id: FilterId; label: string }[]
          ).map((c) => (
            <button
              key={c.id}
              onClick={() => setFilter(c.id)}
              className={`px-4 py-2 rounded-full text-sm border transition-all ${
                filter === c.id
                  ? "bg-foreground text-background border-foreground"
                  : "border-border bg-background hover:bg-secondary"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-10 pb-24 max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p) => (
            <button
              key={p.slug}
              onClick={() => setActive(p)}
              className="text-left group rounded-3xl border border-border bg-secondary/40 hover:bg-secondary p-6 transition-all flex flex-col"
            >
              <div className="aspect-[4/5] rounded-2xl relative overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  width={768}
                  height={960}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-background/85 backdrop-blur text-[10px] font-mono uppercase tracking-widest text-foreground">
                  {p.category}
                </div>
              </div>
              <div className="mt-5 flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">{p.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {p.flavor ?? p.color}
                  </p>
                </div>
                <span className="font-mono text-sm">{p.price}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-3">{p.tagline}</p>
              <span className="mt-4 inline-flex text-xs font-mono text-primary group-hover:translate-x-1 transition-transform">
                View details →
              </span>
            </button>
          ))}
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
                  Add to cart · {qty} × {product.price.split("/")[0].trim()}
                </button>
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