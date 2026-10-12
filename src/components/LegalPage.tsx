import legal from "@/content/legal.json";

type Section = { h: string; b: string };
export type LegalDocKey = "confidentialite" | "cgu" | "mentions";

/**
 * Page légale publique. Le texte vient de l'application Nirmie
 * (`src/app/legal/*.tsx` du dépôt de l'app, extrait dans
 * `src/content/legal.json`) : l'app et le site disent exactement la même
 * chose. Version française, puis version anglaise (ancre #en).
 */
export default function LegalPage({ doc, titre, title }: { doc: LegalDocKey; titre: string; title: string }) {
  const d = (legal.docs as Record<LegalDocKey, { fr: Section[]; en: Section[] }>)[doc];
  const bloc = (sections: Section[]) =>
    sections.map((s) => (
      <section key={s.h} style={{ marginTop: 28 }}>
        <h2 style={{ fontFamily: "var(--display)", fontSize: "1.15rem", color: "var(--ink)", margin: 0 }}>{s.h}</h2>
        <p style={{ color: "var(--ink-soft)", lineHeight: 1.7, marginTop: 8, whiteSpace: "pre-line" }}>{s.b}</p>
      </section>
    ));
  return (
    <main className="section">
      <div className="wrap" style={{ maxWidth: 820 }}>
        <span className="eyebrow">Nirmie · Légal</span>
        <h1 className="h1 mt-1">{titre}</h1>
        <p className="muted mt-1">
          Dernière mise à jour : {legal.updated} · <a href="#en" style={{ color: "var(--electric)" }}>English version</a>
        </p>
        {bloc(d.fr)}
        <hr style={{ border: 0, borderTop: "1px solid var(--line)", margin: "56px 0 0" }} />
        <h1 id="en" className="h2 mt-3">{title}</h1>
        <p className="muted mt-1">Last updated: {legal.updated}</p>
        {bloc(d.en)}
        <p className="muted mt-3">
          Contact : <a href={`mailto:${legal.contact}`} style={{ color: "var(--electric)" }}>{legal.contact}</a>
        </p>
      </div>
    </main>
  );
}
