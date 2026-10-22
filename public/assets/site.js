/* ============================================================
   NIRMIE, shared site behaviour
   Injects nav + footer, runs the Ætheris particle field,
   parallax, scroll reveal, mobile menu.
   Set <body data-page="accueil|univers|pro|app|chiffres|fonctionnement|contact">
   ============================================================ */
(function () {
  const PAGE = document.body.dataset.page || "";
  const B = (window.NIRMIE_BASE || ""); // relative prefix for subfolders

  /* ---------- NAV ---------- */
  const NAV_ITEMS = [
    ["Accueil", B + "index.html", "accueil"],
    ["L'univers", B + "univers.html", "univers"],
    ["L'application", B + "application.html", "app"],
    ["Animations pro", B + "animations-pro.html", "pro"],
    ["Contact", B + "contact.html", "contact"],
  ];

  const navLinks = NAV_ITEMS.map(
    ([label, href, key]) =>
      `<a href="${href}" class="${key === PAGE ? "active" : ""}">${label}</a>`
  ).join("");

  const nav = document.createElement("nav");
  nav.className = "nav";
  nav.innerHTML = `
    <div class="wrap nav-inner">
      <a class="nav-logo" href="${B}index.html" aria-label="Nirmie, accueil">
        <img src="${B}assets/emblem-electric.png" alt="" style="height:30px;width:auto">
        <span class="wordmark">NIRMIE</span>
      </a>
      <div class="nav-links">${navLinks}</div>
      <div class="nav-cta">
        <a class="btn btn-ghost" href="${B}contact.html">Organiser une animation</a>
        <a class="btn btn-primary" href="${B}application.html#bientot">Télécharger l'app</a>
      </div>
      <button class="nav-burger" aria-label="Menu">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
      </button>
    </div>`;
  document.body.prepend(nav);

  const mobile = document.createElement("div");
  mobile.className = "mobile-menu";
  mobile.innerHTML =
    NAV_ITEMS.map(([l, h, k]) => `<a href="${h}" class="${k === PAGE ? "active" : ""}">${l}</a>`).join("") +
    `<a class="btn btn-ghost" href="${B}contact.html" style="margin-top:20px">Organiser une animation</a>
     <a class="btn btn-primary" href="${B}application.html#bientot">Télécharger l'application</a>`;
  document.body.appendChild(mobile);

  const burger = nav.querySelector(".nav-burger");
  burger.addEventListener("click", () => {
    const open = mobile.classList.toggle("open");
    burger.innerHTML = open
      ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="6" y1="18" x2="18" y2="6"/></svg>`
      : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`;
  });
  mobile.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => mobile.classList.remove("open"))
  );

  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 24);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- FOOTER ---------- */
  if (!document.body.hasAttribute("data-no-footer")) {
    const footer = document.createElement("footer");
    footer.className = "footer";
    footer.innerHTML = `
    <div class="wrap">
      <div class="footer-grid">
        <div>
          <a class="nav-logo" href="${B}index.html"><img src="${B}assets/emblem-electric.png" alt="Nirmie" style="height:34px;width:auto"><span class="wordmark" style="font-size:22px">NIRMIE</span></a>
          <p class="footer-tagline grad-text">Le jeu qui fait battre le cœur des villes.</p>
          <div class="store-badges">
            ${storeBadge("apple", B)}
            ${storeBadge("google", B)}
          </div>
        </div>
        <div>
          <h5>Découvrir</h5>
          <div class="footer-links">
            <a href="${B}univers.html">L'univers Nirmie</a>
            <a href="${B}application.html">L'application</a>
            <a href="${B}application.html#bientot">Être prévenu de la sortie</a>
            <a href="${B}contact.html#faq">FAQ</a>
          </div>
        </div>
        <div>
          <h5>Professionnels</h5>
          <div class="footer-links">
            <a href="${B}animations-pro.html">Animations pro</a>
            <a href="${B}animations-pro.html#cibles">Cas d'usage</a>
            <a href="${B}contact.html">Demander une démo</a>
          </div>
        </div>
        <div>
          <h5>Nirmie</h5>
          <div class="footer-links">
            <a href="${B}contact.html">Contact</a>
            <a href="${B}support.html">Support</a>
            <a href="${B}mentions-legales.html">Mentions légales</a>
            <a href="${B}confidentialite.html">Confidentialité</a>
            <a href="${B}cgu.html">CGU</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© ${new Date().getFullYear()} Nirmie, Explorez, jouez, consommez autrement.</span>
        <div class="social">
          <a href="#" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 8.98h4v12H3v-12zM9 8.98h3.8v1.64h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1v6.31h-4v-5.6c0-1.33-.02-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95v5.7H9v-12z"/></svg></a>
          <a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg></a>
          <a href="#" aria-label="TikTok"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 3c.3 2.2 1.6 3.8 3.8 4v3c-1.4.1-2.7-.3-3.8-1v6.2A5.7 5.7 0 1110.5 9.6v3.1a2.7 2.7 0 102 2.6V3H16z"/></svg></a>
        </div>
      </div>
    </div>`;
    document.body.appendChild(footer);
  }

  function storeBadge(kind, base) {
    if (kind === "apple")
      return `<a class="store-badge" href="${base}application.html#bientot" title="Bientôt disponible"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.4 12.6c0-2 1.6-2.9 1.7-3-1-1.4-2.4-1.6-2.9-1.6-1.2-.1-2.4.7-3 .7-.6 0-1.6-.7-2.6-.7-1.3 0-2.6.8-3.3 2-1.4 2.4-.4 6 1 8 .7 1 1.5 2 2.5 2 1 0 1.4-.6 2.6-.6s1.5.6 2.6.6 1.7-.9 2.3-1.9c.7-1 1-2 1-2.1-.1 0-2-.7-2-2.9zM14.6 6.3c.5-.7.9-1.6.8-2.5-.8 0-1.7.5-2.3 1.2-.5.6-.9 1.5-.8 2.4.9.1 1.7-.4 2.3-1.1z"/></svg><span><span class="sb-top">Bientôt sur</span><span class="sb-main">App Store</span></span></a>`;
    return `<a class="store-badge" href="${base}application.html#bientot" title="Bientôt disponible"><svg viewBox="0 0 24 24"><path fill="#4FD900" d="M3.6 2.4c-.2.2-.3.5-.3.9v17.4c0 .4.1.7.3.9l9.2-9.6L3.6 2.4z"/><path fill="currentColor" d="M16.6 8.4l-3-1.7L3.9 2.1c-.1-.1-.3-.1-.3 0l9.2 9.6 3.8-3.3z"/><path fill="currentColor" d="M13 11.7L3.6 21.3c.1.1.2.1.4 0l9.6-5.5 2.9-1.7L13 11.7z"/><path fill="currentColor" d="M20.4 11.1l-3-1.7-4.4 3.9 4.4 3.8 3-1.7c.9-.5.9-1.8 0-2.3z"/></svg><span><span class="sb-top">Bientôt sur</span><span class="sb-main">Google Play</span></span></a>`;
  }
  window.NIRMIE_storeBadge = storeBadge;

  /* ---------- MOBILE STICKY CTA ---------- */
  if (!document.body.hasAttribute("data-no-footer")) {
    const bar = document.createElement("div");
    bar.className = "m-sticky";
    bar.innerHTML = `<a class="btn btn-primary" href="${B}application.html#bientot">Télécharger l'app</a><a class="btn btn-ghost" href="${B}contact.html">Organiser une animation</a>`;
    document.body.appendChild(bar);
    document.body.classList.add("has-m-sticky");
  }
  if (!document.querySelector('link[rel="icon"]')) {
    const ic = document.createElement("link"); ic.rel = "icon"; ic.type = "image/png"; ic.href = B + "assets/emblem-electric.png"; document.head.appendChild(ic);
  }

  /* ---------- SCROLL REVEAL ---------- */
  const reveals = [...document.querySelectorAll(".reveal")];
  if (reveals.length) {
    document.documentElement.classList.add("js-reveal");
    const show = (el) => el.classList.add("in");
    const inView = (el) => {
      const r = el.getBoundingClientRect();
      return r.top < (window.innerHeight || 0) * 0.94 && r.bottom > 0;
    };
    let io = null;
    try {
      io = new IntersectionObserver(
        (entries) => entries.forEach((e) => { if (e.isIntersecting) { show(e.target); io.unobserve(e.target); } }),
        { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
      );
      reveals.forEach((el) => io.observe(el));
    } catch (err) { io = null; }
    // reveal anything already on screen immediately
    requestAnimationFrame(() => reveals.forEach((el) => { if (inView(el)) show(el); }));
    // scroll fallback if IO unavailable
    if (!io) {
      const onScr = () => reveals.forEach((el) => { if (!el.classList.contains("in") && inView(el)) show(el); });
      window.addEventListener("scroll", onScr, { passive: true });
      onScr();
    }
    // hard safety net, never leave content hidden
    setTimeout(() => reveals.forEach(show), 2600);
  }

  /* ---------- PARALLAX ---------- */
  const parallaxEls = [...document.querySelectorAll("[data-parallax]")];
  if (parallaxEls.length) {
    window.addEventListener("scroll", () => {
      const y = window.scrollY;
      parallaxEls.forEach((el) => {
        const s = parseFloat(el.dataset.parallax) || 0.1;
        el.style.transform = `translate3d(0, ${y * s}px, 0)`;
      });
    }, { passive: true });
  }

  /* ---------- CARD GLOW FOLLOW ---------- */
  document.querySelectorAll(".card-glow").forEach((c) => {
    c.addEventListener("pointermove", (e) => {
      const r = c.getBoundingClientRect();
      c.style.setProperty("--mx", ((e.clientX - r.left) / r.width) * 100 + "%");
      c.style.setProperty("--my", ((e.clientY - r.top) / r.height) * 100 + "%");
    });
  });

  /* ---------- ÆTHERIS PARTICLES ---------- */
  if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const canvas = document.createElement("canvas");
    canvas.id = "nirmie-particles";
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    let W, H, dpr, motes = [];
    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.width = innerWidth * dpr;
      H = canvas.height = innerHeight * dpr;
      canvas.style.width = innerWidth + "px";
      canvas.style.height = innerHeight + "px";
      const count = Math.min(70, Math.floor(innerWidth / 18));
      motes = Array.from({ length: count }, () => spawn());
    }
    function spawn() {
      return {
        x: Math.random() * W, y: Math.random() * H,
        r: (Math.random() * 1.6 + 0.5) * dpr,
        vx: (Math.random() - 0.5) * 0.18 * dpr,
        vy: -(Math.random() * 0.35 + 0.08) * dpr,
        a: Math.random() * 0.5 + 0.2,
        tw: Math.random() * Math.PI * 2,
        tws: Math.random() * 0.04 + 0.01,
      };
    }
    function tick() {
      ctx.clearRect(0, 0, W, H);
      for (const m of motes) {
        m.x += m.vx; m.y += m.vy; m.tw += m.tws;
        if (m.y < -10) { m.y = H + 10; m.x = Math.random() * W; }
        if (m.x < -10) m.x = W + 10; if (m.x > W + 10) m.x = -10;
        const a = m.a * (0.6 + 0.4 * Math.sin(m.tw));
        const g = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.r * 6);
        g.addColorStop(0, `rgba(123,238,60,${a})`);
        g.addColorStop(1, "rgba(123,238,60,0)");
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(m.x, m.y, m.r * 6, 0, Math.PI * 2); ctx.fill();
      }
      requestAnimationFrame(tick);
    }
    resize();
    window.addEventListener("resize", resize);
    tick();
  }
})();
