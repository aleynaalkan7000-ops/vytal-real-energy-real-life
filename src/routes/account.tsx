import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Account — VYTAL" },
      { name: "description", content: "Your VYTAL account: rituals, orders, refill reminders." },
    ],
  }),
  component: AccountPage,
});

function AccountPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="max-w-3xl mx-auto px-6 md:px-10 py-32 md:py-48">
        <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-primary">
          Volume 02 · Account
        </span>
        <h1 className="mt-6 font-display text-5xl md:text-7xl font-extrabold leading-[0.98] tracking-tight">
          A calmer account, coming soon.
        </h1>
        <p className="mt-8 text-lg text-muted-foreground max-w-xl leading-relaxed">
          Saved rituals, refill reminders and reorder history will live here. We're finishing the
          authentication layer next — quietly, intentionally, without breaking the rest of the
          experience.
        </p>
        <div className="mt-12 flex flex-wrap gap-3">
          <Link
            to="/shop"
            className="bg-foreground text-background px-7 py-4 rounded-full text-sm font-medium hover:bg-primary transition-colors"
          >
            Browse the shop →
          </Link>
          <Link
            to="/refill"
            className="border border-border px-7 py-4 rounded-full text-sm font-medium hover:bg-secondary transition-colors"
          >
            Refill system
          </Link>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}