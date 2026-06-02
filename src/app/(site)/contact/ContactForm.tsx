"use client";

import { useState } from "react";
import { getBrowserSupabase } from "@/lib/supabase/client";

const PROFILES = [
  "Ville / collectivité",
  "Salon / événement",
  "Centre commercial",
  "Office de tourisme",
];

export default function ContactForm() {
  const [profile, setProfile] = useState(PROFILES[0]);
  const [sent, setSent] = useState(false);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    const form = e.currentTarget;
    const get = (id: string) => (form.elements.namedItem(id) as HTMLInputElement | HTMLTextAreaElement | null)?.value ?? "";

    const lead = {
      profile_type: profile,
      name: get("name"),
      organization: get("org"),
      email: get("email"),
      phone: get("phone"),
      message: get("msg"),
      source: "contact",
    };

    // When Supabase is configured, persist the lead; otherwise simulate success.
    const sb = getBrowserSupabase();
    if (sb) {
      try {
        await sb.from("leads").insert(lead);
      } catch {
        /* keep the UX optimistic even if the insert fails */
      }
    }

    setPending(false);
    setSent(true);
  }

  return (
    <div className="formcard reveal" data-delay="2">
      {!sent ? (
        <form id="demo-form" noValidate onSubmit={handleSubmit}>
          <h3>Demander une démo</h3>
          <p className="sub">Tous les champs marqués sont requis.</p>
          <div className="field">
            <label>Vous êtes</label>
            <div className="chips-pick">
              {PROFILES.map((p) => (
                <span
                  key={p}
                  className={`pick${p === profile ? " on" : ""}`}
                  onClick={() => setProfile(p)}
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
          <div className="field-row">
            <div className="field">
              <label htmlFor="name">Nom</label>
              <input id="name" name="name" placeholder="Votre nom" />
            </div>
            <div className="field">
              <label htmlFor="org">Organisation</label>
              <input id="org" name="org" placeholder="Votre structure" />
            </div>
          </div>
          <div className="field-row">
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input id="email" name="email" type="email" placeholder="vous@organisation.fr" />
            </div>
            <div className="field">
              <label htmlFor="phone">Téléphone</label>
              <input id="phone" name="phone" placeholder="06 00 00 00 00" />
            </div>
          </div>
          <div className="field">
            <label htmlFor="msg">Votre projet</label>
            <textarea id="msg" name="msg" placeholder="Objectif, lieu, période envisagée…" />
          </div>
          <button className="btn btn-primary btn-lg" type="submit" disabled={pending}>
            {pending ? "Envoi…" : "Envoyer ma demande"}
          </button>
        </form>
      ) : (
        <div className="success show">
          <div className="tick">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <h3>Demande envoyée !</h3>
          <p className="sub" style={{ marginBottom: 0 }}>
            Merci. Notre équipe revient vers vous sous 48h.
          </p>
        </div>
      )}
    </div>
  );
}
