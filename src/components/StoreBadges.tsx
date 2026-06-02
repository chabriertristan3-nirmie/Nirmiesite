/* App Store / Google Play badges. Hrefs are placeholders (Phase 2). */
export default function StoreBadges() {
  return (
    <>
      <a className="store-badge" href="#" aria-label="Télécharger sur l'App Store">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M16.4 12.6c0-2 1.6-2.9 1.7-3-1-1.4-2.4-1.6-2.9-1.6-1.2-.1-2.4.7-3 .7-.6 0-1.6-.7-2.6-.7-1.3 0-2.6.8-3.3 2-1.4 2.4-.4 6 1 8 .7 1 1.5 2 2.5 2 1 0 1.4-.6 2.6-.6s1.5.6 2.6.6 1.7-.9 2.3-1.9c.7-1 1-2 1-2.1-.1 0-2-.7-2-2.9zM14.6 6.3c.5-.7.9-1.6.8-2.5-.8 0-1.7.5-2.3 1.2-.5.6-.9 1.5-.8 2.4.9.1 1.7-.4 2.3-1.1z" />
        </svg>
        <span>
          <span className="sb-top">Télécharger sur</span>
          <span className="sb-main">App Store</span>
        </span>
      </a>
      <a className="store-badge" href="#" aria-label="Disponible sur Google Play">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path fill="#4FD900" d="M3.6 2.4c-.2.2-.3.5-.3.9v17.4c0 .4.1.7.3.9l9.2-9.6L3.6 2.4z" />
          <path fill="currentColor" d="M16.6 8.4l-3-1.7L3.9 2.1c-.1-.1-.3-.1-.3 0l9.2 9.6 3.8-3.3z" />
          <path fill="currentColor" d="M13 11.7L3.6 21.3c.1.1.2.1.4 0l9.6-5.5 2.9-1.7L13 11.7z" />
          <path fill="currentColor" d="M20.4 11.1l-3-1.7-4.4 3.9 4.4 3.8 3-1.7c.9-.5.9-1.8 0-2.3z" />
        </svg>
        <span>
          <span className="sb-top">Disponible sur</span>
          <span className="sb-main">Google Play</span>
        </span>
      </a>
    </>
  );
}
