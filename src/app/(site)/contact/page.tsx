import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact — Demander une démo",
  description:
    "Discutons de votre animation Nirmie. Demandez une démonstration ou un accès à l'espace professionnel.",
};

export default function ContactPage() {
  return (
    <header className="c-hero section">
      <div className="wrap c-grid">
        <div className="c-left">
          <span className="eyebrow reveal">Contact · Demande de démo</span>
          <h1 className="h1 reveal mt-1" data-delay="1">
            Transformons votre lieu en terrain d&apos;aventure
          </h1>
          <p className="lead reveal mt-2" data-delay="2">
            Dites-nous quelques mots de votre projet. Nous revenons vers vous sous 48h avec une
            proposition adaptée à vos objectifs.
          </p>
          <div className="c-points reveal" data-delay="3">
            <div className="c-point">
              <div className="ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <b>Une animation clé en main</b>
                <span>Du cadrage à la mise en place terrain, nous gérons tout.</span>
              </div>
            </div>
            <div className="c-point">
              <div className="ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 3v18h18" />
                  <path d="M7 14l4-4 3 3 5-5" />
                </svg>
              </div>
              <div>
                <b>Un bilan data après l&apos;opération</b>
                <span>Fréquentation, parcours, zones chaudes et froides, interactions.</span>
              </div>
            </div>
            <div className="c-point">
              <div className="ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </div>
              <div>
                <b>Conforme RGPD</b>
                <span>Données agrégées et anonymisées, sans identification individuelle.</span>
              </div>
            </div>
          </div>
          <div className="c-contacts reveal" data-delay="4">
            <a href="mailto:hello@nirmie.fr">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
              </svg>
              hello@nirmie.fr
            </a>
            <Link href="/pro/login">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="10" rx="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
              Espace pro
            </Link>
          </div>
        </div>

        <ContactForm />
      </div>
    </header>
  );
}
