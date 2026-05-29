import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/imprint")({
  component: ImprintPage,
});

function ImprintPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="max-w-3xl mx-auto px-6 py-28">
        <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-primary">
          Legal · Information
        </span>

        <h1 className="mt-5 font-display text-5xl font-extrabold tracking-tight">
          Imprint
        </h1>

        <div className="mt-12 space-y-10 text-muted-foreground leading-relaxed">
          <div>
            <h2 className="font-semibold text-foreground mb-3">
              Student project notice
            </h2>

            <p>
              VYTAL is a non-commercial student concept project developed as part
              of a university course at Hochschule Heilbronn (Heilbronn University).
            </p>

            <p className="mt-4">
              This website was created exclusively for educational and conceptual
              purposes. No real products are currently being sold through this
              platform.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-foreground mb-3">
              Project context
            </h2>

            <p>
              The VYTAL concept explores sustainable refill systems, functional
              beverages and digital brand experiences within the context of
              student-led design and innovation work.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-foreground mb-3">
              University
            </h2>

            <p>
              Hochschule Heilbronn <br />
              Bildungscampus <br />
              74076 Heilbronn <br />
              Germany
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-foreground mb-3">
              Contact
            </h2>

            <p>
              For academic or project-related questions, please contact the
              student project team directly.
            </p>
          </div>

          <div className="pt-8 border-t border-border">
            <Link
              to="/"
              className="font-mono text-[11px] uppercase tracking-[0.24em] text-primary hover:text-foreground"
            >
              Back to home →
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}