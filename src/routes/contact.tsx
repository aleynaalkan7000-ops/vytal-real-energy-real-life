import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import heroImg from "@/assets/contact-hero.jpg";
import letterImg from "@/assets/contact-letter.jpg";
import studioImg from "@/assets/contact-studio.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — VYTAL · Built for thoughtful conversations" },
      { name: "description", content: "A calm, human way to reach VYTAL. For collaborations, ideas, support, or simply reaching out. We read every message thoughtfully." },
      { property: "og:title", content: "Contact VYTAL — Built for thoughtful conversations" },
      { property: "og:description", content: "Real people. Calm communication. Built for conversations, not tickets." },
      { property: "og:image", content: heroImg },
      { name: "twitter:image", content: heroImg },
    ],
  }),
  component: ContactPage,
});

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
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "A thoughtful conversation", message: "" });
  const heroRef = useRef<HTMLDivElement>(null);
  useReveal();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (heroRef.current) {
        heroRef.current.style.transform = `translate3d(0, ${y * 0.18}px, 0) scale(${1 + y * 0.0002})`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground antialiased">
      <SiteHeader />

      {/* HERO */}
      <section className="relative h-[100svh] w-full overflow-hidden">
        <div ref={heroRef} className="absolute inset-0 will-change-transform">
          <img
            src={heroImg}
            alt="Calm dusk workspace with linen, a ceramic cup and an open notebook"
            className="h-full w-full object-cover"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/10 to-background" />
        </div>

        <div className="relative z-10 h-full max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col justify-end pb-20 md:pb-28">
          <div className="reveal opacity-0 translate-y-6 transition-all duration-[1400ms] ease-out">
            <span className="font-mono text-[11px] tracking-[0.32em] uppercase text-foreground/70">
              Volume 05 — Contact
            </span>
          </div>
          <h1 className="reveal opacity-0 translate-y-8 transition-all duration-[1600ms] delay-150 ease-out mt-6 font-display text-[12vw] md:text-[8.5vw] leading-[0.95] tracking-[-0.03em] font-light">
            Tell us<br />
            <em className="font-serif italic font-extralight">what you&rsquo;re</em> working on.
          </h1>
          <p className="reveal opacity-0 translate-y-4 transition-all duration-[1400ms] delay-300 ease-out mt-8 max-w-xl text-base md:text-lg text-foreground/70 leading-relaxed">
            For collaborations, ideas, support, or simply reaching out. We read every message thoughtfully — there is no queue, no ticket, no script.
          </p>

          <div className="reveal opacity-0 translate-y-4 transition-all duration-[1200ms] delay-500 ease-out mt-10 flex flex-wrap gap-3">
            <a href="#write" className="px-7 py-3.5 rounded-full bg-foreground text-background text-sm tracking-wide hover:opacity-90 transition">
              Contact VYTAL
            </a>
            <a href="/journal" className="px-7 py-3.5 rounded-full border border-foreground/20 text-sm tracking-wide hover:border-foreground/50 transition">
              Explore the Journal
            </a>
            <a href="/shop" className="px-7 py-3.5 rounded-full text-sm tracking-wide text-foreground/70 hover:text-foreground transition">
              Shop VYTAL →
            </a>
          </div>
        </div>

        {/* ambient drift */}
        <div className="pointer-events-none absolute -top-32 -right-32 w-[40rem] h-[40rem] rounded-full bg-primary/10 blur-3xl animate-pulse" style={{ animationDuration: "9s" }} />
      </section>

      {/* PHILOSOPHY */}
      <section className="px-6 md:px-12 py-32 md:py-48 max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-12 gap-12 md:gap-20 items-end">
          <div className="md:col-span-5 reveal opacity-0 translate-y-6 transition-all duration-1000">
            <span className="font-mono text-[11px] tracking-[0.32em] uppercase text-foreground/50">
              Communication, slowly
            </span>
            <h2 className="mt-6 font-display text-4xl md:text-5xl leading-[1.05] tracking-[-0.02em] font-light">
              Built for <em className="font-serif italic">conversations</em>,<br />not tickets.
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7 reveal opacity-0 translate-y-6 transition-all duration-1000 delay-150 space-y-6 text-foreground/70 leading-relaxed text-lg">
            <p>
              We answer messages the same way we make our products — calmly, with intention, and without performing. No autoresponders pretending to care. No urgent banners. No upsell.
            </p>
            <p className="text-foreground/55">
              Most replies arrive within two working days. Some take a little longer, because we&rsquo;d rather write something honest than something fast.
            </p>
          </div>
        </div>
      </section>

      {/* THREE PILLARS */}
      <section className="px-6 md:px-12 pb-32 md:pb-48 max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-3 gap-px bg-foreground/10 rounded-3xl overflow-hidden">
          {[
            { k: "01", t: "Real people", d: "Written by a small team in Munich. No outsourced support, no scripts." },
            { k: "02", t: "Read thoughtfully", d: "Every message is opened by a person before it&rsquo;s answered or routed." },
            { k: "03", t: "Calm by default", d: "We don&rsquo;t chase, we don&rsquo;t nudge. You&rsquo;ll hear from us once, and well." },
          ].map((p, i) => (
            <div key={p.k} className="reveal opacity-0 translate-y-4 transition-all duration-1000 bg-background p-10 md:p-12" style={{ transitionDelay: `${i * 120}ms` }}>
              <span className="font-mono text-[11px] tracking-[0.32em] text-foreground/40">{p.k}</span>
              <h3 className="mt-6 font-display text-2xl md:text-3xl font-light tracking-tight">{p.t}</h3>
              <p className="mt-4 text-foreground/60 leading-relaxed" dangerouslySetInnerHTML={{ __html: p.d }} />
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT FORM — editorial split */}
      <section id="write" className="relative bg-foreground text-background py-32 md:py-48 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "radial-gradient(circle at 30% 20%, hsl(var(--background)) 0, transparent 50%), radial-gradient(circle at 70% 80%, hsl(var(--primary)) 0, transparent 55%)" }} />
        <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 grid md:grid-cols-12 gap-12 md:gap-20">
          <div className="md:col-span-5 reveal opacity-0 translate-y-6 transition-all duration-1000">
            <span className="font-mono text-[11px] tracking-[0.32em] uppercase text-background/50">
              Write to us
            </span>
            <h2 className="mt-6 font-display text-5xl md:text-6xl leading-[0.98] tracking-[-0.02em] font-light">
              Questions,<br />
              <em className="font-serif italic font-extralight">thoughts,</em><br />
              ideas.
            </h2>
            <p className="mt-8 text-background/60 leading-relaxed max-w-md">
              A quiet inbox, watched by real people. For support, collaborations, press, or a thought you wanted to share out loud.
            </p>

            <div className="mt-14 space-y-5 text-sm">
              <a href="mailto:hello@vytal.energy" className="group block">
                <span className="font-mono text-[10px] tracking-[0.32em] uppercase text-background/40">General</span>
                <div className="mt-1 text-lg font-light group-hover:text-primary transition">hello@vytal.energy</div>
              </a>
              <a href="mailto:partners@vytal.energy" className="group block">
                <span className="font-mono text-[10px] tracking-[0.32em] uppercase text-background/40">Collaborations</span>
                <div className="mt-1 text-lg font-light group-hover:text-primary transition">partners@vytal.energy</div>
              </a>
              <a href="mailto:press@vytal.energy" className="group block">
                <span className="font-mono text-[10px] tracking-[0.32em] uppercase text-background/40">Press</span>
                <div className="mt-1 text-lg font-light group-hover:text-primary transition">press@vytal.energy</div>
              </a>
            </div>
          </div>

          <div className="md:col-span-7 reveal opacity-0 translate-y-8 transition-all duration-1200">
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              className="relative rounded-[2rem] border border-background/10 bg-background/[0.04] backdrop-blur-sm p-8 md:p-12 space-y-10"
            >
              <FormRow label="Your name" htmlFor="name">
                <input
                  id="name" required value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="How should we call you?"
                  className="w-full bg-transparent border-b border-background/15 focus:border-background/60 outline-none py-3 text-lg font-light text-background placeholder:text-background/30 transition"
                />
              </FormRow>

              <FormRow label="Email" htmlFor="email">
                <input
                  id="email" type="email" required value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@quiet-inbox.com"
                  className="w-full bg-transparent border-b border-background/15 focus:border-background/60 outline-none py-3 text-lg font-light text-background placeholder:text-background/30 transition"
                />
              </FormRow>

              <FormRow label="The conversation is about" htmlFor="subject">
                <div className="flex flex-wrap gap-2 pt-2">
                  {["A thoughtful conversation", "Support", "Collaboration", "Press", "Hosting a station"].map((s) => (
                    <button
                      key={s} type="button"
                      onClick={() => setForm({ ...form, subject: s })}
                      className={`px-4 py-2 rounded-full border text-xs tracking-wide transition ${
                        form.subject === s
                          ? "border-background bg-background text-foreground"
                          : "border-background/20 text-background/70 hover:border-background/50"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </FormRow>

              <FormRow label="Your message" htmlFor="message">
                <textarea
                  id="message" required rows={5} value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Take your time. We will."
                  className="w-full bg-transparent border-b border-background/15 focus:border-background/60 outline-none py-3 text-lg font-light text-background placeholder:text-background/30 resize-none transition"
                />
              </FormRow>

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pt-4">
                <p className="text-xs text-background/40 leading-relaxed max-w-sm">
                  We&rsquo;ll only use this to reply. No lists, no sequences, no automations.
                </p>
                <button
                  type="submit"
                  disabled={sent}
                  className="group relative px-10 py-4 rounded-full bg-background text-foreground text-sm tracking-wide overflow-hidden transition hover:bg-primary hover:text-primary-foreground disabled:opacity-70"
                >
                  <span className="relative z-10">
                    {sent ? "Thank you — we&rsquo;ll write back soon." : "Send a message"}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* HUMAN ATMOSPHERE */}
      <section className="px-6 md:px-12 py-32 md:py-48 max-w-[1500px] mx-auto">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-center">
          <figure className="md:col-span-7 reveal opacity-0 translate-y-6 transition-all duration-1200">
            <div className="overflow-hidden rounded-[2rem]">
              <img
                src={letterImg}
                alt="Hands holding a handwritten letter near a sunlit window"
                loading="lazy"
                width={1600}
                height={1200}
                className="w-full h-auto object-cover"
              />
            </div>
            <figcaption className="mt-4 font-mono text-[10px] tracking-[0.32em] uppercase text-foreground/40">
              Field note — Munich studio
            </figcaption>
          </figure>

          <div className="md:col-span-5 reveal opacity-0 translate-y-6 transition-all duration-1000 delay-200">
            <span className="font-mono text-[11px] tracking-[0.32em] uppercase text-foreground/50">
              The way we write
            </span>
            <h2 className="mt-6 font-display text-4xl md:text-5xl leading-[1.05] tracking-[-0.02em] font-light">
              We read every message <em className="font-serif italic">thoughtfully.</em>
            </h2>
            <p className="mt-8 text-foreground/65 leading-relaxed">
              Not because it&rsquo;s a brand promise, but because there are only a handful of us, and we still believe in writing back like a person, not a system.
            </p>
            <p className="mt-4 text-foreground/55 leading-relaxed">
              If something matters to you, it usually matters to us too. Tell us where you&rsquo;re writing from, what you&rsquo;re building, what you&rsquo;re thinking about. The longer the message, the better.
            </p>
          </div>
        </div>
      </section>

      {/* QUIET LOGISTICS */}
      <section className="px-6 md:px-12 pb-32 md:pb-48 max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-12 gap-12 md:gap-16">
          <div className="md:col-span-5 reveal opacity-0 translate-y-6 transition-all duration-1000">
            <div className="aspect-[4/5] overflow-hidden rounded-[2rem]">
              <img src={studioImg} alt="Linen curtain diffusing evening light against an olive wall" loading="lazy" width={1080} height={1920} className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="md:col-span-7 reveal opacity-0 translate-y-6 transition-all duration-1000 delay-150 self-center">
            <span className="font-mono text-[11px] tracking-[0.32em] uppercase text-foreground/50">Practical</span>
            <h2 className="mt-6 font-display text-4xl md:text-5xl leading-[1.05] tracking-[-0.02em] font-light">
              Calm logistics.
            </h2>

            <dl className="mt-12 divide-y divide-foreground/10 border-t border-foreground/10">
              {[
                ["Studio", "Münchner Freiheit 3 · 80802 München"],
                ["Hours", "Mon — Fri · 09:00 to 17:00 CET"],
                ["Reply time", "Usually within two working days"],
                ["Press kit", "On request — press@vytal.energy"],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-3 md:grid-cols-4 gap-6 py-6">
                  <dt className="col-span-1 font-mono text-[11px] tracking-[0.32em] uppercase text-foreground/45">{k}</dt>
                  <dd className="col-span-2 md:col-span-3 text-foreground/85 text-base md:text-lg font-light">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="relative overflow-hidden">
        <div className="relative px-6 md:px-12 py-40 md:py-56 max-w-[1400px] mx-auto text-center">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute top-1/3 left-1/4 w-[28rem] h-[28rem] rounded-full bg-primary/15 blur-3xl animate-pulse" style={{ animationDuration: "11s" }} />
            <div className="absolute bottom-0 right-1/4 w-[24rem] h-[24rem] rounded-full bg-accent/20 blur-3xl animate-pulse" style={{ animationDuration: "13s" }} />
          </div>

          <span className="reveal opacity-0 translate-y-4 transition-all duration-1000 font-mono text-[11px] tracking-[0.32em] uppercase text-foreground/50">
            For thoughtful modern living
          </span>
          <h2 className="reveal opacity-0 translate-y-6 transition-all duration-1200 delay-100 mt-8 font-display text-[10vw] md:text-[6.5vw] leading-[0.95] tracking-[-0.03em] font-light">
            Built calmly.<br />
            <em className="font-serif italic font-extralight">On purpose.</em>
          </h2>
          <p className="reveal opacity-0 translate-y-4 transition-all duration-1000 delay-200 mt-10 max-w-xl mx-auto text-foreground/65 leading-relaxed">
            Whenever you&rsquo;re ready — we&rsquo;re here, quietly, in Munich.
          </p>

          <div className="reveal opacity-0 translate-y-4 transition-all duration-1000 delay-300 mt-12 flex flex-wrap justify-center gap-3">
            <a href="#write" className="px-8 py-3.5 rounded-full bg-foreground text-background text-sm tracking-wide hover:opacity-90 transition">
              Send a Message
            </a>
            <a href="/journal" className="px-8 py-3.5 rounded-full border border-foreground/20 text-sm tracking-wide hover:border-foreground/50 transition">
              Explore the Journal
            </a>
            <a href="/shop" className="px-8 py-3.5 rounded-full text-sm tracking-wide text-foreground/70 hover:text-foreground transition">
              Shop VYTAL →
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />

      <style>{`
        .reveal.in-view { opacity: 1 !important; transform: translate3d(0,0,0) !important; }
      `}</style>
    </main>
  );
}

function FormRow({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="font-mono text-[10px] tracking-[0.32em] uppercase text-background/45">
        {label}
      </label>
      <div className="mt-2">{children}</div>
    </div>
  );
}
