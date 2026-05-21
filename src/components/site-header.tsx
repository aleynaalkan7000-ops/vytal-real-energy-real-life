import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/shop", label: "Shop" },
  { to: "/refill", label: "Refill System" },
  { to: "/journal", label: "Journal" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/75 border-b border-border">
      <nav className="flex items-center justify-between px-6 md:px-10 py-4 max-w-7xl mx-auto">
        <Link to="/" className="font-display text-xl font-extrabold tracking-tight uppercase">
          Vytal
        </Link>
        <div className="hidden md:flex gap-8 text-sm font-medium text-muted-foreground">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="hover:text-foreground transition-colors"
              activeProps={{ className: "text-foreground" }}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/shop"
            className="hidden md:inline-flex bg-foreground text-background px-5 py-2 rounded-full text-sm font-medium hover:bg-primary transition-all duration-300"
          >
            Try Vytal
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 -mr-2 text-foreground"
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
            to="/shop"
            onClick={() => setOpen(false)}
            className="mt-2 bg-foreground text-background px-5 py-3 rounded-full text-sm font-medium text-center"
          >
            Try Vytal
          </Link>
        </div>
      )}
    </header>
  );
}