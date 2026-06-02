"use client";

import Link from "next/link";
import { useState } from "react";
import CountUp from "@/components/CountUp";
import type { DashboardData } from "@/lib/data/types";

type View = "board" | "animations" | "reports";
const TITLES: Record<View, string> = {
  board: "Tableau de bord",
  animations: "Mes animations",
  reports: "Rapports",
};

function FrequentationChart({ data }: { data: number[] }) {
  const W = 720,
    H = 230,
    pad = 28,
    bottom = 24;
  const max = Math.max(...data, 1);
  const n = data.length;
  const x = (i: number) => pad + (i * (W - 2 * pad)) / (n - 1);
  const y = (v: number) => pad / 2 + (H - pad - bottom) * (1 - v / max);
  let line = "";
  data.forEach((v, i) => {
    line += (i ? "L" : "M") + x(i) + " " + y(v) + " ";
  });
  const area = `${line}L ${x(n - 1)} ${H - bottom} L ${x(0)} ${H - bottom} Z`;

  return (
    <svg className="chart" viewBox="0 0 720 230" preserveAspectRatio="none">
      {[0, 1, 2, 3].map((k) => {
        const gy = pad / 2 + ((H - pad - bottom) * k) / 3;
        return <line key={k} x1={pad} y1={gy} x2={W - pad} y2={gy} stroke="rgba(255,255,255,.05)" />;
      })}
      {["Sem. 1", "Sem. 2", "Sem. 3"].map((w, i) => (
        <text key={w} x={x(i * 7 + 3)} y={H - 6} textAnchor="middle">
          {w}
        </text>
      ))}
      <defs>
        <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4FD900" stopOpacity=".35" />
          <stop offset="1" stopColor="#4FD900" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#ag)" />
      <path d={line} fill="none" stroke="#4FD900" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {data.map((v, i) =>
        i % 3 === 0 || i === n - 1 ? (
          <circle key={i} cx={x(i)} cy={y(v)} r="3" fill="#04140a" stroke="#4FD900" strokeWidth="2" />
        ) : null,
      )}
    </svg>
  );
}

function AgeDonut({ data, total }: { data: DashboardData["ages"]; total: number }) {
  let off = 25;
  return (
    <svg className="donut" width="150" height="150" viewBox="0 0 42 42">
      <circle cx="21" cy="21" r="15.9" fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="5" />
      {data.map((s) => {
        const el = (
          <circle
            key={s.label}
            cx="21"
            cy="21"
            r="15.9"
            fill="none"
            stroke={s.color}
            strokeWidth="5"
            strokeDasharray={`${s.pct} ${100 - s.pct}`}
            strokeDashoffset={off}
            transform="rotate(-90 21 21)"
          />
        );
        off -= s.pct;
        return el;
      })}
      <text x="21" y="20" textAnchor="middle" style={{ fontSize: 6, fontWeight: 700, fill: "#eafbe6", fontFamily: "Sora" }}>
        {total}
      </text>
      <text x="21" y="26" textAnchor="middle" style={{ fontSize: 3, fill: "#7d9a78" }}>
        joueurs
      </text>
    </svg>
  );
}

export default function DashboardClient({ data }: { data: DashboardData }) {
  const [view, setView] = useState<View>("board");
  const maxPlace = Math.max(...data.topPlaces.map((p) => p.visits), 1);

  return (
    <div className="app">
      {/* SIDEBAR */}
      <aside className="side">
        <div className="side-logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/emblem-electric.png" alt="" />
          <span className="wordmark" style={{ fontSize: 18 }}>
            NIRMIE
          </span>
          <span className="tag">PRO</span>
        </div>
        <nav className="side-nav">
          <div className="lbl">Pilotage</div>
          <div className={`nav-item${view === "board" ? " active" : ""}`} onClick={() => setView("board")}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="9" rx="1.5" /><rect x="14" y="3" width="7" height="5" rx="1.5" /><rect x="14" y="12" width="7" height="9" rx="1.5" /><rect x="3" y="16" width="7" height="5" rx="1.5" /></svg>{" "}
            Tableau de bord
          </div>
          <div className={`nav-item${view === "animations" ? " active" : ""}`} onClick={() => setView("animations")}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>{" "}
            Mes animations
          </div>
          <div className={`nav-item${view === "reports" ? " active" : ""}`} onClick={() => setView("reports")}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6M9 13h6M9 17h6" /></svg>{" "}
            Rapports
          </div>
          <div className="lbl">Compte</div>
          <div className="nav-item" onClick={() => setView("board")}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19 12a7 7 0 00-.1-1l2-1.6-2-3.4-2.3 1a7 7 0 00-1.7-1L14.5 2h-5l-.4 2.4a7 7 0 00-1.7 1l-2.3-1-2 3.4 2 1.6a7 7 0 000 2l-2 1.6 2 3.4 2.3-1a7 7 0 001.7 1l.4 2.4h5l.4-2.4a7 7 0 001.7-1l2.3 1 2-3.4-2-1.6a7 7 0 00.1-1z" /></svg>{" "}
            Paramètres
          </div>
        </nav>
        <div className="side-user">
          <div className="av">VP</div>
          <div>
            <div className="nm">Ville de Pontoise</div>
            <div className="ro">Compte organisateur</div>
          </div>
          <Link href="/pro/login" title="Déconnexion">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" /></svg>
          </Link>
        </div>
      </aside>

      {/* MAIN */}
      <div className="main">
        <div className="topbar">
          <div className="mobile-top" style={{ alignItems: "center", gap: 9 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/emblem-electric.png" style={{ height: 24 }} alt="" />
            <span className="wordmark" style={{ fontSize: 15 }}>
              NIRMIE
            </span>
          </div>
          <div>
            <div className="crumb">Espace pro</div>
            <h1 id="view-title">{TITLES[view]}</h1>
          </div>
          <div className="select">
            <span className="dot" /> {data.animationLabel}{" "}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
          </div>
        </div>

        <div className="content">
          {/* ===== BOARD ===== */}
          {view === "board" && (
            <section className="view active">
              <div className="kgrid">
                <div className="kcard">
                  <div className="top">
                    <div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.9" /></svg></div>
                    <span className="delta up">Live</span>
                  </div>
                  <div className="v"><CountUp value={data.kpis.participants} /></div>
                  <div className="l">Participants</div>
                </div>
                <div className="kcard">
                  <div className="top">
                    <div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h4l3 8 4-16 3 8h4" /></svg></div>
                    <span className="delta up">+18%</span>
                  </div>
                  <div className="v"><CountUp value={data.kpis.visits} /></div>
                  <div className="l">Visites générées</div>
                </div>
                <div className="kcard">
                  <div className="top">
                    <div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.1V12a10 10 0 11-5.9-9.1" /><path d="M22 4L12 14.5l-3-3" /></svg></div>
                    <span className="delta up">+9%</span>
                  </div>
                  <div className="v"><CountUp value={data.kpis.completionRate} />%</div>
                  <div className="l">Taux de complétion</div>
                </div>
                <div className="kcard">
                  <div className="top">
                    <div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 7V5a2 2 0 012-2h2M17 3h2a2 2 0 012 2v2M21 17v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2" /><circle cx="12" cy="12" r="3" /></svg></div>
                    <span className="delta up">93%</span>
                  </div>
                  <div className="v"><CountUp value={data.kpis.partners} /></div>
                  <div className="l">Commerces partenaires</div>
                </div>
                <div className="kcard">
                  <div className="top">
                    <div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg></div>
                  </div>
                  <div className="v">{data.kpis.avgMinutes}<span style={{ fontSize: "1.1rem" }}> min</span></div>
                  <div className="l">Temps moyen / parcours</div>
                </div>
              </div>

              <div className="panels">
                <div className="panel">
                  <div className="ph">
                    <h3>Fréquentation sur l&apos;animation</h3>
                    <div className="legend"><span><i style={{ background: "var(--electric)" }} />Visites quotidiennes</span></div>
                  </div>
                  <FrequentationChart data={data.frequentation} />
                </div>
                <div className="panel">
                  <div className="ph"><h3>Âge des participants</h3></div>
                  <div className="donut-wrap">
                    <AgeDonut data={data.ages} total={data.kpis.participants} />
                    <div className="age-leg">
                      {data.ages.map((s) => (
                        <div className="it" key={s.label}>
                          <i style={{ background: s.color }} />
                          {s.label}
                          <b>{s.pct}%</b>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="panels" style={{ gridTemplateColumns: "1fr 1fr" }}>
                <div className="panel">
                  <div className="ph"><h3>Lieux les plus visités</h3><span className="mut">Top 6</span></div>
                  <div>
                    {data.topPlaces.map((p, i) => (
                      <div className="place" key={p.name}>
                        <span className="rank">{i + 1}</span>
                        <span className="nm">{p.name}</span>
                        <span className="bar"><span style={{ width: `${(p.visits / maxPlace) * 100}%` }} /></span>
                        <span className="val">{p.visits}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="panel">
                  <div className="ph"><h3>Répartition des visites</h3><span className="mut">par commerce</span></div>
                  <div style={{ display: "grid", gap: 18, marginTop: 6 }}>
                    {data.visitShares.map((s) => (
                      <div key={s.label}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13.5, marginBottom: 7 }}>
                          <span className="muted">{s.label}</span>
                          <b style={{ fontFamily: "var(--display)" }}>{s.pct}%</b>
                        </div>
                        <div className="bar" style={{ height: 9, borderRadius: 999, background: "rgba(255,255,255,.06)", overflow: "hidden" }}>
                          <span style={{ display: "block", height: "100%", width: `${s.pct}%`, background: "linear-gradient(90deg,var(--electric-deep),var(--electric))", borderRadius: 999 }} />
                        </div>
                      </div>
                    ))}
                    <div style={{ display: "flex", alignItems: "center", gap: 11, padding: "13px 15px", border: "1px solid var(--line-strong)", borderRadius: 12, background: "rgba(79,217,0,.05)", fontSize: 13, color: "var(--ink-soft)", marginTop: 4 }}>
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--electric)" strokeWidth="2"><path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z" /></svg>
                      Données agrégées et anonymisées (RGPD).
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: 18 }}>
                <Link className="btn btn-primary" href="/pro/detail">
                  Voir le détail de l&apos;animation{" "}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14m0 0l-6-6m6 6l-6 6" /></svg>
                </Link>
              </div>
            </section>
          )}

          {/* ===== ANIMATIONS ===== */}
          {view === "animations" && (
            <section className="view active">
              <div className="panel" style={{ padding: "8px 10px" }}>
                <table className="tbl">
                  <thead>
                    <tr>
                      <th>Animation</th>
                      <th>Statut</th>
                      <th>Date</th>
                      <th>Participants</th>
                      <th>Complétion</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {data.animations.map((a) => (
                      <tr className="row" key={a.id}>
                        <td>
                          <Link href="/pro/detail" style={{ display: "block" }}>
                            <b style={{ fontFamily: "var(--display)" }}>{a.name}</b>
                            <div className="mut" style={{ fontSize: 12, color: "var(--ink-mute)" }}>{a.subtitle}</div>
                          </Link>
                        </td>
                        <td>
                          <span className={`badge ${a.status === "done" ? "done" : "live"}`}>
                            {a.status === "done" ? "Terminée" : "En cours"}
                          </span>
                        </td>
                        <td>{a.dateLabel}</td>
                        <td>{a.participants.toLocaleString("fr-FR")}</td>
                        <td>{a.completion}%</td>
                        <td className="arrow">
                          <Link href="/pro/detail">→</Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* ===== REPORTS ===== */}
          {view === "reports" && (
            <section className="view active">
              <div className="rep-grid">
                <div className="rep">
                  <div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6" /></svg></div>
                  <h4>Bilan complet — Pontoise</h4>
                  <p>Fréquentation, parcours, points chauds, retours commerçants. PDF · 14 pages.</p>
                  <a className="btn btn-primary" href="#" onClick={(e) => e.preventDefault()}>Télécharger le PDF</a>
                </div>
                <div className="rep">
                  <div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg></div>
                  <h4>Export des données</h4>
                  <p>Données agrégées et anonymisées, prêtes à l&apos;analyse. CSV / XLSX.</p>
                  <a className="btn btn-ghost" href="#" onClick={(e) => e.preventDefault()}>Exporter</a>
                </div>
                <div className="rep">
                  <div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" /></svg></div>
                  <h4>Conclusions &amp; recommandations</h4>
                  <p>Synthèse des résultats et pistes pour la prochaine édition.</p>
                  <Link className="btn btn-ghost" href="/pro/detail">Voir les conclusions</Link>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
