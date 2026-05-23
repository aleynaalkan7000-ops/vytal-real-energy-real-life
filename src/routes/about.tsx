import { createFileRoute, Link } from "@tanstack/react-router";
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
      { name: "description", content: "VYTAL is a calmer alternative to modern productivity culture. Honest notes on exhaustion, intention and the small rituals we built instead." },
      { property: "og:title", content: "About VYTAL — built calmly. On purpose." },
      { property: "og:description", content: "Energy should support life — not require recovery from it. Our philosophy, in five quiet lines." },
      { property: "og:image", content: aboutHero },
      { name: "twitter:image", content: aboutHero },
    ],
  }),
  component: AboutPage,
});

const philosophy = [
  "Energy should support life — not require recovery from it.",
  "Transparency beats marketing.",
  "Small rituals over aggressive optimization.",
  "Sustainability has to be systemic, not symbolic.",
  "Emotionally honest brands age better.",
];

const intentions = [
  {
    n: "01",
    t: "Designed around real attention.",
    d: "Our tablets are dosed for the way a real day actually unfolds — not for a 20-minute spike a marketing team can chart.",
  },
  {
    n: "02",
    t: "Built to be reused, not replaced.",
    d: "One bottle. Refilled quietly for years. Modular parts replaced individually instead of the whole object thrown away.",
  },
  {
    n: "03",
    t: "Quiet by default.",
    d: "No neon, no edges, no urgency. The packaging, the tone, the rituals — all written to make a day a little less loud.",
  },
];

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
            We're tired of <em className="italic font-normal text-primary">being tired.</em>
            <span className="block text-foreground/55">And of pretending it's normal.</span>
          </h1>
          <p className="reveal mt-8 max-w-xl text-base md:text-lg text-foreground/75 leading-relaxed">
            A calmer alternative to modern productivity culture — built for people who'd rather
            live a day than survive it.
          </p>
          <div className="reveal mt-10 flex flex-wrap items-center gap-3">
            <Link
              to="/refill"
              className="inline-flex items-center gap-2 bg-foreground text-background rounded-full px-6 py-3 text-sm font-medium hover:bg-primary transition-colors"
            >
              Explore the system
            </Link>
            <Link
              to="/journal"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium border border-foreground/20 hover:bg-foreground/5 transition-colors"
            >
              Read the journal
            </Link>
            <Link
              to="/shop"
              className="inline-flex items-center text-sm font-mono text-foreground/70 hover:text-foreground transition-colors ml-2"
            >
              Shop VYTAL →
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
              A small realization
            </p>
            <h2 className="reveal mt-6 font-display text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.04] tracking-tight text-balance">
              Maybe the problem <em className="italic font-normal text-primary">isn't motivation.</em>
            </h2>
            <div className="reveal mt-10 space-y-6 text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl">
              <p>
                We built VYTAL after a few too many late evenings ending the same way — a half-crushed
                can, a half-finished sentence, a head that wouldn't quiet down.
              </p>
              <p>
                It wasn't a discipline problem. It wasn't a productivity hack we hadn't found yet.
                It was a culture telling us that exhaustion is just the price of being useful.
              </p>
              <p className="text-foreground">
                Maybe modern energy culture was simply never sustainable — for the body, for the
                nervous system, or for the planet asked to produce it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────── FULLSCREEN STATEMENT ───────────────────────── */}
      <section className="relative py-40 md:py-56 bg-secondary/60">
        <div className="max-w-6xl mx-auto px-6 md:px-10 text-center">
          <p className="reveal font-mono text-[11px] uppercase tracking-[0.24em] text-primary">
            What we believe
          </p>
          <p className="reveal mt-10 font-display text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight font-extrabold text-balance">
            Energy should <em className="italic font-normal text-primary">support life</em> —
            not require recovery from it.
          </p>
          <p className="reveal mt-12 max-w-xl mx-auto text-muted-foreground text-base md:text-lg leading-relaxed">
            Everything we make is built around that one quiet sentence. The dosage, the bottles,
            the rituals, the tone, the refill loop. All of it.
          </p>
        </div>
      </section>

      {/* ───────────────────────── PHILOSOPHY (FIVE LINES) ───────────────────── */}
      <section className="bg-foreground text-background py-32 md:py-44 overflow-hidden relative">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-primary/25 blur-3xl opacity-50 animate-drift" />
        <div className="relative max-w-7xl mx-auto px-6 md:px-10 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 reveal">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-background/60">
              The philosophy
            </p>
            <h2 className="mt-6 font-display text-4xl md:text-5xl font-extrabold leading-[1.04] tracking-tight text-balance">
              Our philosophy, in five quiet lines.
            </h2>
            <p className="mt-8 text-background/65 text-base md:text-lg leading-relaxed max-w-sm">
              Not a manifesto. Not a mission statement. Just five things we keep coming back to
              when we decide what to make — and what to refuse to make.
            </p>
          </div>
          <ol className="lg:col-span-8 lg:pl-12 divide-y divide-background/15 border-y border-background/15">
            {philosophy.map((line, i) => (
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
              Design intention
            </p>
            <h2 className="reveal mt-6 font-display text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.02] tracking-tight text-balance">
              Why we built it <em className="italic font-normal text-primary">this</em> way.
            </h2>
            <p className="reveal mt-8 text-muted-foreground text-base md:text-lg leading-relaxed max-w-md">
              VYTAL isn't a product line. It's a small set of decisions about how a quieter
              version of modern energy might actually look — in the hand, in the morning, in the bin.
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
            {intentions.map((it) => (
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
                The human side
              </p>
              <h2 className="reveal mt-6 font-display text-3xl md:text-4xl lg:text-5xl font-extrabold leading-[1.06] tracking-tight text-balance">
                A small studio. <em className="italic font-normal text-primary">Slow on purpose.</em>
              </h2>
              <div className="reveal mt-8 space-y-5 text-muted-foreground text-base leading-relaxed">
                <p>
                  We're a small team based in Munich. No growth-at-all-costs deck. No twenty-person
                  marketing floor. Just a quiet studio, a long table, and a stubborn belief that
                  brands made calmly tend to age better.
                </p>
                <p>
                  We share rituals more than we share opinions. A glass of water in the morning.
                  A walk between meetings. A working day that ends when it ends.
                </p>
                <p className="text-foreground">
                  Nothing radical. Just life, treated like it matters.
                </p>
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
            (Re)Fuel your day. Not the planet.
          </p>
          <h2 className="reveal mt-6 font-display text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.02] tracking-tight text-balance">
            Built calmly. <span className="italic font-normal text-primary">On purpose.</span>
          </h2>
          <p className="reveal mt-8 text-muted-foreground text-base md:text-lg leading-relaxed">
            A slower system for modern energy. For people quietly tired of recovery culture.
          </p>

          <div className="reveal mt-12 flex flex-wrap justify-center gap-3">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-foreground text-background rounded-full px-7 py-3.5 text-sm font-medium hover:bg-primary transition-colors"
            >
              Shop VYTAL
            </Link>
            <Link
              to="/refill"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium border border-foreground/20 hover:bg-foreground/5 transition-colors"
            >
              Explore the system
            </Link>
            <Link
              to="/journal"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium border border-foreground/20 hover:bg-foreground/5 transition-colors"
            >
              Read the journal
            </Link>
          </div>

          <p className="reveal mt-14 font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
            Munich · est. 2024
          </p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}