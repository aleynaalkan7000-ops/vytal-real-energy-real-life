import { createFileRoute, Link } from "@tanstack/react-router";
import { useLanguage } from "@/contexts/language-context";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import refillHero from "@/assets/refill-hero.jpg";
import refillTabletDrop from "@/assets/refill-tablet-drop.jpg";
import refillBubbles from "@/assets/refill-bubbles.jpg";
import refillWaste from "@/assets/refill-waste.jpg";
import aluHeroImg from "@/assets/alu-hero.jpg";
import aluDispenseImg from "@/assets/alu-dispense.jpg";
import aluLoopImg from "@/assets/alu-loop.jpg";
import shopRitualDesk from "@/assets/shop-ritual-desk.jpg";
import { useEffect, useRef, useState } from "react";
import {
  PackageOpen,
  FlaskConical,
  Recycle,
} from "lucide-react";

const refillFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "How does the VYTAL refill system work?", acceptedAnswer: { "@type": "Answer", text: "Fill your VYTAL bottle with cold water, drop in one tablet, wait about 90 seconds for it to dissolve, and drink. Order refill cylinders online — each cylinder holds 8 tablets and includes a €4 refundable deposit." } },
    { "@type": "Question", name: "Why use tablets instead of a ready-made drink?", acceptedAnswer: { "@type": "Answer", text: "Most ready-to-drink energy products are mostly water — shipping liquid in single-use cans. VYTAL only ships the functional concentrate. You add local water, reducing shipping volume by up to 85% and eliminating single-use packaging per drink." } },
    { "@type": "Question", name: "How do I return the empty cylinders?", acceptedAnswer: { "@type": "Answer", text: "Collect five empty cylinders, place them in the included pre-paid return pouch, and drop it unfranked in any postbox. We sterilize and refill them. Your €4-per-cylinder deposit is credited to your next order." } },
    { "@type": "Question", name: "What water works best with VYTAL tablets?", acceptedAnswer: { "@type": "Answer", text: "Cold still water dissolves the tablet most cleanly. Sparkling water works too and gives a slightly lighter result. Avoid hot water as it can degrade some active ingredients." } },
  ],
};

// ── Local refill translations ─────────────────────────────────────────
function useRefillTx() {
  const { lang } = useLanguage();
  const isDE = lang === "de";
  return {
    isDE,
    // Hero
heroScrollLabel: isDE ? "Scroll zum Start" : "Scroll to start",
heroQuote: isDE
  ? '"Ein kleines Objekt. Ein ruhigerer Kreislauf."'
  : '"A small object. A calmer loop."',
heroCta1: isDE ? "Das Ritual entdecken" : "Explore the ritual",
heroCta2: isDE ? "Ritual aufbauen" : "Build your ritual",
    // Ch02 problem
    ch02Kicker: isDE ? "Kapitel 02 — der Kreislauf" : "Chapter 02 — the cycle",
    ch02H2en: "Energy\nshouldn't\nfeel disposable.",
    ch02H2de: "Energie sollte sich nicht\nwegwerfbar\nfühlen.",
    ch02Single: isDE ? "Einmalgebrauch" : "Single use",
    ch02SingleText: isDE ? "Die meisten Fertiggetränke bestehen großteils aus Wasser – einmal gekauft, einmal getrunken, weggeworfen." : "Most ready-to-drink energy products ship mostly water in single-use cans — bought once, consumed once, discarded once.",
    ch02Over: isDE ? "Überstimulation" : "Overstimulation",
    ch02OverText: isDE ? "Klassische Energy-Kultur verkauft Intensität: hoher Zucker, lautes Branding, schneller Konsum und ein eingebauter Crash." : "Classic energy culture often sells intensity: high sugar, loud branding, fast consumption and a crash built into the routine.",
    ch02Alt: isDE ? "Ruhige Alternative" : "Quiet alternative",
    ch02AltText: isDE ? "VYTAL ändert das Format: eine wiederverwendbare Flasche, kompakte Nachfüllungen und eine ruhigere Art, Energie in den Alltag zu integrieren." : "VYTAL changes the format: one reusable bottle, compact refills, and a calmer way to build energy into everyday life.",
    // Ch03 ritual
    ch03Kicker: isDE ? "Kapitel 03 — das Ritual" : "Chapter 03 — the ritual",
    ch03H2a: isDE ? "Kleine Rituale." : "Small rituals.",
    ch03H2b: isDE ? "Weniger Abfall. Mehr Intention." : "Less waste. More intention.",
    ritualSteps: isDE
      ? [
          { n: "01", t: "Öffnen", d: "Ein langsames Aufschrauben. Eine Pause, bevor der Tag beginnt." },
          { n: "02", t: "Einwerfen", d: "Eine kompakte Tablette trifft auf stilles, klares Wasser." },
          { n: "03", t: "Auflösen", d: "Blasen steigen auf. Die Farbe weicht. Die Flasche atmet aus." },
          { n: "04", t: "Trinken", d: "Ruhiger Fokus, mit dir unterwegs. Keine Dose. Kein Abfall." },
        ]
      : [
          { n: "01", t: "Open", d: "A slow unscrew. A pause before the day begins." },
          { n: "02", t: "Drop", d: "One compact tablet meets still, clear water." },
          { n: "03", t: "Dissolve", d: "Bubbles rise. Color softens. The bottle exhales." },
          { n: "04", t: "Drink", d: "Calm focus, carried with you. No can. No waste." },
        ],
    ritualQuote: isDE ? '{r.ritualQuote}' : '{r.ritualQuote}',
    // Ch04 system
    ch04Kicker: isDE ? "Kapitel 04 — das System" : "Chapter 04 — the system",
    ch04H2a: isDE ? "Eine Flasche." : "One bottle.",
    ch04H2b: isDE ? "Viele ruhige Nachfüllungen." : "Many quiet refills.",
    ch04Desc: isDE ? "Wir haben das System rund um Nachfüllstationen gebaut: Befülle deinen Heimcontainer mit Tabletten oder lass dir direkt ein trinkfertiges Getränk in die Flasche geben. Für Tage ohne Station: Online-Nachfüllungen kommen in wiederverwendbaren Pfandzylinder." : "We built the system around refill stations first: fill your home container with tablets, or get one tablet and water directly into your bottle for a ready-to-go drink. For days without station access, online refills arrive in reusable deposit cylinders.",
    ch04Steps: isDE
      ? [
          { n: "01", title: "Zuhause vorrätig", text: "Befülle deinen Heimcontainer mit Tabletten an der Station. Sicher lagern, bei Bedarf verwenden.", icon: "station" },
          { n: "02", title: "Unterwegs trinken", text: "Stelle deine Flasche in die Station. Wähle einen Geschmack und geh mit einem fertigen Drink.", icon: "bottle" },
          { n: "03", title: "Online bestellen", text: "Wenn keine Station in der Nähe ist, bestelle Nachfüllzylinder online. Leere zurückschicken, damit wir sie reinigen und wiederverwenden können.", icon: "loop" },
        ]
      : [
          { n: "01", title: "Stock at home", text: "Refill your home container with tablets at the station. Store them safely, use them whenever you need one.", icon: "station" },
          { n: "02", title: "Drink on the go", text: "Place your bottle in the station. Choose a flavour, still or sparkling water, and leave with a ready drink.", icon: "bottle" },
          { n: "03", title: "Order when busy", text: "If no station is nearby, order refill cylinders online. Send empties back so we can clean and reuse them.", icon: "loop" },
        ],
    // Ch05 cylinder
    ch05Kicker: isDE ? "Kapitel 05 — der Zylinder" : "Chapter 05 — the cylinder",
    ch05H2a: isDE ? "Der Zylinder, der" : "The cylinder that",
    ch05H2b: isDE ? "den Loop schließt." : "closes the loop.",
    ch05Intro: isDE ? "Ein Druck. Eine Tablette." : "One press. One tablet.",
    ch05Specs: isDE ? [
      ["Format", "108 mm · 38 g. Fasst genau 8 funktionale Tabletten. Für Taschen, Rucksäcke oder Schreibtische."],
      ["Material", "Luftfahrt-Aluminium, eloxiert für eine matte, haptische Oberfläche."],
      ["Dichtung", "Luft- und feuchtigkeitsdichte Silikon-Dichtung. Tabletten bleiben sauber, trocken und unberührt."],
      ["Rückgabefähig", "Gib leere Zylinder zurück. Wir reinigen, prüfen und verwenden sie im nächsten Kreislauf."],
    ] : [
      ["Format", "108 mm · 38 g. Holds exactly 8 functional tablets. Built for pockets, bags, or desks."],
      ["Material", "Aerospace-grade aluminum, anodized for a matte, tactile finish."],
      ["Seal", "Air- and moisture-tight silicone. Tablets stay clean, dry, and untouched."],
      ["Returnable", "Return empty cylinders to us. We clean, check and reuse them in the next cycle."],
    ],
    loopWorksLink: isDE ? "Wie der Loop funktioniert →" : "How the loop works →",
    refillPacksLink: isDE ? "Nachfüll-Packs ansehen" : "See refill packs",
    // Ch06 why tablets
    ch06Kicker: isDE ? "Kapitel 06 — warum Tabletten" : "Chapter 06 — why tablets",
    ch06H3a: isDE ? "Warum Wasser quer" : "Why ship water",
    ch06H3b: isDE ? "durchs Land schicken?" : "across the country?",
    ch06Desc: isDE ? "Die meisten Fertiggetränke bestehen größtenteils aus Wasser. Wir trennen den Drink vom Transport: du fügst lokales Wasser hinzu, wir versenden nur den funktionalen Teil." : "Most ready-to-drink energy products are mostly water. We separate the drink from the transport: you add local water, we only move the functional part.",
    ch06Cards: isDE ? [
      { tag: "01", title: "Weniger Transportvolumen", body: "Kompakte Tabletten nehmen deutlich weniger Platz ein als Fertiggetränke in Dosen oder Flaschen." },
      { tag: "02", title: "Weniger Einwegmaterial", body: "Eine Flasche bleibt bei dir, statt bei jedem Drink eine neue Einwegverpackung zu kaufen." },
      { tag: "03", title: "Wasser ist bereits vor Ort", body: "Zu Hause, auf dem Campus, bei der Arbeit oder an einer Station – Wasser muss nicht immer wieder transportiert werden." },
    ] : [
      { tag: "01", title: "Less transport volume", body: "Compact tablets take up far less space than ready-made drinks in cans or bottles." },
      { tag: "02", title: "Less disposable material", body: "One bottle stays with you instead of buying a new single-use container for every drink." },
      { tag: "03", title: "Water already exists nearby", body: "At home, on campus, at work or at a station — water does not need to be shipped again and again." },
    ],
    // Ch07 return loop (ReturnLoop component)
    ch07Kicker: isDE ? "Kapitel 07 — der Rückgabe-Loop" : "Chapter 07 — the return loop",
    loopSteps: isDE
      ? [
          { t: "Empfangen", d: "Nachfüllzylinder kommt mit deiner Bestellung. Pfand inklusive.", img: "" },
          { t: "Benutzen", d: "Ein Druck. Eine Tablette. Acht Tabletten pro Zylinder.", img: "" },
          { t: "Sammeln", d: "Leere Zylinder nach und nach in den Rückgabebeutel legen.", img: "" },
          { t: "Zurückschicken", d: "Beutel portofrei in jeden Briefkasten einwerfen. Vorfrankiert. Keine App. Oder einfach behalten.", img: "" },
          { t: "Wiederverwenden", d: "Bei Rückgabe sterilisieren wir ihn und befüllen ihn für ein anderes Ritual.", img: "" },
        ]
      : [
          { t: "Receive", d: "Refill cylinder arrives with your order. Deposit included.", img: "" },
          { t: "Use", d: "One press. One tablet. Eight tablets per cylinder.", img: "" },
          { t: "Collect", d: "Slip empty cylinders into the return pouch as they're used.", img: "" },
          { t: "Return", d: "Drop the pouch unfranked in any postbox. Pre-paid. No app. Or simply keep it to repurpose at home. You decide when the loop closes.", img: "" },
          { t: "Reuse", d: "If returned, we sterilize and refill it for someone else's ritual.", img: "" },
        ],
    loopH2a: isDE ? "Wie der VYTAL-" : "How the VYTAL",
    loopH2b: isDE ? "Loop funktioniert." : "loop works.",
    loopDesc: isDE ? "Zurückschicken, wann du bereit bist. Ein Briefkasten. Pfand erstattet. Keine Abonnement-Tricks, keine App, kein Greenwashing. Das gesamte System basiert auf einer einzigen ruhigen Bewegung." : "Return whenever you're ready. One postbox. Deposit refunded. No subscription tricks, no app, no greenwashing. The whole system is built around one quiet motion.",
    loopDeposit: isDE ? "Pfand" : "Deposit",
    loopDepositText: isDE ? "€4 pro Zylinder. Vollständig erstattet bei Rückgabe. Keine Mindestmenge, keine Eile." : "€4 per cylinder. Fully refunded upon return. No minimums, no rush.",
    loopHygiene: isDE ? "Hygiene" : "Hygiene",
    loopHygieneText: isDE ? "Zurückgegebene Zylinder werden nach medizinischen Standards sterilisiert, bevor sie neu befüllt werden." : "Returned cylinders are sterilized to medical-grade standards before refilling.",
    loopReality: isDE ? "Realitäts-Check" : "Reality check",
    loopRealityText: isDE ? "Deutlich bewusster als Dosen-Drinks. Wir veröffentlichen die Zahlen vierteljährlich." : "Significantly more conscious than canned drinks. We publish the numbers quarterly.",
    // Ch08 system object
    ch08Kicker: isDE ? "Kapitel 08 — das System-Objekt" : "Chapter 08 — the system object",
    ch08H2a: isDE ? "Inklusive bei" : "Included with",
    ch08H2b: isDE ? "jeder einzelnen Nachfüllung." : "every single refill.",
    ch08Desc: isDE ? "Der matte Aluminiumzylinder ist nicht nur Verpackung – er ist das Gefäß, in dem deine Nachfüllungen ankommen. Nutze ihn, leere ihn und entscheide: Schick ihn zurück für eine Pfand-Erstattung – oder behalte ihn für deinen Schreibtisch." : "The matte aluminum cylinder isn't just packaging; it's the vessel your refills travel in. Every flavor you order arrives inside one. Use it, empty it, and decide: return it for a deposit refund so we can close the loop, or keep it to organize your own space.",
    ch08Specs: isDE ? [
      ["Immer dabei", "Wird automatisch mit jeder Nachfüllung mitgeliefert. Kein Sonderkauf nötig."],
      ["8 Tabletten", "Fasst einen vollständigen Geschmackszyklus – alles luftdicht und frisch."],
      ["Leiser Fußabdruck", "Keine Umverpackungen, kein Plastik. Nur die Nachfüllung im Zylinder."],
      ["Pfand erstattet", "Portofrei zurückschicken – oder als Deko auf dem Schreibtisch behalten."],
    ] : [
      ["Already included", "Ships automatically with every refill flavor. No need to buy it separately"],
      ["Holds 8 refills", "Holds a complete flavor cycle, keeping everything airtight and fresh"],
      ["A Quiet Footprint", "No wrappers, no plastic, no excess waste. Just the refill inside the cylinder"],
      ["Refundable Deposit", "Send it back unfranked to claim your deposit, or keep it for your desk, shelf or kitchen counter"],
    ],
    ch08Cta1: isDE ? "Nachfüllungen ansehen →" : "Browse refill packs →",
    ch08Cta2: isDE ? "Starter Kit" : "Starter Kit",
    // Ch09 sustainability
    ch09Kicker: isDE ? "Kapitel 09 — Nachhaltigkeit" : "Chapter 09 — sustainability",
    ch09H2a: isDE ? "Wir messen, was wir verändern." : "We measure what we change.",
    ch09H2b: isDE ? "Den Rest schmücken wir nicht aus." : "We don't decorate the rest.",
    ch09Stats: isDE ? [
      { n: "−85%", l: "Weniger Versandvolumen pro Drink vs. Dosen-Energy." },
      { n: "1×", l: "Eine Flasche, tausende Male genutzt. Gebaut dafür." },
      { n: "100%", l: "Zutaten-Chargen bis zur Quelle nachverfolgbar." },
    ] : [
      { n: "−85%", l: "Less shipping volume per drink vs. canned energy." },
      { n: "1×", l: "One bottle, used thousands of times. Built for that." },
      { n: "100%", l: "Ingredient lots traceable to source and harvest." },
    ],
    // FAQ
    faqKicker: isDE ? "Fragen" : "Questions",
    faqH2: isDE ? "Häufig gestellt." : "Frequently asked.",
    faqDesc: isDE ? "Alles, was du wissen musst, bevor du mit dem Nachfüll-Ritual beginnst." : "Everything you need to know before starting the refill ritual.",
    faqItems: isDE ? [
      { q: "Wie funktioniert das Nachfüllsystem?", a: "Fülle deine VYTAL-Flasche mit kaltem Wasser, wirf eine Tablette hinein, warte ca. 90 Sekunden und trink. Für regelmäßige Nutzung: Nachfüllzylinder online bestellen – jeder Zylinder enthält 8 Tabletten und beinhaltet ein €4-Pfand." },
      { q: "Was steckt in jeder Tablette?", a: "Vier Wirkstoffe: L-Theanin (200 mg), Ashwagandha KSM-66 (300 mg), natürliches Grüntee-Koffein (80 mg) und Magnesiumbisglycinat (150 mg). Kein Zucker, keine künstlichen Süßungsmittel." },
      { q: "Ist das ein Nahrungsergänzungsmittel oder ein Energy Drink?", a: "VYTAL-Tabletten sind als Nahrungsergänzungsmittel eingestuft. Kein Ersatz für eine ausgewogene Ernährung. Enthält Koffein – nicht empfohlen für Kinder, Schwangere oder stillende Frauen." },
      { q: "Warum Tabletten statt eines fertigen Drinks?", a: "Die meisten Fertiggetränke bestehen größtenteils aus Wasser. VYTAL schickt nur das funktionale Konzentrat. Du fügst lokales Wasser hinzu – bis zu 85 % weniger Versandvolumen." },
      { q: "Wie gebe ich die leeren Zylinder zurück?", a: "Sammle fünf leere Zylinder, lege sie in den vorfrankierten Rückgabebeutel und wirf ihn portofrei in jeden Briefkasten. Wir sterilisieren und befüllen sie neu. Dein Pfand wird mit der nächsten Bestellung verrechnet." },
      { q: "Welches Wasser eignet sich am besten?", a: "Kaltes Stilles Wasser löst die Tablette am besten auf. Sprudelwasser ergibt ein leichteres Ergebnis. Heißes Wasser vermeiden." },
      { q: "Muss ich eine VYTAL-Flasche verwenden?", a: "Die Tabletten lösen sich in jedem sauberen Behälter auf. Die VYTAL-Flaschen sind für das Nachfüllsystem ausgelegt – aber du kannst die Tabletten auch mit einer anderen Flasche nutzen." },
    ] : [
      { q: "How does the refill system actually work?", a: "Fill your VYTAL bottle with cold water, drop in one tablet, wait about 90 seconds for it to dissolve, and drink. For regular use, order refill cylinders online — each cylinder holds 8 tablets and includes a €4 refundable deposit." },
      { q: "What's in each tablet?", a: "Four active ingredients: L-Theanine (200 mg) for calm focus, Ashwagandha KSM-66 (300 mg) for stress resilience, natural Green Tea Caffeine (80 mg) for steady energy, and Magnesium Bisglycinate (150 mg) for cellular recovery. No sugar, no artificial sweeteners." },
      { q: "Is this a food supplement or an energy drink?", a: "VYTAL tablets are classified as a food supplement. They are not a substitute for a balanced and varied diet. Contains caffeine — not recommended for children, pregnant or breastfeeding women." },
      { q: "Why tablets instead of a ready-made drink?", a: "Most ready-to-drink energy products are mostly water — you're shipping liquid across the country, packaged in a single-use can. VYTAL only ships the functional concentrate. You add local water. That reduces shipping volume by up to 85%." },
      { q: "How do I return the empty cylinders?", a: "Collect five empty cylinders, place them in the included pre-paid return pouch, and drop it unfranked in any postbox. We sterilize and refill them. Your €4-per-cylinder deposit is credited to your next order." },
      { q: "What water works best?", a: "Cold still water dissolves the tablet most cleanly. Sparkling water works too and gives a slightly lighter, more refreshing result. Avoid hot water." },
      { q: "Can I use any bottle, or does it have to be VYTAL?", a: "The tablets dissolve in any clean vessel with cold water. The VYTAL bottles are designed for the refill system — but you can use the tablets with any bottle you already own." },
    ],
    // Final CTA
    finalKicker: isDE ? "Ruhig gebaut. Mit Absicht." : "Built calmly. On purpose.",
    finalH2a: isDE ? "Eine ruhigere Art," : "A calmer way",
    finalH2b: isDE ? "Energie nachzufüllen." : "to refill energy.",
    finalDesc: isDE ? "(Re)Fuel deinen Tag. Nicht den Planeten. Starte mit einer Flasche und einer Tablette – der Rest ist Wiederholung, die du genießen wirst." : "(Re)Fuel your day. Not the planet. Start with one bottle and one tablet — the rest is just repetition you'll come to enjoy.",
    finalCta1: isDE ? "Mit dem Starter Kit starten →" : "Start with the Starter Kit →",
    finalCta2: isDE ? "Alle Geschmäcker ansehen" : "Browse all flavours",
  };
}

export const Route = createFileRoute("/refill")({
  head: () => ({
    meta: [
      { title: "Refill, not repeat — VYTAL" },
      { name: "description", content: "Refillable energy tablets instead of disposable cans. One bottle, plant-based concentrate tablets, a return loop — 85% less shipping volume. How VYTAL works." },
      { property: "og:title", content: "Refill, not repeat — VYTAL" },
      { property: "og:description", content: "A calming refill ritual designed for slower routines and less disposable habits." },
    ],
  }),
  component: RefillPage,
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
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useParallax(ref: React.RefObject<HTMLElement | null>, speed = 0.2) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * speed;
        el.style.transform = `translate3d(0, ${-offset}px, 0)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [ref, speed]);
}

function RefillPage() {
  useReveal();
  const r = useRefillTx();
  const heroImgRef = useRef<HTMLImageElement | null>(null);
  const bubblesRef = useRef<HTMLDivElement | null>(null);
  useParallax(heroImgRef as React.RefObject<HTMLElement | null>, 0.12);
  useParallax(bubblesRef as React.RefObject<HTMLElement | null>, 0.18);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(refillFaqSchema) }}
      />
      <SiteHeader />

      {/* HERO — cinematic fullscreen */}
      <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-foreground text-background">
        <img
          ref={heroImgRef}
          src={refillHero}
          alt="Glass bottle filled with clear water, soft warm light"
          className="absolute inset-0 w-full h-full object-cover scale-110 opacity-90 will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-foreground/10 to-foreground/80" />
        <div className="absolute inset-0 grain" />

        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-10 flex flex-col justify-between py-24">
          <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] uppercase text-background/70">
            <span className="size-1.5 rounded-full bg-accent animate-float" />
            The refill system — Chapter 01
          </div>

          <div className="max-w-4xl">
            <h1 className="font-display text-[14vw] md:text-[8.5vw] leading-[0.92] font-extrabold tracking-tighter">
              Refill,<br/>
              <span className="italic font-light text-background/85">not repeat.</span>
            </h1>
            <p className="mt-8 max-w-md text-background/75 text-base md:text-lg leading-relaxed">
                A refill-based alternative to disposable energy drinks — concentrated tablets,
                a reusable bottle, and a return loop designed to waste less from the start.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#ritual" className="inline-flex bg-background text-foreground px-7 py-3.5 rounded-full font-medium hover:bg-accent transition-all">
                {r.heroCta1}
              </a>
              <Link to="/shop" hash="starter" className="inline-flex border border-background/40 text-background px-7 py-3.5 rounded-full font-medium hover:bg-background/10 transition-all">
                Build your ritual
              </Link>
            </div>
          </div>

          <div className="flex items-end justify-between text-background/60 text-xs font-mono">
            <span>Scroll to begin</span>
            <span className="hidden md:block max-w-xs text-right text-background/55 italic">
              {r.heroQuote}
            </span>
          </div>
        </div>
      </section>

      {/* THE PROBLEM — compressed, tense */}
      <section className="relative bg-foreground text-background px-6 md:px-10 py-32 md:py-44 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img src={refillWaste} alt="" aria-hidden className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/60 to-foreground/20" />
        </div>
        <div className="relative max-w-5xl mx-auto">
          <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-background/60 reveal">{r.ch02Kicker}</span>
          <h2 className="reveal mt-6 font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] text-balance">
            {r.isDE ? <>Energie sollte sich nicht<br/>wegwerfbar<br/>fühlen.</> : <>Energy<br/>shouldn&rsquo;t<br/>feel <span className="italic font-light">disposable.</span></>}
          </h2>
          <div className="reveal mt-16 grid md:grid-cols-3 gap-6 max-w-4xl text-background/70">
            <p className="text-sm leading-relaxed">
              <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-background/40 mb-3">{r.ch02Single}</span>
              {r.ch02SingleText}
            </p>
            <p className="text-sm leading-relaxed">
              <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-background/40 mb-3">{r.ch02Over}</span>
              {r.ch02OverText}
            </p>
            <p className="text-sm leading-relaxed">
              <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-background/40 mb-3">{r.ch02Alt}</span>
              {r.ch02AltText}
            </p>
          </div>
        </div>
      </section>

      {/* THE RITUAL — signature cinematic sequence */}
      <section id="ritual" className="relative bg-background overflow-hidden">
        <div className="px-6 md:px-10 pt-32 md:pt-44 pb-12 max-w-7xl mx-auto">
          <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-primary reveal">{r.ch03Kicker}</span>
          <h2 className="reveal mt-6 font-display text-5xl md:text-7xl font-bold leading-[0.95] max-w-3xl text-balance">
            {r.ch03H2a} <span className="italic font-light text-muted-foreground">{r.ch03H2b}</span>
          </h2>
        </div>

        {/* Step strip */}
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-12 items-center pb-24">
          <div ref={bubblesRef} className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-secondary will-change-transform">
            <img src={refillTabletDrop} alt="Tablet dropping into water with bubbles" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />
          </div>
          <ol className="space-y-12">
            {r.ritualSteps.map((s) => (
              <li key={s.n} className="reveal grid grid-cols-[auto_1fr] gap-6 items-start border-t border-border pt-6">
                <span className="font-mono text-xs text-primary tracking-[0.2em]">{s.n}</span>
                <div>
                  <h3 className="font-display text-3xl md:text-4xl font-semibold mb-2">{s.t}</h3>
                  <p className="text-muted-foreground max-w-sm">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Fullscreen bubble moment */}
        <div className="relative h-[80svh] min-h-[520px] w-full overflow-hidden">
          <img src={refillBubbles} alt="Bubbles rising through calm water" className="absolute inset-0 w-full h-full object-cover scroll-rise" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
          <div className="relative h-full flex items-center justify-center px-6 text-center">
            <p className="reveal font-display text-4xl md:text-7xl font-light italic text-background drop-shadow-lg max-w-3xl leading-[1.05]">
              {r.ritualQuote}
            </p>
          </div>
        </div>
      </section>

      {/* SYSTEM EXPLANATION — editorial */}
      <section className="px-6 md:px-10 py-32 md:py-44 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 reveal lg:sticky lg:top-24">
            <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-primary">{r.ch04Kicker}</span>
            <h2 className="mt-6 font-display text-4xl md:text-5xl font-bold leading-[1]">
              {r.ch04H2a}<br/>{r.ch04H2b}
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              {r.ch04Desc}
            </p>
          </div>
          <div className="lg:col-span-8">
  <div className="grid md:grid-cols-3 gap-5">
    {r.ch04Steps.map((step) => (
      <article
        key={step.n}
        className="group relative overflow-hidden rounded-3xl border border-border bg-secondary/40 p-7 min-h-[340px] transition-all duration-700 hover:-translate-y-1 hover:bg-secondary"
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />

        <div className="relative z-10 h-full flex flex-col justify-between">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
              {step.n}
            </span>

              <div className="mt-8 h-28 flex items-center justify-center">
                {step.icon === "station" && (
                  <PackageOpen className="size-16 text-primary/70 stroke-[1.5]" />
                )}

                {step.icon === "bottle" && (
                  <FlaskConical className="size-16 text-primary/70 stroke-[1.5]" />
                )}

                {step.icon === "loop" && (
                  <Recycle className="size-16 text-primary/70 stroke-[1.5]" />
                )}
              </div>
              
            <h3 className="mt-6 font-display text-2xl font-semibold">
              {step.title}
            </h3>

            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              {step.text}
            </p>
          </div>

          <div className="mt-8 flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            <span className="h-px flex-1 bg-border" />
            <span>Refill · Reuse</span>
          </div>
        </div>
      </article>
    ))}
  </div>
</div>
        </div>
      </section>

      {/* MATERIALS & DESIGN — luxury object */}
      <section id="cylinder-details" className="relative bg-secondary/60 overflow-hidden">
        {/* THE ALU CYLINDER — system object */}
        <div className="px-6 md:px-10 pt-32 md:pt-44 pb-8 max-w-7xl mx-auto reveal">
          <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-primary">
            {r.ch05Kicker}
          </span>
          <h2 className="mt-6 font-display text-4xl md:text-6xl font-bold leading-[1] text-balance max-w-3xl">
            The cylinder that<br/>
            <span className="italic font-light text-muted-foreground">closes the loop.</span>
          </h2>
        </div>

        <div className="px-6 md:px-10 pb-24 md:pb-32 max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 items-stretch">
          <a
            href="/shop#cylinder"
            className="group lg:col-span-7 relative aspect-[4/5] lg:aspect-auto lg:min-h-[560px] overflow-hidden rounded-3xl bg-[#f3ede2] reveal"
          >
            <img
              src={aluHeroImg}
              alt="Matte aluminum VYTAL refill cylinder in warm natural light"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]"
            />
            {/* Das rote Label ist weg! */}
            <span className="absolute bottom-6 right-6 inline-flex items-center gap-2 bg-foreground text-background px-5 py-3 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
              Why it's included →
            </span>
          </a>

          <div className="lg:col-span-5 flex flex-col justify-between gap-10 reveal">
            <div>
              <p className="font-display text-2xl md:text-3xl leading-snug">
                {r.ch05Intro} <span className="text-muted-foreground">{r.isDE ? "Hygienisch, luftdicht, und gebaut, um zu uns zurückzukommen – nicht in den Müll." : "Hygienic, airtight, and built to come back to us — not the bin."}</span>
              </p>
              <ul className="mt-10 space-y-5">
                {r.ch05Specs.map(([t, d]) => (
                  <li key={t} className="grid grid-cols-[120px_1fr] gap-4 border-t border-foreground/10 pt-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary mt-1">{t}</span>
                    <p className="text-sm text-muted-foreground leading-relaxed">{d}</p>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <a 
                href="/shop#loop" 
                className="inline-flex bg-foreground text-background px-6 py-3 rounded-full text-sm font-medium hover:bg-primary transition-colors"
              >
                {r.loopWorksLink}
              </a>
              <a 
                href="/shop#refills" 
                className="inline-flex border border-foreground/15 px-6 py-3 rounded-full text-sm font-medium hover:bg-background transition-colors"
              >
                {r.refillPacksLink}
              </a>
            </div>
          </div>
        </div>

        {/* WHY TABLETS — useful sustainability logic */}
<div className="px-6 md:px-10 pb-24 md:pb-32 max-w-7xl mx-auto">
  <div className="grid lg:grid-cols-12 gap-12 items-start">
    <div className="lg:col-span-5 reveal">
      <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-primary">
        {r.ch06Kicker}
      </span>

      <h3 className="mt-5 font-display text-4xl md:text-6xl font-bold leading-[0.98] text-balance">
        {r.ch06H3a}<br />
        <span className="italic font-light text-muted-foreground">
          {r.ch06H3b}
        </span>
      </h3>

      <p className="mt-6 text-muted-foreground leading-relaxed max-w-xl">
        {r.ch06Desc}
      </p>
    </div>

    <div className="lg:col-span-7 grid md:grid-cols-3 gap-4">
      {r.ch06Cards.map((c) => (
        <article
          key={c.tag}
          className="rounded-3xl border border-foreground/10 bg-background p-7 hover:bg-secondary/40 transition-colors duration-500"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
            {c.tag}
          </span>

          <h4 className="mt-4 font-display text-lg font-semibold">
            {c.title}
          </h4>

          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            {c.body}
          </p>
        </article>
      ))}
    </div>
  </div>
</div>

      </section>

      {/* RETURN LOOP — interactive 5-step */}
      <ReturnLoop />

      {/* THE CYLINDER — system object */}
      <section className="px-6 md:px-10 max-w-7xl mx-auto py-28 md:py-44 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 reveal relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-[#f1ece1]">
            <img
              src={aluHeroImg}
              alt="The matte aluminum VYTAL refill cylinder"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.04]"
            />
            <span className="absolute top-5 left-5 font-mono text-[10px] uppercase tracking-[0.3em] bg-background/85 backdrop-blur px-3 py-1.5 rounded-full">
              Part of every refill
            </span>
          </div>
        </div>
        <div className="lg:col-span-6 reveal">
          <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-primary">{r.ch08Kicker}</span>
          <h2 className="mt-5 font-display text-4xl md:text-6xl font-extrabold leading-[0.98] tracking-tight">
            {r.ch08H2a}<br/>
            <span className="italic font-light text-muted-foreground">{r.ch08H2b}</span>
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed max-w-md">
            {r.ch08Desc}
          </p>
          <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 max-w-md">
            {r.ch08Specs.map(([k, v]) => (
              <div key={k} className="border-t border-border pt-3">
                <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{k}</dt>
                <dd className="mt-1.5 font-display text-sm">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/shop" hash="refills" className="inline-flex bg-foreground text-background px-6 py-3 rounded-full text-sm font-medium hover:bg-primary transition-colors">
              {r.ch08Cta1}
            </Link>
            <Link to="/shop/starter-kit" className="inline-flex border border-foreground/15 px-6 py-3 rounded-full text-sm font-medium hover:bg-background transition-colors">
              Starter Kit
            </Link>
          </div>
        </div>
      </section>

      {/* TRANSPARENCY — quiet, not preachy */}
      <section className="bg-foreground text-background px-6 md:px-10 py-28 md:py-36">
        <div className="max-w-5xl mx-auto reveal">
          <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-accent">{r.ch09Kicker}</span>
          <h2 className="mt-6 font-display text-3xl md:text-5xl font-light leading-[1.1] max-w-3xl">
            We measure what we change.<br/>
            <span className="italic">We don't decorate the rest.</span>
          </h2>
          <div className="mt-16 grid sm:grid-cols-3 gap-6">
            {r.ch09Stats.map((s) => (
              <div key={s.n} className="border-t border-background/15 pt-6">
                <div className="font-display text-5xl md:text-6xl font-light tracking-tighter">{s.n}</div>
                <p className="mt-3 text-sm text-background/65 max-w-xs">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <RefillFAQ />

      {/* FINAL CTA — reflective */}
      <section className="relative px-6 md:px-10 py-40 md:py-56 text-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 size-[60vmax] rounded-full bg-accent/30 blur-3xl animate-drift" />
          <div className="absolute bottom-0 right-0 size-[40vmax] rounded-full bg-primary/20 blur-3xl animate-float" />
        </div>
        <div className="max-w-3xl mx-auto reveal">
          <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-primary">Built calmly. On purpose.</span>
          <h2 className="mt-8 font-display text-5xl md:text-7xl font-extrabold leading-[0.95] tracking-tighter text-balance">
            A calmer way <br></br> <span className="italic font-light">to refill energy.</span>
          </h2>
          <p className="mt-10 text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
            (Re)Fuel your day. Not the planet. Start with one bottle and one tablet —
            the rest is just repetition you'll come to enjoy.
          </p>
          <div className="mt-12 flex flex-wrap gap-3 justify-center">
            <Link to="/shop/starter-kit" className="inline-flex bg-foreground text-background px-8 py-4 rounded-full font-medium hover:bg-primary transition-all">
              Start with the Starter Kit →
            </Link>
            <Link to="/shop" className="inline-flex border border-foreground/20 text-foreground px-8 py-4 rounded-full font-medium hover:bg-foreground hover:text-background transition-all">
              Browse all flavours
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function ReturnLoop() {
  const r = useRefillTx();
  const [active, setActive] = useState(0);
  const steps = r.loopSteps.map((st, idx) => ({
    ...st,
    img: [aluHeroImg, aluDispenseImg, aluLoopImg, aluLoopImg, shopRitualDesk][idx],
  }));

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % steps.length), 3600);
    return () => clearInterval(t);
  }, [steps.length]);

  return (
    <section id="loop" className="relative bg-[#f3ede2] text-foreground overflow-hidden">
      <div className="px-6 md:px-10 max-w-7xl mx-auto py-32 md:py-44 grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-28 reveal">
          <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-primary">{r.ch07Kicker}</span>
          <h2 className="mt-5 font-display text-4xl md:text-6xl font-extrabold leading-[0.98] tracking-tight">
            {r.loopH2a}<br/>
            <span className="italic font-light text-muted-foreground">{r.loopH2b}</span>
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed max-w-md">
            {r.loopDesc}
          </p>

          <div className="mt-10 aspect-[4/5] relative overflow-hidden rounded-md bg-background">
            {steps.map((s, i) => (
              <img
                key={s.t}
                src={s.img}
                alt={s.t}
                loading="lazy"
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1400ms] ease-[cubic-bezier(0.32,0.72,0,1)] ${active === i ? "opacity-100 scale-100" : "opacity-0 scale-105"}`}
              />
            ))}
            <div className="absolute bottom-5 left-5 font-mono text-[10px] uppercase tracking-[0.3em] bg-background/85 backdrop-blur px-3 py-1.5 rounded-full">
              0{active + 1} · {steps[active].t}
            </div>
          </div>
        </div>

        <ol className="lg:col-span-7 space-y-4">
          {steps.map((s, i) => {
            const on = active === i;
            return (
              <li
                key={s.t}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                tabIndex={0}
                className={`group cursor-pointer rounded-3xl border p-6 md:p-8 transition-all duration-700 ${on ? "border-foreground bg-background shadow-lg" : "border-border bg-background/40 hover:bg-background/80"}`}
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <span className={`grid place-items-center size-12 rounded-full font-mono text-xs tracking-widest transition-all duration-700 ${on ? "bg-foreground text-background scale-110" : "bg-secondary text-muted-foreground"}`}>
                      0{i + 1}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-tight">{s.t}</h3>
                    <p className="mt-2 text-muted-foreground leading-relaxed max-w-lg">{s.d}</p>
                  </div>
                  {i < 4 && (
                    <div className="hidden md:flex items-center pt-3">
                      <span className={`block h-px transition-all duration-700 ${on ? "w-12 bg-foreground" : "w-6 bg-border"}`} />
                    </div>
                  )}
                </div>
              </li>
            );
          })}

          <div className="mt-10 grid sm:grid-cols-3 gap-3 text-xs text-muted-foreground">
            <div className="rounded-2xl border border-border p-4 bg-background/60">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">{r.loopDeposit}</p>
              <p className="mt-2">{r.loopDepositText}</p>
            </div>
            <div className="rounded-2xl border border-border p-4 bg-background/60">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">{r.loopHygiene}</p>
              <p className="mt-2">{r.loopHygieneText}</p>
            </div>
            <div className="rounded-2xl border border-border p-4 bg-background/60">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">{r.loopReality}</p>
              <p className="mt-2">{r.loopRealityText}</p>
            </div>
          </div>
        </ol>
      </div>
    </section>
  );
}

const refillFaqItems = [
  {
    q: "How does the refill system actually work?",
    a: "Fill your VYTAL bottle with cold water, drop in one tablet, wait about 90 seconds for it to dissolve, and drink. That's it. For regular use, order refill cylinders online — each cylinder holds 8 tablets and includes a €4 refundable deposit.",
  },
  {
    q: "What's in each tablet?",
    a: "Four active ingredients: L-Theanine (200 mg) for calm focus, Ashwagandha KSM-66 (300 mg) for stress resilience, natural Green Tea Caffeine (80 mg) for steady energy, and Magnesium Bisglycinate (150 mg) for cellular recovery. No sugar, no artificial sweeteners.",
  },
  {
    q: "Is this a food supplement or an energy drink?",
    a: "VYTAL tablets are classified as a food supplement. They are not a substitute for a balanced and varied diet. Contains caffeine — not recommended for children, pregnant or breastfeeding women.",
  },
  {
    q: "Why tablets instead of a ready-made drink?",
    a: "Most ready-to-drink energy products are mostly water — you're shipping liquid across the country, packaged in a single-use can. VYTAL only ships the functional concentrate. You add local water. That reduces shipping volume by up to 85% and eliminates single-use packaging per drink.",
  },
  {
    q: "How do I return the empty cylinders?",
    a: "Collect five empty cylinders, place them in the included pre-paid return pouch, and drop it unfranked in any postbox. We sterilize and refill them. Your €4-per-cylinder deposit is credited to your next order. No app, no return label to print.",
  },
  {
    q: "What water works best?",
    a: "Cold still water dissolves the tablet most cleanly. Sparkling water works too and gives a slightly lighter, more refreshing result. Avoid hot water — it can degrade some of the active ingredients.",
  },
  {
    q: "Can I use any bottle, or does it have to be VYTAL?",
    a: "The tablets dissolve in any clean vessel with cold water. The VYTAL bottles are designed for the refill system — with standardised openings for station compatibility and materials chosen for daily long-term use — but you can use the tablets with any bottle you already own.",
  },
];

function RefillFAQ() {
  const r = useRefillTx();
  return (
    <section className="px-6 md:px-10 max-w-4xl mx-auto py-24 md:py-36">
      <div className="reveal mb-12">
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">{r.faqKicker}</span>
        <h2 className="mt-5 font-display text-4xl md:text-5xl font-extrabold leading-[0.98] tracking-tight">
          Frequently asked.
        </h2>
        <p className="mt-4 text-muted-foreground max-w-md leading-relaxed">
          Everything you need to know before starting the refill ritual.
        </p>
      </div>
      <Accordion type="single" collapsible className="reveal space-y-2">
        {r.faqItems.map((item, i) => (
          <AccordionItem
            key={i}
            value={`item-${i}`}
            className="border border-border rounded-2xl px-6 data-[state=open]:bg-secondary/40 transition-colors duration-300 border-b-0"
          >
            <AccordionTrigger className="font-display text-lg font-semibold text-left py-5 hover:no-underline hover:text-primary transition-colors [&[data-state=open]]:text-primary">
              {item.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed pb-5 text-base">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
