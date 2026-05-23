import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import journalHero from "@/assets/journal-hero.jpg";
import journalStillife from "@/assets/journal-stillife.jpg";
import journalFeatured from "@/assets/journal-featured.jpg";
import journalRitual from "@/assets/journal-ritual.jpg";
import journalMorning from "@/assets/journal-morning.jpg";
import journalCafe from "@/assets/journal-cafe.jpg";
import journalLibrary from "@/assets/journal-library.jpg";
import journalTrain from "@/assets/journal-train.jpg";
import ritualMorning from "@/assets/ritual-morning.jpg";

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

type Article = {
  id: string;
  title: string;
  readTime: string;
  category: string;
  date: string;
  excerpt: string;
  image: string;
  content: string[];
};

const journalArticles: Article[] = [
  {
    id: "attention-span",
    title: "Your attention span isn't broken.",
    readTime: "9 min read",
    category: "Focus",
    date: "May 2026",
    image: journalFeatured,
    excerpt:
      "The way modern life is designed — endless inputs, endless tabs, endless small emergencies — was never something a nervous system was supposed to hold.",
    content: [
      "The modern digital landscape is an environment our nervous systems were never evolved to sustain. Every notification, infinite scroll feed, and algorithmic ping competing for your focus creates a state of continuous low-level biological emergency. We have been conditioned to believe that scattered attention is a personal deficiency, a lack of discipline in the face of endless inputs.",
      "But the truth is much quieter: your focus is simply outnumbered. A calmer way of working is not a productivity hack designed to extract more output from your day; it is a necessary form of neurological recovery. To find depth, we must first build sanctuaries of isolation.",
      "By establishing deliberate boundaries — turning off the continuous pull of digital inputs and anchoring your day with a mindful, tactile ritual like VYTAL — you allow your cognitive baseline to settle. True focus occurs naturally when the noise is removed, moving you away from frantic multitasking toward deep, meaningful immersion in a single good task at a time.",
    ],
  },
  {
    id: "productive-crash",
    title: "The myth of the productive crash.",
    readTime: "6 min read",
    category: "Recovery",
    date: "May 18, 2026",
    image: journalRitual,
    excerpt:
      "Why the cycle of spikes and collapses isn't a personality trait — and what calmer energy actually looks like across a real week.",
    content: [
      "Modern work culture heavily celebrates the high-caffeine, high-sugar rush of traditional energy drinks, treating the initial burst of artificial adrenaline as a badge of efficiency. Yet, the industry rarely accounts for the inevitable collapse that follows. The infamous '4 PM cliff' is not a failure of willpower; it is a predictable, biological response to synthetic spikes.",
      "When you flood your system with rapidly absorbing stimulants, your nervous system is forced into overdrive, borrowing energy from your future hours. The crash is simply the bill coming due. True, sustainable cognitive stamina doesn't spike — it flows smoothly.",
      "By shifting to clean, steady, functional ingredients without added sugars, you stabilize your physical and mental energy baseline across the entire week. This eliminates the exhausting, volatile cycle of jittery peaks and burnout crashes, allowing you to finish your real evening with a clear, calm mind rather than carrying exhaustion home.",
    ],
  },
  {
    id: "calmer-mornings",
    title: "Designing calmer mornings.",
    readTime: "4 min read",
    category: "Rituals",
    date: "May 11, 2026",
    image: journalMorning,
    excerpt:
      "Not 5 a.m. wake-ups. Not ice baths. Three small, repeatable shifts that change the temperature of a day.",
    content: [
      "True morning intentionality has been hijacked by extreme routines — 5 a.m. wake-up calls, immediate ice baths, and rigid 10-step optimization regimes. These systems often introduce performance anxiety before the day even begins. True morning design is simply about changing the temperature of your first hour.",
      "Protecting your mind from immediate screen exposure prevents your brain from falling into an immediate state of reactive panic. Checking inputs the moment you open your eyes forces your nervous system to respond to external emergencies before you have established your own internal center.",
      "Introducing slow, conscious hydration and allowing yourself a few unhurried breaths before opening your laptop resets your stress threshold. It transforms your day from a series of scattered responses into a deliberate, calm progression that adapts easily to whatever demands follow.",
    ],
  },
  {
    id: "quiet-hour",
    title: "A quiet hour inside a loud internet.",
    readTime: "7 min read",
    category: "Digital Overload",
    date: "May 03, 2026",
    image: journalCafe,
    excerpt:
      "Notes on building one un-interrupted hour a day — and why it matters more than any productivity system.",
    content: [
      "In an era of continuous connectivity, the ultimate workspace luxury is a single, uninterrupted hour of deep, quiet focus. True depth is impossible when your attention is fragmented every few minutes by collaboration pings, status updates, and team notifications.",
      "Embracing single-tasking is often misunderstood as inefficiency in a culture that worships speed. However, cognitive psychology continuously proves that context-switching wears down your mental stamina faster than any heavy workload. Depth requires a protected sanctuary.",
      "When you fiercely guard just one single hour each day for uninterrupted thought, you accomplish more meaningful, high-value progress than in an entire afternoon of scattered, reactive communication. It is the absolute foundation upon which impactful work is built.",
    ],
  },
  {
    id: "productivity-exhausting",
    title: "Why modern productivity feels emotionally exhausting.",
    readTime: "8 min read",
    category: "Modern Work",
    date: "Apr 26, 2026",
    image: journalLibrary,
    excerpt:
      "The continuous performance of optimization has turned work into an emotional burden that no amount of sleep alone can repair.",
    content: [
      "The modern obsession with optimized output has shifted productivity from a functional tool to an emotional burden. We are surrounded by metrics, tracking systems, and endless philosophies telling us that every minute of our existence must be leveraged for growth, turning life into a continuous performance.",
      "This continuous pressure creates a unique form of exhaustion that sleep alone cannot fix. It is an emotional depletion born from the belief that we are always lagging behind an impossible standard. Our nervous systems remain stuck in a perpetual state of hyper-vigilance, scanning for tasks yet unfulfilled.",
      "True recovery begins when we decouple our self-worth from our output matrix. By embracing slower, more honest rhythms and accepting that calm focus is infinitely more valuable than frantic acceleration, we allow our minds to heal from the chronic strain of modern optimization culture.",
    ],
  },
  {
    id: "slow-caffeine",
    title: "Slow caffeine, explained gently.",
    readTime: "5 min read",
    category: "Sustainable Energy",
    date: "Apr 19, 2026",
    image: journalStillife,
    excerpt:
      "Why botanical balance — caffeine paired with L-Theanine — produces a long, calm plateau instead of a jagged spike.",
    content: [
      "Caffeine is the world's most trusted focus companion, yet the delivery mechanism dictates the quality of the experience. When caffeine is introduced alongside heavy sugars or synthetic speed-enhancers, it hits the bloodstream with a violent, immediate surge, creating jitters and anxiety.",
      "A gentler approach relies on botanical balance. Combining clean, naturally derived caffeine with specific amino acids — such as L-Theanine found in green tea — alters how the stimulant interacts with your central nervous system. L-Theanine promotes alpha brain waves, which are associated with relaxation and deep focus.",
      "This synergy smooths out the sharp edges of the caffeine curve. Instead of a sudden spike followed by a precipitous drop, the energy release becomes an elongated, predictable plateau. It provides the alertness you seek without triggering the anxious nervous response.",
    ],
  },
  {
    id: "afternoon-dip",
    title: "Meetings, screens, and the 3 p.m. dip.",
    readTime: "6 min read",
    category: "Modern Work",
    date: "Apr 12, 2026",
    image: journalTrain,
    excerpt:
      "A quiet survival kit for office afternoons without the burnout — built from micro-breaks, real light and slow hydration.",
    content: [
      "The mid-afternoon energy slump is a natural part of our circadian rhythm, but it is heavily exacerbated by the modern workplace demands of back-to-back video calls and endless screen glare. By 3 p.m., the cognitive load of processing continuous digital stimulation leaves the mind exhausted.",
      "Surviving this corporate bottleneck without relying on artificial sugar rushes requires sensory micro-breaks. Step away from the glass display, allow your eyes to rest on natural light, and rehydrate your system with steady, slow-releasing plant nutrients that support your nervous system.",
      "Re-centering your focus calmly at 3 p.m. ensures you complete your remaining tasks with absolute clarity. This subtle intervention allows you to finish your workday gracefully, rather than carrying a deficit of exhaustion into your personal life.",
    ],
  },
  {
    id: "nervous-system",
    title: "Planning with your nervous system.",
    readTime: "5 min read",
    category: "Nervous System",
    date: "Apr 05, 2026",
    image: ritualMorning,
    excerpt:
      "Most frameworks treat the mind like a machine. A calmer week begins by reading the body's actual signals first.",
    content: [
      "Most productivity frameworks treat the human mind like a machine, scheduling tasks in rigid blocks without accounting for biological capacity. True efficiency, however, requires working in alignment with your autonomic nervous system, recognizing when your body transitions between stress and rest.",
      "Forcing yourself into deep creative work when your system is in a state of sympathetic flight — overstimulated and anxious — only produces friction and frustration. Conversely, attempting to execute high-energy tasks during a parasympathetic slump leads to brain fog and procrastination.",
      "By learning to read your internal signals and structuring your day around your natural energetic ebbs and flows, you eliminate unnecessary resistance. Planning with your biology, rather than against it, ensures your work remains sustainable, consistent, and remarkably calm.",
    ],
  },
];

const featured = journalArticles[0];

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
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  useEffect(() => {
    if (!activeArticle) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveArticle(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [activeArticle]);

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
              Issue 04 · Cover essay
            </p>
            <h2 className="mt-3 font-display text-2xl md:text-3xl font-medium tracking-tight">
              The cover essay
            </h2>
          </div>
          <span className="hidden md:block font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            01 / {journalArticles.length.toString().padStart(2, "0")}
          </span>
        </div>

        <article className="reveal group grid lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <button
            type="button"
            onClick={() => setActiveArticle(featured)}
            className="lg:col-span-7 block overflow-hidden rounded-sm text-left"
          >
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
          </button>
          <div className="lg:col-span-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-primary">
              {featured.category} · {featured.date} · {featured.readTime}
            </p>
            <button
              type="button"
              onClick={() => setActiveArticle(featured)}
              className="block group/title text-left w-full"
            >
              <h3 className="mt-5 font-display text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.02] tracking-tight text-balance group-hover/title:text-primary transition-colors">
                {featured.title}
              </h3>
            </button>
            <p className="mt-6 text-muted-foreground text-base md:text-lg leading-relaxed">
              {featured.excerpt}
            </p>
            <button
              type="button"
              onClick={() => setActiveArticle(featured)}
              className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-foreground border-b border-foreground/40 pb-1 hover:border-primary hover:text-primary transition-colors"
            >
              Read the cover essay →
            </button>
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

        {/* Row A — two columns: articles 2 & 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
          {[journalArticles[1], journalArticles[2]].map((p) => (
            <ArticleCard
              key={p.id}
              article={p}
              ratio="aspect-[4/5]"
              onOpen={setActiveArticle}
            />
          ))}
        </div>

        {/* Row B — two columns: articles 4 & 5 */}
        <div className="mt-24 md:mt-32 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
          {[journalArticles[3], journalArticles[4]].map((p, i) => (
            <ArticleCard
              key={p.id}
              article={p}
              ratio={i === 0 ? "aspect-[16/10]" : "aspect-[4/5]"}
              className={i === 1 ? "md:mt-20" : ""}
              onOpen={setActiveArticle}
            />
          ))}
        </div>

        {/* Row C — three columns: articles 6, 7, 8 */}
        <div className="mt-24 md:mt-32">
          <p className="reveal font-mono text-[11px] uppercase tracking-[0.24em] text-primary mb-8">
            Shorter notes
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[journalArticles[5], journalArticles[6], journalArticles[7]].map((p) => (
              <ArticleCard
                key={p.id}
                article={p}
                ratio="aspect-[4/5]"
                compact
                onOpen={setActiveArticle}
              />
            ))}
          </div>
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

      {/* ─────────────────────────── ARTICLE MODAL ─────────────────────────── */}
      {activeArticle && (
        <ArticleModal
          article={activeArticle}
          onClose={() => setActiveArticle(null)}
        />
      )}
    </main>
  );
}

function ArticleCard({
  article,
  ratio,
  className = "",
  compact = false,
  onOpen,
}: {
  article: Article;
  ratio: string;
  className?: string;
  compact?: boolean;
  onOpen: (a: Article) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(article)}
      className={`reveal group block text-left w-full ${className}`}
    >
      <div className={`overflow-hidden rounded-sm ${ratio}`}>
        <img
          src={article.image}
          alt={article.title}
          loading="lazy"
          width={1280}
          height={1280}
          className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]"
        />
      </div>
      <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.24em] text-primary">
        {article.category} · {article.readTime}
      </p>
      <h3
        className={`mt-3 font-display ${
          compact ? "text-xl md:text-2xl" : "text-2xl md:text-3xl"
        } font-bold leading-[1.08] tracking-tight text-balance group-hover:text-primary transition-colors`}
      >
        {article.title}
      </h3>
      {!compact && (
        <p className="mt-3 text-muted-foreground text-base leading-relaxed max-w-xl">
          {article.excerpt}
        </p>
      )}
      <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        {article.date}
      </p>
    </button>
  );
}

function ArticleModal({
  article,
  onClose,
}: {
  article: Article;
  onClose: () => void;
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={article.title}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-300"
    >
      <button
        type="button"
        aria-label="Close article"
        onClick={onClose}
        className="absolute inset-0 bg-foreground/40 backdrop-blur-md"
      />
      <div className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-lg bg-[hsl(var(--background))] shadow-2xl ring-1 ring-foreground/10">
        <button
          type="button"
          aria-label="Close article"
          onClick={onClose}
          className="sticky top-4 float-right mr-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm text-foreground/70 hover:text-foreground hover:bg-background border border-border transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        <div className="aspect-[16/9] w-full overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="h-full w-full object-cover"
          />
        </div>
        <article className="px-6 sm:px-12 md:px-16 py-12 md:py-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-primary">
            {article.category} · {article.date} · {article.readTime}
          </p>
          <h1 className="mt-6 font-display text-3xl md:text-5xl font-extrabold leading-[1.05] tracking-tight text-balance text-foreground">
            {article.title}
          </h1>
          <div className="mt-10 space-y-7 text-foreground/85 text-[17px] md:text-lg leading-[1.85]">
            {article.content.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="mt-14 pt-8 border-t border-border flex items-center justify-between">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
              VYTAL Journal · Volume 04
            </p>
            <button
              type="button"
              onClick={onClose}
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/70 hover:text-foreground transition-colors"
            >
              Close ✕
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}