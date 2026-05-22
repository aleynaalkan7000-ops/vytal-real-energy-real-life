import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { products } from "@/lib/vytal-products";
import { useCart, formatPrice, parsePrice } from "@/contexts/cart-context";
import configuratorImg from "@/assets/shop-configurator.jpg";

export const Route = createFileRoute("/shop/starter-kit")({
  head: () => ({
    meta: [
      { title: "Build your starter ritual — VYTAL" },
      { name: "description", content: "Compose your personal VYTAL starter kit: bottle, color, three flavors and a lifestyle goal. Live preview, premium ritual." },
      { property: "og:title", content: "Build your starter ritual — VYTAL" },
      { property: "og:description", content: "A calm configurator for your personal VYTAL ritual." },
      { property: "og:image", content: configuratorImg },
    ],
  }),
  component: StarterKitPage,
});

type Goal = "focus" | "balance" | "energy" | "calm";

const bottles = products.filter((p) => p.category === "bottle").slice(0, 3);
const refills = products.filter((p) => p.category === "refill");

const bottleColors: Record<string, { id: string; label: string; tint: string; swatch: string }[]> = {
  default: [
    { id: "sage", label: "Sage", tint: "from-primary/20 via-secondary to-background", swatch: "bg-primary/70" },
    { id: "sand", label: "Sand", tint: "from-clay/30 via-secondary to-background", swatch: "bg-clay" },
    { id: "charcoal", label: "Charcoal", tint: "from-foreground/20 via-secondary to-background", swatch: "bg-foreground" },
    { id: "glass", label: "Bare glass", tint: "from-accent/15 via-secondary to-background", swatch: "bg-accent" },
  ],
};

const goals: { id: Goal; label: string; note: string }[] = [
  { id: "focus", label: "Deep focus", note: "Long study, deep work" },
  { id: "balance", label: "Calm balance", note: "Slow mornings, soft days" },
  { id: "energy", label: "Steady energy", note: "Full day, no crash" },
  { id: "calm", label: "Evening calm", note: "Late sessions, soft wind-down" },
];

function StarterKitPage() {
  const { add } = useCart();
  const [step, setStep] = useState(0);
  const [bottleId, setBottleId] = useState(bottles[0]?.slug ?? "");
  const [colorId, setColorId] = useState("sage");
  const [picks, setPicks] = useState<string[]>([]);
  const [goal, setGoal] = useState<Goal>("focus");

  const selectedBottle = bottles.find((b) => b.slug === bottleId) ?? bottles[0];
  const selectedColor = bottleColors.default.find((c) => c.id === colorId) ?? bottleColors.default[0];
  const selectedRefills = refills.filter((r) => picks.includes(r.slug));

  const togglePick = (slug: string) => {
    setPicks((prev) => {
      if (prev.includes(slug)) return prev.filter((s) => s !== slug);
      if (prev.length >= 3) return [...prev.slice(1), slug];
      return [...prev, slug];
    });
  };

  const price = useMemo(() => {
    const b = selectedBottle ? parsePrice(selectedBottle.price) : 0;
    const r = selectedRefills.reduce((s, x) => s + parsePrice(x.price), 0);
    return b + r * 2; // bottle + each refill x2
  }, [selectedBottle, selectedRefills]);

  const ready = !!selectedBottle && picks.length === 3;

  const handleAdd = () => {
    if (!ready || !selectedBottle) return;
    add({
      id: `kit-${selectedBottle.slug}-${colorId}-${picks.join("-")}-${goal}`,
      name: "VYTAL Starter Ritual",
      variant: `${selectedBottle.name.replace("VYTAL ", "")} · ${selectedColor.label} · ${goal}`,
      image: selectedBottle.image,
      unitPrice: price,
      qty: 1,
    });
  };

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SiteHeader />

      <section className="pt-28 pb-12 md:pt-32 md:pb-16 px-6 md:px-10 max-w-7xl mx-auto">
        <Link to="/shop" className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground">
          ← Shop
        </Link>
        <div className="mt-6 flex items-end justify-between gap-6 flex-wrap">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-primary">
              Configurator · Volume 04
            </p>
            <h1 className="mt-3 font-display text-5xl md:text-7xl font-extrabold leading-[0.95] tracking-tight text-balance">
              Build your <em className="not-italic text-primary">ritual</em>.
            </h1>
          </div>
          <p className="max-w-sm text-muted-foreground">
            Compose a calm starter kit in four quiet steps. Live preview · no commitment until you're ready.
          </p>
        </div>
      </section>

      <section className="px-6 md:px-10 max-w-7xl mx-auto pb-32 grid lg:grid-cols-12 gap-12 lg:gap-16">
        {/* LIVE PREVIEW */}
        <div className="lg:col-span-6 lg:sticky lg:top-28 self-start">
          <div
            className={`relative aspect-[4/5] overflow-hidden rounded-md transition-all duration-[1500ms] ease-[cubic-bezier(0.32,0.72,0,1)] bg-gradient-to-br ${selectedColor.tint}`}
          >
            <div className="absolute inset-0 -z-10">
              <div className="absolute -top-20 -left-20 size-72 rounded-full bg-primary/15 blur-3xl animate-drift" />
              <div className="absolute -bottom-20 -right-10 size-80 rounded-full bg-accent/20 blur-3xl animate-drift" style={{ animationDelay: "-7s" }} />
            </div>
            {selectedBottle && (
              <img
                key={selectedBottle.slug + colorId}
                src={selectedBottle.image}
                alt={selectedBottle.name}
                className="absolute inset-0 h-full w-full object-cover mix-blend-multiply opacity-95 transition-all duration-[1200ms] ease-[cubic-bezier(0.32,0.72,0,1)]"
                style={{ animation: "vytal-reveal-up 1.1s var(--ease-soft) both" }}
              />
            )}

            {/* Floating refill tablets */}
            <div className="absolute inset-0">
              {selectedRefills.map((r, i) => (
                <span
                  key={r.slug}
                  className={`absolute size-14 rounded-2xl shadow-xl backdrop-blur ${r.swatch}`}
                  style={{
                    top: `${20 + i * 22}%`,
                    [i % 2 === 0 ? "left" : "right"]: `${8 + i * 4}%`,
                    animation: `vytal-float ${8 + i}s ease-in-out infinite`,
                    animationDelay: `${i * 0.6}s`,
                  }}
                  aria-hidden
                />
              ))}
            </div>

            <div className="absolute top-6 left-6 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/70">
              Live ritual preview
            </div>
            <div className="absolute bottom-6 left-6 right-6">
              <p className="font-display text-2xl">{selectedBottle?.name.replace("VYTAL ", "") ?? "—"}</p>
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-foreground/70 mt-1">
                {selectedColor.label} · {picks.length}/3 refills · {goal}
              </p>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Your ritual
              </p>
              <p className="mt-1 font-display text-3xl">{formatPrice(price)}</p>
            </div>
            <button
              disabled={!ready}
              onClick={handleAdd}
              className="bg-foreground text-background rounded-full px-7 py-4 text-sm font-medium hover:bg-primary transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {ready ? "Add ritual to cart →" : `Pick ${3 - picks.length} more`}
            </button>
          </div>
        </div>

        {/* STEPS */}
        <div className="lg:col-span-6 space-y-12">
          <ConfigBlock
            index={1}
            title="Choose your bottle"
            active={step >= 0}
            onFocus={() => setStep(0)}
          >
            <div className="grid sm:grid-cols-3 gap-3">
              {bottles.map((b) => (
                <button
                  key={b.slug}
                  onClick={() => setBottleId(b.slug)}
                  className={`text-left p-4 rounded-2xl border transition-all ${
                    bottleId === b.slug
                      ? "border-foreground bg-secondary"
                      : "border-border hover:bg-secondary/50"
                  }`}
                >
                  <div className="aspect-square overflow-hidden rounded-md bg-secondary/40 mb-3">
                    <img src={b.image} alt={b.name} className="h-full w-full object-cover" />
                  </div>
                  <p className="font-display text-sm font-semibold">{b.name.replace("VYTAL ", "")}</p>
                  <p className="font-mono text-[10px] text-muted-foreground mt-1">{b.price}</p>
                </button>
              ))}
            </div>
          </ConfigBlock>

          <ConfigBlock
            index={2}
            title="Pick a colour"
            active={!!bottleId}
            onFocus={() => setStep(1)}
          >
            <div className="flex flex-wrap gap-3">
              {bottleColors.default.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setColorId(c.id)}
                  className={`group flex items-center gap-3 pl-2 pr-5 py-2 rounded-full border transition-all ${
                    colorId === c.id
                      ? "border-foreground bg-secondary"
                      : "border-border hover:bg-secondary/50"
                  }`}
                >
                  <span className={`size-8 rounded-full ${c.swatch} ring-2 ring-background shadow-inner`} />
                  <span className="text-sm font-medium">{c.label}</span>
                </button>
              ))}
            </div>
          </ConfigBlock>

          <ConfigBlock
            index={3}
            title="Choose three flavours"
            sub={`${picks.length}/3 selected`}
            active={picks.length > 0 || step >= 2}
            onFocus={() => setStep(2)}
          >
            <div className="grid sm:grid-cols-2 gap-3">
              {refills.map((r) => {
                const on = picks.includes(r.slug);
                return (
                  <button
                    key={r.slug}
                    onClick={() => togglePick(r.slug)}
                    className={`text-left flex gap-4 p-3 rounded-2xl border transition-all ${
                      on
                        ? "border-foreground bg-secondary"
                        : "border-border hover:bg-secondary/50"
                    }`}
                  >
                    <span className={`size-14 rounded-xl shrink-0 ${r.swatch}`} />
                    <div className="min-w-0">
                      <p className="font-display text-sm font-semibold">{r.name.replace("VYTAL ", "")}</p>
                      <p className="font-mono text-[10px] text-muted-foreground mt-0.5 truncate">
                        {r.flavor}
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-1.5 line-clamp-2">{r.tagline}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </ConfigBlock>

          <ConfigBlock
            index={4}
            title="Your everyday goal"
            active={picks.length === 3 || step >= 3}
            onFocus={() => setStep(3)}
          >
            <div className="grid sm:grid-cols-2 gap-3">
              {goals.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setGoal(g.id)}
                  className={`text-left p-4 rounded-2xl border transition-all ${
                    goal === g.id
                      ? "border-foreground bg-secondary"
                      : "border-border hover:bg-secondary/50"
                  }`}
                >
                  <p className="font-display font-semibold">{g.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">{g.note}</p>
                </button>
              ))}
            </div>
          </ConfigBlock>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function ConfigBlock({
  index,
  title,
  sub,
  active,
  onFocus,
  children,
}: {
  index: number;
  title: string;
  sub?: string;
  active: boolean;
  onFocus: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      onMouseEnter={onFocus}
      className={`transition-opacity duration-700 ${active ? "opacity-100" : "opacity-60"}`}
    >
      <div className="flex items-baseline gap-4 mb-5">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
          0{index}
        </span>
        <h2 className="font-display text-2xl font-semibold tracking-tight">{title}</h2>
        {sub && (
          <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            {sub}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}