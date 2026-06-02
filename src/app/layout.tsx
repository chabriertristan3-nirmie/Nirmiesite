import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nirmie.fr"),
  title: {
    default: "Nirmie — Explorez, jouez, consommez autrement",
    template: "%s · Nirmie",
  },
  description:
    "Nirmie transforme les lieux réels en terrains d'aventure. Un jeu pour les visiteurs, un outil de pilotage pour les organisateurs.",
  icons: { icon: "/assets/emblem-electric.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        {/* Fonts: Sora (display) + Inter (body). React hoists these to <head>. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        {children}
      </body>
    </html>
  );
}
