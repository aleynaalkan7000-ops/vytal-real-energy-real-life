import { createFileRoute, Link } from "@tanstack/react-router";
import { useLanguage } from "@/contexts/language-context";
import { useEffect, useRef } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import aboutHero from "@/assets/about-hero.jpg";
import aboutRealization from "@/assets/about-realization.png";
import aboutPhilosophy from "@/assets/about-philosophy.jpg";
import aboutDesign from "@/assets/about-design.png";
import aboutHuman from "@/assets/about-human.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About VYTAL — a calmer alternative to modern productivity culture" },
      { name: "description", content: "VYTAL is a Heilbronn-based studio making refillable plant-based energy supplements. No crash, no single-use cans — built calmly, on purpose, since 2024." },
      { property: "og:title", content: "About VYTAL — built calmly. On purpose." },
      { property: "og:description", content: "Energy should support life — not require recovery from it. Our philosophy, in five quiet lines." },
      { property: "og:image", content: aboutHero },
      { name: "twitter:image", content: aboutHero },
    ],
  }),
  component: AboutPage,
});

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

function AboutPage() {
  useReveal();
  const { tx } = useLanguage();
  const heroImgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const el = heroImgRef.current;
      if (!el) return;
      const y = window.scrollY;
      el.style.transform = `translate3d(0, ${y * 0.2}px, 0) scale(${1 + Math.min(y, 600) / 6000})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SiteHeader />

      {/* ───────────────────────────── HERO ───────────────────────────── */}
      <section className="relative h-[94vh] min-h-[680px] w-full overflow-hidden">
        <div ref={heroImgRef} className="absolute inset-0 will-change-transform">
          <img
            src={aboutHero}
            alt="A quiet late-evening workspace, lit by a single desk lamp"
            className="h-full w-full object-cover"
            width={1792}
            height={1024}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/20 to-background" />
        </div>

        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-10 flex flex-col justify-end pb-16 md:pb-24">
          <div className="reveal flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-foreground/70">
            <span className="h-px w-10 bg-foreground/40" />
            <span>About VYTAL — a quieter way of working</span>
          </div>
          <h1 className="reveal mt-6 font-display text-5xl sm:text-6xl md:text-7xl lg:text-[7.5rem] font-extrabold leading-[0.92] tracking-tight text-balance max-w-5xl">
            {tx.about.heroH1a} <em className="italic font-normal text-primary">{tx.about.heroH1b}</em>
            <span className="block text-foreground/55">{tx.about.heroH1c}</span>
          </h1>
          <p className="reveal mt-8 max-w-xl text-base md:text-lg text-foreground/75 leading-relaxed">
            {tx.about.heroDesc}
          </p>
          <div className="reveal mt-10 flex flex-wrap items-center gap-3">
            <Link
              to="/refill"
              className="inline-flex items-center gap-2 bg-foreground text-background rounded-full px-6 py-3 text-sm font-medium hover:bg-primary transition-colors"
            >
              {tx.about.heroCta1}
            </Link>
            <Link
              to="/journal"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium border border-foreground/20 hover:bg-foreground/5 transition-colors"
            >
              {tx.about.heroCta2}
            </Link>
            <Link
              to="/shop"
              className="inline-flex items-center text-sm font-mono text-foreground/70 hover:text-foreground transition-colors ml-2"
            >
              {tx.about.heroCta3}
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────────────────────── REALIZATION ───────────────────────────── */}
      <section className="px-6 md:px-10 py-28 md:py-40 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-5 reveal order-2 lg:order-1">
            <div className="overflow-hidden rounded-sm aspect-[4/5]">
              <img
                src={aboutRealization}
                alt="A quiet hand beside an empty energy can on a wooden table"
                loading="lazy"
                width={1280}
                height={1280}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-7 order-1 lg:order-2">
            <p className="reveal font-mono text-[11px] uppercase tracking-[0.24em] text-primary">
              {tx.about.realizationKicker}
            </p>
            <h2 className="reveal mt-6 font-display text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.04] tracking-tight text-balance">
              {tx.about.realizationH2a} <em className="italic font-normal text-primary">{tx.about.realizationH2b}</em>
            </h2>
            <div className="reveal mt-10 space-y-6 text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl">
              <p>
                {tx.about.realizationBodyA}
              </p>
              <p>
                {tx.about.realizationBodyB}
              </p>
              <p className="text-foreground">
                {tx.about.realizationBodyC}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────── FULLSCREEN STATEMENT ───────────────────────── */}
      <section className="relative py-40 md:py-56 bg-secondary/60">
        <div className="max-w-6xl mx-auto px-6 md:px-10 text-center">
          <p className="reveal font-mono text-[11px] uppercase tracking-[0.24em] text-primary">
            {tx.about.statementKicker}
          </p>
          <p className="reveal mt-10 font-display text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight font-extrabold text-balance">
            {tx.about.statementH2a} <em className="italic font-normal text-primary">{tx.about.statementH2b}</em>{" "}
            {tx.about.statementH2c}
          </p>
          <p className="reveal mt-12 max-w-xl mx-auto text-muted-foreground text-base md:text-lg leading-relaxed">
            {tx.about.statementDesc}
          </p>
        </div>
      </section>

      {/* ───────────────────────── PHILOSOPHY (FIVE LINES) ───────────────────── */}
      <section className="bg-foreground text-background py-32 md:py-44 overflow-hidden relative">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-primary/25 blur-3xl opacity-50 animate-drift" />
        <div className="relative max-w-7xl mx-auto px-6 md:px-10 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 reveal">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-background/60">
              {tx.about.philosophyKicker}
            </p>
            <h2 className="mt-6 font-display text-4xl md:text-5xl font-extrabold leading-[1.04] tracking-tight text-balance">
              {tx.about.philosophyH2}
            </h2>
            <p className="mt-8 text-background/65 text-base md:text-lg leading-relaxed max-w-sm">
              {tx.about.philosophyDesc}
            </p>
          </div>
          <ol className="lg:col-span-8 lg:pl-12 divide-y divide-background/15 border-y border-background/15">
            {tx.about.philosophyLines.map((line, i) => (
              <li
                key={line}
                className="reveal grid grid-cols-[auto_1fr] gap-x-8 md:gap-x-14 items-baseline py-8 md:py-10"
              >
                <span className="font-mono text-xs text-primary/80">
                  0{i + 1}
                </span>
                <p className="font-display text-2xl md:text-3xl lg:text-4xl leading-[1.18] tracking-tight text-balance">
                  {line}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ───────────────────────── DESIGN INTENTION ───────────────────────── */}
      <section className="px-6 md:px-10 py-32 md:py-44 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <p className="reveal font-mono text-[11px] uppercase tracking-[0.24em] text-primary">
              {tx.about.designKicker}
            </p>
            <h2 className="reveal mt-6 font-display text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.02] tracking-tight text-balance">
              {tx.about.designH2a} <em className="italic font-normal text-primary">{tx.about.designH2b}</em> {tx.about.designH2c}
            </h2>
            <p className="reveal mt-8 text-muted-foreground text-base md:text-lg leading-relaxed max-w-md">
              {tx.about.designDesc}
            </p>
            <div className="reveal mt-10 overflow-hidden rounded-sm aspect-[4/5] lg:aspect-[3/4]">
              <img
                src={aboutDesign}
                alt="Brushed steel refill bottle resting on linen beside a tablet"
                loading="lazy"
                width={1280}
                height={1280}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <ol className="lg:col-span-7 space-y-16 md:space-y-20">
            {tx.about.intentions.map((it) => (
              <li key={it.n} className="reveal grid grid-cols-[auto_1fr] gap-x-8 md:gap-x-14">
                <span className="font-mono text-xs text-primary pt-2">{it.n}</span>
                <div>
                  <h3 className="font-display text-3xl md:text-4xl font-extrabold leading-[1.05] tracking-tight text-balance">
                    {it.t}
                  </h3>
                  <p className="mt-5 text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl">
                    {it.d}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ───────────────────────── HUMAN SIDE ───────────────────────── */}
      <section className="relative">
        <div className="grid lg:grid-cols-12 gap-0">
          <div className="lg:col-span-7 relative h-[60vh] lg:h-auto">
            <img
              src={aboutHuman}
              alt="A sunlit table near a window with a single ceramic cup and dried branches"
              loading="lazy"
              width={1600}
              height={1024}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div className="lg:col-span-5 bg-secondary/60 px-8 md:px-12 lg:px-16 py-20 md:py-28 flex items-center">
            <div>
              <p className="reveal font-mono text-[11px] uppercase tracking-[0.24em] text-primary">
                {tx.about.humanKicker}
              </p>
              <h2 className="reveal mt-6 font-display text-3xl md:text-4xl lg:text-5xl font-extrabold leading-[1.06] tracking-tight text-balance">
                {tx.about.humanH2a} <em className="italic font-normal text-primary">{tx.about.humanH2b}</em>
              </h2>
              <div className="reveal mt-8 space-y-5 text-muted-foreground text-base leading-relaxed" >
                <p>
                  {tx.about.humanBodyA}
                </p>
                <p>
                  {tx.about.humanBodyB}
                </p>
                <p className="text-foreground">
                  {tx.about.humanBodyC}
                </p>
              </div>
              <div className="reveal mt-10 grid grid-cols-2 gap-3 max-w-xs">
                {[
                  { name: "Aleyna A.", role: "Founder · Brand" },
                  { name: "VYTAL Studio", role: "München · gegr. 2024" },
                ].map((m) => (
                  <div key={m.name} className="rounded-2xl border border-border p-4">
                    <p className="font-display text-sm font-semibold">{m.name}</p>
                    <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mt-1">{m.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────── FINAL CTA ───────────────────────── */}
      <section className="relative py-32 md:py-48 overflow-hidden border-t border-border">
        <div className="absolute inset-0 -z-10">
          <img
            src={aboutPhilosophy}
            alt=""
            aria-hidden
            className="h-full w-full object-cover opacity-25"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-background/85" />
        </div>
        <div className="max-w-3xl mx-auto px-6 md:px-10 text-center">
          <p className="reveal font-mono text-[11px] uppercase tracking-[0.24em] text-primary">
            {tx.about.finalKicker}
          </p>
          <h2 className="reveal mt-6 font-display text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.02] tracking-tight text-balance">
            {tx.about.finalH2a} <span className="italic font-normal text-primary">{tx.about.finalH2b}</span>
          </h2>
          <p className="reveal mt-8 text-muted-foreground text-base md:text-lg leading-relaxed">
            {tx.about.finalDesc}
          </p>

          <div className="reveal mt-12 flex flex-wrap justify-center gap-3">
            <Link
              to="/shop/starter-kit"
              className="inline-flex items-center gap-2 bg-foreground text-background rounded-full px-7 py-3.5 text-sm font-medium hover:bg-primary transition-colors"
            >
              {tx.about.finalCta1}
            </Link>
            <Link
              to="/refill"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium border border-foreground/20 hover:bg-foreground/5 transition-colors"
            >
              {tx.about.finalCta2}
            </Link>
          </div>

          <p className="reveal mt-14 font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
            {tx.about.founded}
          </p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}