import Link from "next/link";
import StoreBadges from "@/components/StoreBadges";
import QrCode from "@/components/QrCode";

export default function HomePage() {
  return (
    <>
      {/* ================= HERO ================= */}
      <header className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <span className="eyebrow reveal">Aventure mobile · Géogamification</span>
            <h1 className="h-hero reveal" data-delay="1">
              Explorez, jouez,
              <br />
              <span className="grad-text">consommez autrement.</span>
            </h1>
            <p className="lead reveal" data-delay="2">
              Nirmie transforme les lieux réels en terrains d&apos;aventure. Explorez votre ville,
              sauvez des créatures, découvrez des commerces et vivez une expérience mobile ludique,
              locale et mesurable.
            </p>
            <div className="hero-cta reveal" data-delay="3">
              <Link className="btn btn-primary btn-lg" href="/application">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 3v13m0 0l-4-4m4 4l4-4M5 21h14" />
                </svg>
                Télécharger l&apos;application
              </Link>
              <Link className="btn btn-ghost btn-lg" href="/animations-pro">
                Organiser une animation
              </Link>
            </div>
            <div className="hero-downloads reveal" data-delay="4">
              <div className="store-badges">
                <StoreBadges />
              </div>
              <div className="row" style={{ gap: 14 }}>
                <div className="qr" aria-label="QR code de téléchargement">
                  <QrCode />
                </div>
                <span className="qr-label">Scanne pour télécharger l&apos;app Nirmie</span>
              </div>
            </div>
          </div>

          <div className="hero-stage reveal" data-delay="2">
            <div className="hero-halo" />
            <div className="ring r2" />
            <div className="ring r1" />
            {/* eslint-disable @next/next/no-img-element */}
            <div className="float-mon fm1 floaty">
              <img src="/assets/cut-gromousse.png" alt="Nirmie Gromousse" />
            </div>
            <div className="float-mon fm2 floaty-slow">
              <img src="/assets/cut-aeryn.png" alt="Nirmie Aeryn" />
            </div>
            <div className="map-pin mp1" />
            <div className="map-pin mp2" />
            <div className="device">
              <div className="device-screen">
                <img src="/assets/map-pose.png" alt="Carte d'aventure Nirmie" />
                <div className="device-ui">
                  <div className="ui-top">
                    <div className="ui-pill">
                      <span className="ui-aeth">✦</span> 1 240 Ætheris
                    </div>
                    <div className="ui-pill">Pontoise</div>
                  </div>
                  <div className="ui-bottom">
                    <div className="t">Nirmie à proximité</div>
                    <div className="s">3 créatures en veille · 120 m</div>
                    <div className="ui-prog">
                      <span />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* eslint-enable @next/next/no-img-element */}
          </div>
        </div>
        <div className="wrap">
          <div className="scroll-cue">
            <span className="line" /> Découvrir l&apos;aventure
          </div>
        </div>
      </header>

      {/* ================= PUNCHLINE ================= */}
      <section className="punch">
        <div className="wrap punch-inner">
          <b>Un jeu pour les visiteurs.</b>
          <span className="dot" />
          <b>Un outil de pilotage pour les organisateurs.</b>
        </div>
      </section>

      {/* ================= DOUBLE ENTRY ================= */}
      <section className="section" id="entrees">
        <div className="wrap">
          <div className="center" style={{ maxWidth: 680, marginInline: "auto", marginBottom: 54 }}>
            <span className="eyebrow reveal" style={{ justifyContent: "center" }}>
              Deux mondes, une appli
            </span>
            <h2 className="h1 reveal mt-1" data-delay="1">
              Choisissez votre porte d&apos;entrée
            </h2>
          </div>
          <div className="grid grid-2">
            {/* eslint-disable @next/next/no-img-element */}
            <article className="card entry-card reveal">
              <div className="entry-media">
                <img src="/assets/scene-a.png" alt="Aventure dans la forêt magique" />
                <span className="chip entry-badge">Pour les joueurs</span>
              </div>
              <div className="entry-body">
                <h3>Vivez une aventure unique</h3>
                <p className="lead" style={{ fontSize: "1rem" }}>
                  Partez à la recherche des Nirmies cachés dans les lieux réels. Explorez, collectez
                  de l&apos;Ætheris, sauvez des créatures et faites évoluer votre compagnon.
                </p>
                <ul className="bullets mt-2">
                  <li>Explorez votre ville</li>
                  <li>Sauvez des Nirmies</li>
                  <li>Collectionnez et progressez</li>
                  <li>Gagnez des récompenses</li>
                </ul>
                <Link className="btn btn-primary mt-3" href="/application">
                  Découvrir l&apos;aventure
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14m0 0l-6-6m6 6l-6 6" />
                  </svg>
                </Link>
              </div>
            </article>
            <article className="card entry-card reveal" data-delay="1">
              <div className="entry-media">
                <img src="/assets/scene-g.png" alt="Pilotage des flux et de l'animation" />
                <span className="chip entry-badge">Pour les professionnels</span>
              </div>
              <div className="entry-body">
                <h3>Animez vos lieux et mesurez l&apos;impact</h3>
                <p className="lead" style={{ fontSize: "1rem" }}>
                  Nirmie aide les villes, commerces, salons et événements à attirer des visiteurs,
                  répartir les flux, valoriser des lieux et produire des données concrètes après
                  l&apos;animation.
                </p>
                <ul className="bullets mt-2">
                  <li>Plus de visiteurs</li>
                  <li>Une expérience mémorable</li>
                  <li>Des données concrètes</li>
                  <li>Une solution clé en main</li>
                </ul>
                <Link className="btn btn-ghost mt-3" href="/animations-pro">
                  Voir les solutions professionnelles
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14m0 0l-6-6m6 6l-6 6" />
                  </svg>
                </Link>
              </div>
            </article>
            {/* eslint-enable @next/next/no-img-element */}
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS (teaser) ================= */}
      <section className="section-sm" id="comment">
        <div className="wrap">
          <div
            className="row"
            style={{ justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, gap: 20 }}
          >
            <div>
              <span className="eyebrow reveal">L&apos;application</span>
              <h2 className="h2 reveal mt-1" data-delay="1">
                Jouer, c&apos;est explorer le monde réel
              </h2>
            </div>
            <Link className="btn btn-ghost reveal" data-delay="2" href="/application">
              Comment jouer →
            </Link>
          </div>
          <div className="grid grid-3 explore">
            {/* eslint-disable @next/next/no-img-element */}
            <article className="card entry-card reveal">
              <div className="entry-media" style={{ height: 190 }}>
                <img src="/assets/scene-i.png" alt="Explorer un lieu réel" />
              </div>
              <div className="entry-body" style={{ padding: "24px 26px 28px" }}>
                <h4>Explorez les lieux</h4>
                <p>
                  Déplacez-vous réellement dans la ville, le salon ou le centre commercial pour
                  révéler les parcours.
                </p>
              </div>
            </article>
            <article className="card entry-card reveal" data-delay="1">
              <div className="entry-media" style={{ height: 190 }}>
                <img src="/assets/map-pose.png" alt="Trouver des Nirmies" />
              </div>
              <div className="entry-body" style={{ padding: "24px 26px 28px" }}>
                <h4>Trouvez les Nirmies</h4>
                <p>
                  Les créatures se révèlent au fil du parcours. Réveillez celles tombées en veille
                  pour les ajouter à votre collection.
                </p>
              </div>
            </article>
            <article className="card entry-card reveal" data-delay="2">
              <div className="entry-media" style={{ height: 190 }}>
                <img src="/assets/glow-pose.png" alt="Collecter l'Ætheris" />
              </div>
              <div className="entry-body" style={{ padding: "24px 26px 28px" }}>
                <h4>Collectez l&apos;Ætheris</h4>
                <p>
                  Gagnez de l&apos;énergie en validant des points d&apos;intérêt, sauvez des créatures
                  et faites évoluer votre compagnon.
                </p>
              </div>
            </article>
            {/* eslint-enable @next/next/no-img-element */}
          </div>
        </div>
      </section>

      {/* ================= UNIVERS TEASER ================= */}
      <section className="section">
        <div className="wrap">
          <div className="univ reveal">
            <div className="univ-bg" data-parallax="0.04">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/scene-h.png" alt="L'univers Nirmie, l'Ætheris" />
            </div>
            <div className="univ-inner">
              <span className="eyebrow">L&apos;univers Nirmie</span>
              <h2 className="h1 mt-1">Une énergie vivante : l&apos;Ætheris</h2>
              <p className="lead mt-2">
                Nirmia était une planète vivante traversée par l&apos;Ætheris. Après la chute de leur
                monde, les Nirmies se sont exilés sur Terre — beaucoup sont tombés en veille. Aux
                joueurs d&apos;explorer le monde réel pour collecter l&apos;Ætheris et les réveiller.
              </p>
              <div className="row mt-3" style={{ gap: 10 }}>
                <span className="chip">Yeux verts = vivant</span>
                <span className="chip">Regard vide = veille</span>
                <span className="chip">8 clans originels</span>
              </div>
              <Link className="btn btn-primary mt-3" href="/univers">
                Découvrir les Nirmies
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14m0 0l-6-6m6 6l-6 6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PREUVES / IMPACT ================= */}
      <section className="section-sm" id="preuves">
        <div className="wrap">
          <div className="center" style={{ maxWidth: 680, marginInline: "auto", marginBottom: 50 }}>
            <span className="eyebrow reveal" style={{ justifyContent: "center" }}>
              Des résultats mesurés
            </span>
            <h2 className="h1 reveal mt-1" data-delay="1">
              Une animation qui fait revenir
              <br />
              les visiteurs.
            </h2>
          </div>
          <div className="stat-row">
            <div className="stat reveal">
              <div className="num">+10 à 20%</div>
              <div className="lab">de chiffre d&apos;affaires pour les commerces de proximité animés</div>
            </div>
            <div className="stat reveal" data-delay="1">
              <div className="num">+48%</div>
              <div className="lab">d&apos;engagement grâce à la gamification</div>
            </div>
            <div className="stat reveal" data-delay="2">
              <div className="num">+22%</div>
              <div className="lab">de fidélisation des visiteurs en moyenne</div>
            </div>
            <div className="stat reveal" data-delay="3">
              <div className="num">73%</div>
              <div className="lab">des Français préfèrent les centres-villes animés</div>
            </div>
          </div>
          <div className="center mt-4 reveal">
            <Link className="btn btn-ghost" href="/animations-pro">
              Voir les animations professionnelles →
            </Link>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="section">
        <div className="wrap">
          <div className="cta-band reveal">
            <span className="eyebrow" style={{ justifyContent: "center" }}>
              Rejoignez l&apos;aventure
            </span>
            <h2 className="h1 mt-2">Le jeu qui fait battre le cœur des villes</h2>
            <p className="lead mt-2" style={{ maxWidth: "54ch", marginInline: "auto" }}>
              Téléchargez l&apos;application pour jouer, ou organisez une animation Nirmie pour
              dynamiser votre territoire.
            </p>
            <div className="row mt-3" style={{ justifyContent: "center" }}>
              <Link className="btn btn-primary btn-lg" href="/application">
                Télécharger l&apos;application
              </Link>
              <Link className="btn btn-ghost btn-lg" href="/animations-pro">
                Organiser une animation
              </Link>
            </div>
            <div className="store-badges mt-3" style={{ justifyContent: "center" }}>
              <StoreBadges />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
