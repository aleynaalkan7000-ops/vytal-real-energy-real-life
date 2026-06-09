import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { SiteFooter } from "@/components/site-footer";
import { products, type Product } from "@/lib/vytal-products";
import { useLanguage } from "@/contexts/language-context";
import { DiscountBanner } from "./discount-banner";
import cinematicHero from "@/assets/cinematic-hero.jpg";
import tabletDissolve from "@/assets/tablet-dissolve.jpg";
import ritualMorning from "@/assets/ritual-morning.png";
import ritualNight from "@/assets/ritual-night.jpg";
import dailyStudy from "@/assets/daily-study.jpg";
import dailyOffice from "@/assets/daily-office.jpg";
import productLineup from "@/assets/product-lineup-new.png";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VYTAL – Pflanzenbasierte Energie für Fokus." },
      {
        name: "description",
        content:
          "Nachfüllbare pflanzliche Energie-Tablets — ruhiger Fokus, kein Crash, keine Einwegdosen. Starter Kit ab 40 €. Lieferung nach DE & AT. Made in Heilbronn.",
      },
      { property: "og:title", content: "VYTAL – Pflanzenbasierte Energie für Fokus." },
      {
        property: "og:description",
        content: "Ruhiger Fokus. Kein Crash. Weniger Lärm. Das nachfüllbare Energie-Ritual für den Alltag.",
      },
    ],
  }),
  component: Index,
});

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "VYTAL",
  url: "https://vytal-energy.de",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "VYTAL",
  url: "https://vytal-energy.de",
  description:
    "Refillable plant-based focus supplements for everyday life. Calm energy, no crash, less waste.",
  foundingDate: "2026",
  foundingLocation: { "@type": "Place", name: "Heilbronn, Germany" },
  sameAs: [],
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "VYTAL Starter Kit",
  description:
    "The complete entry into the VYTAL refill system: reusable bottle, aluminum refill cylinder, all six functional flavors, linen sleeve and ritual card.",
  brand: { "@type": "Brand", name: "VYTAL" },
  offers: {
    "@type": "Offer",
    price: "40",
    priceCurrency: "EUR",
    availability: "https://schema.org/InStock",
  },
};

function Index() {
  useReveal();

  const [heroIndex, setHeroIndex] = useState(0);
  const starterKit = useMemo(() => products.find((p: Product) => p.slug === "starter-kit"), []);
  const variants = starterKit?.variants || [];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <Hero
        heroImage={cinematicHero}
        heroIndex={0}
      />
      <SocialProofStrip />
      <Overstimulation />
      <ComparisonSection />
      <SystemSection />
      <InsideBottle />
      <Rituals />
      <ProductTeaser />
      <Reviews />
      <JournalPreview />
      <NewsletterSection />
      <FinalCTA />
      <SiteFooter />
    </main>
  );
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function SocialProofStrip() {
  const { tx } = useLanguage();
  const items = tx.home.reviews.slice(0, 3);
  return (
    <section className="bg-secondary/60 border-b border-border/50 py-2.5 md:py-5 px-6">
      <div className="max-w-7xl mx-auto flex flex-row items-center gap-4 md:gap-10">
        {/* Mobile: compact single-line badge */}
        <div className="flex md:hidden items-center gap-3 w-full justify-center">
          <span className="font-display text-lg font-extrabold text-foreground leading-none">4.8</span>
          <span className="text-amber-400 text-sm tracking-wider">★★★★★</span>
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">· 143 Bewertungen</span>
        </div>
        {/* Desktop: full layout */}
        <div className="hidden md:flex flex-row items-center gap-10 w-full">
          <div className="shrink-0 text-center">
            <div className="font-display text-3xl font-extrabold leading-none">4.8</div>
            <div className="text-amber-400 text-base mt-0.5">★★★★★</div>
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mt-1">143</div>
          </div>
          <div className="w-px self-stretch bg-border shrink-0" />
          <div className="grid grid-cols-3 gap-5 flex-1">
            {items.map((r) => (
              <div key={r.name} className="flex flex-col gap-1">
                <div className="text-amber-400 text-[10px] tracking-wider">★★★★★</div>
                <p className="text-sm italic text-muted-foreground leading-snug">"{r.quote}"</p>
                <p className="text-xs font-semibold text-foreground">
                  {r.name} <span className="font-normal text-muted-foreground">· {r.role}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ComparisonSection() {
  const { tx } = useLanguage();
  return (
    <section className="relative bg-foreground text-background py-24 md:py-36 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="reveal mb-12">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-background/50 block mb-4">
            {tx.home.comparisonKicker}
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold leading-[1.02] text-balance">
            {tx.home.comparisonH2a}{" "}
            <span className="text-primary">{tx.home.comparisonH2b}</span>
          </h2>
          <p className="mt-4 text-background/60 text-lg max-w-lg">{tx.home.comparisonDesc}</p>
        </div>
        <div className="reveal overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                {tx.home.comparisonHeaders.map((h, i) => (
                  <th
                    key={i}
                    className={`text-left py-3 px-4 font-mono text-[10px] tracking-[0.2em] uppercase border-b border-background/15 ${
                      i === 1
                        ? "text-primary bg-background/8"
                        : "text-background/40"
                    }`}
                  >
                    {i === 1 ? "✦ " : ""}{h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tx.home.comparisonRows.map((row, ri) => (
                <tr key={ri} className="border-b border-background/10 last:border-0">
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className={`py-3.5 px-4 ${
                        ci === 0
                          ? "font-mono text-[10px] tracking-widest uppercase text-background/50"
                          : ci === 1
                          ? "font-semibold text-background bg-background/5"
                          : "text-background/45"
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function NewsletterSection() {
  const { tx } = useLanguage();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <section className="pt-6 md:pt-10 pb-20 md:pb-28 px-6 border-t border-border bg-secondary/30">
      <div className="max-w-xl mx-auto text-center reveal">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary block mb-5">
          {tx.home.newsletterKicker}
        </span>
        <h2 className="font-display text-3xl md:text-4xl font-extrabold leading-tight mb-4 text-balance">
          {tx.home.newsletterH2}
        </h2>
        <p className="text-muted-foreground mb-8 leading-relaxed">{tx.home.newsletterDesc}</p>
        {sent ? (
          <p className="text-sm text-muted-foreground">{tx.home.newsletterSent}</p>
        ) : (
          <form
            className="flex gap-2 max-w-sm mx-auto"
            onSubmit={(e) => {
              e.preventDefault();
              window.open(
                `mailto:hello@vytal.energy?subject=Newsletter&body=Please add me: ${email}`,
                "_blank",
              );
              setSent(true);
            }}
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={tx.home.newsletterPlaceholder}
              className="flex-1 bg-background border border-border rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
            <button
              type="submit"
              className="bg-foreground text-background rounded-full px-5 py-3 text-sm font-semibold hover:bg-primary transition-colors"
            >
              {tx.home.newsletterCta}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

function AmbientOrbs() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-32 -left-24 size-[42rem] rounded-full bg-primary/25 blur-3xl animate-drift" />
      <div className="absolute top-1/3 -right-32 size-[34rem] rounded-full bg-accent/25 blur-3xl animate-drift [animation-delay:-8s]" />
      <div className="absolute bottom-0 left-1/3 size-[28rem] rounded-full bg-clay/30 blur-3xl animate-drift [animation-delay:-14s]" />
    </div>
  );
}

function Hero({ heroImage, heroIndex }: { heroImage: string; heroIndex: number }) {
  const { tx } = useLanguage();
  return (
    <section
      id="top"
      className="relative min-h-[92vh] flex items-end overflow-hidden bg-foreground text-background grain"
    >
      <img
        key={heroIndex}
        src={heroImage}
        alt="VYTAL Starter Kit — refillable plant-based energy tablet dissolving in a glass bottle on a calm desk"
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover opacity-90 transition-opacity duration-1000 ease-in-out"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/55 via-foreground/20 to-foreground/85" />
      <AmbientOrbs />

      <div className="relative z-10 w-full px-6 md:px-12 pb-16 md:pb-24 pt-32">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-8">
            <span className="animate-reveal [animation-delay:100ms] font-mono text-[10px] tracking-[0.3em] uppercase text-background/70 block mb-8">
              {tx.hero.tag}
            </span>
            <h1 className="animate-reveal [animation-delay:200ms] font-display font-extrabold text-balance leading-[0.92] text-[clamp(3rem,9vw,8.5rem)]">
              {tx.hero.h1a}
              <br />
              <span className="italic font-light text-background/80">{tx.hero.h1b}</span>
            </h1>
          </div>
          <div className="md:col-span-4 md:pb-4 flex flex-col gap-6">
            <p className="animate-reveal [animation-delay:350ms] text-background/75 text-lg leading-relaxed max-w-sm">
              {tx.hero.desc}
            </p>
            <div className="animate-reveal [animation-delay:500ms] flex flex-col sm:flex-row gap-3">
              <Link
                to="/shop"
                className="group relative inline-flex items-center justify-center gap-2 bg-background text-foreground px-7 py-4 rounded-full text-sm font-semibold transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(255,255,255,0.4)] hover:-translate-y-0.5"
              >
                {tx.hero.cta1}
                <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <Link
                to="/refill"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-sm font-semibold border border-background/30 text-background hover:bg-background/10 backdrop-blur-md transition-all duration-500"
              >
                {tx.hero.cta2}
              </Link>
            </div>
            <p className="animate-reveal [animation-delay:650ms] font-mono text-[10px] tracking-[0.2em] uppercase text-background/45 mt-1">
              {tx.hero.priceHint}
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 flex items-center justify-between text-background/60 font-mono text-[10px] tracking-[0.25em] uppercase">
          <span>{tx.hero.stat1}</span>
          <span className="hidden md:inline">{tx.hero.stat2}</span>
          <span className="hidden md:inline">{tx.hero.stat3}</span>
          <span>scroll ↓</span>
        </div>
      </div>
    </section>
  );
}

function Overstimulation() {
  const { tx } = useLanguage();
  return (
    <section className="relative bg-foreground text-background py-16 md:py-28 px-6 overflow-hidden">
      <div aria-hidden className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-10 left-10 size-72 rounded-full bg-destructive/15 blur-3xl" />
        <div className="absolute bottom-10 right-10 size-96 rounded-full bg-primary/15 blur-3xl" />
      </div>
      <div className="relative max-w-6xl mx-auto">
        <span className="reveal font-mono text-[10px] tracking-[0.3em] uppercase text-background/50 block mb-10">
          {tx.home.overstimKicker}
        </span>
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          <ul className="space-y-4 font-display text-3xl md:text-5xl font-bold leading-[1.05]">
            {tx.home.overstimLines.map((l, i) => (
              <li key={i} className="reveal text-background/40 hover:text-background transition-colors duration-700" style={{ transitionDelay: `${i * 80}ms` }}>
                {l}
              </li>
            ))}
          </ul>
          <div className="reveal md:sticky md:top-32 space-y-6 max-w-md text-background/70 text-lg leading-relaxed">
            <p>{tx.home.overstimBodyA}</p>
            <p>{tx.home.overstimBodyB}</p>
          </div>
        </div>
        <h2 className="reveal mt-32 md:mt-48 font-display font-extrabold text-balance leading-[0.95] text-[clamp(2.75rem,8vw,7rem)] max-w-5xl">
          {tx.home.overstimH2a}
          <br />
          <span className="text-primary">{tx.home.overstimH2b}</span>
        </h2>
      </div>
    </section>
  );
}

function SystemSection() {
  const { tx } = useLanguage();
  return (
    <section className="relative bg-secondary overflow-hidden">
      <div className="relative md:grid md:grid-cols-12">
        <div className="md:col-span-6 md:sticky md:top-0 md:h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary p-10">
          <div className="relative w-full max-w-md aspect-[3/4] rounded-3xl overflow-hidden bg-foreground/90 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.35)]">
            <img src={tabletDissolve} alt="A sage tablet dissolving in a glass of water" loading="lazy" width={1024} height={1408} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-background/80 font-mono text-[10px] tracking-[0.25em] uppercase">
              <span>The VYTAL System</span>
              <span className="animate-float">~ 90s</span>
            </div>
          </div>
        </div>
        <div className="md:col-span-6 px-6 md:px-16 py-16 md:py-20 space-y-6 md:space-y-10">
          <div className="reveal max-w-md">
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary mb-6 block">{tx.home.systemKicker}</span>
            <h2 className="font-display text-4xl md:text-6xl font-extrabold leading-[1.02] mb-6 text-balance">
              {tx.home.systemH2a}<br />{tx.home.systemH2b}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">{tx.home.systemDesc}</p>
          </div>
          {tx.home.systemSteps.map((s) => (
            <div key={s.n} className="reveal max-w-md">
              <div className="flex items-baseline gap-6 mb-4">
                <span className="font-mono text-xs text-muted-foreground">{s.n}</span>
                <h3 className="font-display text-3xl md:text-4xl font-bold">{s.t}</h3>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed pl-12">{s.d}</p>
            </div>
          ))}
          <div className="reveal">
            <Link to="/refill" hash="cylinder-details" className="group inline-flex items-center gap-3 text-foreground font-semibold border-b border-foreground/40 pb-1 hover:border-foreground transition-colors">
              {tx.home.systemLink}
              <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function InsideBottle() {
  const { tx } = useLanguage();
  return (
    <section id="inside" className="relative pt-32 md:pt-48 pb-6 md:pb-10 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="reveal max-w-2xl mb-20">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary mb-6 block">{tx.home.insideKicker}</span>
          <h2 className="font-display text-4xl md:text-6xl font-extrabold leading-[1.02] text-balance">
            {tx.home.insideH2a}{" "}<span className="text-muted-foreground">{tx.home.insideH2b}</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          {tx.home.ingredients.map((i, idx) => (
            <article key={idx} className="reveal group relative overflow-hidden p-10 md:p-12 rounded-3xl bg-secondary/60 border border-border hover:border-primary/40 hover:bg-secondary transition-all duration-700" style={{ transitionDelay: `${idx * 60}ms` }}>
              <div className="absolute -top-20 -right-20 size-64 rounded-full bg-primary/0 group-hover:bg-primary/15 blur-3xl transition-all duration-1000" />
              <div className="relative flex flex-col gap-5">
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-primary">{i.kicker}</span>
                <div className="flex items-baseline justify-between gap-4 pb-4 border-b border-border">
                  <h3 className="font-display text-3xl md:text-4xl font-bold">{i.name}</h3>
                  <span className="font-mono text-xs text-muted-foreground">{i.dose}</span>
                </div>
                <p className="text-muted-foreground leading-relaxed">{i.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Rituals() {
  const { tx } = useLanguage();
  const srcs = [ritualMorning, dailyStudy, dailyOffice, ritualNight];
  const items = tx.home.ritualItems.map((r, i) => ({ ...r, src: srcs[i] }));
  const spans = ["md:col-span-7", "md:col-span-5", "md:col-span-5", "md:col-span-7"];
  return (
    <section className="relative pt-6 md:pt-10 pb-6 md:pb-10 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="reveal grid md:grid-cols-12 gap-10 items-end mb-16">
          <h2 className="md:col-span-7 font-display text-4xl md:text-6xl font-extrabold leading-[1.02] text-balance">
            {tx.home.ritualsH2a}<br />
            <span className="italic font-light text-muted-foreground">{tx.home.ritualsH2b}</span>
          </h2>
          <p className="md:col-span-4 md:col-start-9 text-muted-foreground text-lg leading-relaxed">{tx.home.ritualsDesc}</p>
        </div>
        <div className="grid md:grid-cols-12 gap-4 md:gap-5">
          {items.map((s, idx) => (
            <figure key={idx} className={`reveal relative overflow-hidden rounded-3xl bg-secondary group aspect-[3/2] md:aspect-[4/5] ${spans[idx]}`} style={{ transitionDelay: `${idx * 80}ms` }}>
              <img src={s.src} alt={s.label} loading="lazy" width={1280} height={1600} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/75 via-foreground/10 to-transparent" />
              <figcaption className="absolute bottom-6 left-6 right-6 text-background">
                <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-background/70 mb-2">{s.label}</p>
                <p className="font-display text-2xl md:text-3xl font-semibold leading-tight">{s.caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductTeaser() {
  const { tx } = useLanguage();
  return (
    <section className="relative pt-6 md:pt-10 pb-32 md:pb-48 px-6 overflow-hidden bg-secondary">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 reveal">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary mb-6 block">{tx.home.productKicker}</span>
          <h2 className="font-display text-4xl md:text-6xl font-extrabold leading-[1.02] mb-6 text-balance">{tx.home.productH2}</h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-md">{tx.home.productDesc}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/shop" hash="starter" className="group inline-flex items-center justify-center gap-2 bg-foreground text-background px-7 py-4 rounded-full text-sm font-semibold hover:bg-primary transition-all duration-500 hover:-translate-y-0.5 shadow-lg">
              {tx.home.productCta1}
              <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link to="/shop" hash="refills" className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-sm font-semibold border border-foreground/20 hover:bg-background/50 transition-all duration-500">
              {tx.home.productCta2}
            </Link>
          </div>
        </div>
        <div className="lg:col-span-7 reveal">
          <div className="relative aspect-[5/4] rounded-3xl overflow-hidden bg-background shadow-[0_40px_120px_-20px_rgba(0,0,0,0.25)]">
            <img src={productLineup} alt="The VYTAL bottle lineup" loading="lazy" width={1600} height={1280} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute top-5 left-5 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-md text-[10px] font-mono tracking-widest text-muted-foreground">VYTAL · STARTER KIT</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function JournalPreview() {
  const { tx, lang } = useLanguage();
  const slugs = ["productive-crash", "attention-span", "calmer-mornings"];
  const articles = tx.home.journalArticles.map((a, i) => ({ ...a, slug: slugs[i] }));
  return (
    <section id="journal-preview" className="pt-6 md:pt-10 pb-6 md:pb-10 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="reveal flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary mb-6 block">{tx.home.journalKicker}</span>
            <h2 className="font-display text-4xl md:text-6xl font-extrabold leading-[1.02] text-balance">{tx.home.journalH2}</h2>
          </div>
          <Link to="/journal" className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            {tx.home.journalAllArticles}
            <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {articles.map((a, idx) => (
            <Link key={a.slug} to="/journal" hash={a.slug} onClick={() => sessionStorage.setItem("journalRef", "home")} className="reveal group p-7 rounded-3xl bg-secondary/60 border border-border hover:bg-secondary hover:border-primary/30 transition-all duration-700 flex flex-col gap-4 min-h-[14rem]" style={{ transitionDelay: `${idx * 80}ms` }}>
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-primary">{a.kicker}</span>
              <h3 className="font-display text-2xl md:text-3xl font-bold leading-tight hyphens-auto" lang={lang}>{a.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{a.excerpt}</p>
              <div className="mt-auto pt-6 border-t border-border flex items-center justify-between text-xs font-mono text-muted-foreground">
                <span>{a.meta}</span>
                <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  const { tx } = useLanguage();
  const items = tx.home.reviews.slice(3);
  return (
    <section className="pt-24 md:pt-32 pb-6 md:pb-10 px-6 bg-foreground text-background">
      <div className="max-w-7xl mx-auto">
        <div className="reveal flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-background/50 block mb-4">{tx.home.reviewsKicker}</span>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold leading-[1.02] text-balance">{tx.home.reviewsH2}</h2>
          </div>
          <p className="text-background/55 text-sm max-w-xs leading-relaxed">{tx.home.reviewsDesc}</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {items.map((item, i) => (
            <figure key={item.name} className={`reveal rounded-2xl md:rounded-3xl border border-background/10 bg-background/5 p-4 md:p-8 flex flex-col gap-3 md:gap-4${i >= 4 ? " hidden lg:flex" : ""}`} style={{ transitionDelay: `${i * 60}ms` }}>
              <div className="text-amber-400 text-xs tracking-wider">★★★★★</div>
              <blockquote className="font-display text-sm md:text-xl leading-[1.3] text-balance">&ldquo;{item.quote}&rdquo;</blockquote>
              <figcaption className="mt-auto border-t border-background/10 pt-3 md:pt-5">
                <p className="text-xs md:text-sm font-semibold text-background">{item.name}</p>
                <p className="font-mono text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-background/50 mt-1">{item.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  const { tx } = useLanguage();
  return (
    <section className="relative py-40 md:py-56 px-6 text-center overflow-hidden bg-gradient-to-b from-background via-secondary to-background">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 size-[36rem] rounded-full bg-primary/20 blur-3xl animate-drift" />
        <div className="absolute bottom-1/4 right-1/4 size-[28rem] rounded-full bg-accent/25 blur-3xl animate-drift [animation-delay:-10s]" />
      </div>
      <div className="relative max-w-3xl mx-auto">
        <span className="reveal font-mono text-[10px] tracking-[0.3em] uppercase text-primary mb-8 block">{tx.home.finalKicker}</span>
        <h2 className="reveal font-display text-5xl md:text-7xl font-extrabold leading-[0.95] mb-10 text-balance">
          {tx.home.finalH2a}<br />{tx.home.finalH2b}
        </h2>
        <p className="reveal text-muted-foreground text-lg md:text-xl mb-14 max-w-xl mx-auto leading-relaxed">{tx.home.finalDesc}</p>
        <div className="reveal flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/shop" className="group inline-flex items-center justify-center gap-3 bg-foreground text-background px-10 py-5 rounded-full text-base font-semibold hover:bg-primary transition-all duration-500 hover:-translate-y-0.5 shadow-2xl">
            {tx.home.finalCta1}
            <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
          <Link to="/refill" className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full text-base font-semibold border border-foreground/20 hover:bg-background transition-all duration-500">
            {tx.home.finalCta2}
          </Link>
          <Link to="/journal" className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full text-base font-semibold text-muted-foreground hover:text-foreground transition-colors">
            {tx.home.finalCta3}
          </Link>
        </div>
      </div>
    </section>
  );
}
