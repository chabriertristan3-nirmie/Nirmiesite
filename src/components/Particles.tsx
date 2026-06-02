"use client";

import { useEffect, useRef } from "react";

/** The "Ætheris" particle field — slow rising green motes. */
export default function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let dpr = 1;
    let motes: ReturnType<typeof spawn>[] = [];
    let raf = 0;

    function spawn() {
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        r: (Math.random() * 1.6 + 0.5) * dpr,
        vx: (Math.random() - 0.5) * 0.18 * dpr,
        vy: -(Math.random() * 0.35 + 0.08) * dpr,
        a: Math.random() * 0.5 + 0.2,
        tw: Math.random() * Math.PI * 2,
        tws: Math.random() * 0.04 + 0.01,
      };
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas!.width = window.innerWidth * dpr;
      H = canvas!.height = window.innerHeight * dpr;
      canvas!.style.width = window.innerWidth + "px";
      canvas!.style.height = window.innerHeight + "px";
      const count = Math.min(70, Math.floor(window.innerWidth / 18));
      motes = Array.from({ length: count }, () => spawn());
    }

    function tick() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);
      for (const m of motes) {
        m.x += m.vx;
        m.y += m.vy;
        m.tw += m.tws;
        if (m.y < -10) {
          m.y = H + 10;
          m.x = Math.random() * W;
        }
        if (m.x < -10) m.x = W + 10;
        if (m.x > W + 10) m.x = -10;
        const a = m.a * (0.6 + 0.4 * Math.sin(m.tw));
        const g = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.r * 6);
        g.addColorStop(0, `rgba(123,238,60,${a})`);
        g.addColorStop(1, "rgba(123,238,60,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r * 6, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    }

    resize();
    window.addEventListener("resize", resize);
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas id="nirmie-particles" ref={canvasRef} aria-hidden="true" />;
}
