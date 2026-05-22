import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ShoppingBag, User } from "lucide-react";
import { useCart } from "@/contexts/cart-context";

const links = [
  { to: "/shop", label: "Shop" },
  { to: "/refill", label: "Refill System" },
  { to: "/journal", label: "Journal" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { count, toggle } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
        scrolled
          ? "backdrop-blur-xl bg-background/70 border-b border-border/70"
          : "backdrop-blur-md bg-background/40 border-b border-transparent"
      }`}
    >
      <nav className="flex items-center justify-between px-6 md:px-10 py-4 max-w-7xl mx-auto">
        <Link to="/" className="font-display text-xl font-extrabold tracking-tight uppercase">
          Vytal
        </Link>
        <div className="hidden md:flex gap-8 text-sm font-medium text-muted-foreground">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="relative hover:text-foreground transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:bg-foreground after:scale-x-0 after:origin-right after:transition-transform after:duration-500 hover:after:scale-x-100 hover:after:origin-left"
              activeProps={{ className: "text-foreground" }}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-1">
          <Link
            to="/account"
            aria-label="Account"
            className="hidden sm:grid size-10 place-items-center text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-secondary/60"
          >
            <User className="size-[18px]" strokeWidth={1.5} />
          </Link>
          <button
            type="button"
            onClick={toggle}
            aria-label={`Cart, ${count} items`}
            className="relative grid size-10 place-items-center text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-secondary/60"
          >
            <ShoppingBag className="size-[18px]" strokeWidth={1.5} />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 grid place-items-center min-w-[18px] h-[18px] px-1 rounded-full bg-foreground text-background text-[10px] font-mono leading-none animate-in fade-in zoom-in duration-300">
                {count}
              </span>
            )}
          </button>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 -mr-2 text-foreground ml-1"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="md:hidden border-t border-border px-6 py-4 flex flex-col gap-4 bg-background">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="text-base font-medium text-muted-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/account"
            onClick={() => setOpen(false)}
            className="mt-2 border border-border px-5 py-3 rounded-full text-sm font-medium text-center"
          >
            Account
          </Link>
        </div>
      )}
    </header>
  );
}