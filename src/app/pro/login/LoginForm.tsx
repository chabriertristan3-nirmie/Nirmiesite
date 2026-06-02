"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { getBrowserSupabase } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(false);
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("pw") as HTMLInputElement).value;

    // Demo mode (no Supabase): accept anything and enter the dashboard.
    if (!isSupabaseConfigured) {
      router.push("/pro/dashboard");
      return;
    }

    setPending(true);
    const sb = getBrowserSupabase();
    const { error: authError } = await sb!.auth.signInWithPassword({ email, password });
    setPending(false);
    if (authError) {
      setError(true);
      return;
    }
    router.push("/pro/dashboard");
  }

  return (
    <main className="login-main">
      <div className="login-card">
        <Link className="back" href="/">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5m0 0l6 6m-6-6l6-6" />
          </svg>{" "}
          Retour au site
        </Link>
        <h1>Connexion</h1>
        <p className="sub">Accédez à votre tableau de bord d&apos;animations.</p>
        <form id="login-form" noValidate onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="email">Adresse e-mail</label>
            <input type="email" id="email" name="email" placeholder="vous@organisation.fr" autoComplete="username" />
          </div>
          <div className="field">
            <label htmlFor="pw">Mot de passe</label>
            <input type="password" id="pw" name="pw" placeholder="••••••••" autoComplete="current-password" />
          </div>
          <div className={`err${error ? " show" : ""}`}>Identifiants incorrects. Réessayez.</div>
          <div className="row-between">
            <label>
              <input type="checkbox" id="remember" style={{ accentColor: "var(--electric)" }} /> Se souvenir de moi
            </label>
            <a href="#">Mot de passe oublié ?</a>
          </div>
          <button className="btn btn-primary btn-lg" type="submit" disabled={pending}>
            {pending ? "Connexion…" : "Se connecter"}
          </button>
        </form>
        <div className="demo-hint">
          {isSupabaseConfigured
            ? "Connectez-vous avec votre compte organisateur."
            : "Démo — cliquez sur « Se connecter » pour entrer dans le tableau de bord."}
        </div>
        <p className="req">
          Pas encore de compte ? <Link href="/contact">Demander un accès pro</Link>
        </p>
      </div>
    </main>
  );
}
