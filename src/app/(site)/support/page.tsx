import type { Metadata } from "next";
import Link from "next/link";
import legal from "@/content/legal.json";

export const metadata: Metadata = {
  title: "Support",
  description: "Aide, contact et suppression de compte pour l'application Nirmie.",
};

const QR: { q: string; r: string; qEn: string; rEn: string }[] = [
  {
    q: "Comment contacter l'équipe Nirmie ?",
    r: `Écris-nous à ${legal.contact}. Nous répondons sous 48 heures ; un signalement de contenu ou de joueur est examiné sous 24 heures.`,
    qEn: "How do I contact the Nirmie team?",
    rEn: `Email us at ${legal.contact}. We reply within 48 hours; a report about content or a player is reviewed within 24 hours.`,
  },
  {
    q: "Comment supprimer mon compte et mes données ?",
    r: "Dans l'application : Réglages › Supprimer mon compte. La suppression est immédiate et définitive : profil, collection, progression et photos sont effacés. Si tu n'as plus accès à l'application, écris-nous depuis l'adresse de ton compte et nous le supprimerons pour toi.",
    qEn: "How do I delete my account and data?",
    rEn: "In the app: Settings › Delete my account. Deletion is immediate and permanent: profile, collection, progress and pictures are erased. If you can no longer access the app, email us from your account address and we will delete it for you.",
  },
  {
    q: "La carte ne montre rien autour de moi",
    r: "Nirmie a besoin de ta position pendant que tu joues. Vérifie dans les réglages du téléphone que la localisation est autorisée pour Nirmie (« Lorsque l'app est active »), puis rouvre la carte.",
    qEn: "The map shows nothing around me",
    rEn: "Nirmie needs your location while you play. Check in your phone settings that location is allowed for Nirmie (\"While Using the App\"), then reopen the map.",
  },
  {
    q: "Comment signaler un joueur ou un contenu ?",
    r: "Depuis le profil du joueur : Signaler, ou Bloquer. Tu peux aussi nous écrire. Un contenu injurieux, haineux ou inapproprié est retiré et son auteur peut être exclu.",
    qEn: "How do I report a player or content?",
    rEn: "From the player's profile: Report, or Block. You can also email us. Insulting, hateful or inappropriate content is removed and its author may be banned.",
  },
];

export default function SupportPage() {
  return (
    <main className="section">
      <div className="wrap" style={{ maxWidth: 820 }}>
        <span className="eyebrow">Nirmie · Support</span>
        <h1 className="h1 mt-1">Besoin d&apos;aide ?</h1>
        <p className="lead mt-2">
          Écris-nous à{" "}
          <a href={`mailto:${legal.contact}`} style={{ color: "var(--electric)" }}>{legal.contact}</a>.
        </p>
        {QR.map((x) => (
          <section key={x.q} style={{ marginTop: 28 }}>
            <h2 style={{ fontFamily: "var(--display)", fontSize: "1.15rem", margin: 0 }}>{x.q}</h2>
            <p style={{ color: "var(--ink-soft)", lineHeight: 1.7, marginTop: 8 }}>{x.r}</p>
          </section>
        ))}
        <hr style={{ border: 0, borderTop: "1px solid var(--line)", margin: "56px 0 0" }} />
        <h2 id="en" className="h2 mt-3">Support (English)</h2>
        {QR.map((x) => (
          <section key={x.qEn} style={{ marginTop: 28 }}>
            <h3 style={{ fontFamily: "var(--display)", fontSize: "1.1rem", margin: 0 }}>{x.qEn}</h3>
            <p style={{ color: "var(--ink-soft)", lineHeight: 1.7, marginTop: 8 }}>{x.rEn}</p>
          </section>
        ))}
        <p className="muted mt-3">
          <Link href="/confidentialite" style={{ color: "var(--electric)" }}>Confidentialité</Link> ·{" "}
          <Link href="/cgu" style={{ color: "var(--electric)" }}>CGU</Link> ·{" "}
          <Link href="/mentions-legales" style={{ color: "var(--electric)" }}>Mentions légales</Link>
        </p>
      </div>
    </main>
  );
}
