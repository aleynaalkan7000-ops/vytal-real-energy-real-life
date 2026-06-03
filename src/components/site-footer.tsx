import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useLanguage } from "@/contexts/language-context";

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const { tx } = useLanguage();
  return (
    <footer className="px-6 pt-20 pb-10 border-t border-border bg-secondary/40">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10 mb-16">
        <div className="md:col-span-2 max-w-sm">
          <Link to="/" className="font-display text-2xl font-extrabold tracking-tight uppercase">
            Vytal
          </Link>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            {tx.footer.desc}
          </p>
          <p className="mt-6 italic text-sm text-foreground">{tx.footer.tagline}</p>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-4">
            {tx.footer.exploreLabel}
          </p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/shop" className="hover:text-primary">{tx.nav.shop}</Link></li>
            <li><Link to="/refill" className="hover:text-primary">{tx.nav.refill}</Link></li>
            <li><Link to="/journal" className="hover:text-primary">{tx.nav.journal}</Link></li>
            <li><Link to="/about" className="hover:text-primary">{tx.nav.about}</Link></li>
            <li><Link to="/contact" className="hover:text-primary">{tx.nav.contact}</Link></li>
            <li><Link to="/imprint" className="hover:text-primary">{tx.footer.imprintLabel}</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-4">
            {tx.footer.stayLabel}
          </p>
          <p className="text-sm text-muted-foreground mb-3">
            {tx.footer.newsletterDesc}
          </p>
          {sent ? (
            <p className="text-sm text-muted-foreground">You&rsquo;re on the list.</p>
          ) : (
            <form
              className="flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                window.open(
                  `mailto:hello@vytal.energy?subject=Newsletter&body=Please add me to the VYTAL newsletter: ${email}`,
                  "_blank"
                );
                setSent(true);
              }}
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@calm.day"
                className="flex-1 bg-background border border-border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
              <button
                type="submit"
                className="bg-foreground text-background rounded-full px-4 py-2 text-sm font-medium hover:bg-primary"
              >
                {tx.footer.newsletterCta}
              </button>
            </form>
          )}
        </div>
      </div>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-widest text-muted-foreground border-t border-border pt-8">
        <span>© {new Date().getFullYear()} VYTAL — Energy that fits real life.</span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-foreground">{tx.footer.privacyLabel}</a>
          <a href="#" className="hover:text-foreground">{tx.footer.termsLabel}</a>
          <Link to="/imprint" className="hover:text-foreground">{tx.footer.imprintLabel}</Link>
        </div>
      </div>
    </footer>
  );
}