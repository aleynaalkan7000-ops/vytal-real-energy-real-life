import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import journalHero from "@/assets/journal-hero.jpg";
import journalStillife from "@/assets/journal-stillife.jpg";
import { journalArticles } from "@/lib/journal-articles";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "Journal — thoughts for calmer modern living | VYTAL" },
      { name: "description", content: "An editorial journal on focus, nervous-system recovery, ritual design and a calmer alternative to modern productivity culture." },
      { property: "og:title", content: "VYTAL Journal — thoughts for calmer modern living" },
      { property: "og:description", content: "Reflections on focus, energy, attention and calmer routines. A quiet space inside an overstimulated internet." },
      { property: "og:image", content: journalHero },
      { name: "twitter:image", content: journalHero },
    ],
  }),
  component: JournalPage,
});

const categories = [
  "Focus",
  "Rituals",
  "Recovery",
  "Digital Overload",
  "Modern Work",
  "Nervous System",
  "Sustainable Energy",
  "Calm Productivity",
] as const;

const featured = journalArticles[0];
const editorial = journalArticles.slice(1).map((a, idx) => ({
  slug: a.slug,
  cat: a.category,
  date: a.date,
  read: a.readTime,
  title: a.title,
  excerpt: a.dek,
  image: a.image,
  span: idx % 2 === 0 ? "lg:col-span-7" : "lg:col-span-5",
  ratio: idx % 2 === 0 ? "aspect-[16/10]" : "aspect-[4/5]",
}));

function useReveal() {
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
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function JournalPage() {
  useReveal();
  const heroImgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const el = heroImgRef.current;
      if (!el) return;
      const y = window.scrollY;
      el.style.transform = `translate3d(0, ${y * 0.18}px, 0) scale(${1 + Math.min(y, 600) / 6000})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SiteHeader />

      {/* ───────────────────────────── HERO ───────────────────────────── */}
      <section className="relative h-[92vh] min-h-[640px] w-full overflow-hidden">
        <div ref={heroImgRef} className="absolute inset-0 will-change-transform">
          <img
            src={journalHero}
            alt="A quiet morning desk with notebook, matcha and a glass of water"
            className="h-full w-full object-cover"
            width={1792}
            height={1024}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/10 to-background" />
        </div>

        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-10 flex flex-col justify-end pb-16 md:pb-24">
          <div className="reveal flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-foreground/70">
            <span className="h-px w-10 bg-foreground/40" />
            <span>The Journal — Volume 04 · Spring 2026</span>
          </div>
          <h1 className="reveal mt-6 font-display text-5xl sm:text-6xl md:text-7xl lg:text-[7.5rem] font-extrabold leading-[0.92] tracking-tight text-balance max-w-5xl">
            Thoughts for <em className="italic font-normal text-primary">calmer</em> modern living.
          </h1>
          <p className="reveal mt-8 max-w-xl text-base md:text-lg text-foreground/75 leading-relaxed">
            Editorial reflections on focus, recovery, attention and ritual —
            a quiet space inside an overstimulated internet.
          </p>
          <div className="reveal mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#featured"
              className="inline-flex items-center gap-2 bg-foreground text-background rounded-full px-6 py-3 text-sm font-medium hover:bg-primary transition-colors"
            >
              Read the journal
            </a>
            <Link
              to="/refill"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium border border-foreground/20 hover:bg-foreground/5 transition-colors"
            >
              Explore rituals
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center text-sm font-mono text-foreground/70 hover:text-foreground transition-colors ml-2"
            >
              Discover VYTAL →
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────── CATEGORIES STRIP ─────────────────────────── */}
      <section className="border-y border-border bg-background/70 backdrop-blur-sm sticky top-[65px] z-30">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground shrink-0 mr-3">
            Sections
          </span>
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              className="shrink-0 rounded-full border border-border px-4 py-1.5 text-xs font-medium text-foreground/70 hover:text-foreground hover:border-foreground/40 transition-colors"
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* ─────────────────────────── EDITOR'S LETTER ─────────────────────────── */}
      <section className="px-6 md:px-10 py-28 md:py-40 max-w-4xl mx-auto">
        <p className="reveal font-mono text-[11px] uppercase tracking-[0.24em] text-primary">
          A note from the editor
        </p>
        <p className="reveal mt-8 font-display text-3xl md:text-5xl leading-[1.15] tracking-tight text-balance">
          We started this journal because the loudest voices in modern productivity
          rarely speak about <span className="italic text-primary">how</span>
          {" "}any of it actually feels. So we made a quieter one.
        </p>
        <p className="reveal mt-10 text-muted-foreground text-base md:text-lg max-w-2xl">
          Slow essays, honest observations, and small rituals — written for the kind
          of attention modern life keeps trying to take away. No life hacks. No
          dopamine bait. Just notes on living a little more calmly, on purpose.
        </p>
      </section>

      {/* ─────────────────────────── FEATURED ─────────────────────────── */}
      <section id="featured" className="px-6 md:px-10 pb-28 max-w-7xl mx-auto">
        <div className="reveal flex items-end justify-between mb-10 md:mb-14">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-primary">
              {featured.issue} · Cover essay
            </p>
            <h2 className="mt-3 font-display text-2xl md:text-3xl font-medium tracking-tight">
              The cover essay
            </h2>
          </div>
          <span className="hidden md:block font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            01 / 04
          </span>
        </div>

        <article className="reveal group grid lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <a href="#" className="lg:col-span-7 block overflow-hidden rounded-sm">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={featured.image}
                alt={featured.title}
                loading="lazy"
                width={1536}
                height={1024}
                className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.03]"
              />
            </div>
          </a>
          <div className="lg:col-span-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-primary">
              {featured.category} · {featured.date} · {featured.readTime}
            </p>
            <h3 className="mt-5 font-display text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.02] tracking-tight text-balance">
              {featured.title}
            </h3>
            <p className="mt-6 text-muted-foreground text-base md:text-lg leading-relaxed">
              {featured.dek}
            </p>
            <a
              href="#"
              className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-foreground border-b border-foreground/40 pb-1 hover:border-primary hover:text-primary transition-colors"
            >
              Read the cover essay →
            </a>
          </div>
        </article>
      </section>

      {/* ─────────────────────────── PULL QUOTE ─────────────────────────── */}
      <section className="relative py-32 md:py-48 bg-secondary/50">
        <div className="max-w-5xl mx-auto px-6 md:px-10 text-center">
          <span className="font-display text-primary text-7xl leading-none">“</span>
          <p className="reveal mt-4 font-display text-3xl md:text-5xl leading-[1.2] tracking-tight text-balance">
            A calmer life isn't a slower one. It's a more <em className="italic text-primary">honest</em> one
            — one that admits how much energy attention actually costs.
          </p>
          <p className="reveal mt-10 font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
            — From the editor's notes, Issue 04
          </p>
        </div>
      </section>

      {/* ─────────────────────────── EDITORIAL GRID ─────────────────────────── */}
      <section className="px-6 md:px-10 py-28 max-w-7xl mx-auto">
        <div className="reveal flex items-end justify-between mb-10 md:mb-14">
          <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight max-w-md text-balance">
            Essays from the current volume.
          </h2>
          <span className="hidden md:block font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Spring · 2026
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-20">
          {editorial.map((p, i) => (
            <a
              key={p.title}
              href="#"
              className={`reveal group block ${p.span} ${i % 2 === 1 ? "lg:mt-24" : ""}`}
            >
              <div className={`overflow-hidden rounded-sm ${p.ratio}`}>
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  width={1280}
                  height={1280}
                  className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]"
                />
              </div>
              <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.24em] text-primary">
                {p.cat} · {p.read}
              </p>
              <h3 className="mt-3 font-display text-2xl md:text-3xl font-bold leading-[1.08] tracking-tight text-balance group-hover:text-primary transition-colors">
                {p.title}
              </h3>
              <p className="mt-3 text-muted-foreground text-base leading-relaxed max-w-xl">
                {p.excerpt}
              </p>
              <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {p.date}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* ─────────────────────────── RITUAL / PRODUCT INTEGRATION ─────────────────────────── */}
      <section className="relative bg-foreground text-background py-28 md:py-36 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full bg-primary/30 blur-3xl opacity-50 animate-drift" />
        <div className="relative max-w-7xl mx-auto px-6 md:px-10 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 reveal">
            <div className="overflow-hidden rounded-sm aspect-[4/5]">
              <img
                src={journalRitual}
                alt="A tablet dissolving slowly in a glass of water"
                loading="lazy"
                width={1280}
                height={1600}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-7">
            <p className="reveal font-mono text-[11px] uppercase tracking-[0.24em] text-background/60">
              Field notes · A small daily ritual
            </p>
            <h3 className="reveal mt-6 font-display text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.02] tracking-tight text-balance">
              The quietest minute of your morning.
            </h3>
            <p className="reveal mt-8 max-w-xl text-background/70 text-base md:text-lg leading-relaxed">
              A glass. A tablet. A breath while it dissolves. Not a productivity
              system — a sixty-second pause before the day asks for everything.
              Most of our readers say it's the only ritual that survived.
            </p>
            <div className="reveal mt-10 flex flex-wrap items-center gap-3">
              <Link
                to="/refill"
                className="inline-flex items-center gap-2 bg-background text-foreground rounded-full px-6 py-3 text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                Read about the ritual
              </Link>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium border border-background/30 hover:bg-background/10 transition-colors"
              >
                See what's inside
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────── SHORTER ESSAYS ─────────────────────────── */}
      <section className="px-6 md:px-10 py-28 max-w-7xl mx-auto">
        <div className="reveal mb-14">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-primary">
            Shorter notes
          </p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-medium tracking-tight max-w-xl text-balance">
            Small reflections for the in-between moments of a week.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-10 md:gap-12">
          {essays.map((e) => (
            <a key={e.title} href="#" className="reveal group block">
              <div className="aspect-[5/6] overflow-hidden rounded-sm">
                <img
                  src={e.image}
                  alt={e.title}
                  loading="lazy"
                  width={1280}
                  height={1536}
                  className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]"
                />
              </div>
              <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.24em] text-primary">
                {e.cat} · {e.read}
              </p>
              <h3 className="mt-3 font-display text-xl md:text-2xl font-bold leading-snug tracking-tight text-balance group-hover:text-primary transition-colors">
                {e.title}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {e.excerpt}
              </p>
              <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {e.date}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* ─────────────────────────── FINAL CTA ─────────────────────────── */}
      <section className="relative py-32 md:py-48 overflow-hidden border-t border-border">
        <div className="absolute inset-0 -z-10">
          <img
            src={journalStillife}
            alt=""
            aria-hidden
            className="h-full w-full object-cover opacity-25"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-background/85" />
        </div>
        <div className="max-w-3xl mx-auto px-6 md:px-10 text-center">
          <p className="reveal font-mono text-[11px] uppercase tracking-[0.24em] text-primary">
            Continue reading
          </p>
          <h2 className="reveal mt-6 font-display text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.02] tracking-tight text-balance">
            Built calmly. <span className="italic font-normal text-primary">On purpose.</span>
          </h2>
          <p className="reveal mt-8 text-muted-foreground text-base md:text-lg leading-relaxed">
            One slow newsletter, once a month. One essay. One ritual. One small
            update from inside the VYTAL system. No life hacks, no urgency.
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="reveal mt-10 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              placeholder="you@calm.day"
              className="flex-1 bg-background border border-border rounded-full px-5 py-3 text-sm focus:outline-none focus:border-foreground/40 transition-colors"
            />
            <button className="bg-foreground text-background rounded-full px-6 py-3 text-sm font-medium hover:bg-primary transition-colors">
              Join quietly
            </button>
          </form>

          <div className="reveal mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <Link to="/refill" className="hover:text-foreground transition-colors">
              Explore the system →
            </Link>
            <Link to="/shop" className="hover:text-foreground transition-colors">
              Shop VYTAL →
            </Link>
            <a href="#featured" className="hover:text-foreground transition-colors">
              Continue reading →
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}