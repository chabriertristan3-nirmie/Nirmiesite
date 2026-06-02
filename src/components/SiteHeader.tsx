"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_ITEMS: [label: string, href: string, key: string][] = [
  ["Accueil", "/", "accueil"],
  ["L'univers", "/univers", "univers"],
  ["L'application", "/application", "app"],
  ["Animations pro", "/animations-pro", "pro"],
  ["Espace pro", "/pro/login", "espace"],
  ["Contact", "/contact", "contact"],
];

function keyFor(pathname: string): string {
  if (pathname === "/") return "accueil";
  if (pathname.startsWith("/univers")) return "univers";
  if (pathname.startsWith("/application")) return "app";
  if (pathname.startsWith("/animations-pro")) return "pro";
  if (pathname.startsWith("/pro")) return "espace";
  if (pathname.startsWith("/contact")) return "contact";
  return "";
}

export default function SiteHeader() {
  const pathname = usePathname() || "/";
  const active = keyFor(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close the mobile menu on navigation
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <div className="wrap nav-inner">
          <Link className="nav-logo" href="/" aria-label="Nirmie — accueil">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/emblem-electric.png" alt="" style={{ height: 30, width: "auto" }} />
            <span className="wordmark">NIRMIE</span>
          </Link>
          <div className="nav-links">
            {NAV_ITEMS.map(([label, href, key]) => (
              <Link key={href} href={href} className={key === active ? "active" : undefined}>
                {label}
              </Link>
            ))}
          </div>
          <div className="nav-cta">
            <Link className="btn btn-ghost" href="/animations-pro">
              Organiser une animation
            </Link>
            <Link className="btn btn-primary" href="/application">
              Télécharger l&apos;app
            </Link>
          </div>
          <button
            className="nav-burger"
            aria-label="Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="6" y1="18" x2="18" y2="6" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        {NAV_ITEMS.map(([label, href, key]) => (
          <Link key={href} href={href} className={key === active ? "active" : undefined}>
            {label}
          </Link>
        ))}
        <Link className="btn btn-ghost" href="/animations-pro" style={{ marginTop: 20 }}>
          Organiser une animation
        </Link>
        <Link className="btn btn-primary" href="/application">
          Télécharger l&apos;application
        </Link>
      </div>
    </>
  );
}
