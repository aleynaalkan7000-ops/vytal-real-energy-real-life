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
          <p className="mt-4 italic text-sm text-foreground">{tx.footer.tagline}</p>
          <div className="mt-6">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
              {tx.footer.socialLabel}
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/vytal.energy"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="VYTAL auf Instagram"
                className="size-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@vytal.energy"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="VYTAL auf TikTok"
                className="size-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.77a4.85 4.85 0 0 1-1.01-.08z"/>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/vytal-energy"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="VYTAL auf LinkedIn"
                className="size-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
            </div>
          </div>
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