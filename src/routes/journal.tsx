import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "Journal — focus, energy & sustainable rituals | VYTAL" },
      { name: "description", content: "Editorial pieces on focus, energy, mental wellbeing and sustainable everyday rituals for students and young professionals." },
      { property: "og:title", content: "VYTAL Journal" },
      { property: "og:description", content: "Notes on focus, energy and a calmer kind of productivity." },
    ],
  }),
  component: JournalPage,
});

const featured = {
  category: "Focus",
  date: "May 2026",
  readTime: "7 min",
  title: "The myth of the productive crash.",
  excerpt:
    "Why the cycle of caffeine spikes and afternoon collapses isn't a personality trait — and what actually works for sustained, calm focus.",
};

const posts = [
  { cat: "Energy", date: "May 18, 2026", read: "5 min", title: "Slow caffeine: what L-Theanine actually does.", excerpt: "A short, non-hyped look at the science behind smoother focus." },
  { cat: "Wellbeing", date: "May 11, 2026", read: "6 min", title: "Designing a day around your real attention span.", excerpt: "How to plan with your nervous system, not against it." },
  { cat: "Sustainability", date: "May 03, 2026", read: "8 min", title: "What 'refill' actually changes (and what it doesn't).", excerpt: "Honest math on packaging, water and transport." },
  { cat: "Routines", date: "Apr 26, 2026", read: "4 min", title: "Three calmer mornings for stressful weeks.", excerpt: "Not 5am wakeups. Not ice baths. Just small, repeatable shifts." },
  { cat: "Student life", date: "Apr 19, 2026", read: "6 min", title: "Study blocks that don't end in collapse.", excerpt: "A realistic framework for long exam seasons." },
  { cat: "Work", date: "Apr 12, 2026", read: "5 min", title: "Meetings, screens and the 3pm dip — a survival kit.", excerpt: "Tiny tools for office afternoons without burnout." },
];

function JournalPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="px-6 md:px-10 pt-16 md:pt-24 pb-12 max-w-7xl mx-auto">
        <span className="font-mono text-xs text-primary mb-4 block">Journal</span>
        <h1 className="font-display text-4xl md:text-6xl font-extrabold leading-[1.05] max-w-3xl">
          Notes on focus, energy and a calmer kind of productivity.
        </h1>
      </section>

      <section className="px-6 md:px-10 pb-16 max-w-7xl mx-auto">
        <article className="rounded-3xl border border-border bg-secondary/40 p-8 md:p-12 grid md:grid-cols-2 gap-8 items-center">
          <div className="aspect-[4/3] rounded-2xl bg-primary/20 grid place-items-center">
            <span className="font-display text-7xl md:text-8xl font-extrabold text-primary/70">
              01
            </span>
          </div>
          <div>
            <p className="font-mono text-xs text-primary uppercase tracking-widest">
              Featured · {featured.category} · {featured.date} · {featured.readTime}
            </p>
            <h2 className="mt-4 font-display text-3xl md:text-4xl font-bold leading-tight">
              {featured.title}
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">{featured.excerpt}</p>
            <a href="#" className="mt-6 inline-flex text-sm font-mono text-primary hover:underline">
              Read the piece →
            </a>
          </div>
        </article>
      </section>

      <section className="px-6 md:px-10 pb-20 max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((p, idx) => (
            <a key={p.title} href="#" className="group rounded-3xl border border-border p-6 bg-background hover:bg-secondary/40 transition-colors flex flex-col">
              <div className="aspect-[4/3] rounded-2xl bg-secondary mb-5 grid place-items-center">
                <span className="font-display text-5xl font-extrabold text-foreground/30">
                  {String(idx + 2).padStart(2, "0")}
                </span>
              </div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-primary">
                {p.cat} · {p.read}
              </p>
              <h3 className="mt-2 font-display text-xl font-bold leading-snug group-hover:text-primary transition-colors">
                {p.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
              <p className="mt-auto pt-5 text-xs text-muted-foreground">{p.date}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-10 pb-24 max-w-3xl mx-auto text-center">
        <h3 className="font-display text-2xl md:text-3xl font-bold">A slow newsletter, once a month.</h3>
        <p className="mt-3 text-muted-foreground">No life hacks. Just one essay, one ritual, one VYTAL update.</p>
        <form className="mt-6 flex gap-2 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
          <input type="email" required placeholder="you@calm.day" className="flex-1 bg-background border border-border rounded-full px-4 py-3 text-sm" />
          <button className="bg-foreground text-background rounded-full px-5 py-3 text-sm font-medium">Join</button>
        </form>
        <p className="mt-8 text-xs text-muted-foreground">
          Looking for the product? <Link to="/shop" className="underline">Visit the shop</Link>.
        </p>
      </section>

      <SiteFooter />
    </main>
  );
}