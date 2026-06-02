import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Espace pro — Connexion",
  description: "Pilotez vos animations et mesurez votre impact.",
};

export default function LoginPage() {
  return (
    <div className="login-wrap">
      <aside className="login-aside">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="bg" src="/assets/scene-g.png" alt="" />
        <div className="la-logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/emblem-electric.png" alt="" />
          <span className="wordmark" style={{ fontSize: 20 }}>
            NIRMIE
          </span>
          <span style={{ color: "var(--ink-mute)", fontFamily: "var(--display)", fontSize: 13, marginLeft: 2 }}>
            · PRO
          </span>
        </div>
        <div className="la-quote">
          <span className="eyebrow">Espace professionnel</span>
          <h2 className="mt-2">Pilotez vos animations, mesurez votre impact.</h2>
          <p>
            Suivez la fréquentation, les parcours et les points chauds de chaque opération — en temps
            réel et après l&apos;animation.
          </p>
          <div className="la-mini">
            <div>
              <div className="n">365</div>
              <div className="l">visites · Pontoise</div>
            </div>
            <div>
              <div className="n">93%</div>
              <div className="l">commerces visités</div>
            </div>
            <div>
              <div className="n">5,8</div>
              <div className="l">visites / commerce</div>
            </div>
          </div>
        </div>
        <div style={{ fontSize: 12.5, color: "var(--ink-mute)" }}>
          Le jeu qui fait battre le cœur des villes.
        </div>
      </aside>

      <LoginForm />
    </div>
  );
}
