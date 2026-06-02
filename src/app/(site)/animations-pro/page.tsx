import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Animations professionnelles",
  description:
    "Une animation clé en main pour générer du trafic, engager les visiteurs et mesurer les parcours. Villes, salons, centres commerciaux, tourisme.",
};

const TARGETS = [
  {
    img: "scene-i",
    title: "Villes & collectivités",
    obj: ["Dynamiser le centre-ville", "Valoriser les commerces", "Créer une animation familiale", "Générer du trafic local", "Obtenir un bilan post-animation"],
    cta: "Dynamiser mon territoire",
  },
  {
    img: "scene-f",
    title: "Salons & événements",
    obj: ["Augmenter les visites de stands", "Éviter les zones mortes", "Fluidifier les parcours visiteurs", "Rendre l'expérience plus mémorable", "Obtenir des données sur les flux"],
    cta: "Animer mon événement",
  },
  {
    img: "scene-g",
    title: "Centres commerciaux",
    obj: ["Faire circuler les visiteurs", "Valoriser certaines boutiques", "Créer une animation commerciale", "Augmenter le temps passé sur site"],
    cta: "Créer une animation retail",
  },
  {
    img: "scene-k",
    title: "Offices de tourisme",
    obj: ["Moderniser les parcours touristiques", "Faire découvrir des lieux secondaires", "Répartir les flux", "Créer une expérience familiale"],
    cta: "Créer un parcours touristique",
  },
];

const STEPS = [
  { t: "Cadrage de l'objectif", p: "Trafic, découverte, flux, animation, data, engagement : on définit le but." },
  { t: "Création du parcours", p: "Sélection des lieux, commerces, stands ou points d'intérêt." },
  { t: "Mise en place terrain", p: "Figurines Nirmie équipées de puces NFC posées chez vos partenaires, affiches, signalétique et accompagnement." },
  { t: "Lancement", p: "Les visiteurs téléchargent l'app, accèdent au parcours et démarrent l'aventure." },
  { t: "Expérience joueur", p: "Ils explorent, scannent les figurines NFC, collectent l'Ætheris et débloquent des récompenses." },
  { t: "Bilan data", p: "Vous recevez des données agrégées et anonymisées, prêtes à l'analyse." },
];

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14m0 0l-6-6m6 6l-6 6" />
  </svg>
);

export default function AnimationsProPage() {
  return (
    <>
      {/* HERO */}
      <header className="pro-hero">
        <div className="wrap">
          <span className="chip reveal">Solution B2B · Clé en main</span>
          <h1 className="h1 reveal mt-2" data-delay="1">
            Une animation clé en main pour générer du trafic, engager les visiteurs et mesurer les
            parcours.
          </h1>
          <p className="lead reveal mt-2" data-delay="2">
            Nirmie transforme vos lieux en expériences interactives : les visiteurs jouent, explorent
            et interagissent, tandis que vous mesurez les flux, les visites et l&apos;impact de
            l&apos;animation.
          </p>
          <div className="row reveal mt-3" data-delay="3">
            <Link className="btn btn-primary btn-lg" href="/contact">
              Demander une démo
            </Link>
            <Link className="btn btn-ghost btn-lg" href="/contact">
              Obtenir un exemple de bilan
            </Link>
          </div>
          <div className="kpi-strip reveal" data-delay="4">
            <div className="kpi"><div className="n">+10 à 20%</div><div className="l">de CA pour les commerces de proximité animés</div></div>
            <div className="kpi"><div className="n">+48%</div><div className="l">d&apos;engagement grâce à la gamification</div></div>
            <div className="kpi"><div className="n">+22%</div><div className="l">de fidélisation en moyenne</div></div>
            <div className="kpi"><div className="n">73%</div><div className="l">des Français préfèrent les centres-villes animés</div></div>
          </div>
        </div>
      </header>

      {/* PUNCHLINE */}
      <section className="section-sm">
        <div className="wrap center reveal">
          <h2 className="h2" style={{ maxWidth: "24ch", marginInline: "auto" }}>
            Un jeu pour les visiteurs.
            <br />
            <span className="electric">Un outil de pilotage pour les organisateurs.</span>
          </h2>
        </div>
      </section>

      {/* 4 TARGETS */}
      <section className="section" id="cibles">
        <div className="wrap">
          <div style={{ marginBottom: 44 }}>
            <span className="eyebrow reveal">Pour qui ?</span>
            <h2 className="h1 reveal mt-1" data-delay="1">
              Quatre terrains, une même mécanique
            </h2>
          </div>
          <div className="targets">
            {/* eslint-disable @next/next/no-img-element */}
            {TARGETS.map((t, i) => (
              <article className="target reveal" key={t.title} data-delay={i % 2 ? 1 : undefined}>
                <div className="target-media">
                  <img src={`/assets/${t.img}.png`} alt={t.title} />
                </div>
                <div className="target-body">
                  <h3>{t.title}</h3>
                  <ul className="obj">
                    {t.obj.map((o) => (
                      <li key={o}>{o}</li>
                    ))}
                  </ul>
                  <Link href="/contact">
                    {t.cta} <ArrowIcon />
                  </Link>
                </div>
              </article>
            ))}
            {/* eslint-enable @next/next/no-img-element */}
          </div>
        </div>
      </section>

      {/* NFC FIGURINE */}
      <section className="section" id="nfc">
        <div className="wrap nfc">
          <div className="nfc-media reveal">
            <div className="nfc-waves">
              <span />
              <span />
              <span />
            </div>
            <span className="chip nfc-badge">Sans géolocalisation</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/cut-gromousse-knight.png" alt="Figurine Nirmie équipée d'une puce NFC" />
          </div>
          <div className="reveal" data-delay="1">
            <span className="eyebrow">La mécanique terrain</span>
            <h2 className="h1 mt-1">Tout se déclenche au contact d&apos;une figurine Nirmie</h2>
            <p className="lead mt-2">
              Pas de GPS, pas de géolocalisation. Chaque point d&apos;intérêt est matérialisé par une{" "}
              <b className="electric">figurine d&apos;un personnage Nirmie équipée d&apos;une puce NFC</b>.
              Le visiteur approche simplement son téléphone de la figurine pour valider l&apos;étape —
              fiable même en intérieur, dans un salon ou un centre commercial.
            </p>
            <div className="nfc-steps">
              <div className="nfc-step">
                <span className="b" />
                <div>
                  <b>On installe les figurines</b>
                  <span>Une figurine Nirmie est posée chez chaque commerce, stand ou lieu partenaire.</span>
                </div>
              </div>
              <div className="nfc-step">
                <span className="b" />
                <div>
                  <b>Le visiteur scanne au contact</b>
                  <span>Il approche son téléphone de la figurine : aucune appli de localisation, aucun GPS.</span>
                </div>
              </div>
              <div className="nfc-step">
                <span className="b" />
                <div>
                  <b>L&apos;étape est validée</b>
                  <span>Le Nirmie se révèle, l&apos;Ætheris est collecté, et l&apos;interaction est comptabilisée pour votre bilan.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section" id="fonctionnement">
        <div className="wrap">
          <div style={{ marginBottom: 44 }}>
            <span className="eyebrow reveal">Comment ça marche</span>
            <h2 className="h1 reveal mt-1" data-delay="1">
              Une animation Nirmie, étape par étape
            </h2>
          </div>
          <div className="steps6">
            {STEPS.map((s, i) => (
              <div className="step6 reveal" key={s.t} data-delay={i % 3 || undefined}>
                <h4>{s.t}</h4>
                <p>{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DATA REASSURANCE */}
      <section className="section">
        <div className="wrap data-split">
          <div className="reveal">
            <span className="eyebrow">Data &amp; résultats</span>
            <h2 className="h1 mt-1">
              Des animations ludiques.
              <br />
              Des données exploitables.
            </h2>
            <p className="lead mt-2">
              Chaque animation produit un bilan concret : fréquentation, parcours, points chauds et
              froids, interactions par lieu.
            </p>
            <div className="rgpd">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
              <span>
                Les données sont agrégées et anonymisées afin de mesurer l&apos;impact de
                l&apos;animation sans identifier individuellement les utilisateurs.
              </span>
            </div>
            <Link className="btn btn-primary mt-3" href="/pro/login">
              Accéder à l&apos;espace pro
              <ArrowIcon />
            </Link>
          </div>
          <div className="metrics reveal" data-delay="1">
            <div className="metric">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /></svg>
              Participants
            </div>
            <div className="metric">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h4l3 8 4-16 3 8h4" /></svg>
              Parcours commencés / terminés
            </div>
            <div className="metric">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
              Temps moyen passé
            </div>
            <div className="metric">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
              Points les plus / moins visités
            </div>
            <div className="metric">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>
              Interactions par commerce
            </div>
            <div className="metric">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 14a8 8 0 0116 0M12 14l4-4" /></svg>
              Zones chaudes / froides
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
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
            <h2 className="h1">Transformons votre lieu en terrain d&apos;aventure</h2>
            <p className="lead mt-2" style={{ maxWidth: "52ch", marginInline: "auto" }}>
              Discutons de vos objectifs et construisons l&apos;animation qui fera revenir vos
              visiteurs.
            </p>
            <div className="row mt-3" style={{ justifyContent: "center" }}>
              <Link className="btn btn-primary btn-lg" href="/contact">
                Demander une démo
              </Link>
              <Link className="btn btn-ghost btn-lg" href="/pro/login">
                Espace pro
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
