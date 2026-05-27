import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { UnityDropBanner } from "./unity-drop-banner";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getArticleBySlug, journalArticles } from "@/lib/journal-articles";

export const Route = createFileRoute("/journal/$slug")({
  loader: ({ params }) => {
    const article = getArticleBySlug(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => {
    const a = loaderData?.article;
    if (!a) return { meta: [{ title: "Journal — VYTAL" }] };
    return {
      meta: [
        { title: `${a.title} — VYTAL Journal` },
        { name: "description", content: a.dek },
        { property: "og:title", content: `${a.title} — VYTAL Journal` },
        { property: "og:description", content: a.dek },
        { property: "og:image", content: a.image },
        { name: "twitter:image", content: a.image },
      ],
    };
  },
  
  notFoundComponent: () => (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="max-w-2xl mx-auto px-6 py-40 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-primary">404</p>
        <h1 className="mt-6 font-display text-4xl md:text-5xl">This essay can't be found.</h1>
        <Link to="/journal" className="mt-10 inline-block font-mono text-xs uppercase tracking-[0.24em] border-b border-foreground/40 pb-1 hover:text-primary hover:border-primary">
          ← Back to journal
        </Link>
      </section>
      <SiteFooter />
    </main>
  ),
  errorComponent: ({ error, reset }) => (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="max-w-2xl mx-auto px-6 py-40 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-primary">Something went quiet</p>
        <h1 className="mt-6 font-display text-3xl">{error.message}</h1>
        <button onClick={reset} className="mt-8 font-mono text-xs uppercase tracking-[0.24em] border-b border-foreground/40 pb-1">
          Try again
        </button>
      </section>
      <SiteFooter />
    </main>
  ),
  component: ArticlePage,
});
function ArticlePage() {
  const { article } = Route.useLoaderData();
  const heroRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [article.slug]);

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
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [article.slug]);

  useEffect(() => {
    const onScroll = () => {
      const el = heroRef.current;
      if (!el) return;
      const y = window.scrollY;
      el.style.transform = `translate3d(0, ${y * 0.15}px, 0) scale(${1 + Math.min(y, 600) / 6000})`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const more = journalArticles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SiteHeader />

      {/* Back link */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-8 md:pt-10">
        <Link
          to="/journal"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to journal
        </Link>
      </div>

      {/* Title block */}
      <header className="max-w-3xl mx-auto px-6 md:px-10 pt-16 md:pt-24 pb-14 md:pb-20">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-primary">
          {article.category} · {article.date} · {article.readTime} read
        </p>
        <h1 className="mt-8 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.02] tracking-tight text-balance">
          {article.title}
        </h1>
        <p className="mt-8 text-lg md:text-xl text-muted-foreground leading-relaxed text-balance">
          {article.dek}
        </p>
      </header>

      {/* Hero image */}
      <figure className="relative h-[60vh] min-h-[420px] md:h-[78vh] w-full overflow-hidden">
        <div ref={heroRef} className="absolute inset-0 will-change-transform">
          <img
            src={article.image}
            alt={article.title}
            className="h-full w-full object-cover"
            width={1792}
            height={1024}
          />
        </div>
      </figure>

      {/* Body */}
      <article className="max-w-2xl mx-auto px-6 md:px-0 py-24 md:py-36">
        {article.paragraphs.map((p: string, i: number) => (
          <p
            key={i}
            className={`reveal font-serif text-lg md:text-xl leading-[1.75] text-foreground/85 ${
              i === 0
                ? "first-letter:font-display first-letter:text-6xl first-letter:font-extrabold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-[0.9] first-letter:text-primary"
                : "mt-8"
            }`}
          >
            {p}
          </p>
        ))}

        <div className="reveal mt-20 pt-10 border-t border-border flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
          <span>VYTAL Journal · {article.date}</span>
          <Link to="/journal" className="hover:text-foreground transition-colors">
            ← Back to journal
          </Link>
        </div>
      </article>

      {/* Continue reading */}
      {more.length > 0 && (
        <section className="border-t border-border bg-secondary/30 py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-primary">
              Continue reading
            </p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl tracking-tight max-w-xl text-balance">
              More from the current volume.
            </h2>

            <div className="mt-14 grid md:grid-cols-3 gap-10 md:gap-12">
              {more.map((a) => (
                <Link
                  key={a.slug}
                  to="/journal/$slug"
                  params={{ slug: a.slug }}
                  className="group block"
                >
                  <div className="aspect-[4/5] overflow-hidden rounded-sm">
                    <img
                      src={a.image}
                      alt={a.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]"
                    />
                  </div>
                  <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.24em] text-primary">
                    {a.category} · {a.readTime}
                  </p>
                  <h3 className="mt-3 font-display text-xl md:text-2xl font-bold leading-snug text-balance group-hover:text-primary transition-colors">
                    {a.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <SiteFooter />
    </main>
  );
}