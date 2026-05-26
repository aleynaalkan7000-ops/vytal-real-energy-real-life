import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="px-6 pt-20 pb-10 border-t border-border bg-secondary/40">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10 mb-16">
        <div className="md:col-span-2 max-w-sm">
          <Link to="/" className="font-display text-2xl font-extrabold tracking-tight uppercase">
            Vytal
          </Link>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            Sustainable functional energy and a refill system designed for real life — calm focus,
            no crash, less waste.
          </p>
          <p className="mt-6 italic text-sm text-foreground">(Re)Fuel your day. Not the planet.</p>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-4">
            Explore
          </p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/shop" className="hover:text-primary">Shop</Link></li>
            <li><Link to="/refill" className="hover:text-primary">Refill System</Link></li>
            <li><Link to="/journal" className="hover:text-primary">Journal</Link></li>
            <li><Link to="/about" className="hover:text-primary">About</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
            <li><Link to="/imprint" className="hover:text-primary">Impressum</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-4">
            Stay in flow
          </p>
          <p className="text-sm text-muted-foreground mb-3">
            Slow newsletter. New drops, journal pieces, no spam.
          </p>
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              required
              placeholder="you@calm.day"
              className="flex-1 bg-background border border-border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
            <button
              type="submit"
              className="bg-foreground text-background rounded-full px-4 py-2 text-sm font-medium hover:bg-primary"
            >
              Join
            </button>
          </form>
        </div>
      </div>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-widest text-muted-foreground border-t border-border pt-8">
        <span>© {new Date().getFullYear()} VYTAL — Energy that fits real life.</span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-foreground">Privacy</a>
          <a href="#" className="hover:text-foreground">Terms</a>
          <a href="#" className="hover:text-foreground">Imprint</a>
        </div>
      </div>
    </footer>
  );
}