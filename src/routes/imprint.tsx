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
              Legal notice
            </h2>

            <p>
              Bei der vorliegenden Website handelt es sich um ein ausschließlich zu Lehr- und Übungszwecken im Rahmen eines Hochschullabors zum Thema Online Marketing
              erstelltes studentisches Projekt. Die Inhalte dieser Website, einschließlich der dargestellten Firma, des Firmennamens, der Produkte, Dienstleistungen, Preise, Adressen,
              Kundendaten und weiterer Informationen, sind vollständig fiktiv.
            </p>
            
            <p className="mt-4">
              Ein tatsächlicher Geschäftsbetrieb findet nicht statt. Insbesondere können über diese Website keine rechtsverbindlichen Bestellungen getätigt oder sonstige Verträge
              abgeschlossen werden. Die Darstellung erfolgt rein zu didaktischen Zwecken ohne kommerzielle Absicht.
            </p>

            <p className="mt-4">
              Der verwendete Firmenname wurde exemplarisch und unabhängig von bestehenden Unternehmen gewählt. Sollte ein reales Unternehmen mit identischer oder ähnlicher
              Firma existieren, besteht keinerlei rechtlicher, wirtschaftlicher oder inhaltlicher Zusammenhang. Es liegt weder eine wettbewerbsrechtlich relevante Nutzung (§§ 3, 4 Nr. 1
              UWG) noch eine markenmäßige Verwendung im Sinne des § 14 MarkenG vor. Die Nutzung erfolgt ohne die Absicht, bestehende Namens-, Marken- oder
              Kennzeichenrechte Dritter zu verletzen.
            </p>

            <p className="mt-4">
              Diese Website ist nur temporär öffentlich zugänglich und dient ausschließlich der Lehre im Hochschulkontext.
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
              Für Rückfragen oder Hinweise wenden Sie sich bitte an den verantwortlichen Hochschullehrenden gemäß § 5 Abs. 1 Nr. 2 TMG: manuel.kern@hs-heilbronn.de
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