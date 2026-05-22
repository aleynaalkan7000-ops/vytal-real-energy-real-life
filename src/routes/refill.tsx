import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import refillMotion from "@/assets/refill-motion.jpg";

export const Route = createFileRoute("/refill")({
  head: () => ({
    meta: [
      { title: "The VYTAL Refill System — energy, reconsidered" },
      {
        name: "description",
        content:
          "An immersive look at the VYTAL refill system: capsule, water, ritual. Reusable bottles, compact refills, transparent sourcing — energy designed for everyday life.",
      },
      { property: "og:title", content: "The VYTAL Refill System" },
      {
        property: "og:description",
        content: "Pick. Place. Refill. A calm, modern ritual that replaces the single-use can.",
      },
    ],
  }),
  component: RefillPage,
});

function RefillPage() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SiteHeader />
      <CinematicHero />
      <CapsuleScrollStage />
      <FlowingSteps />
      <RitualVideo />
      <BottleEcosystem />
      <SystemLoop />
      <Transparency />
      <FinalCTA />
      <SiteFooter />
    </main>
  );
}

/* ------------------------------------------------------------------ */
/*  HERO                                                              */
/* ------------------------------------------------------------------ */

function CinematicHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative px-6 md:px-10 pt-20 md:pt-28 pb-24 max-w-7xl mx-auto"
    >
      <motion.div style={{ y, opacity }} className="grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <span className="font-mono text-xs text-primary mb-5 block tracking-[0.2em] uppercase">
            The refill system
          </span>
          <h1 className="font-display text-[2.6rem] md:text-7xl font-extrabold leading-[1.02] tracking-tight">
            One bottle.
            <br />
            Endless refills.
            <br />
            <span className="text-muted-foreground italic font-normal">A quieter ritual.</span>
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed mt-8 max-w-md">
            VYTAL replaces the single-use can with a small, considered ritual — a refill capsule,
            water, and a bottle you actually keep.
          </p>
        </div>
        <div className="lg:col-span-5">
          <CapsuleObject />
        </div>
      </motion.div>
      <ScrollHint />
    </section>
  );
}

function CapsuleObject() {
  return (
    <div className="relative aspect-square max-w-md mx-auto">
      {/* soft glow */}
      <div className="absolute inset-8 rounded-full bg-primary/20 blur-3xl" />
      {/* capsule */}
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [-2, 2, -2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 grid place-items-center"
      >
        <div
          className="w-28 h-56 rounded-full shadow-2xl"
          style={{
            background:
              "linear-gradient(160deg, #DCE6D6 0%, #B7CDB0 45%, #8DA399 100%)",
            boxShadow:
              "inset -10px -20px 40px rgba(0,0,0,0.15), inset 10px 15px 30px rgba(255,255,255,0.5), 0 30px 60px -20px rgba(45,49,46,0.35)",
          }}
        >
          <div className="h-1/2 w-full rounded-t-full opacity-50" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.6), transparent)" }} />
        </div>
      </motion.div>
    </div>
  );
}

function ScrollHint() {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
      <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground">Scroll</span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="w-px h-8 bg-foreground/40"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  CAPSULE SCROLL STAGE — sticky water-filling animation             */
/* ------------------------------------------------------------------ */

function CapsuleScrollStage() {
  const ref = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // Capsule drops into the bottle (0 → 0.35)
  const capsuleY = useTransform(scrollYProgress, [0, 0.35], ["-100%", "30%"]);
  const capsuleOpacity = useTransform(scrollYProgress, [0.3, 0.42], [1, 0]);

  // Water level fills (0.35 → 0.7)
  const waterHeight = useTransform(scrollYProgress, [0.35, 0.75], ["18%", "82%"]);
  const waterHue = useTransform(scrollYProgress, [0.35, 0.75], [0.15, 0.45]);

  // Text phases
  const text1Opacity = useTransform(scrollYProgress, [0, 0.15, 0.3], [0, 1, 0]);
  const text2Opacity = useTransform(scrollYProgress, [0.3, 0.45, 0.6], [0, 1, 0]);
  const text3Opacity = useTransform(scrollYProgress, [0.6, 0.75, 0.9], [0, 1, 1]);

  return (
    <section
      ref={ref}
      className="relative bg-gradient-to-b from-background via-secondary/40 to-background"
      style={{ height: prefersReduced ? "auto" : "320vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden grid lg:grid-cols-2 gap-8 items-center px-6 md:px-10 max-w-7xl mx-auto">
        {/* Stage */}
        <div className="relative h-[70vh] order-2 lg:order-1">
          <BottleStage
            capsuleY={capsuleY}
            capsuleOpacity={capsuleOpacity}
            waterHeight={waterHeight}
            waterHueProgress={waterHue}
          />
        </div>

        {/* Narration */}
        <div className="relative h-[40vh] lg:h-[60vh] order-1 lg:order-2">
          <ScrollPhrase opacity={text1Opacity}>
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-primary block mb-4">01 — Capsule</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold leading-[1.05]">
              A compact refill, instead of a can.
            </h2>
            <p className="text-muted-foreground mt-5 max-w-md">
              One capsule replaces the volume — and the packaging — of a traditional energy drink.
            </p>
          </ScrollPhrase>
          <ScrollPhrase opacity={text2Opacity}>
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-primary block mb-4">02 — Water</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold leading-[1.05]">
              Dissolves into your bottle.
            </h2>
            <p className="text-muted-foreground mt-5 max-w-md">
              Still or sparkling. The capsule disperses cleanly — flavor, function, hydration, in
              one calm step.
            </p>
          </ScrollPhrase>
          <ScrollPhrase opacity={text3Opacity}>
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-primary block mb-4">03 — Ritual</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold leading-[1.05]">
              Yours, on the desk.
            </h2>
            <p className="text-muted-foreground mt-5 max-w-md">
              A bottle you actually keep. A small, considered ritual instead of another can in the
              bin.
            </p>
          </ScrollPhrase>
        </div>
      </div>
    </section>
  );
}

function ScrollPhrase({
  opacity,
  children,
}: {
  opacity: ReturnType<typeof useTransform<number, number>>;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-0 flex flex-col justify-center"
    >
      {children}
    </motion.div>
  );
}

function BottleStage({
  capsuleY,
  capsuleOpacity,
  waterHeight,
  waterHueProgress,
}: {
  capsuleY: ReturnType<typeof useTransform<number, string>>;
  capsuleOpacity: ReturnType<typeof useTransform<number, number>>;
  waterHeight: ReturnType<typeof useTransform<number, string>>;
  waterHueProgress: ReturnType<typeof useTransform<number, number>>;
}) {
  return (
    <div className="relative w-full h-full grid place-items-center">
      {/* glow */}
      <div className="absolute inset-x-1/4 inset-y-1/4 rounded-full bg-primary/15 blur-3xl" />

      {/* Bottle silhouette */}
      <div
        className="relative w-[180px] md:w-[220px] aspect-[2/5] rounded-[60px] border border-foreground/15 overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.6), rgba(242,237,228,0.4))",
          boxShadow:
            "inset -8px -10px 30px rgba(45,49,46,0.06), inset 8px 10px 30px rgba(255,255,255,0.7), 0 40px 80px -30px rgba(45,49,46,0.25)",
        }}
      >
        {/* Cap */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-1/2 h-5 rounded-t-xl bg-foreground/80" />

        {/* Water */}
        <motion.div
          style={{
            height: waterHeight,
            background: useTransform(
              waterHueProgress,
              (v) =>
                `linear-gradient(180deg, rgba(141,163,153,${0.35 + v * 0.4}) 0%, rgba(141,163,153,${0.55 + v * 0.35}) 100%)`,
            ),
          }}
          className="absolute bottom-0 left-0 right-0"
        >
          {/* surface ripple */}
          <motion.div
            animate={{ x: ["-50%", "0%", "-50%"] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-2 left-0 w-[200%] h-4"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(255,255,255,0.5) 0%, transparent 60%)",
            }}
          />
          <Bubbles />
        </motion.div>

        {/* Falling capsule */}
        <motion.div
          style={{ y: capsuleY, opacity: capsuleOpacity }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-20 rounded-full"
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background: "linear-gradient(160deg, #DCE6D6, #8DA399)",
              boxShadow:
                "inset -3px -6px 12px rgba(0,0,0,0.2), inset 3px 5px 10px rgba(255,255,255,0.5)",
            }}
          />
        </motion.div>

        {/* highlight */}
        <div className="pointer-events-none absolute inset-y-4 left-3 w-2 rounded-full bg-white/40 blur-sm" />
      </div>
    </div>
  );
}

function Bubbles() {
  const bubbles = Array.from({ length: 7 });
  return (
    <>
      {bubbles.map((_, i) => {
        const size = 4 + (i % 3) * 3;
        const left = 10 + ((i * 53) % 80);
        const delay = (i * 0.7) % 4;
        return (
          <motion.span
            key={i}
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: -200, opacity: [0, 0.8, 0] }}
            transition={{ duration: 5 + (i % 3), repeat: Infinity, delay, ease: "easeOut" }}
            className="absolute rounded-full bg-white/70"
            style={{ width: size, height: size, left: `${left}%`, bottom: 4 }}
          />
        );
      })}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  FLOWING STEPS                                                     */
/* ------------------------------------------------------------------ */

function FlowingSteps() {
  const steps = [
    { n: "01", t: "Choose your refill", d: "Pick flavor, function and intensity — Focus, Flow, Refresh, Boost, Balance or Recharge." },
    { n: "02", t: "Place your bottle", d: "Use your VYTAL bottle or any compatible container from the system." },
    { n: "03", t: "Dispense & dissolve", d: "The capsule is precisely dosed and dissolves cleanly into still or sparkling water." },
    { n: "04", t: "Take it with you", d: "On your desk, in the library, on the way — calmly, without a new can each time." },
  ];
  return (
    <section id="how" className="px-6 md:px-10 py-28 md:py-36 max-w-6xl mx-auto">
      <div className="max-w-2xl mb-16">
        <span className="font-mono text-xs text-primary mb-4 block tracking-[0.2em] uppercase">How it works</span>
        <h2 className="font-display text-4xl md:text-5xl font-bold leading-[1.05]">
          Four steps. Nothing extra.
        </h2>
      </div>
      <ol className="space-y-4">
        {steps.map((s, i) => (
          <motion.li
            key={s.n}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: [0.32, 0.72, 0, 1] }}
            className="group grid grid-cols-[auto_1fr_auto] gap-6 md:gap-10 items-baseline border-t border-border pt-6"
          >
            <span className="font-mono text-xs text-muted-foreground tabular-nums">{s.n}</span>
            <div>
              <h3 className="font-display text-2xl md:text-3xl font-bold">{s.t}</h3>
              <p className="text-muted-foreground mt-2 max-w-xl">{s.d}</p>
            </div>
            <span className="hidden md:block font-mono text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
              →
            </span>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  RITUAL VIDEO                                                      */
/* ------------------------------------------------------------------ */

function RitualVideo() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 1.04]);
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section className="px-6 md:px-10 pb-28 max-w-7xl mx-auto">
      <div className="max-w-2xl mb-10">
        <span className="font-mono text-xs text-primary mb-4 block tracking-[0.2em] uppercase">In motion</span>
        <h2 className="font-display text-3xl md:text-5xl font-bold leading-[1.05]">
          The ritual, captured.
        </h2>
      </div>
      <motion.div
        ref={ref}
        style={{ scale, y }}
        className="relative aspect-[16/9] rounded-[28px] overflow-hidden bg-secondary"
      >
        <img
          src={refillMotion}
          alt="A VYTAL bottle being refilled in everyday use"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-background">
          <p className="font-display text-xl md:text-2xl max-w-sm">
            Insertion. Dissolution. A sip on the way to a deadline.
          </p>
          <span className="hidden md:block font-mono text-xs tracking-[0.2em] uppercase opacity-80">
            Everyday use
          </span>
        </div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  BOTTLE ECOSYSTEM                                                  */
/* ------------------------------------------------------------------ */

function BottleEcosystem() {
  const items = [
    { i: "Built to last", d: "Borosilicate, stainless and food-grade materials chosen for years of daily use." },
    { i: "Right doses", d: "Markings and sizes that match the refill format — no measuring, no guessing." },
    { i: "Desk & on-the-go", d: "To-go bottles, office carafes and pantry containers for different parts of the day." },
    { i: "Refill-ready", d: "Wide openings, clean threads, fast and hygienic at every refill point." },
  ];
  return (
    <section className="bg-secondary/60 px-6 md:px-10 py-28 md:py-36">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-16">
          <span className="font-mono text-xs text-primary mb-4 block tracking-[0.2em] uppercase">Bottles & containers</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold leading-[1.05]">
            Part of the system, not an accessory.
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((b, i) => (
            <motion.div
              key={b.i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="bg-background rounded-2xl p-6 border border-border"
            >
              <div className="size-9 rounded-full bg-primary/15 grid place-items-center mb-4">
                <span className="size-2 rounded-full bg-primary" />
              </div>
              <h3 className="font-display font-semibold text-lg">{b.i}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{b.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SYSTEM LOOP                                                       */
/* ------------------------------------------------------------------ */

function SystemLoop() {
  const steps = [
    { t: "Considered ingredients", d: "Functional actives — matcha, guarana, L-theanine, B-vitamins — sourced traceably." },
    { t: "Compact refill format", d: "Concentrated capsules replace the volume of a full canned drink." },
    { t: "Efficient logistics", d: "Less weight, less space — quieter on the supply chain." },
    { t: "Reusable bottles", d: "Designed for years of daily use, not a single trip to the bin." },
    { t: "Flexible daily use", d: "Personal dosing instead of one-size-fits-all single-use drinks." },
    { t: "Less packaging waste", d: "Step by step — fewer cans, fewer wrappers, less to throw away." },
  ];
  return (
    <section className="px-6 md:px-10 py-28 md:py-36 max-w-6xl mx-auto">
      <div className="max-w-2xl mb-16">
        <span className="font-mono text-xs text-primary mb-4 block tracking-[0.2em] uppercase">The VYTAL system</span>
        <h2 className="font-display text-4xl md:text-5xl font-bold leading-[1.05]">
          From ingredient to bottle, in a quieter loop.
        </h2>
      </div>
      <ol className="relative border-l border-border ml-3 space-y-8">
        {steps.map((s, i) => (
          <motion.li
            key={s.t}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.06 }}
            className="pl-8 relative"
          >
            <span className="absolute -left-[7px] top-2 size-3 rounded-full bg-primary" />
            <p className="font-mono text-xs text-muted-foreground">0{i + 1}</p>
            <h3 className="font-display text-xl font-bold mt-1">{s.t}</h3>
            <p className="text-muted-foreground max-w-xl">{s.d}</p>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  TRANSPARENCY                                                      */
/* ------------------------------------------------------------------ */

function Transparency() {
  const items = [
    "Traceable ingredients",
    "Independent quality checks",
    "Long-lasting reusable bottles",
    "Recyclable packaging components",
    "Transparent production & supply",
    "Honest claims, not eco-marketing",
  ];
  return (
    <section className="bg-foreground text-background px-6 md:px-10 py-28 md:py-36">
      <div className="max-w-4xl mx-auto text-center">
        <span className="font-mono text-xs text-primary mb-4 block tracking-[0.2em] uppercase">Transparency</span>
        <h2 className="font-display text-4xl md:text-5xl font-bold leading-[1.05] mb-8">
          Verifiable, not greenwashed.
        </h2>
        <p className="text-background/75 text-lg mb-12 max-w-2xl mx-auto">
          Sustainability only matters if it's checkable. We focus on practical things — reusable
          systems, compact refills and traceable sourcing — not slogans.
        </p>
        <ul className="grid sm:grid-cols-2 gap-3 text-left max-w-2xl mx-auto">
          {items.map((x) => (
            <li key={x} className="rounded-2xl border border-background/15 p-4 text-sm">
              <span className="text-primary mr-2">✓</span>
              {x}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  CTA                                                               */
/* ------------------------------------------------------------------ */

function FinalCTA() {
  return (
    <section className="px-6 md:px-10 py-32 text-center max-w-3xl mx-auto">
      <h2 className="font-display text-4xl md:text-6xl font-extrabold leading-[1.02] mb-6">
        Energy that fits your day better.
      </h2>
      <p className="text-muted-foreground text-lg mb-3">
        A calm refill ritual instead of another can. Six flavors, five bottles, one quieter system.
      </p>
      <p className="italic text-muted-foreground mb-10">(Re)Fuel your day. Not the planet.</p>
      <Link
        to="/shop"
        className="inline-flex bg-foreground text-background px-8 py-4 rounded-full font-semibold hover:bg-primary transition-colors"
      >
        Explore the products
      </Link>
    </section>
  );
}