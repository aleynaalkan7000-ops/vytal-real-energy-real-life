import { createFileRoute, Link } from "@tanstack/react-router";
import { useLanguage } from "@/contexts/language-context";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SiteFooter } from "@/components/site-footer";
import { products, type Product } from "@/lib/vytal-products";
import { useCart, parsePrice, formatPrice } from "@/contexts/cart-context";
import shopStarterKit from "@/assets/shop-starter-kit-v2.png";
import shopStarterKitBrown from "@/assets/shop-starter-kit-brown.jpg";
import shopStarterKitBeige from "@/assets/shop-starter-kit-beige.png";
import shopHeroBottle from "@/assets/shop-hero-bottle-new.png";
import { DiscountBanner } from "./discount-banner";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — VYTAL · The refill ecosystem." },
      { name: "description", content: "Refillable plant-based energy tablets — starter kit (€40), six functional flavors, reusable aluminum cylinder. No crash, no plastic, ships to DE & AT." },
      { property: "og:title", content: "Shop — VYTAL · The refill ecosystem." },
      { property: "og:description", content: "Start the ritual. All six flavors, the reusable cylinder, the return loop — one calm system." },
      { property: "og:image", content: shopStarterKit },
    ],
  }),
  component: ShopPage,
});

// ── Flavor identities — mood per refill ───────────────────────────────
const flavorIdentity: Record<string, {
  mood: string;
  emotion: string;
  hex: string;
  ring: string;
}> = {
  focus: {
    mood: "Matcha Lime",
    emotion: "Quiet, deep, focused mornings.",
    hex: "#A8C49D",
    ring: "ring-[#A8C49D]",
  },

  flow: {
    mood: "Peach Green Tea",
    emotion: "Soft warmth that lasts all day.",
    hex: "#E8C6A4",
    ring: "ring-[#E8C6A4]",
  },

  refresh: {
    mood: "Berry Mint",
    emotion: "Cool reset between two meetings.",
    hex: "#C8D9E4",
    ring: "ring-[#C8D9E4]",
  },

  boost: {
    mood: "Citrus Ginger",
    emotion: "Alert, awake, never aggressive.",
    hex: "#E8A86A",
    ring: "ring-[#E8A86A]",
  },

  balance: {
    mood: "Pear Sage",
    emotion: "Calm clarity for slower days.",
    hex: "#BCC8AE",
    ring: "ring-[#BCC8AE]",
  },

  recharge: {
    mood: "Cherry Black Tea",
    emotion: "Late, soft, finally yours.",
    hex: "#A88494",
    ring: "ring-[#A88494]",
  },
};

// ── Flavor storytelling / premium positioning ─────────────────────────
const flavorStrategy: Record<string, {
  audience: string;
  sensory: string;
  quality: string;
  moment: string;
}> = {

  focus: {
    audience: "Quiet focus",

    sensory:
      "Stone-ground matcha character with fresh lime brightness and a clean herbal finish.",

    quality:
      "Built around a calmer Japanese-inspired energy profile with naturally occurring caffeine sources instead of overly sweet synthetic energy drink flavors.",

    moment:
      "Made for library mornings, deep work blocks and long study sessions.",
  },

  flow: {
    audience: "Soft daily energy",

    sensory:
      "Soft white peach sweetness balanced with delicate green tea bitterness and floral warmth.",

    quality:
      "Inspired by premium iced-tea culture and intentionally formulated to feel smoother, lighter and less overwhelming than traditional canned energy drinks.",

    moment:
      "Made for commuting, classes, slow mornings and everyday routines.",
  },

  refresh: {
    audience: "Cold reset",

    sensory:
      "Cold berry freshness layered with peppermint clarity and a crisp almost sparkling finish.",

    quality:
      "Designed to feel mentally cooling and clean — inspired by spa-water flavor profiles and modern low-sugar botanical drinks.",

    moment:
      "Made for screen fatigue, hot afternoons and mentally overloaded days.",
  },

  boost: {
    audience: "Pressure mode",

    sensory:
      "Sharp citrus opening followed by warm ginger heat and a dry sparkling finish.",

    quality:
      "A more refined interpretation of high-energy drinks — bold and energising without the heavy syrup-like sweetness.",

    moment:
      "Made for deadlines, early mornings and overloaded schedules.",
  },

  balance: {
    audience: "Slower clarity",

    sensory:
      "Juicy pear layered with soft sage and subtle botanical depth.",

    quality:
      "Inspired by premium herbal infusions and minimalist wellness drinks with a softer, calmer flavor direction.",

    moment:
      "Made for planning, reading, creative work and low-pressure productivity.",
  },

  recharge: {
    audience: "Late hours",

    sensory:
      "Dark cherry richness balanced with elegant black tea bitterness and low sweetness.",

    quality:
      "A deeper and more mature flavor profile for people who dislike artificial late-night energy drinks.",


    moment:
      "Made for evening work, studio sessions and finishing things peacefully.",
  },
};

const flavorMomentDe: Record<string, string> = {
  focus:    "Für Bibliotheks-Morgen, Deep-Work-Phasen und lange Lerneinheiten.",
  flow:     "Für den Pendlerweg, Vorlesungen, langsame Morgen und alltägliche Routinen.",
  refresh:  "Für Bildschirm-Müdigkeit, heiße Nachmittage und mental überlastete Tage.",
  boost:    "Für Deadlines, frühe Morgen und überfüllte Terminkalender.",
  balance:  "Für Planung, Lesen, kreative Arbeit und entspannte Produktivität.",
  recharge: "Für Abendarbeit, Studio-Sessions und das ruhige Fertigstellen.",
};

const flavorSensoryDe: Record<string, string> = {
  focus:    "Matcha-Charakter mit frischer Limettenhelligkeit und einem klaren Kräuterabgang.",
  flow:     "Weiche Pfirsichsüße mit zarter Grüntee-Bitterkeit und floraler Wärme.",
  refresh:  "Kalte Beerenfrische mit Pfefferminzklarheit und einem fast prickelnden Abschluss.",
  boost:    "Scharfe Zitrusöffnung mit warmem Ingwer und trockenem, leicht sprudelndem Abschluss.",
  balance:  "Saftige Birne mit weichem Salbei und subtiler botanischer Tiefe.",
  recharge: "Dunkelkirschfülle mit eleganter Schwarztee-Bitterkeit und geringer Süße.",
};

const flavorAudienceDe: Record<string, string> = {
  focus:    "Stiller Fokus",
  flow:     "Sanfte Tagesenergie",
  refresh:  "Kühler Reset",
  boost:    "Druckmodus",
  balance:  "Ruhige Klarheit",
  recharge: "Späte Stunden",
};

// ── Local shop page translations ──────────────────────────────────────
function useShopTx() {
  const { lang } = useLanguage();
  const isDE = lang === "de";
  return {
    isDE,
    lang,
    // UNITY Banner
    limitedDrop: isDE ? "Limitierter Drop" : "Limited Drop",
    unityDesc: isDE ? "Transparente Collector-Edition, inspiriert von Licht, Ritual und Wiederverwendung." : "Translucent collector edition inspired by light, ritual and reuse.",
    viewDrop: isDE ? "Drop ansehen →" : "View drop →",
    // Hero
    heroKicker: isDE ? "Der Shop · Das Ökosystem" : "The shop · The ecosystem",
    heroH1b: isDE ? "Nachfüll-Ritual." : "refill ritual.",
    heroDesc: isDE ? "Ein Starter Kit. Sechs funktionale Geschmäcker. Ein wiederverwendbarer Aluminiumzylinder, der zu uns zurückkommt – und wieder zu dir." : "One starter kit. Six functional flavors. A reusable aluminum cylinder that comes back to us — and to you — again and again.",
    heroCta1: isDE ? "Mit dem Starter Kit beginnen" : "Begin with the Starter Kit",
    heroCta2: isDE ? "Geschmäcker entdecken" : "Explore the flavors",
    heroCta3: isDE ? "Wie der Loop funktioniert →" : "How the loop works →",
    scrollSlowly: isDE ? "langsam · scrollen" : "scroll · slowly",
    // Quiet statement
    quietH2a: isDE ? "Kein Energy-Drink-Shop." : "Not an energy drink shop.",
    quietH2b: isDE ? "Ein Nachfüll-Ökosystem." : "A refill ecosystem.",
    quietDesc: isDE ? "Sechs Geschmäcker. Ein wiederverwendbarer Zylinder. Ein Rückgabe-Loop, der sich still hinter jeder Bestellung schließt. Für Routinen, die du bereits lebst." : "Six flavors. One reusable cylinder. A return loop that quietly closes behind every order. Designed for routines you already live.",
    // Starter kit section
    starterBadge1: isDE ? "Das Starter Kit · Hero-Produkt" : "The Starter Kit · Hero product",
    starterBadge2: isDE ? "Alle 6 Geschmäcker · Wähle deine Flaschenfarbe · Zylinder inklusive · Pfand inklusive" : "All 6 flavors · choose your bottle color · cylinder included · deposit included",
    starterKicker: isDE ? "Das vollständige Ritual" : "The complete ritual",
    starterH2b: isDE ? "Nachfüll-Ritual." : "refill ritual.",
    starterDesc: isDE ? "Alles, was du brauchst, um ins System einzusteigen – die Glasflasche, der wiederverwendbare Aluminiumzylinder, alle sechs Geschmäcker und eine Ritual-Karte für den ersten Morgen." : "Everything you need to enter the system — the glass bottle, the reusable aluminum cylinder, all six functional flavors, and a ritual card for the first morning.",
    starterItems: isDE ? [
      "1 × 750 ml Borosilikatglas-Flasche",
      "1 × Matter Aluminium-Nachfüllzylinder",
      "6 × Nachfüll-Geschmäcker (Focus, Flow, Refresh, Boost, Balance, Recharge)",
      "1 × Leinenhülle & Tragebeutel",
      "1 × Onboarding-Ritual-Karte",
    ] : [
      "1 × 750ml Borosilicate glass bottle",
      "1 × Matte aluminum refill cylinder",
      "6 × Refill flavors (Focus, Flow, Refresh, Boost, Balance, Recharge)",
      "1 × Linen sleeve & carry pouch",
      "1 × Onboarding ritual card",
    ],
    starterCta: isDE ? "Mit dem Starter Kit beginnen →" : "Begin the Starter Kit →",
    // Six flavors strip
    sixFlavorsKicker: isDE ? "Sechs funktionale Stimmungen" : "Six functional moods",
    sixFlavorsH3: isDE ? "Jedes Kit enthält alle sechs." : "Every kit contains all six.",
    sixFlavorsDesc: isDE ? "Jeder Geschmack hat seine eigene Intention – probiere alle aus, bevor du deinen Alltags-Liebling findest." : "Each flavor has its own intent — try them all before you choose your everyday.",
    exploreFlavorLabel: isDE ? "Geschmack entdecken" : "Explore flavor",
    // Refills section
    refillsKicker: isDE ? "Die Nachfüllungen" : "The refills",
    refillsH2a: isDE ? "Die Nachfüllungen." : "The refills.",
    refillsH2b: isDE ? "Immer im Zylinder." : "Always inside the cylinder.",
    refillsDesc: isDE ? "Jede Nachfüllung kommt in einem matten Aluminiumzylinder. Jeder Zylinder enthält 8 funktionale Tabletten und beinhaltet ein €4-Pfand. Wenn fünf Zylinder leer sind, schickst du sie zurück und wir sterilisieren und befüllen sie neu." : "Each refill arrives in a reusable matte aluminum cylinder. Every cylinder holds 8 functional tablets and includes a €4 refundable deposit. When five cylinders are empty, send them back, get your deposit credited, and we sterilize and refill them.",
    inRefillLoop: isDE ? "Im Nachfüll-Kreislauf" : "In refill loop",
    perCylinder: isDE ? "/ Zylinder" : "/ cylinder",
    quickAdd: isDE ? "Schnell hinzufügen →" : "Quick add →",
    added: isDE ? "Hinzugefügt ✓" : "Added ✓",
    // Return loop (05)
    loopKicker: isDE ? "05 · Der Rückgabe-Loop" : "05 · The return loop",
    loopH2a: isDE ? "Wie der VYTAL-" : "How the VYTAL",
    loopH2b: isDE ? "Loop funktioniert." : "loop works.",
    loopDesc: isDE ? "Zurückschicken, wann du bereit bist. Ein Briefkasten. Pfand erstattet. Keine Abonnement-Tricks, keine App, kein Greenwashing. Das gesamte System basiert auf einer einzigen ruhigen Bewegung." : "Return whenever you're ready. One postbox. Deposit refunded. No subscription tricks, no app, no greenwashing. The whole system is built around one quiet motion.",
    loopSteps: isDE
      ? [
          { t: "Empfangen", d: "Nachfüllzylinder kommt mit deiner Bestellung. Pfand inklusive." },
          { t: "Benutzen", d: "Ein Druck. Eine Tablette. Acht Tabletten pro Zylinder." },
          { t: "Sammeln", d: "Leere Zylinder nach und nach in den Rückgabebeutel legen." },
          { t: "Zurückschicken", d: "Beutel portofrei in jeden Briefkasten einwerfen. Vorfrankiert. Keine App. Oder einfach behalten und weiterverwenden – du entscheidest." },
          { t: "Wiederverwenden", d: "Bei Rückgabe sterilisieren wir ihn und befüllen ihn für ein anderes Ritual." },
        ]
      : [
          { t: "Receive", d: "Refill cylinder arrives with your order. Deposit included." },
          { t: "Use", d: "One press. One tablet. Eight tablets per cylinder." },
          { t: "Collect", d: "Slip empty cylinders into the return pouch as they're used." },
          { t: "Return", d: "Drop the pouch unfranked in any postbox. Pre-paid. No app. Or simply keep it to repurpose at home. You decide when the loop closes." },
          { t: "Reuse", d: "If returned, we sterilize and refill it for someone else's ritual." },
        ],
    loopDeposit: isDE ? "Pfand" : "Deposit",
    loopDepositText: isDE ? "€4 pro Zylinder. Vollständig erstattet bei Rückgabe. Keine Mindestmenge, keine Eile." : "€4 per cylinder. Fully refunded upon return. No minimums, no rush.",
    loopHygiene: isDE ? "Hygiene" : "Hygiene",
    loopHygieneText: isDE ? "Zurückgegebene Zylinder werden nach medizinischen Standards sterilisiert, bevor sie neu befüllt werden." : "Returned cylinders are sterilized to medical-grade standards before refilling.",
    loopReality: isDE ? "Realitäts-Check" : "Reality check",
    loopRealityText: isDE ? "Deutlich bewusster als Dosen-Drinks. Erster öffentlicher Nachhaltigkeitsbericht geplant für Q4 2025." : "Significantly more conscious than canned drinks. First public sustainability report planned for Q4 2025.",
    costTitle: isDE ? "Was es pro Monat kostet" : "What it costs per month",
    costItems: isDE
      ? [
          { val: "~€21", desc: "Gelegentliche Nutzung · 1 Tablette/Tag · 8 Tabletten à €2,60 Ø" },
          { val: "~€52", desc: "Tägliche Nutzung · 20 Werktage · Ø Nachfüllpreis" },
          { val: "+ €4", desc: "Zylinder-Pfand pro Bestellung – erstattet bei Rückgabe von 5 Leerteilen" },
        ]
      : [
          { val: "~€21", desc: "Occasional use · 1 tablet/day · 8 tablets avg at €2.60" },
          { val: "~€52", desc: "Daily use · 20 working days · avg refill price" },
          { val: "+ €4", desc: "Cylinder deposit per order — refunded when you return 5 empties" },
        ],
    // Cylinder section (06)
    cylinderKicker: isDE ? "Das System-Objekt" : "The system object",
    cylinderH2a: isDE ? "Inklusive bei" : "Included with",
    cylinderH2b: isDE ? "jeder einzelnen Nachfüllung." : "every single refill.",
    cylinderDesc: isDE ? "Der matte Aluminiumzylinder ist nicht nur Verpackung – er ist das Gefäß, in dem deine Nachfüllungen ankommen. Jeder Geschmack, den du bestellst, kommt darin. Nutze ihn, leere ihn und entscheide: Schick ihn zurück für eine Pfand-Erstattung – oder behalte ihn für deinen Schreibtisch." : "The matte aluminum cylinder isn't just packaging; it's the vessel your refills travel in. Every flavor you order arrives inside one. Use it, empty it, and decide: return it for a deposit refund so we can close the loop, or keep it to organize your own space.",
    cylinderSpecs: isDE ? [
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
    starterH2a: isDE ? "Beginne das" : "Begin the",
    discoverDetails: isDE ? "Details entdecken →" : "Discover the details →",
    browseRefills: isDE ? "Nachfüllungen ansehen →" : "Browse refill packs →",
    starterKitLink: isDE ? "Starter Kit" : "Starter Kit",
    partOfEveryRefill: isDE ? "Teil jeder Nachfüllung" : "Part of every refill",
    // Accessories
    accessoriesKicker: isDE ? "Flaschen & Behälter" : "Bottles & vessels",
    accessoriesH3: isDE ? "Flaschen & Behälter." : "Bottles & vessels.",
    accessoriesDesc: isDE ? "Optionale Erweiterungen des Systems. Alle Nachfüllungen passen." : "Optional extensions of the system. The refills fit them all.",
    bottleLabel: isDE ? "Flasche · " : "Bottle · ",
    // Sustainability
    susKicker: isDE ? "06 · Nachhaltigkeit" : "06 · Sustainability",
    susH2a: isDE ? "Still ehrlich." : "Quietly honest.",
    susH2b: isDE ? "Messbar besser." : "Measurably better.",
    susDesc: isDE ? "Wir behaupten nicht, zero-waste zu sein. Wir veröffentlichen die echten Zahlen, den echten Loop, die echte Material-Kette – und fragen den Planeten mit jeder Nachfüllung etwas weniger." : "We're not pretending to be zero-waste. We're publishing the real numbers, the real loop, the real material trail — and asking less of the planet, one refill at a time.",
    susStats: isDE ? [
      { k: "−85%", l: "Versandvolumen vs. Dosen-Drinks" },
      { k: "0", l: "Einweg-Plastikverpackungen pro Nachfüllung" },
      { k: "5×", l: "Zylinder pro Rückgabe-Zyklus" },
      { k: "Q4 '25", l: "Erster öffentlicher Nachhaltigkeitsbericht geplant" },
      { k: "100%", l: "Ziel: vollständig nachverfolgbare Zutaten-Herkunft" },
      { k: "8", l: "Tabletten pro Zylinder vor Rückgabe" },
    ] : [
      { k: "−85%", l: "Shipping volume vs. canned drinks" },
      { k: "0", l: "Single-use plastic wrappers per refill" },
      { k: "5×", l: "Cylinders per return cycle" },
      { k: "Q4 '25", l: "First public sustainability report planned" },
      { k: "100%", l: "Ingredient transparency goal — sourcing tracked" },
      { k: "8", l: "Tablets per cylinder before return" },
    ],
    // Closing
    closingKicker: isDE ? "Ein langsameres System" : "A slower system",
    closingH2a: isDE ? "Ein Ritual." : "One ritual.",
    closingH2b: isDE ? "Endlos nachgefüllt." : "Endlessly refilled.",
    closingCta1: isDE ? "Mit dem Starter Kit beginnen →" : "Begin the Starter Kit →",
    closingCta2: isDE ? "Nachfüllungen entdecken" : "Explore the refills",
    // Reviews
    reviewsKicker: isDE ? "Community-Stimmen" : "Community voices",
    reviewsH2: isDE ? "Was andere sagen." : "What people say.",
    reviewsDesc: isDE ? "Echte Routinen. Echtes Feedback. Vom Bibliotheks-Morgen bis zum Spät-Abend-Schreibtisch." : "Real routines. Real feedback. From mornings in libraries to late-evening desks.",
    reviewProductLabel: isDE ? "Geschmack" : "flavor",
    // FAQ
    faqKicker: isDE ? "Fragen" : "Questions",
    faqH2: isDE ? "Häufig gestellt." : "Frequently asked.",
    faqItems: isDE ? [
      { q: "Was genau ist das VYTAL-System?", a: "VYTAL ist eine nachfüllbasierte Alternative zu Einweg-Energy-Drinks. Du kaufst einmal eine wiederverwendbare Flasche, dann löst du eine pflanzenbasierte Konzentrat-Tablette in kaltem Wasser auf. Die Nachfüllzylinder kommen zu uns zurück, werden sterilisiert und erneut ausgegeben." },
      { q: "Was steckt in den Tabletten?", a: "Vier Wirkstoffe: L-Theanin (200 mg), Ashwagandha KSM-66 (300 mg), natürliches Grüntee-Koffein (80 mg) und Magnesiumbisglycinat (150 mg). Kein Zucker, keine künstlichen Süßungsmittel, kein synthetisches Koffein." },
      { q: "Wie viele Tabletten sind in einem Zylinder?", a: "Jeder matte Aluminiumzylinder enthält genau 8 Tabletten – eine pro Drink. Das sind acht ruhige Nachfüllmomente, bevor der Zylinder leer und bereit zur Rückgabe ist." },
      { q: "Wie funktioniert der Pfand- und Rückgabe-Loop?", a: "Jeder Nachfüllzylinder beinhaltet ein €4-Pfand. Sammle fünf leere Zylinder, wirf sie portofrei mit dem vorfrankierten Rückgabebeutel in jeden Briefkasten. Wir sterilisieren sie und bringen sie zurück in den Kreislauf. Dein Pfand wird mit der nächsten Bestellung verrechnet." },
      { q: "Was ist, wenn ich die Zylinder nicht zurückgebe?", a: "Keine Pflicht, keine Strafe. Die Zylinder aus Aerospace-Aluminium sind schön genug fürs Regal. Du erhältst einfach das Pfand nicht zurück." },
      { q: "Ist VYTAL für den täglichen Gebrauch geeignet?", a: "Ja – das Produkt ist für den täglichen Einsatz konzipiert. Die Formel enthält 80 mg natürliches Koffein (ungefähr eine Tasse Kaffee), kombiniert mit L-Theanin für eine gleichmäßige Kurve. Nicht empfohlen für Kinder, Schwangere oder stillende Frauen." },
      { q: "Welches Wasser soll ich verwenden?", a: "Kaltes Stilles Wasser löst die Tablette am saubersten auf. Sprudelwasser ergibt ein leichteres, erfrischenderes Ergebnis. Heißes Wasser vermeiden – es kann Wirkstoffe beeinflussen." },
      { q: "Wie lange dauert die Lieferung?", a: "Derzeit versenden wir nach Deutschland und Österreich. Standardlieferung: 2–4 Werktage. Alle Verpackungen sind plastikfrei aus Recycling-Karton." },
    ] : [
      { q: "What exactly is the VYTAL system?", a: "VYTAL is a refill-based alternative to disposable energy drinks. You buy a reusable bottle once, then dissolve a plant-based concentrate tablet in cold water. The refill cylinders come back to us, get sterilized, and go out again — a quiet loop designed to waste less from the start." },
      { q: "What's inside the tablets?", a: "Four active ingredients: L-Theanine (200 mg), Ashwagandha KSM-66 (300 mg), natural Green Tea Caffeine (80 mg), and Magnesium Bisglycinate (150 mg). No sugar, no artificial sweeteners, no synthetic caffeine — just the functional part." },
      { q: "How many tablets come in a cylinder?", a: "Each matte aluminum refill cylinder holds exactly 8 tablets — one per drink. That's eight calm refill moments before the cylinder is empty and ready to return." },
      { q: "How does the deposit and return loop work?", a: "Every refill cylinder includes a €4 refundable deposit. Collect five empty cylinders, drop them unfranked in any postbox using the included pre-paid return pouch. We sterilize them and put them back into the loop. Your deposit is credited to your next order. No app needed." },
      { q: "What if I don't return the cylinders?", a: "No obligation, and no penalty. The cylinders are made from aerospace-grade anodized aluminum — beautiful enough to keep on a shelf or desk. You simply don't receive the deposit back. You decide when the loop closes." },
      { q: "Is VYTAL suitable for daily use?", a: "Yes — it's designed for everyday use. The formulation contains 80 mg of natural caffeine (roughly equivalent to one cup of coffee), paired with L-Theanine to smooth the curve. Not recommended for children, pregnant or breastfeeding women, or people sensitive to caffeine." },
      { q: "What water should I use?", a: "Still cold tap water works perfectly. Sparkling water gives a lighter, slightly more refreshing result. Avoid hot water — it can affect the tablet's dissolution and some active ingredients." },
      { q: "How long does delivery take?", a: "Currently shipping within Germany and Austria. Standard delivery: 2–4 working days. All packaging is plastic-free recycled board." },
    ],
    // QuickView
    qvWhatsInside: isDE ? "Das ist drin" : "What's inside",
    qvRequiredInfo: isDE ? "Pflichtangaben" : "Required product information",
    qvSupplement: isDE ? "Nahrungsergänzungsmittel. Kein Ersatz für eine ausgewogene, abwechslungsreiche Ernährung. Von Kindern fernhalten." : "Food supplement. Not a substitute for a balanced and varied diet. Keep out of reach of children.",
    qvCaffeine: isDE ? "Enthält Koffein. Nicht empfohlen für Kinder, Schwangere oder stillende Frauen." : "Contains caffeine. Not recommended for children, pregnant or breastfeeding women.",
    qvBottleNote: isDE ? "Flasche und Zylinder sind für kaltes Stilles Wasser und VYTAL-Tabletten ausgelegt. Vor dem ersten Gebrauch reinigen. Nicht verwenden, wenn beschädigt." : "Bottle and cylinder are designed for cold still water and VYTAL tablets. Clean before first use. Do not use if damaged.",
    qvDepositNote: isDE ? "Pfand inklusive. Rückgabe-Loop gilt für Nachfüllzylinder." : "Deposit included. Return loop applies to refill cylinders.",
    qvBottleDetails: isDE ? "Flascheneigenschaften & Pflege" : "Bottle details & care",
    qvFullPage: isDE ? "Zur Produktseite →" : "Full product page →",
    qvIngredients: isDE ? "Zutaten" : "Ingredients",
    qvNutrition: isDE ? "Nährwerte pro Portion" : "Nutrition per serving",
    qvFlavor: isDE ? "Geschmack" : "Flavor",
    qvAddToCart: isDE ? (price: string) => `In den Warenkorb · ${price}` : (price: string) => `Add to cart · ${price}`,
    qvAdded: isDE ? "Hinzugefügt ✓" : "Added ✓",
    qvDepositBreakdown: isDE ? (base: string, dep: string) => `${base} Nachfüllung + ${dep} erstattungsfähiges Zylinder-Pfand.` : (base: string, dep: string) => `${base} refill + ${dep} refundable cylinder deposit.`,
    // Starter kit quick view
    skKicker: isDE ? "Starter Kit · Vollständiges Nachfüll-Ritual" : "Starter Kit · Complete refill ritual",
    skH2: isDE ? "VYTAL Starter Kit" : "VYTAL Starter Kit",
    skDesc: isDE ? "Der vollständige Einstieg ins VYTAL-Nachfüllsystem: eine wiederverwendbare Flasche, ein Nachfüllzylinder, alle sechs Geschmäcker, Hülle, Beutel und Onboarding-Ritual-Karte." : "The complete entry into the VYTAL refill system: one reusable bottle, one refill cylinder, all six functional flavors, sleeve, pouch and onboarding ritual card.",
    skItems: isDE ? [
      "1 × wiederverwendbare Glasflasche",
      "1 × matter Aluminium-Nachfüllzylinder",
      "6 × Funktionale Nachfüll-Geschmäcker",
      "1 × Leinenhülle & Tragebeutel",
      "1 × Onboarding-Ritual-Karte",
    ] : [
      "1 × reusable glass bottle",
      "1 × matte aluminum refill cylinder",
      "6 × functional flavor tablets",
      "1 × linen sleeve & carry pouch",
      "1 × onboarding ritual card",
    ],
    skDepositNote: isDE ? "Pfand inklusive. Rückgabe-Loop gilt für Nachfüllzylinder." : "Deposit included. Return loop applies to refill cylinders.",
    skAddBtn: isDE ? (price: string) => `In den Warenkorb · ${price}` : (price: string) => `Add to cart · ${price}`,
    // Product quickview — translated product data
    productFunctionDe: {
      focus: "Fokus, Konzentration & tiefes Lernen",
      flow: "Gleichmäßige Energie für lange Sessions",
      refresh: "Mentale Frische & leichte Aktivierung",
      boost: "Stärkere Aktivierung & mentale Wachheit",
      balance: "Ruhige Energie & bewusster Alltag",
      recharge: "Abendproduktivität & späte Sessions",
      "go-bottle": "Optimierte To-go-Flasche für schnelle, präzise Nachfüllungen",
      "flow-bottle": "Längere Nutzung & intelligente Hydration",
      "office-bottle": "Premium-Flasche für professionelle Umgebungen",
      "home-container": "Vorratscontainer für Zuhause & flexiblen Einsatz",
      "unity-bottle": "Community-getriebene Limited Edition",
      "starter-kit": "Flasche + 6 Nachfüllungen, je einen von jedem Geschmack",
    } as Record<string, string>,
    productDescDe: {
      focus: "FOCUS wurde für lange Tage, volle To-do-Listen und intensive Lernsessions entwickelt. Eine Kombination aus natürlichen Energiequellen und einer ruhigeren Formulierung unterstützt Konzentration und Produktivität – ohne den extremen Charakter klassischer Energy Drinks.",
      flow: "FLOW wurde für lange Arbeits-, Lern- und Alltagssessions entwickelt. Die Formulierung unterstützt gleichmäßige Energie und einen fokussierten Tag – ohne unnötige Überlastung oder starken Leistungsabfall.",
      refresh: "REFRESH wurde für Momente entwickelt, in denen neue Energie und mentale Frische gebraucht werden. Ideal unterwegs, zwischen Terminen oder nach langen Stunden vor dem Bildschirm.",
      boost: "BOOST wurde für stressige Tage, hohe mentale Belastung und Momente mit wenig Schlaf entwickelt. Die stärkere Formulierung liefert intensive, aber bewusst funktionale Energie – ohne künstlich zu wirken.",
      balance: "BALANCE kombiniert leichte Energie mit einem ruhigeren Konsumgefühl – entwickelt für Menschen, die bewusster konsumieren möchten.",
      recharge: "RECHARGE wurde für späte Lern- oder Arbeitsphasen entwickelt, in denen Fokus gebraucht wird, ohne den Körper unnötig zu überlasten. Die Formulierung fühlt sich ruhiger an als klassische Energy Drinks.",
      "go-bottle": "Mit 750 ml Fassungsvermögen, speziell für das VYTAL-Nachfüllsystem entwickelt. Die standardisierte Form ermöglicht dem Dispenser, Größe, Füllstand, Mischverhältnis und gewünschte Intensität automatisch zu erkennen.",
      "flow-bottle": "Entwickelt für längere Sessions und direkte Arbeit mit dem Nachfüllsystem. Der Dispenser erkennt automatisch Füllstand, Behältergröße und die ideale Intensität für größere Volumina.",
      "office-bottle": "Mit 750 ml Fassungsvermögen kombiniert diese Flasche Funktionalität mit hochwertiger Ästhetik – speziell für moderne Arbeitsumgebungen entwickelt. Soft-Close-Deckel, fingerabdruckfreie Oberfläche und auslaufsichere Konstruktion.",
      "home-container": "Entwickelt für größere Nachfüllmengen. Standardisierte Größen ermöglichen präzises Befüllen, automatische Dosierungsanpassung und hygienische Heimnutzung.",
      "unity-bottle": "Diese limitierte Edition mit 750 ml ist nicht nur funktional — sie ist Teil der Marken- und Community-Erfahrung. Limitierte Drops und exklusive Designs schaffen emotionalen Wert und Sammlerwert.",
      "starter-kit": "Der einfachste Einstieg in VYTAL. Eine GO BOTTLE und je eine Nachfüllung jedes Geschmacks — finde deinen Tag, deinen Abend, dein Wochenende.",
    } as Record<string, string>,
    productFlavorNoteDe: {
      focus: "Frisch, leicht kräuterig, modern",
      flow: "Weich, leicht süßlich, calm-modern",
      refresh: "Frisch, kühl, leicht fruchtig",
      boost: "Intensiv, leicht scharf, energetisch",
      balance: "Leicht, natürlich, erwachsen",
      recharge: "Tief, ruhig, leicht kräutersüß",
    } as Record<string, string>,
    ingredientWhyDe: {
      "Even, steady release of natural caffeine.": "Gleichmäßige, stetige Freisetzung von natürlichem Koffein.",
      "Plant-based caffeine source.": "Pflanzenbasierte Koffeinquelle.",
      "Calmer, more balanced focus.": "Ruhigerer, ausgewogenerer Fokus.",
      "Adaptogen for stress balance.": "Adaptogen für Stressbalance.",
    } as Record<string, string>,
    nutritionLabelsDe: {
      Energy: "Energie",
      Sugar: "Zucker",
      Caffeine: "Koffein",
      Sweetener: "Süßungsmittel",
    } as Record<string, string>,
    bottleDetailsDe: {
      "go-bottle": {
        intro: "Leichte Alltagsflasche für Bewegung, Campustage und Routinen außer Haus.",
        bullets: [
          "Sanftes Tragegefühl für den Alltag.",
          "Entwickelt für kaltes stilles Wasser und VYTAL-Tabletten.",
          "Leicht in Taschen und tägliche Setups zu transportieren.",
          "Handwäsche empfohlen.",
          "Nicht verwenden, wenn gerissen, undicht oder sichtbar beschädigt.",
        ],
      },
      "flow-bottle": {
        intro: "Minimale Hydrations-Flasche für ruhigere Alltagsroutinen und langsame Nachfüllrituale.",
        bullets: [
          "Klares minimalistisches Design für tägliche Hydration.",
          "Geeignet für kaltes stilles Wasser und VYTAL-Tabletten.",
          "Für wiederholten täglichen Gebrauch konzipiert.",
          "Handwäsche empfohlen zum Schutz der Oberfläche.",
          "Nicht mit kochenden Flüssigkeiten verwenden.",
        ],
      },
      "office-bottle": {
        intro: "Gebürstete Edelstahlflasche für Schreibtischarbeit, Pendeln und längere Bürosessions.",
        bullets: [
          "Edelstahl-Außenseite mit professionellem Büro-Look.",
          "Entwickelt für tägliche Hydration und VYTAL-Nachfüllrituale.",
          "Geeignet für kaltes stilles Wasser und VYTAL-Tabletten.",
          "Handwäsche empfohlen zum Schutz von Deckel und Oberfläche.",
          "Nicht verwenden, wenn verbeult, undicht oder sichtbar beschädigt.",
        ],
      },
      "home-container": {
        intro: "Heimlagerungsgefäß für sichtbare, organisierte und einfach zu teilende Nachfüllroutinen.",
        bullets: [
          "Für Heimlagerung und geteilte Routinen gedacht.",
          "An einem trockenen, kühlen Ort vor direkter Sonneneinstrahlung lagern.",
          "Geschlossen halten, wenn nicht in Gebrauch.",
          "Vor dem ersten Gebrauch reinigen.",
          "Nicht verwenden, wenn gerissen oder sichtbar beschädigt.",
        ],
      },
      "unity-bottle": {
        intro: "Limitierte visuelle Edition mit transluzentem Sammler-Charakter als saisonale Erweiterung des Nachfüllrituals.",
        bullets: [
          "Limitierte visuelle Edition.",
          "Entwickelt für kaltes stilles Wasser und VYTAL-Tabletten.",
          "Nachfüllungen werden separat verkauft, sofern nicht in einem Bundle enthalten.",
          "Handwäsche empfohlen zum Schutz der Oberfläche.",
          "Nicht verwenden, wenn gerissen, undicht oder sichtbar beschädigt.",
        ],
      },
    } as Record<string, { intro: string; bullets: string[] }>,
    productMustBeUsed: isDE
      ? "Das Produkt muss bestimmungsgemäß verwendet werden. Vor dem ersten Gebrauch immer reinigen."
      : "Product must be used as intended. Always clean before first use.",
    bottleTaglineDe: {
      "go-bottle": "Mehr als eine Flasche — Teil des Systems.",
      "flow-bottle": "750 ml gleichmäßige, bewusste Hydration.",
      "office-bottle": "Still, professionell, auslaufsicher.",
      "home-container": "Größere Mengen nachfüllen für den gemeinsamen Heimgebrauch.",
      "unity-bottle": "Limitierte Drops mit Sammler-Charakter.",
    } as Record<string, string>,
  };
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function StarterKitQuickView({ onClose }: { onClose: () => void }) {
  const s = useShopTx();
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const product = useMemo(() => products.find((p) => p.slug === "starter-kit")!, []);

  const [activeVariant, setActiveVariant] = useState(
    product?.variants && product.variants.length > 0 ? product.variants[0] : null
  );

  const currentImage = activeVariant ? activeVariant.image : shopStarterKit;
  const currentSlug = activeVariant ? activeVariant.slug : "starter-kit";
  const currentColorName = activeVariant ? activeVariant.colorName : "Complete ritual";

  const unitPrice = 40;

  const handleAdd = () => {
  add({
    id: currentSlug,
    name: "VYTAL Starter Kit",
    variant: currentColorName,
    image: currentImage,
    unitPrice,
    qty,
    href: `/shop/${currentSlug}`,
  });

  setAdded(true);

  setTimeout(() => {
    setAdded(false);
    onClose(); // <- schließt popup automatisch
  }, 900);
};
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center p-6"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-background rounded-3xl shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 z-10 size-10 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-secondary transition-colors"
        >
          ✕
        </button>

        <div className="grid md:grid-cols-2">
          <div className="relative h-full min-h-[350px] bg-secondary/40">
            <img
              src={currentImage}
              alt="VYTAL Starter Kit"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          </div>

          <div className="p-6 md:p-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
              {s.skKicker}
            </p>

            <h2 className="mt-4 font-display text-4xl font-extrabold leading-[0.95]">
              {s.skH2}
            </h2>

            <p className="mt-5 text-muted-foreground leading-relaxed">
              {s.skDesc}
            </p>

            {product?.variants && product.variants.length > 0 && (
              <div className="mt-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary mb-3">
                  Bottle Color · <span className="text-foreground">{currentColorName}</span>
                </p>
                <div className="flex gap-3">
                  {product.variants.map((v) => (
                    <button
                      key={v.slug}
                      onClick={() => setActiveVariant(v)}
                      className={`size-8 rounded-full border-2 transition-all ${
                        activeVariant?.slug === v.slug 
                          ? "border-foreground scale-110" 
                          : "border-transparent hover:scale-105 shadow-sm"
                      }`}
                      style={{ backgroundColor: v.hex }}
                      aria-label={`Select ${v.colorName}`}
                    />
                  ))}
                </div>
              </div>
            )}
            
            <div className="mt-8 rounded-2xl border border-border p-5 bg-secondary/30">
              <p className="font-mono text-[10px] uppercase tracking-widest text-primary mb-3">
                {s.qvWhatsInside}
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {s.skItems.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>

            <div className="mt-8 rounded-2xl bg-secondary/40 p-5 text-xs text-muted-foreground leading-relaxed">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary mb-3">
                {s.qvRequiredInfo}
              </p>
              <p>{s.qvSupplement}</p>
              <p className="mt-2">{s.qvCaffeine}</p>
              <p className="mt-2">{s.qvBottleNote}</p>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <div className="inline-flex items-center border border-border rounded-full">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="size-10 hover:bg-secondary rounded-full transition-colors"
                >
                  −
                </button>
                <span className="w-10 text-center font-mono">{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty((q) => q + 1)}
                  className="size-10 hover:bg-secondary rounded-full transition-colors"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className="flex-1 bg-foreground text-background px-6 py-3 rounded-full text-sm font-medium hover:bg-primary transition-colors"
              >
                {added ? s.qvAdded : s.qvAddToCart(formatPrice(qty * unitPrice))}
              </button>
            </div>

            <p className="mt-3 text-[11px] text-muted-foreground">
              {s.skDepositNote}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function useParallax(ref: React.RefObject<HTMLElement | null>, intensity = 0.1) {
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * intensity;
        ref.current.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, [ref, intensity]);
}

const shopFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "What exactly is the VYTAL system?", acceptedAnswer: { "@type": "Answer", text: "VYTAL is a refill-based alternative to disposable energy drinks. You buy a reusable bottle once, then dissolve a plant-based concentrate tablet in cold water. The refill cylinders come back to us, get sterilized, and go out again — a quiet loop designed to waste less from the start." } },
    { "@type": "Question", name: "What's inside the tablets?", acceptedAnswer: { "@type": "Answer", text: "Four active ingredients: L-Theanine (200 mg), Ashwagandha KSM-66 (300 mg), natural Green Tea Caffeine (80 mg), and Magnesium Bisglycinate (150 mg). No sugar, no artificial sweeteners, no synthetic caffeine." } },
    { "@type": "Question", name: "How does the deposit and return loop work?", acceptedAnswer: { "@type": "Answer", text: "Every refill cylinder includes a €4 refundable deposit. Collect five empty cylinders, drop them unfranked in any postbox using the included pre-paid return pouch. We sterilize them and put them back into the loop. Your deposit is credited to your next order." } },
    { "@type": "Question", name: "Is VYTAL suitable for daily use?", acceptedAnswer: { "@type": "Answer", text: "Yes — it's designed for everyday use. The formulation contains 80 mg of natural caffeine, paired with L-Theanine to smooth the curve. Not recommended for children, pregnant or breastfeeding women, or people sensitive to caffeine." } },
  ],
};

const shopSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "VYTAL Shop",
  description: "Refillable plant-based focus supplements — starter kit, six functional flavors and the circular refill loop.",
  numberOfItems: 7,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "VYTAL Starter Kit", url: "https://vytal-energy.de/shop/starter-kit" },
    { "@type": "ListItem", position: 2, name: "VYTAL Focus — Matcha Lime", url: "https://vytal-energy.de/shop/focus" },
    { "@type": "ListItem", position: 3, name: "VYTAL Flow — Peach Green Tea", url: "https://vytal-energy.de/shop/flow" },
    { "@type": "ListItem", position: 4, name: "VYTAL Refresh — Berry Mint", url: "https://vytal-energy.de/shop/refresh" },
    { "@type": "ListItem", position: 5, name: "VYTAL Boost — Citrus Ginger", url: "https://vytal-energy.de/shop/boost" },
    { "@type": "ListItem", position: 6, name: "VYTAL Balance — Pear Sage", url: "https://vytal-energy.de/shop/balance" },
    { "@type": "ListItem", position: 7, name: "VYTAL Recharge — Cherry Black Tea", url: "https://vytal-energy.de/shop/recharge" },
  ],
};

function ShopPage() {
  useReveal();
  const s = useShopTx();
  const heroImgRef = useRef<HTMLImageElement>(null);
  useParallax(heroImgRef as unknown as React.RefObject<HTMLElement | null>, 0.06);
  const [heroIndex, setHeroIndex] = useState(0);
  const starterKit = useMemo(() => products.find((p) => p.slug === "starter-kit"), []);
  const variants = starterKit?.variants || [];

  useEffect(() => {
    if (variants.length <= 1) return;
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % variants.length);
    }, 4000); // Alle 4 Sekunden
    return () => clearInterval(interval);
  }, [variants]);

  const refills = useMemo(() => products.filter((p) => p.category === "refill"), []);
  const bottles = useMemo(() => products.filter((p) => p.category === "bottle"), []);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [starterKitOpen, setStarterKitOpen] = useState(false);



  const scrollTo = (id: string) => () =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(shopSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(shopFaqSchema) }}
      />

<div className="px-6 md:px-10 mt-3 mb-3 md:mt-10 md:mb-6">
  <div className="group relative overflow-hidden rounded-2xl md:rounded-[32px] border border-white/10 bg-gradient-to-br from-[#f4f1eb] to-[#ebe7df] px-4 py-3 md:px-8 md:py-7 shadow-[0_10px_40px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-[2px] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]">

    {/* glow */}
    <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/40 blur-3xl opacity-60" />

    {/* content */}
    <div className="relative z-10 flex flex-row items-center justify-between gap-3">

      <div className="flex items-center gap-2 md:gap-5 min-w-0">
        <span className="shrink-0 rounded-full border border-black/10 bg-white/50 px-2.5 py-1.5 md:px-4 md:py-2 text-[9px] md:text-[10px] font-medium uppercase tracking-[0.2em] md:tracking-[0.28em] text-black/70 backdrop-blur-sm whitespace-nowrap">
          {s.limitedDrop}
        </span>
        <div className="min-w-0">
          <p className="text-sm md:text-2xl font-semibold tracking-tight text-black truncate">
            UNITY Bottle
          </p>
          <p className="hidden md:block mt-1 text-base text-black/60">
            {s.unityDesc}
          </p>
        </div>
      </div>

      <button
        onClick={() => {
          const el = document.getElementById("unity");
          el?.scrollIntoView({ behavior: "smooth", block: "center" });
        }}
        className="unity-drop-banner__button shrink-0"
      >
        {s.viewDrop}
      </button>
    </div>
  </div>
</div>

      {/* HERO — Starter Kit leads the entire shop */}
      <section id="starter-kit" className="relative min-h-[55svh] md:min-h-[100svh] flex items-end overflow-hidden bg-gradient-to-b from-secondary/70 via-background to-background">
        <div className="absolute inset-0 -z-10">
          <img
            // Dynamische Quelle nutzen:
            src={variants.length > 0 ? variants[heroIndex].image : shopStarterKit}
            alt="The VYTAL Starter Kit"
            loading="lazy"
            width={1600}
            height={1920}
            // WICHTIG: Die Klasse duration-1000 sorgt für den weichen Übergang
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/75 via-transparent to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto w-full px-6 md:px-10 pb-10 md:pb-32 pt-16 md:pt-40 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-7">
            <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-primary block mb-8 reveal">
              {s.heroKicker}
            </span>
            <h1 className="font-display text-[clamp(3rem,8.5vw,8rem)] font-extrabold leading-[0.92] tracking-tighter text-balance reveal">
              {s.isDE ? "Starte dein" : "Start your"} <em className="not-italic italic font-light text-primary">{s.heroH1b}</em>
            </h1>
            <p className="mt-8 max-w-lg text-lg md:text-xl text-muted-foreground leading-relaxed reveal">
              {s.heroDesc}
            </p>

            <div className="mt-12 flex flex-wrap gap-3 reveal">
              <button
                onClick={scrollTo("starter")}
                className="group inline-flex items-center gap-2 bg-foreground text-background px-7 py-4 rounded-full text-sm font-medium hover:bg-primary transition-colors"
              >
                {s.heroCta1}
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </button>
              <button
                onClick={scrollTo("refills")}
                className="inline-flex items-center gap-2 border border-foreground/15 px-7 py-4 rounded-full text-sm font-medium hover:bg-secondary transition-colors"
              >
                {s.heroCta2}
              </button>
            </div>
          </div>

          <div className="md:col-span-5 relative hidden md:block">
            <div className="relative aspect-[3/4] reveal">
              <img
                src={shopHeroBottle}
                alt="A translucent sage VYTAL bottle with dissolving tablets"
                width={1200}
                height={1600}
                className="absolute inset-0 h-full w-full object-cover rounded-md shadow-2xl animate-float"
              />
              <div className="pointer-events-none absolute -inset-6 -z-10 rounded-full bg-primary/15 blur-3xl animate-drift" />
            </div>
          </div>
        </div>

        <div className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground/70 reveal">
          {s.scrollSlowly}
        </div>
      </section>

      {/* QUIET STATEMENT */}
      <section className="px-6 md:px-10 max-w-5xl mx-auto py-10 md:py-20 text-center">
        <p className="font-display text-3xl md:text-5xl leading-[1.15] tracking-tight text-balance reveal">
          {s.quietH2a}<br/>
          <span className="text-muted-foreground">{s.quietH2b}</span>
        </p>
        <p className="mt-8 max-w-xl mx-auto text-muted-foreground reveal">
          {s.quietDesc}
        </p>
      </section>



 {/* STARTER KIT — THE HERO PRODUCT */}
<section id="starter" className="px-6 md:px-10 max-w-7xl mx-auto pb-10 md:pb-20">
  <button
    type="button"
    onClick={() => setStarterKitOpen(true)}
    className="group reveal block w-full text-left relative overflow-hidden rounded-md bg-[#f3ede2]"
  >
    <div className="grid md:grid-cols-12 gap-0 items-stretch">
      <div className="md:col-span-7 relative aspect-[3/2] md:aspect-auto md:min-h-[640px] overflow-hidden">
        <img
  // Hier nutzen wir die Variable 'variants' aus deinem ShopPage-Code
          src={variants.length > 0 ? variants[heroIndex].image : shopStarterKit}
          alt="The VYTAL Starter Kit"
          loading="lazy"
          width={1600}
          height={1920}
          // Hier haben wir 'transition-opacity' hinzugefügt für den weichen Wechsel
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out group-hover:scale-[1.03]"
        />
        <span className="absolute top-5 left-5 font-mono text-[10px] uppercase tracking-[0.3em] bg-background/85 backdrop-blur px-3 py-1.5 rounded-full">
          {s.starterBadge1}
        </span>

        <span className="hidden md:inline absolute bottom-5 left-5 font-mono text-[10px] uppercase tracking-[0.3em] bg-foreground/85 text-background backdrop-blur px-3 py-1.5 rounded-full">
          {s.starterBadge2}
        </span>
      </div>

      <div className="md:col-span-5 p-8 md:p-14 flex flex-col justify-between gap-10">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-primary">
            {s.starterKicker}
          </span>

          <h2 className="mt-5 font-display text-4xl md:text-6xl font-extrabold leading-[0.95] tracking-tight">
            {s.starterH2a}<br />
            <em className="not-italic italic font-light text-muted-foreground">
              {s.starterH2b}
            </em>
          </h2>

          <p className="mt-6 text-muted-foreground leading-relaxed max-w-sm">
            {s.starterDesc}
          </p>

          <ul className="mt-8 space-y-2 text-sm">
            {s.starterItems.map((i) => (
              <li
                key={i}
                className="flex gap-3 text-muted-foreground border-b border-border/60 pb-2"
              >
                <span className="text-primary mt-1">—</span>
                {i}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-baseline gap-2">
            <span className="font-display text-2xl md:text-3xl font-bold">€40</span>
            <span className="font-mono text-[10px] uppercase text-muted-foreground tracking-[0.2em]">
              {s.isDE ? "inkl. Pfand" : "incl. deposit"}
            </span>
          </div>
          <button
            onClick={() => setStarterKitOpen(true)}
            className="mt-4 bg-foreground text-background px-8 py-4 rounded-full text-sm font-medium hover:bg-primary transition-colors"
          >
            {s.starterCta}
          </button>
        </div>
      </div>
    </div>
  </button>
</section>

      {/* RELOADS / REFILLS — cinematic cards */}
<section id="refills" className="px-6 md:px-10 max-w-7xl mx-auto pt-10 md:pt-20 pb-20">
  <div className="max-w-3xl mb-14 reveal">
    <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-primary">
      {s.refillsKicker}
    </span>

    <h2 className="mt-5 font-display text-4xl md:text-6xl font-extrabold leading-[0.98] tracking-tight">
      {s.refillsH2a}<br />
      <span className="italic font-light text-muted-foreground">
        {s.refillsH2b}
      </span>
    </h2>

    <p className="mt-6 text-muted-foreground leading-relaxed max-w-xl">
      {s.refillsDesc}
    </p>
  </div>

  <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-8 md:gap-x-6 md:gap-y-14">
    {refills.map((p, i) => (
      <RefillCard
        key={p.slug}
        p={p}
        i={i}
        onOpen={() => setSelectedProduct(p)}
      />
    ))}
  </div>
</section>
      
      {/* ACCESSORIES — bottles */}
      <section id="accessories" className="px-6 md:px-10 max-w-7xl mx-auto pb-24 md:pb-32">
        <div className="flex items-end justify-between gap-6 mb-10 reveal">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-primary">{s.accessoriesKicker}</span>
            <h3 className="mt-3 font-display text-3xl md:text-5xl font-extrabold tracking-tight">
              {s.accessoriesH3}
            </h3>
          </div>
          <p className="hidden md:block max-w-xs text-sm text-muted-foreground">
            {s.accessoriesDesc}
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-6 md:gap-x-6 md:gap-y-12 items-start">
          {bottles.map((b) => (
            <button id={b.slug === "unity-bottle" ? "unity" : undefined} key={b.slug} onClick={() => setSelectedProduct(b)} className="group reveal block text-left">
              <div className="aspect-[4/5] relative overflow-hidden rounded-md bg-secondary/40">
                <img src={b.image} alt={b.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]" />
                <div className="absolute top-3 left-3 md:top-5 md:left-5 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-foreground/80">
                  {s.bottleLabel}{b.color}
                </div>
              </div>
              <div className="mt-3 md:mt-5 flex items-baseline justify-between gap-2">
                <p className="font-display text-base md:text-lg font-semibold">{b.name.replace("VYTAL ", "")}</p>
                <span className="font-mono text-[10px] md:text-xs text-muted-foreground shrink-0">{b.price}</span>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground mt-1.5 leading-relaxed">{s.isDE ? (s.bottleTaglineDe[b.slug] ?? b.tagline) : b.tagline}</p>
            </button>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <ShopReviews />

      {/* FAQ */}
      <ShopFAQ />

      {/* CLOSING */}
      <section className="relative min-h-[70vh] flex items-center justify-center px-6 md:px-10 overflow-hidden bg-secondary/40">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-primary/15 blur-3xl animate-drift" />
          <div className="absolute -bottom-40 -right-20 w-[520px] h-[520px] rounded-full bg-accent/25 blur-3xl animate-drift" style={{ animationDelay: "-8s" }} />
        </div>
        <div className="text-center max-w-3xl reveal py-32">
          <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-primary">{s.closingKicker}</span>
          <h2 className="mt-6 font-display text-5xl md:text-7xl font-extrabold leading-[0.98] tracking-tight text-balance">
            {s.closingH2a}<br/>
            <span className="italic font-light text-muted-foreground">{s.closingH2b}</span>
          </h2>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            <button
                onClick={scrollTo("starter")}
                className="bg-foreground text-background px-8 py-4 rounded-full text-sm font-medium hover:bg-primary transition-colors"
              >
                {s.closingCta1}
            </button>
            <button onClick={scrollTo("refills")} className="border border-foreground/15 px-8 py-4 rounded-full text-sm font-medium hover:bg-background transition-colors">
              {s.closingCta2}
            </button>
          </div>
        </div>
      </section>
  {selectedProduct && (
  <ProductQuickView
    product={selectedProduct}
    onClose={() => setSelectedProduct(null)}
  />
)}

{starterKitOpen && (
  <StarterKitQuickView
    onClose={() => setStarterKitOpen(false)}
  />
)}
<DiscountBanner />
<SiteFooter />
    </main>
  );
}
// ── Shop reviews ─────────────────────────────────────────────────────
function ShopReviews() {
  const s = useShopTx();
  const { tx } = useLanguage();
  const productLabels = ["Focus", "Flow", "Refresh", "Boost", "Balance", "Recharge"];
  const items = tx.home.reviews.slice(0, 6).map((r, i) => ({ ...r, product: productLabels[i] }));
  return (
    <section className="bg-foreground text-background py-24 md:py-32 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="reveal flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-background/50 block mb-4">
              {s.reviewsKicker}
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold leading-[1.02] text-balance">
              {s.reviewsH2}
            </h2>
          </div>
          <p className="text-background/55 text-sm max-w-xs leading-relaxed">
            {s.reviewsDesc}
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {items.map((t, i) => (
            <figure
              key={t.name}
              className="reveal rounded-2xl md:rounded-3xl border border-background/10 bg-background/5 p-4 md:p-8 flex flex-col gap-3 md:gap-4"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="text-amber-400 text-xs tracking-wider">★★★★★</div>
              <blockquote className="font-display text-sm md:text-xl leading-[1.3] text-balance">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-auto border-t border-background/10 pt-3 md:pt-5">
                <p className="text-xs md:text-sm font-semibold text-background">{t.name}</p>
                <p className="font-mono text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-background/50 mt-1">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Shop FAQ ──────────────────────────────────────────────────────────
function ShopFAQ() {
  const s = useShopTx();
  return (
    <section className="px-6 md:px-10 max-w-4xl mx-auto py-24 md:py-36">
      <div className="reveal mb-12">
        <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-primary">{s.faqKicker}</span>
        <h2 className="mt-5 font-display text-4xl md:text-5xl font-extrabold leading-[0.98] tracking-tight">
          {s.faqH2}
        </h2>
      </div>
      <Accordion type="single" collapsible className="reveal space-y-2">
        {s.faqItems.map((item, i) => (
          <AccordionItem
            key={i}
            value={`item-${i}`}
            className="border border-border rounded-2xl px-6 data-[state=open]:bg-secondary/40 transition-colors duration-300 [&:not(:last-child)]:mb-2 border-b-0 last:border-b-0"
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

// ── Refill card ──────────────────────────────────────────────────────
function RefillCard({ p, i, onOpen }: { p: Product; i: number; onOpen: () => void }) {
  const s = useShopTx();
  const id = flavorIdentity[p.slug];
  const strategy = flavorStrategy[p.slug];
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const handle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    add({
      id: `refill-${p.slug}`,
      name: `${p.name} Refill Cylinder`,
      variant: `${id?.mood ?? p.flavor} · 8 tablets · €4 deposit included`,
      image: p.image,
      unitPrice: parsePrice(p.price) + 4,
      href: `/shop/${p.slug}`,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <div
      id={`product-${p.slug}`}
      onClick={onOpen}
      role="button"
      tabIndex={0}
      className="text-left group reveal flex flex-col cursor-pointer"
    >
      <div className="aspect-[4/5] relative overflow-hidden rounded-md bg-secondary/40">
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          width={768}
          height={960}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.05]"
        />
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-60 transition-opacity duration-[1200ms] mix-blend-multiply"
          style={{ background: `linear-gradient(180deg, transparent 40%, ${id?.hex ?? "#A8C49D"} 130%)` }}
        />
        <span className="absolute top-4 left-4 inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.25em] bg-background/85 backdrop-blur px-2.5 py-1.5 rounded-full">
          <span className="size-1.5 rounded-full" style={{ background: id?.hex ?? "var(--primary)" }} />
          {s.inRefillLoop}
        </span>
        <span className="absolute top-4 right-4 font-mono text-[9px] uppercase tracking-[0.25em] bg-foreground/85 text-background backdrop-blur px-2.5 py-1.5 rounded-full">
          {String(i + 1).padStart(2, "0")}
        </span>
        <button
          onClick={handle}
          className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 bg-foreground text-background backdrop-blur px-4 py-2.5 rounded-full text-xs font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 hover:bg-primary"
          aria-label={`Add ${p.name} refill cylinder to cart`}
        >
          {added ? s.added : s.quickAdd}
        </button>
      </div>
      <div className="mt-3 md:mt-5 flex items-baseline justify-between gap-2">
        <div>
          <p className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-primary/70">
            {s.isDE ? (flavorAudienceDe[p.slug] ?? strategy?.audience) : strategy?.audience}
          </p>
          <p className="font-display text-base md:text-xl font-semibold tracking-tight mt-0.5">{p.name.replace("VYTAL ", "")}</p>
        </div>
        <span className="font-mono text-[10px] md:text-xs text-muted-foreground shrink-0">{formatPrice(parsePrice(p.price) + 4)}</span>
      </div>
      <p className="text-[11px] md:text-[13px] font-mono text-primary/80 mt-1">{id?.mood ?? p.flavor}</p>
      <p className="hidden md:block text-sm text-muted-foreground mt-2 leading-relaxed max-w-sm">
        {s.isDE ? (flavorSensoryDe[p.slug] ?? strategy?.sensory) : strategy?.sensory}
      </p>
      <p className="hidden md:block mt-2 text-[11px] text-muted-foreground/65 italic leading-relaxed max-w-sm">
        {s.isDE ? (flavorMomentDe[p.slug] ?? strategy?.moment) : strategy?.moment}
      </p>
    </div>
  );
}

function ProductQuickView({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const s = useShopTx();
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const unitPrice =
    product.category === "refill" ? parsePrice(product.price) + 4 : parsePrice(product.price);
  const basePrice = parsePrice(product.price);
  const deposit = product.category === "refill" ? 4 : 0;  
  const [added, setAdded] = useState(false);
  const [activeVariant, setActiveVariant] = useState(
    product.variants && product.variants.length > 0 ? product.variants[0] : null
  );

  const currentImage = activeVariant ? activeVariant.image : product.image;
  const currentSlug = activeVariant ? activeVariant.slug : product.slug;
  const currentColorName = activeVariant ? activeVariant.colorName : (product.flavor ?? product.color);
      useEffect(() => {
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = "";
      };
    }, []);
    useEffect(() => {
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  };

  window.addEventListener("keydown", onKey);

  return () => window.removeEventListener("keydown", onKey);
}, [onClose]);

  const handleAdd = () => {
  add({
    id: currentSlug,
    name: product.name,
    variant: currentColorName,
    image: currentImage,
    unitPrice,
    qty,
    href: `/shop/${currentSlug}`,
  });

  setAdded(true);

  setTimeout(() => {
    setAdded(false);
    onClose();
  }, 900);
};

  return (
  <div
    onClick={onClose}
    className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center p-6"
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-background rounded-3xl shadow-2xl animate-in fade-in zoom-in-95 duration-300"
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-10 size-10 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-secondary transition-colors"
      >
        ✕
      </button>

        <div className="grid md:grid-cols-2">
          <div className="relative aspect-[4/5] bg-secondary/40">
            <img
              src={currentImage}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
            />
          </div>

          <div className="p-8 md:p-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
              {s.isDE ? (s.productFunctionDe[product.slug] ?? product.function) : product.function}
            </p>

            <h2 className="mt-4 font-display text-4xl font-extrabold leading-[0.95]">
              {product.name}
            </h2>

            <p className="mt-5 text-muted-foreground leading-relaxed">
              {s.isDE ? (s.productDescDe[product.slug] ?? product.description) : product.description}
            </p>

            {product.variants && product.variants.length > 0 && (
              <div className="mt-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary mb-3">
                  Color · <span className="text-foreground">{currentColorName}</span>
                </p>
                <div className="flex gap-3">
                  {product.variants.map((v) => (
                    <button
                      key={v.slug}
                      onClick={() => setActiveVariant(v)}
                      className={`size-8 rounded-full border-2 transition-all ${
                        activeVariant?.slug === v.slug 
                          ? "border-foreground scale-110" 
                          : "border-transparent hover:scale-105 shadow-sm"
                      }`}
                      style={{ backgroundColor: v.hex }}
                      aria-label={`Select ${v.colorName}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {product.flavor && (
              <div className="mt-6 rounded-2xl border border-border p-5 bg-secondary/30">
                <p className="font-mono text-[10px] uppercase tracking-widest text-primary">
                  {s.qvFlavor}
                </p>
                <p className="mt-1 font-semibold">{product.flavor}</p>
                <p className="text-sm text-muted-foreground">
                  {s.isDE ? (s.productFlavorNoteDe[product.slug] ?? product.flavorNote) : product.flavorNote}
                </p>
              </div>
            )}

            <div className="mt-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary mb-3">
                {s.qvIngredients}
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {product.ingredients?.map((i) => (
                  <li key={i.name} className="flex justify-between gap-4 border-b border-border pb-2">
                    <span>{i.name}</span>
                    {i.why && <span className="text-right">{s.isDE ? (s.ingredientWhyDe[i.why] ?? i.why) : i.why}</span>}
                  </li>
                ))}
              </ul>
            </div>

            {product.nutrition?.length > 0 && (
              <div className="mt-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary mb-3">
                  {s.qvNutrition}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {product.nutrition.map((n) => (
                    <div key={n.label} className="border border-border rounded-xl p-3">
                      <p className="font-mono text-[10px] uppercase text-muted-foreground">
                        {s.isDE ? (s.nutritionLabelsDe[n.label] ?? n.label) : n.label}
                      </p>
                      <p className="font-display text-lg">{n.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {product.category === "refill" && (
              <div className="mt-8 rounded-2xl bg-secondary/40 p-5 text-xs text-muted-foreground leading-relaxed">
                <p>{s.qvSupplement}</p>
                <p className="mt-2">{s.qvCaffeine}</p>
              </div>
            )}

            {product.category === "bottle" && (() => {
              const de = s.isDE ? s.bottleDetailsDe[product.slug] : null;
              const bottleTexts: Record<string, { intro: string; bullets: string[] }> = {
                "office-bottle": { intro: "Brushed stainless steel bottle designed for desk work, commuting and longer office sessions.", bullets: ["Stainless steel exterior with professional office look.", "Designed for daily hydration and VYTAL refill rituals.", "Suitable for cold still water and VYTAL tablets.", "Hand-wash recommended to protect lid and finish.", "Do not use if dented, leaking or visibly damaged."] },
                "go-bottle": { intro: "Lightweight everyday bottle designed for movement, campus days and routines outside the home.", bullets: ["Soft everyday carry feel.", "Designed for cold still water and VYTAL tablets.", "Easy to carry in bags and daily setups.", "Hand-wash recommended.", "Do not use if cracked, leaking or visibly damaged."] },
                "flow-bottle": { intro: "Minimal hydration bottle designed for calmer daily routines and slow refill rituals.", bullets: ["Clean minimal design for everyday hydration.", "Suitable for cold still water and VYTAL tablets.", "Designed for repeated daily use.", "Hand-wash recommended to protect the finish.", "Do not use with boiling liquids."] },
                "home-container": { intro: "Home storage vessel designed for keeping refill routines visible, organized and easy to share.", bullets: ["Intended for home storage and shared routines.", "Store in a dry, cool place away from direct sunlight.", "Keep closed when not in use.", "Clean before first use.", "Do not use if cracked or visibly damaged."] },
                "unity-bottle": { intro: "Limited visual edition with translucent collector character, designed as a seasonal extension of the refill ritual.", bullets: ["Limited-edition visual finish.", "Designed for cold still water and VYTAL tablets.", "Refills are sold separately unless included in a bundle.", "Hand-wash recommended to protect the surface finish.", "Do not use if cracked, leaking or visibly damaged."] },
              };
              const content = de ?? bottleTexts[product.slug];
              return content ? (
                <div className="mt-8 rounded-2xl bg-secondary/40 p-5 text-xs text-muted-foreground leading-relaxed">
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary mb-3">
                    {s.qvBottleDetails}
                  </p>
                  <p>{content.intro}</p>
                  <ul className="mt-4 space-y-2">
                    {content.bullets.map((b, i) => <li key={i}>• {b}</li>)}
                  </ul>
                  <p className="mt-4">{s.productMustBeUsed}</p>
                </div>
              ) : null;
            })()}

            <div className="mt-8 flex items-center gap-4">
              <div className="inline-flex items-center border border-border rounded-full">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className={`flex-1 bg-foreground text-background px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:bg-primary ${
                      added ? "scale-[1.03] animate-pulse" : ""
                  }`}
                >
                  −
                </button>
                <span className="w-10 text-center font-mono">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className={`flex-1 bg-foreground text-background px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:bg-primary ${
                      added ? "scale-[1.03] animate-pulse" : ""
                  }`}
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAdd}
                className={`flex-1 bg-foreground text-background px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:bg-primary ${
                    added ? "scale-[1.03] animate-pulse" : ""
                }`} 
              >
                {added ? s.qvAdded : s.qvAddToCart(formatPrice(qty * unitPrice))}
              </button>
              {product.category === "refill" && (
                <p className="mt-3 text-[11px] text-muted-foreground">
                  {s.qvDepositBreakdown(formatPrice(basePrice), formatPrice(deposit))}
                </p>
              )}
            </div>

            <Link
              to="/shop/$slug"
              params={{ slug: currentSlug }}
              className="mt-5 inline-flex font-mono text-[10px] uppercase tracking-[0.25em] text-primary hover:text-foreground"
            >
              {s.qvFullPage}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}