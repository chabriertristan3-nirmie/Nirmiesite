import type { Metadata } from "next";
import Link from "next/link";
import { getDetailData } from "@/lib/data";
import type { Heat } from "@/lib/data/types";

export const metadata: Metadata = {
  title: "Détail — Pontoise · Espace pro",
};

const RECO_ICONS = {
  balance: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v6M12 22v-6M4.9 4.9l4.2 4.2M14.9 14.9l4.2 4.2" /><circle cx="12" cy="12" r="3" /></svg>
  ),
  trend: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18" /><path d="M7 14l4-4 3 3 5-5" /></svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
  ),
};

function heatTag(heat: Heat) {
  if (heat === "hot") return <span className="tag hot">Chaud</span>;
  if (heat === "warm") return <span className="tag" style={{ color: "#b6e84f", background: "rgba(182,232,79,.12)" }}>Modéré</span>;
  return <span className="tag cold">Froid</span>;
}

export default async function DetailPage() {
  const data = await getDetailData("pontoise");
  const maxInteraction = Math.max(...data.commerceInteractions.map((c) => c.interactions), 1);

  // Map route polyline (800×600 viewBox)
  const route = data.route;
  let routeD = `M ${route[0][0]} ${route[0][1]} `;
  for (let i = 1; i < route.length; i++) routeD += `L ${route[i][0]} ${route[i][1]} `;

  return (
    <div className="app">
      <aside className="side">
        <div className="side-logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/emblem-electric.png" alt="" />
          <span className="wordmark" style={{ fontSize: 18 }}>NIRMIE</span>
          <span className="tag">PRO</span>
        </div>
        <nav className="side-nav">
          <div className="lbl">Pilotage</div>
          <Link className="nav-item" href="/pro/dashboard">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="9" rx="1.5" /><rect x="14" y="3" width="7" height="5" rx="1.5" /><rect x="14" y="12" width="7" height="9" rx="1.5" /><rect x="3" y="16" width="7" height="5" rx="1.5" /></svg> Tableau de bord
          </Link>
          <Link className="nav-item active" href="/pro/dashboard">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg> Mes animations
          </Link>
          <Link className="nav-item" href="/pro/dashboard">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6M9 13h6M9 17h6" /></svg> Rapports
          </Link>
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

      <div className="main">
        <div className="topbar">
          <Link className="back" href="/pro/dashboard">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5m0 0l6 6m-6-6l6-6" /></svg>
          </Link>
          <div>
            <div className="crumb">Mes animations / Pontoise</div>
            <h1>{data.name}</h1>
          </div>
          <span className="badge done" style={{ alignSelf: "center" }}>{data.badge}</span>
          <div className="actions">
            <Link className="btn btn-ghost" href="/pro/dashboard" style={{ padding: "11px 18px" }}>Export CSV</Link>
            <Link className="btn btn-primary" href="/pro/dashboard" style={{ padding: "11px 18px" }}>Bilan PDF</Link>
          </div>
        </div>

        <div className="content">
          <div className="mini-kpi">
            <div className="mk"><div className="v">{data.kpis.participants.toLocaleString("fr-FR")}</div><div className="l">Participants</div></div>
            <div className="mk"><div className="v">{data.kpis.visits}</div><div className="l">Visites générées</div></div>
            <div className="mk"><div className="v">{data.kpis.completionRate}%</div><div className="l">Taux de complétion</div></div>
          </div>

          <div className="layout">
            {/* MAP */}
            <div className="mapcard">
              <div className="maphead">
                <h3>Carte du parcours &amp; zones de flux</h3>
                <div className="maplegend">
                  <span><i style={{ background: "var(--electric)" }} />Zone chaude</span>
                  <span><i style={{ background: "#b6e84f" }} />Modérée</span>
                  <span><i style={{ background: "#2c5a3a" }} />Zone froide</span>
                </div>
              </div>
              <div className="mapview">
                <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
                  {Array.from({ length: 7 }, (_, i) => i + 1).map((i) => (
                    <line key={`v${i}`} x1={i * 100} y1={0} x2={i * 100} y2={600} stroke="rgba(255,255,255,.03)" />
                  ))}
                  {Array.from({ length: 5 }, (_, i) => i + 1).map((i) => (
                    <line key={`h${i}`} x1={0} y1={i * 100} x2={800} y2={i * 100} stroke="rgba(255,255,255,.03)" />
                  ))}
                  <path d="M0 480 Q 200 440 400 500 T 800 470 L 800 600 L 0 600 Z" fill="rgba(74,168,255,.06)" stroke="rgba(74,168,255,.18)" strokeWidth="1.5" />
                  <path d={routeD} fill="none" stroke="rgba(79,217,0,.4)" strokeWidth="2.5" strokeDasharray="7 7" strokeLinecap="round" />
                  <defs>
                    <radialGradient id="heat">
                      <stop offset="0" stopColor="rgba(79,217,0,.4)" />
                      <stop offset="1" stopColor="rgba(79,217,0,0)" />
                    </radialGradient>
                  </defs>
                  <circle cx={route[0][0]} cy={route[0][1]} r="120" fill="url(#heat)" />
                  <circle cx={route[1][0]} cy={route[1][1]} r="90" fill="url(#heat)" />
                </svg>
                {data.mapPois.map((p) => (
                  <div
                    key={p.rank}
                    className={`poi ${p.heat}`}
                    style={{ left: `${p.left}%`, top: `${p.top}%`, ["--sz" as string]: `${p.size}px` }}
                  >
                    <span className="pin">{p.rank}</span>
                    <span className="lab">{p.name} · {p.visits}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* SIDE */}
            <div>
              <div className="scard">
                <h3>Statistiques par lieu</h3>
                {data.placeStats.map((s) => (
                  <div className="statline" key={s.name}>
                    <span className="nm">{s.name}</span>
                    {heatTag(s.heat)}
                    <span className="v">{s.visits}</span>
                  </div>
                ))}
              </div>

              <div className="scard">
                <h3>Recommandations</h3>
                {data.recommendations.map((r) => (
                  <div className="reco" key={r.title}>
                    <div className="ic">{RECO_ICONS[r.icon]}</div>
                    <div>
                      <b>{r.title}</b>
                      <span>{r.body}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* interactions strip */}
          <div className="scard" style={{ marginTop: 18 }}>
            <h3>Interactions par commerce — Top partenaires</h3>
            <div>
              {data.commerceInteractions.map((c) => (
                <div key={c.name} style={{ display: "flex", alignItems: "center", gap: 14, padding: "10px 0", borderBottom: "1px solid var(--line)" }}>
                  <span style={{ width: 200, fontSize: 13.5, color: "var(--ink-soft)" }}>{c.name}</span>
                  <span style={{ flex: 1, height: 8, borderRadius: 999, background: "rgba(255,255,255,.06)", overflow: "hidden" }}>
                    <span style={{ display: "block", height: "100%", width: `${(c.interactions / maxInteraction) * 100}%`, background: "linear-gradient(90deg,var(--electric-deep),var(--electric))", borderRadius: 999 }} />
                  </span>
                  <span style={{ width: 34, textAlign: "right", fontFamily: "var(--display)", fontWeight: 700, fontSize: 13.5 }}>{c.interactions}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
