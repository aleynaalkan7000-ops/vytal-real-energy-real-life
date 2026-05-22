import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { products, type Product } from "@/lib/vytal-products";
import { useCart, parsePrice, formatPrice } from "@/contexts/cart-context";
import { Minus, Plus } from "lucide-react";

export const Route = createFileRoute("/shop/$slug")({
  loader: ({ params }) => {
    const product = products.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) =>
    loaderData
      ? {
          meta: [
            { title: `${loaderData.product.name} — VYTAL` },
            { name: "description", content: loaderData.product.tagline },
            { property: "og:title", content: `${loaderData.product.name} — VYTAL` },
            { property: "og:description", content: loaderData.product.tagline },
            { property: "og:image", content: loaderData.product.image },
          ],
        }
      : { meta: [{ title: "Product — VYTAL" }] },
  notFoundComponent: () => (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="max-w-3xl mx-auto px-6 py-40 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
          404 · Not in the collection
        </p>
        <h1 className="mt-6 font-display text-5xl font-extrabold">This ritual doesn't exist.</h1>
        <Link
          to="/shop"
          className="mt-10 inline-flex bg-foreground text-background px-7 py-4 rounded-full text-sm"
        >
          Return to the shop →
        </Link>
      </section>
      <SiteFooter />
    </main>
  ),
  errorComponent: ({ reset }) => (
    <div className="min-h-screen grid place-items-center bg-background text-foreground p-10">
      <div className="text-center">
        <p className="font-display text-2xl">Something interrupted this page.</p>
        <button
          onClick={reset}
          className="mt-6 bg-foreground text-background px-6 py-3 rounded-full text-sm"
        >
          Try again
        </button>
      </div>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData() as { product: Product };
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const unitPrice = parsePrice(product.price);

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
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [product.slug]);

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
    setTimeout(() => setAdded(false), 1600);
  };

  const others = products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SiteHeader />

      {/* HERO ── product dominates */}
      <section className="relative pt-28 pb-20 md:pt-32 md:pb-28">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 relative reveal">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-secondary/40">
              <img
                src={product.image}
                alt={product.name}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute top-6 left-6 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/70">
                {product.category} · {product.color}
              </div>
            </div>
            <div className="pointer-events-none absolute -top-10 -left-10 size-72 rounded-full bg-primary/15 blur-3xl animate-drift" />
            <div className="pointer-events-none absolute -bottom-16 -right-10 size-80 rounded-full bg-accent/25 blur-3xl animate-drift" style={{ animationDelay: "-6s" }} />
          </div>

          <div className="lg:col-span-5 reveal">
            <Link
              to="/shop"
              className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Shop
            </Link>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.32em] text-primary">
              {product.function}
            </p>
            <h1 className="mt-4 font-display text-5xl md:text-6xl font-extrabold leading-[0.98] tracking-tight text-balance">
              {product.name.replace("VYTAL ", "")}.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{product.tagline}</p>
            <p className="mt-6 text-sm text-muted-foreground leading-relaxed">{product.description}</p>

            {product.flavor && (
              <div className="mt-8 rounded-2xl border border-border p-5 bg-secondary/40">
                <p className="font-mono text-[10px] uppercase tracking-widest text-primary">Flavor</p>
                <p className="mt-1 font-semibold">{product.flavor}</p>
                <p className="text-sm text-muted-foreground">{product.flavorNote}</p>
              </div>
            )}

            <div className="mt-10 flex items-center gap-4">
              <div className="inline-flex items-center gap-1 border border-border rounded-full">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="size-10 grid place-items-center hover:bg-secondary rounded-l-full transition-colors"
                  aria-label="Decrease"
                >
                  <Minus className="size-3.5" />
                </button>
                <span className="w-10 text-center font-mono text-sm">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="size-10 grid place-items-center hover:bg-secondary rounded-r-full transition-colors"
                  aria-label="Increase"
                >
                  <Plus className="size-3.5" />
                </button>
              </div>
              <button
                onClick={handleAdd}
                className="flex-1 group relative overflow-hidden bg-foreground text-background rounded-full py-4 px-6 text-sm font-medium hover:bg-primary transition-colors"
              >
                <span className={`block transition-all duration-500 ${added ? "-translate-y-8 opacity-0" : ""}`}>
                  Add to ritual · {formatPrice(qty * unitPrice)}
                </span>
                <span className={`absolute inset-0 grid place-items-center transition-all duration-500 ${added ? "" : "translate-y-8 opacity-0"}`}>
                  Added to your ritual ✓
                </span>
              </button>
            </div>
            <p className="mt-4 text-[11px] text-muted-foreground">
              {product.price} · {product.bundle ?? "Refills available"}
            </p>
          </div>
        </div>
      </section>

      {/* INGREDIENTS + BENEFITS */}
      <section className="px-6 md:px-10 max-w-7xl mx-auto py-24 md:py-32 grid md:grid-cols-2 gap-16">
        <div className="reveal">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-6">Inside</p>
          <h2 className="font-display text-3xl md:text-4xl font-extrabold leading-tight tracking-tight">
            Six ingredients. One calm intent.
          </h2>
          <ul className="mt-10 divide-y divide-border">
            {product.ingredients.map((i) => (
              <li key={i.name} className="py-4 flex justify-between gap-6">
                <span className="font-display font-medium">{i.name}</span>
                {i.why && (
                  <span className="text-sm text-muted-foreground text-right max-w-[60%]">{i.why}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="reveal">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-6">What it does</p>
          <h2 className="font-display text-3xl md:text-4xl font-extrabold leading-tight tracking-tight">
            Steady. Not spiky.
          </h2>
          <ul className="mt-10 space-y-4">
            {product.benefits.map((b) => (
              <li key={b} className="flex gap-4 text-base">
                <span className="text-primary mt-1">—</span>
                <span className="leading-relaxed">{b}</span>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-sm text-muted-foreground leading-relaxed border-t border-border pt-6">
            {product.crashExplainer}
          </p>
        </div>
      </section>

      {/* RITUAL + NUTRITION */}
      <section className="bg-foreground text-background py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5 reveal">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-6">The ritual</p>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
              How it's used.
            </h2>
            <ol className="mt-10 space-y-5">
              {product.usage.map((u, i) => (
                <li key={u} className="flex gap-5">
                  <span className="font-mono text-[11px] text-accent w-6 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-background/85 leading-relaxed">{u}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="md:col-span-6 md:col-start-7 reveal">
            {product.nutrition.length > 0 && (
              <>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-6">
                  Nutrition (per serving)
                </p>
                <dl className="grid grid-cols-2 gap-4">
                  {product.nutrition.map((n) => (
                    <div key={n.label} className="border-t border-background/20 pt-4">
                      <dt className="font-mono text-[10px] uppercase tracking-widest text-background/60">{n.label}</dt>
                      <dd className="mt-1 font-display text-xl">{n.value}</dd>
                    </div>
                  ))}
                </dl>
              </>
            )}
            <div className="mt-12">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-6">When to use</p>
              <div className="flex flex-wrap gap-2">
                {product.situations.map((s) => (
                  <span key={s} className="px-4 py-2 rounded-full border border-background/20 text-sm">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="max-w-4xl mx-auto px-6 md:px-10 py-32 md:py-40 text-center">
        {product.reviews.map((r) => (
          <div key={r.name} className="reveal">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-8">In the field</p>
            <blockquote className="font-display text-3xl md:text-5xl leading-[1.15] tracking-tight text-balance">
              "{r.quote}"
            </blockquote>
            <figcaption className="mt-8 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {r.name} · {r.role}
            </figcaption>
          </div>
        ))}
      </section>

      {/* RELATED */}
      {others.length > 0 && (
        <section className="px-6 md:px-10 max-w-7xl mx-auto pb-32">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-10">
            Other rituals
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
            {others.map((p) => (
              <Link
                key={p.slug}
                to="/shop/$slug"
                params={{ slug: p.slug }}
                className="group block reveal"
              >
                <div className="aspect-[4/5] overflow-hidden rounded-md bg-secondary/40">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]"
                  />
                </div>
                <div className="mt-5 flex items-baseline justify-between">
                  <p className="font-display text-lg font-semibold">{p.name.replace("VYTAL ", "")}</p>
                  <span className="font-mono text-xs text-muted-foreground">{p.price.split("/")[0].trim()}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{p.tagline}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <SiteFooter />
    </main>
  );
}