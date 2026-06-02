import Link from "next/link";
import StoreBadges from "./StoreBadges";

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <Link className="nav-logo" href="/">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/emblem-electric.png" alt="Nirmie" style={{ height: 34, width: "auto" }} />
              <span className="wordmark" style={{ fontSize: 22 }}>
                NIRMIE
              </span>
            </Link>
            <p className="footer-tagline grad-text">Le jeu qui fait battre le cœur des villes.</p>
            <div className="store-badges">
              <StoreBadges />
            </div>
          </div>
          <div>
            <h5>Découvrir</h5>
            <div className="footer-links">
              <Link href="/univers">L&apos;univers Nirmie</Link>
              <Link href="/application">L&apos;application</Link>
              <Link href="/application">Télécharger</Link>
            </div>
          </div>
          <div>
            <h5>Professionnels</h5>
            <div className="footer-links">
              <Link href="/animations-pro">Animations pro</Link>
              <Link href="/animations-pro#cibles">Cas d&apos;usage</Link>
              <Link href="/pro/login">Espace pro</Link>
              <Link href="/contact">Demander une démo</Link>
            </div>
          </div>
          <div>
            <h5>Nirmie</h5>
            <div className="footer-links">
              <Link href="/contact">Contact</Link>
              <Link href="/contact">Mentions légales</Link>
              <Link href="/contact">Confidentialité</Link>
              <Link href="/contact">CGU</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {year} Nirmie — Explorez, jouez, consommez autrement.</span>
          <div className="social">
            <a href="#" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 8.98h4v12H3v-12zM9 8.98h3.8v1.64h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1v6.31h-4v-5.6c0-1.33-.02-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95v5.7H9v-12z" />
              </svg>
            </a>
            <a href="#" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="#" aria-label="TikTok">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 3c.3 2.2 1.6 3.8 3.8 4v3c-1.4.1-2.7-.3-3.8-1v6.2A5.7 5.7 0 1110.5 9.6v3.1a2.7 2.7 0 102 2.6V3H16z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
