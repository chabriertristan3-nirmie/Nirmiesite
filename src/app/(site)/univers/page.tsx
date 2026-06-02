import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "L'univers — La Source, l'Ætheris et les 8 clans",
  description:
    "Nirmia, planète vivante traversée par l'Ætheris. Après la chute, les Nirmies s'exilent sur Terre. Explorez le monde réel pour les réveiller.",
};

const CLANS = [
  { accent: "#FFD24A", glow: "rgba(255,210,74,.35)", img: "scene-o", el: "Lumière", name: "Lumiris", city: "Aurorel · la cité-aube", kw: ["halo", "nacre", "éclat"] },
  { accent: "#3BE0C0", glow: "rgba(59,224,192,.35)", img: "scene-q", el: "Roche · Cristal", name: "Valmirs", city: "Crysélia · la ville-prisme", kw: ["facettes", "symétrie", "réfraction"] },
  { accent: "#9B6BFF", glow: "rgba(155,107,255,.4)", img: "scene-n", el: "Ombre", name: "Noctyrs", city: "Noxvera · citadelle d'obsidienne", kw: ["contraste", "brume", "obsidienne"] },
  { accent: "#BFEFFF", glow: "rgba(191,239,255,.35)", img: "scene-p", el: "Vent", name: "Zéphyris", city: "Aérélune · la ville suspendue", kw: ["lévitation", "voiles", "harmoniques"] },
  { accent: "#4AA8FF", glow: "rgba(74,168,255,.4)", img: "scene-m", el: "Eau", name: "Thalmyrs", city: "Abyssoria · les dômes des marées", kw: ["biolumi", "corail", "profondeur"] },
  { accent: "#FF6A3D", glow: "rgba(255,106,61,.4)", img: "scene-l", el: "Feu", name: "Pyronis", city: "Brasélys · la forge-cité", kw: ["braise", "basalte", "fissures"] },
  { accent: "#4FD900", glow: "rgba(79,217,0,.45)", img: "scene-q", el: "Forêt", name: "Sylvanis", city: "la ville-racine", kw: ["feuille", "sève", "nature vivante"] },
  { accent: "#E6FFD9", glow: "rgba(230,255,217,.35)", img: "halo-portrait", el: "Primordial", name: "Créateurs", city: "Origynea · l'atelier de la Source", kw: ["proto-matière", "sacré", "∞"] },
];

const ACTS = [
  { n: "ACTE I", t: "L'Aube de la Source", p: "La Source s'éveille et ordonne le chaos. Naissent Nirmia, l'Ætheris, et les 8 Originels — un par clan. C'est l'Âge d'Harmonie, gouverné par le cycle." },
  { n: "ACTE II", t: "L'Âge des Cités", p: "Les capitales grandissent, les rites se figent en doctrine. Mais une élite apprend à retenir l'Ætheris : la Source n'est plus seulement honorée, elle est convoitée." },
  { n: "ACTE III", t: "Les Guerres de l'Ætheris", p: "Viennent les premiers morts hors Passation. L'énergie fuit, se corrompt, se capture. La mort devient une ressource, et la guerre nourrit le chaos." },
  { n: "ACTE IV", t: "La Rupture & la Chute", p: "Pour que la Source ne soit jamais possédée, un dernier Gardien arrache un fragment du Cœur. Une onde d'Ætheris brise l'ancien monde. Nirmia s'effondre." },
  { n: "ACTE V", t: "L'Exil sur Terre", p: "Les survivants dérivent jusqu'à la Terre, et y trouvent une énergie familière née des émotions humaines. Beaucoup sont tombés en veille. Reste une espérance : retrouver l'équilibre du ∞." },
];

export default function UniversPage() {
  return (
    <>
      {/* eslint-disable @next/next/no-img-element */}
      <header className="uhero">
        <div className="uhero-bg" data-parallax="0.06">
          <img src="/assets/scene-a.png" alt="Forêt magique d'Ætheris" />
        </div>
        <div className="wrap">
          <span className="eyebrow reveal">L&apos;univers Nirmie</span>
          <h1 className="h-hero reveal mt-1" data-delay="1">
            Un monde vivant,
            <br />
            une <span className="grad-text">énergie sacrée</span>.
          </h1>
          <p className="lead reveal mt-2" data-delay="2">
            Nirmia était une planète vivante traversée par l&apos;Ætheris. Après la chute de leur
            monde, les Nirmies se sont exilés sur Terre. Beaucoup sont tombés en veille. À vous
            d&apos;explorer le monde réel pour collecter l&apos;Ætheris et les réveiller.
          </p>
          <div className="row reveal mt-3" data-delay="3">
            <Link className="btn btn-primary btn-lg" href="/application">
              Commencer l&apos;aventure
            </Link>
            <Link className="btn btn-ghost btn-lg" href="#clans">
              Découvrir les clans
            </Link>
          </div>
        </div>
      </header>

      {/* AETHERIS DEFINITION */}
      <section className="section">
        <div className="wrap split">
          <div className="reveal">
            <span className="eyebrow">L&apos;Ætheris</span>
            <h2 className="h1 mt-1">L&apos;énergie vitale qui circule dans toute chose</h2>
            <p className="lead mt-2">
              Au commencement, il n&apos;existait qu&apos;un chaos de particules. Puis la Source
              s&apos;éveilla et façonna Nirmia — et avec elle l&apos;Ætheris, un flux vivant qui
              nourrit le monde comme un organisme.
            </p>
            <div className="def-list">
              <div className="def">
                <div className="dico">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
                  </svg>
                </div>
                <div>
                  <b>La Source</b>
                  <span>L&apos;origine de tout. Elle stabilise l&apos;informe et donne naissance à Nirmia.</span>
                </div>
              </div>
              <div className="def">
                <div className="dico">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2C8 7 6 10 6 14a6 6 0 0012 0c0-4-2-7-6-12z" />
                  </svg>
                </div>
                <div>
                  <b>L&apos;Ætheris</b>
                  <span>L&apos;énergie vitale. Visible dans le regard des Nirmies vivants.</span>
                </div>
              </div>
              <div className="def">
                <div className="dico">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 3a9 9 0 100 18 4.5 4.5 0 010-9 4.5 4.5 0 000-9z" />
                  </svg>
                </div>
                <div>
                  <b>Le cycle ∞</b>
                  <span>La Passation : à sa fin, un Nirmie offre son énergie au flux. Rien ne se perd.</span>
                </div>
              </div>
            </div>
          </div>
          <div className="split-media reveal" data-delay="1">
            <img src="/assets/scene-h.png" alt="Anneau d'Ætheris" />
          </div>
        </div>
      </section>

      {/* EYE STATES */}
      <section className="section-sm">
        <div className="wrap">
          <div className="center" style={{ maxWidth: 680, marginInline: "auto", marginBottom: 50 }}>
            <span className="eyebrow reveal" style={{ justifyContent: "center" }}>
              Langage visuel canon
            </span>
            <h2 className="h1 reveal mt-1" data-delay="1">
              L&apos;état d&apos;un Nirmie se lit dans ses yeux
            </h2>
            <p className="lead reveal mt-2" data-delay="2">
              L&apos;Ætheris est visible dans le regard. C&apos;est le signe de vie — ou de sa perte.
            </p>
          </div>
          <div className="states">
            <div className="state reveal">
              <div className="state-media">
                <img src="/assets/cut-gromousse2.png" alt="Nirmie vivant" />
              </div>
              <div className="state-body">
                <h4>
                  <span className="state-eye eye-vivant" />
                  Vivant
                </h4>
                <p>Yeux verts Nirmie — l&apos;Ætheris circule, la créature est éveillée.</p>
              </div>
            </div>
            <div className="state reveal" data-delay="1">
              <div className="state-media">
                <img src="/assets/cut-gromousse3.png" alt="Nirmie en veille" style={{ filter: "grayscale(.5) brightness(.7)" }} />
              </div>
              <div className="state-body">
                <h4>
                  <span className="state-eye eye-veille" />
                  Veille
                </h4>
                <p>Regard vide, sans couleur. Le corps subsiste, l&apos;âme s&apos;est tue.</p>
              </div>
            </div>
            <div className="state dead reveal" data-delay="2">
              <div className="state-media">
                <img src="/assets/cut-gromousse2.png" alt="Nirmie mort" />
              </div>
              <div className="state-body">
                <h4>
                  <span className="state-eye eye-mort" />
                  Mort
                </h4>
                <p>Yeux noirs, vidés. L&apos;Ætheris se dissipe et retourne au cycle.</p>
              </div>
            </div>
            <div className="state corrupt reveal" data-delay="3">
              <div className="state-media">
                <img src="/assets/scene-r.png" alt="Nirmie corrompu" />
              </div>
              <div className="state-body">
                <h4>
                  <span className="state-eye eye-corrupt" />
                  Corruption
                </h4>
                <p>Transition vert → vert pollué → noir. La bascule vers le déséquilibre.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NARRATIVE ACTS */}
      <section className="section">
        <div className="wrap">
          <div className="center" style={{ maxWidth: 680, marginInline: "auto", marginBottom: 60 }}>
            <span className="eyebrow reveal" style={{ justifyContent: "center" }}>
              La chute de Nirmia
            </span>
            <h2 className="h1 reveal mt-1" data-delay="1">
              Cinq actes, une mémoire
            </h2>
          </div>
          <div className="acts">
            {ACTS.map((a) => (
              <div className="act reveal" key={a.n}>
                <div className="act-card">
                  <div className="act-num">{a.n}</div>
                  <h3>{a.t}</h3>
                  <p>{a.p}</p>
                </div>
                <div className="act-node">
                  <span className="act-dot" />
                </div>
                <div className="act-spacer" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VEILLE / COCONS */}
      <section className="section-sm">
        <div className="wrap split">
          <div className="split-media reveal" style={{ aspectRatio: "1/1" }}>
            <img src="/assets/aeryn-veille.png" alt="Nirmie en veille dans son cocon" />
          </div>
          <div className="reveal" data-delay="1">
            <span className="eyebrow">Les Nirmies en veille</span>
            <h2 className="h1 mt-1">Endormis dans leurs cocons, ils attendent</h2>
            <p className="lead mt-2">
              Incapables de supporter le choc de la Rupture, beaucoup de Nirmies se sont enfermés dans
              un sommeil énergétique. Leur corps subsiste, leur regard s&apos;éteint.
            </p>
            <p className="lead mt-2">
              En explorant le monde réel et en collectant de l&apos;Ætheris, les joueurs réveillent
              ces créatures, une à une, et relancent un cycle nouveau.
            </p>
            <Link className="btn btn-primary mt-3" href="/application">
              Réveiller un Nirmie
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14m0 0l-6-6m6 6l-6 6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* 8 CLANS */}
      <section className="section" id="clans">
        <div className="wrap">
          <div className="center" style={{ maxWidth: 720, marginInline: "auto", marginBottom: 54 }}>
            <span className="eyebrow reveal" style={{ justifyContent: "center" }}>
              Les 8 Originels
            </span>
            <h2 className="h1 reveal mt-1" data-delay="1">
              Huit clans, huit éléments
            </h2>
            <p className="lead reveal mt-2" data-delay="2">
              Chaque Originel est né d&apos;une formule sacrée — l&apos;Ætheris associé à un unique
              élément naturel — et porte la signature de son clan.
            </p>
          </div>
          <div className="clans">
            {CLANS.map((c, i) => (
              <div
                className="clan reveal"
                key={c.name + i}
                data-delay={(i % 4) || undefined}
                style={{ ["--c-accent" as string]: c.accent, ["--c-glow" as string]: c.glow }}
              >
                <img src={`/assets/${c.img}.png`} alt={c.name} />
                <div className="clan-inner">
                  <span className="clan-el">{c.el}</span>
                  <h4>{c.name}</h4>
                  <div className="city">{c.city}</div>
                  <div className="kw">
                    {c.kw.map((k) => (
                      <span key={k}>{k}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
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
            <h2 className="h1">Rencontrez les Nirmies dans le monde réel</h2>
            <p className="lead mt-2" style={{ maxWidth: "52ch", marginInline: "auto" }}>
              Téléchargez l&apos;application, partez en exploration et commencez votre collection.
            </p>
            <div className="row mt-3" style={{ justifyContent: "center" }}>
              <Link className="btn btn-primary btn-lg" href="/application">
                Découvrir les Nirmies
              </Link>
              <Link className="btn btn-ghost btn-lg" href="/contact">
                Voir les solutions pro
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* eslint-enable @next/next/no-img-element */}
    </>
  );
}
