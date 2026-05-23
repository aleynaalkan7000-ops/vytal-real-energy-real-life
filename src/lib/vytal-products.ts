export type Product = {
  slug: string;
  name: string;
  category: "refill" | "bottle" | "bundle";
  function: string;
  flavor?: string;
  flavorNote?: string;
  tagline: string;
  description: string;
  ingredients: { name: string; why?: string }[];
  benefits: string[];
  nutrition: { label: string; value: string }[];
  usage: string[];
  sustainability: string;
  material?: string;
  refillCompat: string;
  crashExplainer: string;
  situations: string[];
  price: string;
  bundle?: string;
  swatch: string;
  color: string;
  image: string;
  reviews: { quote: string; name: string; role: string }[];
};

import productFocus from "@/assets/product-focus.jpg";
import productFlow from "@/assets/product-flow.jpg";
import productRefresh from "@/assets/product-refresh.jpg";
import productBoost from "@/assets/product-boost.jpg";
import productBalance from "@/assets/product-balance.jpg";
import productRecharge from "@/assets/product-recharge.jpg";
import bottleGo from "@/assets/bottle-go.png";
import bottleFlow from "@/assets/bottle-flow.png";
import bottleOffice from "@/assets/bottle-office.png";
import bottleHome from "@/assets/bottle-home.png";
import bottleUnity from "@/assets/bottle-unity.png";

const baseNutrition = [
  { label: "Energy", value: "12 kcal / 100ml" },
  { label: "Sugar", value: "0 g" },
  { label: "Caffeine", value: "80 mg" },
  { label: "Sweetener", value: "None" },
];

export const products: Product[] = [
  {
    slug: "focus",
    image: productFocus,
    name: "VYTAL Focus",
    category: "refill",
    function: "Focus, concentration & deep study",
    flavor: "Matcha Lime",
    flavorNote: "Fresh, lightly herbal, modern",
    tagline: "For long days and full to-do lists.",
    description:
      "FOCUS was developed for long days, full to-do lists and intensive study sessions. A combination of natural energy sources and a calmer formulation supports concentration and productivity — without the extreme character of classic energy drinks.",
    ingredients: [
      { name: "Organic Matcha", why: "Even, steady release of natural caffeine." },
      { name: "Guarana", why: "Plant-based caffeine source." },
      { name: "L-Theanine", why: "Calmer, more balanced focus." },
      { name: "Natural caffeine" },
      { name: "B-Vitamins" },
      { name: "Natural lime extract" },
    ],
    benefits: [
      "Steady focus during long sessions",
      "No caffeine spike or crash",
      "Calmer alertness vs. classic energy drinks",
    ],
    nutrition: baseNutrition,
    usage: [
      "Place bottle or container",
      "Choose flavor & intensity",
      "Start refill",
      "Drink directly or take with you",
    ],
    sustainability:
      "The refill system replaces single-use cans and saves packaging material. Reusable bottles enable more everyday-friendly and conscious consumption.",
    refillCompat: "Compatible with all VYTAL bottles and stations.",
    crashExplainer:
      "Slow-release caffeine + L-Theanine produces clear focus without the spike-and-crash cycle of sugar-heavy drinks.",
    situations: ["Library", "Deadlines", "Coding marathons"],
    price: "€2.40 / refill",
    bundle: "5 refills · €11",
    swatch: "bg-primary/70",
    color: "Matcha green",
    reviews: [
      {
        quote: "Finally a focus drink that doesn't make me jittery at 3pm.",
        name: "Marie L.",
        role: "Law student · Munich",
      },
    ],
  },
  {
    slug: "flow",
    image: productFlow,
    name: "VYTAL Flow",
    category: "refill",
    function: "Constant energy for long sessions",
    flavor: "Peach Green Tea",
    flavorNote: "Soft, lightly sweet, calm-modern",
    tagline: "Steady energy from morning to evening.",
    description:
      "FLOW was developed for long working, learning and everyday sessions. The formulation supports steady energy and a focused day — without unnecessary overload or strong performance drop.",
    ingredients: [
      { name: "Green tea extract" },
      { name: "Guarana" },
      { name: "Ginseng" },
      { name: "Natural peach extract" },
      { name: "Electrolytes" },
      { name: "B-Vitamins" },
    ],
    benefits: ["Even energy through the day", "Light hydration support", "No mid-afternoon dip"],
    nutrition: baseNutrition,
    usage: ["Place bottle", "Pick intensity", "Start refill", "Use anywhere"],
    sustainability:
      "Compact refill solutions reduce unnecessary packaging volume and enable flexible consumption without classic single-use cans.",
    refillCompat: "Ideal with the FLOW BOTTLE (750ml).",
    crashExplainer:
      "Green tea + electrolytes deliver a smoother caffeine curve and prevent the energy dip linked to dehydration.",
    situations: ["Office days", "Long study sessions", "Travel"],
    price: "€2.40 / refill",
    bundle: "5 refills · €11",
    swatch: "bg-clay",
    color: "Peach sand",
    reviews: [
      { quote: "It's the most boring compliment but: it just works, all day.", name: "Jonas K.", role: "Engineer · Berlin" },
    ],
  },
  {
    slug: "refresh",
    image: productRefresh,
    name: "VYTAL Refresh",
    category: "refill",
    function: "Mental freshness & light activation",
    flavor: "Berry Mint",
    flavorNote: "Fresh, cool, lightly fruity",
    tagline: "Reset between meetings, screens and moments.",
    description:
      "REFRESH was developed for moments when new energy and mental freshness are needed. Ideal on the go, between appointments or after long hours in front of the screen.",
    ingredients: [
      { name: "Mint extract" },
      { name: "Acerola" },
      { name: "Berry extracts" },
      { name: "Organic Guarana" },
      { name: "Vitamin C" },
      { name: "Natural caffeine" },
    ],
    benefits: ["Cool, refreshing pickup", "Light, non-overwhelming caffeine", "Hydration-friendly"],
    nutrition: baseNutrition,
    usage: ["Pick refill", "Fill bottle", "Optional still or sparkling", "Take with you"],
    sustainability:
      "The refill system enables spontaneous on-the-go consumption — without additional single-use cans or unnecessary packaging waste.",
    refillCompat: "Try with sparkling water at any VYTAL station.",
    crashExplainer:
      "A lighter caffeine dose paired with hydrating electrolytes — wakes you up without spiking adrenaline.",
    situations: ["Between meetings", "Post-screen reset", "Commute"],
    price: "€2.40 / refill",
    bundle: "5 refills · €11",
    swatch: "bg-accent",
    color: "Berry mint",
    reviews: [
      { quote: "My 4pm reset. Cold sparkling, gone in two minutes.", name: "Anna T.", role: "Designer · Hamburg" },
    ],
  },
  {
    slug: "boost",
    image: productBoost,
    name: "VYTAL Boost",
    category: "refill",
    function: "Stronger activation & mental alertness",
    flavor: "Citrus Ginger",
    flavorNote: "Intense, lightly spicy, energetic",
    tagline: "For the days that ask more of you.",
    description:
      "BOOST was developed for stressful days, high mental load and moments with little sleep. The stronger formulation delivers intense but consciously functional energy — without feeling artificial.",
    ingredients: [
      { name: "Ginger extract" },
      { name: "Organic Guarana" },
      { name: "Ginseng" },
      { name: "Natural citrus extracts" },
      { name: "Vitamin B12" },
      { name: "Natural caffeine" },
    ],
    benefits: ["Stronger activation for demanding days", "Functional, not jittery", "Clean ingredients"],
    nutrition: [...baseNutrition.slice(0, 2), { label: "Caffeine", value: "120 mg" }, baseNutrition[3]],
    usage: ["Insert container", "Pick intensity", "Start refill", "Use immediately or take away"],
    sustainability:
      "Reusable bottles and compact refill capsules reduce packaging waste and transport volume compared to classic energy drinks.",
    refillCompat: "Best paired with the GO BOTTLE.",
    crashExplainer:
      "Ginger + ginseng support alertness while natural caffeine avoids the artificial spike of high-sugar drinks.",
    situations: ["Low sleep", "Sport before work", "Exams"],
    price: "€2.80 / refill",
    bundle: "5 refills · €13",
    swatch: "bg-clay",
    color: "Citrus orange",
    reviews: [
      { quote: "Replaces my pre-workout AND my 3rd coffee. Smarter.", name: "Leon S.", role: "Master's student · Cologne" },
    ],
  },
  {
    slug: "balance",
    image: productBalance,
    name: "VYTAL Balance",
    category: "refill",
    function: "Calmer energy & conscious everyday use",
    flavor: "Pear Sage",
    flavorNote: "Light, natural, grown-up",
    tagline: "Energy that knows when to be quiet.",
    description:
      "BALANCE combines light energy with a calmer consumption feeling — developed for people who want to consume more consciously.",
    ingredients: [
      { name: "Sage" },
      { name: "Pear extracts" },
      { name: "Green tea" },
      { name: "Ashwagandha", why: "Adaptogen for stress balance." },
      { name: "Natural caffeine" },
      { name: "Magnesium" },
    ],
    benefits: ["Soft, balanced activation", "Adaptogen-supported", "Easy on the stomach"],
    nutrition: [...baseNutrition.slice(0, 2), { label: "Caffeine", value: "50 mg" }, baseNutrition[3]],
    usage: ["Choose refill", "Set intensity", "Fill container", "Use flexibly at home or on the go"],
    sustainability:
      "The system relies on long-lasting bottles, reduced packaging and more flexible consumption instead of classic single-use products.",
    refillCompat: "Compatible with all VYTAL bottles.",
    crashExplainer:
      "Lower caffeine + adaptogens give clarity without overstimulation — ideal when you still want to sleep.",
    situations: ["Slow mornings", "Afternoon work", "Yoga + work blend"],
    price: "€2.60 / refill",
    bundle: "5 refills · €12",
    swatch: "bg-primary/40",
    color: "Sage natural",
    reviews: [
      { quote: "First energy drink I drink for the feeling, not the kick.", name: "Sophie B.", role: "Product designer · Berlin" },
    ],
  },
  {
    slug: "recharge",
    image: productRecharge,
    name: "VYTAL Recharge",
    category: "refill",
    function: "Evening productivity & late sessions",
    flavor: "Cherry Black Tea",
    flavorNote: "Deep, calm, lightly herbal-sweet",
    tagline: "Late sessions, without overdoing it.",
    description:
      "RECHARGE was developed for late study or working phases where focus is needed without unnecessarily overloading the body. The formulation feels calmer and more balanced than classic energy drinks.",
    ingredients: [
      { name: "Black tea" },
      { name: "Sour cherry" },
      { name: "L-Theanine" },
      { name: "Guarana" },
      { name: "Magnesium" },
      { name: "Plant extracts" },
    ],
    benefits: ["Late-evening focus without jitter", "Magnesium for muscle ease", "Deeper, calmer flavor"],
    nutrition: baseNutrition,
    usage: ["Choose flavor", "Start refill", "Drink or take away", "Ideal for long evenings"],
    sustainability:
      "Compact refill solutions and reusable containers enable more conscious consumption with less packaging waste.",
    refillCompat: "Best with the OFFICE BOTTLE for late deep work.",
    crashExplainer:
      "Black tea + L-Theanine = focused calm. Magnesium counteracts evening tension instead of adding stress.",
    situations: ["Night study", "Creative evenings", "Writing deep work"],
    price: "€2.60 / refill",
    bundle: "5 refills · €12",
    swatch: "bg-foreground/70",
    color: "Bordeaux night",
    reviews: [
      { quote: "I can finish a 10pm writing block and still fall asleep.", name: "Mira H.", role: "PhD candidate · Vienna" },
    ],
  },
  // Bottles
  {
    slug: "go-bottle",
    image: bottleGo,
    name: "VYTAL GO Bottle",
    category: "bottle",
    function: "Optimised to-go bottle for fast, precise refills",
    tagline: "More than a bottle — part of the system.",
    description:
      "Specially developed for the VYTAL refill system. The standardised shape lets the dispenser recognise size, fill level, mix ratio and desired intensity — automatically.",
    ingredients: [
      { name: "Borosilicate glass body" },
      { name: "Soft-touch silicone sleeve" },
      { name: "NFC / QR tag" },
      { name: "Stainless steel lid" },
    ],
    benefits: [
      "Precise dispensing at the station",
      "Faster refill via automatic recognition",
      "Hygienic standardised opening",
      "Stores your favourite flavors & intensity",
    ],
    nutrition: [],
    usage: ["Place at station", "Tap NFC to load profile", "Refill", "Go"],
    sustainability:
      "Made to last years. Replaces hundreds of single-use cans over its lifetime.",
    material: "Borosilicate glass + recycled silicone sleeve.",
    refillCompat: "Compatible with all VYTAL stations and refills.",
    crashExplainer:
      "Standardised dosing means each refill stays exactly as intended — no over- or under-dosing.",
    situations: ["Commute", "University", "Travel"],
    price: "€28",
    bundle: "Bottle + 5 refills · €38",
    swatch: "bg-foreground",
    color: "Matte charcoal",
    reviews: [
      { quote: "The NFC thing genuinely changes the experience.", name: "Niko P.", role: "Student · Leipzig" },
    ],
  },
  {
    slug: "flow-bottle",
    image: bottleFlow,
    name: "VYTAL FLOW Bottle",
    category: "bottle",
    function: "Longer use & intelligent hydration",
    tagline: "750ml of steady, considered hydration.",
    description:
      "Developed for longer sessions and working directly with the refill system. The dispenser auto-recognises fill level, container size and the ideal intensity for larger volumes.",
    ingredients: [
      { name: "Borosilicate glass body" },
      { name: "Soft-matte sleeve" },
      { name: "Interchangeable bottom cap" },
      { name: "Smart lid compatible" },
    ],
    benefits: ["Optimised recipe for 750ml", "Better thermal performance", "Ergonomic to drink while typing"],
    nutrition: [],
    usage: ["Place at station", "Auto-detected", "Refill", "Use through the day"],
    sustainability: "Modular caps mean broken parts can be replaced instead of the whole bottle.",
    material: "Borosilicate glass + replaceable silicone parts.",
    refillCompat: "Best with FLOW, BALANCE and RECHARGE refills.",
    crashExplainer:
      "Larger volume + balanced recipe = steady hydration alongside the active ingredients.",
    situations: ["Deep work", "Long study", "Coworking"],
    price: "€34",
    bundle: "Bottle + 5 refills · €44",
    swatch: "bg-primary/30",
    color: "Sage soft",
    reviews: [
      { quote: "Looks beautiful on my desk and never leaks.", name: "Ines W.", role: "PM · Munich" },
    ],
  },
  {
    slug: "office-bottle",
    image: bottleOffice,
    name: "VYTAL OFFICE Bottle",
    category: "bottle",
    function: "Premium reusable bottle for professional spaces",
    tagline: "Quiet, professional, leak-proof.",
    description:
      "Combines functionality with high-quality aesthetics — developed specifically for modern work environments. Soft-close lid, anti-fingerprint surface, leak-proof business build.",
    ingredients: [
      { name: "Stainless steel body" },
      { name: "Soft-matte coating" },
      { name: "Soft-close lid" },
      { name: "NFC login" },
    ],
    benefits: ["Silent soft-close lid", "Anti-fingerprint surface", "Personalised refill profiles"],
    nutrition: [],
    usage: ["Tap to log in", "Refill", "Carry through meetings", "Repeat"],
    sustainability: "One bottle replaces ~300 single-use cans per year on average.",
    material: "Recycled stainless steel + low-impact coating.",
    refillCompat: "Compatible with all VYTAL stations.",
    crashExplainer: "Personalised profiles avoid 'just one more coffee' guessing.",
    situations: ["Office", "Meetings", "Coworking"],
    price: "€42",
    bundle: "Bottle + 10 refills · €58",
    swatch: "bg-foreground/80",
    color: "Monochrome steel",
    reviews: [
      { quote: "It feels like Notion + a bottle. Calm, precise.", name: "Tom R.", role: "Consultant · Frankfurt" },
    ],
  },
  {
    slug: "home-container",
    image: bottleHome,
    name: "VYTAL HOME Container",
    category: "bottle",
    function: "Pantry container for home & flexible use",
    tagline: "Refill larger quantities for shared use at home.",
    description:
      "Developed for larger refill quantities. Standardised sizes enable precise stock filling, automatic dosing adjustment and hygienic home use.",
    ingredients: [
      { name: "Glass body" },
      { name: "Soft-matte base" },
      { name: "Modular stackable design" },
    ],
    benefits: ["Pantry-mode at the station", "Stackable in kitchen shelves", "Ideal for home office or shared flats"],
    nutrition: [],
    usage: ["Place at station in pantry mode", "Fill", "Store", "Pour to bottle as needed"],
    sustainability: "Reduces individual refill trips and packaging by ~70%.",
    material: "Borosilicate glass + cork base.",
    refillCompat: "Pantry mode at VYTAL stations.",
    crashExplainer: "Lets you build a calm refill ritual at home — no more late-night corner-shop runs.",
    situations: ["Home office", "Shared flats", "Weekend stock"],
    price: "€36",
    bundle: "Container + 10 refills · €52",
    swatch: "bg-secondary",
    color: "Natural glass",
    reviews: [
      { quote: "We share one in the flat and refill on weekends.", name: "Ben & Lara", role: "WG Berlin" },
    ],
  },
  {
    slug: "unity-bottle",
    image: bottleUnity,
    name: "VYTAL UNITY Bottle",
    category: "bottle",
    function: "Community-driven limited edition",
    tagline: "Limited drops, with sammler character.",
    description:
      "Not just functional — part of the brand and community experience. Limited drops and exclusive designs create emotional value, collectibility and stronger brand connection.",
    ingredients: [
      { name: "Translucent body" },
      { name: "Holographic accents" },
      { name: "Numbered edition" },
    ],
    benefits: ["Seasonal drops", "App badge unlocks", "Compatible with special flavors"],
    nutrition: [],
    usage: ["Limited release", "Numbered", "Same refill flow as GO BOTTLE"],
    sustainability:
      "Same long-life materials as the core line — collected, not discarded.",
    material: "Translucent borosilicate + holographic film.",
    refillCompat: "Same as GO BOTTLE.",
    crashExplainer: "Reduces 'novelty buys' — you reach for the bottle you already love.",
    situations: ["Collectors", "Drops", "Gifts"],
    price: "€48",
    bundle: "Limited edition · numbered",
    swatch: "bg-accent",
    color: "Aurora translucent",
    reviews: [
      { quote: "Mine's #043. Yes, I checked.", name: "Kai L.", role: "Community member" },
    ],
  },
  // Bundles
  {
    slug: "starter-kit",
    image: bottleGo,
    name: "VYTAL Starter Kit",
    category: "bundle",
    function: "Bottle + 6 refills, one of each flavor",
    tagline: "Everything you need to try the full system.",
    description:
      "The easiest way into VYTAL. One GO BOTTLE and a refill of every flavor — find your day, your evening, your weekend.",
    ingredients: [
      { name: "1× VYTAL GO Bottle" },
      { name: "6× Refills (one of each)" },
      { name: "Quick start card" },
    ],
    benefits: ["Best value entry", "Try every formulation", "Find your routine"],
    nutrition: [],
    usage: ["Open kit", "Tap bottle at station", "Pick your favorite flavor", "Repeat"],
    sustainability: "One kit avoids ~30 single-use cans across the trial period.",
    material: "Recyclable mono-material kraft packaging.",
    refillCompat: "All flavors, all stations.",
    crashExplainer: "Designed to help you find the calmest formula for your real day.",
    situations: ["First-time users", "Gifts", "Try-before-subscribe"],
    price: "€42",
    bundle: "Bottle + 6 refills",
    swatch: "bg-primary",
    color: "Sage starter",
    reviews: [
      { quote: "I gifted three of these last month.", name: "Lena F.", role: "VYTAL early user" },
    ],
  },
];

export const categories: { id: Product["category"]; label: string }[] = [
  { id: "refill", label: "Refills" },
  { id: "bottle", label: "Bottles" },
  { id: "bundle", label: "Bundles" },
];