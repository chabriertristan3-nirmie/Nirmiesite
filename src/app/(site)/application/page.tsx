import type { Metadata } from "next";
import Link from "next/link";
import StoreBadges from "@/components/StoreBadges";

export const metadata: Metadata = {
  title: "L'application — Comment jouer",
  description:
    "Choisis ton compagnon, lance un parcours, explore les lieux, trouve les Nirmies, collecte l'Ætheris, sauve et collectionne.",
};

const STEPS = [
  { n: 1, t: "Choisis ton compagnon", p: "Au lancement, le joueur adopte son premier Nirmie compagnon. Il l'accompagnera, évoluera et grandira tout au long de l'aventure." },
  { n: 2, t: "Lance un parcours", p: "Choisis une ville, un parcours thématique ou un événement. Chaque parcours révèle une carte de points d'intérêt à explorer." },
  { n: 3, t: "Explore les lieux", p: "Déplace-toi réellement dans la ville, le salon, le centre commercial ou l'événement. Tes pas font avancer l'aventure." },
  { n: 4, t: "Trouve les Nirmies", p: "Les créatures apparaissent sur la carte ou via des interactions terrain — NFC, points GPS, énigmes. Repère leur regard." },
  { n: 5, t: "Collecte l'Ætheris", p: "Gagne de l'énergie en explorant et en validant des points d'intérêt. L'Ætheris est la clé pour réveiller les Nirmies en veille." },
  { n: 6, t: "Sauve et collectionne", p: "Réveille les Nirmies endormis, complète ta collection, débloque des récompenses et fais évoluer ton compagnon." },
];

const COLLECTION = [
  { src: "cut-gromousse", contain: true },
  { src: "scene-l" },
  { src: "scene-m" },
  { src: "scene-n" },
  { src: "scene-o" },
  { src: "scene-p" },
];

export default function ApplicationPage() {
  return (
    <>
      {/* eslint-disable @next/next/no-img-element */}
      <header className="app-hero">
        <div className="wrap app-hero-grid">
          <div>
            <span className="eyebrow reveal">L&apos;application</span>
            <h1 className="h-hero reveal mt-1" data-delay="1">
              Jouer, c&apos;est <span className="grad-text">explorer pour de vrai</span>.
            </h1>
            <p className="lead reveal mt-2" data-delay="2">
              Six étapes simples pour partir à l&apos;aventure : choisis ton compagnon, lance un
              parcours et pars réveiller les Nirmies cachés dans les lieux réels.
            </p>
            <div className="row reveal mt-3" data-delay="3">
              <div className="store-badges">
                <StoreBadges />
              </div>
            </div>
            <div className="row reveal mt-2" data-delay="4">
              <Link className="btn btn-primary btn-lg" href="#flow">
                Comment jouer
              </Link>
              <Link className="btn btn-ghost btn-lg" href="/contact">
                Voir une démonstration
              </Link>
            </div>
          </div>
          <div className="phone-mini reveal" data-delay="2">
            <div className="device">
              <div className="screen">
                <img src="/assets/map-pose.png" alt="Écran de l'app Nirmie" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="section" id="flow">
        <div className="wrap">
          <div className="flow">
            {STEPS.map((s) => (
              <div className="flow-step reveal" key={s.n}>
                <div className="flow-media">
                  <div className="flow-num">{s.n}</div>
                </div>
                <div className="flow-body">
                  <span className="flow-tag">Étape {s.n}</span>
                  <h3>{s.t}</h3>
                  <p>{s.p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-sm">
        <div className="wrap">
          <div className="center" style={{ maxWidth: 640, marginInline: "auto", marginBottom: 36 }}>
            <span className="eyebrow reveal" style={{ justifyContent: "center" }}>
              La collection
            </span>
            <h2 className="h1 reveal mt-1" data-delay="1">
              Des dizaines de Nirmies à réveiller
            </h2>
          </div>
          <div className="flow-visual reveal">
            {COLLECTION.map((c) => (
              <div className="fv" key={c.src}>
                <img
                  src={`/assets/${c.src}.png`}
                  alt=""
                  style={
                    c.contain
                      ? { objectFit: "contain", background: "radial-gradient(circle at 50% 40%,rgba(79,217,0,.12),transparent)" }
                      : undefined
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div
            className="reveal"
            style={{
              position: "relative",
              borderRadius: "var(--r-xl)",
              overflow: "hidden",
              border: "1px solid var(--line-strong)",
              padding: "clamp(48px,7vw,84px)",
              textAlign: "center",
              background: "linear-gradient(160deg,rgba(15,48,25,.9),rgba(5,20,10,.9))",
            }}
          >
            <h2 className="h1">Prêt à partir en exploration ?</h2>
            <p className="lead mt-2" style={{ maxWidth: "48ch", marginInline: "auto" }}>
              Téléchargez Nirmie et réveillez votre premier Nirmie aujourd&apos;hui.
            </p>
            <div className="store-badges mt-3" style={{ justifyContent: "center" }}>
              <StoreBadges />
            </div>
          </div>
        </div>
      </section>
      {/* eslint-enable @next/next/no-img-element */}
    </>
  );
}
