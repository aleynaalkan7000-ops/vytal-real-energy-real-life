import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useCart, formatPrice } from "@/contexts/cart-context";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — VYTAL" },
      { name: "description", content: "Review your VYTAL ritual before checkout." },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { items, subtotal, setQty, remove } = useCart();
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="max-w-5xl mx-auto px-6 md:px-10 py-24 md:py-32 grid lg:grid-cols-12 gap-16">
        <div className="lg:col-span-7">
          <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-primary">
            Checkout · Volume 03
          </span>
          <h1 className="mt-6 font-display text-5xl md:text-6xl font-extrabold leading-[0.98] tracking-tight">
            A calm checkout.
          </h1>
          <p className="mt-6 text-muted-foreground max-w-md leading-relaxed">
            Shipping, payment and confirmation will live here. For now, review your ritual — full
            checkout arrives with the account layer.
          </p>

          <div className="mt-14">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-6">
              Your ritual
            </h2>
            {items.length === 0 ? (
              <p className="text-muted-foreground">
                Your cart is quiet.{" "}
                <Link to="/shop" className="underline underline-offset-4 hover:text-foreground">
                  Find your refills →
                </Link>
              </p>
            ) : (
              <ul className="divide-y divide-border">
                {items.map((i) => (
                  <li key={i.id} className="py-5 flex gap-5 items-center">
                    <div className="size-20 overflow-hidden rounded-md bg-secondary/40 shrink-0">
                      <img src={i.image} alt={i.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-display font-semibold">{i.name}</p>
                      {i.variant && (
                        <p className="font-mono text-[11px] text-muted-foreground mt-0.5">
                          {i.variant}
                        </p>
                      )}
                    </div>
                    <div className="inline-flex items-center gap-1 border border-border rounded-full">
                      <button
                        onClick={() => setQty(i.id, i.qty - 1)}
                        className="size-7 grid place-items-center hover:bg-secondary rounded-l-full"
                      >−</button>
                      <span className="w-6 text-center text-xs font-mono">{i.qty}</span>
                      <button
                        onClick={() => setQty(i.id, i.qty + 1)}
                        className="size-7 grid place-items-center hover:bg-secondary rounded-r-full"
                      >+</button>
                    </div>
                    <p className="font-mono text-sm w-20 text-right">{formatPrice(i.qty * i.unitPrice)}</p>
                    <button
                      onClick={() => remove(i.id)}
                      className="text-muted-foreground hover:text-foreground text-xs font-mono"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <aside className="lg:col-span-5 lg:sticky lg:top-28 self-start">
          <div className="rounded-2xl border border-border bg-secondary/30 p-8 backdrop-blur">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              Summary
            </h3>
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-mono">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-mono text-muted-foreground">Calculated next</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-border">
                <span className="font-display text-lg">Total today</span>
                <span className="font-display text-lg">{formatPrice(subtotal)}</span>
              </div>
            </div>
            <button
              disabled={items.length === 0}
              className="mt-8 w-full bg-foreground text-background rounded-full py-4 text-sm font-medium hover:bg-primary transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Continue to shipping →
            </button>
            <p className="mt-4 text-[11px] text-muted-foreground text-center">
              Carbon-neutral delivery · 30-day returns
            </p>
          </div>
        </aside>
      </section>
      <SiteFooter />
    </main>
  );
}