import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react"; // HIER: useState und useMemo hinzugefügt
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { products, type Product } from "@/lib/vytal-products"; // HIER: products importiert
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
      { title: "VYTAL — A calmer system for modern energy" },
      {
        name: "description",
        content:
          "Refillable, plant-based focus for real life. No crash, no noise — a calmer alternative to modern productivity culture.",
      },
      { property: "og:title", content: "VYTAL — A calmer system for modern energy" },
      {
        property: "og:description",
        content: "Calm focus. No crash. Less noise. The refillable ritual built for real life.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  useReveal();
  
  const [heroIndex, setHeroIndex] = useState(0);
  const starterKit = useMemo(() => products.find((p: Product) => p.slug === "starter-kit"), []);
  const variants = starterKit?.variants || [];

  useEffect(() => {
    if (variants.length <= 1) return;
    const interval = setInterval(() => {
      setHeroIndex((prev: number) => {
        const next = (prev + 1) % variants.length;
        console.log("Wechsel zu Index:", next, "Bild:", variants[next].image); // <--- Hier schauen
        return next;
      });
    }, 4000); 
    return () => clearInterval(interval);
  }, [variants]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <Hero 
        key={heroIndex} // HIER: Das 'key' muss an die Hero-Komponente, nicht nur ans Bild!
        heroImage={variants.length > 0 ? variants[heroIndex].image : cinematicHero} 
        heroIndex={heroIndex} 
      />
      <Overstimulation />
      <SystemSection />
      <InsideBottle />
      <Rituals />
      <ProductTeaser />
      <JournalPreview />
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
  return (
    <section
      id="top"
      className="relative min-h-[92vh] flex items-end overflow-hidden bg-foreground text-background grain"
    >
      <img
        key={heroIndex}
        src={heroImage}
        alt="VYTAL Hero Image"
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
              VYTAL — Refillable focus
            </span>
            <h1 className="animate-reveal [animation-delay:200ms] font-display font-extrabold text-balance leading-[0.92] text-[clamp(3rem,9vw,8.5rem)]">
              We&rsquo;re tired
              <br />
              <span className="italic font-light text-background/80">of being tired.</span>
            </h1>
          </div>
          <div className="md:col-span-4 md:pb-4 flex flex-col gap-6">
            <p className="animate-reveal [animation-delay:350ms] text-background/75 text-lg leading-relaxed max-w-sm">
              Calm focus. No crash. Less noise. A refillable ritual designed for the way you
              actually live — not the way productivity culture pretends you do.
            </p>
            <div className="animate-reveal [animation-delay:500ms] flex flex-col sm:flex-row gap-3">
              <Link
                to="/shop"
                className="group relative inline-flex items-center justify-center gap-2 bg-background text-foreground px-7 py-4 rounded-full text-sm font-semibold transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(255,255,255,0.4)] hover:-translate-y-0.5"
              >
                Shop VYTAL
                <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <Link
                to="/refill"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-sm font-semibold border border-background/30 text-background hover:bg-background/10 backdrop-blur-md transition-all duration-500"
              >
                Explore the system
              </Link>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 flex items-center justify-between text-background/60 font-mono text-[10px] tracking-[0.25em] uppercase">
          <span>01 — Calm focus</span>
          <span className="hidden md:inline">02 — Zero crash</span>
          <span className="hidden md:inline">03 — Endless refills</span>
          <span>scroll ↓</span>
        </div>
      </div>
    </section>
  );
}

function Overstimulation() {
  const lines = [
    "Notifications.",
    "Deadlines.",
    "Another coffee.",
    "A 3pm crash.",
    "More notifications.",
    "An evening you can\u2019t feel.",
  ];
  return (
    <section className="relative bg-foreground text-background py-32 md:py-48 px-6 overflow-hidden">
      <div aria-hidden className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-10 left-10 size-72 rounded-full bg-destructive/15 blur-3xl" />
        <div className="absolute bottom-10 right-10 size-96 rounded-full bg-primary/15 blur-3xl" />
      </div>
      <div className="relative max-w-6xl mx-auto">
        <span className="reveal font-mono text-[10px] tracking-[0.3em] uppercase text-background/50 block mb-10">
          The pattern most of us recognise
        </span>
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          <ul className="space-y-4 font-display text-3xl md:text-5xl font-bold leading-[1.05]">
            {lines.map((l, i) => (
              <li
                key={i}
                className="reveal text-background/40 hover:text-background transition-colors duration-700"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {l}
              </li>
            ))}
          </ul>
          <div className="reveal md:sticky md:top-32 space-y-6 max-w-md text-background/70 text-lg leading-relaxed">
            <p>
              Modern productivity asks us to perform at 110% and call the burnout a personality
              trait. Energy drinks are designed for that script — fast spike, faster crash, more
              sugar, more cans, more guilt.
            </p>
            <p>VYTAL was made because we stopped believing in that loop.</p>
          </div>
        </div>

        <h2 className="reveal mt-32 md:mt-48 font-display font-extrabold text-balance leading-[0.95] text-[clamp(2.75rem,8vw,7rem)] max-w-5xl">
          Maybe the problem
          <br />
          <span className="text-primary">isn&rsquo;t motivation.</span>
        </h2>
      </div>
    </section>
  );
}

function SystemSection() {
  const steps = [
    { n: "01", t: "Pour", d: "Fill your VYTAL bottle with cold water — tap, sparkling, however you like it." },
    { n: "02", t: "Drop", d: "Add a single plant-based concentrate tablet. No sugar, no plastic, no fuss." },
    { n: "03", t: "Dissolve", d: "Watch it disappear in 90 seconds. Slow-release focus, calm and ready." },
    { n: "04", t: "Refill", d: "When you\u2019re low, refills arrive at your door in compostable paper." },
  ];
  return (
    <section className="relative bg-secondary overflow-hidden">
      <div className="relative md:grid md:grid-cols-12">
        <div className="md:col-span-6 md:sticky md:top-0 md:h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary p-10">
          <div className="relative w-full max-w-md aspect-[3/4] rounded-3xl overflow-hidden bg-foreground/90 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.35)]">
            <img
              src={tabletDissolve}
              alt="A sage tablet dissolving in a glass of water"
              loading="lazy"
              width={1024}
              height={1408}
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-background/80 font-mono text-[10px] tracking-[0.25em] uppercase">
              <span>The VYTAL System</span>
              <span className="animate-float">~ 90s</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-6 px-6 md:px-16 py-32 md:py-48 space-y-32">
          <div className="reveal max-w-md">
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary mb-6 block">
              The system
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-extrabold leading-[1.02] mb-6 text-balance">
              One bottle.
              <br />A quieter ritual.
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We replaced the can with a ritual. Each VYTAL tablet dissolves into a slow,
              considered drink — calm technology designed for real life, not extreme life.
            </p>
          </div>

          {steps.map((s) => (
            <div key={s.n} className="reveal max-w-md">
              <div className="flex items-baseline gap-6 mb-4">
                <span className="font-mono text-xs text-muted-foreground">{s.n}</span>
                <h3 className="font-display text-3xl md:text-4xl font-bold">{s.t}</h3>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed pl-12">{s.d}</p>
            </div>
          ))}

          <div className="reveal">
            <Link
              to="/refill"
              className="group inline-flex items-center gap-3 text-foreground font-semibold border-b border-foreground/40 pb-1 hover:border-foreground transition-colors"
            >
              See how a refill arrives
              <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function InsideBottle() {
  const items = [
    {
      kicker: "Focus without feeling attacked",
      name: "L-Theanine",
      dose: "200 mg",
      body: "From green tea. Smooths caffeine into something you can actually live with — sharper attention without the buzz.",
    },
    {
      kicker: "Calm under pressure",
      name: "Ashwagandha (KSM-66)",
      dose: "300 mg",
      body: "An adaptogen that helps the body process cortisol. Clinically studied for stress resilience — not gym memes.",
    },
    {
      kicker: "Energy that lasts the workday",
      name: "Green Tea Caffeine",
      dose: "80 mg",
      body: "Slow-release natural caffeine. Roughly one cup of coffee, paired so it doesn\u2019t turn against you at 3pm.",
    },
    {
      kicker: "The quiet co-pilot",
      name: "Magnesium Bisglycinate",
      dose: "150 mg",
      body: "Cellular energy and muscle recovery, in the form your body actually absorbs.",
    },
  ];
  return (
    <section id="inside" className="relative py-32 md:py-48 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="reveal max-w-2xl mb-20">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary mb-6 block">
            Inside the bottle
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-extrabold leading-[1.02] text-balance">
            Four ingredients.{" "}
            <span className="text-muted-foreground">Nothing hidden.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          {items.map((i, idx) => (
            <article
              key={i.name}
              className="reveal group relative overflow-hidden p-10 md:p-12 rounded-3xl bg-secondary/60 border border-border hover:border-primary/40 hover:bg-secondary transition-all duration-700"
              style={{ transitionDelay: `${idx * 60}ms` }}
            >
              <div className="absolute -top-20 -right-20 size-64 rounded-full bg-primary/0 group-hover:bg-primary/15 blur-3xl transition-all duration-1000" />
              <div className="relative flex flex-col gap-5">
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-primary">
                  {i.kicker}
                </span>
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
  const items = [
    { src: ritualMorning, label: "08:14 \u00b7 Caf\u00e9", caption: "The slow start. A pour-over and a cold refill. Two things, no agenda." },
    { src: dailyStudy, label: "14:42 \u00b7 Library", caption: "Three hours into a paper. The hum stays steady." },
    { src: dailyOffice, label: "16:30 \u00b7 Office", caption: "Back-to-back calls. No spike. No 4pm cliff." },
    { src: ritualNight, label: "21:08 \u00b7 Desk", caption: "One last quiet hour. Then a real evening." },
  ];
  const spans = ["md:col-span-7", "md:col-span-5", "md:col-span-5", "md:col-span-7"];
  return (
    <section className="relative py-32 md:py-48 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="reveal grid md:grid-cols-12 gap-10 items-end mb-16">
          <h2 className="md:col-span-7 font-display text-4xl md:text-6xl font-extrabold leading-[1.02] text-balance">
            Small rituals,
            <br />
            <span className="italic font-light text-muted-foreground">
              instead of extreme optimisation.
            </span>
          </h2>
          <p className="md:col-span-4 md:col-start-9 text-muted-foreground text-lg leading-relaxed">
            VYTAL doesn&rsquo;t live in a stadium. It lives in libraries, commutes, quiet cafés,
            and 9pm desks. Real life, not extreme life.
          </p>
        </div>

        <div className="grid md:grid-cols-12 gap-4 md:gap-5">
          {items.map((s, idx) => (
            <figure
              key={s.label}
              className={`reveal relative overflow-hidden rounded-3xl bg-secondary group aspect-[4/5] ${spans[idx]}`}
              style={{ transitionDelay: `${idx * 80}ms` }}
            >
              <img
                src={s.src}
                alt={s.label}
                loading="lazy"
                width={1280}
                height={1600}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/75 via-foreground/10 to-transparent" />
              <figcaption className="absolute bottom-6 left-6 right-6 text-background">
                <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-background/70 mb-2">
                  {s.label}
                </p>
                <p className="font-display text-2xl md:text-3xl font-semibold leading-tight">
                  {s.caption}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductTeaser() {
  return (
    <section className="relative py-32 md:py-48 px-6 overflow-hidden bg-secondary">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 reveal">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary mb-6 block">
            Start here
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-extrabold leading-[1.02] mb-6 text-balance">
            The starter ritual.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-md">
            One bottle, six flavours, a month of focus. Designed to be the only thing you need to
            begin — and the only thing left on your desk a year later.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/shop"
              hash="starter"
              className="group inline-flex items-center justify-center gap-2 bg-foreground text-background px-7 py-4 rounded-full text-sm font-semibold hover:bg-primary transition-all duration-500 hover:-translate-y-0.5 shadow-lg"
            >
              Shop the starter kit
              <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link
              to="/shop"
              hash="refills"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-sm font-semibold border border-foreground/20 hover:bg-background/50 transition-all duration-500"
            >
              Browse all flavours
            </Link>
          </div>
        </div>
        <div className="lg:col-span-7 reveal">
          <div className="relative aspect-[5/4] rounded-3xl overflow-hidden bg-background shadow-[0_40px_120px_-20px_rgba(0,0,0,0.25)]">
            <img
              src={productLineup}
              alt="The VYTAL bottle lineup"
              loading="lazy"
              width={1600}
              height={1280}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute top-5 left-5 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-md text-[10px] font-mono tracking-widest text-muted-foreground">
              VYTAL · STARTER KIT
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function JournalPreview() {
  const articles = [
    {
      id: "productive-crash",
      kicker: "Essay",
      title: "The myth of productive crashes.",
      excerpt: "Why the spike-and-collapse cycle has become a personality, and what changes when you finally let it go.",
      meta: "6 min read",
    },
    {
      id: "attention-span",
      kicker: "Field note",
      title: "Your attention span isn\u2019t broken.",
      excerpt: "It\u2019s just outnumbered. A quiet argument for fewer inputs, slower mornings, and one good drink at a time.",
      meta: "4 min read",
    },
    {
      id: "calmer-mornings",
      kicker: "Manifesto",
      title: "Designing calmer routines.",
      excerpt: "Three small structural changes that compound into something that actually feels like rest.",
      meta: "8 min read",
    },
  ];
  return (
    <section className="py-32 md:py-48 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="reveal flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary mb-6 block">
              The Journal
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-extrabold leading-[1.02] text-balance">
              Reading for slower minds.
            </h2>
          </div>
          <Link
            to="/journal"
            className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            All articles
            <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {articles.map((a, idx) => (
            <Link
              key={a.id}
              to="/journal"
              hash={a.id.toLowerCase().replace(/ /g, "-")}
              className="reveal group p-10 rounded-3xl bg-secondary/60 border border-border hover:bg-secondary hover:border-primary/30 transition-all duration-700 flex flex-col gap-6 min-h-[20rem]"
              style={{ transitionDelay: `${idx * 80}ms` }}
            >
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-primary">
                {a.kicker}
              </span>
              <h3 className="font-display text-2xl md:text-3xl font-bold leading-tight">
                {a.title}
              </h3>
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

function FinalCTA() {
  return (
    <section className="relative py-40 md:py-56 px-6 text-center overflow-hidden bg-gradient-to-b from-background via-secondary to-background">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 size-[36rem] rounded-full bg-primary/20 blur-3xl animate-drift" />
        <div className="absolute bottom-1/4 right-1/4 size-[28rem] rounded-full bg-accent/25 blur-3xl animate-drift [animation-delay:-10s]" />
      </div>
      <div className="relative max-w-3xl mx-auto">
        <span className="reveal font-mono text-[10px] tracking-[0.3em] uppercase text-primary mb-8 block">
          Built calmly. On purpose.
        </span>
        <h2 className="reveal font-display text-5xl md:text-7xl font-extrabold leading-[0.95] mb-10 text-balance">
          A slower system
          <br />
          for modern energy.
        </h2>
        <p className="reveal text-muted-foreground text-lg md:text-xl mb-14 max-w-xl mx-auto leading-relaxed">
          Start with a bottle. Refill forever. Trade burnout for something quieter — and finally,
          actually enjoyable.
        </p>
        <div className="reveal flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/shop"
            className="group inline-flex items-center justify-center gap-3 bg-foreground text-background px-10 py-5 rounded-full text-base font-semibold hover:bg-primary transition-all duration-500 hover:-translate-y-0.5 shadow-2xl"
          >
            Shop VYTAL
            <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
          <Link
            to="/refill"
            className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full text-base font-semibold border border-foreground/20 hover:bg-background transition-all duration-500"
          >
            Explore the system
          </Link>
          <Link
            to="/journal"
            className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full text-base font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            Read the journal
          </Link>
        </div>
      </div>
    </section>
  );
}
