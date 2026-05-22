import { Link } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";
import { useCart, formatPrice } from "@/contexts/cart-context";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export function CartDrawer() {
  const { items, isOpen, close, setQty, remove, subtotal, count } = useCart();
  return (
    <Sheet open={isOpen} onOpenChange={(o) => !o && close()}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md p-0 bg-background/85 backdrop-blur-2xl border-l border-border"
      >
        <div className="flex h-full flex-col">
          <SheetHeader className="p-6 border-b border-border">
            <SheetTitle className="font-display text-xl tracking-tight">
              Your ritual · {count}
            </SheetTitle>
            <p className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground">
              A calmer cart
            </p>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-6 py-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-24">
                <p className="font-display text-2xl tracking-tight">It's quiet here.</p>
                <p className="mt-3 text-sm text-muted-foreground max-w-xs">
                  Nothing in your cart yet. Begin with a starter ritual or a single refill.
                </p>
                <Link
                  to="/shop"
                  onClick={close}
                  className="mt-8 inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-full text-sm hover:bg-primary transition-colors"
                >
                  Explore the shop →
                </Link>
              </div>
            ) : (
              <ul className="divide-y divide-border">
                {items.map((i) => (
                  <li key={i.id} className="py-5 flex gap-4">
                    <div className="size-20 shrink-0 overflow-hidden rounded-md bg-secondary/40">
                      <img src={i.image} alt={i.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="font-display text-sm font-semibold truncate">{i.name}</p>
                          {i.variant && (
                            <p className="text-[11px] font-mono text-muted-foreground mt-0.5">
                              {i.variant}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => remove(i.id)}
                          aria-label="Remove"
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <X className="size-3.5" />
                        </button>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="inline-flex items-center gap-1 border border-border rounded-full">
                          <button
                            onClick={() => setQty(i.id, i.qty - 1)}
                            className="size-7 grid place-items-center hover:bg-secondary rounded-l-full transition-colors"
                            aria-label="Decrease"
                          >
                            <Minus className="size-3" />
                          </button>
                          <span className="w-7 text-center text-xs font-mono">{i.qty}</span>
                          <button
                            onClick={() => setQty(i.id, i.qty + 1)}
                            className="size-7 grid place-items-center hover:bg-secondary rounded-r-full transition-colors"
                            aria-label="Increase"
                          >
                            <Plus className="size-3" />
                          </button>
                        </div>
                        <p className="font-mono text-sm">{formatPrice(i.qty * i.unitPrice)}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t border-border p-6 space-y-4 bg-background/70 backdrop-blur">
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                  Subtotal
                </span>
                <span className="font-display text-2xl">{formatPrice(subtotal)}</span>
              </div>
              <p className="text-[11px] text-muted-foreground">
                Shipping and taxes calculated at checkout. Carbon-neutral delivery across the EU.
              </p>
              <Link
                to="/checkout"
                onClick={close}
                className="block w-full text-center bg-foreground text-background rounded-full py-4 text-sm font-medium hover:bg-primary transition-colors"
              >
                Continue to checkout →
              </Link>
              <button
                onClick={close}
                className="block w-full text-center text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Keep browsing
              </button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}